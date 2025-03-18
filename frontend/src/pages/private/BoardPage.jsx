import { useParams } from 'react-router-dom'

export default function BoardPage() {

  const { boardId } = useParams()
  
  return (
    <div>BoardPage - Id: {boardId}</div>
  )
}
