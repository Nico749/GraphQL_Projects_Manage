import {FaEnvelope, FaPhone,FaIdBadge} from 'react-icons/fa'

function ClientInfo({client}) {
  return (
    <>
      <h5 className="mt-5">Client Info</h5>
      <ul className="list-group">
          <li className="li-group-item">
            <FaIdBadge className='icon' />{client.name}
          </li>
          <li className="li-group-item">
            <FaEnvelope className='icon' />{client.email}
          </li>
          <li className="li-group-item">
            <FaPhone className='icon' />{client.phone}
          </li>
      </ul>
    </>
  )
}

export default ClientInfo
