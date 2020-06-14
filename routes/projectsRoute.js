const express = require("express");

const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

const router = express.Router();
router.use(express.json());

//-----------------
// GET Projects 
//-----------------

router.get("/", (req, res) => {
  projects
    .get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      next(err)
    });
});

//-----------------
// GET Project by ID
//-----------------
router.get("/:id", (req, res, next) => {
  projects
    .get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(404).json({
          message: "Project not found",
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch((err) => {
      next(err)
    });
});

//-----------------
// ADD new Project
//-----------------

router.post("/", (req, res, next) => {
  projects
    .insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch((err) => {
      next(err)
    });
});

//-----------------
// Update Project
//-----------------

router.put("/:id", (req, res, next) => {
  projects
    .update(req.params.id, req.body)
    .then((updated) => {
      if (!updated) {
        res.status(404).json({
          message: "The Project couldn't be found",
        });
      } else {
        res.status(201).json(updated);
      }
    })
    .catch((err) => {
      next(err)
    });
});

//-----------------
// Delete Project
//-----------------

router.delete("/:id", (req, res, next) => {
  projects
    .remove(req.params.id)
    .then((deleted) => {
      if (deleted > 0) {
        res.status(200).json({
          message: "The Project has been NUKED",
        });
      } else {
        res.status(404).json({
          message: "The Project couldn't be found",
        });
      }
    })
    .catch((err) => {
      next(err)
    });
});

router.get('/:id/actions', (req, res, next) => {
    projects.getProjectActions(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            next(err)
        })
})

/* function validateProjectId(req, res, next) {
if (req.params.id) {

}
} */

module.exports = router;
