const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

let routes = (app) => {
    //  router.get("/", controllers/home.getHome);

    //    router.post("/upload", upload.single("file"), upload.uploadFiles);
    
    router.get("/", homeController.getHome);
    
    router.post("/upload", upload.single("file"), uploadController.uploadFiles);
    
    router.get("/files", uploadController.getListFiles);
    
    router.get("/files/:name", uploadController.download);
    
    return app.use("/ap", router);

};

module.exports = routes;