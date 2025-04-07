import { useEffect, useState } from 'react'
import { useProject } from '../context/ProjectContext'
import Spinner from './Spinner'
import '../styles/AddMembersModal.css'

export default function AddMembersModal({ projectId, handleClose }) {

  const { searchUsers, addMember } = useProject()
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(null)
  const [users, setUsers] = useState([])

  const handleSearch = (e) => {
    const query = e.target.value.trim()
    setLoading(true)
    if (timer) clearTimeout(timer)

    const newTimer = setTimeout(async () => {
      const res = await searchUsers(projectId, query)
      setUsers(res)
      setLoading(false)
    }, 1000)
    setTimer(newTimer)
  }

  const handleAdd = async (projectId, memberId) => {
    await addMember(projectId, memberId)
    setTimeout(() => {
      handleClose()
    }, 100)
  }

  useEffect(() => {
    async function getUsers(projectId) {
      setLoading(true)
      const users = await searchUsers(projectId, '')
      setUsers(users)
      setLoading(false)
    }
    getUsers(projectId)
  }, [])

  return (
    <div className='members-modal'>
      <div className='members-modal-container'>

        {/* Sección principal del contenido */}
        <div className='modal-body'>
          <h3 className='modal-title'>Add Members Modal</h3>
          <p className='modal-subtitle'>Search and add team members to this project.</p>

          <input
            type='text'
            placeholder='Busca usuarios por email...'
            className='search-users'
            onChange={handleSearch}
          />

          <div className='users-container'>
            {loading
              ? <Spinner />
              : (
                <>
                  {users.length === 0
                    ? <div className='users-not-found'>El usuario ingresado ya pertenece al proyecto o no existen coincidencias.</div>
                    : users.map((user, i) => (
                      <div key={i} className='search-result'>
                        <div className='search-user-info'>
                          <p className='search-user-name'>
                            {user.first_name} {user.last_name}
                          </p>
                          <p className='search-user-email'>
                            {user.email}
                          </p>
                        </div>
                        <button className='add-user-button' onClick={() => handleAdd(projectId, user.id)}>+ Agregar</button>
                      </div>
                    ))
                  }
                </>
              )
            }
          </div>
        </div>

        {/* Footer con botón de cierre */}
        <div className='modal-footer'>
          <button className='close-button' onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
