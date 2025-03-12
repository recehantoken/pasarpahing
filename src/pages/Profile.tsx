
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { Header } from "@/components/layout/Header";

type ProfileData = {
  first_name: string | null;
  last_name: string | null;
};

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setProfile({
            first_name: data.first_name,
            last_name: data.last_name,
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          
          <Card>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
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
    </div>
  );
};

export default Profile;
