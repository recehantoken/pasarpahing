
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "lucide-react";

type UserProfile = {
  id: string;
  email?: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  wallet_address: string | null;
};

export const AdminUsers = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Get all profiles from the profiles table
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*');
        
        if (profilesError) throw profilesError;
        
        // For each profile, try to get the user's email
        const usersWithEmail = await Promise.all(
          (profiles || []).map(async (profile) => {
            try {
              // Call the edge function directly instead of using rpc
              const response = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get_user_email`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${supabase.auth.getSession().then(res => res.data.session?.access_token)}`
                  },
                  body: JSON.stringify({ user_id: profile.id })
                }
              );
              
              if (!response.ok) {
                throw new Error('Failed to fetch user email');
              }
              
              const userData = await response.json();
              
              return {
                ...profile,
                email: userData && userData.email ? userData.email : `User ${profile.id.slice(0, 8)}...`
              };
            } catch (error) {
              console.error("Error fetching user email:", error);
              return {
                ...profile,
                email: `User ${profile.id.slice(0, 8)}...`
              };
            }
          })
        );
        
        setUsers(usersWithEmail);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load users data.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [toast]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="flex justify-center">
            <p>{t('common.loading')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('admin.users')}</h2>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-primary" />
                        <span>
                          {user.first_name || ''} {user.last_name || ''}
                          {!user.first_name && !user.last_name && 'No name'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email || 'No email'}</TableCell>
                    <TableCell>
                      {user.wallet_address ? 
                        `${user.wallet_address.substring(0, 6)}...${user.wallet_address.substring(user.wallet_address.length - 4)}` : 
                        'Not connected'}
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
