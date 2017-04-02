import mongoose from 'mongoose'
import BaseTask from 'BaseTask'

const taskSchema = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'BaseTask'},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
})

const Task = BaseTask.discriminator('Task', taskSchema)
export default Task