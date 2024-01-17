import { micromark } from "micromark";
import DOMPurify from "dompurify";

let posts;
let postList = {
  "posts": []
};

async function PostTeaser() {
  postList = await getPostList();
  console.log(postList);
  return (
    <>
      <div className="teaser">
        {postList.posts.slice().reverse().map((post, index) => ( // issue: if one file doesn't load then entire order is messed up
          <>
            <div className="teaser-bkg" key={post.id}>
              <div className="teaser-l">
                <div className="teaser-header">{post.title}</div>
                <div className="teaser-text">{{__html: DOMPurify.sanitize(micromark(posts[index]))}}</div>
                <div className="teaser-read-more">read more</div>
                <div className="teaser-featured-tag">{ index === 0 ? "Featured article" : "" }</div>
                <div className="teaser-date">{post.date}</div>
              </div>
              <div className="post-teaser-r">
                <img className="teaser-img" src={post.img} alt={post.img-alt}></img>
              </div>
            </div>
          </>
        ))}

      </div>
    </>
  )
}

async function getPostList() {
  const postListPath = '/blog/posts/postlist.json';
  try {
    const response = await fetch(postListPath);
    const postListJson = await response.json();
    console.log(postListJson.posts);

    postListJson.posts.forEach((post) => {
      let formattedPost = {
        "id": post.id,
        "title": post.title,
        "fileName": post.fileName,
        "date": post.date,
        "img": post.img,
        "img-alt": post.img-alt
      };
      postList.posts.push(formattedPost);
    })
    
  } catch (e) {
    console.error("Uh oh! " + e);
  }
  posts = getPosts(postList);
  return postList;
}

async function getPosts(postList) {
  let posts = [];
  const postsDir = "/blog/posts";
  await Promise.all(postList.posts.map(async (post) => {
    const response = await fetch(`${postsDir}/${post.fileName}`);
    if (response.ok) {
      const postContent = await response.text();
      posts.push(postContent);
    }
  }))
  return posts;
}

export default PostTeaser;