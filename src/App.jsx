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
      <main>
        <div className="sidebar">
          <div className="whoami">
            <h3>Who am I?</h3>
            <div className="whoami-textbox">
              <p>An aspiring freelance full-stack developer with a love for writing and weird design. Contact me through Mastodon or LinkedIn to get talking!</p>
            </div>
          </div>
          <div className="site-socials-container">
            <div className="site-social-label">
              <h4>My site and socials</h4>
            </div>
            <div className="site-icons">
              <img src="/blog/src/assets/mastodon-logo.png" alt="mastodon logo" className="social-icon-img"></img>
              <img src="/blog/src/assets/linkedin-logo.png" alt="linkedin logo" className="social-icon-img"></img>
              <img src="/blog/src/assets/headshot.png" alt="a lovely portrait of me" className="social-icon-img" />
            </div>
          </div>
          <div className="cool-things">
            <h4>Cool things I made</h4>
            <div className="cool-items-grid">
              <div className="cool-item"></div>
              <div className="cool-item"></div>
              <div className="cool-item"></div>
              <div className="cool-item"></div>
              <div className="cool-item"></div>
              <div className="cool-item"></div>
            </div>
          </div>
        </div>
        <div className="articles-container">
          <PostTeaser />
        </div>
      </main>
    </>
  )
}



export default App;