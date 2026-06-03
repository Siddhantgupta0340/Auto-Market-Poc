'use client'

import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Shield, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatCard } from '@/components/shared/stat-card'

const users = [
  { id: 'USR-001', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Admin', status: 'active', lastLogin: '2024-03-15 09:30', createdAt: '2023-01-15' },
  { id: 'USR-002', name: 'Michael Chen', email: 'michael.chen@company.com', role: 'Marketer', status: 'active', lastLogin: '2024-03-15 08:45', createdAt: '2023-02-20' },
  { id: 'USR-003', name: 'Emily Davis', email: 'emily.davis@company.com', role: 'Campaign Manager', status: 'active', lastLogin: '2024-03-14 16:20', createdAt: '2023-03-10' },
  { id: 'USR-004', name: 'James Wilson', email: 'james.wilson@company.com', role: 'Analyst', status: 'inactive', lastLogin: '2024-02-28 11:00', createdAt: '2023-04-05' },
  { id: 'USR-005', name: 'Jessica Brown', email: 'jessica.brown@company.com', role: 'Marketer', status: 'active', lastLogin: '2024-03-15 10:15', createdAt: '2023-05-12' },
  { id: 'USR-006', name: 'David Lee', email: 'david.lee@company.com', role: 'Viewer', status: 'active', lastLogin: '2024-03-13 14:30', createdAt: '2023-06-18' },
  { id: 'USR-007', name: 'Amanda Martinez', email: 'amanda.martinez@company.com', role: 'Campaign Manager', status: 'active', lastLogin: '2024-03-15 07:00', createdAt: '2023-07-22' },
  { id: 'USR-008', name: 'Robert Taylor', email: 'robert.taylor@company.com', role: 'Admin', status: 'inactive', lastLogin: '2024-01-15 09:00', createdAt: '2023-08-30' },
]

const roleColors: Record<string, string> = {
  'Admin': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  'Marketer': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'Campaign Manager': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  'Analyst': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  'Viewer': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'Admin').length,
  }

  return (
    <DashboardLayout workspace="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage platform users and their access</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account and assign a role</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="marketer">Marketer</SelectItem>
                      <SelectItem value="campaign_manager">Campaign Manager</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Users"
            value={stats.total}
            icon={Shield}
            iconColor="text-blue-600"
          />
          <StatCard
            title="Active Users"
            value={stats.active}
            icon={CheckCircle}
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Administrators"
            value={stats.admins}
            icon={Shield}
            iconColor="text-red-600"
          />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Users</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={roleColors[user.role]}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {user.status === 'active' ? (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          <CheckCircle className="mr-1 h-3 w-3" />Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="mr-1 h-3 w-3" />Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell className="text-muted-foreground">{user.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
