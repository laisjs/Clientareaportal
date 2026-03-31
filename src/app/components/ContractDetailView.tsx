import { 
  CreditCard, 
  FileText,
  CheckCircle
} from 'lucide-react';
import { ProductIcon } from './ProductIcon';

interface ContractDetailViewProps {
  contract: any;
  onNavigate?: (tab: string) => void;
  onEditPayment?: () => void;
  onChangeCard?: () => void;
  cardLastDigits?: string;
  cardExpiry?: string;
}

export function ContractDetailView({ 
  contract, 
  onNavigate, 
  onEditPayment,
  onChangeCard,
  cardLastDigits = '2790',
  cardExpiry = '12/26'
}: ContractDetailViewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const isCardPayment = contract.billing.paymentMethod.toLowerCase().includes('cartão');

  // Verificar se existem produtos para exibir
  const hasProducts = (contract.includedProducts && contract.includedProducts.length > 0) || 
                      contract.productName || 
                      (contract.additionalServices && contract.additionalServices.length > 0);

  // Verificar se existem informações de cobrança para exibir
  const hasBillingInfo = contract.values?.finalValue || contract.billing?.nextBillingDate;

  // Verificar se existe método de pagamento para exibir
  const hasPaymentMethod = contract.billing?.paymentMethod;

  return (
    <div className="py-6 px-6">
      {/* Layout de 3 Colunas - Limpo e Direto */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA 1: Included in your plan */}
        {hasProducts && (
          <div className="lg:col-span-1">
            <div>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Incluído no seu plano</h3>
              
              <div className="space-y-3">
                {contract.includedProducts && contract.includedProducts.length > 0 ? (
                  <>
                    {contract.includedProducts.slice(0, 4).map((product: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <CheckCircle className="size-3.5 text-[#0d99ff]" />
                        <span className="text-sm font-normal text-gray-900">{product.name}</span>
                      </div>
                    ))}
                    {contract.includedProducts.length > 4 && (
                      <button className="text-sm font-semibold text-[#0d99ff] hover:underline mt-2">
                        +{contract.includedProducts.length - 4} ver mais
                      </button>
                    )}
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="size-3.5 text-[#0d99ff]" />
                      <span className="text-sm font-normal text-gray-900">{contract.productName}</span>
                    </div>
                    {contract.additionalServices && contract.additionalServices.map((service: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <CheckCircle className="size-3.5 text-[#0d99ff]" />
                        <span className="text-sm font-normal text-gray-900">{service.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* COLUNA 2: Informações de Cobrança */}
        {hasBillingInfo && (
          <div className="lg:col-span-1">
            <div>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Cobrança e pagamento</h3>
              
              <div className="space-y-3">
                {contract.values?.finalValue && (
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {formatCurrency(contract.values.finalValue)}
                    </p>
                    <span className="text-sm font-normal text-gray-600">/mês</span>
                  </div>
                )}
                
                {contract.billing?.nextBillingDate && (
                  <p className="text-sm text-gray-600">
                    Próximo pagamento em <span className="font-medium text-gray-900">{contract.billing.nextBillingDate}</span>
                  </p>
                )}
                
                <p className="text-xs text-gray-500">
                  Plano anual, pago mensalmente
                </p>
              </div>
            </div>
          </div>
        )}

        {/* COLUNA 3: Método de Pagamento e Botões */}
        {hasPaymentMethod && (
          <div className="lg:col-span-1">
            <div>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Método de Pagamento</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {isCardPayment ? (
                    <>
                      <CreditCard className="size-5 text-gray-700" />
                      <span className="text-sm font-normal text-gray-900">
                        Visa ending ****{cardLastDigits} (exp. {cardExpiry})
                      </span>
                    </>
                  ) : (
                    <>
                      <FileText className="size-5 text-gray-700" />
                      <span className="text-sm font-normal text-gray-900">
                        Boleto Bancário
                      </span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  {isCardPayment && onChangeCard && (
                    <button
                      onClick={onChangeCard}
                      className="w-full px-4 py-2.5 bg-white border-2 border-[#0d99ff]/30 rounded-lg text-sm font-semibold text-[#0d99ff] hover:bg-[#0d99ff]/5 hover:border-[#0d99ff]/50 transition-colors"
                    >
                      Trocar Cartão
                    </button>
                  )}
                  
                  {onEditPayment && (
                    <button
                      onClick={onEditPayment}
                      className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      Alterar pagamento
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}