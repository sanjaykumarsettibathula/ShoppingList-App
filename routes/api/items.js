const express = require("express");
const router = express.Router();
const Item = require("../../models/item");

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @route   POST api/items
// @desc    Create an item
// @access  Public
router.post("/", async (req, res) => {
  try {
    if (!req.body.name || req.body.name.trim() === "") {
      return res.status(400).json({ success: false, message: "Item name is required" });
    }

    const newItem = new Item({
      name: req.body.name.trim(),
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
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
