import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export function useTerminalEvents(termRef: any, events: any) {
  const renderedLines = useRef<string[]>([]);
  const renderedInput = useRef<string>("");

  useEffect(() => {
    const term = termRef.current;
    if (!term) return;

    const clearTerminal = () => {
      term.reset();
      renderedLines.current = [];
      renderedInput.current = "";
    };

    events["terminal:clear"] = () => {
      clearTerminal();
    };

    events["terminal:write_lines"] = (lines: string[]) => {
      lines.forEach(line => {
        term.writeln(line);
        renderedLines.current.push(line);
      });
    };

    events["terminal:update_line"] = (index: number, line: string) => {
      if (index < 0 || index >= renderedLines.current.length) return;
      // Re-render from the updated line onward
      renderedLines.current[index] = line;

      const linesToRewrite = renderedLines.current.slice(index);

      term.reset(); // Clear all
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
      // Clear old input
      term.write('\r');
      term.write('\x1b[K'); // Clear line
      term.write(input);
      renderedInput.current = input;
    };
  }, [termRef.current]);
}


export default function XTermTerminal({
  onInit = () => {},
}: {
  onInit?: (terminal: Terminal) => any
}) {
  const xtermRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (xtermRef.current && !termRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        theme: { background: "rgba(0,0,0,0)" },
      });
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(xtermRef.current);
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
