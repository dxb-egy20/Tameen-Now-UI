
import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { CheckCircle2, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';

interface Props {
  t: any;
  navigate: (view: string) => void;
  quote: any;
}

export const PaymentFlow: React.FC<Props> = ({ t, navigate, quote }) => {
  const [state, setState] = useState<'selection' | 'processing' | 'success'>('selection');

  const handlePay = () => {
    setState('processing');
    setTimeout(() => {
      setState('success');
    }, 2500);
  };

  if (state === 'processing') {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <div>
          <h2 className="text-xl font-bold">{t.processing}</h2>
          <p className="text-neutral-500">Securely validating your transaction...</p>
        </div>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center gap-6 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center text-success">
          <CheckCircle2 size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-success">{t.success}</h2>
          <p className="text-neutral-500">{t.paymentConfirmed}</p>
        </div>
        <Card className="w-full">
           <p className="text-sm font-medium mb-1">Policy Number</p>
           <p className="text-xl font-mono font-bold tracking-widest">TN-88291-MX</p>
        </Card>
        <div className="flex flex-col gap-3 w-full">
          <Button fullWidth variant="primary" onClick={() => navigate('policies')}>
            {t.myPolicies}
          </Button>
          <Button fullWidth variant="ghost">
            {t.downloadPolicy}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('quote-wizard')} className="p-2 -ml-2 text-neutral-500">
          <ArrowLeft size={24} className="rtl:rotate-180" />
        </button>
        <h2 className="text-xl font-bold">{t.paymentMethod}</h2>
      </div>

      <Card>
        <div className="flex justify-between items-center">
          <span className="font-medium text-neutral-500">Amount Due</span>
          <span className="text-2xl font-bold text-primary">1,250 SAR</span>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 border-2 border-primary bg-primary/5 rounded-card flex flex-col items-center gap-2">
            <span className="text-2xl">💳</span>
            <span className="text-xs font-bold uppercase">Credit Card</span>
          </button>
          <button className="p-4 border border-neutral-200 rounded-card flex flex-col items-center gap-2 grayscale">
            <span className="text-2xl">🍎</span>
            <span className="text-xs font-bold uppercase">Apple Pay</span>
          </button>
        </div>

        <Input label={t.cardNumber} placeholder="**** **** **** 1234" />
        <div className="grid grid-cols-2 gap-4">
          <Input label={t.expiry} placeholder="MM/YY" />
          <Input label={t.cvv} placeholder="***" type="password" />
        </div>
      </div>

      <div className="p-4 bg-success/5 border border-success/10 rounded-card flex items-start gap-3">
        <ShieldCheck className="text-success mt-0.5" size={18} />
        <p className="text-xs text-neutral-600">Your connection is encrypted and payment is handled by a PCI-compliant gateway.</p>
      </div>

      <div className="sticky bottom-24 pt-4">
        <Button fullWidth onClick={handlePay}>
          {t.payNow}
        </Button>
      </div>
    </div>
  );
};
