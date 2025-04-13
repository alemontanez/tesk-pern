import { Link } from 'react-router-dom'
import BoardCard from './BoardCard'
import Spinner from './Spinner'
import Tooltip from './Tooltip'
import '../styles/ProjectPage.css'

const BoardsPanel = ({ boards, loading, projectId, onSearch, userRole }) => {
  return (
    <>
      {/* Acciones: Búsqueda y botón para crear nuevo board */}
      <div className='project-actions'>
        <input
          type='text'
          placeholder='Buscar tableros...'
          className='search-boards'
          onChange={onSearch}
        />

        {userRole.can_manage ?
          <Link
            className='new-board-button'
            to={`/dashboard/projects/${projectId}/create-board`}
          >
            + Crear Tablero
          </Link> :
          <Tooltip message='No tenes permisos para realizar esta acción'>
            <button
              className='new-board-button-disabled'
            >
              + Crear Tablero
            </button>
          </Tooltip>
        }
      </div>

      {/* Contenedor de tableros en forma de grid */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {boards.length > 0 ? (
            <div className='boards-container'>
              {boards.map(board => (
                <BoardCard
                  key={board.id}
                  projectId={projectId}
                  board={board}
                />
              ))}
              <div className='create-board-card'>
                <div className='plus-icon'>+</div>
                <p className='create-board-text'>Crear un nuevo tablero</p>
                <span className='create-board-subtext'>
                  Añade un nuevo tablero para organizar tus tareas
                </span>
              </div>
            </div>
          ) : (
            <div className='boards-not-found'>
              No se encontraron tableros que coincidan con la búsqueda.
            </div>
          )}
        </>
      )}
    </>
  )
}

export default BoardsPanel