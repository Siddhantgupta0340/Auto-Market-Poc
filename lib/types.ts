// Core Types for AutoMarket Platform

export type CustomerStatus = 'active' | 'inactive' | 'lead' | 'prospect' | 'churned'
export type LeadSource = 'organic' | 'paid_ads' | 'referral' | 'social_media' | 'email' | 'direct' | 'partner'
export type CampaignStatus = 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'archived'
export type CampaignType = 'email' | 'sms' | 'whatsapp' | 'push' | 'multichannel'
export type SegmentType = 'dynamic' | 'static' | 'smart'
export type WorkflowStatus = 'active' | 'inactive' | 'draft'

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  state: string
  country: string
  leadSource: LeadSource
  status: CustomerStatus
  segment: string
  lifetimeValue: number
  lastActivity: string
  signupDate: string
  campaignCount: number
  revenueGenerated: number
  tags: string[]
  avatar?: string
}

export interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  subject?: string
  content?: string
  audience: string
  audienceSize: number
  sent: number
  delivered: number
  opened: number
  clicked: number
  converted: number
  revenue: number
  createdAt: string
  scheduledAt?: string
  completedAt?: string
  createdBy: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  source: LeadSource
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  score: number
  value: number
  assignedTo: string
  createdAt: string
  lastContactAt: string
  notes: string
}

export interface Segment {
  id: string
  name: string
  description: string
  type: SegmentType
  rules: SegmentRule[]
  customerCount: number
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface SegmentRule {
  field: string
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in'
  value: string | number | string[]
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  previewText: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
  usageCount: number
}

export interface SmsTemplate {
  id: string
  name: string
  content: string
  category: string
  characterCount: number
  createdAt: string
  usageCount: number
}

export interface WhatsAppTemplate {
  id: string
  name: string
  content: string
  category: string
  status: 'approved' | 'pending' | 'rejected'
  createdAt: string
  usageCount: number
}

export interface Workflow {
  id: string
  name: string
  description: string
  status: WorkflowStatus
  trigger: string
  nodes: WorkflowNode[]
  enrolledCount: number
  completedCount: number
  conversionRate: number
  createdAt: string
  updatedAt: string
}

export interface WorkflowNode {
  id: string
  type: 'trigger' | 'email' | 'sms' | 'whatsapp' | 'delay' | 'condition' | 'action'
  config: Record<string, unknown>
  position: { x: number; y: number }
}

export interface AnalyticsRecord {
  id: string
  date: string
  customers: number
  newCustomers: number
  revenue: number
  campaignsSent: number
  emailsDelivered: number
  smsDelivered: number
  conversions: number
  conversionRate: number
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'marketer' | 'campaign_manager' | 'analyst' | 'viewer'
  avatar?: string
  lastLogin: string
  createdAt: string
  status: 'active' | 'inactive'
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  resourceId: string
  details: string
  ipAddress: string
  timestamp: string
}

export interface KPIData {
  label: string
  value: number | string
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  icon?: string
}

export interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

export type Workspace = 'admin' | 'marketer' | 'campaign' | 'analytics'
