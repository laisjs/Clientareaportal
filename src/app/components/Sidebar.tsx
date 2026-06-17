import {
  FileText,
  CreditCard,
  Wallet,
  LogOut,
  ChevronRight,
  Package,
  RotateCcw,
  X,
  FileSignature,
} from 'lucide-react';
import { cn } from './ui/utils';
import ruminaIcon from '../../assets/rumina-icon.png';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  hasPendingOnFarmTerm?: boolean;
}

const menuItems = [
  { id: 'contracts', label: 'Meus Contratos', icon: FileText },
  { id: 'payments', label: 'Meus Pagamentos', icon: CreditCard },
  { id: 'billing-methods', label: 'Meio de Pagamento', icon: Wallet },
  { id: 'shipments', label: 'Minhas Remessas', icon: Package },
  { id: 'returns', label: 'Devoluções', icon: RotateCcw },
];

const layoutItems = [
  { id: 'term-acceptance-layout', label: 'Termo de Adesão', icon: FileSignature },
];

export function Sidebar({ activeTab, setActiveTab, isOpen, onClose, hasPendingOnFarmTerm }: SidebarProps) {
  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[45] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'w-[280px] bg-white border-r border-gray-100 flex flex-col fixed left-0 z-50 transition-transform duration-300',
          hasPendingOnFarmTerm ? 'top-10 h-[calc(100vh-2.5rem)]' : 'top-0 h-screen',
          '-translate-x-full lg:translate-x-0',
          isOpen && 'translate-x-0',
        )}
      >
        {/* Logo Section */}
        <div className="p-4 lg:p-8 pb-4 lg:pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={ruminaIcon} alt="Rúmina" className="w-10 h-10 shrink-0" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900 leading-none">Rúmina</h1>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-1">
                  Portal do Cliente
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100" />

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-4 lg:mt-8 space-y-1">
          <p className="px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-6">
            Área do Cliente
          </p>

          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-[#500d5b]/[0.08] text-[#500d5b]'
                    : 'text-slate-600 hover:bg-gray-50',
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      'size-[18px] transition-colors',
                      isActive ? 'text-[#500d5b]' : 'text-slate-400 group-hover:text-slate-600',
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-semibold tracking-tight',
                      isActive ? 'text-[#500d5b]' : 'text-slate-600',
                    )}
                  >
                    {item.label}
                  </span>
                </div>
                {isActive && <ChevronRight className="size-4 text-[#500d5b]" />}
              </button>
            );
          })}
        </nav>

        {/* Layouts Section */}
        <div className="px-4 mt-6">
          <div className="h-px w-full bg-gray-100 mb-4" />
          <p className="px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Layouts
          </p>
          {layoutItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-[#500d5b]/[0.08] text-[#500d5b]'
                    : 'text-slate-600 hover:bg-gray-50',
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      'size-[18px] transition-colors',
                      isActive ? 'text-[#500d5b]' : 'text-slate-400 group-hover:text-slate-600',
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-semibold tracking-tight',
                      isActive ? 'text-[#500d5b]' : 'text-slate-600',
                    )}
                  >
                    {item.label}
                  </span>
                </div>
                {isActive && <ChevronRight className="size-4 text-[#500d5b]" />}
              </button>
            );
          })}
        </div>

        {/* User Session Footer */}
        <div className="mt-auto border-t border-gray-100 p-4 lg:p-6 pt-6 lg:pt-8">
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-gray-200">
              CB
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 leading-tight">Fazenda Boa Vista</p>
              <p className="text-xs text-gray-500 truncate">cliente@email.com</p>
            </div>
          </div>

          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors px-1 cursor-pointer min-h-[44px]">
            <LogOut className="size-4 rotate-180" />
            <span className="text-sm font-semibold">Sair do Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
}
