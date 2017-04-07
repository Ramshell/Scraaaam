import express from 'express'
import Contributor from '../../../models/Contributor.js'

let router = express.Router({mergeParams: true})

router.get('/', (req, res, next) => {
    Contributor.find({projects: req.aProject._id})
        .then(contributors => res.json(contributors))
        .catch(next)
})

// router.put('/', (req, res, next) => {
//     const project = req.aProject
//     Contributor.findById(req.body._id)
//         .then(aContributor => {
//             aContributor.projects.push(project)
//             aContributor.save()
//                 .then(savedContributor => {
//                     project.contributors.push(savedContributor)
//                     project.save()
//                         .then(savedProject => res.status(200).json(savedContributor))
//                         .catch(next)
//                 })
//                 .catch(next)
//         })
//         .catch(next)
// })

router.put('/', (req, res, next) => {
    const project = req.aProject
    let contributor = {}
    Contributor.findById(req.body._id)
        .then(foundContributor => {
            contributor = foundContributor
            contributor.projects.push(project)
            return contributor.save()
        })
        .then(savedContributor => {
            contributor = savedContributor
            project.contributors.push(contributor)
            return project.save()
        })
        .then(savedProject => res.status(200).json(contributor))
        .catch(next)
})

export default router
