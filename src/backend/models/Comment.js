import mongoose from 'mongoose'
import Project from './Task'

const commentSchema = new mongoose.Schema({
    content: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Contributor'},
    task: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
    createdAt: {type: Date, default: Date.now}
})

commentSchema.pre('remove', function (next) {
    Task.updateMany({_id: {$in: this.task}}, {$pullAll: {comments: [this._id]}})
        .then(next)
})

commentSchema.methods.delete = function () {
    this.remove()
}

const Comment = mongoose.model('Comment', commentSchema)
export default Comment
