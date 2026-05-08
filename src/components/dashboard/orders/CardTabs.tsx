import { useState, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import orders from '../../../data/orders.json'
import OrderTable from './OrderTable'
import * as XLSX from 'xlsx'
import type { Order, OrderStatus, CardTabsProps } from '../../../types/OrderTypes'

const data = orders as Order[]

const tabs: { label: string; status: OrderStatus }[] = [
  { label: 'Completadas', status: 'completed' },
  { label: 'Pendientes', status: 'pending' },
  { label: 'Fallidas', status: 'failed' },
]

function CardTabs({ activeTab, onTabChange }: CardTabsProps) {
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredOrders = data
    .filter((o) => o.status === activeTab)
    .filter((o) => {
      const query = search.toLowerCase()
      return (
        o.id.toLowerCase().includes(query) ||
        o.product.toLowerCase().includes(query) ||
        o.tenant.toLowerCase().includes(query)
      )
    })
    .filter((o) => {
      if (dateFrom && o.date < dateFrom) return false
      if (dateTo && o.date > dateTo) return false
      return true
    })

  function handleExport() {
    const exportData = filteredOrders.map((o) => ({
      ID: o.id,
      Producto: o.product,
      Tenant: o.tenant,
      Monto: o.amount,
      Estado: o.status,
      Fecha: o.date,
      'Última actualización': o.lastActualization,
      Mensaje: o.message,
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Órdenes')
    XLSX.writeFile(workbook, `ordenes-${activeTab}-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  return (
    <SkeletonTheme baseColor="#27272a" highlightColor="#3f3f46">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800">

          {/* Móvil — select */}
          <select
            value={activeTab}
            onChange={(e) => onTabChange(e.target.value as OrderStatus)}
            className="sm:hidden bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-zinc-300 outline-none focus:border-amber-500 transition-colors mx-4 my-3"
          >
            {tabs.map((tab) => (
              <option key={tab.status} value={tab.status}>
                {tab.label}
              </option>
            ))}
          </select>

          {/* Desktop — tabs */}
          <div className="hidden sm:flex">
            {tabs.map((tab) => (
              <button
                key={tab.status}
                onClick={() => onTabChange(tab.status)}
                className={`px-4 py-3 sm:px-6 text-sm font-mono tracking-wide transition-colors cursor-pointer
                  ${activeTab === tab.status
                    ? 'text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filtros */}
<div className="flex flex-wrap gap-2 px-4 pb-3 sm:flex-nowrap sm:items-center sm:pb-0 overflow-hidden">
  <input
    type="text"
    placeholder="Buscar por ID, producto o tenant..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-1.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-500 transition-colors w-full sm:w-64"
  />
  <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
    <input
      type="date"
      value={dateFrom}
      onChange={(e) => setDateFrom(e.target.value)}
      className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-amber-500 transition-colors flex-1 min-w-0"
    />
    <span className="text-zinc-600 text-xs font-mono shrink-0">—</span>
    <input
      type="date"
      value={dateTo}
      onChange={(e) => setDateTo(e.target.value)}
      className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-amber-500 transition-colors flex-1 min-w-0"
    />
  </div>
</div>

        </div>

        {loading ? (
          <div className="p-6 flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} height={36} borderRadius={8} />
            ))}
          </div>
        ) : (
          <OrderTable orders={filteredOrders} />
        )}

        <div className="flex justify-end px-6 py-3 border-t border-zinc-800">
          <button
            onClick={handleExport}
            className="bg-zinc-800 hover:bg-emerald-500/10 border border-zinc-700 hover:border-emerald-500/50 text-zinc-400 hover:text-emerald-400 text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            ↓ Exportar Excel
          </button>
        </div>

      </div>
    </SkeletonTheme>
  )
}

export default CardTabs