import { Segment, SegmentType } from '@/lib/types'

const segmentDefinitions = [
  { name: 'High Value Customers', description: 'Customers with lifetime value > $10,000', type: 'dynamic' as SegmentType, rules: [{ field: 'lifetimeValue', operator: 'greater_than' as const, value: 10000 }] },
  { name: 'Enterprise Accounts', description: 'Large enterprise customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Enterprise' }] },
  { name: 'SMB Segment', description: 'Small and medium businesses', type: 'dynamic' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'SMB' }] },
  { name: 'Active Users', description: 'Users active in last 30 days', type: 'dynamic' as SegmentType, rules: [{ field: 'lastActivity', operator: 'greater_than' as const, value: '30_days_ago' }] },
  { name: 'Churned Customers', description: 'Customers who have churned', type: 'dynamic' as SegmentType, rules: [{ field: 'status', operator: 'equals' as const, value: 'churned' }] },
  { name: 'New Signups', description: 'Customers signed up in last 7 days', type: 'dynamic' as SegmentType, rules: [{ field: 'signupDate', operator: 'greater_than' as const, value: '7_days_ago' }] },
  { name: 'VIP Customers', description: 'Customers tagged as VIP', type: 'static' as SegmentType, rules: [{ field: 'tags', operator: 'contains' as const, value: 'VIP' }] },
  { name: 'Newsletter Subscribers', description: 'Subscribed to newsletter', type: 'static' as SegmentType, rules: [{ field: 'tags', operator: 'contains' as const, value: 'Newsletter' }] },
  { name: 'US Customers', description: 'Customers located in United States', type: 'dynamic' as SegmentType, rules: [{ field: 'country', operator: 'equals' as const, value: 'United States' }] },
  { name: 'International Customers', description: 'Customers outside United States', type: 'dynamic' as SegmentType, rules: [{ field: 'country', operator: 'not_equals' as const, value: 'United States' }] },
  { name: 'E-commerce Buyers', description: 'Customers who made purchases', type: 'smart' as SegmentType, rules: [{ field: 'revenueGenerated', operator: 'greater_than' as const, value: 0 }] },
  { name: 'SaaS Users', description: 'SaaS product customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'SaaS' }] },
  { name: 'Healthcare Sector', description: 'Healthcare industry customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Healthcare' }] },
  { name: 'Finance Sector', description: 'Finance industry customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Finance' }] },
  { name: 'Technology Sector', description: 'Technology industry customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Technology' }] },
  { name: 'Retail Sector', description: 'Retail industry customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Retail' }] },
  { name: 'Education Sector', description: 'Education industry customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Education' }] },
  { name: 'Inactive Users', description: 'Users inactive for 60+ days', type: 'dynamic' as SegmentType, rules: [{ field: 'lastActivity', operator: 'less_than' as const, value: '60_days_ago' }] },
  { name: 'Trial Users', description: 'Users on free trial', type: 'dynamic' as SegmentType, rules: [{ field: 'tags', operator: 'contains' as const, value: 'Free Trial' }] },
  { name: 'Paid Customers', description: 'Paying customers', type: 'dynamic' as SegmentType, rules: [{ field: 'tags', operator: 'contains' as const, value: 'Paid User' }] },
  { name: 'Mobile Users', description: 'Primarily mobile users', type: 'smart' as SegmentType, rules: [{ field: 'tags', operator: 'contains' as const, value: 'Mobile User' }] },
  { name: 'Power Users', description: 'Highly engaged users', type: 'smart' as SegmentType, rules: [{ field: 'tags', operator: 'contains' as const, value: 'Power User' }] },
  { name: 'Referrers', description: 'Customers who have referred others', type: 'static' as SegmentType, rules: [{ field: 'tags', operator: 'contains' as const, value: 'Referrer' }] },
  { name: 'Webinar Attendees', description: 'Attended at least one webinar', type: 'static' as SegmentType, rules: [{ field: 'tags', operator: 'contains' as const, value: 'Webinar Attendee' }] },
  { name: 'Low Engagement', description: 'Low campaign engagement', type: 'dynamic' as SegmentType, rules: [{ field: 'campaignCount', operator: 'less_than' as const, value: 3 }] },
  { name: 'High Engagement', description: 'High campaign engagement', type: 'dynamic' as SegmentType, rules: [{ field: 'campaignCount', operator: 'greater_than' as const, value: 15 }] },
  { name: 'West Coast US', description: 'US West Coast customers', type: 'dynamic' as SegmentType, rules: [{ field: 'state', operator: 'in' as const, value: ['CA', 'WA', 'OR', 'NV', 'AZ'] }] },
  { name: 'East Coast US', description: 'US East Coast customers', type: 'dynamic' as SegmentType, rules: [{ field: 'state', operator: 'in' as const, value: ['NY', 'MA', 'PA', 'FL', 'NC'] }] },
  { name: 'UK Customers', description: 'United Kingdom customers', type: 'dynamic' as SegmentType, rules: [{ field: 'country', operator: 'equals' as const, value: 'United Kingdom' }] },
  { name: 'APAC Customers', description: 'Asia Pacific customers', type: 'dynamic' as SegmentType, rules: [{ field: 'country', operator: 'in' as const, value: ['Australia', 'Japan', 'Singapore'] }] },
  { name: 'European Customers', description: 'European customers', type: 'dynamic' as SegmentType, rules: [{ field: 'country', operator: 'in' as const, value: ['Germany', 'France', 'Netherlands'] }] },
  { name: 'Re-engaged Users', description: 'Previously churned, now active', type: 'smart' as SegmentType, rules: [{ field: 'tags', operator: 'contains' as const, value: 'Re-engaged' }] },
  { name: 'Startups', description: 'Startup company customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Startup' }] },
  { name: 'Manufacturing', description: 'Manufacturing industry', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Manufacturing' }] },
  { name: 'Media & Entertainment', description: 'Media industry customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Media' }] },
  { name: 'Travel & Hospitality', description: 'Travel industry customers', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Travel' }] },
  { name: 'Real Estate', description: 'Real estate industry', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Real Estate' }] },
  { name: 'Non-Profit', description: 'Non-profit organizations', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Non-Profit' }] },
  { name: 'Consulting', description: 'Consulting firms', type: 'static' as SegmentType, rules: [{ field: 'segment', operator: 'equals' as const, value: 'Consulting' }] },
  { name: 'Mid-Value Customers', description: 'LTV between $1K-$10K', type: 'dynamic' as SegmentType, rules: [{ field: 'lifetimeValue', operator: 'between' as const, value: [1000, 10000] }] },
  { name: 'Organic Leads', description: 'Leads from organic sources', type: 'dynamic' as SegmentType, rules: [{ field: 'leadSource', operator: 'equals' as const, value: 'organic' }] },
  { name: 'Paid Acquisition', description: 'Leads from paid ads', type: 'dynamic' as SegmentType, rules: [{ field: 'leadSource', operator: 'equals' as const, value: 'paid_ads' }] },
  { name: 'Referral Leads', description: 'Leads from referrals', type: 'dynamic' as SegmentType, rules: [{ field: 'leadSource', operator: 'equals' as const, value: 'referral' }] },
  { name: 'Social Media Leads', description: 'Leads from social media', type: 'dynamic' as SegmentType, rules: [{ field: 'leadSource', operator: 'equals' as const, value: 'social_media' }] },
  { name: 'Partner Leads', description: 'Leads from partners', type: 'dynamic' as SegmentType, rules: [{ field: 'leadSource', operator: 'equals' as const, value: 'partner' }] },
  { name: 'Email Leads', description: 'Leads from email campaigns', type: 'dynamic' as SegmentType, rules: [{ field: 'leadSource', operator: 'equals' as const, value: 'email' }] },
  { name: 'Direct Leads', description: 'Direct traffic leads', type: 'dynamic' as SegmentType, rules: [{ field: 'leadSource', operator: 'equals' as const, value: 'direct' }] },
  { name: 'Canadian Customers', description: 'Canada based customers', type: 'dynamic' as SegmentType, rules: [{ field: 'country', operator: 'equals' as const, value: 'Canada' }] },
  { name: 'UAE Customers', description: 'UAE based customers', type: 'dynamic' as SegmentType, rules: [{ field: 'country', operator: 'equals' as const, value: 'UAE' }] },
  { name: 'Texas Customers', description: 'Texas state customers', type: 'dynamic' as SegmentType, rules: [{ field: 'state', operator: 'equals' as const, value: 'TX' }] },
]

const creators = [
  'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Lee',
  'Robert Martinez', 'Amanda Wilson', 'Christopher Brown', 'Nicole Taylor', 'Daniel Garcia'
]

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function generateSegments(): Segment[] {
  return segmentDefinitions.map((def, i) => {
    const seed = i + 300
    const creator = creators[Math.floor(seededRandom(seed * 1) * creators.length)]
    const customerCount = Math.floor(seededRandom(seed * 2) * 5000) + 100
    
    const createdYear = 2023 + Math.floor(seededRandom(seed * 3) * 2)
    const createdMonth = Math.floor(seededRandom(seed * 4) * 12) + 1
    const createdDay = Math.floor(seededRandom(seed * 5) * 28) + 1
    const createdAt = `${createdYear}-${createdMonth.toString().padStart(2, '0')}-${createdDay.toString().padStart(2, '0')}`
    
    const updatedDaysAgo = Math.floor(seededRandom(seed * 6) * 30)
    const updatedDate = new Date()
    updatedDate.setDate(updatedDate.getDate() - updatedDaysAgo)
    
    return {
      id: `SEG-${(i + 1).toString().padStart(3, '0')}`,
      name: def.name,
      description: def.description,
      type: def.type,
      rules: def.rules,
      customerCount,
      createdAt,
      updatedAt: updatedDate.toISOString().split('T')[0],
      createdBy: creator,
    }
  })
}

export const segments = generateSegments()

export const segmentStats = {
  total: segments.length,
  dynamic: segments.filter(s => s.type === 'dynamic').length,
  static: segments.filter(s => s.type === 'static').length,
  smart: segments.filter(s => s.type === 'smart').length,
  totalCustomers: segments.reduce((sum, s) => sum + s.customerCount, 0),
  avgCustomersPerSegment: Math.round(segments.reduce((sum, s) => sum + s.customerCount, 0) / segments.length),
}
