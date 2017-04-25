import mongoose from 'mongoose'

const baseTaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    createdAt: {type: Date, default: Date.now},
})

baseTaskSchema.statics.addSubtask = function (aProject, aParentTask, aTask) {
    let task = aTask
    task.project = aProject
    task.parent = aParentTask
    return task.save()
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
            acc.then(updatedParent =>
                this.addSubtask(project, updatedParent, new Task(taskData.task))
                    .then(updated =>
                        this.addSubtasks(project, updated.task, taskData.tasks)
                            .then(_ => Promise.resolve(updated.parent))
                    )
            )
        , Promise.resolve(parent))
}

const BaseTask = mongoose.model('BaseTask', baseTaskSchema)
export default BaseTask
