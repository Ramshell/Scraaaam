import mongoose from 'mongoose'
import Project from './Project'

const contributorSchema = new mongoose.Schema({
    name: String,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
})

contributorSchema.pre('remove', function (next) {
    Project.updateMany({_id: {$in: this.projects}}, {$pullAll: {contributors: [this._id]}})
        .then(next)
})

contributorSchema.methods.delete = function () {
    this.remove()
}

const Contributor = mongoose.model('Contributor', contributorSchema)
export default Contributor
