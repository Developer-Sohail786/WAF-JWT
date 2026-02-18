import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import "../Assets/style.css";

export default function Portfolio() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed("#element", {
      strings: [
        "Web Developer",
        "Learner",
        "Code worm",
        "Stand-up Comedian",
        "Shayar",
        "Coder",
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1200,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <span>Sohail's Portfolio</span>
        <nav className="w-full sm:w-auto">
          <ul className="flex flex-wrap gap-3 justify-center sm:justify-end">
            <li><a href="#Home">Home</a></li>
            <li><a href="#About">About</a></li>
            <li><a href="#Services">Services</a></li>
            <li>
              <a
                href="https://github.com/Developer-Sohail786"
                target="_blank"
                rel="noreferrer"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/918918716256"
                target="_blank"
                rel="noreferrer"
              >
                Contact Me
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="overflow-x-hidden">
        <section className="first-sec flex flex-wrap items-center justify-center gap-6" id="Home">
          <div className="left min-w-[260px]">
            <p>
              Hello, This is <span>Sohail Khan</span>
            </p>
            <p>and I'm a Passionate</p>
            <span id="element" ref={typedRef}></span>
          </div>

          <div className="right flex justify-center">
            <img
              src="/images/bg.png"
              alt="background"
              className="max-w-full h-auto"
            />
          </div>
        </section>

        <hr />

        <section className="second-sec">
          <p>My progress so far</p>
          <h1>Achievements</h1>

          <div className="box flex flex-wrap justify-center gap-6">
            <div className="vertical max-w-[300px]">
              <img src="/images/Bethany.png" alt="Bethany" className="top-img max-w-full h-auto" />
              <p className="center">2014-2021</p>
              <p>
                I've completed my HSLC class 10 from Bethany Convent School. I was
                the Red house Leader in class 10 and Red house patrol Leader in
                class 9. I passed my HSLC with 67%.
              </p>
            </div>

            <div className="vertical max-w-[300px]">
              <img src="/images/BBC.png" alt="BBC" className="top-img BBC-img max-w-full h-auto" />
              <p className="center">2021-2023</p>
              <p>
                I have completed my HS from B.Borooah College with commerce
                stream, I was appointed as the CR of my class. I passed my HS with
                65%.
              </p>
            </div>

            <div className="vertical max-w-[300px]">
              <img src="/images/Nielit.png" alt="Nielit" className="top-img max-w-full h-auto" />
              <p className="center">2024-June</p>
              <p>I have done an internship at NIELIT Guwahati in Cybersecurity</p>
            </div>

            <div className="vertical max-w-[300px]">
              <img src="/images/Nielit.png" alt="Nielit" className="top-img max-w-full h-auto" />
              <p className="center">2025-April</p>
              <p>
                I have completed a bootcamp in IoT with AI which was conducted by
                the NIELIT Guwahati.
              </p>
            </div>

            <div className="vertical max-w-[300px]">
              <img src="/images/GCU.png" alt="GCU" className="top-img max-w-full h-auto" />
              <p className="center">2023-2026</p>
              <p>
                Currently I'm pursuing BCA at Girijananda Chowdhury University,
                I'm a 5th semester Student who is passionate about Web
                development, Currently I secure a CGPA of 8.2
              </p>
            </div>
          </div>
        </section>

        <hr />

        <section className="third-sec">
          <h1>Social Media</h1>
          <p>Click on the icon to get to the profile</p>

          <div className="social-items flex flex-wrap justify-center gap-6">
            <div className="anchor max-w-[220px] text-center">
              <a
                href="https://www.linkedin.com/in/sohail-khan-8a5b36371/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/linkedin.png"
                  alt="LinkedIn"
                  className="social-img max-w-full h-auto"
                />
              </a>
              <p className="social-desc">Connect with me on LinkedIn</p>
            </div>

            <div className="anchor max-w-[220px] text-center">
              <a
                href="https://github.com/Developer-Sohail786"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/github-logo.png"
                  alt="GitHub"
                  className="social-img max-w-full h-auto"
                />
              </a>
              <p className="social-desc">View my projects and source code</p>
            </div>

            <div className="anchor max-w-[220px] text-center">
              <a
                href="https://www.instagram.com/sohailkhan_n19"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/instagram-logo.png"
                  alt="Instagram"
                  className="social-img max-w-full h-auto"
                />
              </a>
              <p className="social-desc">See what I'm up to beyond coding</p>
            </div>

            <div className="anchor max-w-[220px] text-center">
              <a
                href="https://wa.me/918918716256"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/Whatsapp-logo.png"
                  alt="WhatsApp"
                  className="social-img max-w-full h-auto"
                />
              </a>
              <p className="social-desc">
                Message me directly on WhatsApp for quick chats or collaborations
              </p>
            </div>
          </div>
        </section>

        <hr />

        <section className="fourth-sec flex flex-wrap gap-8 justify-center">
          <div className="sec-left min-w-[260px] max-w-[500px]">
            <h2>Skills</h2>

            <div className="skill">
              <i className="devicon-html5-plain colored"></i>
              <p>Building structured web pages with HTML5</p>
            </div>

            <div className="skill">
              <i className="devicon-css3-plain colored"></i>
              <p>Styling and designing responsive layouts with CSS3</p>
            </div>

            <div className="skill">
              <i className="devicon-javascript-plain colored"></i>
              <p>Adding interactivity and logic using JavaScript</p>
            </div>

            <div className="skill">
              <i className="devicon-react-original colored"></i>
              <p>Creating dynamic user interfaces with React</p>
            </div>

            <div className="skill">
              <i className="devicon-mongodb-plain colored"></i>
              <p>Managing databases efficiently with MongoDB</p>
            </div>

            <div className="skill">
              <i className="devicon-express-original"></i>
              <p>Building backend APIs using Express.js</p>
            </div>
          </div>

          <div className="sec-right min-w-[260px] max-w-[500px]" id="Services">
            <h1>Service offered</h1>

            <div className="service">
              <i className="fas fa-code"></i>
              <p>Web Development (MERN Stack)</p>
            </div>

            <div className="service">
              <i className="fas fa-laptop-code"></i>
              <p>Responsive Design</p>
            </div>

            <div className="service">
              <i className="fas fa-database"></i>
              <p>Database Management</p>
            </div>

            <div className="service">
              <i className="fas fa-cloud-upload-alt"></i>
              <p>Deployment & Hosting</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <h3>SOHAIL'S PORTFOLIO WEBSITE</h3>

        <div className="footer flex flex-wrap gap-8 justify-center" id="About">
          <div className="footer-first min-w-[220px]">
            <h3>About Me</h3>
            <ul>
              <li>MERN Stack Developer</li>
              <li>Passionate about coding</li>
              <li>Focused on responsive web apps</li>
              <li>Always learning new tech</li>
            </ul>
          </div>

          <div className="footer-second min-w-[220px]">
            <h3>Technologies</h3>
            <ul>
              <li>HTML, CSS, JavaScript</li>
              <li>React.js & Express.js</li>
              <li>MongoDB & Node.js</li>
              <li>Git & GitHub</li>
            </ul>
          </div>

          <div className="footer-third min-w-[220px]">
            <h3>Services</h3>
            <ul>
              <li>Web Development</li>
              <li>Responsive Design</li>
              <li>Database Management</li>
              <li>Deployment & Hosting</li>
            </ul>
          </div>

          <div className="footer-fourth min-w-[220px]">
            <h3>Contact</h3>
            <ul>
              <li>Email: youremail@example.com</li>
              <li>Phone: +91 9876543210</li>
              <li>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-text text-center px-4">
          Copyright © sohailportfolio.com | All rights reserved
        </div>
      </footer>
    </>
  );
}

