import { useEffect, useRef } from "react";
import Typed from "typed.js";
import "../Assets/style.css";

export default function Portfolio() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed("#element", {
      strings: [
        "Frontend Developer",
        "MERN Stack Developer",
        "React Developer",
        "Full-Stack Developer",
      ],
      typeSpeed: 55,
    });

    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuBtn && navMenu) {
      menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });
    }

    return () => typed.destroy();
  }, []);

  return (
    <>
      <header>
        <span>Sohail's Portfolio</span>

        <div className="menu-btn">
          <i className="fa-solid fa-bars"></i>
        </div>

        <nav className="nav-menu">
          <ul>
            <li><a href="#Home">Home</a></li>
            <li><a href="#Projects">Projects</a></li>
            <li><a href="#Skills">Skills</a></li>
            <li><a href="#Contacts">Contact</a></li>
            <li><a href="#About">About</a></li>
          </ul>
        </nav>
      </header>

      <main>

        <section className="first-sec" id="Home">
          <div className="left">
            <p>Hello, This is <span>Sohail Khan</span></p>
            <p>and I'm a Passionate</p>
            <span id="element"></span>
          </div>

          <div className="right">
            <img src="bg.png" alt="" />
          </div>
        </section>

        <hr />

        <section className="second-sec">
          <p>My progress so far</p>
          <h1>Achievements</h1>

          <div className="box">

            <div className="vertical">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQHlCQ6vdgJiiA/company-logo_200_200/company-logo_200_200/0/1630631127201/saneinfotech_logo?e=2147483647&v=beta&t=6AyIWpFknotDrbkeoNrIYVmRAY0PGGkm6dZoUJoIngk" className="top-img"/>

              <p className="center">Aug 2025-Jan2026</p>

              <p>
                Completed a 6-month Web Development Internship at Sane Infotech,
                building React components and backend features using Node.js and Express.
              </p>
            </div>

            <div className="vertical">

              <svg
                className="top-img BBC-img"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="14" rx="2"></rect>
                <path d="M2 18h20"></path>
                <polyline points="9 10 7 12 9 14"></polyline>
                <polyline points="15 10 17 12 15 14"></polyline>
              </svg>

              <p>
                Built and deployed multiple full-stack web applications using MERN
                and Next.js, implementing authentication, REST APIs, database
                integration, and responsive UI.
              </p>

            </div>

            <div className="vertical">
              <img src="https://www.presentations.gov.in/wp-content/uploads/2020/06/NIELIT-Preview.png" className="top-img"/>
              <p className="center">2024-june</p>
              <p>I have done an internship at NIELIT Guwahati in Cybersecurity</p>
            </div>

            <div className="vertical">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxLvzGuCtbWoZSJ1bs1W3FB-AHjkIv9Lks0Q&s" className="top-img"/>
              <p className="center">2023-2026</p>
              <p>
                BCA Student — Girijananda Chowdhury University CGPA: 7.95 |
                Focused on Web Development.
              </p>
            </div>

          </div>
        </section>

        <hr />

        <section className="projects" id="Projects">

          <h2>Featured Projects</h2>

          <div className="projects-grid">

            <div className="project-card">
              <h3>URL Shortener</h3>
              <p>Shorten long URLs with authentication and analytics.</p>
              <div className="tech">Next.js | MongoDB | Express</div>

              <div className="project-links">
                <a href="https://url-shortener-app-topaz.vercel.app" target="_blank">🌐Link</a>
                <a href="https://github.com/Developer-Sohail786/url-shortener-app" target="_blank">
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
              </div>
            </div>

            <div className="project-card">
              <h3>Linktree Clone</h3>
              <p>Create a personal page to manage and share links.</p>
              <div className="tech">Next.js | MongoDB | Cloudinary</div>

              <div className="project-links">
                <a href="https://linktree-ruby-two.vercel.app" target="_blank">🌐Link</a>
                <a href="https://github.com/Developer-Sohail786/linktree_" target="_blank">
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
              </div>
            </div>

            <div className="project-card">
              <h3>Portfolio Website</h3>
              <p>Personal developer portfolio showcasing projects.</p>
              <div className="tech">HTML | CSS | JavaScript</div>

              <div className="project-links">
                <a href="#">🌐Link</a>
                <a href="https://github.com/Developer-Sohail786/Portfolio-website/tree/main/JS%20Project%2016%20Portfolio%20website">
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
              </div>
            </div>

          </div>

        </section>

        <hr />

        <h2 className="skills" id="Skills">Skills</h2>

        <section className="fourth-sec">

          <div className="sec-left">

            <h2>Tech Stack</h2>

            <div className="skill"><i className="devicon-html5-plain colored"></i><p>HTML5</p></div>
            <div className="skill"><i className="devicon-css3-plain colored"></i><p>CSS3</p></div>
            <div className="skill"><i className="devicon-tailwindcss-plain colored"></i><p>Tailwind CSS</p></div>
            <div className="skill"><i className="devicon-javascript-plain colored"></i><p>JavaScript</p></div>
            <div className="skill"><i className="devicon-react-original colored"></i><p>React</p></div>
            <div className="skill"><i className="devicon-nextjs-plain"></i><p>Next.js</p></div>
            <div className="skill"><i className="devicon-nodejs-plain colored"></i><p>Node.js</p></div>
            <div className="skill"><i className="devicon-express-original"></i><p>Express.js</p></div>
            <div className="skill"><i className="devicon-mongodb-plain colored"></i><p>MongoDB</p></div>

          </div>

          <div className="sec-right">

            <h1>Tools</h1>

            <div className="service"><i className="devicon-git-plain colored"></i><p>Git</p></div>
            <div className="service"><i className="devicon-github-original"></i><p>GitHub</p></div>
            <div className="service"><i className="devicon-docker-plain colored"></i><p>Docker</p></div>
            <div className="service"><i className="fa-brands fa-aws"></i><p>AWS</p></div>
            <div className="service"><i className="devicon-vscode-plain colored"></i><p>VS CODE</p></div>

          </div>

        </section>

        <hr />

      </main>

      <footer>

        <h3>SOHAIL'S PORTFOLIO WEBSITE</h3>

        <div className="footer" id="About">

          <div>
            <h3>About Me</h3>
            <ul>
              <li>MERN Stack Developer</li>
              <li>Passionate about coding</li>
              <li>Focused on responsive web apps</li>
              <li>Always learning new tech</li>
            </ul>
          </div>

          <div>
            <h3>Technologies</h3>
            <ul>
              <li>HTML, CSS, JavaScript</li>
              <li>React.js & Express.js</li>
              <li>MongoDB & Node.js</li>
              <li>Git & GitHub</li>
            </ul>
          </div>

          <div>
            <h3>Services</h3>
            <ul>
              <li>Web Development</li>
              <li>Responsive Design</li>
              <li>Database Management</li>
              <li>Deployment & Hosting</li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li>Email: sanu30963@gmail.com</li>
              <li>Phone: +91 9531023320</li>
              <li><a href="https://github.com/Developer-Sohail786" target="_blank">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/sohail-khan-8a5b36371/" target="_blank">LinkedIn</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-text">
          Copyright &#169; sohailportfolio.com | All rights reserved
        </div>

      </footer>
    </>
  );
}