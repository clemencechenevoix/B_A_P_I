// Express app entry point

const express = require('express');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./features/auth/auth.routes.js');
const adminRoutes = require('./features/admin/admin.routes.js');
const catalogRoutes = require('./features/catalog/catalog.routes.js');
const usersRoutes = require('./features/users/users.routes.js');

dotenv.config();

const app = express();

// Parse JSON
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// Catalog routes
app.use('/api/catalog', catalogRoutes);

// Users routes
app.use('/api/users', usersRoutes);

// export
module.exports = app;