import { micromark } from "micromark";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

function Post(props) {
  const postId = props.requestedPostId;
  let fetchedPost = "";
  let postInfo = {};

  const fetchPost = new Promise(useEffect(() => {
    async function fetchData() {
      postInfo = await getPostInfo(postId);
      fetchedPost = await getPost(postId);
    }

    fetchData();
  }, []));


  return (
    <div className="post">
      {renderPost(postInfo, fetchedPost)}
    </div>
  )
}

function renderPost(postInfo, post) {
  console.log(postInfo);
  return (
      <div className="post-bkg" key={postInfo.id}>
        <div className="post-header"><h4>{postInfo.title}</h4></div>
        <div className="post-text" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(micromark(post))}}></div>
        <div className="more-info">
          <div className="post-read-more"><p>read more</p></div>
          <div className="post-featured-tag"><p>{ postInfo.id === 0 ? "Featured article" : null }</p></div>
          <div className="post-date"><p>{postInfo.date}</p></div>
        </div>
        <div className="post-img-container">
          <img className="post-img" src="/blog/src/assets/programming.jpg" alt={postInfo.alt}></img>
        </div>
      </div>
  );
}

// need this for info to style teaser boxes :)
async function getPostInfo(requestedPostId) {
  const postListPath = '/blog/posts/postlist.json';
  let postListJson = [];

  try {
    const response = await fetch(postListPath);
    postListJson = await response.json();

    postListJson.posts.forEach((post) => {
      console.log(post.id);
      if (post.id == requestedPostId) {
        return post = ({
          id: post.id,
          title: post.title,
          fileName: post.fileName,
          date: post.date,
          img: post.img,
          alt: post.alt
          });
      }
    })
  } catch (e) {
    console.error("Uh oh! " + e);
    return [];
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
  return tempPost.filter((content) => content !== null);
}

export default Post;