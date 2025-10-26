// src/utils/webVitals.js
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry); // CORRIGÉ : getTTFB au lieu de getTTFP
    });
  }
};

export const sendToAnalytics = (metric) => {
  // Envoyer les métriques à Google Analytics si configuré
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value
      ),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log en développement
  if (process.env.NODE_ENV === "development") {
    console.log("📊 Web Vitals:", metric);
  }
};
