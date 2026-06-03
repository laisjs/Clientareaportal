import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { SupportBanner } from './SupportBanner';
import { PageFooter } from './PageFooter';
import ruminaIcon from '../../assets/rumina-icon.png';

interface MainLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export function MainLayout({ activeTab, setActiveTab, children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 ml-0 lg:ml-[280px] min-h-screen transition-all duration-300">
        {/* Mobile topbar */}
        <div className="lg:hidden h-14 flex items-center gap-3 px-4 bg-white border-b border-gray-100 sticky top-0 z-30">
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
  );
}
