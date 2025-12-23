
import React from 'react';
import { Card, Button } from '../components/UI';
import { Car, Heart, Shield, ArrowRight, Clock } from 'lucide-react';
import { InsuranceType } from '../types';

interface Props {
  t: any;
  navigate: (view: string, props?: any) => void;
}

export const CustomerHome: React.FC<Props> = ({ t, navigate }) => {
  const types: { id: InsuranceType; label: string; icon: any; color: string }[] = [
    { id: 'motor', label: t.motor, icon: Car, color: 'bg-blue-500' },
    { id: 'medical', label: t.medical, icon: Heart, color: 'bg-red-500' },
    { id: 'general', label: t.general, icon: Shield, color: 'bg-green-500' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-1">{t.welcome}</h2>
        <p className="text-neutral-500 text-sm">Secure your future with just a few taps.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {types.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => navigate('quote-wizard', { type: type.id })}
              className="flex items-center gap-4 p-5 bg-white rounded-card shadow-sm border border-neutral-100 hover:border-primary transition-all text-left"
            >
              <div className={`${type.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{type.label}</h3>
                <p className="text-xs text-neutral-400">Quotes starting from 250 SAR</p>
              </div>
              <ArrowRight size={20} className="text-neutral-300 rtl:rotate-180" />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Clock size={20} className="text-primary" />
          Expiring Soon
        </h3>
        <Card className="border-l-4 border-l-warning">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-neutral-500 font-medium">Motor Insurance - Toyota Camry</p>
              <h4 className="font-bold">Expires in 12 days</h4>
            </div>
            <span className="text-xs font-bold text-warning">Action Required</span>
          </div>
          <Button variant="outline" fullWidth className="h-9 text-xs" onClick={() => navigate('policies')}>
            Renew Now
          </Button>
        </Card>
      </div>

      <div className="bg-primary/5 p-6 rounded-card border border-primary/10 flex items-center gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-primary mb-1">Refer a friend!</h4>
          <p className="text-sm text-primary/70">Get 50 SAR discount on your next renewal when you invite a friend to Tameen Now.</p>
        </div>
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-sm font-bold text-xl">
          🎁
        </div>
      </div>
    </div>
  );
};
