export const revenueTrend = [
  { month: 'Jan', revenue: 45000, target: 40000 },
  { month: 'Feb', revenue: 52000, target: 45000 },
  { month: 'Mar', revenue: 48000, target: 48000 },
  { month: 'Apr', revenue: 61000, target: 50000 },
  { month: 'May', revenue: 55000, target: 52000 },
  { month: 'Jun', revenue: 67000, target: 55000 },
  { month: 'Jul', revenue: 72000, target: 60000 },
]

export const funnelData = [
  { step: 'Awareness', value: 100000, fill: '#8884d8' },
  { step: 'Interest', value: 80000, fill: '#83a6ed' },
  { step: 'Consideration', value: 50000, fill: '#8dd1e1' },
  { step: 'Intent', value: 30000, fill: '#82ca9d' },
  { step: 'Evaluation', value: 15000, fill: '#a4de6c' },
  { step: 'Purchase', value: 5000, fill: '#d0ed57' },
]

export const channelROI = [
  { channel: 'Email', roi: 4.2, spend: 12000, revenue: 50400 },
  { channel: 'SMS', roi: 3.5, spend: 8000, revenue: 28000 },
  { channel: 'WhatsApp', roi: 5.1, spend: 5000, revenue: 25500 },
  { channel: 'Paid Search', roi: 2.8, spend: 25000, revenue: 70000 },
  { channel: 'Social Media', roi: 3.1, spend: 15000, revenue: 46500 },
]

export const customerGrowth = [
  { date: '2023-Q1', new: 1200, churn: 200, net: 1000 },
  { date: '2023-Q2', new: 1500, churn: 250, net: 1250 },
  { date: '2023-Q3', new: 1800, churn: 300, net: 1500 },
  { date: '2023-Q4', new: 2200, churn: 400, net: 1800 },
  { date: '2024-Q1', new: 2600, churn: 450, net: 2150 },
]

export const analyticsKPIs = {
  totalRevenue: 1245000,
  campaignReach: 524000,
  conversions: 12540,
  roi: 350,
  customerGrowth: 15.4,
  activeCustomers: 45200,
  revenuePerCustomer: 27.5,
  successRate: 68.2,
  trends: {
    revenue: 12.5,
    reach: 8.2,
    conversions: 5.4,
    roi: 2.1,
  }
}

export const insights = [
  {
    id: 1,
    type: 'positive',
    title: 'High Performing Segment',
    description: 'The "Lapsed Buyers" email segment is showing a 45% higher ROI than average this month.',
    recommendation: 'Increase spend on the re-engagement flow for this segment.',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Churn Alert',
    description: 'Customer churn in the SMS channel has increased by 5% in the last 14 days.',
    recommendation: 'Review the frequency of SMS broadcasts to avoid over-saturation.',
  },
  {
    id: 3,
    type: 'opportunity',
    title: 'Growth Opportunity',
    description: 'WhatsApp conversion rates are 2x higher for users aged 25-34.',
    recommendation: 'Pivot social media ad spend to WhatsApp-integrated campaigns.',
  }
]

export const analyticsRecords = [
  { id: 'REC-001', date: '2024-07-01', campaign: 'Summer Sale', channel: 'Email', impressions: 45000, clicks: 1200, conversions: 85, revenue: 4250, customers: 45000, newCustomers: 45, emailsDelivered: 44800, smsDelivered: 0, conversionRate: 3.2 },
  { id: 'REC-002', date: '2024-07-02', campaign: 'Flash SMS', channel: 'SMS', impressions: 12000, clicks: 800, conversions: 45, revenue: 1800, customers: 45045, newCustomers: 32, emailsDelivered: 0, smsDelivered: 11500, conversionRate: 2.8 },
  { id: 'REC-003', date: '2024-07-03', campaign: 'Loyalty Program', channel: 'WhatsApp', impressions: 8000, clicks: 650, conversions: 92, revenue: 5600, customers: 45137, newCustomers: 58, emailsDelivered: 0, smsDelivered: 7800, conversionRate: 4.1 },
  { id: 'REC-004', date: '2024-07-04', campaign: 'New Arrival', channel: 'Paid Search', impressions: 120000, clicks: 3400, conversions: 110, revenue: 8800, customers: 45247, newCustomers: 42, emailsDelivered: 0, smsDelivered: 0, conversionRate: 1.9 },
  { id: 'REC-005', date: '2024-07-05', campaign: 'Retargeting', channel: 'Social', impressions: 55000, clicks: 1100, conversions: 30, revenue: 2100, customers: 45277, newCustomers: 28, emailsDelivered: 12000, smsDelivered: 5000, conversionRate: 2.4 },
]

export const analyticsStats = {
  totalEvents: 12500000,
  processedEvents: 12480000,
  errorRate: 0.16,
  latency: '124ms',
  uptime: '99.99%',
  activeDataStreams: 12,
  storageUsed: '1.2TB',
  queryCount: 45200,
  totalRevenue: 1245000,
  totalCustomers: 45200,
  totalNewCustomers: 1250,
  totalEmailsDelivered: 850000,
  avgConversionRate: 3.2,
}

export const workflows = [
  {
    id: 'wf-1',
    name: 'Customer Onboarding',
    status: 'active',
    type: 'automation',
    trigger: 'User Signup',
    description: 'Welcome series for new customers to increase retention.',
    steps: 5,
    enrolledCount: 5200,
    completedCount: 4500,
    conversionRate: 86.5,
    failed: 12,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-20',
  },
  {
    id: 'wf-2',
    name: 'Abandoned Cart Recovery',
    status: 'active',
    type: 'lifecycle',
    trigger: 'Cart Abandoned',
    description: 'Multi-stage recovery for high-value shopping carts.',
    steps: 3,
    enrolledCount: 15800,
    completedCount: 12400,
    conversionRate: 78.4,
    failed: 45,
    createdAt: '2024-02-10',
    updatedAt: '2024-07-01',
  },
  {
    id: 'wf-3',
    name: 'Win-back Campaign',
    status: 'paused',
    type: 're-engagement',
    trigger: 'Inactivity > 30 days',
    description: 'Re-engage customers who haven’t purchased recently.',
    steps: 4,
    enrolledCount: 9500,
    completedCount: 8900,
    conversionRate: 93.6,
    failed: 5,
    createdAt: '2024-03-05',
    updatedAt: '2024-06-15',
  },
  {
    id: 'wf-4',
    name: 'Post-Purchase Survey',
    status: 'active',
    type: 'feedback',
    trigger: 'Order Delivered',
    description: 'Collect customer satisfaction data after successful delivery.',
    steps: 2,
    enrolledCount: 3500,
    completedCount: 3200,
    conversionRate: 91.4,
    failed: 2,
    createdAt: '2024-04-12',
    updatedAt: '2024-07-04',
  }
]

export const workflowStats = {
  total: 4,
  active: 3,
  totalEnrolled: 34000,
  avgConversionRate: 87.5,
  successRate: 99.7,
  averageTime: '4h 12m',
}