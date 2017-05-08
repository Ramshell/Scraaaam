import express from 'express'
import Project from '../models/Project.js'
import projectTasksRouter from './projects.tasks.routes.js'
import projectContributorsRouter from './projects.contributors.routes.js'
import {paramById, extendTask} from './utils'

let router = express.Router()

paramById(router, Project, 'aProject')

router.get('/', (req, res, next) =>
    Project.find()
        .then(projects => res.json(projects))
        .catch(next)
)

router.post('/', (req, res, next) =>
    Project.fullCreate(req.body)
        .then(someProject => res.status(201).json(someProject))
        .catch(next)
)

router.get('/:aProject', (req, res, next) =>
    req.aProject.populate('tasks contributors').execPopulate()
        .then(project => extendTask(project).then(extended => res.json(extended)))
        .catch(next)
)

router.delete('/:aProject', (req, res, next) =>
    req.aProject.delete()
        .then(projects => res.json(projects))
        .catch(next)
)

router.put('/:aProject', (req, res, next) =>
    Project.findByIdAndUpdate(req.aProject._id, req.body)
        .then(res.sendStatus(200))
        .catch(next)
)

router.use('/:aProject/tasks', projectTasksRouter)
router.use('/:aProject/contributors', projectContributorsRouter)
export default router
