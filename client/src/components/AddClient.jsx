import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../mutations/clientMutation"
import { GET_CLIENTS } from "../queries/clientQueries"

const AddClient = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')

    const [addClient] = useMutation(ADD_CLIENT,{
        variables:{name,email,phone},
        //to have the data updated without need to refresh the page we refetch the get_clients query
        refetchQueries:[{query:GET_CLIENTS}]
        //alternative way using cache
        // update(cache, { data: { addClient } }) {
        //     const { clients } = cache.readQuery({ query: GET_CLIENTS });
      
        //     cache.writeQuery({
        //       query: GET_CLIENTS,
        //       data: { clients: [...clients, addClient] },
        //     });
        //   },            
    })

    const onSubmit = (e) => {
    e.preventDefault();
      
    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }

    addClient(name, email, phone);

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
      <>
          {/* modal from bootstrap */}
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
              <div className="d-flex align-items-center">
                  <FaUser className="icon" />
                  <div>Add User</div>
              </div>
          </button>


          <div className="modal fade" id="addClientModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Add Client</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <form >
                              <div className="mb-3">
                                  <label className=" form-label">Name</label>
                                  <input id="name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                  <label className=" form-label">Email</label>
                                  <input id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                  <label className=" form-label">Phone</label>
                                  <input id="phone" type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                              </div>

                              {/* data-bs-dismiss make the modal disappear when we submit  */}
                              <button onClick={onSubmit} className="btn btn-secondary" type="Submit" data-bs-dismiss="modal">Submit</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default AddClient
