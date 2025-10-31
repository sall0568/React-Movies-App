// src/pages/Blog.jsx - PAGE PRINCIPALE DU BLOG
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHelmet from "../components/SEOHelmet";
import Loading from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";
import { Calendar, User, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement
    setTimeout(() => {
      setPosts(blogPosts);
      setFilteredPosts(blogPosts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filtrer par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filtrer par recherche
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery, posts]);

  const categories = [
    { id: "all", name: "Tous les articles", count: posts.length },
    {
      id: "tops",
      name: "Top & Classements",
      count: posts.filter((p) => p.category === "tops").length,
    },
    {
      id: "actualites",
      name: "Actualités",
      count: posts.filter((p) => p.category === "actualites").length,
    },
    {
      id: "guides",
      name: "Guides & Tutoriels",
      count: posts.filter((p) => p.category === "guides").length,
    },
    {
      id: "critiques",
      name: "Critiques",
      count: posts.filter((p) => p.category === "critiques").length,
    },
  ];

  const featuredPost = posts[0]; // Article à la une

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  return (
    <>
      <SEOHelmet
        title="Blog CinéScope - Actualités, Tops & Critiques Films/Séries"
        description="Découvrez les dernières actualités cinéma, nos tops films/séries, critiques et guides pour ne rien manquer du 7ème art."
        type="website"
      />
      <div className="blog-page">
        <Header />

        {/* Hero Section avec article à la une */}
        {featuredPost && (
          <div className="blog-hero">
            <div className="blog-hero-content">
              <div className="blog-hero-text">
                <span className="featured-badge">⭐ À LA UNE</span>
                <h1>{featuredPost.title}</h1>
                <p className="hero-excerpt">{featuredPost.excerpt}</p>
                <div className="hero-meta">
                  <span>
                    <Calendar size={16} /> {featuredPost.date}
                  </span>
                  <span>
                    <Clock size={16} /> {featuredPost.readTime} min
                  </span>
                  <span>
                    <User size={16} /> {featuredPost.author}
                  </span>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="btn-read-more"
                >
                  Lire l'article <ArrowRight size={18} />
                </Link>
              </div>
              <div className="blog-hero-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
              </div>
            </div>
          </div>
        )}

        <div className="blog-container">
          {/* Barre de recherche et filtres */}
          <div className="blog-filters">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-btn ${
                    selectedCategory === cat.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Grille d'articles */}
          <div className="blog-grid">
            {filteredPosts.slice(1).map((post) => (
              <article key={post.id} className="blog-card">
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <span className="category-badge">{post.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <h2>{post.title}</h2>
                    <p className="excerpt">{post.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>
                        <Calendar size={14} /> {post.date}
                      </span>
                      <span>
                        <Clock size={14} /> {post.readTime} min
                      </span>
                    </div>
                    <div className="blog-card-tags">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">
                          <Tag size={12} /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="no-results">
              <h3>Aucun article trouvé</h3>
              <p>Essayez avec d'autres mots-clés ou catégories</p>
              <button
                className="btn-reset"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Blog;
