export interface HeaderProps {
  name: string
  role: string
  countdown: number
  onRefresh: () => void
  onLogout: () => void
}