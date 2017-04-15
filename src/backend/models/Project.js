import mongoose from 'mongoose'
import BaseTask from '../models/BaseTask'
import Task from '../models/Task'

const projectSchema = new mongoose.Schema({
    contributors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contributor'}]
})

projectSchema.pre('remove', function (next) {
    Task.find({project: this._id}).remove().then(next())
})

projectSchema.methods.delete = function () {
    this.remove()
}

const Project = BaseTask.discriminator('Project', projectSchema)
export default Project
