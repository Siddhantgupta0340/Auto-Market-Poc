'use client'

import { useState } from 'react'
import { Plus, Search, Bell, MoreHorizontal, Eye, Edit2, Copy, Trash2, Smartphone, Monitor } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { campaigns } from '@/lib/data/campaigns'
import { StatCard } from '@/components/shared/stat-card'

const pushCampaigns = campaigns.filter(c => c.type === 'push')

const statusColors: Record<string, string> = {
  'draft': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'scheduled': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'running': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  'paused': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  'completed': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
}

export default function CampaignPushPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredCampaigns = pushCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalSent = pushCampaigns.reduce((acc, c) => acc + c.sent, 0)
  const totalDelivered = pushCampaigns.reduce((acc, c) => acc + c.delivered, 0)
  const totalClicked = pushCampaigns.reduce((acc, c) => acc + c.clicked, 0)

  return (
    <DashboardLayout workspace="campaign">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Push Notifications</h1>
            <p className="text-muted-foreground">Create and manage push notification campaigns</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Push Campaign
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Campaigns" value={pushCampaigns.length} icon={Bell} iconColor="text-orange-600" />
          <StatCard title="Total Sent" value={totalSent.toLocaleString()} icon={Bell} iconColor="text-blue-600" />
          <StatCard title="Delivered" value={totalDelivered.toLocaleString()} icon={Bell} iconColor="text-emerald-600" />
          <StatCard title="Clicks" value={totalClicked.toLocaleString()} icon={Bell} iconColor="text-purple-600" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mobile Push</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(totalSent * 0.65).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">65% of total notifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Web Push</CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(totalSent * 0.35).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">35% of total notifications</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardTitle>All Push Campaigns</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Delivery Rate</TableHead>
                  <TableHead>Click Rate</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => {
                  const deliveryRate = campaign.sent > 0 ? ((campaign.delivered / campaign.sent) * 100) : 0
                  const clickRate = campaign.delivered > 0 ? ((campaign.clicked / campaign.delivered) * 100) : 0
                  
                  return (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground">{campaign.createdAt}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[campaign.status]}>{campaign.status}</Badge>
                      </TableCell>
                      <TableCell>{campaign.audience}</TableCell>
                      <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={deliveryRate} className="w-16 h-2" />
                          <span className="text-sm">{deliveryRate.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={clickRate} className="w-16 h-2" />
                          <span className="text-sm">{clickRate.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${campaign.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                            <DropdownMenuItem><Edit2 className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                            <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
