const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello MJ! API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /': 'Root endpoint',
      'GET /health': 'Health check (200 OK)',
      'GET /health/200': 'Success response',
      'GET /health/400': 'Bad request response',
      'GET /health/401': 'Unauthorized response',
      'GET /health/403': 'Forbidden response',
      'GET /health/404': 'Not found response',
      'GET /health/500': 'Internal server error response',
      'GET /health/503': 'Service unavailable response',
      'POST /health/custom': 'Custom status code (send {"statusCode": number} in body)'
    }
  });
});

// Default health check - 200 OK
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check with 200 OK
app.get('/health/200', (req, res) => {
  res.status(200).json({
    status: 'OK',
    statusCode: 200,
    message: 'Everything is working perfectly!',
    timestamp: new Date().toISOString(),
    data: {
      server: 'healthy',
      database: 'connected',
      cache: 'operational'
    }
  });
});

// Health check with 400 Bad Request
app.get('/health/400', (req, res) => {
  res.status(400).json({
    status: 'Bad Request',
    statusCode: 400,
    message: 'Invalid request parameters',
    timestamp: new Date().toISOString(),
    error: {
      type: 'ValidationError',
      details: 'Missing required parameters or invalid format'
    }
  });
});

// Health check with 401 Unauthorized
app.get('/health/401', (req, res) => {
  res.status(401).json({
    status: 'Unauthorized',
    statusCode: 401,
    message: 'Authentication required',
    timestamp: new Date().toISOString(),
    error: {
      type: 'AuthenticationError',
      details: 'Valid authentication token required'
    }
  });
});

// Health check with 403 Forbidden
app.get('/health/403', (req, res) => {
  res.status(403).json({
    status: 'Forbidden',
    statusCode: 403,
    message: 'Access denied',
    timestamp: new Date().toISOString(),
    error: {
      type: 'AuthorizationError',
      details: 'Insufficient permissions to access this resource'
    }
  });
});

// Health check with 404 Not Found
app.get('/health/404', (req, res) => {
  res.status(404).json({
    status: 'Not Found',
    statusCode: 404,
    message: 'Resource not found',
    timestamp: new Date().toISOString(),
    error: {
      type: 'NotFoundError',
      details: 'The requested resource could not be found'
    }
  });
});

// Health check with 500 Internal Server Error
app.get('/health/500', (req, res) => {
  res.status(500).json({
    status: 'Internal Server Error',
    statusCode: 500,
    message: 'Something went wrong on the server',
    timestamp: new Date().toISOString(),
    error: {
      type: 'InternalServerError',
      details: 'An unexpected error occurred while processing the request'
    }
  });
});

// Health check with 503 Service Unavailable
app.get('/health/503', (req, res) => {
  res.status(503).json({
    status: 'Service Unavailable',
    statusCode: 503,
    message: 'Service is temporarily unavailable',
    timestamp: new Date().toISOString(),
    error: {
      type: 'ServiceUnavailableError',
      details: 'Service is down for maintenance or overloaded'
    }
  });
});

// Custom status code endpoint
app.post('/health/custom', (req, res) => {
  const { statusCode } = req.body;
  
  if (!statusCode || typeof statusCode !== 'number') {
    return res.status(400).json({
      status: 'Bad Request',
      statusCode: 400,
      message: 'Please provide a valid statusCode number in the request body',
      timestamp: new Date().toISOString(),
      example: { statusCode: 201 }
    });
  }
  
  if (statusCode < 100 || statusCode > 599) {
    return res.status(400).json({
      status: 'Bad Request',
      statusCode: 400,
      message: 'Status code must be between 100 and 599',
      timestamp: new Date().toISOString()
    });
  }
  
  res.status(statusCode).json({
    status: getStatusText(statusCode),
    statusCode: statusCode,
    message: `Custom response with status code ${statusCode}`,
    timestamp: new Date().toISOString(),
    custom: true
  });
});

// Helper function to get status text
function getStatusText(code) {
  const statusTexts = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout'
  };
  
  return statusTexts[code] || 'Unknown Status';
}

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Not Found',
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /health/200',
      'GET /health/400',
      'GET /health/401',
      'GET /health/403',
      'GET /health/404',
      'GET /health/500',
      'GET /health/503',
      'POST /health/custom'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    status: 'Internal Server Error',
    statusCode: 500,
    message: 'Something went wrong!',
    timestamp: new Date().toISOString(),
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check available at: http://localhost:${PORT}/health`);
  console.log(`📖 API documentation at: http://localhost:${PORT}/`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

module.exports = app;