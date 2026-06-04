'use client'

import { useState } from 'react'
import { Upload, FileSpreadsheet, FileText, CheckCircle2, AlertCircle, Clock, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const importHistory = [
  { id: 'IMP-001', name: 'customers_march_2024.csv', type: 'Customers', records: 5420, status: 'completed', date: '2024-03-15', errors: 0 },
  { id: 'IMP-002', name: 'leads_q1.xlsx', type: 'Leads', records: 1250, status: 'completed', date: '2024-03-14', errors: 12 },
  { id: 'IMP-003', name: 'contacts_update.csv', type: 'Customers', records: 890, status: 'processing', date: '2024-03-14', errors: 0 },
  { id: 'IMP-004', name: 'email_list_feb.csv', type: 'Contacts', records: 3200, status: 'completed', date: '2024-02-28', errors: 45 },
  { id: 'IMP-005', name: 'segments_import.xlsx', type: 'Segments', records: 150, status: 'failed', date: '2024-02-25', errors: 150 },
]

const importTemplates = [
  { name: 'Customers Import Template', description: 'Import customer data with all required fields', format: 'CSV' },
  { name: 'Leads Import Template', description: 'Import leads with contact and scoring information', format: 'CSV' },
  { name: 'Contacts Import Template', description: 'Basic contact information import', format: 'Excel' },
  { name: 'Segments Import Template', description: 'Import segment definitions and rules', format: 'CSV' },
]

export default function ImportsPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    simulateUpload()
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"><CheckCircle2 className="mr-1 h-3 w-3" />Completed</Badge>
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"><Clock className="mr-1 h-3 w-3" />Processing</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"><AlertCircle className="mr-1 h-3 w-3" />Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Imports</h1>
        <p className="text-muted-foreground">Import customers, leads, and contacts from CSV or Excel files</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="history">Import History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Data File</CardTitle>
              <CardDescription>Drag and drop or click to upload CSV or Excel files</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={() => simulateUpload()}
                />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">Drop your file here, or click to browse</p>
                <p className="mt-2 text-sm text-muted-foreground">Supports CSV and Excel files up to 50MB</p>
              </div>

              {isUploading && (
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading file...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Import Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>1. Ensure your file has headers in the first row</p>
                <p>2. Required fields: name, email (for customers/leads)</p>
                <p>3. Date format should be YYYY-MM-DD</p>
                <p>4. Phone numbers should include country code</p>
                <p>5. Maximum 100,000 records per import</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Supported Formats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-emerald-600" />
                  <div>
                    <p className="font-medium">CSV Files</p>
                    <p className="text-sm text-muted-foreground">Comma-separated values</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-8 w-8 text-emerald-600" />
                  <div>
                    <p className="font-medium">Excel Files</p>
                    <p className="text-sm text-muted-foreground">.xlsx and .xls formats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Import History</CardTitle>
              <CardDescription>View all past import operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Errors</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.records.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className={item.errors > 0 ? 'text-red-600' : ''}>{item.errors}</TableCell>
                      <TableCell>{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-2">
            {importTemplates.map((template) => (
              <Card key={template.name}>
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{template.format}</Badge>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
