const express = require('express');
const cors = require('cors');
const { pool } = require('./config/database.js');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const vehiclesRoutes = require('./routes/vehicles.routes');

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
    try{
        const databaseResult = await pool.query('SELECT NOW()');

        res.status(200).json({
            status: 'ok',
            message: 'IntelliPark API is running',
            database: {
                connected: true,
                time: databaseResult.rows[0].now
            }
        })
    }
    catch(error){
        res.status(500).json({
            status: 'error',
            message: 'IntelliPark API is running, but database connection failed',
            database: {
                connected: false,
                error: error.message
            }   
        });
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/vehicles', vehiclesRoutes);

module.exports = app;
