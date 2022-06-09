import { useState } from "react"
import { FaList } from "react-icons/fa"
import { useMutation, useQuery } from "@apollo/client"
import {ADD_PROJECT} from '../mutations/projectMutations'
import {GET_PROJECTS} from '../queries/projectQueries'
import { GET_CLIENTS } from "../queries/clientQueries.js"


const AddProject = () => {
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [clientId,setClientId] = useState('')
    const [status,setStatus] = useState('new')//new because is a key of enum

    const [addProject] = useMutation(ADD_PROJECT,{variables:{name,description,clientId,status},
    refetchQueries:[{query:GET_PROJECTS}]})

//get client form select
const {loading,error,data} =useQuery(GET_CLIENTS)
    

    const onSubmit = (e) => {
    e.preventDefault();
      
    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

   addProject(name,description,status,clientId)

    setName('');
    setDescription('');
    setStatus('new')
    setClientId('')
  };

  if(loading) return null
  if (error) return 'Something went wrong'

  return (
      <>
      {!loading&&!error&&(<>
          {/* modal from bootstrap */}
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
              <div className="d-flex align-items-center">
                  <FaList className="icon" />
                  <div>Add Project</div>
              </div>
          </button>


          <div className="modal fade" id="addProjectModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Add Project</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <form >
                              <div className="mb-3">
                                  <label className=" form-label">Name</label>
                                  <input id="name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                  <label className=" form-label">Description</label>
                                  <textarea id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                              </div>
                              <div className="mb-3">
                                  <label className=" form-label">Status</label>
                                 <select  id="status" className="form-select" value={status}onChange={(e)=>setStatus(e.target.value)}>
                                     <option value='new'>Not Started</option>
                                     <option value='progress'>In progress</option>
                                     <option value='completed'>Completed</option>
                                 </select>
                              </div>

                              <div className="mb-3">
                              <label className=" form-label">Client</label>
                                 <select  id="clientId" className="form-select" value={clientId} onChange={(e)=>setClientId(e.target.value)}>
                                     {/* NOTE GETTING CLIENTS AND MAP THROUGH THEM AS OPTION */}
                                     <option value=''>Select Client</option>
                                     {data.clients.map((client)=>(<option key = {client.id} value ={client.id}>
                                         {client.name}
                                     </option>))}
                                 </select>  
                              </div>

                              {/* data-bs-dismiss make the modal disappear when we submit  */}
                              <button onClick={onSubmit} className="btn btn-primary" type="Submit" data-bs-dismiss="modal">Submit</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          </>)}
      </>
  )
}

export default AddProject
