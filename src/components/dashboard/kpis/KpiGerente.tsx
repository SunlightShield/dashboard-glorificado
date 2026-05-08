import { useState, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import orders from '../../../data/orders.json'
import type { Order } from '../../../types/OrderTypes'

const data = orders as Order[]

const cards = [
  {
    label: 'Total completado',
    status: 'completed',
    color: 'text-emerald-400',
    border: 'border-emerald-400/20',
    bg: 'bg-emerald-400/5',
  },
  {
    label: 'Total pendiente',
    status: 'pending',
    color: 'text-amber-400',
    border: 'border-amber-400/20',
    bg: 'bg-amber-400/5',
  },
  {
    label: 'Total fallido',
    status: 'failed',
    color: 'text-red-400',
    border: 'border-red-400/20',
    bg: 'bg-red-400/5',
  },
]

function KpiGerente() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SkeletonTheme baseColor="#27272a" highlightColor="#3f3f46">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
        {cards.map((card) => {
          const total = data
            .filter((o) => o.status === card.status)
            .reduce((sum, o) => sum + o.amount, 0)

          return (
            <div
              key={card.status}
              className={`${card.bg} border ${card.border} rounded-xl p-6 flex flex-col gap-2 items-center sm:items-start`}
            >
              <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
                {loading ? <Skeleton width={120} /> : card.label}
              </span>
              <span className={`${card.color} text-3xl font-bold`}>
                {loading ? <Skeleton width={160} height={36} /> : `$${total.toLocaleString('es-CL')}`}
              </span>
            </div>
          )
        })}
      </div>
    </SkeletonTheme>
  )
}

export default KpiGerente