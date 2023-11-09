import { Project } from "../models/project";

export async function getAllProjects(startIndex = 0, count = 10) {
  let perPage = count > 100 ? 100 : count; // GitHub API allows a maximum of 100 items per page
  let totalPages = Math.ceil(count / perPage);
  let projects: Project[] = [];

  for (let page = 1; page <= totalPages; page++) {
    let url = `https://api.github.com/repos/kevinj045/kevinj045/contents/projects?per_page=${perPage}&page=${page}`;

    try {
      let postsRaw = await fetch(url).then(r => r.json());

      // Iterate through each file in the 'posts' folder
      for (let project of postsRaw) {
        if (project.type === 'file') {
          let projectContent = await fetch(project.download_url).then(r => r.json());

          projects.push(projectContent);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  // Slice the array to return the specified range
  return projects.slice(startIndex, startIndex + count);
}