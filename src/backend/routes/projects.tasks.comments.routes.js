import express from 'express'
import Comment from '../models/Comment.js'
import BaseTask from '../models/BaseTask.js'
import {paramById} from './utils'

let router = express.Router({mergeParams: true})

paramById(router, BaseTask, 'aTask')

router.get('/', (req, res, next) => {
    Comment.find({_id: {$in: req.aTask.comments}})
        .then(comments => res.json(comments))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Comment.fullCreate(req.aTask, req.body)
    .then(aComment => res.status(201).json(aComment))
    .catch(next)
})

export default router
