import mongoose from 'mongoose'

const baseTaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    createdAt: {type: Date, default: Date.now},
})

baseTaskSchema.pre('delete', function (next) {
    console.log(`Deleting ${this.__t}: ${this._id}`)
})

const BaseTask = mongoose.model('BaseTask', baseTaskSchema)
export default BaseTask
