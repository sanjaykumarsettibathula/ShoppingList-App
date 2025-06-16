const express = require("express");
const router = express.Router();
const Item = require("../../models/item");

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});
// @route   POST api/items
// @desc    Create an item
// @access  Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    await Item.deleteOne({ _id: req.params.id }); // Updated method
    res.json({ success: true });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
