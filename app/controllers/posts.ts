import { Post } from "../models/post";

function parsePost(postContent: string, filename: string) {
  const postLines = postContent.split('\n');
  let post = {
    title: '',
    subtitle: '',
    content: '',
    tags: new Array<string>(),
		filename: filename
  };

  for (let line of postLines) {
    if (line.startsWith('%== title:')) {
      post.title = line.replace('%== title:', '').trim();
    } else if (line.startsWith('%== subtitle:')) {
      post.subtitle = line.replace('%== subtitle:', '').trim();
    } else if (line.startsWith('%== tags:')) {
      post.tags = line.replace('%== tags:', '').trim().split(',').map(tag => tag.trim());
    } else {
      post.content += line + '\n';
    }
  }

  return post;
}

export async function getAllPosts(startIndex = 0, count = 10) {
  let perPage = count > 100 ? 100 : count;
  let totalPages = Math.ceil(count / perPage);
  let posts: Post[] = [];

  for (let page = 1; page <= totalPages; page++) {
    let url = `https://api.github.com/repos/kevinj045/kevinj045/contents/posts?per_page=${perPage}&page=${page}`;

    try {
      let postsRaw = await fetch(url).then(r => r.json());

      for (let post of postsRaw) {
        if (post.type === 'file') {
          let postContent = await fetch(post.download_url).then(r => r.text());

          posts.push(parsePost(postContent, post.download_url.split('/').pop()));
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  return posts.slice(startIndex, startIndex + count);
}

export async function getPost(filename: string){
	const url = "https://raw.githubusercontent.com/kevinJ045/kevinj045/main/posts/"+filename;
	let postContent = await fetch(url).then(r => r.text());

  return parsePost(postContent, filename);
}