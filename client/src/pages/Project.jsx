import { Link,useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import ClientInfo from "../components/ClientInfo"
import DeleteButton from "../components/DeleteButton"
import EditProject from "../components/EditProject"


const Project = () => {
    //get the id from the url
    const {id} =useParams()
    const {loading,error,data} = useQuery(GET_PROJECT,
        {variables:{id}})

    if(loading) return null
    if(error) return <p>Something went wrong...</p>

  return (
    <>
      {!loading &&!error&&(
          <div className="mx-auto w-75 card p-5">
              <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
                Back
              </Link>
              <h1>
                  {data.project.name}
              </h1>
              <p>{data.project.description}</p>
              <h5 className="mt-3">Project Status: {data.project.status}</h5>
              <ClientInfo client={data.project.client}/>
              <EditProject project={data.project} />
              <DeleteButton projectId={data.project.id} />
          </div>
      )}
    </>
  )
}

export default Project
