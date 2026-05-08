import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import DashboardGerente from './DashboardGerente'
import DashboardOperador from './DashboardOperador'
import type { DashboardProps } from '../../types/DashboardTypes'
import type { OrderStatus, UserRole } from '../../types/OrderTypes'

const REFRESH_SECONDS = 5 * 60

function Dashboard({ name, role, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<OrderStatus>('completed')
  const [refreshKey, setRefreshKey] = useState(0)
  const [countdown, setCountdown] = useState(REFRESH_SECONDS)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setRefreshKey((k) => k + 1)
          return REFRESH_SECONDS
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function handleRefresh() {
    setRefreshKey((k) => k + 1)
    setCountdown(REFRESH_SECONDS)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header name={name} role={role} countdown={countdown} onRefresh={handleRefresh} onLogout={onLogout} />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
        {role === 'Gerente'
          ? <DashboardGerente key={refreshKey} activeTab={activeTab} onTabChange={setActiveTab} />
          : <DashboardOperador key={refreshKey} activeTab={activeTab} onTabChange={setActiveTab} />
        }
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard