import { Lead, LeadSource } from '@/lib/types'

const companies = [
  'TechCorp Inc', 'Global Solutions', 'InnovateTech', 'Digital Dynamics', 'CloudFirst',
  'DataStream Labs', 'NextGen Systems', 'Apex Industries', 'Velocity Partners', 'Summit Group',
  'Pioneer Software', 'Quantum Analytics', 'Elite Enterprises', 'Fusion Tech', 'Stellar Solutions',
  'Bright Ideas Co', 'Core Systems', 'Prime Digital', 'Vector Labs', 'Atlas Corp',
  'Horizon Group', 'Meridian Tech', 'Pinnacle Solutions', 'Catalyst Corp', 'Genesis Labs',
  'Omega Systems', 'Nova Industries', 'Zenith Partners', 'Matrix Digital', 'Synergy Tech',
  'Beacon Analytics', 'Nexus Corp', 'Elevate Systems', 'Vanguard Tech', 'Momentum Group',
  'Frontier Labs', 'Precision Corp', 'Insight Systems', 'Dynamic Solutions', 'Ascend Tech'
]

const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery', 'Jamie', 'Drew',
  'Sam', 'Blake', 'Cameron', 'Skyler', 'Reese', 'Parker', 'Finley', 'Sage', 'River', 'Rowan'
]

const lastNames = [
  'Anderson', 'Baker', 'Chen', 'Davis', 'Evans', 'Foster', 'Garcia', 'Hughes', 'Irwin', 'Johnson',
  'Kelly', 'Lee', 'Martinez', 'Nelson', 'Owens', 'Patel', 'Quinn', 'Roberts', 'Smith', 'Thompson'
]

const assignees = [
  'John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'Robert Wilson',
  'Jessica Brown', 'David Lee', 'Amanda Garcia', 'Christopher Martinez', 'Nicole Taylor'
]

const leadStatuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost']
const leadSources: LeadSource[] = ['organic', 'paid_ads', 'referral', 'social_media', 'email', 'direct', 'partner']

const notes = [
  'Interested in enterprise plan. Follow up next week.',
  'Requested demo. Schedule for Thursday.',
  'Budget approved. Moving to proposal stage.',
  'Needs to discuss with team. Will respond in 2 weeks.',
  'Very interested. High priority lead.',
  'Comparing with competitors. Send comparison doc.',
  'Asked about custom integrations.',
  'Requested case studies from similar industry.',
  'Attending upcoming webinar.',
  'Previous customer returning. VIP treatment.',
  'Referral from existing client.',
  'Downloaded whitepaper. Nurture campaign.',
  'Opened 5 emails this month. Ready for contact.',
  'Visited pricing page multiple times.',
  'Signed up for free trial.'
]

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function generateLeads(count: number): Lead[] {
  const leads: Lead[] = []
  
  for (let i = 0; i < count; i++) {
    const seed = i + 200
    const firstName = firstNames[Math.floor(seededRandom(seed * 1) * firstNames.length)]
    const lastName = lastNames[Math.floor(seededRandom(seed * 2) * lastNames.length)]
    const company = companies[Math.floor(seededRandom(seed * 3) * companies.length)]
    const status = leadStatuses[Math.floor(seededRandom(seed * 4) * leadStatuses.length)]
    const source = leadSources[Math.floor(seededRandom(seed * 5) * leadSources.length)]
    const assignee = assignees[Math.floor(seededRandom(seed * 6) * assignees.length)]
    const note = notes[Math.floor(seededRandom(seed * 7) * notes.length)]
    
    const score = Math.floor(seededRandom(seed * 8) * 100) + 1
    const value = Math.floor(seededRandom(seed * 9) * 100000) + 5000
    
    const createdYear = 2023 + Math.floor(seededRandom(seed * 10) * 2)
    const createdMonth = Math.floor(seededRandom(seed * 11) * 12) + 1
    const createdDay = Math.floor(seededRandom(seed * 12) * 28) + 1
    const createdAt = `${createdYear}-${createdMonth.toString().padStart(2, '0')}-${createdDay.toString().padStart(2, '0')}`
    
    const lastContactDaysAgo = Math.floor(seededRandom(seed * 13) * 30)
    const lastContactDate = new Date()
    lastContactDate.setDate(lastContactDate.getDate() - lastContactDaysAgo)
    
    leads.push({
      id: `LEAD-${(i + 1).toString().padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1${Math.floor(seededRandom(seed * 14) * 900 + 100)}${Math.floor(seededRandom(seed * 15) * 900 + 100)}${Math.floor(seededRandom(seed * 16) * 9000 + 1000)}`,
      company,
      source,
      status,
      score,
      value,
      assignedTo: assignee,
      createdAt,
      lastContactAt: lastContactDate.toISOString().split('T')[0],
      notes: note,
    })
  }
  
  return leads
}

export const leads = generateLeads(500)

export const leadStats = {
  total: leads.length,
  new: leads.filter(l => l.status === 'new').length,
  contacted: leads.filter(l => l.status === 'contacted').length,
  qualified: leads.filter(l => l.status === 'qualified').length,
  proposal: leads.filter(l => l.status === 'proposal').length,
  negotiation: leads.filter(l => l.status === 'negotiation').length,
  won: leads.filter(l => l.status === 'won').length,
  lost: leads.filter(l => l.status === 'lost').length,
  totalValue: leads.reduce((sum, l) => sum + l.value, 0),
  avgScore: Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length),
  conversionRate: ((leads.filter(l => l.status === 'won').length / leads.length) * 100).toFixed(1),
}
