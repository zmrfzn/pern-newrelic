module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);
  
  // Get all tutorial categories
  router.get("/categories", tutorials.getCategories);

  // Get tutorials by difficulty level
  router.get("/difficulty/:difficulty", tutorials.findByDifficulty);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Update view count for a tutorial
  router.post("/:id/view", tutorials.updateViewCount);

  // Update likes for a tutorial
  router.post("/:id/like", tutorials.updateLikes);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
