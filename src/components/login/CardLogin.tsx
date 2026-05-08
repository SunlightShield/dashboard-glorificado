import { useState } from 'react'
import { toast } from 'react-toastify'
import 'animate.css'
import users from '../../data/user.json'
import type { CardLoginProps } from '../../types/CardLoginTypes'

function CardLogin({ onLogin }: CardLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [shaking, setShaking] = useState(false)

  function triggerShake() {
    setShaking(true)
    setTimeout(() => setShaking(false), 1000)
  }

  function handleLogin() {
    const match = users.find(
      (u) => u.username === username && u.password === password
    )

    if (match) {
      toast.success(`¡Bienvenido, ${match.name}!`)
      setTimeout(() => onLogin(match.name, match.role), 1500)
    } else {
      toast.error('Usuario o contraseña incorrectos.')
      triggerShake()
    }
  }

  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-10 flex flex-col gap-4 w-full max-w-sm ${shaking ? 'animate__animated animate__shakeX' : ''}`}>
      <div className="flex flex-col gap-1">
        <span className="text-amber-500 text-xs font-mono tracking-widest uppercase">
          Tu Dashboard de ordenes
        </span>
        <h1 className="text-white text-2xl font-bold">Midifakefy</h1>
        <p className="text-zinc-500 text-sm">Ingresa tus credenciales para continuar.</p>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-500 transition-colors"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      <button
        onClick={handleLogin}
        className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm rounded-lg px-4 py-2 transition-colors cursor-pointer"
      >
        Ingresar
      </button>
    </div>
  )
}

export default CardLogin