import { useState } from 'react';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { PaymentsPage } from './pages/PaymentsPage';
import { BillingMethodsPage } from './pages/BillingMethodsPage';
import { ShipmentsPage } from './pages/ShipmentsPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { TermAcceptancePublicPage } from './pages/TermAcceptancePublicPage';
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
      case 'shipments':
        return <ShipmentsPage />;
      case 'returns':
        return <ReturnsPage />;
      case 'term-acceptance-layout':
        return <TermAcceptancePublicPage />;
      default:
        return (
          <div className="flex-1 p-12 flex flex-col items-center justify-center text-center min-h-screen bg-gray-50">
            <h2 className="text-lg font-bold text-gray-400 uppercase tracking-widest">Seção não encontrada</h2>
          </div>
        );
    }
  };

  return (
    <>
      <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </MainLayout>
      <Toaster position="top-right" richColors />
    </>
  );
}
