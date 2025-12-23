
import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { ArrowLeft, Check, Info } from 'lucide-react';
import { InsuranceType } from '../types';

interface Props {
  t: any;
  navigate: (view: string, props?: any) => void;
  type: InsuranceType;
}

export const QuoteWizard: React.FC<Props> = ({ t, navigate, type }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    phone: '',
    vehicleValue: '',
    year: '',
    coverage: ['basic'],
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else navigate('payment', { quote: { ...formData, type, premium: 1250 } });
  };

  const toggleCoverage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      coverage: prev.coverage.includes(id) 
        ? prev.coverage.filter(c => c !== id)
        : [...prev.coverage, id]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold">{t.step1}</h3>
            <Input label="Full Name" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <Input label="ID / Iqama Number" placeholder="1234567890" value={formData.idNumber} onChange={e => setFormData({...formData, idNumber: e.target.value})} />
            <Input label="Phone Number" placeholder="+966 5X XXX XXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold">{t.step2}</h3>
            {type === 'motor' ? (
              <>
                <Input label="Vehicle Manufacturing Year" placeholder="2024" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
                <Input label="Estimated Vehicle Value (SAR)" placeholder="80,000" value={formData.vehicleValue} onChange={e => setFormData({...formData, vehicleValue: e.target.value})} />
              </>
            ) : (
              <>
                <Input label="Number of Dependents" placeholder="0" type="number" />
                <Input label="Annual Coverage Limit" placeholder="50,000 SAR" />
              </>
            )}
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold">{t.step3}</h3>
            <div className="space-y-3">
              {[
                { id: 'basic', label: 'Third Party Liability', price: 'Free', desc: 'Mandatory minimum coverage' },
                { id: 'comprehensive', label: 'Comprehensive Coverage', price: '+450 SAR', desc: 'Accidents, fire, and theft' },
                { id: 'roadside', label: 'Roadside Assistance', price: '+50 SAR', desc: 'Towing, battery jumpstart' },
                { id: 'replacement', label: 'Replacement Car', price: '+120 SAR', desc: 'Car hire for up to 10 days' }
              ].map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleCoverage(item.id)}
                  className={`p-4 border rounded-card cursor-pointer transition-all ${formData.coverage.includes(item.id) ? 'border-primary bg-primary/5 shadow-sm' : 'border-neutral-100 bg-white'}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{item.label}</p>
                      <p className="text-xs text-neutral-500">{item.desc}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold">{t.step4}</h3>
            <Card>
              <div className="space-y-4">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-neutral-500">Insured Person</span>
                  <span className="font-bold">{formData.name || 'John Doe'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-neutral-500">Insurance Type</span>
                  <span className="font-bold capitalize">{type}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-neutral-500">Plan</span>
                  <span className="font-bold">{formData.coverage.includes('comprehensive') ? 'Comprehensive' : 'Third Party'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-lg font-bold">Total Premium</span>
                  <span className="text-xl font-bold text-primary">1,250 SAR</span>
                </div>
              </div>
            </Card>
            <div className="flex items-center gap-2 p-3 bg-neutral-100 rounded-lg text-xs text-neutral-500">
               <Info size={14} />
               Price includes VAT and administrative fees.
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate('home')} className="p-2 -ml-2 text-neutral-500">
          <ArrowLeft size={24} className="rtl:rotate-180" />
        </button>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`h-1.5 w-8 rounded-full transition-all ${step === s ? 'bg-primary' : step > s ? 'bg-primary/40' : 'bg-neutral-200'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1">
        {renderStep()}
      </div>

      <div className="sticky bottom-24 pt-4 bg-neutral-50">
        <Button fullWidth onClick={nextStep}>
          {step === 4 ? t.payNow : t.next}
        </Button>
      </div>
    </div>
  );
};
