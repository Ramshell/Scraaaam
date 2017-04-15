import mongoose from 'mongoose'
import BaseTask from '../models/BaseTask'

const taskSchema = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'BaseTask'},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
})

taskSchema.pre('remove', function (next) {
    Promise.all(this.tasks.map(taskId =>
        BaseTask.findById(taskId).remove()
    )).then(next)
})

taskSchema.methods.delete = function () {
    BaseTask.findById(this.parent)
        .then(parentTask => {
            parentTask.tasks = parentTask.tasks.filter(task => task !== this._id)
            parentTask.save()
        })
        .then(_ => {
            this.remove()
        })
}

const Task = BaseTask.discriminator('Task', taskSchema)
export default Task