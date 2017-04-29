import mongoose from 'mongoose'
import Task from './Task'

const commentSchema = new mongoose.Schema({
    content: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Contributor'},
    task: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
    createdAt: {type: Date, default: Date.now}
})

commentSchema.pre('remove', function (next) {
    Task.findByIdAndUpdate(this.task, {$pullAll: {comments: [this._id]}})
        .then(next)
})

commentSchema.methods.delete = function () {
    this.remove()
}

commentSchema.statics.fullCreate = function (data) {
    return this.create(data)
}

const Comment = mongoose.model('Comment', commentSchema)
export default Comment
