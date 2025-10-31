// src/pages/BlogPost.jsx - PAGE D'ARTICLE DÉTAILLÉE
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHelmet from "../components/SEOHelmet";
import Loading from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Trouver l'article
    const foundPost = blogPosts.find((p) => p.slug === slug);

    if (foundPost) {
      setPost(foundPost);

      // Trouver articles similaires (même catégorie)
      const related = blogPosts
        .filter((p) => p.category === foundPost.category && p.slug !== slug)
        .slice(0, 3);
      setRelatedPosts(related);
    }

    setLoading(false);
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Erreur de partage:", err);
      }
    } else {
      // Fallback : copier le lien
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="not-found">
          <h1>Article non trouvé</h1>
          <Link to="/blog" className="btn-back">
            Retour au blog
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHelmet
        title={`${post.title} - Blog CinéScope`}
        description={post.excerpt}
        image={post.image}
        type="article"
      />
      <div className="blog-post-page">
        <Header />

        <article className="blog-post-container">
          {/* Bouton retour */}
          <button className="btn-back-blog" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Retour
          </button>

          {/* En-tête de l'article */}
          <header className="blog-post-header">
            <div className="post-category-badge">{post.category}</div>
            <h1>{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>

            <div className="post-meta">
              <div className="meta-item">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>{post.date}</span>
              </div>
              <div className="meta-item">
                <Clock size={18} />
                <span>{post.readTime} min de lecture</span>
              </div>
              <button className="btn-share" onClick={handleShare}>
                <Share2 size={18} />
                Partager
              </button>
            </div>
          </header>

          {/* Image principale */}
          <div className="post-featured-image">
            <img src={post.image} alt={post.title} />
          </div>

          {/* Contenu de l'article */}
          <div className="post-content">
            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          <div className="post-tags">
            <h3>
              <Tag size={18} /> Tags
            </h3>
            <div className="tags-list">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Auteur */}
          <div className="post-author-box">
            <div className="author-avatar">
              <User size={40} />
            </div>
            <div className="author-info">
              <h4>À propos de {post.author}</h4>
              <p>
                Passionné de cinéma et rédacteur pour CinéScope. Toujours à
                l'affût des dernières sorties et pépites du 7ème art.
              </p>
            </div>
          </div>

          {/* Articles similaires */}
          {relatedPosts.length > 0 && (
            <div className="related-posts">
              <h3>Articles similaires</h3>
              <div className="related-posts-grid">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="related-post-card"
                  >
                    <img src={related.image} alt={related.title} />
                    <div className="related-post-info">
                      <h4>{related.title}</h4>
                      <p className="related-date">{related.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Newsletter */}
          <div className="post-newsletter-cta">
            <h3>📧 Ne manquez aucun article !</h3>
            <p>
              Recevez nos meilleurs articles, tops et actualités ciné
              directement dans votre boîte mail.
            </p>
            <form className="newsletter-form">
              <input type="email" placeholder="Votre email" required />
              <button type="submit">S'abonner</button>
            </form>
          </div>
        </article>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default BlogPost;
