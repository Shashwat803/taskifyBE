const express = require('express')
const router = express.Router()
const { createTodo, getTodo, updateTodo, deleteTodo, markDone } = require('../controllers/todoControllers')
const validateUser = require('../middleware/validateTokenHandler')


router.use(validateUser)

router.get('/', getTodo)

router.post('/', createTodo)

router.put('/:id', updateTodo)

router.delete('/:id', deleteTodo)

router.put('/:id', markDone)
module.exports = router