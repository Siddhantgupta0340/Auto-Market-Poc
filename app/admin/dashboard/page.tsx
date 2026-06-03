'use client'

import { 
  Users, Target, UserPlus, Megaphone, TrendingUp, DollarSign, 
  Mail, MessageSquare, ArrowUpRight, ArrowDownRight 
} from 'lucide-react'
import { KPICard } from '@/components/shared/kpi-card'
import { Breadcrumb } from '@/components/shared/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { customerStats } from '@/lib/data/customers'
import { campaignStats } from '@/lib/data/campaigns'
import { leadStats } from '@/lib/data/leads'
import { analyticsStats } from '@/lib/data/analytics'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 125000 },
  { month: 'Feb', revenue: 148000 },
  { month: 'Mar', revenue: 162000 },
  { month: 'Apr', revenue: 178000 },
  { month: 'May', revenue: 195000 },
  { month: 'Jun', revenue: 215000 },
]

const campaignPerformance = [
  { name: 'Email', sent: 45000, opened: 18000, clicked: 5400 },
  { name: 'SMS', sent: 28000, opened: 22400, clicked: 8960 },
  { name: 'WhatsApp', sent: 15000, opened: 13500, clicked: 6750 },
  { name: 'Push', sent: 35000, opened: 14000, clicked: 4200 },
]

const customerSegments = [
  { name: 'Active', value: customerStats.active, color: '#10b981' },
  { name: 'Inactive', value: customerStats.inactive, color: '#6b7280' },
  { name: 'Leads', value: customerStats.leads, color: '#3b82f6' },
  { name: 'Prospects', value: customerStats.prospects, color: '#f59e0b' },
  { name: 'Churned', value: customerStats.churned, color: '#ef4444' },
]

const recentActivity = [
  { action: 'New customer signup', user: 'John Smith', time: '2 minutes ago', type: 'customer' },
  { action: 'Campaign launched', user: 'Sarah Johnson', time: '15 minutes ago', type: 'campaign' },
  { action: 'Segment created', user: 'Michael Chen', time: '1 hour ago', type: 'segment' },
  { action: 'Lead converted', user: 'Emily Rodriguez', time: '2 hours ago', type: 'lead' },
  { action: 'Report exported', user: 'David Kim', time: '3 hours ago', type: 'report' },
]

export default function AdminDashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
  
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <Breadcrumb items={[{ label: 'Dashboard' }]} className="mt-1" />
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Customers"
          value={formatNumber(customerStats.total)}
          change={12.5}
          trend="up"
          icon={Users}
        />
        <KPICard
          title="Total Revenue"
          value={formatCurrency(analyticsStats.totalRevenue)}
          change={8.2}
          trend="up"
          icon={DollarSign}
        />
        <KPICard
          title="Active Campaigns"
          value={formatNumber(campaignStats.running)}
          change={-3.1}
          trend="down"
          icon={Megaphone}
        />
        <KPICard
          title="Conversion Rate"
          value={`${analyticsStats.avgConversionRate}%`}
          change={2.4}
          trend="up"
          icon={TrendingUp}
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis 
                  className="text-xs" 
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Campaign Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Campaign Performance by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignPerformance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sent" fill="#3b82f6" name="Sent" />
                <Bar dataKey="opened" fill="#10b981" name="Opened" />
                <Bar dataKey="clicked" fill="#f59e0b" name="Clicked" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer Segments Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {customerSegments.map((segment) => (
                <div key={segment.name} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-xs text-muted-foreground">{segment.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Total Segments</span>
              </div>
              <span className="font-semibold">{formatNumber(50)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-green-500" />
                <span className="text-sm">Total Leads</span>
              </div>
              <span className="font-semibold">{formatNumber(leadStats.total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Emails Delivered</span>
              </div>
              <span className="font-semibold">{formatNumber(analyticsStats.totalEmailsDelivered)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-orange-500" />
                <span className="text-sm">SMS Delivered</span>
              </div>
              <span className="font-semibold">{formatNumber(analyticsStats.totalSmsDelivered)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">Total Conversions</span>
              </div>
              <span className="font-semibold">{formatNumber(analyticsStats.totalConversions)}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    activity.type === 'customer' ? 'bg-green-500' :
                    activity.type === 'campaign' ? 'bg-blue-500' :
                    activity.type === 'segment' ? 'bg-purple-500' :
                    activity.type === 'lead' ? 'bg-orange-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
