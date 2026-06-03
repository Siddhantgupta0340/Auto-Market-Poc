import { Campaign, CampaignStatus, CampaignType } from '@/lib/types'

const campaignNames = {
  email: [
    'Welcome Series', 'Monthly Newsletter', 'Product Launch Announcement', 'Holiday Sale',
    'Customer Appreciation', 'Re-engagement Campaign', 'Birthday Offers', 'Abandoned Cart Recovery',
    'Feature Update', 'Weekly Digest', 'VIP Exclusive', 'End of Season Sale', 'New Year Promo',
    'Flash Sale Alert', 'Loyalty Rewards', 'Feedback Request', 'Webinar Invitation',
    'Case Study Share', 'Industry Insights', 'Partner Announcement'
  ],
  sms: [
    'Flash Sale SMS', 'Order Confirmation', 'Delivery Update', 'Appointment Reminder',
    'Exclusive SMS Offer', 'Limited Time Deal', 'Welcome SMS', 'Feedback SMS',
    'Event Reminder', 'Restock Alert', 'Price Drop Alert', 'VIP SMS Access',
    'Birthday SMS', 'Survey Request', 'Renewal Reminder'
  ],
  whatsapp: [
    'WhatsApp Welcome', 'Order Status Update', 'Support Follow-up', 'Product Catalog',
    'Appointment Booking', 'Payment Confirmation', 'Shipping Update', 'WhatsApp Newsletter',
    'Promotional Message', 'Customer Service', 'Feedback Collection', 'Event RSVP'
  ],
  push: [
    'New Feature Alert', 'Daily Digest', 'Breaking News', 'Price Drop Notification',
    'Abandoned Browse', 'Review Request', 'App Update', 'Special Offer',
    'Content Recommendation', 'Event Start', 'Goal Achievement', 'Weekly Summary'
  ],
  multichannel: [
    'Product Launch Multi', 'Holiday Campaign', 'Customer Journey', 'Win-back Campaign',
    'Onboarding Series', 'Loyalty Program', 'Seasonal Promotion', 'Brand Awareness',
    'Cross-sell Campaign', 'Upsell Campaign', 'Retention Campaign', 'Referral Program'
  ]
}

const audiences = [
  'All Customers', 'Active Users', 'New Signups', 'High Value Segment', 'Enterprise Customers',
  'SMB Segment', 'Churned Users', 'Trial Users', 'Paid Customers', 'VIP Members',
  'Newsletter Subscribers', 'Webinar Attendees', 'E-commerce Buyers', 'SaaS Users',
  'Mobile Users', 'Desktop Users', 'Re-engaged Users', 'Inactive Users'
]

const creators = [
  'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Lee',
  'Robert Martinez', 'Amanda Wilson', 'Christopher Brown', 'Nicole Taylor', 'Daniel Garcia'
]

const statuses: CampaignStatus[] = ['draft', 'scheduled', 'running', 'paused', 'completed', 'archived']
const types: CampaignType[] = ['email', 'sms', 'whatsapp', 'push', 'multichannel']

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function generateCampaigns(count: number): Campaign[] {
  const campaigns: Campaign[] = []
  
  for (let i = 0; i < count; i++) {
    const seed = i + 100
    const type = types[Math.floor(seededRandom(seed * 1) * types.length)]
    const names = campaignNames[type]
    const name = names[Math.floor(seededRandom(seed * 2) * names.length)]
    const status = statuses[Math.floor(seededRandom(seed * 3) * statuses.length)]
    const audience = audiences[Math.floor(seededRandom(seed * 4) * audiences.length)]
    const creator = creators[Math.floor(seededRandom(seed * 5) * creators.length)]
    
    const audienceSize = Math.floor(seededRandom(seed * 6) * 50000) + 1000
    const sent = status === 'draft' ? 0 : Math.floor(audienceSize * (0.8 + seededRandom(seed * 7) * 0.2))
    const delivered = Math.floor(sent * (0.92 + seededRandom(seed * 8) * 0.07))
    const opened = Math.floor(delivered * (0.15 + seededRandom(seed * 9) * 0.35))
    const clicked = Math.floor(opened * (0.1 + seededRandom(seed * 10) * 0.3))
    const converted = Math.floor(clicked * (0.02 + seededRandom(seed * 11) * 0.15))
    const revenue = converted * Math.floor(seededRandom(seed * 12) * 200 + 50)
    
    const createdYear = 2023 + Math.floor(seededRandom(seed * 13) * 2)
    const createdMonth = Math.floor(seededRandom(seed * 14) * 12) + 1
    const createdDay = Math.floor(seededRandom(seed * 15) * 28) + 1
    const createdAt = `${createdYear}-${createdMonth.toString().padStart(2, '0')}-${createdDay.toString().padStart(2, '0')}`
    
    const scheduledOffset = Math.floor(seededRandom(seed * 16) * 14) + 1
    const scheduledDate = new Date(createdAt)
    scheduledDate.setDate(scheduledDate.getDate() + scheduledOffset)
    
    campaigns.push({
      id: `CAM-${(i + 1).toString().padStart(4, '0')}`,
      name: `${name} ${Math.floor(seededRandom(seed * 17) * 10) + 1}`,
      type,
      status,
      subject: type === 'email' ? `${name} - Special Offer Inside` : undefined,
      audience,
      audienceSize,
      sent,
      delivered,
      opened,
      clicked,
      converted,
      revenue,
      createdAt,
      scheduledAt: status !== 'draft' ? scheduledDate.toISOString().split('T')[0] : undefined,
      completedAt: status === 'completed' ? scheduledDate.toISOString().split('T')[0] : undefined,
      createdBy: creator,
    })
  }
  
  return campaigns
}

export const campaigns = generateCampaigns(100)

export const campaignStats = {
  total: campaigns.length,
  draft: campaigns.filter(c => c.status === 'draft').length,
  scheduled: campaigns.filter(c => c.status === 'scheduled').length,
  running: campaigns.filter(c => c.status === 'running').length,
  paused: campaigns.filter(c => c.status === 'paused').length,
  completed: campaigns.filter(c => c.status === 'completed').length,
  totalSent: campaigns.reduce((sum, c) => sum + c.sent, 0),
  totalDelivered: campaigns.reduce((sum, c) => sum + c.delivered, 0),
  totalOpened: campaigns.reduce((sum, c) => sum + c.opened, 0),
  totalClicked: campaigns.reduce((sum, c) => sum + c.clicked, 0),
  totalConverted: campaigns.reduce((sum, c) => sum + c.converted, 0),
  totalRevenue: campaigns.reduce((sum, c) => sum + c.revenue, 0),
  avgOpenRate: campaigns.length > 0 
    ? (campaigns.reduce((sum, c) => sum + (c.delivered > 0 ? c.opened / c.delivered : 0), 0) / campaigns.length * 100).toFixed(1)
    : '0',
  avgClickRate: campaigns.length > 0
    ? (campaigns.reduce((sum, c) => sum + (c.opened > 0 ? c.clicked / c.opened : 0), 0) / campaigns.length * 100).toFixed(1)
    : '0',
}

export const emailCampaigns = campaigns.filter(c => c.type === 'email')
export const smsCampaigns = campaigns.filter(c => c.type === 'sms')
export const whatsappCampaigns = campaigns.filter(c => c.type === 'whatsapp')
export const pushCampaigns = campaigns.filter(c => c.type === 'push')
export const multichannelCampaigns = campaigns.filter(c => c.type === 'multichannel')
