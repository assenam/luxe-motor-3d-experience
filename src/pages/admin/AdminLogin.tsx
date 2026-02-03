import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, Car } from 'lucide-react';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().trim().email({ message: "Email invalide" }).max(255, { message: "Email trop long" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }).max(100, { message: "Mot de passe trop long" })
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, signIn, isLoading: authLoading, isAdmin, checkAdminStatus } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (user && !authLoading) {
      checkAdminStatus().then((isAdminUser) => {
        if (isAdminUser) {
          navigate('/admin');
        } else {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les droits administrateur.",
            variant: "destructive"
          });
          navigate('/');
        }
      });
    }
  }, [user, authLoading, navigate, checkAdminStatus, toast]);

  const validateForm = () => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    const { error } = await signIn(email.trim(), password);
    setIsLoading(false);
    
    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message === 'Invalid login credentials' 
          ? "Email ou mot de passe incorrect" 
          : error.message,
        variant: "destructive"
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            <CardTitle className="text-2xl font-bold">Administration</CardTitle>
          </div>
          <CardDescription>
            Espace réservé aux administrateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email administrateur</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Mot de passe</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Accéder à l'administration
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button variant="link" onClick={() => navigate('/')}>
              Retour au site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
