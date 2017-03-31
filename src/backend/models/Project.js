import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: String,
  milestones: [String],
  createdAt: { type: Date, default: Date.now },
})

projectSchema.methods.add = function(milestone) {
  this.milestones.push(milestone)
}

const Project = mongoose.model('Project', projectSchema)
export default Project
