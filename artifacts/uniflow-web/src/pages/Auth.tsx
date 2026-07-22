import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  UserCog, 
  User, 
  GraduationCap, 
  UserCheck, 
  ShieldAlert,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Auth() {
  const [_, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('admin');

  const roles = [
    { id: 'super', icon: ShieldAlert, label: 'Super Admin' },
    { id: 'admin', icon: UserCog, label: 'Administrateur' },
    { id: 'teacher', icon: UserCheck, label: 'Enseignant' },
    { id: 'delegate', icon: User, label: 'Délégué' },
    { id: 'student', icon: GraduationCap, label: 'Étudiant' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login delay
    setTimeout(() => {
      setLoading(false);
      setLocation('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex bg-background font-sans overflow-hidden">
      {/* Left side - Visual branding */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-sidebar to-sidebar-border/30 overflow-hidden flex-col justify-between p-12">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/25 rounded-full blur-[130px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/15 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 right-1/2 w-1/3 h-1/3 bg-primary/10 rounded-full blur-[100px]"></div>
        </div>
        
        {/* Floating cards animation to simulate dashboard feel */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute right-12 top-1/2 -translate-y-1/2 w-80 space-y-4 pointer-events-none z-10"
        >
          <div className="bg-card border border-border rounded-xl p-4 shadow-xl shadow-black/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><User size={20} /></div>
            <div>
              <div className="h-4 w-32 bg-muted rounded mb-2"></div>
              <div className="h-3 w-20 bg-muted/50 rounded"></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 shadow-xl shadow-black/5 flex items-center gap-4 translate-x-8">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent"><UserCheck size={20} /></div>
            <div>
              <div className="h-4 w-28 bg-muted rounded mb-2"></div>
              <div className="h-3 w-24 bg-muted/50 rounded"></div>
            </div>
          </div>
        </motion.div>

        <div className="relative z-20">
          <Link href="/" className="inline-flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg shadow-primary/30">U</div>
            <span className="font-heading font-bold text-2xl tracking-tight text-sidebar-foreground">UniFlow</span>
          </Link>
        </div>

        <div className="relative z-20 max-w-md">
          <h1 className="text-4xl font-heading font-extrabold text-sidebar-foreground mb-6 leading-tight">
            Gérez votre institution avec précision.
          </h1>
          <p className="text-sidebar-foreground/70 text-lg">
            La plateforme centralisée pour les étudiants, les enseignants et l'administration universitaire.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 bg-gradient-to-b from-background via-background to-muted/5 relative z-10">
        <div className="w-full max-w-md mx-auto">
          {/* Decorative element */}
          <div className="absolute top-8 right-8 w-20 h-20 bg-primary/5 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">U</div>
            <span className="font-heading font-bold text-xl tracking-tight">UniFlow</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-heading font-bold mb-2">Bienvenue</h2>
            <p className="text-muted-foreground">Connectez-vous à votre espace personnel.</p>
          </div>

          {/* Role Selector */}
          <div className="mb-8">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
              Je suis un...
            </Label>
            <div className="flex flex-wrap gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all flex-1 min-w-[80px]",
                    selectedRole === role.id 
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25 scale-[1.02]" 
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:bg-muted"
                  )}
                >
                  <role.icon size={20} />
                  <span className="text-[10px] font-bold">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="identifiant">Identifiant ou Email</Label>
              <Input 
                id="identifiant" 
                type="text" 
                placeholder="Ex: admin@uniflow.cm ou 21A001" 
                required 
                className="h-12 bg-card"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">Mot de passe oublié ?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                className="h-12 bg-card"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-bold mt-4 shadow-lg shadow-primary/20" 
              disabled={loading}
              data-testid="btn-submit-login"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Connexion en cours...</>
              ) : (
                <>Se connecter <ArrowRight className="ml-2 h-5 w-5" /></>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Problème de connexion ? <a href="#" className="text-primary font-medium hover:underline">Contacter le support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
