import { useState } from 'react'
import '../styles/SortTasksButton.css'

export default function SortTasksButton({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [sortBy, setSortBy] = useState('id')
  const [order, setOrder] = useState('asc')

  const sortOptions = [
    { value: 'id', label: 'ID' },
    { value: 'title', label: 'Título (alfab.)' },
    { value: 'due_date', label: 'Fecha de expiración' },
    { value: 'createdAt', label: 'Fecha de creación' },
    { value: 'updatedAt', label: 'Última actualización' },
    { value: 'priority_id', label: 'Prioridad' },
    { value: 'assigned_to', label: 'Usuario asignado (id)' },
    { value: 'created_by', label: 'Usuario creador (id)' },
  ]

  const orderOptions = [
    { value: 'asc', label: '↑ Ascendente' },
    { value: 'desc', label: '↓ Descendente' },
  ]

  const handleSortBySelect = (value) => {
    setSortBy(value)
    if (order) {
      onSortChange({ sortBy: value, order })
    }
  }

  const handleOrderSelect = (value) => {
    setOrder(value)
    if (sortBy) {
      onSortChange({ sortBy, order: value })
    }
  }

  return (
    <div className="sort-tasks-container">
      <button
        className="sort-tasks-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        ↓↑ Ordenar tareas
      </button>

      {isOpen && (
        <div className="sort-tasks-dropdown">
          <div className="sort-section">
            <h3 className="sort-section-title">Ordenar por</h3>
            <ul className="sort-options-list">
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  className={`sort-option ${sortBy === option.value ? 'selected' : ''}`}
                  onClick={() => handleSortBySelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="sort-section">
            <h3 className="sort-section-title">Order</h3>
            <ul className="sort-options-list">
              {orderOptions.map((option) => (
                <li
                  key={option.value}
                  className={`sort-option ${order === option.value ? 'selected' : ''}`}
                  onClick={() => handleOrderSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

