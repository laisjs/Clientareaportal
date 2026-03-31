import { mockContracts } from '@/data/contracts';
import { StatusBadge } from '@/app/components/StatusBadge';
import { ArrowLeft, FileText, Download } from 'lucide-react';

interface ContractDetailProps {
  contractId?: string;
  onBack?: () => void;
}

export function ContractDetail({ contractId, onBack }: ContractDetailProps) {
  const contract = contractId ? mockContracts.find((c) => c.id === contractId) : mockContracts[0];

  if (!contract) {
    return (
      <div className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Contrato não encontrado</h2>
          <button 
            onClick={onBack}
            className="text-[#500d5b] hover:text-[#3d0a45] text-sm font-medium"
          >
            ← Voltar para lista de contratos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-8">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="size-4" />
            Voltar para Contratos
          </button>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 mb-2">
                {contract.identifier}
              </h1>
              <p className="text-sm text-gray-600">{contract.clientName}</p>
            </div>
            <StatusBadge status={contract.status} />
          </div>
        </div>

        {/* Contract Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Status Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-sm font-medium text-gray-900 mb-4">Status do Contrato</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Situação Atual</p>
                <StatusBadge status={contract.status} />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Data de Início</p>
                <p className="text-sm text-gray-900">{contract.startDate}</p>
              </div>
              {contract.endDate && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">
                    {contract.status === 'Vigente' ? 'Vigência até' : 'Data de Encerramento'}
                  </p>
                  <p className="text-sm text-gray-900">{contract.endDate}</p>
                </div>
              )}
            </div>
          </div>

          {/* Document Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-sm font-medium text-gray-900 mb-4">Documentação</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Acesse o documento completo do contrato para consulta e verificação.
              </p>
              <button
                onClick={() => {
                  // Mock: Em produção, isso seria um link real para o PDF
                  alert('Funcionalidade de visualização de PDF será implementada no backend');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                <FileText className="size-4" />
                Visualizar Contrato (PDF)
              </button>
              <button
                onClick={() => {
                  alert('Funcionalidade de download será implementada no backend');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 ml-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
              >
                <Download className="size-4" />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Resumo da Contratação</h2>
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-gray-700 leading-relaxed">{contract.summary}</p>
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Dúvidas sobre seu contrato?</strong> Entre em contato com nossa equipe de
            suporte através do email suporte@imilk.com.br ou telefone (11) 1234-5678.
          </p>
        </div>
      </div>
    </div>
  );
}