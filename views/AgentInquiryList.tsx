
import React, { useState } from 'react';
import { Card, Badge, Input } from '../components/UI';
import { Search, Filter, MoreVertical, Mail, Phone, ExternalLink } from 'lucide-react';
import { Inquiry } from '../types';

const MOCK_INQUIRIES: Inquiry[] = [
  { id: 'IQ-101', customerName: 'Fahad Al-Dossari', type: 'motor', status: 'pending', date: '2023-11-20', slaDays: 2 },
  { id: 'IQ-102', customerName: 'Noura Salem', type: 'medical', status: 'active', date: '2023-11-19', slaDays: 5 },
  { id: 'IQ-103', customerName: 'Khalid Abdullah', type: 'general', status: 'rejected', date: '2023-11-18', slaDays: 0 },
  { id: 'IQ-104', customerName: 'Fatima Zahra', type: 'motor', status: 'pending', date: '2023-11-17', slaDays: 1 },
];

export const AgentInquiryList: React.FC<{ t: any; navigate: (view: string) => void }> = ({ t, navigate }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inquiry Management</h2>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 rtl:right-4 rtl:left-auto" />
           <Input 
             className="pl-11 rtl:pr-11 rtl:pl-4" 
             placeholder="Search by name or ID..." 
             value={search}
             onChange={e => setSearch(e.target.value)}
           />
        </div>
        <button className="w-11 h-11 border border-neutral-200 rounded-card flex items-center justify-center text-neutral-500 bg-white">
          <Filter size={20} />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
        {['all', 'pending', 'active', 'rejected'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${filter === s ? 'bg-primary border-primary text-white' : 'bg-white border-neutral-200 text-neutral-500'}`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_INQUIRIES.filter(i => (filter === 'all' || i.status === filter) && i.customerName.toLowerCase().includes(search.toLowerCase())).map(item => (
          <Card key={item.id} className="relative active:scale-[0.99] transition-transform">
            <div className="flex justify-between items-start mb-3">
               <div>
                 <h4 className="font-bold text-sm">{item.customerName}</h4>
                 <p className="text-[10px] text-neutral-400 font-medium">#{item.id} • {item.date}</p>
               </div>
               <Badge status={item.status}>{item.status}</Badge>
            </div>
            
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 border-t pt-3">
               <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {item.type.toUpperCase()}
               </div>
               <div className="flex gap-4">
                  <Phone size={14} className="hover:text-primary cursor-pointer" />
                  <Mail size={14} className="hover:text-primary cursor-pointer" />
                  <ExternalLink size={14} className="hover:text-primary cursor-pointer" />
               </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
