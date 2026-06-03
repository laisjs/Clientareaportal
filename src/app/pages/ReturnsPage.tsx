import { useState } from 'react';
import {
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Calendar,
  FilterX,
} from 'lucide-react';
import { cn } from '../components/ui/utils';
import { mockReturns, ProductReturn, getReturnStatusColors, RETURN_STATUS_LABELS } from '../../data/returns';

const PERIOD_OPTIONS = [
  { label: 'Todos os períodos', value: '' },
  { label: 'Últimos 30 dias', value: '30d' },
  { label: 'Últimos 90 dias', value: '90d' },
  { label: 'Último ano', value: '1y' },
];

function ReturnRow({ productReturn }: { productReturn: ProductReturn }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = getReturnStatusColors(productReturn.status);

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-wrap flex-1">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 text-gray-400 shrink-0" />
            <span className="text-sm font-semibold text-gray-900">{productReturn.createdAt}</span>
          </div>
          {productReturn.reason && (
            <span className="text-xs text-gray-500 truncate max-w-[200px] hidden sm:inline">
              {productReturn.reason}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider"
            style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
          >
            {RETURN_STATUS_LABELS[productReturn.status]}
          </span>
          <ChevronDown className={cn('size-5 text-gray-400 transition-transform shrink-0', isExpanded && 'rotate-180')} />
        </div>
      </div>

      <div
        className="transition-all duration-300 overflow-hidden"
        style={{ display: 'grid', gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-4 py-4 bg-gray-50/50 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {productReturn.nfNumber && (
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">NF de Devolução</p>
                  <p className="text-sm font-semibold text-gray-900">{productReturn.nfNumber}</p>
                </div>
              )}
              {productReturn.reason && (
                <div className="sm:col-span-2">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Motivo</p>
                  <p className="text-sm text-gray-900">{productReturn.reason}</p>
                </div>
              )}
            </div>

            {productReturn.items.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Itens Devolvidos</p>
                <div className="space-y-2">
                  {productReturn.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white">
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      <div className="text-right">
                        <p className="text-[11px] text-gray-400 uppercase tracking-wider">Qtd.</p>
                        <p className="text-sm font-semibold text-gray-900">{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {productReturn.reversePosting && (
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Postagem Reversa</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border border-gray-100 bg-white">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                    <p className="text-sm font-semibold text-gray-900">{productReturn.reversePosting.status}</p>
                  </div>
                  {productReturn.reversePosting.pickupNumber && (
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Número de Coleta</p>
                      <p className="text-sm font-semibold text-gray-900">{productReturn.reversePosting.pickupNumber}</p>
                    </div>
                  )}
                  {productReturn.reversePosting.expireDate && (
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Validade</p>
                      <p className="text-sm font-semibold text-gray-900">{productReturn.reversePosting.expireDate}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReturnsPage() {
  const [filters, setFilters] = useState({ period: '' });
  const [isGroupExpanded, setIsGroupExpanded] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-14 lg:top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-widest mb-2">
            <span>Rúmina</span>
            <ChevronRight className="size-3" />
            <span className="text-[#500d5b]">Devoluções</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Devoluções</h1>
          <p className="text-xs text-gray-500 mt-1">Histórico de devoluções dos seus contratos On Farm.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Filtros */}
        <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-end gap-3 mb-6">
          <div className="w-full sm:flex-1 sm:min-w-[160px]">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Período</p>
            <div className="relative">
              <select
                value={filters.period}
                onChange={(e) => setFilters((prev) => ({ ...prev, period: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 appearance-none outline-none focus:ring-1 focus:ring-[#500d5b]/20"
              >
                {PERIOD_OPTIONS.map(({ label, value }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={() => setFilters({ period: '' })}
            className={cn(
              'w-full sm:w-auto px-4 py-2 bg-white border rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer',
              filters.period ? 'border-[#500d5b] text-[#500d5b]' : 'border-gray-200 text-gray-500',
            )}
          >
            <FilterX className="size-4" />
            Limpar Filtros
          </button>
        </div>

        {mockReturns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <RotateCcw className="size-10 text-gray-300 mb-4" />
            <p className="text-sm font-semibold text-gray-500">Nenhuma devolução encontrada.</p>
            <p className="text-xs text-gray-400 mt-1">
              Quando houver devoluções registradas, elas aparecerão aqui.
            </p>
          </div>
        ) : (
          <section>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-sm">
              <div
                className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setIsGroupExpanded(!isGroupExpanded)}
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="size-5 text-[#500d5b]" />
                  <h2 className="text-sm font-semibold text-gray-900">On Farm</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline text-sm text-gray-500">
                    <span className="font-semibold">{mockReturns.length}</span>{' '}
                    devolução{mockReturns.length !== 1 ? 'ões' : ''}
                  </span>
                  <ChevronDown className={cn('size-4 text-[#500d5b] transition-transform duration-200 shrink-0', isGroupExpanded && 'rotate-180')} />
                </div>
              </div>

              <div
                className="transition-all duration-200 overflow-hidden"
                style={{ display: 'grid', gridTemplateRows: isGroupExpanded ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50/30">
                    <div className="space-y-2 pt-3">
                      {mockReturns.map((productReturn) => (
                        <ReturnRow key={productReturn.id} productReturn={productReturn} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
