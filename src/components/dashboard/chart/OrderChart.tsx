import { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import orders from '../../../data/orders.json'
import type { Order, OrderChartProps } from '../../../types/OrderTypes'

const data = orders as Order[]

const monthLabels: Record<string, string> = {
  '01': 'Ene', '02': 'Feb', '03': 'Mar',
  '04': 'Abr', '05': 'May', '06': 'Jun',
  '07': 'Jul', '08': 'Ago', '09': 'Sep',
  '10': 'Oct', '11': 'Nov', '12': 'Dic',
}

const tabColors: Record<string, string> = {
  completed: '#34d399',
  pending: '#fbbf24',
  failed: '#f87171',
}

function OrderChart({ activeTab }: OrderChartProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filtered = data.filter((o) => o.status === activeTab)

  const countsByMonth: Record<string, number> = {}
  filtered.forEach((o: Order) => {
    const month = o.date.slice(5, 7)
    countsByMonth[month] = (countsByMonth[month] || 0) + 1
  })

  const sortedMonths = Object.keys(countsByMonth).sort()
  const xAxis = sortedMonths.map((m) => monthLabels[m] ?? m)
  const series = sortedMonths.map((m) => countsByMonth[m])

  const option = {
    backgroundColor: 'transparent',
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: xAxis,
      axisLine: { lineStyle: { color: '#3f3f46' } },
      axisLabel: { color: '#71717a', fontFamily: 'monospace' },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { lineStyle: { color: '#3f3f46' } },
      axisLabel: { color: '#71717a', fontFamily: 'monospace' },
      splitLine: { lineStyle: { color: '#27272a' } },
    },
    series: [
      {
        type: 'bar',
        data: series,
        itemStyle: {
          color: tabColors[activeTab],
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#18181b',
      borderColor: '#3f3f46',
      textStyle: { color: '#e4e4e7' },
    },
  }

  return (
    <SkeletonTheme baseColor="#27272a" highlightColor="#3f3f46">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
        <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
          Órdenes por mes —{' '}
          <span style={{ color: tabColors[activeTab] }}>
            {activeTab === 'completed' ? 'Completadas' : activeTab === 'pending' ? 'Pendientes' : 'Fallidas'}
          </span>
        </span>
        {loading
          ? <Skeleton height={280} borderRadius={8} />
          : <ReactECharts option={option} style={{ height: '280px' }} />
        }
      </div>
    </SkeletonTheme>
  )
}

export default OrderChart