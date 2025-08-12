import { useAuth } from '@/contexts/AuthContext';

export const useUser = () => {
  const { user, profile, loading } = useAuth();
  
  return {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    isAuthenticated: !!user,
  };
};