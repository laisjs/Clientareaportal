import { AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from './ui/utils';

interface PaymentLinkAlertProps {
  status: 'pending' | 'expired' | 'failed';
  url: string;
  className?: string;
}

export function PaymentLinkAlert({ status, url, className = '' }: PaymentLinkAlertProps) {
  const isPending = status === 'pending';

  const title = isPending
    ? 'Pagamento Pendente'
    : status === 'failed'
    ? 'Falha no Cadastro do Cartão'
    : 'Link de Pagamento Expirado';

  const description = isPending
    ? 'Acesse o link para concluir o cadastro do cartão de crédito.'
    : status === 'failed'
    ? 'Ocorreu uma falha ao processar o pagamento. Gere um novo link para tentar novamente.'
    : 'O link de pagamento expirou. Gere um novo para continuar.';

  return (
    <div
      className={cn(
        'flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 p-4 rounded-lg border',
        isPending ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200',
        className,
      )}
    >
      <div className={cn('p-2 rounded-full shrink-0', isPending ? 'bg-amber-100' : 'bg-red-100')}>
        {isPending
          ? <AlertTriangle className="size-5 text-amber-600" />
          : <AlertCircle className="size-5 text-red-600" />}
      </div>
      <div className="flex-1">
        <p className={cn('text-sm font-bold', isPending ? 'text-amber-900' : 'text-red-900')}>
          {title}
        </p>
        <p className={cn('text-xs mt-0.5', isPending ? 'text-amber-700' : 'text-red-700')}>
          {description}
        </p>
      </div>
      {isPending && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full sm:w-auto text-center px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-md hover:bg-amber-700 transition-colors"
        >
          Acessar Link de Pagamento
        </a>
      )}
      {!isPending && (
        <button
          onClick={(e) => { e.stopPropagation(); alert('Gerando novo link de pagamento...'); }}
          className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-md hover:bg-red-700 transition-colors"
        >
          Gerar Novo Link
        </button>
      )}
    </div>
  );
}
