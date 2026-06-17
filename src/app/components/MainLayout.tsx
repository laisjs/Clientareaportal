import { useState } from 'react';
import { Menu, AlertTriangle } from 'lucide-react';
import { cn } from './ui/utils';
import { Sidebar } from './Sidebar';
import { SupportBanner } from './SupportBanner';
import { PageFooter } from './PageFooter';
import { mockContracts } from '../../data/contracts';
import ruminaIcon from '../../assets/rumina-icon.png';

const hasPendingOnFarmTerm = mockContracts.some(
  (c) =>
    c.isOnFarm &&
    (c.agreementTerm?.termAcceptanceStatus === 'pending' ||
      c.agreementTerm?.terms?.some((t) => t.status === 'pending')),
);

interface MainLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export function MainLayout({ activeTab, setActiveTab, children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {hasPendingOnFarmTerm && (
        <div
          role="button"
          onClick={() => setActiveTab('contracts')}
          className="fixed inset-x-0 top-0 z-[60] h-10 bg-[#0d99ff] flex items-center justify-center gap-2.5 px-4 cursor-pointer hover:bg-[#0b87e0] transition-colors"
        >
          <AlertTriangle className="size-4 text-white shrink-0" />
          <p className="text-sm font-semibold text-white text-center">
            <span className="hidden sm:inline">
              Você tem um Termo de Adesão On Farm pendente — acesse{' '}
              <span className="underline underline-offset-2">Meus Contratos</span>.
            </span>
            <span className="sm:hidden">
              Termo On Farm pendente — veja em{' '}
              <span className="underline underline-offset-2">Meus Contratos</span>
            </span>
          </p>
        </div>
      )}

      <div className={cn('flex min-h-screen bg-gray-50', hasPendingOnFarmTerm && 'mt-10')}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          hasPendingOnFarmTerm={hasPendingOnFarmTerm}
        />
        <div className="flex flex-col flex-1 ml-0 lg:ml-[280px] min-h-screen transition-all duration-300">
          {/* Mobile topbar */}
          <div
            className={cn(
              'lg:hidden h-14 flex items-center gap-3 px-4 bg-white border-b border-gray-100 sticky z-30',
              hasPendingOnFarmTerm ? 'top-10' : 'top-0',
            )}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </button>
            <img src={ruminaIcon} alt="Rúmina" className="w-7 h-7" />
            <span className="text-sm font-semibold text-gray-900">Rúmina</span>
          </div>

          <div className="flex-1">
            {children}
          </div>
          <SupportBanner />
          <PageFooter />
        </div>
      </div>
    </>
  );
}
