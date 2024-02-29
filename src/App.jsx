import { useState } from 'react'
import './App.css'
import { micromark } from 'micromark'
import PostTeaser from './components/PostTeaser';
import { Routes, Route, Link } from 'react-router-dom';
import Post from './components/post';
import blog from '/public/images/blog.png';
import github from '/public/images/github.png';
import coin from '/public/images/coin.png';
import headshot from '/public/images/headshot.png';
import home from '/public/images/home.png';
import linkedin from '/public/images/linkedin-logo.png';
import mastodon from '/public/images/mastodon-logo.png';
import resume from '/public/images/resume.png';


function App() {
  const [requestedPostFile, setRequestedPostFile] = useState();

  return (
    <>
      <div className="header-band">
        <div className="header">
          <h1>Welcome to the blog of Josh LaRue</h1>
          <button className="home-btn"><Link id="home-link" to={"blog"}><h5>go home</h5></Link></button>
        </div>
      </div>
      <main>
        <div className="sidebar">
          <div className="sticky-side">
            <div className="whoami">
              <h3>Who am I?</h3>
              <div className="whoami-textbox">
                <p>An aspiring full-stack developer with a love for writing and weird design. Contact me through Mastodon or LinkedIn to get talking!</p>
              </div>
            </div>
            <div className="site-socials-container">
              <div className="site-social-label">
                <h4>My site and socials</h4>
              </div>
              <div className="site-icons">
                <div className="social-icon-img-wrapper">
                  <a rel="me" href="https://mastodon.social/@joshlarue" className="social-icon-img"><img src={mastodon} alt="mastodon logo" className="social-icon-img"></img></a>
                </div>
                <div className="social-icon-img-wrapper">
                  <a href="https://www.linkedin.com/in/joshua-larue-swd/" className="social-icon-img"><img src={linkedin} alt="linkedin logo" className="social-icon-img"></img></a>
                </div>
                <div className="social-icon-img-wrapper">
                  <a href="https://joshlarue.github.io" className="social-icon-img"><img src={headshot} alt="a lovely portrait of me" className="social-icon-img"/></a>
                </div>
                <div className="social-icon-img-wrapper">
                  <a href="https://github.com/joshlarue" className="social-icon-img"><img src={github} alt="a github logo!" className="social-icon-img"/></a>
                </div>
              </div>
            </div>
            <div className="cool-things">
              <h4>Cool things I've made</h4>
              <div className="cool-items-grid">
                <div className="cool-item">
                  <a href="https://joshlarue.github.io/nyah-portfolio"><img src={resume} alt="my resume icon" /> </a>
                </div>
                <div className="cool-item">
                <a href="https://joshlarue.github.io/blog"><img src={blog} alt="my blog icon" /></a>
                </div>
                <div className="cool-item">
                  <a href="https://joshlarue.github.io"><img src={headshot} alt="my website headshot" /></a>
                </div>
                <div className="cool-item">
                  <a href="https://joshlarue.github.io"><img src={coin} alt="just a fun coin. sometimes spins." /></a>
                </div>
                <div className="cool-item">
                <a href="https://joshlarue.github.io"><img src={home} alt="home page of my website" /></a>
                </div>
                <div className="cool-item">
                <a href="https://github.com/joshlarue"><img src={github} alt="a github logo!" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="articles-container">
        <Routes>
          <Route exact strict path="blog" element={<PostTeaser setRequestedPostFile={setRequestedPostFile}/>} />
          <Route path={"blog/post/*"} element={<Post requestedPostFile={requestedPostFile} />} />
        </Routes>
        </div>
      </main>
    </>
  )
}



export default App;