'use client'

import { useState } from 'react'
import { 
  Download, FileText, Calendar, Filter, BarChart3, 
  Users, DollarSign, Megaphone, TrendingUp 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Breadcrumb } from '@/components/shared/breadcrumb'
import { ExportMenu } from '@/components/shared/export-menu'
import { customerStats } from '@/lib/data/customers'
import { campaignStats } from '@/lib/data/campaigns'
import { leadStats } from '@/lib/data/leads'
import { analyticsStats } from '@/lib/data/analytics'

const reportTypes = [
  {
    id: 'customer',
    name: 'Customer Report',
    description: 'Detailed analysis of customer data, segments, and lifetime value',
    icon: Users,
    color: 'blue',
    metrics: [
      { label: 'Total Customers', value: customerStats.total.toLocaleString() },
      { label: 'Active Customers', value: customerStats.active.toLocaleString() },
      { label: 'Avg Lifetime Value', value: `$${customerStats.avgLifetimeValue.toLocaleString()}` },
      { label: 'Total Revenue', value: `$${customerStats.totalRevenue.toLocaleString()}` },
    ],
  },
  {
    id: 'campaign',
    name: 'Campaign Report',
    description: 'Performance metrics for all marketing campaigns',
    icon: Megaphone,
    color: 'purple',
    metrics: [
      { label: 'Total Campaigns', value: campaignStats.total.toLocaleString() },
      { label: 'Avg Open Rate', value: `${campaignStats.avgOpenRate}%` },
      { label: 'Avg Click Rate', value: `${campaignStats.avgClickRate}%` },
      { label: 'Total Revenue', value: `$${campaignStats.totalRevenue.toLocaleString()}` },
    ],
  },
  {
    id: 'revenue',
    name: 'Revenue Report',
    description: 'Financial performance and revenue analytics',
    icon: DollarSign,
    color: 'green',
    metrics: [
      { label: 'Total Revenue', value: `$${analyticsStats.totalRevenue.toLocaleString()}` },
      // { label: 'Total Conversions', value: analyticsStats.totalConversions.toLocaleString() },
      { label: 'Avg Conversion Rate', value: `${analyticsStats.avgConversionRate}%` },
      // { label: 'Campaigns Sent', value: analyticsStats.totalCampaignsSent.toLocaleString() },
    ],
  },
  {
    id: 'lead',
    name: 'Lead Report',
    description: 'Lead generation and conversion funnel analysis',
    icon: TrendingUp,
    color: 'orange',
    metrics: [
      { label: 'Total Leads', value: leadStats.total.toLocaleString() },
      { label: 'Qualified Leads', value: leadStats.qualified.toLocaleString() },
      { label: 'Won Deals', value: leadStats.won.toLocaleString() },
      { label: 'Conversion Rate', value: `${leadStats.conversionRate}%` },
    ],
  },
]

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
  green: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('last30')
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <Breadcrumb items={[{ label: 'Reports' }]} className="mt-1" />
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 Days</SelectItem>
              <SelectItem value="last30">Last 30 Days</SelectItem>
              <SelectItem value="last90">Last 90 Days</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Report Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportTypes.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${colorClasses[report.color as keyof typeof colorClasses]}`}>
                    <report.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {report.metrics.map((metric, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-lg font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <ExportMenu
                  onExportCSV={() => console.log(`Export ${report.id} CSV`)}
                  onExportExcel={() => console.log(`Export ${report.id} Excel`)}
                  onExportPDF={() => console.log(`Export ${report.id} PDF`)}
                />
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Quick Export Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Export</CardTitle>
          <CardDescription>Download pre-configured reports instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Executive Summary
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Monthly Performance
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Customer Insights
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Campaign ROI
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Lead Pipeline
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Revenue Breakdown
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
