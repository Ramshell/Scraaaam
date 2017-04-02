import mongoose from 'mongoose'

const baseTaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    createdAt: {type: Date, default: Date.now},
})

baseTaskSchema.methods.addTask = task => {
    this.tasks.push(task)
}

const BaseTask = mongoose.model('Contributor', baseTaskSchema)
export default BaseTask
