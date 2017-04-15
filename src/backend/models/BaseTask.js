import mongoose from 'mongoose'

const baseTaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    createdAt: {type: Date, default: Date.now},
})

const BaseTask = mongoose.model('BaseTask', baseTaskSchema)
export default BaseTask
