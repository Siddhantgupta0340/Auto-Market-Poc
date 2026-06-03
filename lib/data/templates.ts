import { EmailTemplate, SmsTemplate, WhatsAppTemplate } from '@/lib/types'

const emailCategories = ['Welcome', 'Promotional', 'Transactional', 'Newsletter', 'Re-engagement', 'Onboarding', 'Notification', 'Survey']
const smsCategories = ['Promotional', 'Transactional', 'Reminder', 'Alert', 'Verification', 'Support']
const whatsappCategories = ['Welcome', 'Order Update', 'Support', 'Promotional', 'Notification', 'Booking']

const emailTemplateNames = [
  'Welcome to AutoMarket', 'Monthly Newsletter', 'Product Launch', 'Holiday Sale', 'Customer Appreciation',
  'Re-engagement Email', 'Birthday Offer', 'Abandoned Cart', 'Feature Update', 'Weekly Digest',
  'VIP Exclusive Offer', 'End of Season Sale', 'New Year Promotion', 'Flash Sale Alert', 'Loyalty Rewards',
  'Feedback Request', 'Webinar Invitation', 'Case Study Share', 'Industry Insights', 'Partner Announcement',
  'Account Update', 'Password Reset', 'Order Confirmation', 'Shipping Notification', 'Delivery Confirmation',
  'Review Request', 'Renewal Reminder', 'Trial Expiring', 'Upgrade Offer', 'Referral Program',
  'Survey Invitation', 'Thank You Note', 'Anniversary Email', 'Win-back Campaign', 'Cross-sell Email',
  'Upsell Opportunity', 'Event Invitation', 'Webinar Reminder', 'Product Tips', 'Best Practices Guide',
  'Seasonal Greeting', 'Company Update', 'Team Introduction', 'Success Story', 'Industry News',
  'Tutorial Email', 'Getting Started', 'Pro Tips', 'Feature Spotlight', 'Community Update'
]

const smsTemplateNames = [
  'Flash Sale SMS', 'Order Confirmation', 'Delivery Update', 'Appointment Reminder', 'Exclusive Offer',
  'Limited Time Deal', 'Welcome SMS', 'Feedback Request', 'Event Reminder', 'Restock Alert',
  'Price Drop Alert', 'VIP Access', 'Birthday SMS', 'Survey Request', 'Renewal Reminder',
  'Payment Confirmation', 'Shipping Update', 'Account Alert', 'Security Code', 'Verification OTP',
  'Promo Code SMS', 'Thank You SMS', 'Review Request', 'Referral SMS', 'Win-back SMS',
  'Trial Reminder', 'Upgrade SMS', 'Support Follow-up', 'Booking Confirmation', 'Schedule Change',
  'Waitlist Update', 'Back in Stock', 'New Arrival Alert', 'Sale Ending', 'Loyalty Points',
  'Reward Unlocked', 'Milestone SMS', 'Anniversary SMS', 'Holiday Greeting', 'Service Update',
  'Maintenance Alert', 'Feature Launch', 'Beta Invite', 'Community SMS', 'Contest Alert',
  'Winner Announcement', 'Coupon Expiring', 'Cart Reminder', 'Wishlist Alert', 'Price Match'
]

const whatsappTemplateNames = [
  'WhatsApp Welcome', 'Order Status', 'Support Follow-up', 'Product Catalog', 'Appointment Booking',
  'Payment Confirmation', 'Shipping Update', 'Newsletter', 'Promotional Message', 'Customer Service',
  'Feedback Collection', 'Event RSVP', 'Booking Reminder', 'Delivery Confirmation', 'Return Update',
  'Refund Status', 'Account Update', 'Security Alert', 'Password Reset', 'Two-Factor Code',
  'Welcome Series', 'Onboarding Guide', 'Tutorial Share', 'Tips & Tricks', 'Product Update',
  'Feature Announcement', 'Sale Alert', 'Flash Deal', 'VIP Access', 'Loyalty Reward',
  'Birthday Greeting', 'Anniversary Message', 'Holiday Wishes', 'Thank You Note', 'Review Request',
  'Survey Invite', 'Referral Invite', 'Win-back Message', 'Re-engagement', 'Trial Reminder',
  'Upgrade Offer', 'Renewal Notice', 'Expiry Alert', 'Payment Reminder', 'Invoice Share',
  'Receipt Send', 'Booking Confirm', 'Schedule Update', 'Waitlist Update', 'Stock Alert'
]

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function generateEmailTemplates(): EmailTemplate[] {
  return emailTemplateNames.map((name, i) => {
    const seed = i + 400
    const category = emailCategories[Math.floor(seededRandom(seed * 1) * emailCategories.length)]
    const usageCount = Math.floor(seededRandom(seed * 2) * 500) + 10
    
    const createdYear = 2023 + Math.floor(seededRandom(seed * 3) * 2)
    const createdMonth = Math.floor(seededRandom(seed * 4) * 12) + 1
    const createdDay = Math.floor(seededRandom(seed * 5) * 28) + 1
    const createdAt = `${createdYear}-${createdMonth.toString().padStart(2, '0')}-${createdDay.toString().padStart(2, '0')}`
    
    const updatedDaysAgo = Math.floor(seededRandom(seed * 6) * 30)
    const updatedDate = new Date()
    updatedDate.setDate(updatedDate.getDate() - updatedDaysAgo)
    
    return {
      id: `ET-${(i + 1).toString().padStart(3, '0')}`,
      name,
      subject: `${name} - Special Message for You`,
      previewText: `Check out this ${category.toLowerCase()} message from AutoMarket...`,
      content: `<html><body><h1>${name}</h1><p>This is a sample email template content for ${name}.</p></body></html>`,
      category,
      createdAt,
      updatedAt: updatedDate.toISOString().split('T')[0],
      usageCount,
    }
  })
}

function generateSmsTemplates(): SmsTemplate[] {
  return smsTemplateNames.map((name, i) => {
    const seed = i + 500
    const category = smsCategories[Math.floor(seededRandom(seed * 1) * smsCategories.length)]
    const usageCount = Math.floor(seededRandom(seed * 2) * 1000) + 50
    const content = `AutoMarket: ${name} - Your exclusive message. Reply STOP to opt out.`
    
    const createdYear = 2023 + Math.floor(seededRandom(seed * 3) * 2)
    const createdMonth = Math.floor(seededRandom(seed * 4) * 12) + 1
    const createdDay = Math.floor(seededRandom(seed * 5) * 28) + 1
    const createdAt = `${createdYear}-${createdMonth.toString().padStart(2, '0')}-${createdDay.toString().padStart(2, '0')}`
    
    return {
      id: `SMS-${(i + 1).toString().padStart(3, '0')}`,
      name,
      content,
      category,
      characterCount: content.length,
      createdAt,
      usageCount,
    }
  })
}

function generateWhatsAppTemplates(): WhatsAppTemplate[] {
  const statuses: WhatsAppTemplate['status'][] = ['approved', 'pending', 'rejected']
  
  return whatsappTemplateNames.map((name, i) => {
    const seed = i + 600
    const category = whatsappCategories[Math.floor(seededRandom(seed * 1) * whatsappCategories.length)]
    const status = statuses[Math.floor(seededRandom(seed * 2) * statuses.length)]
    const usageCount = status === 'approved' ? Math.floor(seededRandom(seed * 3) * 800) + 20 : 0
    
    const createdYear = 2023 + Math.floor(seededRandom(seed * 4) * 2)
    const createdMonth = Math.floor(seededRandom(seed * 5) * 12) + 1
    const createdDay = Math.floor(seededRandom(seed * 6) * 28) + 1
    const createdAt = `${createdYear}-${createdMonth.toString().padStart(2, '0')}-${createdDay.toString().padStart(2, '0')}`
    
    return {
      id: `WA-${(i + 1).toString().padStart(3, '0')}`,
      name,
      content: `Hello {{1}}! ${name} - Your message from AutoMarket. Thank you for being a valued customer.`,
      category,
      status,
      createdAt,
      usageCount,
    }
  })
}

export const emailTemplates = generateEmailTemplates()
export const smsTemplates = generateSmsTemplates()
export const whatsappTemplates = generateWhatsAppTemplates()

export const templateStats = {
  emailTotal: emailTemplates.length,
  smsTotal: smsTemplates.length,
  whatsappTotal: whatsappTemplates.length,
  whatsappApproved: whatsappTemplates.filter(t => t.status === 'approved').length,
  whatsappPending: whatsappTemplates.filter(t => t.status === 'pending').length,
  whatsappRejected: whatsappTemplates.filter(t => t.status === 'rejected').length,
  totalEmailUsage: emailTemplates.reduce((sum, t) => sum + t.usageCount, 0),
  totalSmsUsage: smsTemplates.reduce((sum, t) => sum + t.usageCount, 0),
  totalWhatsappUsage: whatsappTemplates.reduce((sum, t) => sum + t.usageCount, 0),
}
