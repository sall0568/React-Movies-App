// src/utils/cache.js - Nouveau fichier à créer

class APICache {
  constructor(expirationTime = 5 * 60 * 1000) {
    // 5 minutes par défaut
    this.cache = new Map();
    this.expirationTime = expirationTime;
  }

  // Générer une clé unique pour la requête
  generateKey(url, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    return `${url}?${sortedParams}`;
  }

  // Récupérer une valeur du cache
  get(key) {
    const item = this.cache.get(key);

    if (!item) return null;

    // Vérifier si le cache a expiré
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    console.log(`✅ Cache HIT: ${key}`);
    return item.data;
  }

  // Sauvegarder dans le cache
  set(key, data) {
    console.log(`💾 Cache SET: ${key}`);
    this.cache.set(key, {
      data,
      expiry: Date.now() + this.expirationTime,
      timestamp: Date.now(),
    });
  }

  // Vider le cache
  clear() {
    console.log("🗑️ Cache cleared");
    this.cache.clear();
  }

  // Obtenir des statistiques
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  // Nettoyer les entrées expirées
  cleanup() {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned ${cleaned} expired cache entries`);
    }

    return cleaned;
  }
}

// Créer une instance singleton
const apiCache = new APICache(10 * 60 * 1000); // 10 minutes

// Nettoyer le cache toutes les 5 minutes
setInterval(() => {
  apiCache.cleanup();
}, 5 * 60 * 1000);

export default apiCache;
