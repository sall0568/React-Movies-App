// src/utils/requestQueue.js - OPTIONNEL (pour cas extrêmes)

class RequestQueue {
  constructor(delayBetweenRequests = 100) {
    // 100ms entre chaque requête
    this.queue = [];
    this.processing = false;
    this.delay = delayBetweenRequests;
    this.requestCount = 0;
    this.lastRequestTime = 0;
  }

  // Ajouter une requête à la file
  async add(requestFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        request: requestFunction,
        resolve,
        reject,
      });

      if (!this.processing) {
        this.process();
      }
    });
  }

  // Traiter la file d'attente
  async process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const { request, resolve, reject } = this.queue.shift();

    try {
      // Attendre le délai nécessaire depuis la dernière requête
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      if (timeSinceLastRequest < this.delay) {
        const waitTime = this.delay - timeSinceLastRequest;
        console.log(`⏳ Waiting ${waitTime}ms before next request...`);
        await this.sleep(waitTime);
      }

      // Exécuter la requête
      this.lastRequestTime = Date.now();
      this.requestCount++;
      console.log(`📡 Processing request #${this.requestCount}`);

      const result = await request();
      resolve(result);
    } catch (error) {
      reject(error);
    }

    // Traiter la prochaine requête
    this.process();
  }

  // Fonction utilitaire pour attendre
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Obtenir des statistiques
  getStats() {
    return {
      queueLength: this.queue.length,
      totalRequests: this.requestCount,
      processing: this.processing,
    };
  }

  // Vider la file
  clear() {
    this.queue = [];
    this.processing = false;
    console.log("🗑️ Request queue cleared");
  }
}

// Créer une instance singleton
const requestQueue = new RequestQueue(200); // 200ms entre chaque requête

export default requestQueue;
