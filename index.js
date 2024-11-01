import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = process.env.PORT || 3001;
const HOST = 'localhost';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

let data = {
  "products": [
    {
      "id": "2",
      "imageUrl": "https://example.com/images/product2.jpg",
      "name": "Samsung Galaxy S22",
      "count": 8,
      "size": {
        "width": 70,
        "height": 147
      },
      "weight": "169g",
      "comments": []
    },
    {
      "id": "5",
      "imageUrl": "https://example.com/images/product5.jpg",
      "name": "Sony Xperia 5 III",
      "count": 5,
      "size": {
        "width": 68,
        "height": 157
      },
      "weight": "168g",
      "comments": []
    },
    {
      "id": "6",
      "imageUrl": "https://example.com/images/product6.jpg",
      "name": "Nokia G50",
      "count": 10,
      "size": {
        "width": 77,
        "height": 174
      },
      "weight": "220g",
      "comments": []
    },
    {
      "id": "7",
      "imageUrl": "https://example.com/images/product7.jpg",
      "name": "Motorola Moto G Power",
      "count": 7,
      "size": {
        "width": 75,
        "height": 165
      },
      "weight": "205g",
      "comments": []
    },
    {
      "id": "8",
      "imageUrl": "https://example.com/images/product8.jpg",
      "name": "Xiaomi Mi 11",
      "count": 6,
      "size": {
        "width": 74,
        "height": 164
      },
      "weight": "196g",
      "comments": []
    },
    {
      "id": "9",
      "imageUrl": "https://example.com/images/product9.jpg",
      "name": "Realme 8 Pro",
      "count": 9,
      "size": {
        "width": 73,
        "height": 160
      },
      "weight": "176g",
      "comments": []
    },
    {
      "id": "10",
      "imageUrl": "https://example.com/images/product10.jpg",
      "name": "Vivo V21 5G",
      "count": 11,
      "size": {
        "width": 73,
        "height": 176
      },
      "weight": "176g",
      "comments": []
    },
    {
      "id": "11",
      "imageUrl": "https://example.com/images/product11.jpg",
      "name": "HTC Desire 20 Pro",
      "count": 4,
      "size": {
        "width": 76,
        "height": 163
      },
      "weight": "185g",
      "comments": []
    },
    {
      "id": "12",
      "imageUrl": "https://example.com/images/product12.jpg",
      "name": "Asus Zenfone 8",
      "count": 3,
      "size": {
        "width": 68,
        "height": 148
      },
      "weight": "169g",
      "comments": []
    },
    {
      "id": "13",
      "imageUrl": "https://example.com/images/product13.jpg",
      "name": "LG Velvet",
      "count": 5,
      "size": {
        "width": 74,
        "height": 167
      },
      "weight": "180g",
      "comments": []
    },
    {
      "id": "692b",
      "imageUrl": "фівф",
      "name": "галя",
      "count": 213,
      "size": {
        "width": 21312,
        "height": 213
      },
      "weight": "234231",
      "comments": []
    }
  ]
};

app.get('/products', (req, res) => {
  res.json(data.products);
});

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;

  const product = data.products.find(product => product.id === productId);

  if (!product) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }

  res.json(product);
});

app.post('/products', (req, res) => {
  const newProduct = req.body;

  if (!newProduct || !newProduct.name || !newProduct.count || !newProduct.imageUrl) {
    return res.status(400).json({ success: false, error: "Name, count and imageUrl are required" });
  }

  const newId = (data.products.length + 1).toString();
  newProduct.id = newId;

  data.products.push(newProduct);

  res.status(201).json({ success: true, data: newProduct });
});

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;

  const index = data.products.findIndex(product => product.id === productId);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }

  data.products.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server started on http://${HOST}:${PORT}`);
});

