"use client";
import { useEffect, useRef, useState } from "react";
import MonacoEditorInstance from "./editor";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import FS from "../controllers/fs";
const languages = ["coffeescript", "javascript", "cpp", "c", "python", "typescript", "java", "dart", "rust"];

export function Tab({ filename, content, onChange }: { onChange: any, content?: string; filename: string }) {
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const defaultValue =
    content ||
    "#!/usr/bin/env coffeescript\n# ^ DO NOT REMOVE THIS LINE\n# ^ To change your language, simply just change the `coffeescript` to your language";
  const [value, setValue] = useState(defaultValue);

  const terminalRef = useRef<HTMLDivElement>(null);
  const term = useRef<Terminal>();

  useEffect(() => {
    if (!term.current && terminalRef.current) {
      term.current = new Terminal({ theme: { background: "#1e1e2e" } });
      term.current.open(terminalRef.current);
      term.current?.writeln(">> ready");
    }
  }, []);

  const runCode = async () => {
    if (editorLanguage === "javascript") {
      let toRun = value;
      try {
        const console = {
          log(...stuff: any[]) {
            term.current?.writeln(stuff.join(" "));
          }
        };
        const result = eval(toRun);
        term.current?.writeln(`=> ${String(result)}`);
      } catch (err: any) {
        term.current?.writeln(`Error: ${err.message}`);
      }
    } else {
      term.current?.writeln(`Language "${editorLanguage}" not supported for execution.`);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left: Editor + Language selector */}
      <div className="flex w-[60%] flex-col">
        <div className="flex h-full">
          <MonacoEditorInstance
            editorLanguage={editorLanguage}
            setEditorLanguage={setEditorLanguage}
            value={value}
            setValue={(value) => {
              onChange(value);
              setValue(value);
            }}
          />
        </div>

        {/* Status bar */}
        <div className="flex absolute bottom-0 left-0 gap-2 items-center justify-between text-white px-4 py-2 text-sm font-mono">
          <div>
            Language:&nbsp;
            <select
              className="bg-[#1e1e2e] border border-[#313244] text-white"
              value={editorLanguage}
              onChange={(e) => setEditorLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={runCode}
            className="bg-[#89b4fa] text-black font-bold px-3 py-1 rounded hover:bg-[#74c7ec]"
          >
            Run
          </button>
        </div>
      </div>

      {/* Right: Terminal */}
      <div className="w-[40%]">
        <div ref={terminalRef} className="h-full" />
      </div>
    </div>
  );
}

type OpenFile = {
  filename: string;
  content: string;
};

export default function Labs({ close: closeL } : { close?: () => void }) {
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([
    { filename: "/home/makano/example.js", content: FS.readFile("/home/makano/example.js") ?? "" }
  ]);
  const [untitledCounter, setUntitledCounter] = useState(1);
  const [activeFile, setActiveFile] = useState<string>(openFiles[0].filename);

  const updateFileContent = (filename: string, newContent: string) => {
    setOpenFiles((prev) =>
      prev.map((file) =>
        file.filename === filename ? { ...file, content: newContent } : file
      )
    );
  };

  const saveFile = (filename: string) => {
    const file = openFiles.find((f) => f.filename === filename);
    if (file) {
      FS.writeFile(filename, file.content);
      console.log(`Saved ${filename}`);
    }
  };

  function openFile(path: string) {
    const exists = FS.exists(path);
    if (!exists) {
      alert(`File "${path}" does not exist.`);
      return;
    }

    if (openFiles.find(f => f.filename === path)) {
      setActiveFile(path); // already open
      return;
    }

    const content = FS.readFile(path) ?? "";
    setOpenFiles([...openFiles, { filename: path, content }]);
    setActiveFile(path);
  }

  function newUntitledFile() {
    const name = `/untitled-${untitledCounter}.txt`;
    setUntitledCounter((n) => n + 1);
    setOpenFiles([...openFiles, { filename: name, content: "" }]);
    setActiveFile(name);
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1e2e]">
      {/* Tabs */}
      <div className="flex items-center px-4 py-2 bg-[#313244]">
        {openFiles.map((file) => (
          <button
            key={file.filename}
            onClick={() => setActiveFile(file.filename)}
            className={`mr-2 px-3 py-1 rounded text-sm font-mono ${file.filename === activeFile
                ? "bg-[#45475a] text-[#cdd6f4]"
                : "bg-[#1e1e2e] text-[#6c7086] hover:bg-[#45475a]"
              }`}
          >
            {file.filename.split("/").pop()}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => saveFile(activeFile)}
            className="px-3 py-1 text-sm rounded bg-[#89dceb] text-[#1e1e2e] hover:bg-[#74c7ec]"
          >
            Save
          </button>
          <button
            onClick={newUntitledFile}
            className="px-3 py-1 text-sm rounded bg-[#f5c2e7] text-[#1e1e2e] hover:bg-[#f2a7de]"
          >
            + New
          </button>
          <button
            onClick={() => {
              const path = prompt("Path to open?");
              if (path) openFile(path);
            }}
            className="px-3 py-1 text-sm rounded bg-[#a6e3a1] text-[#1e1e2e] hover:bg-[#94e2d5]"
          >
            📂 Open
          </button>
        </div>
      </div>

      {/* Editor and Terminal */}
      <div className="flex flex-grow bg-[#1e1e2e] overflow-hidden">
        <div className="flex-grow">
          {openFiles
            .filter((f) => f.filename === activeFile)
            .map((f) => (
              <Tab
                key={f.filename}
                filename={f.filename}
                content={f.content}
                onChange={(val: string) => updateFileContent(f.filename, val)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
