const express = require("express");
const OP10 = require('../models/card');

const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const cards = await OP10.find().select('-img');
        console.log('Found Cards', cards);
        res.json(cards);
    }
    catch (err){
        res.status(500).json({message: err.message});
    }   
});

// router.post("/todos", async(req, res) => {
//     const todo = new Todo({
//         text: req.body.text,
//     });

//     try{
//         const newTodo = await todo.save();
//         res.status(201).json(newTodo);
//     }
//     catch(err){
//         res.status(400).json({message: err.message});
//     }
// });

// router.patch("/todos/:id", async(req, res) => {
//     try{
//         const updatedTodo = await Todo.findByIdAndUpdate(
//             req.params.id,
//             { completed: req.body.completed},
//             { new: true}
//         );
//         if (!updatedTodo) {
//             return res.status(404).json({ message: "Todo not found" });
//         }
//         res.json(updatedTodo);
//     }
//     catch(err){
//         res.status(500).json({message: err.message});
//     }
// });

// router.delete("/todos/:id", async(req, res) => {
//     try{
//         await Todo.findByIdAndDelete(req.params.id);
//         res.json({message: "ToDo deleted."});
//     }
//     catch(err){
//         res.status(500).json({message: err.message})
//     }
// });

module.exports = router;