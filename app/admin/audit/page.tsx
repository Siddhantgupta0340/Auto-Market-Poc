'use client'

import { useState } from 'react'
import { Search, Filter, Download, Eye, Calendar, User, Globe, Monitor, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { StatCard } from '@/components/shared/stat-card'

const auditLogs = [
  { id: 'LOG-001', user: 'Sarah Johnson', action: 'Created', resource: 'Campaign', resourceId: 'CAMP-125', details: 'Created new email campaign "Summer Sale"', ip: '192.168.1.100', timestamp: '2024-03-15 14:30:25' },
  { id: 'LOG-002', user: 'Michael Chen', action: 'Updated', resource: 'Customer', resourceId: 'CUS-00542', details: 'Updated customer contact information', ip: '192.168.1.101', timestamp: '2024-03-15 14:28:10' },
  { id: 'LOG-003', user: 'Emily Davis', action: 'Deleted', resource: 'Segment', resourceId: 'SEG-045', details: 'Deleted segment "Inactive Users 2023"', ip: '192.168.1.102', timestamp: '2024-03-15 14:15:00' },
  { id: 'LOG-004', user: 'Sarah Johnson', action: 'Login', resource: 'System', resourceId: '-', details: 'User logged in successfully', ip: '192.168.1.100', timestamp: '2024-03-15 09:30:00' },
  { id: 'LOG-005', user: 'James Wilson', action: 'Exported', resource: 'Report', resourceId: 'RPT-089', details: 'Exported customer report to CSV', ip: '192.168.1.103', timestamp: '2024-03-15 09:15:45' },
  { id: 'LOG-006', user: 'Jessica Brown', action: 'Created', resource: 'Template', resourceId: 'TPL-067', details: 'Created new email template "Welcome Series"', ip: '192.168.1.104', timestamp: '2024-03-14 16:45:30' },
  { id: 'LOG-007', user: 'David Lee', action: 'Updated', resource: 'Settings', resourceId: 'SET-001', details: 'Updated SMTP configuration', ip: '192.168.1.105', timestamp: '2024-03-14 15:30:00' },
  { id: 'LOG-008', user: 'Amanda Martinez', action: 'Launched', resource: 'Campaign', resourceId: 'CAMP-124', details: 'Launched campaign "Spring Newsletter"', ip: '192.168.1.106', timestamp: '2024-03-14 14:00:00' },
  { id: 'LOG-009', user: 'Robert Taylor', action: 'Created', resource: 'User', resourceId: 'USR-009', details: 'Created new user account', ip: '192.168.1.107', timestamp: '2024-03-14 11:30:00' },
  { id: 'LOG-010', user: 'Sarah Johnson', action: 'Updated', resource: 'Role', resourceId: 'ROLE-003', details: 'Modified permissions for Campaign Manager role', ip: '192.168.1.100', timestamp: '2024-03-14 10:15:00' },
]

const actionColors: Record<string, string> = {
  'Created': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  'Updated': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'Deleted': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  'Login': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  'Logout': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'Exported': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  'Launched': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
}

export default function AuditPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [resourceFilter, setResourceFilter] = useState('all')
  const [date, setDate] = useState<Date>()

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resourceId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = actionFilter === 'all' || log.action === actionFilter
    const matchesResource = resourceFilter === 'all' || log.resource === resourceFilter
    return matchesSearch && matchesAction && matchesResource
  })

  const stats = {
    totalLogs: auditLogs.length,
    todayLogs: auditLogs.filter(l => l.timestamp.startsWith('2024-03-15')).length,
    uniqueUsers: new Set(auditLogs.map(l => l.user)).size,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">Track all platform activities and changes</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Entries"
          value={stats.totalLogs.toLocaleString()}
          icon={Shield}
        />
        <StatCard
          title="Today's Activity"
          value={stats.todayLogs}
          icon={Calendar}
        />
        <StatCard
          title="Active Users"
          value={stats.uniqueUsers}
          icon={User}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Complete audit trail of all platform actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="Created">Created</SelectItem>
                <SelectItem value="Updated">Updated</SelectItem>
                <SelectItem value="Deleted">Deleted</SelectItem>
                <SelectItem value="Login">Login</SelectItem>
                <SelectItem value="Exported">Exported</SelectItem>
                <SelectItem value="Launched">Launched</SelectItem>
              </SelectContent>
            </Select>
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="Campaign">Campaign</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="Segment">Segment</SelectItem>
                <SelectItem value="Template">Template</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Settings">Settings</SelectItem>
                <SelectItem value="System">System</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[140px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PP') : 'Pick date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead className="max-w-xs">Details</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>
                      <Badge className={actionColors[log.action] || 'bg-gray-100 text-gray-700'}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium">{log.resource}</span>
                        {log.resourceId !== '-' && (
                          <span className="ml-1 text-xs text-muted-foreground">({log.resourceId})</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {log.details}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm font-mono">
                      {log.ip}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
