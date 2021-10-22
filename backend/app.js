const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
// db configuration
const connectDB = require('./config/db.js');
const generateToken = require('./config/generateToke.js');
// - error handling
const asyncHandler = require('express-async-handler');

const app = express();
dotenv.config();

const PORT = process.env.PORT;

// Models
const User = require('./models/userModel.js');

// DB connection
connectDB();
// .then((res) => console.log(res));

// Middlewares
const protect = require('./auth/auth.js');
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running .');
});

// -- -signup (registration)
app.post(
  '/api/users',
  asyncHandler(async (req, res) => {
    //async function
    const { name, email, password } = req.body;
    //- - email 1 for 1user
    // ---checking if user with given email already exists
    const userExists = await User.findOne({ email });

    // --- if exists then throwing error
    if (userExists) {
      res.status(400).send('User already exists');
      throw new Error('User already exists');
    }

    // --- if not exists, then save it to database....
    const user = await User.create({ name, email, password });

    console.log(user);
    // - - - - .. and then sending user data to frontend FE
    if (user) {
      res.status(201).json({
        id: user.id,

        token: generateToken(user._id),
        // token data
      });
    } else {
      res.status(400).send('Invalid user data');
      throw new Error('Invalid user data');
    }
  })
);

// - - -login

// - - - profile
app.get(
  '/api/users/profile',
  protect,
  asyncHandler(async (req, res) => {
    // console.log('req.user', req.user);
    const user = await User.findById(req.user._id);
    console.log(req.user);

    if (user) {
      res.json({ _id: user._id, name: user.name, email: user.email });
    } else {
      res.status(404).send('User not found');
      throw new Error('User not found');
    }
  })
);
// - - - login
// app.post('/api/users', (req, res) => {
//     const newUserData = req.body;

//     console.log(newUserData);
//   });

//Starting server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
