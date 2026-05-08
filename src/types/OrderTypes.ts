// Tipos base
export type OrderStatus = 'completed' | 'pending' | 'failed'
export type SortField = 'id' | 'product' | 'amount' | 'date'
export type SortDirection = 'asc' | 'desc'

// Modelos
export interface Order {
  id: string
  product: string
  status: OrderStatus  // ← usa el tipo en vez de repetirlo
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