import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";


// {
//   "terminal:write_lines": (lines: string[]) => {
//     lines.forEach(line => term?.writeln(line));
//   },
//   "terminal:set_input": (input: string) => {
//     term?.write('\x1b[2K\r');
//     term?.write(input);
//   },
//   "terminal:line_break": (input: string) => {
//     term?.write('\n\r');
//   },
//   "terminal:clear": (input: string) => {
//     term?.reset();
//   }
// };

type eventMap = {
  _call?: (event: Event) => any,
  [key: string]: any
}

export function useTerminalEvents(term: any) {
  const renderedLines = useRef<string[]>([]);
  const renderedInput = useRef<string>("");

  const events: eventMap = {};


  const clearTerminal = () => {
    term.reset();
    renderedLines.current = [];
    renderedInput.current = "";
  };

  events["terminal:clear"] = () => {
    clearTerminal();
  };

  events["terminal:line_break"] = () => {
    term?.write('\n\r');
  },

  events["terminal:write_lines"] = (lines: string[]) => {
    lines.forEach(line => {
      term.writeln(line);
      renderedLines.current.push(line);
    });
  };
  events["terminal:write"] = (lines: string[]) => {
    lines.forEach(line => {
      term.write(line);
    });
  };

  events["terminal:update_line"] = (index: number, line: string) => {
    if (index < 0 || index >= renderedLines.current.length) return;
    renderedLines.current[index] = line;

    const linesToRewrite = renderedLines.current.slice(index);

    term.reset();
    renderedLines.current.slice(0, index).forEach(l => term.writeln(l));
    linesToRewrite.forEach(l => term.writeln(l));
    if (renderedInput.current) term.write(renderedInput.current);
  };

  events["terminal:delete_line"] = (index: number) => {
    if (index < 0 || index >= renderedLines.current.length) return;
    renderedLines.current.splice(index, 1);
    term.reset();
    renderedLines.current.forEach(l => term.writeln(l));
    if (renderedInput.current) term.write(renderedInput.current);
  };

  events["terminal:set_input"] = (input: string) => {
    term?.write('\x1b[2K\r');
    term.write('$ ' + input);
    renderedInput.current = input;
  };

  events._define = (name: string, cb: any) => {
    console.log(name, cb);
    events[name] = cb;
  }

  return events;
}


export default function XTermTerminal({
  onInit = () => {},
  onInput = () => {}
}: {
  onInit?: (terminal: Terminal) => any
  onInput?: (event: Event) => any
}) {
  const xtermRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (xtermRef.current && !termRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: "Fira Code",
        rows: 18,
        letterSpacing: 0,
        theme: {
          background: "rgba(0,0,0,0)",
          black:        "#1e1e2e", // base
          red:          "#f38ba8", // red
          green:        "#a6e3a1", // green
          yellow:       "#f9e2af", // yellow
          blue:         "#89b4fa", // blue
          magenta:      "#f5c2e7", // pink
          cyan:         "#94e2d5", // teal
          white:        "#cdd6f4", // text

          brightBlack:  "#585b70", // surface2
          brightRed:    "#f38ba8", // red
          brightGreen:  "#a6e3a1", // green
          brightYellow: "#f9e2af", // yellow
          brightBlue:   "#89b4fa", // blue
          brightMagenta:"#f5c2e7", // pink
          brightCyan:   "#94e2d5", // teal
          brightWhite:  "#ffffff", // true white
        }
      });
      const fitAddon = new FitAddon();
      // term.loadAddon(fitAddon);
      term.open(xtermRef.current);
      term.onKey(({ domEvent }) => {
        onInput(domEvent)
      })
      fitAddon.fit();

      onInit(term);
      termRef.current = term;
      fitAddonRef.current = fitAddon;
    }

    const handleResize = () => {
      fitAddonRef.current?.fit();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div ref={xtermRef} style={{ width: "100%", height: "400px" }} />;
}
