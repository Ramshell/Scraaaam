import mongoose from 'mongoose'
import BaseTask from '../models/BaseTask'
import Task from '../models/Task'
import Contributor from '../models/Contributor'

const projectSchema = new mongoose.Schema({
    category: {type: String, default: 'Proyecto'},
    categories: [[String]],
    contributors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contributor'}]
})

projectSchema.pre('remove', function (next) {
    Promise.all([
        Task.find({project: this._id}).remove(),
        Contributor.updateMany({projects: this._id}, {$pullAll: {projects: [this._id]}})
    ]).then(next)
})

projectSchema.pre('save', function (next) {
    if (this.isNew && this.categories.length === 0)
        this.categories.push(...[['Release'], ['Milestone', 'Spike'], ['Epic'], ['Normal']])
    next()
})

projectSchema.methods.delete = function () {
    return this.remove().then(removed => Project.find())
}

projectSchema.methods.buildHistory = function (promiseOfList) {
    return promiseOfList.then(list => {
        list.push(this)
        return list
    })
}

projectSchema.virtual('allowedCategories').get(function () {
    return [].concat.apply([], this.categories)
})

projectSchema.statics.fullCreate = function (data) {
    const tasks = data.tasks || []
    data.tasks = []
    return this.create(data)
        .then(saved => this.addSubtasks(saved, saved, tasks))
}

projectSchema.statics.addContributor = function (aProject, aContributor) {
    let contributor = aContributor
    contributor.projects.push(aProject)
    return contributor.save()
        .then(savedContributor => {
            contributor = savedContributor
            aProject.contributors.push(contributor)
            return aProject.save()
        })
        .then(savedProject => ({project: savedProject, contributor: contributor}))
        .catch(err => console.log(err))
}

const Project = BaseTask.discriminator('Project', projectSchema)
export default Project
