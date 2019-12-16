const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('diskdb');
const express = require('express');
const fileUpload = require('express-fileupload');

const productUtils = require('./utils/products');

const server = express();

const port = (process.env.PORT || 4000);

db.connect('./db', ['orders', 'products']);

server.use(cors());
server.use(bodyParser.json());
server.use(fileUpload());

server.get('/img/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  res.sendFile(__dirname + '/img/' + fileName);
});

server.get('/orders', (req, res) => {
  res.json(db.orders.find());
});

server.post('/orders/:id', (req, res) => {
  const prd_id = req.params.id;
  const _order = db.orders.save({
    prd_id,
    ord_served: false,
    ord_at: new Date().toISOString(),
    ord_served_at: null,
  });

  res.json(_order)
});

server.put('/orders/:id', (req, res) => {
  const _id = req.params.id;
  const order = req.body;

  db.orders.update({ _id }, order);

  res.json(db.orders.find());
});

server.get('/products', (req, res) => {
  res.json(db.products.find().map(p => productUtils.getProductWithImage(p)));
});

server.post('/products', (req, res) => {
  if (!req.files.prd_image || Object.keys(req.files.prd_image).length === 0) {
    return res.status(400).send('No prd_image were uploaded.');
  }

  const file = req.files.prd_image;
  const mime = file.mimetype;
  const fileExtension = mime.split('/')[1];

  const product = {
    ...req.body,
    prd_image_ext: fileExtension,
  };

  const _product = db.products.save(product);
  const path = `img/${_product._id}.${fileExtension}`;

  file.mv(path, err => {
    if (err) return res.status(500).send(err);

    res.json(productUtils.getProductWithImage(_product));
  });
});

server.get('/products/:id', (req, res) => {
  const _id = req.params.id;
  const product = db.products.find({ _id });

  res.json(product.map(p => productUtils.getProductWithImage(p)));
});

server.delete('/products/:id', (req, res) => {
  const _id = req.params.id;

  db.products.remove({ _id });

  res.json(db.products.find().map(p => productUtils.getProductWithImage(p)));
});

server.listen(port, () => {
  console.log(`Server is listening at port ${port} (${process.env.PORT})`);
});
