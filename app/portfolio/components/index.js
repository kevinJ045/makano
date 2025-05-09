

import Header from "./widgets/head.js";
import Hero from "./hero.js";
import AboutMe from "./about.js";
import Stats from "./stats.js";
import Works from "./projects.js";
import ContactMe from "./contact.js";
import Footer from "./widgets/foot.js";

import { Frame } from "../libs/gui.js";

var mainFrame = new Frame("main");

var Transitional1 = new Frame("div", 'section-cut first')

mainFrame.add(Header, Hero, Transitional1, AboutMe, Stats, Works, ContactMe, Footer)

mainFrame.term = Hero.term;

export default mainFrame;