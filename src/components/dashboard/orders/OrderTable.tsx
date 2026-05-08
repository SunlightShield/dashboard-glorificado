import { useState } from 'react'
import type { OrderTableProps, SortField, SortDirection } from '../../../types/OrderTypes'

const statusStyles: Record<string, string> = {
  completed: 'text-emerald-400 bg-emerald-400/10',
  pending: 'text-amber-400 bg-amber-400/10',
  failed: 'text-red-400 bg-red-400/10',
}

const statusLabel: Record<string, string> = {
  completed: 'Completada',
  pending: 'Pendiente',
  failed: 'Fallida',
}

const columns: { label: string; field: SortField }[] = [
  { label: 'ID', field: 'id' },
  { label: 'Producto', field: 'product' },
  { label: 'Monto', field: 'amount' },
  { label: 'Fecha', field: 'date' },
]

function OrderTable({ orders }: OrderTableProps) {
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDir, setSortDir] = useState<SortDirection>('desc')

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const sorted = [...orders].sort((a, b) => {
    const valA = a[sortField]
    const valB = b[sortField]
    if (valA < valB) return sortDir === 'asc' ? -1 : 1
    if (valA > valB) return sortDir === 'asc' ? 1 : -1
    return 0
  })

    if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <span className="text-4xl">🗂️</span>
        <p className="text-zinc-400 text-sm font-mono">No se encontraron órdenes.</p>
        <p className="text-zinc-600 text-xs">Intenta ajustar los filtros de búsqueda.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-zinc-500 text-xs font-mono uppercase tracking-widest border-b border-zinc-800">
            {columns.map((col) => (
              <th
                key={col.field}
                onClick={() => handleSort(col.field)}
                className="text-left px-6 py-3 cursor-pointer hover:text-amber-400 transition-colors select-none"
              >
                {col.label}{' '}
                {sortField === col.field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
              </th>
            ))}
            <th className="text-left px-6 py-3">Estado</th>
            <th className="text-left px-6 py-3">Tenant</th>
            <th className="text-left px-6 py-3">Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((order) => (
            <tr key={order.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
              <td className="px-6 py-4 font-mono text-zinc-400">{order.id}</td>
              <td className="px-6 py-4 text-white">{order.product}</td>
              <td className="px-6 py-4 text-zinc-300">${order.amount.toLocaleString('es-CL')}</td>
              <td className="px-6 py-4 text-zinc-400 font-mono">{order.date}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-mono ${statusStyles[order.status]}`}>
                  {statusLabel[order.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-zinc-400">{order.tenant}</td>
              <td className="px-6 py-4 text-zinc-500 text-xs">{order.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable