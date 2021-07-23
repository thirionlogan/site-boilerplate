const rateLimit = require('express-rate-limit');

const limitReached = (req, res) => {
  console.warn({ ip: req.ip }, 'Rate limiter triggered');
};

module.exports = rateLimit({
  windowMs: 60000,
  max: 5,
  onLimitReached: limitReached,
  handler: limitReached,
});
