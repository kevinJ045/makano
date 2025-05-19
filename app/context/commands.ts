import FS from "../controllers/fs";
import path from "path";
import { registerCommands } from "./stdcommands";

type ExecutionContext = {
  write: (...strings: string[]) => void
  writeLine: (...strings: string[]) => void
  clear: () => void
};
let current_dir = "/home/makano";

export function execCommand(name: string, args: string[], states: any){
  let cmd = "";
  if(FS.exists('/bin/'+name)){
    cmd = "/bin/"+name;
  } else {
    cmd = name;
  }
  try{
    let cmd_content = eval(`(${FS.readFile(cmd)})`)
    return cmd_content({
      ...states,
      FS,
      getCurrentDir(dirname: string){
        return dirname.startsWith('/') ? dirname : path.join(current_dir, dirname);
      },
      setCurrentDir(dirname: string){
        current_dir = this.getCurrentDir(dirname)
      }
    }, ...args);
  } catch(e){
    states.writeLine('Error');
  }
}
registerCommands();
export function existsCommand(name: string){
  return FS.exists('/bin/'+name) || FS.exists(name); 
}