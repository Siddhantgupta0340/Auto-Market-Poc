'use client'

import { useState } from 'react'
import { Plus, Play, Pause, Eye, BarChart3, Mail, CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { KPICard } from '@/components/shared/kpi-card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const abTests = [
  {
    id: 'AB-001',
    name: 'Subject Line Test - Summer Sale',
    status: 'running',
    startDate: '2024-03-10',
    variants: [
      { name: 'Variant A', subject: 'Summer Sale - 50% Off Everything!', sent: 12500, opened: 3750, clicked: 750, conversionRate: 6.0 },
      { name: 'Variant B', subject: 'Don\'t Miss Our Biggest Summer Sale', sent: 12500, opened: 4125, clicked: 825, conversionRate: 6.6 },
    ],
    winner: 'B',
    confidence: 95,
  },
  {
    id: 'AB-002',
    name: 'CTA Button Color Test',
    status: 'running',
    startDate: '2024-03-12',
    variants: [
      { name: 'Green CTA', subject: 'Weekly Newsletter', sent: 8000, opened: 2400, clicked: 576, conversionRate: 7.2 },
      { name: 'Blue CTA', subject: 'Weekly Newsletter', sent: 8000, opened: 2320, clicked: 510, conversionRate: 6.4 },
    ],
    winner: 'A',
    confidence: 88,
  },
  {
    id: 'AB-003',
    name: 'Send Time Optimization',
    status: 'completed',
    startDate: '2024-03-01',
    variants: [
      { name: '9 AM Send', subject: 'Product Launch', sent: 15000, opened: 5250, clicked: 1050, conversionRate: 7.0 },
      { name: '2 PM Send', subject: 'Product Launch', sent: 15000, opened: 4500, clicked: 900, conversionRate: 6.0 },
    ],
    winner: 'A',
    confidence: 99,
  },
  {
    id: 'AB-004',
    name: 'Personalization Test',
    status: 'draft',
    startDate: '-',
    variants: [
      { name: 'With Name', subject: 'Hi {{name}}, check this out!', sent: 0, opened: 0, clicked: 0, conversionRate: 0 },
      { name: 'Without Name', subject: 'Check this out!', sent: 0, opened: 0, clicked: 0, conversionRate: 0 },
    ],
    winner: null,
    confidence: 0,
  },
]

const comparisonData = abTests[0].variants.map(v => ({
  name: v.name,
  openRate: ((v.opened / v.sent) * 100).toFixed(1),
  clickRate: ((v.clicked / v.opened) * 100).toFixed(1),
  conversionRate: v.conversionRate,
}))

export default function ABTestingPage() {
  const activeTests = abTests.filter(t => t.status === 'running').length
  const completedTests = abTests.filter(t => t.status === 'completed').length

  return (
    <DashboardLayout workspace="campaign">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">A/B Testing</h1>
            <p className="text-muted-foreground">Test and optimize your campaigns</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Test
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <KPICard
            title="Active Tests"
            value={activeTests}
            change={1}
            changeType="increase"
            icon={Play}
          />
          <KPICard
            title="Completed"
            value={completedTests}
            change={2}
            changeType="increase"
            icon={CheckCircle}
          />
          <KPICard
            title="Avg Lift"
            value="+12.5%"
            change={3.2}
            changeType="increase"
            icon={TrendingUp}
          />
          <KPICard
            title="Total Variants Tested"
            value={abTests.reduce((acc, t) => acc + t.variants.length, 0)}
            icon={BarChart3}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Test Comparison</CardTitle>
            <CardDescription>Subject Line Test - Summer Sale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="openRate" fill="#10B981" name="Open Rate %" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="clickRate" fill="#3B82F6" name="Click Rate %" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="conversionRate" fill="#8B5CF6" name="Conversion Rate %" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All A/B Tests</CardTitle>
            <CardDescription>View and manage your experiment campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {abTests.map((test) => (
                <div key={test.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{test.name}</h3>
                        <Badge variant={
                          test.status === 'running' ? 'default' :
                          test.status === 'completed' ? 'secondary' : 'outline'
                        }>
                          {test.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Started: {test.startDate}</p>
                    </div>
                    {test.winner && (
                      <div className="text-right">
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          Winner: Variant {test.winner}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{test.confidence}% confidence</p>
                      </div>
                    )}
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Variant</TableHead>
                        <TableHead>Subject/Content</TableHead>
                        <TableHead>Sent</TableHead>
                        <TableHead>Open Rate</TableHead>
                        <TableHead>Click Rate</TableHead>
                        <TableHead>Conversion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {test.variants.map((variant, index) => {
                        const openRate = variant.sent > 0 ? ((variant.opened / variant.sent) * 100) : 0
                        const clickRate = variant.opened > 0 ? ((variant.clicked / variant.opened) * 100) : 0
                        const isWinner = test.winner === String.fromCharCode(65 + index)
                        
                        return (
                          <TableRow key={variant.name} className={isWinner ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''}>
                            <TableCell className="font-medium">
                              {variant.name}
                              {isWinner && <CheckCircle className="inline ml-2 h-4 w-4 text-emerald-600" />}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{variant.subject}</TableCell>
                            <TableCell>{variant.sent.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={openRate} className="w-16 h-2" />
                                <span className="text-sm">{openRate.toFixed(1)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={clickRate} className="w-16 h-2" />
                                <span className="text-sm">{clickRate.toFixed(1)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{variant.conversionRate}%</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    {test.status === 'running' && (
                      <Button variant="outline" size="sm">
                        <Pause className="mr-2 h-4 w-4" />
                        End Test
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
