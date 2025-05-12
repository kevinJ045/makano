import { useRef } from "react";

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

