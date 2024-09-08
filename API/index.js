const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('/models/User');  // Corrected path
const jwt = require('jsonwebtoken');
const cors = require('cors');

dotenv.config();  // Load environment variables

mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB...", err));

const jwtSecret = process.env.JWT_SECRET;

const app = express();

app.use(express.json());  // To parse JSON bodies
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL,
}));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const createdUser = await User.create({ username, password });

    jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) {
        throw err;
      }
      res.cookie('token', token).status(201).json('ok');
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.161.83:${PORT}`);
});
