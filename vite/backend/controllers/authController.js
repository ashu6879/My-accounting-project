const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Signup function
exports.signup = async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword, firstName, lastName });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
};

// Login function
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token to the client
    res.json({ success: true, token });
  } catch (err) {
    console.error('Error during login:', err); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
