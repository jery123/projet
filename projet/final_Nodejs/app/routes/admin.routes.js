module.exports = app => {
    const admins = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Admin
    router.post("/", admins.create);
  
    // Retrieve all admins
    router.get("/", admins.findAll);
  
    // // Retrieve all published admins
    // router.get("/published", admins.findAllPublished);
  
    // // Retrieve all unpublished admins
    // router.get("/unpublished", admins.findAllUnPublished);
  
    // Retrieve a single Admin with id
    router.get("/:id", admins.findOne);
  
    // Update a Admin with id
    router.put("/:id", admins.update);
  
    // Delete a Admin with id
    router.delete("/:id", admins.delete);
  
    // Delete all admins
    router.delete("/", admins.deleteAll);
  
    app.use('/api/admins', router);
  };