'use client'

import { Download, FileText, Mail, MessageSquare, Smartphone, Bell, TrendingUp, DollarSign } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { campaigns } from '@/lib/data/campaigns'
import { KPICard } from '@/components/shared/kpi-card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const channelStats = [
  { name: 'Email', sent: 125000, delivered: 118750, opened: 35625, clicked: 11875, revenue: 45000 },
  { name: 'SMS', sent: 45000, delivered: 44100, opened: 44100, clicked: 8820, revenue: 22000 },
  { name: 'WhatsApp', sent: 28000, delivered: 27440, opened: 21952, clicked: 6586, revenue: 18500 },
  { name: 'Push', sent: 85000, delivered: 76500, opened: 30600, clicked: 7650, revenue: 12000 },
]

const channelColors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B']

const revenueByChannel = channelStats.map((c, i) => ({
  name: c.name,
  value: c.revenue,
  color: channelColors[i]
}))

export default function CampaignReportsPage() {
  const totalSent = channelStats.reduce((acc, c) => acc + c.sent, 0)
  const totalRevenue = channelStats.reduce((acc, c) => acc + c.revenue, 0)
  const avgOpenRate = channelStats.reduce((acc, c) => acc + (c.opened / c.delivered) * 100, 0) / channelStats.length
  const avgClickRate = channelStats.reduce((acc, c) => acc + (c.clicked / c.opened) * 100, 0) / channelStats.length

  return (
    <DashboardLayout workspace="campaign">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaign Reports</h1>
            <p className="text-muted-foreground">Analyze your campaign performance across all channels</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="30">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Messages"
            value={totalSent.toLocaleString()}
            change={12.5}
            changeType="increase"
            icon={Mail}
          />
          <KPICard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change={18.2}
            changeType="increase"
            icon={DollarSign}
          />
          <KPICard
            title="Avg Open Rate"
            value={`${avgOpenRate.toFixed(1)}%`}
            change={2.3}
            changeType="increase"
            icon={TrendingUp}
          />
          <KPICard
            title="Avg Click Rate"
            value={`${avgClickRate.toFixed(1)}%`}
            change={1.8}
            changeType="increase"
            icon={TrendingUp}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <CardDescription>Messages sent and engagement by channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelStats}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="sent" fill="#E5E7EB" name="Sent" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="delivered" fill="#10B981" name="Delivered" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="opened" fill="#3B82F6" name="Opened" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="clicked" fill="#8B5CF6" name="Clicked" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Channel</CardTitle>
              <CardDescription>Revenue distribution across channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueByChannel}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {revenueByChannel.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Channel Metrics Summary</CardTitle>
            <CardDescription>Detailed performance metrics by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Delivered</TableHead>
                  <TableHead>Delivery Rate</TableHead>
                  <TableHead>Opened</TableHead>
                  <TableHead>Open Rate</TableHead>
                  <TableHead>Clicked</TableHead>
                  <TableHead>Click Rate</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channelStats.map((channel, index) => (
                  <TableRow key={channel.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: channelColors[index] }} />
                        <span className="font-medium">{channel.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{channel.sent.toLocaleString()}</TableCell>
                    <TableCell>{channel.delivered.toLocaleString()}</TableCell>
                    <TableCell>{((channel.delivered / channel.sent) * 100).toFixed(1)}%</TableCell>
                    <TableCell>{channel.opened.toLocaleString()}</TableCell>
                    <TableCell>{((channel.opened / channel.delivered) * 100).toFixed(1)}%</TableCell>
                    <TableCell>{channel.clicked.toLocaleString()}</TableCell>
                    <TableCell>{((channel.clicked / channel.opened) * 100).toFixed(1)}%</TableCell>
                    <TableCell className="font-medium">${channel.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
