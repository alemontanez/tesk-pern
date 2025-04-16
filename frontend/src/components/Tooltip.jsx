import '../styles/Tooltip.css'

export default function Tooltip({ message='Te faltan permisos para realizar esta acción', children }) {
  return (
    <div className='tooltip-container'>
      {children}
      <span className='tooltip-text'>{message}</span>
    </div>
  )
}