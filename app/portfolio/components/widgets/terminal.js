import { Terminal } from "xterm/lib/xterm.js";
import "xterm/css/xterm.css";

import { Frame, $ } from "../../libs/gui.js";

var term = new Terminal({
	rows: 22,
	cols: 40
});

var Term = new Frame('div');

term.open(Term[0]);

Term.terminal = term;

Term.prepend(`<div class="terminal_header"><span class="terminal_icon"></span><span class="terminal_icon"></span><span class="terminal_icon"></span></div>`);

term.write(' $ ')

export default Term;