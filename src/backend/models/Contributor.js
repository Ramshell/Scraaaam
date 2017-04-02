import mongoose from 'mongoose'

const contributorSchema = new mongoose.Schema({
    name: String,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
})

contributorSchema.methods.addProject = project => {
    this.projects.push(project)
}

const Contributor = mongoose.model('Contributor', contributorSchema)
export default Contributor
