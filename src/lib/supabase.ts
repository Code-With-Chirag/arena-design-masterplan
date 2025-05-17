import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for user profiles
export type UserRole = 'builder' | 'sponsor'

export interface UserProfile {
  id: string
  updated_at: string
  full_name: string
  email: string
  role: UserRole
  portfolio_link?: string
  company_name?: string
}

// Types for challenges
export interface DbChallenge {
  id: string
  created_at: string
  sponsor_id: string
  title: string
  description: string
  requirements: string
  deadline: string
  status: string
  difficulty?: string
  logo?: string
  prize?: string
  category?: string
  requirements_array?: any[]
  evaluation_array?: any[]
  resources?: any[]
}

// Type for challenge submissions
export interface DbSubmission {
  id: string
  created_at: string
  challenge_id: string
  builder_id: string
  project_link: string
  notes?: string
  status: 'submitted' | 'under_review' | 'evaluated'
  feedback?: string
  score?: number
}

// Helper function to get user profile
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
    
    return data as UserProfile
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

// Challenge CRUD functions

// Get all challenges
export async function getAllChallenges() {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching challenges:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching challenges:', error)
    return []
  }
}

// Get challenges created by a specific sponsor
export async function getChallengesBySponsor(sponsorId: string) {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('sponsor_id', sponsorId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching sponsor challenges:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching sponsor challenges:', error)
    return []
  }
}

// Get a specific challenge by ID
export async function getChallengeById(challengeId: string) {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('*, profiles(full_name)')
      .eq('id', challengeId)
      .single()
    
    if (error) {
      console.error('Error fetching challenge:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching challenge:', error)
    return null
  }
}

// Create a new challenge
export async function createChallenge(challenge: Omit<DbChallenge, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .insert(challenge)
      .select()
    
    if (error) {
      console.error('Error creating challenge:', error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error('Error creating challenge:', error)
    return null
  }
}

// Update an existing challenge
export async function updateChallenge(challengeId: string, updates: Partial<DbChallenge>) {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .update(updates)
      .eq('id', challengeId)
      .select()
    
    if (error) {
      console.error('Error updating challenge:', error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error('Error updating challenge:', error)
    return null
  }
}

// Delete a challenge
export async function deleteChallenge(challengeId: string) {
  try {
    const { error } = await supabase
      .from('challenges')
      .delete()
      .eq('id', challengeId)
    
    if (error) {
      console.error('Error deleting challenge:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error deleting challenge:', error)
    return false
  }
}

// Submission functions

// Create a submission
export async function createSubmission(submission: Omit<DbSubmission, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .insert(submission)
      .select()
    
    if (error) {
      console.error('Error creating submission:', error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error('Error creating submission:', error)
    return null
  }
}

// Get submissions for a challenge
export async function getSubmissionsForChallenge(challengeId: string) {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*, profiles(full_name)')
      .eq('challenge_id', challengeId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching submissions:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return []
  }
}

// Get submissions by a builder
export async function getSubmissionsByBuilder(builderId: string) {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*, challenges(title, deadline, status)')
      .eq('builder_id', builderId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching builder submissions:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching builder submissions:', error)
    return []
  }
}
