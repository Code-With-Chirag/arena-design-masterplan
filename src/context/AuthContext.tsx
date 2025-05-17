import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase, UserProfile, getUserProfile } from '../lib/supabase'

// Define the context type
interface AuthContextType {
  session: Session | null
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, role: 'builder' | 'sponsor') => Promise<{ error: any | null }>
  signIn: (email: string, password: string) => Promise<{ error: any | null }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: any | null }>
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode
}

// AuthProvider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize the auth state when the component mounts
  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      // Fetch user profile if user is authenticated
      if (session?.user) {
        getUserProfile(session.user.id).then(profile => {
          setProfile(profile)
        })
      }
      
      setLoading(false)
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      // Fetch user profile if user is authenticated
      if (session?.user) {
        getUserProfile(session.user.id).then(profile => {
          setProfile(profile)
        })
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Sign up a new user
  const signUp = async (email: string, password: string, fullName: string, role: 'builder' | 'sponsor') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      })
      
      if (error) {
        return { error }
      }
      
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Sign in an existing user
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        return { error }
      }
      
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Sign out the current user
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  // Update user profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) {
      return { error: new Error('User not authenticated') }
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id)
      
      if (error) {
        return { error }
      }
      
      // Update local profile state
      setProfile(prev => prev ? { ...prev, ...data } : null)
      
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Provide the auth context to children components
  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}
