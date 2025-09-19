import React, { useState } from "react";
import { FaRegCalendarAlt, FaUserAlt } from "react-icons/fa";
import "./Blog.css";

const Blog = () => {
  // Dummy blog data
  const blogs = [
    {
      id: 1,
      title: "Top 10 Must-Read Books of 2025",
      date: "Sept 15, 2025",
      author: "Admin",
      description:
        "Discover the trending books of this year that readers can’t stop talking about. From fiction to business, here’s the ultimate list for your library.",
      image: "https://dummyimage.com/400x250/00bf63/ffffff&text=Blog+Post+1",
    },
    {
      id: 2,
      title: "Why E-books Are the Future of Reading",
      date: "Sept 10, 2025",
      author: "Editor",
      description:
        "E-books are revolutionizing the way we read. Learn why digital libraries are becoming the go-to for millions of book lovers.",
      image: "https://dummyimage.com/400x250/444/ffffff&text=Blog+Post+2",
    },
    {
      id: 3,
      title: "Meet the Authors: Exclusive Interviews",
      date: "Sept 05, 2025",
      author: "Team",
      description:
        "We sat down with top authors to discuss their inspirations, challenges, and secrets to writing bestsellers.",
      image: "https://dummyimage.com/400x250/111/ffffff&text=Blog+Post+3",
    },
    {
      id: 4,
      title: "The Rise of Audiobooks",
      date: "Sept 01, 2025",
      author: "Admin",
      description:
        "Audiobooks are becoming a new trend. Discover why more people are listening instead of reading.",
      image: "https://dummyimage.com/400x250/777/ffffff&text=Blog+Post+4",
    },
    {
      id: 5,
      title: "Self-Publishing Secrets",
      date: "Aug 28, 2025",
      author: "Guest",
      description:
        "Learn the secrets of self-publishing and how authors are making a name for themselves in the digital world.",
      image: "https://dummyimage.com/400x250/222/ffffff&text=Blog+Post+5",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Calculate indexes
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  // Total pages
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  // Handle page change
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <section className="blog-section">
      {/* Blog Intro */}
      <div className="blog-hero">
        <h1>
          Our <span>Blog</span>
        </h1>
        <p>
          Stay updated with the latest trends, book reviews, and author stories.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="blog-grid">
        {currentPosts.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} />
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <div className="blog-meta">
                <span>
                  <FaRegCalendarAlt /> {blog.date}
                </span>
                <span>
                  <FaUserAlt /> {blog.author}
                </span>
              </div>
              <p>{blog.description}</p>
              <a href={`/blog/${blog.id}`} className="btn-read">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          « Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next »
        </button>
      </div>
    </section>
  );
};

export default Blog;
