import {FaTrash} from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENTS } from '../mutations/clientMutation'
import { GET_CLIENTS } from '../queries/clientQueries'

//passing client as prop we retrieve the data from the db
const ClientRow = ({client}) => {
    // to pass a variable we simply add an obj after the mutation name
    const [deleteClient] = useMutation(DELETE_CLIENTS,{
        variables:{id:client.id},
        //to have the data updated without need to refresh the page we refetch the get_clients query
        refetchQueries:[{query:GET_CLIENTS}]
            
    })
  return (
   <tr>
       <td>{client.name}</td>
       <td>{client.email}</td>
       <td>{client.phone}</td>
       <td><button className="btn btn-danger btn-sm" onClick={deleteClient}><FaTrash /></button></td>
   </tr>
  )
}

export default ClientRow
