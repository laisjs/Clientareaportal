export interface ReturnItem {
  name: string;
  quantity: number;
}

export interface ReversePosting {
  status: string;
  pickupNumber?: string;
  expireDate?: string;
}

export interface ProductReturn {
  id: string;
  nfNumber?: string;
  reason?: string;
  status: 'open' | 'in_progress' | 'done' | 'attention';
  items: ReturnItem[];
  reversePosting?: ReversePosting;
  contractId: string;
  productGroup: string;
  createdAt: string;
}

export function getReturnStatusColors(status: ProductReturn['status']) {
  switch (status) {
    case 'in_progress':
      return { bg: 'rgba(13,153,255,0.1)', border: 'rgba(13,153,255,0.3)', text: '#0d99ff' };
    case 'done':
      return { bg: 'rgba(27,196,125,0.1)', border: 'rgba(27,196,125,0.3)', text: '#1bc47d' };
    case 'attention':
      return { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#f59e0b' };
    default:
      return { bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.3)', text: '#6b7280' };
  }
}

export const RETURN_STATUS_LABELS: Record<ProductReturn['status'], string> = {
  open: 'Aberto',
  in_progress: 'Em andamento',
  done: 'Concluído',
  attention: 'Atenção',
};

export const mockReturns: ProductReturn[] = [
  {
    id: 'ret1',
    nfNumber: '00123',
    reason: 'Defeito de fabricação — sensor não calibra corretamente após 3 semanas de uso',
    status: 'in_progress',
    items: [
      { name: 'Sensor Rúmi Plus', quantity: 1 },
    ],
    reversePosting: {
      status: 'Aguardando Postagem',
      pickupNumber: 'COL-2025-0012',
      expireDate: '28/02/2025',
    },
    contractId: '5',
    productGroup: 'On Farm',
    createdAt: '15/01/2025',
  },
  {
    id: 'ret2',
    nfNumber: '00089',
    reason: 'Produto recebido em quantidade incorreta — pedido enviou 8 unidades, recebido apenas 4',
    status: 'done',
    items: [
      { name: 'Bateria de Reposição AA', quantity: 4 },
    ],
    contractId: '5',
    productGroup: 'On Farm',
    createdAt: '10/12/2024',
  },
  {
    id: 'ret3',
    nfNumber: '00134',
    reason: 'Produto com avaria no transporte — embalagem violada e equipamento danificado',
    status: 'attention',
    items: [
      { name: 'Colar Sensor Rúmi', quantity: 2 },
    ],
    reversePosting: {
      status: 'Aguardando pagamento de boleto',
      expireDate: '10/02/2025',
    },
    contractId: '5',
    productGroup: 'On Farm',
    createdAt: '20/01/2025',
  },
];
