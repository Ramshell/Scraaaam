import express from 'express'
import Task from '../../../models/Task.js'
import BaseTask from '../../../models/BaseTask.js'

let router = express.Router({mergeParams: true})

router.param('aTask', (req, res, next, value) => {
    Task.findById(value)
        .then(aTask => {
            if (!aTask) {
                throw new Error(`Couldn't find task ${value}`)
            }
            req.aTask = aTask
            next()
        })
        .catch(next)
})

router.param('parentTask', (req, res, next, value) => {
    BaseTask.findById(value)
        .then(parentTask => {
            if (!parentTask) {
                throw new Error(`Couldn't find task or project ${value}`)
            }
            req.parentTask = parentTask
            next()
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Task.find({project: req.aProject._id})
        .then(tasks => res.json(tasks))
        .catch(next)
})

router.post('/:parentTask', (req, res, next) => {
    const parentTask = req.parentTask
    let aTask = new Task(req.body)
    aTask.project = req.aProject
    aTask.parent = parentTask
    aTask.save()
        .then(savedTask => {
            aTask = savedTask
            parentTask.tasks.push(aTask)
            parentTask.save()
        })
        .then(savedParentTask => res.status(201).json(aTask))
        .catch(next)
})

router.get('/:aTask', (req, res, next) => {
    req.aTask.populate('tasks project parent').execPopulate()
        .then(task => res.json(task))
        .catch(next)
})

export default router
