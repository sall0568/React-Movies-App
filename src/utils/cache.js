// src/utils/cache.js - VERSION OPTIMISÉE

class APICache {
  constructor(expirationTime = 30 * 60 * 1000) {
    // 30 minutes (AUGMENTÉ)
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

    console.log(`✅ Cache HIT: ${key.substring(0, 50)}...`);
    return item.data;
  }

  // Sauvegarder dans le cache
  set(key, data) {
    console.log(`💾 Cache SET: ${key.substring(0, 50)}...`);
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

// Créer une instance singleton avec 30 minutes de cache
const apiCache = new APICache(30 * 60 * 1000);

// Nettoyer le cache toutes les 15 minutes
setInterval(() => {
  apiCache.cleanup();
}, 15 * 60 * 1000);

export default apiCache;
