import { useState, useEffect } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  ChevronRight,
  FilterX, 
  CreditCard, 
  RefreshCw, 
  FileText,
  MapPin,
  Download,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../components/ui/utils';
import { ProductIcon } from '../components/ProductIcon';

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'PAGO' | 'PENDENTE' | 'ATRASADO';
  paymentMethod: string;
  cardLastDigits: string;
  recurrence: string;
  reference: string;
  product: string;
  productName: string; // Nome do produto para mapear o ícone
}

const mockPayments: Payment[] = [
  {
    id: '1',
    date: '01/01/2025',
    description: '2 fazendas vinculadas',
    amount: 2500.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '1234',
    recurrence: 'Mensal',
    reference: 'Mensalidade Jan/2025',
    product: 'Ideagri Pro',
    productName: 'Ideagri'
  },
  {
    id: '2',
    date: '01/12/2024',
    description: '2 fazendas vinculadas',
    amount: 2500.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '1234',
    recurrence: 'Mensal',
    reference: 'Mensalidade Dez/2024',
    product: 'Ideagri Pro',
    productName: 'Ideagri'
  },
  {
    id: '3',
    date: '01/11/2024',
    description: '2 fazendas vinculadas',
    amount: 2500.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '1234',
    recurrence: 'Mensal',
    reference: 'Mensalidade Nov/2024',
    product: 'Ideagri Pro',
    productName: 'Ideagri'
  },
  {
    id: '4',
    date: '01/10/2024',
    description: '2 fazendas vinculadas',
    amount: 2500.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '1234',
    recurrence: 'Mensal',
    reference: 'Mensalidade Out/2024',
    product: 'Ideagri Pro',
    productName: 'Ideagri'
  },
  {
    id: '5',
    date: '01/09/2024',
    description: '2 fazendas vinculadas',
    amount: 2500.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '1234',
    recurrence: 'Mensal',
    reference: 'Mensalidade Set/2024',
    product: 'Ideagri Pro',
    productName: 'Ideagri'
  },
  {
    id: '6',
    date: '01/08/2024',
    description: '2 fazendas vinculadas',
    amount: 2500.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '1234',
    recurrence: 'Mensal',
    reference: 'Mensalidade Ago/2024',
    product: 'Ideagri Pro',
    productName: 'Ideagri'
  },
  {
    id: '7',
    date: '01/07/2024',
    description: '2 fazendas vinculadas',
    amount: 2500.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '1234',
    recurrence: 'Mensal',
    reference: 'Mensalidade Jul/2024',
    product: 'Ideagri Pro',
    productName: 'Ideagri'
  },
];

const mockPaymentsRumiFlow: Payment[] = [
  {
    id: 'rf1',
    date: '15/01/2025',
    description: 'Fazenda Boa Esperança',
    amount: 3200.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '5678',
    recurrence: 'Mensal',
    reference: 'Mensalidade Jan/2025',
    product: 'Rumi Flow',
    productName: 'Rumi Flow'
  },
  {
    id: 'rf2',
    date: '15/12/2024',
    description: 'Fazenda Boa Esperança',
    amount: 3200.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '5678',
    recurrence: 'Mensal',
    reference: 'Mensalidade Dez/2024',
    product: 'Rumi Flow',
    productName: 'Rumi Flow'
  },
  {
    id: 'rf3',
    date: '15/11/2024',
    description: 'Fazenda Boa Esperança',
    amount: 3200.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '5678',
    recurrence: 'Mensal',
    reference: 'Mensalidade Nov/2024',
    product: 'Rumi Flow',
    productName: 'Rumi Flow'
  },
  {
    id: 'rf4',
    date: '15/10/2024',
    description: 'Fazenda Boa Esperança',
    amount: 3200.00,
    status: 'PAGO',
    paymentMethod: 'Boleto Bancário',
    cardLastDigits: '',
    recurrence: 'Mensal',
    reference: 'Mensalidade Out/2024',
    product: 'Rumi Flow',
    productName: 'Rumi Flow'
  },
  {
    id: 'rf5',
    date: '15/09/2024',
    description: 'Fazenda Boa Esperança',
    amount: 3200.00,
    status: 'PAGO',
    paymentMethod: 'Boleto Bancário',
    cardLastDigits: '',
    recurrence: 'Mensal',
    reference: 'Mensalidade Set/2024',
    product: 'Rumi Flow',
    productName: 'Rumi Flow'
  },
  {
    id: 'rf6',
    date: '15/08/2024',
    description: 'Fazenda Boa Esperança',
    amount: 3200.00,
    status: 'PAGO',
    paymentMethod: 'Boleto Bancário',
    cardLastDigits: '',
    recurrence: 'Mensal',
    reference: 'Mensalidade Ago/2024',
    product: 'Rumi Flow',
    productName: 'Rumi Flow'
  },
];

const mockPaymentsOnFarm: Payment[] = [
  {
    id: 'of1',
    date: '10/01/2025',
    description: 'Fazenda Monte Verde',
    amount: 1800.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '9012',
    recurrence: 'Mensal',
    reference: 'Mensalidade Jan/2025',
    product: 'On Farm',
    productName: 'On Farm'
  },
  {
    id: 'of2',
    date: '10/12/2024',
    description: 'Fazenda Monte Verde',
    amount: 1800.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '9012',
    recurrence: 'Mensal',
    reference: 'Mensalidade Dez/2024',
    product: 'On Farm',
    productName: 'On Farm'
  },
  {
    id: 'of3',
    date: '10/11/2024',
    description: 'Fazenda Monte Verde',
    amount: 1800.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '9012',
    recurrence: 'Mensal',
    reference: 'Mensalidade Nov/2024',
    product: 'On Farm',
    productName: 'On Farm'
  },
  {
    id: 'of4',
    date: '10/10/2024',
    description: 'Fazenda Monte Verde',
    amount: 1800.00,
    status: 'PAGO',
    paymentMethod: 'Boleto Bancário',
    cardLastDigits: '',
    recurrence: 'Mensal',
    reference: 'Mensalidade Out/2024',
    product: 'On Farm',
    productName: 'On Farm'
  },
  {
    id: 'of5',
    date: '10/09/2024',
    description: 'Fazenda Monte Verde',
    amount: 1800.00,
    status: 'PAGO',
    paymentMethod: 'Boleto Bancário',
    cardLastDigits: '',
    recurrence: 'Mensal',
    reference: 'Mensalidade Set/2024',
    product: 'On Farm',
    productName: 'On Farm'
  },
];

const mockPaymentsProCare: Payment[] = [
  {
    id: 'pc1',
    date: '20/01/2025',
    description: 'Fazenda Esperança',
    amount: 1300.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '3456',
    recurrence: 'Mensal',
    reference: 'Mensalidade Jan/2025',
    product: 'Pro Care',
    productName: 'Pro Care'
  },
  {
    id: 'pc2',
    date: '20/12/2024',
    description: 'Fazenda Esperança',
    amount: 1300.00,
    status: 'PAGO',
    paymentMethod: 'Cartão final',
    cardLastDigits: '3456',
    recurrence: 'Mensal',
    reference: 'Mensalidade Dez/2024',
    product: 'Pro Care',
    productName: 'Pro Care'
  },
  {
    id: 'pc3',
    date: '20/11/2024',
    description: 'Fazenda Esperança',
    amount: 1300.00,
    status: 'PAGO',
    paymentMethod: 'Boleto Bancário',
    cardLastDigits: '',
    recurrence: 'Mensal',
    reference: 'Mensalidade Nov/2024',
    product: 'Pro Care',
    productName: 'Pro Care'
  },
  {
    id: 'pc4',
    date: '20/10/2024',
    description: 'Fazenda Esperança',
    amount: 1300.00,
    status: 'PENDENTE',
    paymentMethod: 'Boleto Bancário',
    cardLastDigits: '',
    recurrence: 'Mensal',
    reference: 'Mensalidade Out/2024',
    product: 'Pro Care',
    productName: 'Pro Care'
  },
];

function PaymentRow({ payment }: { payment: Payment }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'PAGO':
        return { bg: 'bg-[#1bc47d]/10', border: 'border-[#1bc47d]/20', text: 'text-[#1bc47d]' };
      case 'PENDENTE':
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600' };
      case 'ATRASADO':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' };
    }
  };

  const statusColors = getStatusColor(payment.status);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-1.5 transition-all hover:shadow-sm">
      <div 
        className="px-4 py-2.5 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-5 flex-1">
          <div className="flex items-center gap-2 min-w-[100px]">
            <span className="text-sm font-bold text-gray-700">{payment.date}</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <span className="text-gray-200">|</span>
            <div className="flex items-center gap-1.5 text-gray-500">
              <span className="text-xs font-medium">{payment.description}</span>
            </div>
          </div>

          <div className="flex-1"></div>

          <span className="text-sm font-bold text-gray-900">{formatCurrency(payment.amount)}</span>
        </div>

        <div className="flex items-center gap-4 ml-4">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${statusColors.bg} ${statusColors.border} min-w-[80px] justify-center`}>
            <span className={`text-[9px] font-bold tracking-wider uppercase ${statusColors.text}`}>{payment.status}</span>
          </div>

          <ChevronDown 
            className={cn(
              "size-4 text-[#500d5b] transition-transform duration-200",
              isExpanded ? "rotate-180" : ""
            )} 
          />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="px-5 pb-5 pt-1 border-t border-gray-100 bg-gray-50/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-6">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white rounded-lg border border-gray-100 shadow-sm shrink-0">
                    <CreditCard className="size-4 text-[#500d5b]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Meio de Pagamento</p>
                    <p className="text-sm font-bold text-gray-800 leading-tight">
                      {payment.paymentMethod} {payment.cardLastDigits && `**** ${payment.cardLastDigits}`}
                    </p>
                    {payment.cardLastDigits && <p className="text-[10px] text-gray-400 font-medium mt-0.5">final **** {payment.cardLastDigits}</p>}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white rounded-lg border border-gray-100 shadow-sm shrink-0">
                    <RefreshCw className="size-4 text-[#1bc47d]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recorrência</p>
                    <p className="text-sm font-bold text-gray-800 leading-tight">{payment.recurrence}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">Cobrança Automática</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white rounded-lg border border-gray-100 shadow-sm shrink-0">
                    <FileText className="size-4 text-[#0d99ff]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Referência</p>
                    <p className="text-sm font-bold text-gray-800 leading-tight">{payment.reference}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">{payment.product}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                {payment.status === 'PAGO' && (
                  <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-[11px] font-bold text-[#500d5b] uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
                    <Download className="size-3.5" />
                    Download Comprovante
                  </button>
                )}
                
                {(payment.status === 'PENDENTE' || payment.status === 'ATRASADO') && payment.paymentMethod.toLowerCase().includes('boleto') && (
                  <button className="px-5 py-2.5 bg-[#0d99ff] border border-[#0d99ff] rounded-lg text-[11px] font-bold text-white uppercase tracking-widest shadow-sm hover:bg-[#0c88e6] transition-colors flex items-center gap-2 cursor-pointer">
                    <Download className="size-3.5" />
                    Download Boleto
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PaymentSectionProps {
  title: string;
  description: string;
  payments: Payment[];
  productName: string;
  defaultExpanded?: boolean;
}

function PaymentSection({ title, description, payments, productName, defaultExpanded = false }: PaymentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Sincronizar com defaultExpanded quando ele mudar
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);
  
  // REGRA DE NEGÓCIO: Ordenar pagamentos
  // 1. Se houver pendentes/atrasados: mostrar [pendentes/atrasados] + [último pago]
  // 2. Se não houver pendentes: mostrar apenas [último pago]
  const sortedPayments = (() => {
    const pending = payments.filter(p => p.status === 'PENDENTE' || p.status === 'ATRASADO');
    const paid = payments.filter(p => p.status === 'PAGO');
    
    if (pending.length > 0) {
      // Há pagamentos pendentes: mostrar pendentes primeiro + último pago
      const lastPaid = paid.length > 0 ? [paid[0]] : [];
      return [...pending, ...lastPaid];
    } else {
      // Não há pendentes: mostrar apenas o último pagamento realizado
      return paid.length > 0 ? [paid[0]] : [];
    }
  })();
  
  const visiblePayments = sortedPayments.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPayments.length;
  const showingAll = visibleCount >= sortedPayments.length && sortedPayments.length > 3;
  
  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, sortedPayments.length));
  };

  const handleShowLess = () => {
    setVisibleCount(3);
  };

  // Não renderizar a seção se não houver pagamentos
  if (!payments || payments.length === 0) {
    return null;
  }

  // Calcular métricas
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const lastPayment = payments[0]; // Assumindo que está ordenado por data decrescente
  const pendingCount = payments.filter(p => p.status === 'PENDENTE' || p.status === 'ATRASADO').length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <section className="mb-2">
      <div 
        className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-sm"
      >
        {/* Header Colapsável */}
        <div 
          className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2.5">
            <ProductIcon productName={productName} size="sm" />
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>
                <span className="font-semibold">{payments.length}</span> pagamento{payments.length > 1 ? 's' : ''}
              </span>
              <span className="text-gray-300">•</span>
              <span>
                Último: <span className="font-semibold">{lastPayment.date}</span>
              </span>
              {pendingCount > 0 && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="px-2 py-0.5 bg-yellow-100 border border-yellow-200 rounded-md text-[9px] font-bold text-yellow-700 uppercase">
                    {pendingCount} pendente{pendingCount > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>

            <ChevronDown 
              className={cn(
                "size-4 text-[#500d5b] transition-transform duration-200 shrink-0",
                isExpanded ? "rotate-180" : ""
              )} 
            />
          </div>
        </div>

        {/* Conteúdo Expansível */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50/30">
                <div className="space-y-1.5 pt-3">
                  {visiblePayments.map((payment) => (
                    <PaymentRow key={payment.id} payment={payment} />
                  ))}
                </div>
                
                {(hasMore || showingAll) && (
                  <div className="mt-3 flex justify-end">
                    {hasMore ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowMore();
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                      >
                        <ChevronDown className="size-3.5" />
                        Ver mais ({sortedPayments.length - visibleCount} restantes)
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowLess();
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                      >
                        <ChevronUp className="size-3.5" />
                        Ver menos
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function PaymentsPage() {
  return (
    <div className="bg-gray-50 pb-20 min-h-screen">
      {/* Header da Página - Seguindo padrão Meus Contratos */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-widest mb-4">
                <span className="capitalize">Portal iMilk</span>
                <ChevronRight className="size-3" />
                <span className="text-[#500d5b] capitalize">Meus pagamentos</span>
              </div>
              <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Meus Pagamentos</h1>
              <p className="text-sm text-gray-500 mt-3">Histórico de cobranças e faturas dos seus contratos.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Sincronizado em</p>
                <p className="text-sm font-semibold text-gray-900">Hoje, 14:30</p>
              </div>
              <div className="w-px h-8 bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <CreditCard className="size-4 text-[#500d5b]" />
                <span className="text-sm font-semibold text-gray-900">Faturas em Dia</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Filter Bar */}
        <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-end gap-3 mb-6">
          <div className="flex-1 min-w-[180px]">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Contrato</p>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 appearance-none outline-none focus:ring-1 focus:ring-[#500d5b]/20">
                <option>Todos os contratos</option>
                <option>Ideagri Pró</option>
                <option>Ideagri</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 min-w-[180px]">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</p>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 appearance-none outline-none focus:ring-1 focus:ring-[#500d5b]/20">
                <option>Todos os status</option>
                <option>Pago</option>
                <option>Pendente</option>
                <option>Atrasado</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 min-w-[180px]">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Período</p>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 appearance-none outline-none focus:ring-1 focus:ring-[#500d5b]/20">
                <option>Qualquer período</option>
                <option>Últimos 30 dias</option>
                <option>Últimos 3 meses</option>
                <option>Ano atual</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
            <FilterX className="size-4" />
            Limpar Filtros
          </button>
        </div>

        {/* IDEAGRI PRO Section */}
        <PaymentSection
          title="Ideagri Pro"
          description="Histórico de pagamentos do plano avançado"
          payments={mockPayments}
          productName="Ideagri"
        />

        {/* RUMI FLOW Section */}
        <PaymentSection
          title="Rumi Flow"
          description="Histórico de pagamentos do plano premium"
          payments={mockPaymentsRumiFlow}
          productName="Rumi Flow"
        />

        {/* ON FARM Section */}
        <PaymentSection
          title="On Farm"
          description="Histórico de pagamentos do plano plus"
          payments={mockPaymentsOnFarm}
          productName="On Farm"
        />

        {/* PRO CARE Section */}
        <PaymentSection
          title="Pro Care"
          description="Histórico de pagamentos do plano pro"
          payments={mockPaymentsProCare}
          productName="Pro Care"
        />
      </main>
    </div>
  );
}