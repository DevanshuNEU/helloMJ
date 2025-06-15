# HelloMJ API

A simple Node.js API with health check endpoints that return different HTTP status codes.

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Running the Server
```bash
# Production
npm start

# Development (with nodemon)
npm run dev
```

The server will start on `http://localhost:3000`

## 📋 API Endpoints

### Root Endpoint
- **GET** `/` - Returns API information and available endpoints

### Health Check Endpoints

| Endpoint | Method | Status Code | Description |
|----------|--------|-------------|-------------|
| `/health` | GET | 200 | Default health check |
| `/health/200` | GET | 200 | Success response |
| `/health/400` | GET | 400 | Bad request response |
| `/health/401` | GET | 401 | Unauthorized response |
| `/health/403` | GET | 403 | Forbidden response |
| `/health/404` | GET | 404 | Not found response |
| `/health/500` | GET | 500 | Internal server error response |
| `/health/503` | GET | 503 | Service unavailable response |
| `/health/custom` | POST | Custom | Custom status code (see below) |

### Custom Status Code Endpoint

**POST** `/health/custom`

Send a JSON body with the desired status code:
```json
{
  "statusCode": 201
}
```

## 🧪 Testing with Postman

### Example Requests:

1. **Basic Health Check**
   ```
   GET http://localhost:3000/health
   ```

2. **Specific Status Code**
   ```
   GET http://localhost:3000/health/400
   ```

3. **Custom Status Code**
   ```
   POST http://localhost:3000/health/custom
   Content-Type: application/json
   
   {
     "statusCode": 201
   }
   ```

## 📦 Dependencies

- **express**: Web framework for Node.js
- **cors**: Cross-origin resource sharing middleware
- **nodemon**: Development dependency for auto-restarting server

## 🔧 Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## ✨ Features

- ✅ Multiple status code endpoints
- ✅ Custom status code support
- ✅ Detailed JSON responses
- ✅ Request logging
- ✅ Error handling
- ✅ CORS enabled
- ✅ Comprehensive documentation

## 🏗️ Project Structure

```
helloMJ/
├── package.json
├── server.js
├── README.md
└── .gitignore
```

## 📝 Response Format

All endpoints return JSON responses with the following structure:

```json
{
  "status": "OK",
  "statusCode": 200,
  "message": "Service is healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "data": {
    // Additional data based on endpoint
  }
}
```

## 🚀 Deployment

This API is ready to deploy to any Node.js hosting platform:

- Heroku
- Vercel
- Railway
- DigitalOcean App Platform
- AWS EC2
- Google Cloud Run

Make sure to set the `PORT` environment variable if required by your hosting platform.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License