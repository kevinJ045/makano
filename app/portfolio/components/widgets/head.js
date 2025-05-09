import { Frame, $ } from "../../libs/gui.js";

var navBar = new Frame("nav", "navbar navbar-expand-sm", "");

navBar.html(`
    <ul class="navbar-nav">
      <li class="nav-item active" data-target="hero">
        <a data-title="Home" class="nav-link material-symbols-outlined" href="#">dashboard</a>
      </li>
      <li class="nav-item" data-target="about">
        <a data-title="About Me" class="nav-link material-symbols-outlined" href="#">person</a>
      </li>
      <li class="nav-item" data-target="skills">
        <a data-title="Skills" class="nav-link material-symbols-outlined" href="#">memory</a>
      </li>
      <li class="nav-item" data-target="projects">
        <a data-title="Works" class="nav-link material-symbols-outlined" href="#">deployed_code</a>
      </li>
      <li class="nav-item" data-target="contact">
        <a data-title="Contact Me" class="nav-link material-symbols-outlined" href="#">message</a>
      </li>
    </ul>`)

export default navBar;