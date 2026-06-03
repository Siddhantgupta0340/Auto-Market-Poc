'use client'

import { 
  TrendingUp, TrendingDown, Users, DollarSign, Mail, 
  MessageSquare, Target, BarChart3 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/shared/breadcrumb'
import { analyticsRecords, analyticsStats } from '@/lib/data/analytics'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export default function AnalyticsPage() {
  const formatCurrency = (value: number = 0) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)
  }
  
  const last30Days = analyticsRecords.slice(-30)
  
  const revenueData = last30Days.map(record => ({
    date: record.date?.split('-').slice(1).join('/') || 'N/A',
    revenue: record.revenue || 0,
  }))
  
  const customerGrowthData = last30Days.map(record => ({
    date: record.date?.split('-').slice(1).join('/') || 'N/A',
    total: record.customers || 0,
    new: record.newCustomers || 0,
  }))
  
  const deliveryData = last30Days.map(record => ({
    date: record.date?.split('-').slice(1).join('/') || 'N/A',
    emails: record.emailsDelivered || 0,
    sms: record.smsDelivered || 0,
  }))
  
  const conversionData = last30Days.map(record => ({
    date: record.date?.split('-').slice(1).join('/') || 'N/A',
    conversions: record.conversions || 0,
    rate: record.conversionRate || 0,
  }))
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <Breadcrumb items={[{ label: 'Analytics' }]} className="mt-1" />
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(analyticsStats.totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12.5% vs last period</span>
                </div>
              </div>
              <div className="rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900">
                <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{analyticsStats.totalCustomers.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{analyticsStats.totalNewCustomers.toLocaleString()} new</span>
                </div>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Emails Delivered</p>
                <p className="text-2xl font-bold">{analyticsStats.totalEmailsDelivered.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+8.3% delivery rate</span>
                </div>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
                <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{analyticsStats.avgConversionRate}%</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+2.1% vs last period</span>
                </div>
              </div>
              <div className="rounded-lg bg-amber-100 p-3 dark:bg-amber-900">
                <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Revenue Trend (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total Customers" />
                <Line type="monotone" dataKey="new" stroke="#10b981" name="New Customers" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Message Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="emails" fill="#8b5cf6" name="Emails" />
                <Bar dataKey="sms" fill="#f59e0b" name="SMS" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={conversionData}>
                <defs>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#3b82f6" 
                  fillOpacity={1}
                  fill="url(#colorConversions)"
                  name="Conversions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
