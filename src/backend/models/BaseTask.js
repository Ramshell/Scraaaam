import mongoose from 'mongoose'

const baseTaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    createdAt: {type: Date, default: Date.now},
})

const BaseTask = mongoose.model('BaseTask', baseTaskSchema)

baseTaskSchema.pre('remove', function (next) {
    BaseTask.remove({_id: {'$in': this.tasks}}).exec(_ => next())
})

export default BaseTask
