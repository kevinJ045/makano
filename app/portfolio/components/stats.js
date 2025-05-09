import { Frame, Section, $ } from "../libs/gui.js";
import logos from "./widgets/logos.js";

var stats = new Section('skills', 'skills');

stats.html(`
<div class="dot-list"><b></b><b></b><b></b></div>
<h1 class="block-title">Skills</h1>
`);

var skills = new Frame('div', 'skills');

stats.add(skills)

stats.append('<div class="dot-list reverse"><b></b><b></b><b></b></div>')

for(var i in logos){
	skills.append(`<div class="skill ${i}" title="${logos[i].name}">${logos[i].image}</div>`)
}

export default stats;