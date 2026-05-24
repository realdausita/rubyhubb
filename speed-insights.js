/* ===========================
   VERCEL SPEED INSIGHTS
   Initialization for Ruby Hub
   =========================== */

// Initialize Speed Insights queue
(function initSpeedInsights() {
  // Create queue if it doesn't exist
  window.si = window.si || function() {
    (window.siq = window.siq || []).push(arguments);
  };
})();

// Script will be automatically loaded by Vercel when Speed Insights is enabled
// in the Vercel Dashboard. This initialization ensures the queue is ready.
