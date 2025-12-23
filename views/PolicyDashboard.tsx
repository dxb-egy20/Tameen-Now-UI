
import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/UI';
import { FileText, Download, RotateCcw, Search, Filter } from 'lucide-react';
import { Policy } from '../types';

const MOCK_POLICIES: Policy[] = [
  { id: 'TN-1029', type: 'motor', provider: 'Tameen Now Gold', premium: 1250, expiryDate: '2025-02-15', status: 'active' },
  { id: 'TN-0582', type: 'medical', provider: 'Premium Family', premium: 4500, expiryDate: '2025-08-20', status: 'active' },
  { id: 'TN-9912', type: 'motor', provider: 'Standard TPL', premium: 650, expiryDate: '2024-01-10', status: 'expired' },
];

export const PolicyDashboard: React.FC<{ t: any; navigate: (view: string) => void }> = ({ t, navigate }) => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.myPolicies}</h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-neutral-100 text-neutral-500"><Search size={20}/></button>
          <button className="p-2 rounded-full bg-neutral-100 text-neutral-500"><Filter size={20}/></button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
        {['all', 'active', 'expired'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${filter === status ? 'bg-primary border-primary text-white' : 'bg-white border-neutral-200 text-neutral-500'}`}
          >
            {status === 'all' ? t.all : status === 'active' ? t.active : t.expired}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_POLICIES.filter(p => filter === 'all' || p.status === filter).map(policy => (
          <Card key={policy.id} className="relative overflow-hidden group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{policy.provider}</h4>
                  <p className="text-[10px] font-mono text-neutral-400">{policy.id}</p>
                </div>
              </div>
              <Badge status={policy.status}>{policy.status}</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Premium</p>
                <p className="font-bold text-sm">{policy.premium} SAR</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Expires On</p>
                <p className="font-bold text-sm">{policy.expiryDate}</p>
              </div>
            </div>

            <div className="flex gap-2 border-t pt-4">
              <Button variant="outline" className="flex-1 h-9 text-xs">
                <Download size={14} />
                PDF
              </Button>
              {policy.status === 'expired' && (
                <Button variant="primary" className="flex-1 h-9 text-xs" onClick={() => navigate('quote-wizard')}>
                  <RotateCcw size={14} />
                  Renew
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
