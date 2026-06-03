export interface ShipmentItem {
  name: string;
  quantity: number;
}

export interface TrackingEvent {
  date: string;
  description: string;
  location?: string;
}

export interface Shipment {
  id: string;
  orderNumber: string;
  nfNumber?: string;
  trackingCode?: string;
  trackingStatus?: string;
  orderType: 'recurrence' | 'replacement' | 'smartlab';
  orderTypeLabel: string;
  status: 'recebido' | 'a_vencer' | 'atrasado';
  dueDate: string;
  paymentDate?: string;
  items: ShipmentItem[];
  trackingEvents: TrackingEvent[];
  contractId: string;
  productGroup: string;
}

export const mockShipments: Shipment[] = [
  {
    id: 'sh1',
    orderNumber: 'PED-2025-0045',
    nfNumber: '002345',
    trackingCode: 'BR123456789BR',
    trackingStatus: 'Entregue',
    orderType: 'recurrence',
    orderTypeLabel: 'Recorrência',
    status: 'recebido',
    dueDate: '15/01/2025',
    paymentDate: '14/01/2025',
    items: [
      { name: 'Kit Sensor Rúmi Plus', quantity: 2 },
      { name: 'Bateria de Reposição AA', quantity: 8 },
    ],
    trackingEvents: [
      { date: '10/01/2025', description: 'Objeto entregue ao destinatário', location: 'Goiás/GO' },
      { date: '09/01/2025', description: 'Objeto saiu para entrega ao destinatário', location: 'Goiás/GO' },
      { date: '08/01/2025', description: 'Objeto encaminhado para unidade de distribuição', location: 'Belo Horizonte/MG' },
      { date: '06/01/2025', description: 'Objeto postado', location: 'Belo Horizonte/MG' },
    ],
    contractId: '5',
    productGroup: 'On Farm',
  },
  {
    id: 'sh2',
    orderNumber: 'PED-2025-0067',
    nfNumber: '002378',
    trackingCode: 'BR987654321BR',
    trackingStatus: 'Em trânsito',
    orderType: 'smartlab',
    orderTypeLabel: 'SmartLab',
    status: 'a_vencer',
    dueDate: '15/02/2025',
    items: [
      { name: 'Análise de Solo SmartLab Premium', quantity: 1 },
    ],
    trackingEvents: [
      { date: '20/01/2025', description: 'Objeto postado', location: 'Belo Horizonte/MG' },
    ],
    contractId: '5',
    productGroup: 'On Farm',
  },
  {
    id: 'sh3',
    orderNumber: 'PED-2024-0198',
    nfNumber: '001982',
    orderType: 'replacement',
    orderTypeLabel: 'Reposição',
    status: 'recebido',
    dueDate: '10/12/2024',
    paymentDate: '09/12/2024',
    items: [
      { name: 'Colar Sensor Rúmi (Reposição)', quantity: 1 },
    ],
    trackingEvents: [
      { date: '08/12/2024', description: 'Objeto entregue ao destinatário', location: 'Goiás/GO' },
      { date: '07/12/2024', description: 'Objeto saiu para entrega ao destinatário', location: 'Goiás/GO' },
    ],
    contractId: '5',
    productGroup: 'On Farm',
  },
  {
    id: 'sh4',
    orderNumber: 'PED-2025-0091',
    orderType: 'recurrence',
    orderTypeLabel: 'Recorrência',
    status: 'atrasado',
    dueDate: '01/02/2025',
    items: [
      { name: 'Sensor Rúmi Plus Completo', quantity: 1 },
      { name: 'Suporte de Fixação', quantity: 2 },
    ],
    trackingEvents: [],
    contractId: '5',
    productGroup: 'On Farm',
  },
];
