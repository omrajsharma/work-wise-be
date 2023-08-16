require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const healthRoutes = require('./routes/HealthRoutes');
const authRoutes = require('./routes/AuthRoutes');


/**
 * APPLICATION
 */
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['https://work-wise.vercel.app', 'http://localhost:5173']
}));

/**
 * DATABASE
 */
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.once('connected', () => console.log('🟢 DATABASE CONNECTED'));
mongoose.connection.on('error', err => console.log('🟥 error', err));


/**
 * ROUTES
 */
app.use('/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);



/**
 * APP LISTEN
 */
app.listen(3000, () => console.log('🟢 APPLICATION STARTED :3000 PORT'))