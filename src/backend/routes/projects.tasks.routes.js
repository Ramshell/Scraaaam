import express from 'express'
import Task from '../models/Task.js'
import BaseTask from '../models/BaseTask.js'
import {paramById} from './utils'
import ProjectService from '../services/project.service'

let router = express.Router({mergeParams: true})

paramById(router, BaseTask, 'aTask')

router.get('/', (req, res, next) => {
    Task.find({project: req.aProject._id})
        .then(tasks => res.json(tasks))
        .catch(next)
})

router.post('/:aTask', (req, res, next) => {
    ProjectService.addSubtask(req.aProject, req.aTask, new Task(req.body))
        .then(updated => res.status(201).json(updated.task))
        .catch(next)
})

router.get('/:aTask', (req, res, next) => {
    req.aTask.populate('tasks project parent contributors').execPopulate()
        .then(task => res.json(task))
        .catch(next)
})

router.delete('/:aTask', (req, res) => {
    req.aTask.delete()
    res.sendStatus(202)
})

export default router
