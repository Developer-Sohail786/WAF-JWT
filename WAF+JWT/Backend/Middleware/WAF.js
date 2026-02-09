// Block 5:

import rateLimit from "express-rate-limit";
import querystring from "querystring";

import path from "path";
import fs from "fs";

// create initial log entry so file always exists
try {
  fs.appendFileSync(
    path.join(process.cwd(), "logs", "waf.log"),
    `[${new Date().toISOString()}] WAF_STARTED\n`
  );
} catch (e) {
  console.error("Unable to write startup log:", e);
}

// BLOCK 1: IP BLOCKLIST
console.log("[waf.js] loaded — WAF middleware file loaded");

// logging helps
const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "waf.log");
fs.mkdirSync("logs", { recursive: true });

//

function ensureLogDir() {
  try {
    if (!fs.existsSync(LOG_DIR))
      fs.mkdirSync(LOG_DIR, {
        recursive: true,
      });
  } catch (error) {
    console.error("[WAF] ensureLogDir error", error);
  }
}

function writeLog(line) {
  try {
    ensureLogDir();
    const full = `[${new Date().toISOString()}] ${line}`;
    fs.appendFileSync(LOG_FILE, full + "\n");
  } catch (error) {
    console.error("[WAF] writelog error", error);
  }
}

// making logs prettier

function logEvent(eventObj) {
  try {
    ensureLogDir();
    eventObj.time = new Date().toISOString();
    const data = JSON.stringify(eventObj, null, 2);
    const entry = data + "\n---\n";
    fs.appendFileSync(LOG_FILE, entry, "utf-8");
  } catch (error) {
    console.error("[WAF] logEvent error", error);
  }
}

// Block 4: Malicious detection(SQL Injection,XSS,CSRF)

function normalize(s) {
  try {
    return String(s).toLowerCase();
  } catch {
    return "";
  }
}

// SQLi & XSS regex patterns

const SQLI_PATTERNS = [
  /union\s+select/i,
  /;\s*drop\s+table/i,
  /or\s+1\s*=\s*1/i,
  /(--|#).+$/i,
  /sleep\(\s*\d+\s*\)/i,
  /select\s+.*\s+from/i,
  /insert\s+into/i,
  /update\s+.*set/i,
];

const XSS_PATTERNS = [
  /<script\b/i,
  /<\/script>/i,
  /onerror\s*=/i,
  /javascript:/i,
  /<iframe\b/i,
  /<img\b.*onerror=/i,
];

function looksMalicious(body = {}, query = {}, headers = {}) {
  try {
    const combined = normalize(JSON.stringify({ body, query }));

    // Path Traversal detection
    const pathTraversal =
      /(\.\.\/|%2F\.\.|%2F%2E%2E|%2F%2E|\.%2F|%2E%2E|\\\.\\)/i;
    if (pathTraversal.test(combined)) {
      return true;
    }
    // Double encoded attacks
    const doubleEncoded = /(%252E%25)/i; 
if (doubleEncoded.test(combined)) return true;

    for (const r of SQLI_PATTERNS) if (r.test(combined)) return true;
    for (const r of XSS_PATTERNS) if (r.test(combined)) return true;
    // also checking query string raw
    try {
      const queryString = normalize(querystring.stringify(query));
      for (const r of [...SQLI_PATTERNS, ...XSS_PATTERNS])
        if (r.test(queryString)) return true;
    } catch {}
    // suspicious UA:(bot attacks)
    const ua = normalize(headers["user-agent"] || "");
    if (!ua || ua.length < 8) return true;

    return false;
  } catch (e) {
    // if inspection fails, treat as malicious
    return true;
  }
}

// CONFIG

const CONFIG = {
  staticBlockedIps: [], //permanant blocked Ip's
  requireClientIdHeader: true,
  requireJsonOnWrite: true,
  // rate limit settings(Block 5 cont....)
  rateLimit: {
    windowMs: 20 * 1000, //20secs
    max: 3, //max req per ip
    dynamicBlockMs: 60 * 1000, //adding to dynamic for 60s after rate limit hit or malicious payload(SQL injection etc)
  },
};

// Block 5 dynamic block list and rate limiter
// dynamic temporary block list
const dynamicBlocked = new Map();

// periodic clean up of expired dynamic blocks
setInterval(() => {
  const now = Date.now();
  for (const [ip, exp] of dynamicBlocked.entries()) {
    if (exp <= now) dynamicBlocked.delete(ip);
  }
}, 30 * 1000);

// ===== FIXED BLOCK 5: SAFE RATE LIMITER =====
const limiter = rateLimit({
  windowMs: CONFIG.rateLimit.windowMs,
  max: CONFIG.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    try {
      const ip = req.ip || req.connection?.remoteAddress || "unknown";
      const expiry =
        Date.now() + (CONFIG.rateLimit.dynamicBlockMs || 60 * 1000);
      dynamicBlocked.set(ip, expiry);

      // LOG: Rate Limit
      logEvent({
        type: "RATE_LIMIT",
        ip,
        path: req.path,
        method: req.method,
        expiresAt: new Date(expiry).toISOString(),
      });

      if (res.headersSent) return;

      return res.status(429).json({ ok: false, reason: "rate_limit" });
    } catch (e) {
      console.error("[WAF-Block5] limiter.handler error", e);
      writeLog(`RATE_LIMIT_HANDLER_ERROR - ${e?.message}`);
      if (!res.headersSent) {
        try {
          res.status(500).json({ ok: false, reason: "waf_error" });
        } catch (_) {}
      }
    }
  },
});

export function listDynamicBlocked() {
  const now = Date.now();
  const out = [];
  for (const [ip, exp] of dynamicBlocked.entries()) {
    if (exp > now) out.push({ ip, expiresAt: new Date(exp).toISOString() });
  }
  return out;
}

export function clearDynamicBlocked() {
  dynamicBlocked.clear();
  writeLog("ADMIN_CLEAR_DYNAMIC_BLOCKS");
  return true;
}

export function ipBlockWAF(req, res, next) {
  try {
    const blockedIps = new Set(CONFIG.staticBlockedIps || []);
    const ip = req.ip || req.connection?.remoteAddress || "unknown";
    console.log(`[WAF-Block1] Incoming  ${req.method}  ${req.path} from ${ip}`);

    // ===== BLOCK 5 (early) : dynamic temporary blocklist check =====
    const now = Date.now();
    const expires = dynamicBlocked.get(ip);
    if (expires && expires > now) {
      logEvent({
        type: "DYNAMIC_BLOCK_ENFORCE",
        ip,
        path: req.path,
        method: req.method,
        expiresAt: new Date(expires).toISOString(),
      });
      return res.status(403).json({ ok: false, reason: "ip_blocked" });
    } else if (expires) {
      dynamicBlocked.delete(ip);
    }

    // BLOCK 1: static blocklist
    if (blockedIps.has(ip)) {
      logEvent({
        type: "STATIC_BLOCK",
        ip,
        path: req.path,
        method: req.method,
      });
      return res.status(403).json({ ok: false, reason: "ip_blocked" });
    }

    // Block 2: required header check....
    const clientID = req.headers["x-client-id"];
    if (CONFIG.requireClientIdHeader && !clientID) {
      logEvent({
        type: "MISSING_CLIENT_ID",
        ip,
        path: req.path,
        method: req.method,
      });
      return res.status(400).json({ ok: false, reason: "missing_client_id" });
    }

    // Block 3: Content type enforcement for write req.....
    if (
      CONFIG.requireJsonOnWrite &&
      ["POST", "PUT", "PATCH"].includes(req.method)
    ) {
      const contentType = (req.headers["content-type"] || "")
        .split(";")[0]
        .trim();
      if (contentType !== "application/json") {
        logEvent({
          type: "BAD_CONTENT_TYPE",
          ip,
          path: req.path,
          method: req.method,
          contentType,
        });
        return res.status(415).json({ ok: false, reason: "bad_content_type" });
      }
    }

    // Block 4: Malicious Payload
    if (
      (req.body && Object.keys(req.body).length > 0) ||
      (req.query && Object.keys(req.query).length > 0)
    ) {
      if (looksMalicious(req.body, req.query, req.headers)) {
        const snippet = JSON.stringify(req.body || req.query).slice(0, 250);
        logEvent({
          type: "MALICIOUS_PAYLOAD",
          ip,
          path: req.path,
          method: req.method,
          snippet,
        });
        dynamicBlocked.set(
          ip,
          Date.now() + (CONFIG.rateLimit.dynamicBlockMs || 60 * 1000)
        );
        return res.status(403).json({ ok: false, reason: "malicious_payload" });
      }
    }

    // ===== FIXED BLOCK 5: SAFE LIMITER CALL =====
    limiter(req, res, (err) => {
      if (res.headersSent) return;

      if (err) {
        writeLog(`RATE_LIMIT_ERROR - ${err?.message}`);
        if (!res.headersSent)
          return res.status(500).json({ ok: false, reason: "waf_error" });
        return;
      }

      req.waf = { checked: true, ip, clientID };
      next();
    });
  } catch (error) {
    console.error("[WAF-Block3] internal Error:", error);
    writeLog(`WAF_INTERNAL_ERROR - ${error?.message}`);
    if (!res.headersSent)
      res.status(500).json({ ok: false, reason: "waf_error" });
  }
}
