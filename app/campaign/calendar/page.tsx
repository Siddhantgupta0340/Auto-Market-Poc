'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Mail, MessageSquare, Smartphone, Bell } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { campaigns } from '@/lib/data/campaigns'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = []
  
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }
  
  return days
}

const scheduledCampaigns = campaigns.filter(c => c.status === 'scheduled' || c.status === 'running').map((c, i) => ({
  ...c,
  scheduledDay: (i % 28) + 1,
}))

export default function CampaignCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const calendarDays = getCalendarDays(year, month)

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getCampaignsForDay = (day: number | null) => {
    if (!day) return []
    return scheduledCampaigns.filter(c => c.scheduledDay === day)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-3 w-3" />
      case 'sms': return <MessageSquare className="h-3 w-3" />
      case 'whatsapp': return <Smartphone className="h-3 w-3" />
      case 'push': return <Bell className="h-3 w-3" />
      default: return <Mail className="h-3 w-3" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400'
      case 'sms': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400'
      case 'whatsapp': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-400'
      case 'push': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-400'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <DashboardLayout workspace="campaign">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaign Calendar</h1>
            <p className="text-muted-foreground">View and schedule your campaigns</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Campaign
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{months[month]} {year}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
              {days.map((day) => (
                <div key={day} className="bg-muted p-3 text-center text-sm font-medium">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => {
                const dayCampaigns = getCampaignsForDay(day)
                const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
                
                return (
                  <div
                    key={index}
                    className={`bg-card min-h-[120px] p-2 ${!day ? 'bg-muted/50' : ''}`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                          {isToday ? (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              {day}
                            </span>
                          ) : (
                            day
                          )}
                        </div>
                        <div className="space-y-1">
                          {dayCampaigns.slice(0, 3).map((campaign) => (
                            <div
                              key={campaign.id}
                              className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-xs ${getTypeColor(campaign.type)}`}
                            >
                              {getTypeIcon(campaign.type)}
                              <span className="truncate">{campaign.name}</span>
                            </div>
                          ))}
                          {dayCampaigns.length > 3 && (
                            <p className="text-xs text-muted-foreground">+{dayCampaigns.length - 3} more</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledCampaigns.slice(0, 8).map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${getTypeColor(campaign.type)}`}>
                      {getTypeIcon(campaign.type)}
                    </div>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">{campaign.audience} - {campaign.audienceSize.toLocaleString()} contacts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{months[month]} {campaign.scheduledDay}</p>
                      <p className="text-xs text-muted-foreground">Scheduled</p>
                    </div>
                    <Badge variant={campaign.status === 'running' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
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
