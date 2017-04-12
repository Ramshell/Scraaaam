import mongoose from 'mongoose'
import BaseTask from '../models/BaseTask'

const projectSchema = new mongoose.Schema({
    contributors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contributor'}]
})

const Project = BaseTask.discriminator('Project', projectSchema)
export default Project
