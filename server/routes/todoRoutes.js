const express = require("express");
const Todo = require('../models/todo');

const router = express.Router();

router.get("/todos", async(req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    }
    catch (err){
        res.status(500).json({message: err.message});
    }   
});

router.post("/todos", async(req, res) => {
    const todo = new Todo({
        text: req.body.text,
    });

    try{
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

router.patch("/todos", async(req, res) => {
    try{
        const updatedTodo = await Todo.findByIdandUpdate(
            req.params.id,
            { completed: req.body.completed},
            { new: true}
        );
        res.json(updatedTodo);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

router.delete("/todos/:id", async(req, res) => {
    try{
        await Todo.findByIdandDelete(req.params.id);
        res.json({message: "ToDo deleted."});
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
});

module.exports = router;