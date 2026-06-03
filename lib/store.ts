import { create } from 'zustand'
import { Workspace } from '@/lib/types'

interface AppState {
  // Current workspace
  currentWorkspace: Workspace
  setWorkspace: (workspace: Workspace) => void
  
  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
  
  // Sidebar
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  
  // Search
  globalSearchOpen: boolean
  setGlobalSearchOpen: (open: boolean) => void
  globalSearchQuery: string
  setGlobalSearchQuery: (query: string) => void
  
  // Selection state for bulk actions
  selectedCustomers: string[]
  setSelectedCustomers: (ids: string[]) => void
  toggleCustomerSelection: (id: string) => void
  clearCustomerSelection: () => void
  
  selectedCampaigns: string[]
  setSelectedCampaigns: (ids: string[]) => void
  toggleCampaignSelection: (id: string) => void
  clearCampaignSelection: () => void
  
  selectedLeads: string[]
  setSelectedLeads: (ids: string[]) => void
  toggleLeadSelection: (id: string) => void
  clearLeadSelection: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // Workspace
  currentWorkspace: 'admin',
  setWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  
  // Theme
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  setTheme: (theme) => set({ theme }),
  
  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  
  // Search
  globalSearchOpen: false,
  setGlobalSearchOpen: (open) => set({ globalSearchOpen: open }),
  globalSearchQuery: '',
  setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
  
  // Customer selection
  selectedCustomers: [],
  setSelectedCustomers: (ids) => set({ selectedCustomers: ids }),
  toggleCustomerSelection: (id) => set((state) => ({
    selectedCustomers: state.selectedCustomers.includes(id)
      ? state.selectedCustomers.filter((i) => i !== id)
      : [...state.selectedCustomers, id],
  })),
  clearCustomerSelection: () => set({ selectedCustomers: [] }),
  
  // Campaign selection
  selectedCampaigns: [],
  setSelectedCampaigns: (ids) => set({ selectedCampaigns: ids }),
  toggleCampaignSelection: (id) => set((state) => ({
    selectedCampaigns: state.selectedCampaigns.includes(id)
      ? state.selectedCampaigns.filter((i) => i !== id)
      : [...state.selectedCampaigns, id],
  })),
  clearCampaignSelection: () => set({ selectedCampaigns: [] }),
  
  // Lead selection
  selectedLeads: [],
  setSelectedLeads: (ids) => set({ selectedLeads: ids }),
  toggleLeadSelection: (id) => set((state) => ({
    selectedLeads: state.selectedLeads.includes(id)
      ? state.selectedLeads.filter((i) => i !== id)
      : [...state.selectedLeads, id],
  })),
  clearLeadSelection: () => set({ selectedLeads: [] }),
}))
