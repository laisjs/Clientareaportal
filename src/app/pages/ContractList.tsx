import { mockContracts } from '@/data/contracts';
import { StatusBadge } from '@/app/components/StatusBadge';
import { FileText } from 'lucide-react';

export function ContractList() {
  const handleViewContract = (contractId: string) => {
    // Mock: Em produção, isso abriria um modal ou navegaria para detalhes
    alert(`Visualizar detalhes do contrato ${contractId}`);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Contratos</h1>
          <p className="text-sm text-gray-600">
            Consulte seus contratos ativos e histórico de contratações
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Identificador
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Data de Início
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockContracts.map((contract) => (
                <tr
                  key={contract.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewContract(contract.id)}
                      className="text-sm font-medium text-gray-900 hover:text-[#500d5b] transition-colors"
                    >
                      {contract.identifier}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{contract.startDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={contract.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewContract(contract.id)}
                      className="inline-flex items-center gap-1.5 text-sm text-[#500d5b] hover:text-[#3d0a45] font-medium transition-colors"
                    >
                      <FileText className="size-4" />
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {mockContracts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">Nenhum contrato encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}