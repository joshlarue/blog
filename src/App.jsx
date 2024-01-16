import { useState } from 'react'
import './App.css'
import { micromark } from 'micromark'
let postList = [];
const posts = [];
const articleContainer = document.querySelector(".articles-container");

function App() {
  getPostList();

  return (
    <>
      <div className="header">
        <h1>Welcome to the blog of Josh LaRue</h1>
      </div>
      <div className="sidebar">
        <div className="whoami">
          <h2>Who am I?</h2>
          <div className="whoami-textbox">
            <p>An aspiring freelance full-stack developer with a love for writing and weird design. Contact me through Mastodon or LinkedIn to get talking!</p>
          </div>
        </div>
        <div className="site-socials">
          <div className="site-social-label">
            <h3>My site and socials</h3>
          </div>
          <div className="site-icons">

          </div>
        </div>
        <div className="cool-things">
          <h2>Cool things I made</h2>
          <div className="cool-item"></div>
          <div className="cool-item"></div>
          <div className="cool-item"></div>
          <div className="cool-item"></div>
          <div className="cool-item"></div>
          <div className="cool-item"></div>
        </div>
      </div>
      <div className="articles-container">
        
      </div>
    </>
  )
}

function getPostList() {
  const postListPath = '/blog/posts/postlist.json';
  fetch(postListPath)
  .then((response) => response.json())
  .then((data) => {
    postList = data.posts;
    getPosts(postList);
  })
  .catch((e) => console.error("Uh oh! " + e));
}

function getPosts(postList) {
  const postsDir = "/blog/posts";
  postList.forEach((post) => {
    console.log("Fetching post " + post.fileName);
    fetch(`${postsDir}/${post.fileName}`)
      .then((response) => {
        posts.push(response.text());
      })
  })
  console.log(posts);
}

export default App;