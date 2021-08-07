module.exports = app => {
    const clients = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Produit
    router.post("/", clients.create);
  
    // Retrieve all clients
    router.get("/", clients.findAll);
    
    // Retrieve a single Produit with id
    router.get("/:id", clients.findOne);
  
    // Update a Produit with id
    router.put("/:id", clients.update);
  
    // Delete a Produit with id
    router.delete("/:id", clients.delete);
  
    // Delete all clients
    router.delete("/", clients.deleteAll);
    
    app.use('/api/clients', router);
  };