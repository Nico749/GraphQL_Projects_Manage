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
export{GET_PROJECTS}