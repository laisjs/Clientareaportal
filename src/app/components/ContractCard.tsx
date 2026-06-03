import { useState } from 'react';
import { Contract } from '../../data/contracts';
import { StatusBadge } from './StatusBadge';
import { ProductIcon } from './ProductIcon';
import { PaymentLinkAlert } from './PaymentLinkAlert';
import {
  ChevronDown,
  FileText,
  Calendar,
  Building2,
  IdCard,
  DollarSign,
  CheckCircle,
  AlertCircle,
  FileSignature,
  Package,
  PlusCircle,
  AlertTriangle,
  MapPin,
  CreditCard,
  Star,
  Handshake,
  Snowflake,
} from 'lucide-react';
import { cn } from './ui/utils';

interface ContractCardProps {
  contract: Contract;
}

const ORDER_TYPE_BADGE: Record<string, string> = {
  recurrence: 'bg-[#0d99ff]/10 text-[#0d99ff] border border-[#0d99ff]/30',
  replacement: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
  smartlab: 'bg-[#1bc47d]/10 text-[#1bc47d] border border-[#1bc47d]/30',
};

const ORDER_STATUS_LABELS: Record<string, string> = {
  em_separacao: 'Em Separação',
  enviado: 'Enviado',
  entregue: 'Entregue',
  aguardando: 'Aguardando',
};

export function ContractCard({ contract }: ContractCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getPaymentStatusColor = (status: 'Pago' | 'Pendente' | 'Falhou') => {
    switch (status) {
      case 'Pago':
        return { bg: 'rgba(27, 196, 125, 0.1)', border: 'rgba(27, 196, 125, 0.3)', text: '#1bc47d' };
      case 'Pendente':
        return { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', text: '#f59e0b' };
      case 'Falhou':
        return { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' };
    }
  };

  const isActive = contract.status === 'Vigente';
  const isInadimplente = contract.billing?.financialStatus === 'Inadimplente';

  const cardStyle = isActive
    ? { backgroundColor: 'white', borderColor: isInadimplente ? '#ef4444' : '#e5e7eb', opacity: 1 }
    : { backgroundColor: '#fafafa', borderColor: '#e5e7eb', opacity: 0.85 };

  const additionalServicesTotal = contract.additionalServices?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  return (
    <div
      className={`rounded-lg border overflow-hidden transition-all ${isInadimplente ? 'ring-1 ring-red-100' : 'hover:shadow-md'}`}
      style={cardStyle}
    >
      {/* Card Header */}
      <div className="px-4 py-2.5 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 flex-1">
            <ProductIcon productName={contract.productName} size="sm" className="shrink-0" />
            <h3 className="text-sm font-semibold text-gray-900">{contract.planName}</h3>
            {isInadimplente && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 border border-red-200 rounded-md ml-2 animate-pulse">
                <AlertTriangle className="size-3.5 text-red-600" />
                <span className="text-[11px] font-semibold text-red-600 uppercase tracking-wider">Inadimplente</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="size-4 text-gray-400" />
              <span>
                {isActive
                  ? contract.endDate
                    ? `Início em ${contract.startDate} • Vigente até ${contract.endDate}`
                    : `Início em ${contract.startDate}`
                  : `Início em ${contract.startDate} • Encerrado em ${contract.endDate}`}
              </span>
            </div>
            <StatusBadge status={contract.status} />
            <ChevronDown
              className={`size-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              style={{ color: '#500d5b' }}
            />
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50/50">

          {/* Inadimplente alert */}
          {isInadimplente && (
            <div className="px-5 py-3 bg-red-50 border-b border-red-100 flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="size-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-red-900">Atenção: Pendência Financeira Detectada</p>
                <p className="text-xs text-red-700">Identificamos faturas em aberto para este contrato. O acesso aos serviços pode ser afetado.</p>
              </div>
              <button
                className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-md hover:bg-red-700 transition-colors"
                onClick={(e) => { e.stopPropagation(); alert('Redirecionando para Segunda Via de Boleto...'); }}
              >
                Regularizar Agora
              </button>
            </div>
          )}

          {/* Payment Link Alert */}
          {contract.paymentLink && (
            <div className="px-5 py-3 border-b border-gray-200">
              <PaymentLinkAlert status={contract.paymentLink.status} url={contract.paymentLink.url} />
            </div>
          )}

          {/* Produtos Incluídos no Plano */}
          {contract.includedProducts && contract.includedProducts.length > 0 && (
            <div className="p-5 bg-white border-b border-gray-200">
              <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Incluído no seu plano</h4>
              <div className="flex flex-wrap gap-2">
                {contract.includedProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50/50">
                    <CheckCircle className="size-3.5 text-[#0d99ff]" />
                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dados do Cliente */}
          <div className="p-5 bg-white border-b border-gray-200">
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Dados do Cliente</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#500d5b]/10">
                  <Building2 className="size-4 text-[#500d5b]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Razão Social</p>
                  <p className="text-sm font-semibold text-gray-900">{contract.customer.companyName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#500d5b]/10">
                  <Building2 className="size-4 text-[#500d5b]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Nome Fantasia</p>
                  <p className="text-sm font-semibold text-gray-900">{contract.customer.tradeName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#500d5b]/10">
                  <IdCard className="size-4 text-[#500d5b]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {contract.customer.document.includes('/') ? 'CNPJ' : 'CPF'}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{contract.customer.document}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Serviços Adicionais */}
          {contract.additionalServices && contract.additionalServices.length > 0 && (
            <div className="p-5 bg-white border-b border-gray-200">
              <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Serviços Adicionais</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {contract.additionalServices.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0d99ff]/10">
                        <PlusCircle className="size-4 text-[#0d99ff]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{service.name}</p>
                        <p className="text-[11px] font-semibold text-[#1bc47d] uppercase tracking-wider">{service.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-gray-400 font-semibold uppercase mb-0.5">Mensal</p>
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(service.value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fazendas Vinculadas */}
          {contract.farms && contract.farms.length > 0 && (
            <div className="p-5 bg-white border-b border-gray-200">
              <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Fazendas Vinculadas ao Contrato</h4>
              <div className="space-y-2">
                {contract.farms.map((farm) => (
                  <div
                    key={farm.id}
                    className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/30 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <MapPin className="size-4 text-[#1bc47d]" />
                      <h5 className="text-sm font-semibold text-gray-900">{farm.name}</h5>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3.5 text-gray-400" />
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Ativação</span>
                          <span className="text-sm font-semibold text-gray-900">{farm.activationDate}</span>
                        </div>
                      </div>

                      <div
                        className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                          farm.status === 'Ativo'
                            ? 'bg-[#1bc47d]/10 text-[#1bc47d] border border-[#1bc47d]/20'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                      >
                        {farm.status}
                      </div>

                      {farm.rewardPoints !== undefined && farm.rewardPoints > 0 && (
                        <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-md">
                          <Star className="size-3 text-amber-600" />
                          <span className="text-[10px] font-bold text-amber-700">{farm.rewardPoints} pts</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resumo Financeiro */}
          <div className="p-5 bg-white border-b border-gray-200">
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Resumo Financeiro do Contrato</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="size-3.5 text-gray-400" />
                  <p className="text-[11px] text-gray-400 font-semibold uppercase">Plano {contract.productName}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(contract.values.currentValue)}</p>
              </div>

              <div className="p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <PlusCircle className="size-3.5 text-gray-400" />
                  <p className="text-[11px] text-gray-400 font-semibold uppercase">Serviços Adicionais</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(additionalServicesTotal)}</p>
              </div>

              <div className="p-3 rounded-lg border-2 shadow-sm" style={{ borderColor: '#500d5b', backgroundColor: 'white' }}>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="size-3.5" style={{ color: '#500d5b' }} />
                  <p className="text-[11px] font-semibold uppercase" style={{ color: '#500d5b' }}>Valor Total</p>
                </div>
                <p className="text-lg font-semibold" style={{ color: '#500d5b' }}>
                  {formatCurrency(contract.values.finalValue)}
                </p>
              </div>
            </div>

            {contract.values.discounts && contract.values.discounts > 0 && (
              <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-100 rounded-lg w-fit">
                <CheckCircle className="size-3.5 text-[#1bc47d]" />
                <p className="text-[11px] font-semibold text-[#1bc47d] uppercase">
                  Descontos e bonificações aplicados: {formatCurrency(contract.values.discounts)}
                </p>
              </div>
            )}
          </div>

          {/* Plano de Parceria */}
          {contract.partnershipPlan?.enabled && (
            <div className="p-5 bg-white border-b border-gray-200">
              <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Plano de Parceria</h4>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-blue-100 bg-blue-50/30">
                <div className="p-2 rounded-lg bg-[#0d99ff]/10 shrink-0">
                  <Handshake className="size-5 text-[#0d99ff]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{contract.partnershipPlan.partnerName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Desconto de{' '}
                    <span className="font-semibold text-[#0d99ff]">
                      {contract.partnershipPlan.discountRate}% ({contract.partnershipPlan.ratioUnit})
                    </span>{' '}
                    aplicado ao contrato
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Congelamento de Contrato */}
          {contract.freezing?.isFrozen && (
            <div className="p-5 bg-white border-b border-gray-200">
              <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Contrato Congelado</h4>
              <div className="flex items-start gap-4 p-4 rounded-lg border border-amber-200 bg-amber-50">
                <div className="p-2 rounded-lg bg-amber-100 shrink-0">
                  <Snowflake className="size-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-amber-900">Congelamento {contract.freezing.type}</p>
                  </div>
                  <p className="text-xs text-amber-700">
                    Período: {contract.freezing.startDate}
                    {contract.freezing.endDate ? ` → ${contract.freezing.endDate}` : ' → Em aberto'}
                  </p>
                  {contract.freezing.reason && (
                    <p className="text-xs text-amber-700 mt-1">{contract.freezing.reason}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Status Financeiro e Cobrança */}
          <div className="p-5 bg-white border-b border-gray-200">
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Status Financeiro e Cobrança</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className={`p-3 rounded-lg border ${isInadimplente ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {contract.billing.financialStatus === 'Adimplente' ? (
                    <CheckCircle className="size-3.5" style={{ color: '#1bc47d' }} />
                  ) : (
                    <AlertCircle className="size-3.5" style={{ color: '#ef4444' }} />
                  )}
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</p>
                </div>
                <p className="text-sm font-semibold" style={{ color: contract.billing.financialStatus === 'Adimplente' ? '#1bc47d' : '#ef4444' }}>
                  {contract.billing.financialStatus}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="size-3.5 text-gray-400" />
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Meio de Pagamento</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{contract.billing.paymentMethod}</p>
              </div>

              <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Última Cobrança</p>
                <p className="text-sm font-semibold text-gray-900">{contract.billing.lastBillingDate}</p>
              </div>

              <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Próxima Cobrança</p>
                <p className="text-sm font-semibold text-gray-900">{contract.billing.nextBillingDate}</p>
              </div>

              <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Ciclo</p>
                <p className="text-sm font-semibold text-gray-900">{contract.billing.frequency}</p>
              </div>
            </div>
          </div>

          {/* Histórico de Pagamentos */}
          <div className="p-5 bg-white border-b border-gray-200">
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Histórico de Pagamentos</h4>
            {contract.paymentHistory.length > 0 ? (
              <div className="space-y-2">
                {contract.paymentHistory.map((payment) => {
                  const colors = getPaymentStatusColor(payment.status);
                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-2.5 rounded-lg border transition-colors hover:bg-gray-50"
                      style={{ borderColor: colors.border, backgroundColor: colors.bg }}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="size-4 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">{payment.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(payment.amount)}</span>
                        <span
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                          style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 rounded-lg border-2 border-dashed border-gray-100">
                <FileText className="size-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-semibold">Nenhum pagamento registrado</p>
              </div>
            )}
          </div>

          {/* Pedidos de Remessa (On Farm) */}
          {contract.isOnFarm && contract.shipmentOrders && contract.shipmentOrders.length > 0 && (
            <div className="p-5 bg-white border-b border-gray-200">
              <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Pedidos de Remessa</h4>
              <div className="space-y-2">
                {contract.shipmentOrders.map((order) => (
                  <div key={order.id} className="flex items-start justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/30">
                    <div className="flex items-start gap-3">
                      <Package className="size-4 text-[#500d5b] shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider', ORDER_TYPE_BADGE[order.type] ?? 'bg-gray-50 text-gray-600 border border-gray-200')}>
                            {order.orderTypeLabel}
                          </span>
                          <span className="text-xs text-gray-400">Previsto: {order.expectedDate}</span>
                        </div>
                        <div className="space-y-0.5">
                          {order.items.map((item, idx) => (
                            <p key={idx} className="text-xs text-gray-600">
                              {item.name} <span className="font-semibold text-gray-900">× {item.quantity}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded shrink-0">
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Termo de Adesão */}
          {contract.agreementTerm && (
            <div className="px-5 py-4 border-b border-gray-200">
              <div className="rounded-lg border px-4 py-3" style={{ borderColor: '#0d99ff', backgroundColor: 'rgba(13, 153, 255, 0.03)' }}>
                <div className="flex items-start gap-2">
                  <FileSignature className="size-4 mt-px shrink-0" style={{ color: '#0d99ff' }} />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: '#0d99ff' }}>
                      Contrato via Termo de Adesão
                    </h4>
                    <p className="text-xs text-gray-700 mb-2">
                      Formalizado em: <span className="font-medium">{contract.agreementTerm.termDate}</span>
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); alert('Solicitação de cópia enviada ao setor jurídico.'); }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold hover:opacity-70 transition-opacity"
                      style={{ color: '#0d99ff' }}
                    >
                      Solicitar cópia formal do termo →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documentação */}
          <div className="px-5 py-4 border-b border-gray-200 bg-white">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Documentação Disponível</h4>
            <div className="flex gap-2.5">
              <button
                onClick={(e) => { e.stopPropagation(); alert('Abrindo visualizador de PDF...'); }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-white text-[11px] font-semibold rounded-md hover:opacity-90 transition-opacity uppercase tracking-wide"
                style={{ backgroundColor: '#0d99ff' }}
              >
                <FileText className="size-3.5" />
                Visualizar PDF
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); alert('Iniciando download...'); }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-[11px] font-semibold rounded-md hover:bg-gray-50 transition-colors uppercase tracking-wide"
              >
                Download
              </button>
            </div>
          </div>

          {/* Help Message */}
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Dúvidas Contratuais? Contate <span className="text-[#500d5b]">suporte@rumina.com.br</span> ou ligue <span className="text-[#500d5b]">(31) 99509-3854</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
