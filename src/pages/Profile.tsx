import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { Header } from "@/components/layout/Header";
import { ProfilePictureUpload } from "@/components/ProfilePictureUpload";
import { LogOut } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

type ProfileData = {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    avatar_url: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setProfile({
            first_name: data.first_name,
            last_name: data.last_name,
            avatar_url: data.avatar_url
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error loading profile",
          description: error.message || "An error occurred while loading your profile",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: error.message || "An error occurred while updating your profile",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (url: string) => {
    setProfile((prev) => ({
      ...prev,
      avatar_url: url
    }));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center text-foreground">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">My Profile</h1>
            <Button 
              variant="outline" 
              className="border-primary/20 text-primary hover:bg-primary/10" 
              onClick={handleSignOut}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
          
          <Card className="border border-primary/20 shadow-lg mb-6 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                Upload a picture to personalize your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              {user && (
                <ProfilePictureUpload
                  user={user}
                  avatarUrl={profile.avatar_url}
                  onAvatarChange={handleAvatarChange}
                />
              )}
            </CardContent>
          </Card>
          
          <Card className="border border-primary/20 shadow-lg mb-6 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal information and manage your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={profile.first_name || ""}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="border-primary/20 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={profile.last_name || ""}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="border-primary/20 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-muted/70 border-primary/20"
                />
                <p className="text-sm text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-primary/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
              <CardDescription>
                Customize the appearance of your account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark mode
                </p>
              </div>
              <ThemeSwitcher />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
