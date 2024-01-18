import { micromark } from "micromark";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostTeaser(props) {
  const [posts, setPosts] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const list = await getPostList();
      setPostList(list);
      const fetchedPosts = await getPosts(list, props);
      setPosts(fetchedPosts);
    }

    fetchData();
  }, []);


  // returns a component that is generated by the renderTeaser function
  return (
    <div className="teaser">
      {renderTeasers(postList, posts, props)}
    </div>
  )
}

function renderTeasers(postList, posts, props) {
  console.log(postList);
  
  return postList.map((post, index) => ( // issue: if one file doesn't load then entire order is messed up ---- postList.posts.slice().reverse().map()
      <div className="teaser-bkg" key={post.id}>
        <div className="teaser-l">
          <div className="teaser-header"><h4>{post.title}</h4></div>
          <div className="teaser-text" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(micromark(posts[index]))}}></div>
          <div className="more-info">
            <Link to={"post/" + post.id} className="teaser-read-more" onClick={() => handleClick(post.id, props)}><p>read more</p></Link>
            { index === 0 ? <div className="teaser-featured-tag"><p>Featured article</p></div> : null }
            <div className="teaser-date"><p>{post.date}</p></div>
          </div>
        </div>
        <div className="teaser-r">
          <div className="teaser-img-container">
            <img className="teaser-img" src="/blog/src/assets/programming.jpg" alt={post.alt}></img>
          </div>
        </div>
      </div>
  ));
}

const handleClick = (postId, props) => {
  props.setRequestedPostId(postId);
};

// need this for info to style teaser boxes :)
async function getPostList() {
  const postListPath = '/blog/posts/postlist.json';
  let postListJson = [];

  try {
    const response = await fetch(postListPath);
    postListJson = await response.json();

    return postListJson.posts.map((post) => ({
      id: post.id,
      title: post.title,
      fileName: post.fileName,
      date: post.date,
      img: post.img,
      alt: post.alt
      }));
  } catch (e) {
    console.error("Uh oh! " + e);
    return [];
  }
}

async function getPosts(postList) {
  const postsDir = "/blog/posts";
  const fetchPromises = postList.map(async (post) => {
    const response = await fetch(`${postsDir}/${post.id}.md`);
    if (response.ok) {
      return response.text();
    }
    return null;
  })

  const tempPosts = await Promise.all(fetchPromises);
  return tempPosts.filter((content) => content !== null);
}

export default PostTeaser;