import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { loginAdmin, isAdminAuthenticated } from '@/lib/adminAuth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAdminAuthenticated()) {
    navigate('/admin', { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple demo credentials
    const validEmail = 'admin@rentanybus.com';
    const validPassword = 'admin123';

    const isValid = email.trim().toLowerCase() === validEmail && password === validPassword;

    await new Promise((resolve) => setTimeout(resolve, 600));

    setLoading(false);

    if (!isValid) {
      toast({
        title: 'Login failed',
        description: 'Invalid admin credentials. Try admin@rentanybus.com / admin123',
        variant: 'destructive',
      });
      return;
    }

    loginAdmin();
    toast({
      title: 'Welcome back',
      description: 'You are now logged in to the admin panel.',
    });
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">RentAnyBus</p>
            <h1 className="text-lg md:text-xl font-semibold">Admin Login</h1>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Sign in to manage inquiries, leads and site content. For demo, use{' '}
          <span className="font-mono text-foreground">admin@rentanybus.com</span> /{' '}
          <span className="font-mono text-foreground">admin123</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@rentanybus.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-4 text-[11px] text-muted-foreground text-center">
          This login is for demonstration only and stores auth state in your browser.
        </p>
      </div>
    </div>
  );
}



