const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { merge } = require("lodash");
const graphqlHttp = require('express-graphql');

// Schema graphQL
const schemaGraphQL = require('./graphql/schema');

// Resolver graphQL
const userResolver = require('./graphql/resolver/userResolver');
const productResolver = require('./graphql/resolver/productResolver');
const categoryResolver = require('./graphql/resolver/categoryResolver');

const app = express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(
  '/graphql',
  graphqlHttp({
    schema: schemaGraphQL,
    rootValue: merge(userResolver, productResolver, categoryResolver),
    graphiql: true
  })
);
// app.use('/feed', feedRoutes);
// app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://{usernameDb}:{passwordDb}@cluster0.xadyf.mongodb.net/{databaseName}?retryWrites=true&w=majority'
  )
  .then(result => {
    const server = app.listen(8080);
    // const io = require('./socket').init(server);
    // io.on('connection', socket => {
    //   console.log('Client connected');
    // });
  })
  .catch(err => console.log(err));
