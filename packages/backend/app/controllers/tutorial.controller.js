const db = require("../../database");
const logger = require("./../logger");
const { validate: uuidValidate } = require('uuid');

// uncomment this for custom instrumentation
//const newrelic = require('newrelic');

const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Start a custom segment for tutorial creation
  // uncomment this for custom instrumentation
  /* newrelic.startSegment('createTutorial_custom', true, () => { */
    // Validate request
    if (!req.body.title) {
      
      // uncomment this for custom instrumentation
     /* newrelic.noticeError(new Error('Missing title in tutorial creation'), {
        requestBody: req.body
      }); */
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a Tutorial
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      published: req.body.published ? req.body.published : false,
      author: req.body.author || "",
      readTime: req.body.readTime,
      difficulty: req.body.difficulty,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      viewCount: 0,
      likes: 0
    };

    // Add custom attributes for the tutorial creation
    // uncomment this for custom instrumentation
    /* newrelic.addCustomAttribute('tutorialCategory_custom', tutorial.category);
    newrelic.addCustomAttribute('tutorialDifficulty_custom', tutorial.difficulty); */

    // Save Tutorial in the database
    Tutorial.create(tutorial)
      .then((data) => {
        logger.info(`Added ${data.length} records`);
        logger.info(
          `${req.method} ${req.originalUrl}- ${JSON.stringify(
            req.params
          )} - Request Successful!!`
        );

        res.send(data);
      })
      .catch((err) => {
        // uncomment this for custom instrumentation
        // Enhanced error handling with New Relic
        /* newrelic.noticeError(err, {
          tutorialData: tutorial,
          errorLocation: 'tutorial.create_custom'
        }); */

        logger.error(
          `${req.method} ${req.originalUrl}- ${JSON.stringify(
            req.params
          )} - Error fetching data`
        );

        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      });
  //}); // uncomment this for custom instrumentation
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.findAll({ where: condition,order: [['updatedAt', 'DESC']]})
    .then((data) => {
      logger.info(`${req.method} ${req.originalUrl} Fetched ${data.length} records`);
      logger.info(`${req.method} ${req.originalUrl} - Request Successful!!`);

      res.send(data);
    })
    .catch((err) => {
      logger.error(`${req.method} ${req.originalUrl} - Error fetching data`);

      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

  // handle if not valid uuid or integer; add logger
  logger.info(`${req.method} ${req.originalUrl} : Fetching tutorial with id ${req.params.id}`);
  if (!req.params.id || !uuidValidate(req.params.id)) {
    logger.error(`${req.method} ${req.originalUrl} : Invalid tutorial id ${req.params.id}`);
    return res.status(400).send({ message: "Invalid tutorial id " + req.params.id });
  }

  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      if (!data) {
        logger.info(`${req.method} ${req.originalUrl} : Fetched ${data.length} records with ${id}`);

        res.status(404).send({ message: "Tutorial not found with id " + id });
      }
      else {
        logger.info(`${req.method} ${req.originalUrl} : Fetched ${data.length} records with ${id}`);
        logger.info(
          `${req.method} ${req.originalUrl}- ${JSON.stringify(
            req.params
          )} - Request Successful!!`
        );

        res.send(data);
      }
    })
    .catch((err) => {
      logger.error(
        `${req.method} ${req.originalUrl}- ${JSON.stringify(
          req.params
        )} - Error fetching data`
      );

      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Tutorial.update(req.body, { where: { id: id } })
    .then((data) => {
      if (data != 1) {
        logger.error(`${req.method}: Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`);
        logger.error(
          `${req.method} ${req.originalUrl}- ${JSON.stringify(
            req.params
          )} - Error updating data`
        );
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        logger.info(`${req.method} ${req.originalUrl} : Updated ${data.length} records with ${id}`);
        logger.info(
          `${req.method} ${req.originalUrl}- ${JSON.stringify(
            req.params
          )} - Request Successful!!`
        );
      
        res.send({ message: "Tutorial was updated successfully." });
      }
    })
    .catch((err) => {
      logger.error(
        `${req.method} ${req.originalUrl}- ${JSON.stringify(
          req.params
        )} - Error updating data`
      );
      logger.error(`${req.method} ${req.originalUrl} : Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`);

      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({ where: { id: id } })
    .then((data) => {
      if (!data) {
        logger.error(
          `${req.method} ${req.originalUrl}- ${JSON.stringify(
            req.params
          )} - Error updating data`
        );
        logger.error(`${req.method} ${req.originalUrl} : Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`);


        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        logger.info(`${req.method}: Deleted record with id=${id}`);
        logger.info(
          `${req.method} ${req.originalUrl}- ${JSON.stringify(
            req.params
          )} - Request Successful!!`
        );

        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      logger.error(
        `${req.method} ${req.originalUrl}- ${JSON.stringify(
          req.params
        )} - Error updating data`
      );
      res.status(404).send({
        message: `${req.method} ${req.originalUrl} : Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });

      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  /* Commenting out delete all instrumentation */

  // uncomment this for custom instrumentation
  // Start a custom segment for bulk delete operation
/*  newrelic.startSegment('deleteAllTutorials_custom', true, () => {
    // Add custom attributes for the delete operation
    newrelic.addCustomAttribute('operation_custom', 'bulkDelete');
    newrelic.addCustomAttribute('requestPath_custom', req.path);
    
    const err = new Error(`Failed to Delete the tutorials`);
    // Record custom event for delete attempt
    newrelic.recordCustomEvent('BulkDeleteAttempt_custom', {
      path: req.path,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString(),
      error: err.message,
      errorType: 'deliberate_error_custom',
      requestPath: req.path,
    });

    // Enhanced error handling with New Relic
    newrelic.noticeError(err, {
      operation: 'bulkDelete_custom',
      errorType: 'deliberate_error_custom',
      requestPath: req.path,
      timestamp: new Date().toISOString()
    });
  */
 

    logger.error(
      `${req.method} ${req.originalUrl}- ${JSON.stringify(req.params)} - ${
        err.message
      }`
    );
    logger.error(
     `${req.method} ${req.originalUrl} : Bulk delete failed!`,
    );

    res.status(500).send({
      message: err.message || "Some error occurred while removing all tutorials.",
    });
    return;
 
    // });  // uncomment this for custom instrumentation
 
    // The code below is unreachable but kept for reference
    Tutorial.destroy({
      truncate: true,
    })
      .then((data) => {
        logger.info(
          `${req.method} ${req.originalUrl}- ${JSON.stringify(
            req.params
          )} - Request Successful!!`
        );

        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`,
        });
      })
      .catch((err) => {
        logger.error(
          `${req.method} ${req.originalUrl}- ${JSON.stringify(
            req.params
          )} - Error updating data`
        );

        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials.",
        });
      });
  // });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      logger.info(`${req.method}: Fetched ${data.length} records`);
      logger.info(`${req.method} ${req.originalUrl} - Request Successful!!`);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Update view count
exports.updateViewCount = (req, res) => {
  const id = req.params.id;
  
  Tutorial.findByPk(id)
    .then(tutorial => {
      if (!tutorial) {
        return res.status(404).send({
          message: `Tutorial with id=${id} not found`
        });
      }
      
      return Tutorial.update(
        { viewCount: tutorial.viewCount + 1 }, 
        { where: { id: id } }
      );
    })
    .then(() => {
      res.send({ message: "View count updated successfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating view count: ${err.message}`
      });
    });
};

// Update likes
exports.updateLikes = (req, res) => {
  const id = req.params.id;
  const { increment } = req.body;
  
  Tutorial.findByPk(id)
    .then(tutorial => {
      if (!tutorial) {
        return res.status(404).send({
          message: `Tutorial with id=${id} not found`
        });
      }
      
      const newCount = increment ? tutorial.likes + 1 : Math.max(0, tutorial.likes - 1);
      return Tutorial.update(
        { likes: newCount }, 
        { where: { id: id } }
      );
    })
    .then(() => {
      res.send({ message: "Likes updated successfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating likes: ${err.message}`
      });
    });
};

exports.getCategories = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl} - Request Successful!!`);
  logger.info(`${req.method} ${req.originalUrl} : Fetched ${categories.length} records`);
  res.send(categories)
}

// Get tutorials by difficulty level
exports.findByDifficulty = (req, res) => {
  const difficulty = req.params.difficulty;
  
  Tutorial.findAll({ where: { difficulty: difficulty } })
    .then(data => {
      logger.info(`${req.method}: Fetched ${data.length} records with difficulty ${difficulty}`);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving tutorials with difficulty ${difficulty}: ${err.message}`
      });
    });
};

const categories = [{ 
  "id": 1, 
  "category": "Random"
}, {
  "id": 2,
  "category": "Web Development"
}, {
  "id": 3,
  "category": "Mobile Development"
}, {
  "id": 4,
  "category": "Data Science"
}, {
  "id": 5,
  "category": "DevOps"
}, {
  "id": 6,
  "category": "Design"
}, {
  "id": 7,
  "category": "Career"
}]