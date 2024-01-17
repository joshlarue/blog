import { useState } from 'react'
import './App.css'
import { micromark } from 'micromark'
import PostTeaser from './components/PostTeaser';


function App() {

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
        <PostTeaser />
      </div>
    </>
  )
}



export default App;