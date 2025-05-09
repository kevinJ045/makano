import { Frame, Section, $ } from "../libs/gui.js";

var works = new Section('projects', 'projects');

works.html(`<h1 class="block-title">Works</h1>`);

var swipingBar = new Frame('div', 'swiper projects');

swipingBar.html(`
  <div class="swiper-wrapper">
    <div class="swiper-slide">
        <div class="project">
            <img src="img/screenshot-r921.png" class="project-image" />
            <div class="project-name">R921</div>
            <div class="project-tags"><b js></b><b css></b><b html></b><b nodejs></b></div>
            <div class="project-about">A community forume-like website.</div>
            <a href="https://r921.onrender.com" class="btn btn-primary btn-link">Open</a>
        </div>
    </div>
    <div class="swiper-slide">
        <div class="project">
            <img src="img/screenshot-scriff.png" class="project-image" />
            <div class="project-name">Scriff</div>
            <div class="project-tags"><b js></b><b css></b><b html></b><b nodejs></b></div>
            <div class="project-about">A mini Terminal based webOS</div>
            <a href="https://scriff.onrender.com" class="btn btn-primary btn-link">Open</a>
        </div>
    </div>
  </div>
  <div class="swiper-pagination"></div>

  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>`);

works.add(swipingBar);

export default works;
