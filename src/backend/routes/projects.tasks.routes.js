import express from 'express'
import Task from '../models/Task.js'
import BaseTask from '../models/BaseTask.js'
import {paramById} from './utils'
import ProjectService from '../services/project.service'

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
  ProjectService.addSubtask(req.aProject, req.aProject, new Task(req.body))
      .then(updated => res.status(201).json(updated.task))
      .catch(next)
})

router.post('/:parentTask', (req, res, next) => {
    ProjectService.addSubtask(req.aProject, req.parentTask, new Task(req.body))
        .then(updated => res.status(201).json(updated.task))
        .catch(next)
})

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
