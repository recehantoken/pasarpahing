import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEthereum } from "react-icons/fa";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import ReCAPTCHA from "react-google-recaptcha";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { signIn, signUp, signInWithMetaMask, session } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  if (session) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast({
        variant: "destructive",
        title: "Verification Required",
        description: "Please complete the reCAPTCHA verification",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, { first_name: firstName, last_name: lastName });
        toast({
          title: "Account created",
          description: "Please check your email to verify your account",
        });
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message || "Could not sign in with Google",
      });
      setIsLoading(false);
    }
  };

  const handleMetaMaskSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithMetaMask();
    } catch (error: any) {
      console.error("MetaMask sign in error:", error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message || "Could not sign in with MetaMask",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  return (
    <div className="min-h-screen flex flex-col pt-16"> {/* Added pt-16 to offset header */}
      <Header />
      
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-15" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5A2B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md relative z-10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {isSignUp ? t('auth.createAccount') : t('auth.signIn')}
            </CardTitle>
            <CardDescription>
              {isSignUp
                ? t('common.signup')
                : t('auth.dontHaveAccount') + " " + t('auth.signup').toLowerCase() + " now!"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FcGoogle className="h-5 w-5" />
                  Google
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleMetaMaskSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FaEthereum className="h-5 w-5 text-orange-500" />
                  MetaMask
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{t('auth.orEmail')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('auth.firstName')}</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={t('auth.firstName')}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('auth.lastName')}</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder={t('auth.lastName')}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}
              
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey="6LeepfgqAAAAACl2LwBYiWy-a4xbXv60-qUy5cnh"
                  onChange={onCaptchaChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading || !captchaVerified}>
                {isLoading ? t('common.loading') : isSignUp ? t('auth.signup') : t('auth.login')}
              </Button>
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
              >
                {isSignUp
                  ? t('auth.alreadyHaveAccount')
                  : t('auth.dontHaveAccount')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;