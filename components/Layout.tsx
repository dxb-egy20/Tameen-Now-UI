
import React from 'react';
import { UserRole, Language } from '../types';
import { Home, ClipboardList, User, Bell, PlusCircle, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  t: any;
  role: UserRole;
  currentView: string;
  navigate: (view: string) => void;
  lang: Language;
}

export const Layout: React.FC<LayoutProps> = ({ children, t, role, currentView, navigate, lang }) => {
  const isRtl = lang === 'ar';

  const navItems = role === 'customer' ? [
    { id: 'home', label: t.home || 'Home', icon: Home },
    { id: 'policies', label: t.myPolicies, icon: ClipboardList },
    { id: 'notifications', label: t.notifications, icon: Bell },
    { id: 'profile', label: t.profile, icon: User },
  ] : [
    { id: 'home', label: t.home || 'Dashboard', icon: LayoutDashboard },
    { id: 'inquiries', label: 'Inquiries', icon: ClipboardList },
    { id: 'inquiry-flow', label: 'New', icon: PlusCircle },
    { id: 'profile', label: t.profile, icon: User },
  ];

  return (
    <div className={`min-h-screen pb-24 flex flex-col ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-100 px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-xs">TN</div>
          {t.appName}
        </h1>
        <div className="flex items-center gap-4">
           <div className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary uppercase">
             {role === 'customer' ? t.customerMode : t.agentMode}
           </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 px-6 py-3 flex justify-between items-center shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary scale-110' : 'text-neutral-400'}`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
