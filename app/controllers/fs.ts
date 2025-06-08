type FileSystemNode = {
  name: string;
  type: 'dir' | 'file';
  children?: FileSystemNode[];
  content?: string;
};

function parsePaths(paths: string[]): FileSystemNode[] {
  const fileSystem: FileSystemNode[] = [];

  function escapeContent(content: string): string {
    return content.replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }

  paths.forEach((path) => {
    const contentMatch = path.match(/"(.*)"/);
    const content = contentMatch ? escapeContent(contentMatch[1]) : '';

    const pathWithoutContent = contentMatch ? path.split('"')[0] : path;
    const parts = pathWithoutContent.split('/').filter(part => part !== '');

    let current = fileSystem;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        const isDir = pathWithoutContent.endsWith('/');
        const name = part.trim();

        let node: FileSystemNode = { name, type: isDir ? 'dir' : 'file' };

        if (!isDir) {
          node.content = content;
        }

        if (isDir && !node.children) {
          node.children = [];
        }

        current.push(node);
      } else {
        const existingDir = current.find((node) => node.name === part && node.type === 'dir');
        if (existingDir) {
          current = existingDir.children!;
        } else {
          const newDir: FileSystemNode = { name: part, type: 'dir', children: [] };
          current.push(newDir);
          current = newDir.children!;
        }
      }
    });
  });

  return fileSystem;
}


export default class FS {
  static file_system = parsePaths([
    '/bin/',
    '/bin/bash "echo hii"',
    '/home/makano/',
    '/home/makano/example.txt "hello"',
    '/home/makano/example.coffee "print \'hi\'"',
    '/home/makano/example.js "console.log(\'Hello\')"',
  ]);

  private static findNode(filepath: string): FileSystemNode | null {
    const parts = filepath.split('/').filter(part => part !== '');


    let current = { name: '/', type: 'dir', children: this.file_system } as FileSystemNode;

    for (const part of parts) {
      const nextNode = current.children!.find(node => node.name === part);
      if (!nextNode) return null;
      current = nextNode;
    }

    return current;
  }

  // Check if the file or directory exists
  static exists(filepath: string): boolean {
    return this.findNode(filepath) !== null;
  }

  // Read file content
  static readFile(filepath: string): string | null {
    const node = this.findNode(filepath);
    console.log(node);
    if (node && node.type === 'file') {
      return node.content ?? '';
    }
    return null;
  }

  // Read directory contents (children of the directory)
  static readdir(filepath: string): string[] | null {
    const node = this.findNode(filepath);
    if (node && node.type === 'dir' && node.children) {
      return node.children.map(child => child.name);
    }
    return null;
  }

  // Write content to a file
  static writeFile(filepath: string, content: string): boolean {
    const node = this.findNode(filepath);
    if (node && node.type === 'file') {
      node.content = content;
      return true;
    }
    return false;
  }

  // Create a new file with content
  static makeFile(filepath: string, content: string): boolean {
    const parts = filepath.split('/').filter(part => part !== '');
    const filename = parts.pop()!;
    const dirPath = parts.join('/');
    const dirNode = this.findNode(dirPath);

    if (dirNode && dirNode.type === 'dir') {
      const newFile: FileSystemNode = { name: filename, type: 'file', content };
      dirNode.children?.push(newFile);
      return true;
    }
    return false;
  }

  // Create a new directory
  static makedir(filepath: string): boolean {
    const parts = filepath.split('/').filter(part => part !== '');
    const dirname = parts.pop()!;
    const dirPath = parts.join('/');
    const parentNode = this.findNode(dirPath);

    if (parentNode && parentNode.type === 'dir') {
      const newDir: FileSystemNode = { name: dirname, type: 'dir', children: [] };
      parentNode.children?.push(newDir);
      return true;
    }
    return false;
  }
}
