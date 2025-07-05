import FS from "../controllers/fs";
export function registerCommands() {

  FS.makeFile('/bin/ls', (
    (o: any, dirname: string = '') => {
      const { FS } = o;
      dirname = o.getCurrentDir(dirname);
      if (FS.exists(dirname)) {
        const items = FS.readdir(dirname);

        if (items && items.length > 0) {
          let formattedItems = "";

          const DIR_COLOR = "\x1b[34m";
          const FILE_COLOR = "\x1b[32m";
          const RESET_COLOR = "\x1b[0m";

          const gridItems = items.map((item: any) => {
            const isDir = FS.exists(`${dirname}/${item}`) && FS.readdir(`${dirname}/${item}`);
            return isDir ? `${DIR_COLOR}${item}${RESET_COLOR}` : `${FILE_COLOR}${item}${RESET_COLOR}`;
          });

          const rows = Math.ceil(gridItems.length / 2);
          for (let i = 0; i < rows; i++) {
            const rowItems = gridItems.slice(i * 2, i * 2 + 2);
            formattedItems += rowItems.join("    ") + "\n";
          }

          o.writeLine(...formattedItems.trim().split('\n'));
        } else { }
      } else {
        o.writeLine(`"${dirname}": No such file or directory (os error 2)`);
      }
    }
  ).toString());


  FS.makeFile('/bin/clear', (
    (o: any) => o.clear()
  ).toString());

  FS.makeFile('/bin/pwd', (
    (o: any) => o.writeLine(o.getCurrentDir(''))
  ).toString());

  FS.makeFile('/bin/touch', (
    (o: any, filepath: string) => o.FS.makeFile(o.getCurrentDir(filepath))
  ).toString());

  FS.makeFile('/bin/cd', (
    (o: any, dirname = "/home/makano") => o.setCurrentDir(o.getCurrentDir(dirname))
  ).toString());

  FS.makeFile('/bin/cat', (
    (o: any, filepath: string) => {
      const { FS } = o;
      filepath = o.getCurrentDir(filepath);
      if (FS.exists(filepath)) {
        const content = FS.readFile(filepath);
        if(content) o.writeLine(...content.split('\n'));
      } else {
        o.writeLine(`cat: ${filepath}: No such file or directory`)
      }
    }
  ).toString());
}