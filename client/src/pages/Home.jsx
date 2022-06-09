import AddClient from "../components/AddClient"
import Projects from "../components/Projects"
import Clients from "../components/Clients"
import AddProject from "../components/AddProject"

function Home() {
  return (
    <>
    <div className="d-flex gap-3 mb-4">
       <AddClient />
       <AddProject />
   </div>    
          <Projects />
          <hr />
          <Clients />
    
    </>
  )
}

export default Home
