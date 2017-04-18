import express from 'express'
import Comment from '../models/Comment.js'
import BaseTask from '../models/BaseTask.js'
import {paramById} from './utils'
import ProjectService from '../services/project.service'

let router = express.Router({mergeParams: true})

paramById(router, BaseTask, 'aTask')

router.get('/', (req, res, next) => {
  Comment.find({_id: {$in: req.aTask.comments }})
      .then(comments => res.json(comments))
      .catch(next)
})

router.post('/', (req, res, next) => {
  let aComment = new Comment(req.body)
  aComment.save()
      .then(someComment => {
        aComment = someComment
        req.aTask.comments.push(someComment)
        req.aTask.save()
      })
      .then(someTask => res.status(201).json(aComment))
      .catch(next)
})

export default router
