import { Frame, Section, $ } from "../libs/gui.js";

import Terminal from "./widgets/terminal.js";
import { name, can } from "../info.js";

var hero = new Section('hero', 'hero');

hero.html(`<div class="hero-base-bg"></div>`);

var area1 = new Frame('div', 'hero-area-intro')
var area2 = new Frame('div', 'hero-area-terminal');

area2.add(Terminal);
hero.add(area1, area2);

area1.html(`
<div class="p-5 text-white text-center">
  <h1 class="font-extrabold">Welcome, I am ${name}</h1>
  <p>I am a ${can.join(', ')}</p> 
  <button class="btn btn-primary" data-target="about">
  <span class="icon material-symbols-outlined">
	arrow_downward
  </span> See more</button>
</div>
`)

hero.term = Terminal.terminal;

export default hero;