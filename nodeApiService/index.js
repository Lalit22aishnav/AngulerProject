    // index.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); 

// Secret key (should be stored securely, e.g., in environment variables)
const SECRET_KEY = '###';

// Route to authenticate user and create JWT token
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Example check for user credentials (replace with real authentication)
  if (email === 'lalitrakawat786@gmail.com' && password === '123') {
    // Create JWT Token
    const token = jwt.sign(
      { email },  // Payload
      SECRET_KEY,     // Secret key to sign the token
      { expiresIn: '1h' }  // Expiration time (optional)
    );

    // Return token to client
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Route to protect (access control)  
app.get('/protected', (req, res) => {
  // Get token from headers
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Token is valid, proceed with the request
    res.json({ message: 'Protected data accessed', user: decoded });  
  });
});

// Start the server
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
