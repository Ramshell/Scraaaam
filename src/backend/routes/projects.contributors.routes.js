import express from 'express'
import Contributor from '../models/Contributor.js'
import {paramById} from './utils'
import ProjectService from '../services/project.service'

let router = express.Router({mergeParams: true})

paramById(router, Contributor, 'aContributor')

router.get('/', (req, res, next) => {
    Contributor.find({projects: req.aProject._id})
        .then(contributors => res.json(contributors))
        .catch(next)
})

router.put('/:aContributor', (req, res, next) => {
    ProjectService.addContributor(req.aProject, req.aContributor)
        .then(updated => res.status(200).json(updated.contributor))
        .catch(next)
})

export default router
