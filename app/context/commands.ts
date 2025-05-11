import FS from "../controllers/fs";
import path from "path";

type ExecutionContext = {
  write: (...strings: string[]) => void
  writeLine: (...strings: string[]) => void
  clear: () => void
};
let current_dir = "/home/makano";
export const Commands = {
  "ls": (o: ExecutionContext, dirname: string = '') => {
    dirname = getCurrentDir(dirname);
    if (FS.exists(dirname)) {
      const items = FS.readdir(dirname);
      
      if (items && items.length > 0) {
        let formattedItems = "";
        
        const DIR_COLOR = "\x1b[34m";
        const FILE_COLOR = "\x1b[32m";
        const RESET_COLOR = "\x1b[0m";

        const gridItems = items.map(item => {
          const isDir = FS.exists(`${dirname}/${item}`) && FS.readdir(`${dirname}/${item}`);
          return isDir ? `${DIR_COLOR}${item}${RESET_COLOR}` : `${FILE_COLOR}${item}${RESET_COLOR}`;
        });

        const rows = Math.ceil(gridItems.length / 3);
        for (let i = 0; i < rows; i++) {
          const rowItems = gridItems.slice(i * 3, i * 3 + 3);
          formattedItems += rowItems.join("    ") + "\n";
        }

        o.writeLine(...formattedItems.trim().split('\n'));
      } else {}
    } else {
      o.writeLine(`"${dirname}": No such file or directory (os error 2)`);
    }
  },
  cd(o: ExecutionContext, dirname: string = "/home/makano"){
    current_dir = getCurrentDir(dirname)
  },
  pwd(o: ExecutionContext){
    o.writeLine(current_dir);
  },
  cat(o: ExecutionContext, filepath: string){
    filepath = getCurrentDir(filepath);
    if (FS.exists(filepath)) {
      const content = FS.readFile(filepath);
      if(content) o.writeLine(...content.split('\n'));
    } else {
      o.writeLine(`cat: ${filepath}: No such file or directory`)
    }
  },
  clear(o: ExecutionContext){
    o.clear()
  }
};

function getCurrentDir(dirname: string){
  return dirname.startsWith('/') ? dirname : path.join(current_dir, dirname);
}

export function execCommand(name: string, args: string[], states: any){
  return (Commands as any)[name](states, ...args);
}

export function existsCommand(name: string){
  return name in Commands
}