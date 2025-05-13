import { useRef } from "react";

type eventMap = {
  _call?: (event: Event) => any,
  [key: string]: any
}

let termUsed: any = null;
export function useTerminalEvents(termRef: any) {
  const renderedLines = useRef<string[]>([]);
  const renderedInput = useRef<string>("");

  if(termUsed){
    return termUsed;
  }

  const events: eventMap = {};


  const clearTerminal = () => {
    termRef.current.reset();
    renderedLines.current = [];
    renderedInput.current = "";
  };

  events["terminal:clear"] = () => {
    clearTerminal();
  };

  events["terminal:line_break"] = () => {
    termRef.current?.write('\n\r');
  },

  events["terminal:write_lines"] = (lines: string[]) => {
    lines.forEach(line => {
      termRef.current.writeln(line);
      renderedLines.current.push(line);
    });
  };
  events["terminal:write"] = (lines: string[]) => {
    lines.forEach(line => {
      termRef.current?.write(line);
    });
  };

  events["terminal:update_line"] = (index: number, line: string) => {
    if (index < 0 || index >= renderedLines.current.length) return;
    renderedLines.current[index] = line;

    const linesToRewrite = renderedLines.current.slice(index);

    termRef.current.reset();
    renderedLines.current.slice(0, index).forEach(l => termRef.current.writeln(l));
    linesToRewrite.forEach(l => termRef.current.writeln(l));
    if (renderedInput.current) termRef.current.write(renderedInput.current);
  };

  events["terminal:delete_line"] = (index: number) => {
    if (index < 0 || index >= renderedLines.current.length) return;
    renderedLines.current.splice(index, 1);
    termRef.current.reset();
    renderedLines.current.forEach(l => termRef.current.writeln(l));
    if (renderedInput.current) termRef.current.write(renderedInput.current);
  };

  events["terminal:set_input"] = (input: string) => {
    termRef.current?.write('\x1b[2K\r');
    termRef.current.write('$ ' + input);
    renderedInput.current = input;
  };

  events._define = (name: string, cb: any) => {
    console.log(name, cb);
    events[name] = cb;
  }

  termUsed = events;

  return events;
}

