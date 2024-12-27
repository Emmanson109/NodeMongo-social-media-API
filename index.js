const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan'); 
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const port = 7100;

dotenv.config(); // to use env

app.get('/', (req,res) => {
    res.send('home page running on port hdhhdhh7100')
})


mongoose.connect(process.env.MONGO_URL).then( () =>{ 
console.log('database connection successful!');
}).catch((err)=>{
  console.log('databse connection unsuccessful!',err)
})

//middlewares

app.use(express.json()); //to use json body parser
app.use(express.urlencoded({extended:false})); // to use x ww form format parser
app.use(helmet());
app.use(morgan('common'));

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(port, () =>{
  console.log(`app running on port ${port}`);
});