import { useState } from 'react';
import { 
  CreditCard, 
  ChevronRight, 
  RefreshCw, 
  ArrowRightLeft, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../components/ui/utils';

interface PaymentMethod {
  id: string;
  type: 'card' | 'boleto';
  brand?: string;
  lastDigits?: string;
  label: string;
}

interface Subscription {
  id: string;
  productName: string;
  planName: string;
  status: 'Ativo' | 'Pendente' | 'Suspenso';
  value: string;
  nextBilling: string;
  paymentMethodId: string;
  color: string;
}

const MOCK_METHODS: PaymentMethod[] = [
  { id: 'm1', type: 'card', brand: 'Mastercard', lastDigits: '4452', label: 'Mastercard •••• 4452' },
  { id: 'm2', type: 'card', brand: 'Visa', lastDigits: '8812', label: 'Visa •••• 8812' },
  { id: 'm3', type: 'boleto', label: 'Boleto Bancário (Mensal)' },
];

const MOCK_SUBSCRIPTIONS: Subscription[] = [
  { 
    id: 's1', 
    productName: 'Ideagri Pro', 
    planName: 'Plano Enterprise - 500 Matrizes', 
    status: 'Ativo', 
    value: 'R$ 1.250,00', 
    nextBilling: '15/02/2026',
    paymentMethodId: 'm1',
    color: '#500d5b'
  },
  { 
    id: 's2', 
    productName: 'Rumi Flow', 
    planName: 'Monitoramento Avançado', 
    status: 'Ativo', 
    value: 'R$ 480,00', 
    nextBilling: '22/02/2026',
    paymentMethodId: 'm2',
    color: '#1bc47d'
  },
  { 
    id: 's3', 
    productName: 'Pro Care', 
    planName: 'Consultoria Mensal', 
    status: 'Ativo', 
    value: 'R$ 890,00', 
    nextBilling: '10/02/2026',
    paymentMethodId: 'm3',
    color: '#0d99ff'
  },
  { 
    id: 's4', 
    productName: 'Ideagri', 
    planName: 'Versão Starter', 
    status: 'Ativo', 
    value: 'R$ 350,00', 
    nextBilling: '05/03/2026',
    paymentMethodId: 'm1',
    color: '#500d5b'
  }
];

export function SubscriptionsBillingPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);
  const [selectingMethodFor, setSelectingMethodFor] = useState<string | null>(null);

  const handleChangeMethod = (subId: string, methodId: string) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subId ? { ...sub, paymentMethodId: methodId } : sub
    ));
    setSelectingMethodFor(null);
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#500d5b] tracking-tight">Gestão por Produto</h1>
            <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-[0.15em]">Associações de faturamento e serviços ativos</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer">
              <FileText className="size-4" />
              Histórico de Faturas
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-12 py-10">
        {/* Intro Alert */}
        <div className="mb-10 p-5 bg-[#500d5b]/[0.02] border border-[#500d5b]/10 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <RefreshCw className="size-5 text-[#500d5b]" />
            </div>
            <div>
              <p className="text-xs font-black text-[#500d5b] uppercase tracking-widest">Faturamento Independente</p>
              <p className="text-[13px] text-gray-500 font-medium">Você pode definir um cartão diferente para cada um dos seus produtos iMilk.</p>
            </div>
          </div>
          <button className="text-[10px] font-black text-[#500d5b] uppercase tracking-widest underline decoration-2 underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer">
            Saiba como funciona
          </button>
        </div>

        {/* Subscriptions Grid */}
        <div className="grid grid-cols-1 gap-6">
          {subscriptions.map((sub) => {
            const currentMethod = MOCK_METHODS.find(m => m.id === sub.paymentMethodId);
            
            return (
              <motion.div 
                key={sub.id}
                layout
                className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="px-4 py-2.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  {/* Product Info - Left */}
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="size-10 rounded-lg flex items-center justify-center text-white font-black text-sm shadow"
                      style={{ backgroundColor: sub.color }}
                    >
                      {sub.productName.charAt(0)}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{sub.productName}</h3>
                    <span className="px-2 py-0.5 bg-green-50 text-[#1bc47d] rounded text-[9px] font-bold uppercase tracking-wider border border-green-100">
                      {sub.status}
                    </span>
                  </div>

                  {/* Payment Method - Right */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {currentMethod?.type === 'card' ? (
                      <CreditCard className="size-4 text-gray-400" />
                    ) : (
                      <FileText className="size-4 text-gray-400" />
                    )}
                    <span>{currentMethod?.label}</span>
                    <ChevronDown className="size-4 text-[#500d5b] ml-2" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Footer */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-center justify-between border-t border-gray-100 pt-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-2xl">
              <AlertCircle className="size-6 text-amber-500" />
            </div>
            <div>
              <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-1">Cartão expirando?</p>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">Se o cartão Mastercard •••• 4452 expirar, 2 produtos serão afetados.</p>
            </div>
          </div>

          <button className="flex items-center gap-3 px-8 py-4 bg-[#500d5b] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#3d0a45] transition-all shadow-xl shadow-[#500d5b]/20 cursor-pointer">
            Gerenciar Cartões Salvos
            <ArrowRightLeft className="size-4" />
          </button>
        </div>
      </main>
    </div>
  );
}