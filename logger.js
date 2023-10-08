function loggerMiddleware(req, res, next) {
    console.log(`Received request for ${req.url}`);
    next(); // Pass control to the next middleware or route handler
  }
  
  module.exports = loggerMiddleware;