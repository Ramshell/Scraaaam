import Contributor from "./models/Contributor"
import Project from "./models/Project"
import Task from "./models/Task"
import ProjectService from "./services/project.service"

const addSubtasks = (project, parent, tasks) =>
    tasks.reduce((acc, taskData) =>
            acc.then(updatedParent =>
                ProjectService.addSubtask(project, updatedParent, new Task(taskData.task))
                    .then(updated =>
                        addSubtasks(project, updated.task, taskData.tasks)
                            .then(_ => Promise.resolve(updated.parent))
                    )
            )
        , Promise.resolve(parent))

const createProject = projectData =>
    new Project(projectData.project).save()
        .then(saved => addSubtasks(saved, saved, projectData.tasks))

const createProjects = () => Promise.all(projects.map(projectData => createProject(projectData)))

const contributorJoinProjectByIndex = (contributorIndex, projectIndex) =>
    ProjectService.addContributor(projects[projectIndex], contributors[contributorIndex])
        .then(updated => {
            projects[projectIndex] = updated.project
            contributors[contributorIndex] = updated.contributor
            return Promise.resolve()
        })


let contributors = [
    {name: "Nicolas"},
    {name: "Emanuel"}
]

let projects = [
    {
        project: {title: "Scraaaam", description: "Scraaaam-ception!"},
        tasks: [
            {
                task: {category: 'Milestone', title: 'Backend', description: 'Hacer el backend'},
                tasks: [
                    {
                        task: {
                            category: 'Epic',
                            title: 'Tasks recursivas',
                            description: 'Funcion para la creacion de subtareas recursivamente'
                        },
                        tasks: [{
                            task: {category: 'Normal', title: 'Test', description: 'Funciona!'},
                            tasks: []
                        }]
                    }
                ]
            },
            {
                task: {category: 'Milestone', title: 'Frontend', description: 'Hacer el frontend'},
                tasks: []
            },
            {
                task: {category: 'Epic', title: 'Model', description: 'Pensar el modelo'},
                tasks: []
            },
            {
                task: {
                    category: 'Spike',
                    title: 'Angular 2',
                    description: 'Investigar como no querer pegarse un tiro con Angular 2'
                },
                tasks: []
            }
        ]
    },
    {
        project: {title: "FixJS", description: "Porque JS tambien necesita fix. Y monadas. Y amor, mucho amor."},
        tasks: []
    }
]

const initDatabase = () => {
    console.log('Initializing database...')
    Promise.all([
        Contributor.create(contributors),
        createProjects()
    ]).then(created => {
        contributors = created[0]
        projects = created[1]
    }).then(_ => contributorJoinProjectByIndex(0, 0))
        .then(_ => contributorJoinProjectByIndex(1, 0))
        .then(_ => contributorJoinProjectByIndex(0, 1))
        .then(_ => console.log('Done!'))
}

export default initDatabase