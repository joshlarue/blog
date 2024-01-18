import { useState } from 'react'
import './App.css'
import { micromark } from 'micromark'
import PostTeaser from './components/PostTeaser';
import { Routes, Route } from 'react-router-dom';
import Post from './components/post';


function App() {
  const [requestedPostId, setRequestedPostId] = useState();

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
              <div className="cool-item">
                <img src="/blog/src/assets/resume.png" alt="my resume icon" />
              </div>
              <div className="cool-item">
                <img src="/blog/src/assets/headshot.png" alt="my website headshot" />
              </div>
              <div className="cool-item">
                <img src="/blog/src/assets/coin.png" alt="just a fun coin. sometimes spins." />
              </div>
              <div className="cool-item">
                <img src="/blog/src/assets/home.png" alt="home page of my website" />
              </div>
              <div className="cool-item">
                <img src="/blog/src/assets/bulletpoint.png" alt="showing off my pixel drawing skills with a bullet point" />
              </div>
              <div className="cool-item">
                <img src="/blog/src/assets/blog.png" alt="my blog icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="articles-container">
        <Routes>
          <Route exact strict path="blog" element={<PostTeaser setRequestedPostId={setRequestedPostId}/>} />
          <Route path={"blog/post/*"} element={<Post requestedPostId={requestedPostId} />} />
        </Routes>
        </div>
      </main>
    </>
  )
}



export default App;