const {projects, clients} = require ('../dummydata.js')

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
        resolve(parent,args){return clients.find(client =>client.id === parent.id)}}
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
                return clients.find(client =>client.id === args.id)
            }
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                return clients //return the full arrays of clients
            }
        },
        project:{
            type:ProjectType,
            // we pass the id as args to pick a client
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return projects.find(project =>project.id === args.id)
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent,args){
                return projects
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery
})