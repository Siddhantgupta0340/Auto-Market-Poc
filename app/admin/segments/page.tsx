'use client'

import { useState, useMemo } from 'react'
import { Search, Plus, MoreHorizontal, Users, Edit, Trash2, Eye, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Breadcrumb } from '@/components/shared/breadcrumb'
import { Pagination } from '@/components/shared/pagination'
import { segments, segmentStats } from '@/lib/data/segments'
import { Segment, SegmentType } from '@/lib/types'
import { cn } from '@/lib/utils'

const typeColors: Record<SegmentType, string> = {
  dynamic: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  static: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  smart: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
}

const ITEMS_PER_PAGE = 12

export default function SegmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  
  const filteredSegments = useMemo(() => {
    return segments.filter(segment => {
      const matchesSearch = 
        segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        segment.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = typeFilter === 'all' || segment.type === typeFilter
      
      return matchesSearch && matchesType
    })
  }, [searchQuery, typeFilter])
  
  const totalPages = Math.ceil(filteredSegments.length / ITEMS_PER_PAGE)
  const paginatedSegments = filteredSegments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  
  const handleViewSegment = (segment: Segment) => {
    setSelectedSegment(segment)
    setDetailsOpen(true)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audience Segmentation</h1>
          <Breadcrumb items={[{ label: 'Segments' }]} className="mt-1" />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Segment
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Segments</p>
            <p className="text-2xl font-bold">{segmentStats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Dynamic</p>
            <p className="text-2xl font-bold text-blue-600">{segmentStats.dynamic}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Static</p>
            <p className="text-2xl font-bold text-gray-600">{segmentStats.static}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Smart</p>
            <p className="text-2xl font-bold text-purple-600">{segmentStats.smart}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search segments..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={(value) => {
              setTypeFilter(value)
              setCurrentPage(1)
            }}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dynamic">Dynamic</SelectItem>
                <SelectItem value="static">Static</SelectItem>
                <SelectItem value="smart">Smart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Segments Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedSegments.map((segment) => (
          <Card key={segment.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">{segment.name}</CardTitle>
                  <Badge className={cn('capitalize', typeColors[segment.type])}>
                    {segment.type}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewSegment(segment)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{segment.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{segment.customerCount.toLocaleString()} customers</span>
                </div>
                <span className="text-muted-foreground">Updated {segment.updatedAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredSegments.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
      
      {/* Segment Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Segment Details</DialogTitle>
          </DialogHeader>
          {selectedSegment && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedSegment.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Segment ID</p>
                  <p className="font-medium">{selectedSegment.id}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium">{selectedSegment.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge className={cn('capitalize', typeColors[selectedSegment.type])}>
                    {selectedSegment.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Count</p>
                  <p className="font-medium">{selectedSegment.customerCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{selectedSegment.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{selectedSegment.updatedAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created By</p>
                  <p className="font-medium">{selectedSegment.createdBy}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Segment Rules</p>
                <div className="space-y-2">
                  {selectedSegment.rules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-md bg-muted p-3 text-sm">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{rule.field}</span>
                      <span className="text-muted-foreground">{rule.operator.replace('_', ' ')}</span>
                      <span className="font-medium">{Array.isArray(rule.value) ? rule.value.join(', ') : rule.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
