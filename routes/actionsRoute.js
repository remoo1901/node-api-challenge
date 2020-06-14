const express = require("express");

const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

const router = express.Router();
router.use(express.json());

//-----------------
// GET Actions
//-----------------

router.get("/", async (req, res, next) => {
  try {
    const data = await actions.get();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});
//-----------------
// GET Actions by ID
//-----------------

router.get("/:id", async (req, res, next) => {
  try {
    const action = actions.get(req.params.id);

    if (!action) {
      res.status(404).json({
        message: "Action not found",
      });
    } else {
      res.status(200).json(action);
    }
  } catch (err) {
    next(err);
  }
});

//-----------------
// ADD new Action
//-----------------

router.post("/", async (req, res, next) => {
  try {
    await actions.get();

    if (!req.body.project_id || !req.body.description || req.body.completed) {
      res.status(404).json({
        Message: "missing a field",
      });
    } else {
      const action = await actions.insert(req.body);

      res.status(201).json(action);
    }
  } catch (err) {
    next(err);
  }
});

//-----------------
// Update Action
//-----------------

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await actions.update(req.params.id, req.body);

    if (!updated) {
      res.status(404).json({
        message: "The Action couldn't be found",
      });
    } else {
      res.status(201).json(updated);
    }
  } catch (err) {
    next(err);
  }
});

//-----------------
// Delete Action
//-----------------

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await actions.remove(req.params.id);
    if (deleted > 0) {
      res.status(200).json({
        message: "The Action  has been NUKED",
      });
    } else {
      res.status(404).json({
        message: "The Action couldn't be found",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

/* router.get("/", (req, res, next) => {
    actions
      .get()
      .then((action) => {
        res.status(200).json(action);
      })
      .catch((err) => {
        next(err);
      });
  });
   */

/*  router.get("/",  async (req, res, next) => {
    try  {
         const data = await actions.get()
      res.status(200).json(data);
    }
    catch (err)  {
      next(err)
    
    } */

/* 
    router.post("/", (req, res, next) => {
  actions
    .get()
    .then((action) => {
      if (!req.body.project_id || !req.body.description || req.body.completed) {
        res.status(404).json({
          Message: "missing a field",
        });
      } else {
        actions
          .insert(req.body)
          .then((action) => {
            res.status(201).json(action);
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Something went wrong!" });
    });
}); */

/* 
router.put("/:id", (req, res, next) => {
    actions
      .update(req.params.id, req.body)
      .then((updated) => {
        if (!updated) {
          res.status(404).json({
            message: "The Action couldn't be found",
          });
        } else {
          res.status(201).json(updated);
        }
      })
      .catch((err) => {
        next(err);
      });
  }); */

/* router.delete("/:id", (req, res) => {
    actions
      .remove(req.params.id)
      .then((deleted) => {
        if (deleted > 0) {
          res.status(200).json({
            message: "The Action  has been NUKED",
          });
        } else {
          res.status(404).json({
            message: "The Action couldn't be found",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }); */
