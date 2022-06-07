const {projects, clients} = require ('../dummydata.js')
const Project = require('../models/Project')
const Client = require('../models/Client')

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require ('graphql')


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


module.exports = new GraphQLSchema({
    query:RootQuery
})