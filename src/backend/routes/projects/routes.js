import express from 'express'
import Project from '../../models/Project.js'
import taskRouter from '../tasks/routes'

let router = express.Router()

router.param('aProject', (req, res, next, value) => {
    Project.findById(value)
        .then(aProject => {
            if (!aProject) {
                throw new Error(`Couldn't find project ${value}`)
            }
            req.aProject = aProject
            next()
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(next)
})

router.post('/', (req, res, next) => {
    const aProject = new Project(req.body)

    aProject.save()
        .then(someProject => res.status(201).json(someProject))
        .catch(next)
})

router.get('/:aProject', (req, res, next) => {
    req.aProject.populate('tasks').execPopulate()
        .then(project => res.json(project))
        .catch(next)
})

router.use('/:aProject/tasks', taskRouter)
export default router
