import {gql} from '@apollo/client'

const GET_PROJECTS = gql`
query getProjects{
    projects{
        name,
        status,
        description,
        id
      }
}
`

const GET_PROJECT=gql`
query getProject($id:ID!){
    project(id:$id){
        name,
        status,
        description,
        id
        client{
            id
            name
            email
            phone
        }
      }
}
`

export{GET_PROJECTS, GET_PROJECT}