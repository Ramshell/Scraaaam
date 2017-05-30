import express from 'express'
import Contributor from '../models/Contributor'
import Project from '../models/Project'
import {paramById} from './utils'

let router = express.Router({mergeParams: true})

paramById(router, Contributor, 'aContributor')

router.get('/', (req, res, next) => {
    Contributor.find({projects: req.aProject._id})
        .then(contributors => res.json(contributors))
        .catch(next)
})

router.put('/:aContributor', (req, res, next) => {
    Project.addContributor(req.aProject, req.aContributor)
        .then(updated => res.status(200).json(updated.contributor))
        .catch(next)
})

export default router
