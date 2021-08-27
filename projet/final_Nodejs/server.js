const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const cors = require("cors");

const app = express();
const PRODUCT_DATA_FILE = path.join(__dirname, 'server-product-data.json');
const CART_DATA_FILE = path.join(__dirname, 'server-cart-data.json');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
app.post('/cart', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    const cartProducts = JSON.parse(data);
    const newCartProduct = {
      id: req.body.id,
      nom: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image_tag: req.body.image_tag,
      quantity: 1
    };
    let cartProductExists = false;
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === newCartProduct.id) {
        cartProduct.quantity++;
        cartProductExists = true;
      }
    });
    if (!cartProductExists) cartProducts.push(newCartProduct);
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
    });
  });
});
app.delete('/cart/delete', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let cartProducts = JSON.parse(data);
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === req.body.id && cartProduct.quantity > 1) {
        cartProduct.quantity--;
      } else if (cartProduct.id === req.body.id && cartProduct.quantity === 1) {
        const cartIndexToRemove = cartProducts.findIndex(cartProduct => cartProduct.id === req.body.id);
        cartProducts.splice(cartIndexToRemove, 1);
      }
    });
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
    });
  });
});
app.delete('/cart/delete', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let cartProducts = JSON.parse(data);
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === req.body.id && cartProduct.quantity > 1) {
        cartProduct.quantity--;
      } else if (cartProduct.id === req.body.id && cartProduct.quantity === 1) {
        const cartIndexToRemove = cartProducts.findIndex(cartProduct => cartProduct.id === req.body.id);
        cartProducts.splice(cartIndexToRemove, 1);
      }
    });
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
    });
  });
});
app.get('/products', (req, res) => {
  fs.readFile(PRODUCT_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});
app.get('/cart', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));


const initRoutes = require("./app/routes/user.routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded


const db = require("./app/models/user");
// db.sequelize.sync();
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "producteur"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}


//Pour l'image
const dbimg = require("./app/models/images");
dbimg.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });

  //Pour les administrateurs
  const dbadmin = require("./app/models/admins");
  dbadmin.sequelize.sync({ force: true }).then(() => {
      console.log("Drop and re-sync dbadmin.");
    });
   
  
  //Pour les farmers
  const dbfarmer = require("./app/models/farmers");
  dbfarmer.sequelize.sync({ force: false }).then(() => {
      console.log("Drop and re-sync dbfarmer.");
  });

const dbproduit = require("./app/models/produits");
dbproduit.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync dbproduit.");
});

//pour le client
const dbclient = require("./app/models/clients");
  dbclient.sequelize.sync({ force: false }).then(() => {
      console.log("Drop and re-sync dbclient.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to jery application." });
});






///// route

require("./app/routes/image.routes")(app);
require("./app/routes/farmer.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/produit.routes")(app);
require("./app/routes/client.routes")(app);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});