import type {DashboardViewProps } from '../../types/OrderTypes'
import ComponenteResumen from './kpis/ComponenteResumen'
import CardTabs from './orders/CardTabs'
import OrderChart from './chart/OrderChart'

function DashboardOperador({ activeTab, onTabChange }: DashboardViewProps) {
  return (
    <>
      <ComponenteResumen />
      <CardTabs activeTab={activeTab} onTabChange={onTabChange} />
      <OrderChart activeTab={activeTab} />
    </>
  )
}

export default DashboardOperador