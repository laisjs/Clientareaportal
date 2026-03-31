import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { PaymentsPage } from './pages/PaymentsPage';
import { BillingMethodsPage } from './pages/BillingMethodsPage';
import { Toaster } from 'sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('contracts');

  const renderContent = () => {
    switch (activeTab) {
      case 'contracts':
        return <Dashboard />;
      case 'payments':
        return <PaymentsPage />;
      case 'billing-methods':
        return <BillingMethodsPage />;
      default:
        return (
          <div className="flex-1 p-12 flex flex-col items-center justify-center text-center min-h-screen bg-gray-50">
            <div className="p-12">
              <h2 className="text-lg font-bold text-gray-400 uppercase tracking-widest">Seção não encontrada</h2>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-[280px] transition-all duration-300">
        {renderContent()}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}