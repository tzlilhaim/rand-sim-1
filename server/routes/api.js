const express = require("express")
const router = express.Router()

class ToDosArr {
  constructor() {
    this.todos = []
    this.idCount = 0
  }
  addToDo(todo) {
    this.todos.push(todo)
    this.idCount++
  }
  removeToDo(todo) {
    const todoIndex = this.todos.indexOf(todo)
    this.todos.splice(todoIndex, 1)
  }
}

class ToDo {
  constructor(id, text) {
    this.id = id
    this.text = text
    this.complete = false
    this.priority = 1
  }
  toggleComplete() {
    this.complete = !this.complete
  }
  upgradePriority(){
    if(this.priority === 3){
        this.priority = 1
    }else{
        this.priority++
    }
  }
}

const todosArr = new ToDosArr()

router.get("/todos", function (req, res) {
  res.send(todosArr)
})

router.post("/todo", function (req, res) {
  const text = req.body.text
  todosArr.addToDo(new ToDo(todosArr.idCount, text))
  res.send(todosArr)
})

router.put("/todo/:todoID/toggleComplete", function (req, res) {
  const todoID = req.params.todoID
  todosArr.todos.find((t) => t.id == todoID).toggleComplete()
  res.send(todosArr)
})

router.put("/todo/:todoID/upgradePriority", function (req, res) {
    const todoID = req.params.todoID
    todosArr.todos.find((t) => t.id == todoID).upgradePriority()
    res.send(todosArr)
  })

router.delete("/todo/:todoID", function (req, res) {
  const todoID = req.params.todoID
  todosArr.removeToDo(todosArr.todos.find((t) => t.id == todoID))
  res.send(todosArr)
})

module.exports = router