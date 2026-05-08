// Tipos base
export type OrderStatus = 'completed' | 'pending' | 'failed'
export type SortField = 'id' | 'product' | 'amount' | 'date'
export type SortDirection = 'asc' | 'desc'
export type UserRole = 'Gerente' | 'Operador'

export interface Order {
  id: string
  product: string
  status: OrderStatus
  amount: number
  date: string
  tenant: string
  lastActualization: string
  message: string
}

// Props
export interface OrderTableProps {
  orders: Order[]
}

export interface CardTabsProps {
  activeTab: OrderStatus
  onTabChange: (status: OrderStatus) => void
}

export interface OrderChartProps {
  activeTab: OrderStatus
}

export interface DashboardViewProps {
  activeTab: OrderStatus
  onTabChange: (status: OrderStatus) => void
}