'use client'

import { useState } from 'react'
import { Plus, Play, Pause, Settings, Zap, Mail, MessageSquare, Clock, ArrowRight, Users, CheckCircle } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { KPICard } from '@/components/shared/kpi-card'

const journeys = [
  {
    id: 'JRN-001',
    name: 'Welcome Series',
    description: 'Onboard new customers with a 5-email welcome sequence',
    status: 'active',
    enrolled: 12500,
    completed: 8750,
    conversionRate: 32.5,
    steps: 5,
    triggers: ['New Signup'],
  },
  {
    id: 'JRN-002',
    name: 'Abandoned Cart Recovery',
    description: 'Re-engage customers who left items in their cart',
    status: 'active',
    enrolled: 8200,
    completed: 4920,
    conversionRate: 28.3,
    steps: 3,
    triggers: ['Cart Abandoned'],
  },
  {
    id: 'JRN-003',
    name: 'Re-engagement Campaign',
    description: 'Win back inactive customers after 30 days',
    status: 'active',
    enrolled: 5600,
    completed: 2240,
    conversionRate: 15.8,
    steps: 4,
    triggers: ['Inactive 30 Days'],
  },
  {
    id: 'JRN-004',
    name: 'Birthday Celebration',
    description: 'Send personalized birthday offers',
    status: 'active',
    enrolled: 3200,
    completed: 3040,
    conversionRate: 45.2,
    steps: 2,
    triggers: ['Birthday'],
  },
  {
    id: 'JRN-005',
    name: 'Product Upsell',
    description: 'Cross-sell related products after purchase',
    status: 'paused',
    enrolled: 2100,
    completed: 840,
    conversionRate: 22.1,
    steps: 3,
    triggers: ['Purchase Completed'],
  },
  {
    id: 'JRN-006',
    name: 'Subscription Renewal',
    description: 'Remind customers before subscription expires',
    status: 'draft',
    enrolled: 0,
    completed: 0,
    conversionRate: 0,
    steps: 4,
    triggers: ['Subscription Expiring'],
  },
]

export default function JourneysPage() {
  const [journeyStates, setJourneyStates] = useState<Record<string, boolean>>(
    journeys.reduce((acc, j) => ({ ...acc, [j.id]: j.status === 'active' }), {})
  )

  const toggleJourney = (id: string) => {
    setJourneyStates(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const activeJourneys = journeys.filter(j => j.status === 'active').length
  const totalEnrolled = journeys.reduce((acc, j) => acc + j.enrolled, 0)
  const totalCompleted = journeys.reduce((acc, j) => acc + j.completed, 0)
  const avgConversion = journeys.filter(j => j.conversionRate > 0).reduce((acc, j) => acc + j.conversionRate, 0) / journeys.filter(j => j.conversionRate > 0).length

  return (
    <DashboardLayout workspace="marketer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Journey Builder</h1>
            <p className="text-muted-foreground">Create and manage automated customer journeys</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Journey
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Active Journeys"
            value={activeJourneys}
            change={2}
            changeType="increase"
            icon={Zap}
          />
          <KPICard
            title="Total Enrolled"
            value={totalEnrolled.toLocaleString()}
            change={18.5}
            changeType="increase"
            icon={Users}
          />
          <KPICard
            title="Completed"
            value={totalCompleted.toLocaleString()}
            change={12.3}
            changeType="increase"
            icon={CheckCircle}
          />
          <KPICard
            title="Avg Conversion"
            value={`${avgConversion.toFixed(1)}%`}
            change={3.2}
            changeType="increase"
            icon={Zap}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {journeys.map((journey) => (
            <Card key={journey.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{journey.name}</CardTitle>
                    <CardDescription className="mt-1">{journey.description}</CardDescription>
                  </div>
                  <Switch
                    checked={journeyStates[journey.id]}
                    onCheckedChange={() => toggleJourney(journey.id)}
                    disabled={journey.status === 'draft'}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={
                    journey.status === 'active' ? 'default' :
                    journey.status === 'paused' ? 'secondary' : 'outline'
                  }>
                    {journey.status}
                  </Badge>
                  <Badge variant="outline">{journey.steps} steps</Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  <span>Trigger: {journey.triggers.join(', ')}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div>
                    <p className="text-2xl font-bold">{journey.enrolled.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Enrolled</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{journey.completed.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{journey.conversionRate}%</p>
                    <p className="text-xs text-muted-foreground">Conversion</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Journey Templates</CardTitle>
            <CardDescription>Get started with pre-built journey templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Welcome Series', icon: Mail, steps: '5 emails over 14 days' },
                { name: 'Cart Recovery', icon: Clock, steps: '3 reminders over 3 days' },
                { name: 'Re-engagement', icon: Users, steps: '4 touchpoints over 30 days' },
                { name: 'Post-Purchase', icon: MessageSquare, steps: 'Review + upsell sequence' },
              ].map((template) => (
                <div key={template.name} className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <template.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.steps}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
