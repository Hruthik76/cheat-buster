// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');


dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
    res.send('Cheat Buster API is running!');
});

// Use our user routes for any path starting with /api
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on <http://localhost>:${PORT}`);
});
