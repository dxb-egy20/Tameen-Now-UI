
import React from 'react';
import { Card, Button, Badge } from '../components/UI';
import { TrendingUp, Users, Target, Clock, ChevronRight, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const CHART_DATA = [
  { name: 'Sun', sales: 4000 },
  { name: 'Mon', sales: 3000 },
  { name: 'Tue', sales: 2000 },
  { name: 'Wed', sales: 2780 },
  { name: 'Thu', sales: 1890 },
  { name: 'Fri', sales: 2390 },
  { name: 'Sat', sales: 3490 },
];

export const AgentDashboard: React.FC<{ t: any; navigate: (view: string) => void }> = ({ t, navigate }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-neutral-500 text-sm">Welcome back, Agent Ahmed.</p>
        </div>
        <Button onClick={() => navigate('inquiry-flow')} className="w-11 h-11 p-0 rounded-full">
          <Plus size={24} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-primary text-white border-0">
          <TrendingUp size={20} className="mb-2 opacity-80" />
          <p className="text-xs opacity-80 font-medium">Monthly Sales</p>
          <p className="text-xl font-bold">142,500 SAR</p>
        </Card>
        <Card>
          <Target size={20} className="mb-2 text-warning" />
          <p className="text-xs text-neutral-500 font-medium">Conversion</p>
          <p className="text-xl font-bold">64%</p>
        </Card>
      </div>

      <Card>
        <h4 className="font-bold mb-4 text-sm flex items-center justify-between">
          {t.weeklySales}
          <span className="text-[10px] text-success">+12% vs last week</span>
        </h4>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} />
              <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                {CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 6 ? '#0052A3' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{t.recentInquiries}</h3>
          <button onClick={() => navigate('inquiries')} className="text-primary text-xs font-bold uppercase tracking-wider">View All</button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { name: 'Sarah Al-Qahtani', type: 'Motor', time: '2h ago', status: 'pending', sla: '14h' },
            { name: 'Omar Bin Abdulaziz', type: 'Medical', time: '5h ago', status: 'active', sla: '4h' },
            { name: 'Laila Mahmoud', type: 'General', time: '1d ago', status: 'expired', sla: '0h' },
          ].map((item, idx) => (
            <button 
              key={idx} 
              className="flex items-center gap-4 p-4 bg-white rounded-card shadow-sm border border-neutral-100 hover:border-primary transition-all text-left"
              onClick={() => navigate('inquiries')}
            >
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center font-bold text-neutral-500 uppercase text-xs">
                {item.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <Badge status={item.status}>{item.status}</Badge>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-medium">
                  <span>{item.type}</span>
                  <div className="w-1 h-1 bg-neutral-200 rounded-full" />
                  <span>{item.time}</span>
                  {item.status === 'pending' && (
                    <div className="flex items-center gap-1 text-error ml-auto">
                      <Clock size={10} />
                      SLA: {item.sla}
                    </div>
                  )}
                </div>
              </div>
              <ChevronRight size={16} className="text-neutral-300 rtl:rotate-180" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
