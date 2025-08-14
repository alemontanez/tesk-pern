import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProject } from '../context/ProjectContext'
import Spinner from './Spinner'
import '../styles/AddMembersModal.css'

export default function AddMembersModal({ projectId, handleClose }) {

  const { searchUsers, addMember, errors, clearErrors } = useProject()
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(null)
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (errors.length > 0) {
      console.log('Error:', errors)
      alert('Error de permisos')
      clearErrors()
      navigate('/dashboard')
    } 
  }, [errors])

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

  if (errors.length === 0 ) return (
    <div className='members-modal'>
      <div className='members-modal-container'>

        {/* Sección principal del contenido */}
        <div className='modal-body'>
          <h3 className='modal-title'>Agregar usuario al equipo</h3>
          <p className='modal-subtitle'>Buscar y añadir miembros del equipo a este proyecto.</p>

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
                            {user.firstName} {user.lastName}
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
