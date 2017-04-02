import express from 'express'
import Contributor from '../../models/Contributor.js'

let router = express.Router()

router.param('aContributor', (req, res, next, value) => {
    Contributor.findById(value)
        .then(aContributor => {
            if (! aContributor ) {
                throw new Error(`Couldn't find contributor ${value}`)
            }
            req.aContributor = aContributor
            next()
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Contributor.find()
        .then(contributors => res.json(contributors))
        .catch(next)
})

router.post('/', (req, res, next) => {
    const aContributor = new Contributor(req.body)

    aContributor.save()
        .then(someContributor => res.status(201).json(someContributor))
        .catch(next)
})

router.get('/:aContributor', (req, res, next) => {
    req.aContributor.populate('projects').execPopulate()
        .then(contributor => res.json(contributor))
        .catch(next)
})

export default router
