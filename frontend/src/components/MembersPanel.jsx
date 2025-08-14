import { useEffect, useState } from 'react'
import AddMembersModal from './AddMembersModal'
import Tooltip from './Tooltip'
import '../styles/MembersPanel.css'

export default function MembersPanel({ projectId, getMembers, userRole }) {
  const [members, setMembers] = useState([])
  const [renderModal, setRenderModal] = useState(false)

  useEffect(() => {
    async function fetchMembers(id) {
      const data = await getMembers(id)
      setMembers(data)
    }
    fetchMembers(projectId)
  }, [projectId, renderModal])

  const getInitials = (firstName = '', lastName = '') => {
    const f = firstName.charAt(0).toUpperCase()
    const l = lastName.charAt(0).toUpperCase()
    return f + l
  }

  const openModal = () => {
    setRenderModal(true)
  }

  const closeModal = () => {
    setRenderModal(false)
  }

  return (
    <div className='members-panel'>
      <div className='members-header'>
        <h2>Usuarios del proyecto</h2>
        {userRole.can_manage ?
          <button
            className='add-member-button'
            onClick={openModal}
          >
            + Agregar usuario
          </button> :
          <Tooltip message='No tenes permisos para realizar esta acción'>
            <button
              className='add-member-button-disabled'
            >
              + Agregar usuario
            </button>
          </Tooltip>
        }
      </div>

      <div className='members-list'>
        {members.map((member, i) => {
          const user = member.User
          const initials = getInitials(user.firstName, user.lastName)

          return (
            <div key={i} className='member-card'>
              <div className='member-avatar'>
                {initials}
              </div>
              <div className='member-info'>
                <p className='member-name'>
                  {user.firstName} {user.lastName}
                </p>
                <p className='member-email'>
                  {user.email}
                </p>
              </div>
              <span className='member-role'>
                {member.role.name}
              </span>
            </div>
          )
        })}
      </div>

      {renderModal &&
        <AddMembersModal projectId={projectId} handleClose={closeModal} />
      }
    </div>
  )
}
