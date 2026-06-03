import { useState } from 'react';
import {
  Package,
  ChevronDown,
  ChevronRight,
  Calendar,
  Truck,
  FilterX,
} from 'lucide-react';
import { cn } from '../components/ui/utils';
import { mockShipments, Shipment } from '../../data/shipments';

const PERIOD_OPTIONS = [
  { label: 'Todos os períodos', value: '' },
  { label: 'Últimos 30 dias', value: '30d' },
  { label: 'Últimos 90 dias', value: '90d' },
  { label: 'Último ano', value: '1y' },
];

const STATUS_LABELS: Record<string, string> = {
  recebido: 'Recebido',
  a_vencer: 'A Vencer',
  atrasado: 'Atrasado',
};

function getShipmentStatusColors(status: string) {
  switch (status) {
    case 'recebido':
      return { bg: 'rgba(27,196,125,0.1)', border: 'rgba(27,196,125,0.3)', text: '#1bc47d' };
    case 'a_vencer':
      return { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', text: '#f59e0b' };
    case 'atrasado':
      return { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#ef4444' };
    default:
      return { bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.3)', text: '#6b7280' };
  }
}

function getTypeBadgeClass(type: string) {
  switch (type) {
    case 'recurrence':
      return 'bg-[#0d99ff]/10 text-[#0d99ff] border border-[#0d99ff]/30';
    case 'replacement':
      return 'bg-yellow-50 text-yellow-600 border border-yellow-200';
    case 'smartlab':
      return 'bg-[#1bc47d]/10 text-[#1bc47d] border border-[#1bc47d]/30';
    default:
      return 'bg-gray-50 text-gray-600 border border-gray-200';
  }
}

function ShipmentRow({ shipment }: { shipment: Shipment }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTracking, setShowAllTracking] = useState(false);

  const lastEvent = shipment.trackingEvents.length > 0
    ? shipment.trackingEvents[shipment.trackingEvents.length - 1]
    : null;

  const statusColors = getShipmentStatusColors(shipment.status);

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-wrap flex-1">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 text-gray-400 shrink-0" />
            <span className="text-sm font-semibold text-gray-900">{shipment.dueDate}</span>
          </div>
          <span className="text-[11px] text-gray-400 font-mono">#{shipment.orderNumber}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={cn('text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider', getTypeBadgeClass(shipment.orderType))}>
            {shipment.orderTypeLabel}
          </span>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider"
            style={{ backgroundColor: statusColors.bg, color: statusColors.text, border: `1px solid ${statusColors.border}` }}
          >
            {STATUS_LABELS[shipment.status] ?? shipment.status}
          </span>
          <ChevronDown className={cn('size-5 text-gray-400 transition-transform shrink-0', isExpanded && 'rotate-180')} />
        </div>
      </div>

      <div
        className="transition-all duration-300 overflow-hidden"
        style={{ display: 'grid', gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-4 py-4 bg-gray-50/50 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shipment.nfNumber && (
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Nota Fiscal</p>
                  <p className="text-sm font-semibold text-gray-900">{shipment.nfNumber}</p>
                </div>
              )}
              {shipment.trackingCode && (
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Código de Rastreamento</p>
                  <p className="text-sm font-semibold text-gray-900">{shipment.trackingCode}</p>
                </div>
              )}
              {shipment.trackingStatus && (
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Status de Rastreamento</p>
                  <p className="text-sm font-semibold text-gray-900">{shipment.trackingStatus}</p>
                </div>
              )}
              {shipment.paymentDate && (
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Data de Pagamento</p>
                  <p className="text-sm font-semibold text-gray-900">{shipment.paymentDate}</p>
                </div>
              )}
            </div>

            {shipment.items.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Itens da Remessa</p>
                <div className="space-y-1.5">
                  {shipment.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-white text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-semibold text-gray-900 ml-2">× {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lastEvent && (
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Truck className="size-3" />
                  Último Evento de Rastreamento
                </p>
                <div className="p-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700">
                  {lastEvent.description}
                  {lastEvent.date && (
                    <span className="ml-2 text-[11px] text-gray-400">{lastEvent.date}</span>
                  )}
                  {lastEvent.location && (
                    <span className="ml-2 text-[11px] text-gray-400">{lastEvent.location}</span>
                  )}
                </div>

                {shipment.trackingEvents.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowAllTracking(!showAllTracking); }}
                    className="mt-2 text-[11px] font-semibold text-[#0d99ff] hover:opacity-70 transition-opacity"
                  >
                    {showAllTracking ? 'Ocultar histórico' : 'Ver histórico completo'}
                  </button>
                )}

                {showAllTracking && (
                  <div className="mt-2 space-y-2">
                    {[...shipment.trackingEvents].reverse().map((event, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-gray-100 bg-white text-sm text-gray-700">
                        {event.description}
                        {event.date && (
                          <span className="ml-2 text-[11px] text-gray-400">{event.date}</span>
                        )}
                        {event.location && (
                          <span className="ml-2 text-[11px] text-gray-400">{event.location}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShipmentsPage() {
  const [filters, setFilters] = useState({ period: '' });
  const [isGroupExpanded, setIsGroupExpanded] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-14 lg:top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-widest mb-2">
            <span>Rúmina</span>
            <ChevronRight className="size-3" />
            <span className="text-[#500d5b]">Minhas Remessas</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Minhas Remessas</h1>
          <p className="text-xs text-gray-500 mt-1">Histórico de remessas dos seus contratos On Farm.</p>
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

        {mockShipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="size-10 text-gray-300 mb-4" />
            <p className="text-sm font-semibold text-gray-500">Nenhuma remessa encontrada.</p>
            <p className="text-xs text-gray-400 mt-1">
              Quando houver remessas registradas, elas aparecerão aqui.
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
                  <Package className="size-5 text-[#500d5b]" />
                  <h2 className="text-sm font-semibold text-gray-900">On Farm</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline text-sm text-gray-500">
                    <span className="font-semibold">{mockShipments.length}</span>{' '}
                    remessa{mockShipments.length !== 1 ? 's' : ''}
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
                      {mockShipments.map((shipment) => (
                        <ShipmentRow key={shipment.id} shipment={shipment} />
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
