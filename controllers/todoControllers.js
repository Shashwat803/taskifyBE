const Todo = require('../models/TodoModel')



const createTodo = async (req, res) => {
    try {
        const { todo } = req.body
        const todoExist = await Todo.findOne({ todo: todo })
        if (!todo) {
            return res.status(400).json("Please provide a todo")
        }
        if (todoExist) {
            return res.status(409).json({ message: "This todo already exists" });
        }
        const newTodo = await Todo.create({
            todo: todo,
            user_id: req.user.id
        })
        res.status(201).json(newTodo)
    } catch (error) {
        throw new Error(error)
    }
}

const getTodo = async (req, res) => {
    try {
        const todo = await Todo.find({user_id:req.user.id})
        res.status(200).json(todo)
    } catch (error) {
        throw new Error(error)
    }
}


const updateTodo = async (req, res) => {
    try {
        const id = req.params.id
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({ message: "Todo with this Id in not found" })
        }
        const updateTodo = await Todo.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json(updateTodo)
    } catch (error) {
        throw new Error(error)
    }
}

const deleteTodo = async(req, res) =>{
    try {
        const id = req.params.id
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({ message: "Todo with this Id in not found" })
        }
    await todo.deleteOne()    
    res.status(200).json({message:"Todo Deleted Successfully"})
    } catch (error) {
        throw new Error(error)
    }
}

const markDone = async(req, res) =>{
    try {
        const id = req.params.id
        const {isDone} = req.body
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({ message: "Todo with this Id in not found" })
        }
        const doneTodo = await Todo.findByIdAndUpdate(id, {isDone}, {new:true})
        res.status(201).json(doneTodo)
    } catch (error) {
        
    }
}

module.exports = { createTodo, getTodo, updateTodo, deleteTodo, markDone }