import { micromark } from "micromark";
import DOMPurify from "dompurify";

let posts = [];
let postList = {
  "posts": []
};

function PostTeaser() {
  getPostList();
  console.log(postList.posts);
  return (
    <div className="teaser">
      {postList.posts.map((post, index) => ( // issue: if one file doesn't load then entire order is messed up ---- postList.posts.slice().reverse().map()
        <div className="teaser-bkg" key={post.id}>
          <div className="teaser-l">
            <div className="teaser-header">{post.title}</div>
            <div className="teaser-text">{{__html: DOMPurify.sanitize(micromark(posts[index]))}}</div>
            <div className="teaser-read-more">read more</div>
            <div className="teaser-featured-tag">{ index === 0 ? "Featured article" : "" }</div>
            <div className="teaser-date">{post.date}</div>
          </div>
          <div className="teaser-r">
            <img className="teaser-img" src={post.img} alt={post.alt}></img>
          </div>
        </div>
      ))}
    </div>
  )
}

// need this for info to style teaser boxes :)
async function getPostList() {
  const postListPath = '/blog/posts/postlist.json';
  let postListJson;
  try {
    const response = await fetch(postListPath);
    postListJson = await response.json();
  } catch (e) {
    console.error("Uh oh! " + e);
  }

  postListJson.posts.forEach((post) => {
    let formattedPost = {
      "id": post.id,
      "title": post.title,
      "fileName": post.fileName,
      "date": post.date,
      "img": post.img,
      "alt": post.alt
    };
    postList.posts.push(formattedPost);
  })
  getPosts(postList);
  return postList;
}

async function getPosts(postList) {
  const postsDir = "/blog/posts";
  await Promise.all(postList.posts.map(async (post) => {
    const response = await fetch(`${postsDir}/${post.fileName}`);
    if (response.ok) {
      const postContent = await response.text();
      posts.push(postContent);
    }
  }))
}

export default PostTeaser;