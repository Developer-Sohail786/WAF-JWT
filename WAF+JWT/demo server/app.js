import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { ipBlockWAF } from "./WAF.js";
import { listDynamicBlocked, clearDynamicBlocked } from "./WAF.js";
import fs from "fs"
import path from "path";

const app = express();

// basic secrutiy
app.use(helmet()); //adds basic security headers
app.use(morgan("dev")); //logs all incoming reqs
app.use(bodyParser.json()); //parses JSON req bodies
app.set("trust proxy", false); //for POSTMAN

//waf middleware from waf.js
app.use(ipBlockWAF);

const ADMIN_KEY="123456";

// middleware to protect admin routes
function adminAuth(req,res,next){
  const key=req.headers["x-admin-key"]
  if(key!==ADMIN_KEY)
  {
    return res.status(403).json({ok:false, message:"Invalid_admin_key"})
  }
  next()
}

const LOG_DIR=path.join(process.cwd(),"logs")
const LOG_FILE=path.join(LOG_DIR,"waf.log")

// we'll get logs (plain text) 
app.get("/admin/waf/logs",adminAuth,(req,res)=>{
  try {
    if(!fs.existsSync(LOG_FILE))
      return res.json({ok:true,logs:[]})
    const raw=fs.readFileSync(LOG_FILE,"utf-8")
    // returning as text for easy download & viewing
    res.type("text/plain")
    return res.send(raw)
  } catch (error) {
    console.error("[ADMIN] read logs error", error);
    
  }
})

// shows all dynamically blocked IPs
app.get("/admin/waf/blocked", adminAuth,(req,res)=>{
  const list=listDynamicBlocked()
  res.json({ok:true,blocked:list})
})

// admin route for writing logs in json format

app.get("/admin/blocked-ips",(req,res)=>{
  try {
    const data= fs.readFileSync("logs/blocklist.json","utf-8")
    const list=JSON.parse(data)
    res.type("application/json").send(JSON.stringify(list,null,2))
  } catch (error) {
    res.json({
      message:"No blocked Ips found"
    })
  }
})

app.post("/admin/waf/clear",adminAuth,(req,res)=>{
  clearDynamicBlocked()
  res.json({ok:true,message:"dynamic_blocklist_cleared"})
})
// routes for tsting

// check route
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "waf-demo", time: Date.now() });
});

// Registration route
app.post("/register", (req, res) => {
  const { name, email } = req.body || {};
  res.json({
    ok: true,
    message: "register ndpoint reached",
    payload: { name, email },
    waf: req.waf,
  });
});

// root route for testing
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "WAF demo root",
  });
});

// start server

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Local server is running at http://localhost:${port}`)
);

export default app;
