
enum Color {
  Red, // Red
  Blue, // Blue
  Yellow, // Yellow
  Green // Green
}

enum Type {
  Bug,
  Feature
}

enum Status {
  Doing,
  Done,
  Nope
}

enum Difficulty {
  Extreme,
  Hard,
  Easy
}

interface TodoTask {
  title: string,
  subtitle?: string,

  color: Color,
  type: Type,

  status: Status,
  difficulty: Difficulty,

  code?: string,
}

interface TodoCategory{
  title: string,
  subtitle?: string,
  icon?: string,
  
  tasks: TodoTask[]
}

export interface Todo {
	name: string,
	description: string,
  stack: string[],
	tags?: string[],
  github?: string,
  link?: string,
  icon?: string,
  cover?: string,
  collaborators: string[],
  
  categories: TodoCategory[]
}

