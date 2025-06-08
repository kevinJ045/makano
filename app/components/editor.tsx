
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from 'react';

const catppuccinMochaTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: "", foreground: "cdd6f4", background: "1e1e2e" },
    { token: "comment", foreground: "585b70", fontStyle: "italic" },
    { token: "keyword", foreground: "f38ba8" },
    { token: "identifier", foreground: "cba6f7" },
    { token: "number", foreground: "fab387" },
    { token: "string", foreground: "a6e3a1" },
    { token: "delimiter", foreground: "89b4fa" },
    { token: "type", foreground: "89b4fa" },
    { token: "function", foreground: "b4befe" },
  ],
  colors: {
    "editor.background": "#1e1e2e",
    "editor.foreground": "#cdd6f4",
    "editorLineNumber.foreground": "#585b70",
    "editorLineNumber.activeForeground": "#f5c2e7",
    "editorCursor.foreground": "#f5c2e7",
    "editor.selectionBackground": "#585b7044",
    "editor.inactiveSelectionBackground": "#313244",
    "editor.lineHighlightBackground": "#31324488",
    "editorIndentGuide.background": "#45475a",
    "editorIndentGuide.activeBackground": "#f5c2e7",
  },
};


export default function MonacoEditorInstance({
  editorLanguage,
  setEditorLanguage,
  value,
  setValue
} : {
  editorLanguage: string,
  setEditorLanguage: (lang: string) => void
  value: string,
  setValue: (lang: string) => void
}){
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("default", catppuccinMochaTheme as any);
      monaco.editor.setTheme('default')
    }
  }, [monaco]);

  return <Editor
    height="100%"
    language={editorLanguage}
    value={value}
    theme="default"
    onChange={(value) => {
      let shebang = value?.match(/^#!\/usr\/bin\/env (.+)/);
      if(shebang){
        if(editorLanguage !== shebang[1]){
          setEditorLanguage(shebang[1])
        }
      }
      if(value) setValue(value);
    }}
  />
}