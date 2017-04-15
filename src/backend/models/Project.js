import mongoose from 'mongoose'
import BaseTask from '../models/BaseTask'
import Task from '../models/Task'
import Contributor from '../models/Contributor'

const projectSchema = new mongoose.Schema({
    category: {type: String, default: 'Proyecto'},
    categories: [String],
    contributors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contributor'}]
})

projectSchema.pre('remove', function (next) {
    Promise.all([
        Task.find({project: this._id}).remove(),
        Contributor.updateMany({projects: this._id}, {$pullAll: {projects: [this._id]}})
    ]).then(next)
})

projectSchema.pre('save', function (next) {
    if (this.categories.length === 0)
        this.categories.push(...['Milestone', 'Epic', 'Spike'])
    next()
})

projectSchema.methods.delete = function () {
    this.remove()
}

const Project = BaseTask.discriminator('Project', projectSchema)
export default Project
