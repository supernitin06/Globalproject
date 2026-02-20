const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsClient = new BetaAnalyticsDataClient({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
});

module.exports = analyticsClient;
