const express = require('express');
const pool = require('./database.js');
const app = express();

const port = process.env.APP_PORT;

app.use(express.json());

app.get('/api/users', async (request, response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        response.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: rows,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error in GET /:', error);
        response.status(500).json({
            success: false,
            message: 'Error retrieving users',
            error: 'Internal Server Error',
        });
    }
});

app.post('/api/users', async (request, response) => {
    try {
        const {name, email} = request.body;
        if (!name || !email) {
            return response
                .status(400)
                .json({success: false, message: 'Name and email are required'});
        }
        const [result] = await pool.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email],
        );
        response.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {id: result.insertId, name, email},
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error in POST /:', error);
        response.status(500).json({
            success: false,
            message: 'Error creating user',
            error: 'Internal Server Error',
        });
    }
});

app.get('/api/health', (request, response) => {
    response.status(200).json({
        success: true,
        message: 'API is healthy',
        timestamp: new Date().toISOString(),
    });
});

app.get('/api', (request, response) => {
    response.status(200).json({
        success: true,
        message: 'Welcome to the API',
        timestamp: new Date().toISOString(),
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
