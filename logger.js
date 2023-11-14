function loggerMiddleware(req, res, next) {
    console.log(`Received request for ${req.url}`);
    next(); 
  }
  
  module.exports = loggerMiddleware;