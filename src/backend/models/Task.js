import mongoose from 'mongoose'
import BaseTask from '../models/BaseTask'

const taskSchema = new mongoose.Schema({
    category: {type: String, default: 'Sin definir'},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'BaseTask'},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

taskSchema.pre('remove', function (next) {
    Promise.all(this.tasks.map(taskId =>
        BaseTask.findById(taskId).remove()
    )).then(next)
})

taskSchema.methods.delete = function () {
    BaseTask.findByIdAndUpdate(this.parent, {$pullAll: {tasks: [this._id]}})
        .then(_ => this.remove())
}

taskSchema.methods.buildAllowedCategories = function () {
    const drop = this.project.categories.findIndex((list) => list.contains(this.category))
    const allowed = this.project.categories.slice(drop)
    return [].concat.apply([], allowed)
}

taskSchema.statics.fullCreate = function (project, data) {
    const tasks = data.tasks || []
    data.tasks = []
    return this.create(data)
        .then(saved => this.addSubtasks(project, saved, tasks))
}

const Task = BaseTask.discriminator('Task', taskSchema)
export default Task
