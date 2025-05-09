import { Frame, $ } from "../../libs/gui.js";
import { name, can } from "../../info.js";

var fooBar = new Frame("footer", "footer", "");

var fooBarMain = new Frame("div", "main", "");
var fooBarOther = new Frame("div", "otherpart", "");

fooBar.add(fooBarMain, fooBarOther);

fooBarMain.text(`© ${new Date().getFullYear()} ${name}.`)
fooBarOther.text('HIRE ME!')

export default fooBar;