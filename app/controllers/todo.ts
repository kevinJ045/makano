import { Todo } from "../models/todo";

export async function getAllTodo(startIndex = 0, count = 10) {
  let perPage = count > 100 ? 100 : count;
  let totalPages = Math.ceil(count / perPage);
  let todos: Todo[] = [];

  for (let page = 1; page <= totalPages; page++) {
    let url = `https://api.github.com/repos/kevinj045/kevinj045/contents/todos?per_page=${perPage}&page=${page}`;

    try {
      let todoRaw = await fetch(url).then(r => r.json());

      for (let todo of todoRaw) {
        if (todo.type === 'file') {
          let todoContent = await fetch(todo.download_url).then(r => r.json());

          todos.push(todoContent);
        }
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  return todos.slice(startIndex, startIndex + count);
}