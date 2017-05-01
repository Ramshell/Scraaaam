import mongoose from 'mongoose'

const baseTaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    createdAt: {type: Date, default: Date.now},
})

baseTaskSchema.virtual('history').get(function () {
    return this.buildHistory(Promise.resolve([]))
})

baseTaskSchema.virtual('categoryDetail').get(function () {
    return this.tasks.reduce((acc, task) => {
        acc[task.category] = ++acc[task.category] || 1
        return acc
    }, {})
})

baseTaskSchema.statics.addSubtask = function (aProject, aParentTask, aTask) {
    let task
    return aTask
        .then(task => {
            task.project = aProject
            task.parent = aParentTask
            return task.save()
        })
        .then(savedTask => {
            task = savedTask
            aParentTask.tasks.push(task)
            return aParentTask.save()
        })
        .then(savedParent => ({parent: savedParent, task: task}))
}

baseTaskSchema.statics.addSubtasks = function (project, parent, tasks) {
    const Task = require('mongoose').model('Task')
    return tasks.reduce((acc, taskData) =>
            acc.then(accParent =>
                this.addSubtask(project, accParent, Task.fullCreate(project, taskData))
                    .then(updated => Promise.resolve(updated.parent))
            )
        , Promise.resolve(parent))
}

const BaseTask = mongoose.model('BaseTask', baseTaskSchema)
export default BaseTask
