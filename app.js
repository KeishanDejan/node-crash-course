const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://username:password@nodetuts.yls5e.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000, () => {
        console.log('Connected to Database...');
        console.log("Server has started...");
    }))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middlewares and static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true,}))
app.use(morgan('dev'));



// response for "/"
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

// response for '/about'
app.get('/about', (req, res) => {
  // res.send('<h1>about Ninjas</h1>');
  res.render('about', { title: 'About' })
});

// redirect
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// blog routes
app.use('/blogs',blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
