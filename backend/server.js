const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend Server is Running 🚀');
});

app.get('/images', (req, res) => {
    res.send('Image server is running. Access images directly (e.g., /images/logo.png).');
});

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// API Routes (Placeholder)
app.get('/api/projects', (req, res) => {
    // In a real app, this would fetch from a database or JSON file
    res.json({ message: "Project data endpoint" });
});

// Serve Frontend in Production (if built)
// app.use(express.static(path.join(__dirname, '../frontend/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
