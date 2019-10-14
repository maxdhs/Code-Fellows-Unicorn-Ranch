const router = require("express").Router();
let Unicorn = require("../models/unicorns.models");

router.route("/").get((req, res) => {
  Unicorn.find()
    .then(unicorns => res.json(unicorns))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const color = req.body.color;
  const location = req.body.location;
  const favoriteFood = req.body.favoriteFood;

  const newUnicorn = new Unicorn({ name, color, location, favoriteFood });

  newUnicorn
    .save()
    .then(() => res.json("Unicorn added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Unicorn.findById(req.params.id)
    .then(unicorn => {
      unicorn.name = req.body.name;
      unicorn.color = req.body.color;
      unicorn.location = req.body.location;
      unicorn.favoriteFood = req.body.favoriteFood;

      unicorn
        .save()
        .then(() => res.json("unicorn updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
