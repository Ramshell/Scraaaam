import express from 'express'

let router = express.Router()

// Express routes
router.get('/projects', (req, res, next) => {
  res.json({data: 'this is the projects index'})
})

export default router
