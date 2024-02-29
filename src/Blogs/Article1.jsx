// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Article.css';

const Article1 = () => {
    const [activeHeading, setActiveHeading] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    const headings = [
      { id: 'section1', title: 'Introduction' },
      { id: 'section2', title: 'Main Content' },
      { id: 'section3', title: 'Conclusion' },
      // Add more sections as needed
    ];
  
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveHeading(i);
          break;
        }
      }
    };
  
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (<>
  
        <div className="app">
          <div className="content">
            <div className="article-section">
              <h1 className="article-heading">Your Article Title</h1>
              <div className="article-content">
                <h2 id="section1">Introduction</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus justo nec est
                  laoreet, vel bibendum metus fermentum. Ut sit amet libero eu libero bibendum
                  consectetur.
                </p>
  
                <h2 id="section2">Main Content</h2>
                <p>
                  Curabitur aliquet massa nec nisi pellentesque, et suscipit justo euismod. Sed
                  ullamcorper magna at dignissim bibendum.
                </p>
                <p>
                  Nulla facilisi. Vestibulum scelerisque feugiat orci non luctus. Sed venenatis
                  vestibulum libero, ut scelerisque ligula viverra in.
                </p>
  
                <h2 id="section3">Conclusion</h2>
                <p>
                  In conclusion, lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  dapibus justo nec est laoreet, vel bibendum metus fermentum. Ut sit amet libero eu
                  libero bibendum consectetur.
                </p>
              </div>
            </div>
            {!isMobile && (
              <div className="table-of-contents">
                <h2 className="toc-heading">Table of Contents</h2>
                <ul className="toc-list">
                  {headings.map((heading, index) => (
                    <li key={index} className={`toc-item ${index === activeHeading ? 'active' : ''}`}>
                      <a href={`#${heading.id}`} className="toc-link">{heading.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        </>
  );
};

export default Article1;
