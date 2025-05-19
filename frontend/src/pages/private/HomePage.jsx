import { toast } from 'sonner'

export default function HomePage() {
  return (
    <>
      <div>HomePage</div>
      <div>
        <button onClick={() =>
          toast.success('Tarea creada con éxito')
        }>
          Give me a toast
        </button>
      </div>
    </>
  )
}
