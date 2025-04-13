import '../styles/Tooltip.css'

export default function Tooltip({ message, children }) {
  return (
    <div className='tooltip-container'>
      {children}
      <span className='tooltip-text'>{message}</span>
    </div>
  )
}