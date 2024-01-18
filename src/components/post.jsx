import { micromark } from "micromark";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

function Post(props) {
  const postId = props.requestedPostId;
  const [fetchedPost, setPost] = useState("Hello this is my post. What are you doing here");
  const [postInfo, setPostInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPostInfo(await getPostInfo(postId));
        setPost(await getPost(postId));
      } catch (e) {
        console.error("Uh oh! " + e);
      }
    }
  
    fetchData();
  }, [postId]);

  return (
    <div className="post">
      {renderPost(postInfo, fetchedPost)}
    </div>
  )
}

function renderPost(postInfo, post) {
  if (!postInfo) {
    return null;
  }
  return (
      <div className="post-bkg" key={postInfo.id}>
        <div className="post-header"><h4>{postInfo.title}</h4></div>
        
        <div className="more-info">
          <div className="post-read-more"><p>read more</p></div>
          { postInfo.id === 0 ? <div className="post-featured-tag"><p>Featured article</p></div> : null }
          <div className="post-date"><p>{postInfo.date}</p></div>
        </div>
        <div className="post-text" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(micromark(post))}}></div>
        <div className="post-img-container">
          <img className="post-img" src="/blog/src/assets/programming.jpg" alt={postInfo.alt}></img>
        </div>
      </div>
  );
}

async function getPostInfo(requestedPostId) {
  const postListPath = '/blog/posts/postlist.json';
  let postListJson = [];

  try {
    const response = await fetch(postListPath);
    postListJson = await response.json();

    let post = postListJson.posts.find((post) => post.id === requestedPostId);
    if (post) {
    console.log(requestedPostId);
    if (post) {
      return post = ({
        id: post.id,
        title: post.title,
        fileName: post.fileName,
        date: post.date,
        img: post.img,
        alt: post.alt
        });
      } else {
        console.error("Post not found.");
        return null;
      }
    }
  } catch (e) {
    console.error("Uh oh! Error fetching post list. " + e);
    return null;
  }
}

async function getPost(postId) {
  const postsDir = "/blog/posts";
  const fetchPromises = async () => {
    const response = await fetch(`${postsDir}/${postId}.md`);
    if (response.ok) {
      return response.text();
    }
    return null;
  }

  const tempPost = await new Promise(fetchPromises);
  console.log(tempPost);
  return tempPost.filter((content) => content !== null);
}

export default Post;