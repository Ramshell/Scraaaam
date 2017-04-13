import express from 'express'
import Task from '../models/Task.js'
import BaseTask from '../models/BaseTask.js'
import {paramById} from './utils'

let router = express.Router({mergeParams: true})

paramById(router, Task, 'aTask')
paramById(router, BaseTask, 'parentTask')

router.get('/all', (req, res, next) => {
  //returns every task bounded to the project
  Task.find({project: req.aProject._id})
      .then(tasks => res.json(tasks))
      .catch(next)
})

router.get('/', (req, res, next) => {
  //returns only the lvl 1 tasks
  res.json(req.aProject.tasks)
})

router.post('/', (req, res, next) => {
  //if the parentTask is undefined means that the task is a direct offspring of the project
  saveTask(req.aProject, req, next, res, req.body)
})

router.post('/:parentTask', (req, res, next) => {
  saveTask(req.parentTask, req, next, res, req.body)
})

const saveTask = (parent, req, next, res, task) => {
  const parentTask = parent
  let aTask = new Task(task)
  aTask.project = req.aProject
  aTask.parent = parentTask
  aTask.save()
      .then(savedTask => {
          aTask = savedTask
          savedTask.parent.tasks.push(savedTask)
          savedTask.parent.save()
      })
      .then(savedParentTask => res.status(201).json(aTask))
      .catch(next)
}

router.get('/:aTask', (req, res, next) => {
  req.aTask.populate('tasks project parent').execPopulate()
      .then(task => res.json(task))
      .catch(next)
})

router.delete('/:aTask', (req, res) => {
  req.aTask.remove()
  res.sendStatus(202)
})

export default router
