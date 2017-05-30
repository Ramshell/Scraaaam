import express from 'express'
import Contributor from '../models/Contributor'
import {paramById} from './utils'

let router = express.Router()

paramById(router, Contributor, 'aContributor')

router.get('/', (req, res, next) => {
    Contributor.find()
        .then(contributors => res.json(contributors))
        .catch(next)
})

router.post('/', (req, res, next) =>
    Contributor.fullCreate(req.body)
        .then(someContributor => res.status(201).json(someContributor))
        .catch(next)
)

router.get('/:aContributor', (req, res, next) =>
    req.aContributor.populate('projects').execPopulate()
        .then(contributor => res.json(contributor))
        .catch(next)
)

router.delete('/:aContributor', (req, res) => {
    req.aContributor.delete()
    res.sendStatus(202)
})

router.put('/:aContributor', (req, res, next) =>
    Contributor.findByIdAndUpdate(req.aContributor._id, req.body)
        .then(res.sendStatus(200))
        .catch(next)
)

export default router
