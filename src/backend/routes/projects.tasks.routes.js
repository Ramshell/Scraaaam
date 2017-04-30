import express from 'express'
import Task from '../models/Task.js'
import BaseTask from '../models/BaseTask.js'
import Project from '../models/Project'
import {paramById} from './utils'
import tasksCommentsRouter from './projects.tasks.comments.routes.js'

let router = express.Router({mergeParams: true})

paramById(router, BaseTask, 'aTask')

router.get('/all', (req, res, next) =>
    Task.find({project: req.aProject._id})
        .then(tasks => res.json(tasks))
        .catch(next)
)

router.get('/', (req, res, next) =>
    res.json(req.aProject.tasks)
)

router.post('/', (req, res, next) =>
    BaseTask.addSubtask(req.aProject, req.aProject, Task.fullCreate(req.project, req.body))
        .then(updated => res.status(201).json(updated.task))
        .catch(next)
)

router.post('/:aTask', (req, res, next) =>
    BaseTask.addSubtask(req.aProject, req.aTask, Task.fullCreate(req.project, req.body))
        .then(updated => res.status(201).json(updated.task))
        .catch(next)
)

router.get('/:aTask', (req, res, next) =>
    req.aTask.populate('tasks project parent contributors comments').execPopulate()
        .then(task => {
            const extended = task.toObject()
            extended.allowedCategories = task.allowedCategories
            extended.categoryDetail = task.categoryDetail
            res.json(extended)
        })
        .catch(next)
)

router.delete('/:aTask', (req, res) => {
    req.aTask.remove()
    res.sendStatus(202)
})

router.put('/:aTask', (req, res, next) => {
    BaseTask.findByIdAndUpdate(req.aTask._id, req.body)
        .then(res.sendStatus(200))
        .catch(next)
})

router.use('/:aTask/comments', tasksCommentsRouter)
export default router
