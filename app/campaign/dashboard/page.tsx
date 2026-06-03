'use client'

import { Mail, MessageSquare, Smartphone, Bell, Calendar, TrendingUp, Target, Clock, Play, Pause } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { KPICard } from '@/components/shared/kpi-card'
import { campaigns } from '@/lib/data/campaigns'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const campaignStats = {
  email: campaigns.filter(c => c.type === 'email'),
  sms: campaigns.filter(c => c.type === 'sms'),
  whatsapp: campaigns.filter(c => c.type === 'whatsapp'),
  push: campaigns.filter(c => c.type === 'push'),
}

const weeklyPerformance = [
  { day: 'Mon', email: 12500, sms: 4500, whatsapp: 2800, push: 8500 },
  { day: 'Tue', email: 15000, sms: 5200, whatsapp: 3200, push: 9200 },
  { day: 'Wed', email: 11000, sms: 3800, whatsapp: 2500, push: 7800 },
  { day: 'Thu', email: 18000, sms: 6100, whatsapp: 3800, push: 10500 },
  { day: 'Fri', email: 14000, sms: 4800, whatsapp: 3000, push: 9000 },
  { day: 'Sat', email: 8000, sms: 2500, whatsapp: 1500, push: 5500 },
  { day: 'Sun', email: 6000, sms: 2000, whatsapp: 1200, push: 4000 },
]

const recentCampaigns = campaigns.slice(0, 6)

export default function CampaignDashboard() {
  const totalSent = campaigns.reduce((acc, c) => acc + c.sent, 0)
  const totalDelivered = campaigns.reduce((acc, c) => acc + c.delivered, 0)
  const activeCampaigns = campaigns.filter(c => c.status === 'running').length
  const scheduledCampaigns = campaigns.filter(c => c.status === 'scheduled').length

  return (
    <DashboardLayout workspace="campaign">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaign Dashboard</h1>
            <p className="text-muted-foreground">Overview of all your campaign activities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">View Calendar</Button>
            <Button>Create Campaign</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Active Campaigns"
            value={activeCampaigns}
            change={3}
            changeType="increase"
            icon={Play}
          />
          <KPICard
            title="Scheduled"
            value={scheduledCampaigns}
            change={5}
            changeType="increase"
            icon={Clock}
          />
          <KPICard
            title="Total Sent"
            value={totalSent.toLocaleString()}
            change={12.5}
            changeType="increase"
            icon={Mail}
          />
          <KPICard
            title="Delivery Rate"
            value={`${((totalDelivered / totalSent) * 100).toFixed(1)}%`}
            change={1.2}
            changeType="increase"
            icon={Target}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Email Campaigns</CardTitle>
              <Mail className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaignStats.email.length}</div>
              <p className="text-xs text-muted-foreground">
                {campaignStats.email.filter(c => c.status === 'running').length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">SMS Campaigns</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaignStats.sms.length}</div>
              <p className="text-xs text-muted-foreground">
                {campaignStats.sms.filter(c => c.status === 'running').length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">WhatsApp Campaigns</CardTitle>
              <Smartphone className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaignStats.whatsapp.length}</div>
              <p className="text-xs text-muted-foreground">
                {campaignStats.whatsapp.filter(c => c.status === 'running').length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Push Notifications</CardTitle>
              <Bell className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaignStats.push.length}</div>
              <p className="text-xs text-muted-foreground">
                {campaignStats.push.filter(c => c.status === 'running').length} active
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Send Volume</CardTitle>
              <CardDescription>Messages sent by channel this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="email" fill="#10B981" name="Email" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sms" fill="#3B82F6" name="SMS" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="whatsapp" fill="#8B5CF6" name="WhatsApp" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="push" fill="#F59E0B" name="Push" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Your latest campaign activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCampaigns.map((campaign) => {
                const openRate = campaign.delivered > 0 ? ((campaign.opened / campaign.delivered) * 100) : 0
                return (
                  <div key={campaign.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg p-2 ${
                        campaign.type === 'email' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400' :
                        campaign.type === 'sms' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                        campaign.type === 'whatsapp' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                        'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                      }`}>
                        {campaign.type === 'email' && <Mail className="h-4 w-4" />}
                        {campaign.type === 'sms' && <MessageSquare className="h-4 w-4" />}
                        {campaign.type === 'whatsapp' && <Smartphone className="h-4 w-4" />}
                        {campaign.type === 'push' && <Bell className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground">{campaign.sent.toLocaleString()} sent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">{openRate.toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">open rate</p>
                      </div>
                      <Badge variant={campaign.status === 'running' ? 'default' : campaign.status === 'completed' ? 'secondary' : 'outline'}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
