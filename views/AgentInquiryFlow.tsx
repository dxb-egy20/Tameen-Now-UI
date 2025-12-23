
import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { Camera, ArrowLeft, Loader2, Check, AlertCircle } from 'lucide-react';

interface Props {
  t: any;
  navigate: (view: string) => void;
}

export const AgentInquiryFlow: React.FC<Props> = ({ t, navigate }) => {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrData, setOcrData] = useState<any>(null);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setOcrData({
        name: "Khalid Ibrahim",
        id: "2441990212",
        plate: "ABC 1234",
        confidence: 94
      });
      setIsScanning(false);
      setStep(2);
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-6 py-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={32} />
              </div>
              <h2 className="text-xl font-bold">{t.scanDocument}</h2>
              <p className="text-neutral-500 text-sm">Scan customer ID or vehicle registration to auto-fill details.</p>
            </div>
            
            <div className="aspect-[3/4] rounded-card border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center bg-neutral-50 relative overflow-hidden group">
               {isScanning ? (
                 <div className="flex flex-col items-center gap-4">
                   <Loader2 className="animate-spin text-primary" size={32} />
                   <p className="text-sm font-bold text-primary">Scanning Document...</p>
                 </div>
               ) : (
                 <div className="flex flex-col items-center gap-2">
                    <p className="text-neutral-400 text-sm font-medium">Position document within frame</p>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*" 
                      capture="environment"
                      onChange={simulateScan}
                    />
                 </div>
               )}
            </div>
            
            <Button variant="outline" fullWidth onClick={() => setStep(2)}>
               Skip and Enter Manually
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">Review Extracted Data</h2>
            {ocrData && (
              <div className={`p-3 rounded-lg flex items-center gap-2 text-xs font-bold ${ocrData.confidence > 90 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                <Check size={14} />
                {t.ocrConfidence}: {ocrData.confidence}%
              </div>
            )}
            <div className="space-y-4">
              <Input label="Customer Name" defaultValue={ocrData?.name} />
              <Input label="ID Number" defaultValue={ocrData?.id} />
              <Input label="Insurance Category" value="Motor Insurance" readOnly />
              <Input label="Reference Number" defaultValue={ocrData?.plate} />
            </div>
            <div className="flex gap-3 sticky bottom-24 pt-4 bg-neutral-50">
               <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Rescan</Button>
               <Button className="flex-1" onClick={() => setStep(3)}>Next</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-6 text-center py-12 animate-in zoom-in">
             <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
                <Check size={40} />
             </div>
             <div>
                <h2 className="text-2xl font-bold">Inquiry Created</h2>
                <p className="text-neutral-500">Inquiry #IQ-2900 has been added to your dashboard.</p>
             </div>
             <Button fullWidth onClick={() => navigate('home')}>Back to Dashboard</Button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {step < 3 && (
        <button onClick={() => setStep(prev => prev - 1 || 1)} className="p-2 -ml-2 text-neutral-500 w-fit">
          <ArrowLeft size={24} className="rtl:rotate-180" />
        </button>
      )}
      {renderStep()}
    </div>
  );
};
