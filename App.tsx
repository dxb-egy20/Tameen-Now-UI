
import React, { useState, useEffect, useMemo } from 'react';
import { translations } from './translations';
import { Language, UserRole, InsuranceType } from './types';
import { Layout } from './components/Layout';
import { CustomerHome } from './views/CustomerHome';
import { QuoteWizard } from './views/QuoteWizard';
import { PaymentFlow } from './views/PaymentFlow';
import { PolicyDashboard } from './views/PolicyDashboard';
import { AgentDashboard } from './views/AgentDashboard';
import { AgentInquiryFlow } from './views/AgentInquiryFlow';
import { AgentInquiryList } from './views/AgentInquiryList';
import { ProfileView } from './views/ProfileView';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [role, setRole] = useState<UserRole>('customer');
  const [view, setView] = useState<string>('home');
  const [selectedType, setSelectedType] = useState<InsuranceType>('motor');
  const [quoteData, setQuoteData] = useState<any>(null);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  const navigate = (newView: string, props?: any) => {
    if (props?.type) setSelectedType(props.type);
    if (props?.quote) setQuoteData(props.quote);
    setView(newView);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    if (role === 'customer') {
      switch (view) {
        case 'home': return <CustomerHome t={t} navigate={navigate} />;
        case 'quote-wizard': return <QuoteWizard t={t} navigate={navigate} type={selectedType} />;
        case 'payment': return <PaymentFlow t={t} navigate={navigate} quote={quoteData} />;
        case 'policies': return <PolicyDashboard t={t} navigate={navigate} />;
        case 'profile': return <ProfileView t={t} lang={lang} setLang={setLang} setRole={setRole} role={role} />;
        default: return <CustomerHome t={t} navigate={navigate} />;
      }
    } else {
      switch (view) {
        case 'home': return <AgentDashboard t={t} navigate={navigate} />;
        case 'inquiry-flow': return <AgentInquiryFlow t={t} navigate={navigate} />;
        case 'inquiries': return <AgentInquiryList t={t} navigate={navigate} />;
        case 'profile': return <ProfileView t={t} lang={lang} setLang={setLang} setRole={setRole} role={role} />;
        default: return <AgentDashboard t={t} navigate={navigate} />;
      }
    }
  };

  return (
    <Layout 
      t={t} 
      role={role} 
      currentView={view} 
      navigate={navigate} 
      lang={lang}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
