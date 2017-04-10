import mongoose from 'mongoose'
import Project from './Project'

const contributorSchema = new mongoose.Schema({
    name: String,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
})

contributorSchema.pre('remove', function (next) {
    this.projects.forEach(projectId => {
        Project.findById(projectId).then(project => {
            project.contributors = project.contributors.filter(contributor => contributor !== this)
            project.save()
        })
        next()
    })
})

const Contributor = mongoose.model('Contributor', contributorSchema)
export default Contributor
