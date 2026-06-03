import { Customer, CustomerStatus, LeadSource } from '@/lib/types'

const firstNames = [
  'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth',
  'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
  'Christopher', 'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra',
  'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Timothy', 'Deborah',
  'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia',
  'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Angela', 'Eric', 'Shirley', 'Jonathan', 'Anna',
  'Stephen', 'Brenda', 'Larry', 'Pamela', 'Justin', 'Emma', 'Scott', 'Nicole', 'Brandon', 'Helen',
  'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Raymond', 'Christine', 'Gregory', 'Debra', 'Frank', 'Rachel',
  'Alexander', 'Carolyn', 'Patrick', 'Janet', 'Jack', 'Catherine', 'Dennis', 'Maria', 'Jerry', 'Heather'
]

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
  'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'
]

const cities = [
  { city: 'New York', state: 'NY', country: 'United States' },
  { city: 'Los Angeles', state: 'CA', country: 'United States' },
  { city: 'Chicago', state: 'IL', country: 'United States' },
  { city: 'Houston', state: 'TX', country: 'United States' },
  { city: 'Phoenix', state: 'AZ', country: 'United States' },
  { city: 'Philadelphia', state: 'PA', country: 'United States' },
  { city: 'San Antonio', state: 'TX', country: 'United States' },
  { city: 'San Diego', state: 'CA', country: 'United States' },
  { city: 'Dallas', state: 'TX', country: 'United States' },
  { city: 'San Jose', state: 'CA', country: 'United States' },
  { city: 'Austin', state: 'TX', country: 'United States' },
  { city: 'Jacksonville', state: 'FL', country: 'United States' },
  { city: 'Fort Worth', state: 'TX', country: 'United States' },
  { city: 'Columbus', state: 'OH', country: 'United States' },
  { city: 'Charlotte', state: 'NC', country: 'United States' },
  { city: 'Seattle', state: 'WA', country: 'United States' },
  { city: 'Denver', state: 'CO', country: 'United States' },
  { city: 'Boston', state: 'MA', country: 'United States' },
  { city: 'Nashville', state: 'TN', country: 'United States' },
  { city: 'Detroit', state: 'MI', country: 'United States' },
  { city: 'London', state: 'England', country: 'United Kingdom' },
  { city: 'Manchester', state: 'England', country: 'United Kingdom' },
  { city: 'Birmingham', state: 'England', country: 'United Kingdom' },
  { city: 'Toronto', state: 'Ontario', country: 'Canada' },
  { city: 'Vancouver', state: 'BC', country: 'Canada' },
  { city: 'Montreal', state: 'Quebec', country: 'Canada' },
  { city: 'Sydney', state: 'NSW', country: 'Australia' },
  { city: 'Melbourne', state: 'VIC', country: 'Australia' },
  { city: 'Berlin', state: 'Berlin', country: 'Germany' },
  { city: 'Munich', state: 'Bavaria', country: 'Germany' },
  { city: 'Paris', state: 'Ile-de-France', country: 'France' },
  { city: 'Amsterdam', state: 'North Holland', country: 'Netherlands' },
  { city: 'Singapore', state: 'Singapore', country: 'Singapore' },
  { city: 'Tokyo', state: 'Tokyo', country: 'Japan' },
  { city: 'Dubai', state: 'Dubai', country: 'UAE' },
]

const segments = [
  'High Value', 'Enterprise', 'SMB', 'Startup', 'E-commerce', 'SaaS', 'Healthcare', 
  'Finance', 'Education', 'Retail', 'Technology', 'Manufacturing', 'Media', 'Travel',
  'Real Estate', 'Consulting', 'Non-Profit', 'Government', 'Hospitality', 'Automotive'
]

const tags = [
  'VIP', 'Newsletter', 'Product Updates', 'Promotions', 'Webinar Attendee', 
  'Free Trial', 'Paid User', 'Churned', 'Re-engaged', 'Referrer',
  'Mobile User', 'Desktop User', 'Power User', 'Inactive', 'New User'
]

const statuses: CustomerStatus[] = ['active', 'inactive', 'lead', 'prospect', 'churned']
const leadSources: LeadSource[] = ['organic', 'paid_ads', 'referral', 'social_media', 'email', 'direct', 'partner']

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function generateCustomers(count: number): Customer[] {
  const customers: Customer[] = []
  
  for (let i = 0; i < count; i++) {
    const seed = i + 1
    const firstName = firstNames[Math.floor(seededRandom(seed * 1) * firstNames.length)]
    const lastName = lastNames[Math.floor(seededRandom(seed * 2) * lastNames.length)]
    const location = cities[Math.floor(seededRandom(seed * 3) * cities.length)]
    const status = statuses[Math.floor(seededRandom(seed * 4) * statuses.length)]
    const leadSource = leadSources[Math.floor(seededRandom(seed * 5) * leadSources.length)]
    const segment = segments[Math.floor(seededRandom(seed * 6) * segments.length)]
    
    const customerTags: string[] = []
    const tagCount = Math.floor(seededRandom(seed * 7) * 4) + 1
    for (let j = 0; j < tagCount; j++) {
      const tag = tags[Math.floor(seededRandom(seed * 8 + j) * tags.length)]
      if (!customerTags.includes(tag)) customerTags.push(tag)
    }
    
    const signupYear = 2020 + Math.floor(seededRandom(seed * 9) * 5)
    const signupMonth = Math.floor(seededRandom(seed * 10) * 12) + 1
    const signupDay = Math.floor(seededRandom(seed * 11) * 28) + 1
    const signupDate = `${signupYear}-${signupMonth.toString().padStart(2, '0')}-${signupDay.toString().padStart(2, '0')}`
    
    const lastActivityDaysAgo = Math.floor(seededRandom(seed * 12) * 90)
    const lastActivityDate = new Date()
    lastActivityDate.setDate(lastActivityDate.getDate() - lastActivityDaysAgo)
    
    const lifetimeValue = Math.floor(seededRandom(seed * 13) * 50000) + 100
    const revenueGenerated = Math.floor(lifetimeValue * (0.5 + seededRandom(seed * 14) * 0.8))
    const campaignCount = Math.floor(seededRandom(seed * 15) * 25) + 1
    
    customers.push({
      id: `CUS-${(i + 1).toString().padStart(5, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(seededRandom(seed * 16) * 100)}@example.com`,
      phone: `+1${Math.floor(seededRandom(seed * 17) * 900 + 100)}${Math.floor(seededRandom(seed * 18) * 900 + 100)}${Math.floor(seededRandom(seed * 19) * 9000 + 1000)}`,
      city: location.city,
      state: location.state,
      country: location.country,
      leadSource,
      status,
      segment,
      lifetimeValue,
      lastActivity: lastActivityDate.toISOString().split('T')[0],
      signupDate,
      campaignCount,
      revenueGenerated,
      tags: customerTags,
    })
  }
  
  return customers
}

export const customers = generateCustomers(1000)

export const customerStats = {
  total: customers.length,
  active: customers.filter(c => c.status === 'active').length,
  inactive: customers.filter(c => c.status === 'inactive').length,
  leads: customers.filter(c => c.status === 'lead').length,
  prospects: customers.filter(c => c.status === 'prospect').length,
  churned: customers.filter(c => c.status === 'churned').length,
  totalRevenue: customers.reduce((sum, c) => sum + c.revenueGenerated, 0),
  avgLifetimeValue: Math.round(customers.reduce((sum, c) => sum + c.lifetimeValue, 0) / customers.length),
}
