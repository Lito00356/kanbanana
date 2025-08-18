import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main id="maincontent">
        <header>
          <section className="image-card image-card--reverse">
            <picture className="content__wrapper" id="me">
              <source className="image-card__media image-card__media--no-mask" media="(max-width: 42rem)" srcSet="../../public/images/webp/Portret_me.webp" type="image/webp" />
              <img className="image-card__media" src="../../public/images/Portret_me.jpg" alt="my portrait" />
            </picture>
            <div className="content__wrapper">
              <h1 className="image-card__title">About me</h1>
              <p className="image-card__content">
                Before I ventured into web development, I spent many years working in the film and advertising industry as a compositor in visual effects (VFX). I was lucky enough to work on a wide range of projects — from feature films to high-end commercials — where I honed my eye for detail, problem-solving, and creative collaboration. But after a long run in VFX, I felt the urge to explore a new direction and challenge myself in a different way. That’s what led me to programming. I'm now
                studying at Artevelde Hogeschool in Ghent, where I’m developing a strong technical skillset and applying my creative background to building engaging digital experiences.
              </p>
              <div className="button button-wrapper">
                <a className="button-link" href="#resume">
                  Resume
                </a>
              </div>
            </div>
          </section>
        </header>

        <section className="container-80 grid-wrapper" id="resume">
          <h2 className="fade-in">My work experience!</h2>
          <div className="grid">
            <article className="grid__item grid__item--span fade-in">
              <strong>Artevelde Hogeschool</strong>
              <p>
                <time dateTime="09-24">September 2024</time>- Now
              </p>
            </article>

            <article className="grid__item grid__item--span fade-in">
              <strong>Developer</strong>
              <p>Currently studying programming with a focus on modern web technologies like JavaScript, Node.js, and React. Building projects and learning to turn ideas into functional digital experiences.</p>
            </article>

            <article className="grid__item grid__item--span fade-in">
              <strong>UFX studios</strong>
              <p>
                <time dateTime="05-23">May 2023</time>-<time dateTime="09-24">September 2024</time>
              </p>
            </article>

            <article className="grid__item grid__item--span fade-in">
              <strong>Compositor</strong>
              <p>Worked on a variety of film and commercial projects, combining CGI and live-action footage into seamless final shots. Collaborated closely with VFX teams to deliver high-quality visuals.</p>
            </article>

            <article className="grid__item grid__item--span fade-in">
              <strong>Light VFX</strong>
              <p>
                <time dateTime="01-21">January 2021</time>-<time dateTime="06-23">June 2023</time>
              </p>
            </article>

            <article className="grid__item grid__item--span fade-in">
              <strong>Compositor</strong>
              <p>Focused on high-end visual effects for international productions. Responsible for integrating complex elements and ensuring visual consistency across sequences.</p>
            </article>

            <article className="grid__item grid__item--span fade-in">
              <strong>Flow Postproduction</strong>
              <p>
                <time dateTime="09-20">September 2020</time>-<time dateTime="01-21">January 2021</time>
              </p>
            </article>

            <article className="grid__item grid__item--span fade-in">
              <strong>Compositor</strong>
              <p>Short-term role handling fast-paced commercial post work. Delivered clean, polished compositions under tight deadlines.</p>
            </article>

            <article className="grid__item grid__item--span fade-in-last">
              <strong>Digital District</strong>
              <p>
                <time dateTime="08-19">August 2019</time>-<time dateTime="03-20">March 2020</time>
              </p>
            </article>

            <article className="grid__item grid__item--span fade-in-last">
              <strong>Compositor</strong>
              <p>Worked on feature films and advertisements. Developed precision and an eye for detail in compositing and color matching.</p>
            </article>
          </div>
        </section>

        <footer className="footer">
          <nav className="footer__nav">
            <ul className="footer__list">
              <li className="footer__list-item">
                <a className="footer__list-link linkedin" href="https://www.linkedin.com/in/tomaszli" target="_blank" rel="noopener noreferrer">
                  <svg className="footer__list-icon" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>linkedin [#ffffff]</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -7479.000000)" fill="#ffffff">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                              d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z"
                              id="linkedin-[#ffffff]"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li className="footer__list-item">
                <a className="footer__list-link github" href="https://github.com/Lito00356?tab=repositories" target="_blank" rel="noopener noreferrer">
                  <svg className="footer__list-icon" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>github [#142]</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                              d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                              id="github-[#142]"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li className="footer__list-item">
                <a className="footer__list-link imdb" href="https://www.imdb.com/name/nm10240524/?ref_=nv_sr_srsg_0_tt_1_nm_3_in_0_q_tomasz%2520liksza" target="_blank" rel="noopener noreferrer">
                  <svg className="footer__list-icon" xmlns="http://www.w3.org/2000/svg" ariaLabel="IMDb" role="img" viewBox="0 0 512 512" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <rect width="512" height="512" rx="15%" fill="#ffc800"></rect>
                      <path d="M104 328V184H64v144zM189 184l-9 67-5-36-5-31h-50v144h34v-95l14 95h25l13-97v97h34V184zM256 328V184h62c15 0 26 11 26 25v94c0 14-11 25-26 25zm47-118l-9-1v94c5 0 9-1 10-3 2-2 2-8 2-18v-56-12l-3-4zM419 220h3c14 0 26 11 26 25v58c0 14-12 25-26 25h-3c-8 0-16-4-21-11l-2 9h-36V184h38v46c5-6 13-10 21-10zm-8 70v-34l-1-11c-1-2-4-3-6-3s-5 1-6 3v57c1 2 4 3 6 3s6-1 6-3l1-12z"></path>
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
          <small className="footer__ARR">
            Created by{" "}
            <strong>
              <a href="#me">Tomasz</a>
            </strong>{" "}
            | All rights reserved
          </small>
        </footer>
      </main>
    </>
  );
}
