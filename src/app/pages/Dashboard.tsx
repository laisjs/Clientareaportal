import { useState } from 'react';
import { mockContracts, Contract } from '../../data/contracts';
import { ContractCard } from '../components/ContractCard';
import { TermAcceptanceModal } from '../components/TermAcceptanceModal';
import { ProductIcon } from '../components/ProductIcon';
import { FileText, ChevronDown, ChevronRight, FileSignature } from 'lucide-react';
import { toast } from 'sonner';

export function Dashboard() {
  const activeContracts = mockContracts.filter((c) => c.status === 'Vigente');
  const closedContracts = mockContracts.filter((c) => c.status === 'Encerrado');
  const [showClosedContracts, setShowClosedContracts] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState<string[]>([]);
  const [modalContract, setModalContract] = useState<Contract | null>(null);

  const hasOnFarm = activeContracts.some((c) => c.isOnFarm);

  const isPendingTerm = (contract: Contract) =>
    contract.agreementTerm?.termAcceptanceStatus === 'pending' &&
    !acceptedTerms.includes(contract.id);

  const pendingTermContracts = activeContracts.filter(isPendingTerm);

  const handleAcceptTerm = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    if (modalContract) {
      setAcceptedTerms((prev) => [...prev, modalContract.id]);
      toast.success(`Termo de Adesão do contrato ${modalContract.identifier} aceito com sucesso.`);
    }
    setModalContract(null);
  };

  return (
    <div className="bg-gray-50">
      {/* Header da Página */}
      <header className="bg-white border-b border-gray-200 sticky top-14 lg:top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-widest mb-4">
                <span className="capitalize">Rúmina</span>
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

        {/* Banner: Termos de Adesão pendentes */}
        {pendingTermContracts.length > 0 && (
          <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-amber-100 rounded-xl shrink-0">
                <FileSignature className="size-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-amber-900">
                  {pendingTermContracts.length === 1
                    ? 'Termo de Adesão pendente de assinatura'
                    : `${pendingTermContracts.length} contratos com Termo de Adesão pendente`}
                </p>
                <p className="text-xs text-amber-700 mt-0.5 mb-3">
                  O aceite formal é necessário para garantir a continuidade dos serviços contratados.
                </p>
                <div className="flex flex-wrap gap-2">
                  {pendingTermContracts.map((contract) => (
                    <button
                      key={contract.id}
                      onClick={() => setModalContract(contract)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
                    >
                      <span>{contract.planName}</span>
                      <span className="text-amber-500">·</span>
                      <span className="text-amber-600">{contract.identifier}</span>
                      <span className="ml-1 text-amber-700 underline">Aceitar →</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Banner On Farm */}
        {hasOnFarm && (
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#500d5b]/[0.05] border border-[#500d5b]/20 rounded-xl">
            <div className="flex items-center gap-4">
              <ProductIcon productName="On Farm" size="md" className="shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Você tem acesso ao On Farm</p>
                <p className="text-xs text-gray-500 mt-0.5">Acesse a loja On Farm para gerenciar seus insumos e pedidos.</p>
              </div>
            </div>
            <button
              onClick={() => alert('Redirecionando para loja On Farm...')}
              className="shrink-0 px-4 py-2 bg-[#500d5b] text-white text-sm font-semibold rounded-lg hover:bg-[#3d0a45] transition-colors"
            >
              Acessar Loja
            </button>
          </div>
        )}

        {/* Contracts Section */}
        <section className="mb-8">
          {activeContracts.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {activeContracts.map((contract) => (
                <ContractCard
                  key={contract.id}
                  contract={contract}
                  termPending={isPendingTerm(contract)}
                  onAcceptTerm={() => setModalContract(contract)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <FileText className="size-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum contrato ativo no momento</p>
            </div>
          )}
        </section>

        {/* Closed Contracts Section */}
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
                className={`size-5 text-gray-400 transition-transform ${showClosedContracts ? 'rotate-180' : ''}`}
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
      </main>

      {/* Modal de aceite por contrato */}
      {modalContract && (
        <TermAcceptanceModal
          isOpen={true}
          contractName={`${modalContract.planName} · ${modalContract.identifier}`}
          termVersion={modalContract.agreementTerm?.termVersion ?? '2026-01'}
          clientName={modalContract.customer.tradeName}
          onAccept={handleAcceptTerm}
          onClose={() => setModalContract(null)}
        />
      )}
    </div>
  );
}
