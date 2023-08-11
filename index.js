require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const healthRoutes = require('./routes/HealthRoutes')


/**
 * APPLICATION
 */
const app = express();
app.use(express.json());


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



/**
 * APP LISTEN
 */
app.listen(3000, () => console.log('🟢 APPLICATION STARTED :3000 PORT'))