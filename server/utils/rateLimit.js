const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many login attempts. Please try again after 15 minutes.',
  standardHeaders: true, // ✅ Enables `RateLimit-*` and `Retry-After`
  legacyHeaders: false,  // ❌ Disables deprecated `X-RateLimit-*` headers
});

module.exports = {loginLimiter}
