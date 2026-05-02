require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Render)

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://meeshoindia.netlify.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin); // Debug log
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// MongoDB Connection with Auto-Reconnect
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Connection pool settings
            maxPoolSize: 10,
            minPoolSize: 2,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 10000,
            // Auto-reconnect settings
            retryWrites: true,
            retryReads: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log('🔗 Database connection established successfully');
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.log('🔄 Retrying connection in 5 seconds...');
        // Retry connection after 5 seconds instead of exiting
        setTimeout(connectDB, 5000);
    }
};

// Connection event listeners
mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
    setTimeout(connectDB, 5000);
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected successfully');
});

// Import routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Routes test
app.get('/', (req, res) => {
    res.json({ message: '✅ Meesho Clone API is running!' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    const statusMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };

    res.json({
        status: 'ok',
        database: statusMap[dbStatus] || 'unknown',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Use environment variable for PORT (required for deployment)
const PORT = process.env.PORT || 5000;

// Start server and connect to DB
const startServer = async () => {
    try {
        // Connect to database
        await connectDB();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 Access server at: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        // Don't exit, let the reconnection logic handle it
    }
};

// Start the server
startServer();
