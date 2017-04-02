import mongoose from 'mongoose'
import BaseTask from 'BaseTask'

const projectSchema = new mongoose.Schema({
    contributors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contributor'}]
})

projectSchema.methods.addContributor = contributor => {
    this.contributors.push(contributor)
}

const Project = BaseTask.discriminator('Project', projectSchema)
export default Project
