
import React from 'react';
import { Card, Button } from '../components/UI';
import { User, Globe, Shield, LogOut, ChevronRight, RefreshCw } from 'lucide-react';
import { Language, UserRole } from '../types';

interface Props {
  t: any;
  lang: Language;
  setLang: (l: Language) => void;
  setRole: (r: UserRole) => void;
  role: UserRole;
}

export const ProfileView: React.FC<Props> = ({ t, lang, setLang, setRole, role }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 py-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <User size={40} />
        </div>
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-neutral-500 text-sm">john.doe@example.com</p>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="p-0 overflow-hidden">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-3">
               <div className="p-2 bg-neutral-100 rounded-lg text-neutral-500"><Globe size={18}/></div>
               <span className="text-sm font-medium">{t.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-bold">{lang === 'en' ? 'Arabic' : 'English'}</span>
              <ChevronRight size={16} className="text-neutral-300 rtl:rotate-180" />
            </div>
          </button>
          
          <button 
            onClick={() => {
              setRole(role === 'customer' ? 'agent' : 'customer');
              window.scrollTo(0, 0);
            }}
            className="w-full flex items-center justify-between p-4 border-t border-neutral-100 hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-3">
               <div className="p-2 bg-neutral-100 rounded-lg text-neutral-500"><RefreshCw size={18}/></div>
               <span className="text-sm font-medium">{t.switchRole}</span>
            </div>
            <ChevronRight size={16} className="text-neutral-300 rtl:rotate-180" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-neutral-100 rounded-lg text-neutral-500"><Shield size={18}/></div>
               <span className="text-sm font-medium">Security & Privacy</span>
            </div>
            <ChevronRight size={16} className="text-neutral-300 rtl:rotate-180" />
          </button>
        </Card>

        <Button variant="ghost" fullWidth className="text-error hover:bg-error/5 border border-error/10">
          <LogOut size={18} />
          {t.logout}
        </Button>
      </div>

      <div className="text-center text-[10px] text-neutral-400 font-medium">
        Tameen Now Enterprise Edition • v1.4.2 (Stable)
      </div>
    </div>
  );
};
