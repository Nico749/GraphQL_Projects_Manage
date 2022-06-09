const {projects, clients} = require ('../dummydata.js')
const Project = require('../models/Project')
const Client = require('../models/Client')

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require ('graphql')


//client type
const ClientType = new GraphQLObjectType({
    name:"Client",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
    })
})

//project type
const ProjectType = new GraphQLObjectType({
    name:"Project",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        // (LINKING THE TWO SCHEMAS) gives back the client whose id matches the one of the parent(project)
        client:{type:ClientType,
        resolve(parent,args){return Client.findById(parent.clientId)}}
    })
})

//DEFINING OUR QUERIES
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        client:{
            type:ClientType,
            // we pass the id as args to pick a client
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id)
            }
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                //return clients //return the full arrays of clients
                return Client.find()
            }
        },
        project:{
            type:ProjectType,
            // we pass the id as args to pick a client
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                //if we use dummy data ==>return projects.find(project =>project.id === args.id)
                return Project.findById(args.id)
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find()
            }
        }
    }
})

//MUTATIONS
const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        //CLIENTS MUTATIONS
        addClient:{
            type:ClientType, //type of what we want to add
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},//cannot be null
                email:{type:GraphQLNonNull(GraphQLString)},//cannot be null
                phone:{type:GraphQLNonNull(GraphQLString)},//cannot be null
            },
            resolve(parent,args){
                const client = new Client({
                    name:args.name,
                    email:args.email,
                    phone:args.phone

                })
                return client.save()
            }
        },
        deleteClient:{
            type:ClientType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                //remove also any project related to that client
                Project.find({clientId:args.id}).then((projects)=>{projects.forEach(project=>{project.remove()})})
                return Client.findByIdAndRemove(args.id)
            }
        },
        //PROJECTS MUTATIONS
        addProject:{
            type:ProjectType, //type of what we want to add
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},//cannot be null
                description:{type:GraphQLNonNull(GraphQLString)},//cannot be null
                clientId:{type:GraphQLNonNull(GraphQLID)},
                status:{
                    type: new GraphQLEnumType({
                        name:"ProjectStatus",
                        values:{
                            'new':{value:"Not started"},
                            'progress':{value:"In progress"},
                            'completed':{value:"Completed"}
                        }
                    }),
                    defaultValue:"Not started"
                }
            },
            resolve(parent,args){
                const project = new Project({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    clientId:args.clientId

                })
                return project.save()
            }
        },
        deleteProject:{
            type:ProjectType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Project.findByIdAndRemove(args.id)
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
              id: { type: GraphQLNonNull(GraphQLID) },
              name: { type: GraphQLString },
              description: { type: GraphQLString },
              status: {
                type: new GraphQLEnumType({
                  name: 'ProjectStatusUpdate',
                  values: {
                    new: { value: 'Not Started' },
                    progress: { value: 'In Progress' },
                    completed: { value: 'Completed' },
                  },
                }),
              },
            },
            resolve(parent, args) {
              return Project.findByIdAndUpdate(
                args.id,
                {
                  $set: {
                    name: args.name,
                    description: args.description,
                    status: args.status,
                  },
                },
                { new: true }
              );
            },
          },
        },
      });
  


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})