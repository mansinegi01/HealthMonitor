const redisClient = require("../utils/redisClient");

exports.rateLimiter = (limit, windowSec) => {
  return async (req, res, next) => {
    const key = `rl:${req.ip}`;
    const requests = await redisClient.incr(key);

    if (requests === 1) {
      await redisClient.expire(key, windowSec);
    }

    if (requests > limit) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }

    next();
  };
};
