import { mockContracts } from '../../data/contracts';
import { ContractCard } from '../components/ContractCard';
import { FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Dashboard() {
  const activeContracts = mockContracts.filter((c) => c.status === 'Vigente');
  const closedContracts = mockContracts.filter((c) => c.status === 'Encerrado');
  const [showClosedContracts, setShowClosedContracts] = useState(false);

  return (
    <div className="bg-gray-50 pb-20">
      {/* Header da Página */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-widest mb-4">
                <span className="capitalize">Portal iMilk</span>
                <ChevronRight className="size-3" />
                <span className="text-[#500d5b] capitalize">Meus contratos</span>
              </div>
              <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Meus Contratos</h1>
              <p className="text-sm text-gray-500 mt-3">Gestão e consulta institucional dos seus contratos ativos.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Sincronizado em</p>
                <p className="text-sm font-semibold text-gray-900">Hoje, 14:30</p>
              </div>
              <div className="w-px h-8 bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <FileText className="size-4 text-[#500d5b]" />
                <span className="text-sm font-semibold text-gray-900">{activeContracts.length} Ativos</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Contracts Section */}
        <section className="mb-8">
          {activeContracts.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {activeContracts.map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <FileText className="size-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum contrato ativo no momento</p>
            </div>
          )}
        </section>

        {/* Closed Contracts Section - Colapsável com contador */}
        {closedContracts.length > 0 && (
          <section className="mb-8">
            <div 
              className="mb-4 cursor-pointer flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={() => setShowClosedContracts(!showClosedContracts)}
            >
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Contratos Encerrados 
                  <span className="ml-2 text-xs text-gray-500">({closedContracts.length})</span>
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">Histórico de contratos concluídos</p>
              </div>
              <ChevronDown
                className={`size-5 text-gray-400 transition-transform ${
                  showClosedContracts ? 'rotate-180' : ''
                }`}
              />
            </div>

            {showClosedContracts && (
              <div className="grid grid-cols-1 gap-3">
                {closedContracts.map((contract) => (
                  <ContractCard key={contract.id} contract={contract} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Support Info - Mais discreto */}
        <div className="mt-8 px-4 py-3 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            Dúvidas? Entre em contato: <span className="font-medium text-gray-700">suporte@imilk.com.br</span> • <span className="font-medium text-gray-700">(11) 1234-5678</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <p className="text-xs text-gray-500 text-center">
            © 2026 iMilk - Sistema de Gestão de Fazendas. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}