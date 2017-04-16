let service = {}

service.addContributor = (aProject, aContributor) => {
    let contributor = aContributor
    contributor.projects.push(aProject)
    return contributor.save()
        .then(savedContributor => {
            contributor = savedContributor
            aProject.contributors.push(contributor)
            return aProject.save()
        })
        .then(savedProject => ({project: savedProject, contributor: contributor}))
}

service.addSubtask = (aProject, aParentTask, aTask) => {
    let task = aTask
    task.project = aProject
    task.parent = aParentTask
    return task.save()
        .then(savedTask => {
            task = savedTask
            aParentTask.tasks.push(task)
            return aParentTask.save()
        })
        .then(savedParent => ({parent: savedParent, task: task}))
}

export default service