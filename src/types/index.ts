export type AgentStatus = 'recruit' | 'assess' | 'bench' | 'deployed'

export interface NavItem {
  id: string
  label: string
  icon: string
  badge?: number
  showWhen?: AgentStatus[]
}

export interface NavGroup {
  group: string
  items: NavItem[]
}

export interface Course {
  cat: string
  title: string
  mins: number
  lessons: number
  progress: number
  level: string
  roleplay?: boolean
}

export interface Assessment {
  cat: string
  title: string
  mins: number
  tags: string[]
  level: string
  score: number | null
}

export interface Opportunity {
  client: string
  role: string
  channel: string
  schedule: string
  pay: string
  expires: string
  status: 'new' | 'pending'
  fit: number
  why: string[]
  brief: string
}

export interface RemoteSetupItem {
  id: string
  label: string
  desc: string
  icon: string
}

export interface RemoteSetupState {
  [itemId: string]: {
    uploaded: boolean
    verdict?: 'satisfactory' | 'needs-fix' | 'pending'
    reviewer?: string
    when?: string
    note?: string
  }
}
