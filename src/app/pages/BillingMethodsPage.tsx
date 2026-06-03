import { useState } from 'react';
import {
  CreditCard,
  ChevronRight,
  ChevronDown,
  FileText,
  Calendar,
  X,
  Lock,
  AlertCircle,
  CheckCircle2,
  Info,
  Mail,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../components/ui/utils';
import { mockContracts } from '../../data/contracts';
import { toast } from 'sonner';
import { ProductIcon } from '../components/ProductIcon';
import { ContractDetailView } from '../components/ContractDetailView';

interface CardData {
  number: string;
  holderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

// ─── EmailLinkConfirmationModal ───────────────────────────────────────────────

function EmailLinkConfirmationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
    toast.success('Link enviado para cliente@email.com');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#500d5b]/10">
                <Mail className="size-5 text-[#500d5b]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Enviar link de cadastro</h2>
                <p className="text-xs text-gray-500 mt-0.5">Um link seguro será enviado para o seu e-mail</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="size-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <Info className="size-4 text-gray-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900">cliente@email.com</p>
              <p className="text-xs text-gray-500 mt-0.5">Link válido por 24 horas após o envio.</p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Após receber o link, você poderá cadastrar seu cartão de crédito com segurança diretamente pelo gateway de pagamento.
          </p>
        </div>

        <div className="px-6 pb-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-6 py-3 bg-[#500d5b] text-white rounded-lg text-sm font-bold hover:bg-[#3d0a45] transition-colors shadow-lg shadow-[#500d5b]/20"
          >
            Enviar Link
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── CardRegistrationModal ────────────────────────────────────────────────────

function CardRegistrationModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardData: CardData) => void;
}) {
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    holderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 16) {
      setCardData((prev) => ({ ...prev, number: cleaned }));
      if (errors.number) setErrors((prev) => ({ ...prev, number: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (cardData.number.length !== 16) newErrors.number = 'Número do cartão deve ter 16 dígitos';
    if (!cardData.holderName.trim()) newErrors.holderName = 'Nome do titular é obrigatório';
    if (!cardData.expiryMonth || parseInt(cardData.expiryMonth) < 1 || parseInt(cardData.expiryMonth) > 12)
      newErrors.expiryMonth = 'Mês inválido';
    if (!cardData.expiryYear || parseInt(cardData.expiryYear) < 2025) newErrors.expiryYear = 'Ano inválido';
    if (cardData.cvv.length !== 3) newErrors.cvv = 'CVV deve ter 3 dígitos';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit(cardData);
    setCardData({ number: '', holderName: '', expiryMonth: '', expiryYear: '', cvv: '' });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#500d5b]/10">
                <CreditCard className="size-5 text-[#500d5b]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Cadastrar Novo Cartão</h2>
                <p className="text-xs text-gray-500 mt-0.5">Insira os dados do seu cartão de crédito</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="size-4 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Número do Cartão
            </label>
            <div className="relative">
              <input
                type="text"
                value={formatCardNumber(cardData.number)}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                placeholder="0000 0000 0000 0000"
                className={cn(
                  'w-full px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all',
                  errors.number
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 focus:border-[#500d5b] focus:ring-4 focus:ring-[#500d5b]/10',
                )}
              />
              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            </div>
            {errors.number && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="size-3" /> {errors.number}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Nome do Titular (como está no cartão)
            </label>
            <input
              type="text"
              value={cardData.holderName}
              onChange={(e) => {
                setCardData((prev) => ({ ...prev, holderName: e.target.value.toUpperCase() }));
                if (errors.holderName) setErrors((prev) => ({ ...prev, holderName: '' }));
              }}
              placeholder="NOME COMPLETO"
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 text-sm font-medium uppercase transition-all',
                errors.holderName ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-[#500d5b] focus:ring-4 focus:ring-[#500d5b]/10',
              )}
            />
            {errors.holderName && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="size-3" /> {errors.holderName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {(['expiryMonth', 'expiryYear', 'cvv'] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  {field === 'expiryMonth' ? 'Mês' : field === 'expiryYear' ? 'Ano' : 'CVV'}
                </label>
                <input
                  type="text"
                  value={cardData[field]}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    const maxLen = field === 'expiryYear' ? 4 : field === 'cvv' ? 3 : 2;
                    if (value.length <= maxLen) {
                      setCardData((prev) => ({ ...prev, [field]: value }));
                      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
                    }
                  }}
                  placeholder={field === 'expiryMonth' ? 'MM' : field === 'expiryYear' ? 'AAAA' : '123'}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border-2 text-sm font-medium text-center transition-all',
                    errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-[#500d5b] focus:ring-4 focus:ring-[#500d5b]/10',
                  )}
                />
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="size-3" /> Inválido
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-100 rounded-lg">
            <Lock className="size-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-gray-900">Seus dados estão protegidos</p>
              <p className="text-xs text-gray-600 mt-1">
                Utilizamos criptografia de ponta a ponta (SSL/TLS) e padrão PCI-DSS para proteger suas informações.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#500d5b] text-white rounded-lg text-sm font-bold hover:bg-[#3d0a45] transition-colors shadow-lg shadow-[#500d5b]/20"
            >
              Confirmar Cadastro
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── PaymentMethodSelectionModal ──────────────────────────────────────────────

function PaymentMethodSelectionModal({
  isOpen,
  onClose,
  onSelect,
  currentMethod,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (method: string, useEmailLink?: boolean) => void;
  currentMethod: string;
}) {
  const [selectedMethod, setSelectedMethod] = useState(currentMethod);
  const [cardRegMethod, setCardRegMethod] = useState<'form' | 'email'>('form');

  const handleConfirm = () => {
    if (selectedMethod === 'Cartão de Crédito') {
      onSelect(selectedMethod, cardRegMethod === 'email');
    } else {
      onSelect(selectedMethod);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#500d5b]/10">
                <CreditCard className="size-5 text-[#500d5b]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Alterar Meio de Pagamento</h2>
                <p className="text-xs text-gray-500 mt-0.5">Selecione a nova forma de pagamento</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="size-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <label
            className={cn(
              'flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all group hover:shadow-md',
              selectedMethod === 'Cartão de Crédito'
                ? 'border-[#500d5b] bg-[#500d5b]/5 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300',
            )}
          >
            <input
              type="radio"
              name="payment-method"
              value="Cartão de Crédito"
              checked={selectedMethod === 'Cartão de Crédito'}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="sr-only"
            />
            <div className={cn('p-3 rounded-lg transition-all', selectedMethod === 'Cartão de Crédito' ? 'bg-[#500d5b]/10' : 'bg-gray-50 group-hover:bg-gray-100')}>
              <CreditCard className={cn('size-6', selectedMethod === 'Cartão de Crédito' ? 'text-[#500d5b]' : 'text-gray-400')} />
            </div>
            <div className="flex-1">
              <p className={cn('text-base font-bold mb-0.5', selectedMethod === 'Cartão de Crédito' ? 'text-[#500d5b]' : 'text-gray-700')}>
                Cartão de Crédito
              </p>
              <p className="text-xs text-gray-500">Pagamento automático no cartão cadastrado</p>
            </div>
            {selectedMethod === 'Cartão de Crédito' && <CheckCircle2 className="size-6 text-[#500d5b] shrink-0" />}
          </label>

          {/* Sub-seleção de método de cadastro do cartão */}
          {selectedMethod === 'Cartão de Crédito' && (
            <div className="ml-4 pl-4 border-l-2 border-[#500d5b]/20 space-y-2">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Como deseja cadastrar o cartão?</p>
              {(['form', 'email'] as const).map((method) => (
                <label
                  key={method}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all',
                    cardRegMethod === method ? 'border-[#500d5b]/40 bg-[#500d5b]/5' : 'border-gray-200 hover:bg-gray-50',
                  )}
                >
                  <input
                    type="radio"
                    name="card-reg-method"
                    value={method}
                    checked={cardRegMethod === method}
                    onChange={() => setCardRegMethod(method)}
                    className="sr-only"
                  />
                  <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0', cardRegMethod === method ? 'border-[#500d5b]' : 'border-gray-300')}>
                    {cardRegMethod === method && <div className="w-2 h-2 rounded-full bg-[#500d5b]" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {method === 'form' ? 'Preencher dados agora' : 'Receber link por e-mail'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {method === 'form' ? 'Insira os dados do cartão no formulário' : 'Envio de link seguro para cliente@email.com'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}

          <label
            className={cn(
              'flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all group hover:shadow-md',
              selectedMethod === 'Boleto'
                ? 'border-[#0d99ff] bg-[#0d99ff]/5 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300',
            )}
          >
            <input
              type="radio"
              name="payment-method"
              value="Boleto"
              checked={selectedMethod === 'Boleto'}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="sr-only"
            />
            <div className={cn('p-3 rounded-lg transition-all', selectedMethod === 'Boleto' ? 'bg-[#0d99ff]/10' : 'bg-gray-50 group-hover:bg-gray-100')}>
              <FileText className={cn('size-6', selectedMethod === 'Boleto' ? 'text-[#0d99ff]' : 'text-gray-400')} />
            </div>
            <div className="flex-1">
              <p className={cn('text-base font-bold mb-0.5', selectedMethod === 'Boleto' ? 'text-[#0d99ff]' : 'text-gray-700')}>
                Boleto Bancário
              </p>
              <p className="text-xs text-gray-500">Enviado mensalmente por e-mail</p>
            </div>
            {selectedMethod === 'Boleto' && <CheckCircle2 className="size-6 text-[#0d99ff] shrink-0" />}
          </label>

          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <Info className="size-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">A alteração será aplicada a partir do próximo ciclo de cobrança.</p>
          </div>
        </div>

        <div className="px-6 pb-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-6 py-3 bg-[#500d5b] text-white rounded-lg text-sm font-bold hover:bg-[#3d0a45] transition-colors shadow-lg shadow-[#500d5b]/20"
          >
            Confirmar alteração
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── ContractAccordion ────────────────────────────────────────────────────────

interface ContractAccordionProps {
  contract: any;
  isExpanded: boolean;
  onToggle: () => void;
  onPaymentMethodChange: (contractId: string, newMethod: string, cardData?: CardData) => void;
}

function ContractAccordion({ contract, isExpanded, onToggle, onPaymentMethodChange }: ContractAccordionProps) {
  const [selectedMethod, setSelectedMethod] = useState(contract.billing.paymentMethod);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const isCardPayment = contract.billing.paymentMethod.toLowerCase().includes('cartão') ||
    contract.billing.paymentMethod.toLowerCase().includes('credito');

  const generateMockCardNumber = (contractId: string): string => {
    const lastDigits = ['9876', '5432', '7890', '1234', '4567'];
    const index = parseInt(contractId.replace(/\D/g, '')) % lastDigits.length;
    return `5432876512${lastDigits[index]}`;
  };

  const generateMockExpiry = (contractId: string) => {
    const months = ['04', '06', '09', '12', '08'];
    const years = ['2026', '2027', '2029', '2028', '2030'];
    const index = parseInt(contractId.replace(/\D/g, '')) % months.length;
    return { month: months[index], year: years[index] };
  };

  const mockExpiry = generateMockExpiry(contract.id);
  const [cardInfo, setCardInfo] = useState<CardData | null>(
    isCardPayment ? {
      number: generateMockCardNumber(contract.id),
      holderName: 'NOME DO TITULAR',
      expiryMonth: mockExpiry.month,
      expiryYear: mockExpiry.year,
      cvv: '123',
    } : null,
  );

  const isCardExpiringSoon = (): boolean => {
    if (!isCardPayment || !cardInfo) return false;
    const currentDate = new Date();
    const cardYear = parseInt(cardInfo.expiryYear);
    const cardMonth = parseInt(cardInfo.expiryMonth);
    const expiryDate = new Date(cardYear, cardMonth - 1, 1);
    const twoMonthsFromNow = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);
    return expiryDate <= twoMonthsFromNow && expiryDate >= new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  };

  const handlePaymentMethodSelect = (method: string, useEmailLink?: boolean) => {
    setSelectedMethod(method);
    setShowPaymentMethodModal(false);
    if (method === 'Cartão de Crédito') {
      if (useEmailLink) {
        setShowEmailModal(true);
      } else {
        setShowCardModal(true);
      }
    } else {
      onPaymentMethodChange(contract.id, method);
      setCardInfo(null);
    }
  };

  const handleCardSubmit = (cardData: CardData) => {
    onPaymentMethodChange(contract.id, selectedMethod, cardData);
    setCardInfo(cardData);
    setShowCardModal(false);
  };

  return (
    <>
      <PaymentMethodSelectionModal
        isOpen={showPaymentMethodModal}
        onClose={() => setShowPaymentMethodModal(false)}
        onSelect={handlePaymentMethodSelect}
        currentMethod={contract.billing.paymentMethod}
      />
      <CardRegistrationModal
        isOpen={showCardModal}
        onClose={() => { setShowCardModal(false); setSelectedMethod(contract.billing.paymentMethod); }}
        onSubmit={handleCardSubmit}
      />
      <EmailLinkConfirmationModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
      />

      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden transition-all hover:shadow-md">
        <div
          className="px-4 py-2.5 cursor-pointer hover:bg-gray-50/50 transition-colors"
          onClick={onToggle}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ProductIcon productName={contract.productName} size="sm" className="shrink-0" />
              <h3 className="text-sm font-semibold text-gray-900">{contract.planName}</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {isCardPayment ? <CreditCard className="size-4 text-gray-400" /> : <FileText className="size-4 text-gray-400" />}
                <span>{isCardPayment ? 'Cartão de Crédito' : 'Boleto'}</span>
              </div>
              {isCardExpiringSoon() && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-md border border-amber-300">
                  <AlertCircle className="size-3 text-amber-600" />
                  <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase">Cartão próximo vencimento</span>
                </div>
              )}
              <ChevronDown className={cn('size-4 text-[#500d5b] transition-transform duration-200', isExpanded && 'rotate-180')} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="border-t border-gray-100">
                <ContractDetailView
                  contract={contract}
                  cardLastDigits={cardInfo?.number.slice(-4) || '0000'}
                  onEditPayment={() => setShowPaymentMethodModal(true)}
                  onChangeCard={() => setShowCardModal(true)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ─── BillingMethodsPage ───────────────────────────────────────────────────────

export function BillingMethodsPage() {
  const activeContracts = mockContracts.filter((c) => c.status === 'Vigente');
  const [expandedContracts, setExpandedContracts] = useState<string[]>([]);
  const [contractPaymentMethods, setContractPaymentMethods] = useState<{ [key: string]: string }>(
    Object.fromEntries(activeContracts.map((c) => [c.id, c.billing.paymentMethod])),
  );

  const toggleContract = (contractId: string) => {
    setExpandedContracts((prev) =>
      prev.includes(contractId) ? prev.filter((id) => id !== contractId) : [...prev, contractId],
    );
  };

  const handlePaymentMethodChange = (contractId: string, newMethod: string, cardData?: CardData) => {
    setContractPaymentMethods((prev) => ({ ...prev, [contractId]: newMethod }));
    if (cardData) console.log(`Cartão atualizado para ${contractId}:`, cardData);
    toast.success(`Meio de pagamento alterado para ${newMethod}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-14 lg:top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-widest mb-2">
                <span>Rúmina</span>
                <ChevronRight className="size-3" />
                <span className="text-[#500d5b]">Meio de Pagamento</span>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Gestão de Meio de Pagamento</h1>
              <p className="text-xs text-gray-500 mt-1">Visualize e altere os meios de pagamento de cada contrato ativo.</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Contratos Ativos</p>
              <p className="text-sm font-semibold text-gray-900">{activeContracts.length} contratos</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-5 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-2">
          <FileText className="size-4 text-[#0d99ff] shrink-0" />
          <p className="text-xs text-gray-600">
            Clique em cada contrato para expandir e gerenciar o meio de pagamento. Use <span className="font-bold">"Alterar"</span> para trocar entre Cartão de Crédito e Boleto.
          </p>
        </div>

        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Contratos Vigentes</h2>
          </div>
          <div className="space-y-3">
            {activeContracts.map((contract) => (
              <ContractAccordion
                key={contract.id}
                contract={{ ...contract, billing: { ...contract.billing, paymentMethod: contractPaymentMethods[contract.id] } }}
                isExpanded={expandedContracts.includes(contract.id)}
                onToggle={() => toggleContract(contract.id)}
                onPaymentMethodChange={handlePaymentMethodChange}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
