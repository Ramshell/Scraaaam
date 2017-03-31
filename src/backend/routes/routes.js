import express from 'express'
import Project from '../models/Project.js'

let router = express.Router()

router.param('aProject', (req, res, next, value) => {
  Project.findById(value)
    .then(aProject => {
      if (! aProject ) {
        throw new Error(`Couldn't find new ${value}`)
      }
      req.aProject = aProject
      next()
    })
    .catch(next)
})

// projects index
router.get('/projects', (req, res, next) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(next)
})

// create project
router.post('/projects', (req, res, next) => {
  const aProject = new Project(req.body)

  aProject.save()
    .then(someProject => res.status(201).json(someProject))
    .catch(next)
})

// get a particular project
// projects index
router.get('/projects/:aProject', (req, res, next) => {
  req.aProject.populate('milestones').execPopulate()
    .then(project => res.json(project))
    .catch(next)
})

router.post('/projects/:aProject/milestones', (req, res, next) => {
  const someProject = req.aProject
  const milestone = req.body // TODO: new Milestone(req.body); milestone.project = someProject
  someProject.milestones.push(milestone)
  someProject.save()
    .then(_savedProject => res.json(milestone))
    .catch(next)
})

export default router
