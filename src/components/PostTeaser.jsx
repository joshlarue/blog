import { micromark } from "micromark";

function PostTeaser() {

  getPostList();
  // need to add article of the week in post-teaser-more div

  return (
    <>
      <div className="post-teaser">
        <div className="post-teaser-bkg">
          <div className="post-teaser-l">
            <div className="post-teaser-header">
              {postMessage.header}
            </div>
            <div className="post-teaser-text">
              {postMessage.text}
            </div>
            <div className="post-teaser-more">
              <div className="post-teaser-read-more">
                <p>read more</p>
              </div>
              <div className="post-teaser-date">
                {postMessage.date}
              </div>
            </div>
          </div>
          <div className="post-teaser-r">
            {postMessage.image}
          </div>
        </div>
      </div>
    </>
  )
}

async function getPostList() {
  let postList = {
    "posts": []
  };
  const postListPath = '/blog/posts/postlist.json';
  try {
    const response = await fetch(postListPath);
    const postListJson = await response.json();

    postListJson.posts.forEach((post) => {
      let formattedPost = {
        "id": post.id,
        "title": post.title,
        "fileName": post.fileName,
        "date": post.date
      };
      postList.posts.push(formattedPost);
    })
    getPosts(postList);
  } catch (e) {
    console.error("Uh oh! " + e);
  }
}

async function getPosts(postList) {
  let posts = [];
  const postsDir = "/blog/posts";
  await Promise.all(postList.posts.map(async (post) => {
    console.log("Fetching post " + post.fileName);
    const response = await fetch(`${postsDir}/${post.fileName}`);
    if (response.ok) {
      const postContent = await response.text();
      posts.push(postContent);
    }
  }))
  console.log(posts);
  populatePosts(postList, posts);
}

function populatePosts(postList, posts) {
  const postTeaserBkg = document.querySelector(".post-teaser-bkg");
  postTeaserBkg.textContent = '';
  postList.posts.forEach((post, index) => {
    console.log(post.title);
    let teaserHeader = document.createElement("div");
    postTeaserBkg.append(teaserHeader);
    teaserHeader.textContent = post.title;
    teaserHeader.classList.add("post-teaser-header");

    let postTeaserText = document.createElement("div");
    postTeaserText.classList.add("post-teaser-text");
    postTeaserText.innerHTML = micromark(posts[index]);
    postTeaserBkg.appendChild(postTeaserText);
  })

}


export default PostTeaser;