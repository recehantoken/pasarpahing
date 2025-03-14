import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { first_name?: string; last_name?: string; wallet_address?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithMetaMask: () => Promise<void>;
  connectWallet: (userId: string) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error signing in",
          description: error.message,
        });
        throw error;
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: error.message || "An error occurred during sign in",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata?: { first_name?: string; last_name?: string; wallet_address?: string }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error signing up",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Successfully signed up",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: error.message || "An error occurred during sign up",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "Error signing out",
          description: error.message,
        });
        throw error;
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message || "An error occurred during sign out",
      });
      throw error;
    }
  };

  const connectWallet = async (userId: string): Promise<string | null> => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        toast({
          variant: "destructive",
          title: "MetaMask not detected",
          description: "Please install MetaMask to connect your wallet",
        });
        return null;
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];

      if (userId) {
        // Update the user's profile with their wallet address
        const { error } = await supabase
          .from('profiles')
          .update({ wallet_address: walletAddress })
          .eq('id', userId);

        if (error) {
          toast({
            variant: "destructive",
            title: "Error saving wallet address",
            description: error.message,
          });
          return null;
        }

        toast({
          title: "Wallet connected",
          description: `Connected to ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`,
        });
      }

      return walletAddress;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error connecting wallet",
        description: error.message || "An error occurred while connecting to MetaMask",
      });
      return null;
    }
  };

  const signInWithMetaMask = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        toast({
          variant: "destructive",
          title: "MetaMask not detected",
          description: "Please install MetaMask to sign in",
        });
        return;
      }

      setIsLoading(true);

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      // Request the user to sign a message to verify ownership of address
      const message = `Sign this message to verify your ownership of this wallet address: ${address}`;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      // Sign in with custom token flow (using wallets)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${address.toLowerCase()}@metamask.auth`,
        password: signature.substring(0, 20), // Using part of the signature as password
      });

      if (error && error.message.includes('Invalid login credentials')) {
        // User doesn't exist, sign them up
        await signUp(
          `${address.toLowerCase()}@metamask.auth`, 
          signature.substring(0, 20), 
          { wallet_address: address }
        );
        
        // Try signing in again
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: `${address.toLowerCase()}@metamask.auth`,
          password: signature.substring(0, 20),
        });
        
        if (signInError) throw signInError;
      } else if (error) {
        throw error;
      }

      toast({
        title: "Signed in with MetaMask",
        description: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      });
    } catch (error: any) {
      console.error("MetaMask authentication error:", error);
      toast({
        variant: "destructive",
        title: "MetaMask authentication error",
        description: error.message || "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      isLoading, 
      signIn, 
      signUp, 
      signOut, 
      signInWithMetaMask,
      connectWallet
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
