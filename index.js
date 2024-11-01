import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3001;
const HOST = 'localhost';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on http://${HOST}:${PORT}`);
});

const dataFilePath = path.join(__dirname, 'data.json');

const readData = () => {
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.get('/products', (req, res) => {
  const data = readData();
  res.json(data.products);
});

app.post('/products', (req, res) => {
  const newProduct = req.body;

  if (!newProduct || !newProduct.name || !newProduct.count || !newProduct.imageUrl) {
    return res.status(400).json({ success: false, error: "Name, count and imageUrl are required" });
  }

  const data = readData();

  const newId = (data.products.length + 1).toString();
  newProduct.id = newId;

  data.products.push(newProduct);
  writeData(data);

  res.status(201).json({ success: true, data: newProduct });
});

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  const data = readData();

  const index = data.products.findIndex(product => product.id === productId);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }

  data.products.splice(index, 1);
  writeData(data);

  res.status(204).send();
});
