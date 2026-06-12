export interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'Pago' | 'Pendente' | 'Falhou';
}

export interface Customer {
  companyName: string;
  tradeName: string;
  document: string;
}

export interface ContractValues {
  currentValue: number;
  originalValue?: number;
  discounts?: number;
  finalValue: number;
}

export interface BillingInfo {
  financialStatus: 'Adimplente' | 'Inadimplente';
  lastBillingDate: string;
  nextBillingDate: string;
  frequency: string;
  paymentMethod: string;
}

export interface TermRecord {
  id: string;
  version: string;
  termDate: string;
  status: 'accepted' | 'pending';
  isNewVersion?: boolean;
  acceptedAt?: string;
}

export interface AgreementTerm {
  hasAdhesionTerm: boolean;
  termDate?: string;
  termAcceptanceStatus?: 'accepted' | 'pending';
  termVersion?: string;
  terms?: TermRecord[];
}

export interface AdditionalService {
  name: string;
  value: number;
  status: 'Ativo' | 'Inativo';
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  area: string;
  status: 'Ativo' | 'Inativo';
  activationDate: string;
  rewardPoints?: number;
}

export interface IncludedProduct {
  name: string;
  description: string;
  icon?: string;
}

export interface ShipmentOrderItem {
  name: string;
  quantity: number;
}

export interface ShipmentOrder {
  id: string;
  type: 'recurrence' | 'smartlab' | 'replacement';
  orderTypeLabel: string;
  status: string;
  expectedDate: string;
  items: ShipmentOrderItem[];
}

export interface PartnershipPlan {
  enabled: boolean;
  partnerName: string;
  discountRate: number;
  ratioUnit: string;
}

export interface ContractFreezing {
  isFrozen: boolean;
  type: string;
  startDate: string;
  endDate?: string;
  reason?: string;
}

export interface Contract {
  id: string;
  identifier: string;
  status: 'Vigente' | 'Encerrado';
  clientName: string;
  planName: string;
  productName: string;
  startDate: string;
  endDate?: string;
  summary: string;
  pdfUrl: string;
  customer: Customer;
  values: ContractValues;
  billing: BillingInfo;
  paymentHistory: Payment[];
  agreementTerm: AgreementTerm;
  additionalServices?: AdditionalService[];
  farms?: Farm[];
  includedProducts?: IncludedProduct[];
  isOnFarm?: boolean;
  paymentLink?: {
    status: 'pending' | 'expired' | 'failed';
    url: string;
  };
  partnershipPlan?: PartnershipPlan;
  freezing?: ContractFreezing;
  shipmentOrders?: ShipmentOrder[];
}

export const mockContracts: Contract[] = [
  {
    id: '1',
    identifier: 'CTR-2025-001',
    status: 'Vigente',
    clientName: 'Fazenda Boa Vista',
    planName: 'Ideagri Pro',
    productName: 'Ideagri',
    startDate: '01/01/2025',
    summary: 'Contrato de fornecimento de sistema de gestão de fazendas para controle de produção leiteira, rastreamento de gado e análise de dados. Inclui suporte técnico e atualizações mensais.',
    pdfUrl: '#',
    customer: {
      companyName: 'Boa Vista Agropecuária Ltda',
      tradeName: 'Fazenda Boa Vista',
      document: '12.345.678/0001-90',
    },
    values: {
      currentValue: 2200.00,
      finalValue: 2500.00,
    },
    billing: {
      financialStatus: 'Adimplente',
      lastBillingDate: '01/01/2025',
      nextBillingDate: '01/02/2025',
      frequency: 'Mensal',
      paymentMethod: 'Cartão de Crédito',
    },
    paymentLink: {
      status: 'expired',
      url: '#',
    },
    paymentHistory: [
      { id: 'p1', date: '01/01/2025', amount: 2500.00, status: 'Pago' },
      { id: 'p2', date: '01/12/2024', amount: 2500.00, status: 'Pago' },
      { id: 'p3', date: '01/11/2024', amount: 2500.00, status: 'Pago' },
    ],
    agreementTerm: {
      hasAdhesionTerm: true,
      termDate: '01/01/2025',
      termAcceptanceStatus: 'pending',
      termVersion: '2026-01',
      terms: [
        { id: 'ta1-v1', version: '2025-01', termDate: '01/01/2025', status: 'accepted', acceptedAt: '01/01/2025' },
        { id: 'ta1-v2', version: '2026-01', termDate: '01/03/2026', status: 'pending', isNewVersion: true },
      ],
    },
    additionalServices: [
      { name: 'API de Parceiros', value: 150.00, status: 'Ativo' },
      { name: 'SkyOne', value: 150.00, status: 'Ativo' },
    ],
    farms: [
      { id: 'f1', name: 'Fazenda Boa Vista - Matriz', location: 'São Paulo/SP', area: '500', status: 'Ativo', activationDate: '01/01/2025' },
      { id: 'f1b', name: 'Fazenda Boa Vista - Anexo Sul', location: 'São Paulo/SP', area: '350', status: 'Ativo', activationDate: '15/01/2025' },
    ],
    includedProducts: [
      { name: 'Ideagri App', description: 'Aplicativo móvel para gestão em campo', icon: 'Ideagri' },
      { name: 'Ideagri Desktop', description: 'Sistema de gestão completo para desktop', icon: 'Ideagri' },
      { name: 'Rúmi', description: 'Plataforma de monitoramento de ruminação bovina', icon: 'Rumi Flow' },
      { name: 'Rúmina Insights', description: 'Analytics avançado com IA para decisões estratégicas', icon: 'Rumi Analyzer' },
    ],
  },
  {
    id: '2',
    identifier: 'CTR-2024-089',
    status: 'Vigente',
    clientName: 'Fazenda Santa Clara',
    planName: 'Rumi Flow',
    productName: 'Rumi Flow',
    startDate: '15/06/2024',
    endDate: '15/06/2026',
    summary: 'Contrato de licenciamento do Rumi Flow para monitoramento de ruminação e saúde do rebanho com sensores inteligentes. Inclui análise preditiva de doenças e relatórios de bem-estar animal.',
    pdfUrl: '#',
    customer: {
      companyName: 'Santa Clara Produção Rural S.A.',
      tradeName: 'Fazenda Santa Clara',
      document: '98.765.432/0001-10',
    },
    values: {
      currentValue: 3200.00,
      originalValue: 3500.00,
      discounts: 300.00,
      finalValue: 3200.00,
    },
    billing: {
      financialStatus: 'Adimplente',
      lastBillingDate: '15/12/2024',
      nextBillingDate: '15/01/2025',
      frequency: 'Mensal',
      paymentMethod: 'Boleto',
    },
    partnershipPlan: {
      enabled: true,
      partnerName: 'AgroTech Solutions Ltda',
      discountRate: 10,
      ratioUnit: 'porcentagem',
    },
    freezing: {
      isFrozen: true,
      type: 'Parcial',
      startDate: '01/03/2025',
      endDate: '30/06/2025',
      reason: 'Período de entressafra — suspensão temporária acordada contratualmente.',
    },
    paymentHistory: [
      { id: 'p4', date: '15/12/2024', amount: 3200.00, status: 'Pago' },
      { id: 'p5', date: '15/11/2024', amount: 3200.00, status: 'Pago' },
      { id: 'p6', date: '15/10/2024', amount: 3500.00, status: 'Pago' },
      { id: 'p7', date: '15/09/2024', amount: 3500.00, status: 'Pago' },
    ],
    agreementTerm: {
      hasAdhesionTerm: true,
      termDate: '15/06/2024',
      termAcceptanceStatus: 'pending',
      termVersion: '2026-01',
      terms: [
        { id: 'ta2-v1', version: '2024-06', termDate: '15/06/2024', status: 'accepted', acceptedAt: '15/06/2024' },
        { id: 'ta2-v2', version: '2026-01', termDate: '01/03/2026', status: 'pending', isNewVersion: true },
      ],
    },
    farms: [
      { id: 'f2', name: 'Fazenda Santa Clara', location: 'Rio de Janeiro/RJ', area: '300', status: 'Ativo', activationDate: '15/06/2024' },
    ],
  },
  {
    id: '3',
    identifier: 'CTR-2023-042',
    status: 'Encerrado',
    clientName: 'Fazenda Primavera',
    planName: 'Ideagri Pro',
    productName: 'Ideagri',
    startDate: '10/03/2023',
    endDate: '10/03/2024',
    summary: 'Contrato de prestação de serviços de consultoria em gestão de fazendas e implementação do sistema. Contrato finalizado conforme cronograma estabelecido.',
    pdfUrl: '#',
    customer: {
      companyName: 'Primavera Agronegócios Ltda',
      tradeName: 'Fazenda Primavera',
      document: '11.222.333/0001-44',
    },
    values: {
      currentValue: 1800.00,
      finalValue: 1800.00,
    },
    billing: {
      financialStatus: 'Adimplente',
      lastBillingDate: '10/03/2024',
      nextBillingDate: '—',
      frequency: 'Mensal',
      paymentMethod: 'Cartão de Crédito',
    },
    paymentHistory: [
      { id: 'p8', date: '10/03/2024', amount: 1800.00, status: 'Pago' },
      { id: 'p9', date: '10/02/2024', amount: 1800.00, status: 'Pago' },
      { id: 'p10', date: '10/01/2024', amount: 1800.00, status: 'Pago' },
    ],
    agreementTerm: {
      hasAdhesionTerm: true,
      termDate: '10/03/2023',
      terms: [
        { id: 'ta3-v1', version: '2023-03', termDate: '10/03/2023', status: 'accepted', acceptedAt: '10/03/2023' },
      ],
    },
    farms: [
      { id: 'f3', name: 'Fazenda Primavera', location: 'Belo Horizonte/MG', area: '400', status: 'Inativo', activationDate: '10/03/2023' },
    ],
    includedProducts: [
      { name: 'Ideagri App', description: 'Aplicativo móvel para gestão em campo', icon: 'Ideagri' },
      { name: 'Ideagri Desktop', description: 'Sistema de gestão completo para desktop', icon: 'Ideagri' },
      { name: 'Rúmi', description: 'Plataforma de monitoramento de ruminação bovina', icon: 'Rumi Flow' },
      { name: 'Rúmina Insights', description: 'Analytics avançado com IA para decisões estratégicas', icon: 'Rumi Analyzer' },
    ],
  },
  {
    id: '4',
    identifier: 'CTR-2024-105',
    status: 'Vigente',
    clientName: 'Fazenda Esperança',
    planName: 'Pro Care',
    productName: 'Pro Care',
    startDate: '20/11/2024',
    summary: 'Contrato de serviço Pro Care para suporte veterinário personalizado e acompanhamento de saúde do rebanho. Inclui visitas técnicas mensais e acesso prioritário à equipe de consultoria.',
    pdfUrl: '#',
    customer: {
      companyName: 'João Silva - ME',
      tradeName: 'Fazenda Esperança',
      document: '123.456.789-00',
    },
    values: {
      currentValue: 1500.00,
      discounts: 200.00,
      finalValue: 1300.00,
    },
    billing: {
      financialStatus: 'Inadimplente',
      lastBillingDate: '20/12/2024',
      nextBillingDate: '20/01/2025',
      frequency: 'Mensal',
      paymentMethod: 'Boleto',
    },
    paymentHistory: [
      { id: 'p11', date: '20/12/2024', amount: 1300.00, status: 'Pendente' },
      { id: 'p12', date: '20/11/2024', amount: 1300.00, status: 'Pago' },
    ],
    agreementTerm: {
      hasAdhesionTerm: true,
      termDate: '20/11/2024',
      terms: [
        { id: 'ta4-v1', version: '2024-11', termDate: '20/11/2024', status: 'accepted', acceptedAt: '20/11/2024' },
      ],
    },
    farms: [
      { id: 'f4', name: 'Fazenda Esperança', location: 'Curitiba/PR', area: '200', status: 'Ativo', activationDate: '20/11/2024' },
    ],
  },
  {
    id: '5',
    identifier: 'CTR-2025-012',
    status: 'Vigente',
    clientName: 'Fazenda Alto da Serra',
    planName: 'On Farm',
    productName: 'On Farm',
    startDate: '15/01/2025',
    summary: 'Contrato de plataforma On Farm para gestão integrada da fazenda com módulos de controle de estoque, nutrição animal, planejamento de safra e análise de solo.',
    pdfUrl: '#',
    isOnFarm: true,
    customer: {
      companyName: 'Alto da Serra Agropecuária Ltda',
      tradeName: 'Fazenda Alto da Serra',
      document: '45.678.901/0001-23',
    },
    values: {
      currentValue: 2800.00,
      finalValue: 2800.00,
    },
    billing: {
      financialStatus: 'Adimplente',
      lastBillingDate: '15/01/2025',
      nextBillingDate: '15/02/2025',
      frequency: 'Mensal',
      paymentMethod: 'Cartão de Crédito',
    },
    paymentLink: {
      status: 'pending',
      url: '#',
    },
    paymentHistory: [
      { id: 'p13', date: '15/01/2025', amount: 2800.00, status: 'Pago' },
    ],
    agreementTerm: {
      hasAdhesionTerm: true,
      termDate: '15/01/2025',
      terms: [
        { id: 'ta5-v1', version: '2025-01', termDate: '15/01/2025', status: 'accepted', acceptedAt: '15/01/2025' },
      ],
    },
    additionalServices: [
      { name: 'Módulo de Rastreabilidade', value: 250.00, status: 'Ativo' },
    ],
    farms: [
      { id: 'f5', name: 'Fazenda Alto da Serra - Unidade 1', location: 'Goiás/GO', area: '600', status: 'Ativo', activationDate: '15/01/2025', rewardPoints: 350 },
      { id: 'f5b', name: 'Fazenda Alto da Serra - Unidade 2', location: 'Goiás/GO', area: '450', status: 'Ativo', activationDate: '15/01/2025', rewardPoints: 120 },
    ],
    shipmentOrders: [
      {
        id: 'so1',
        type: 'recurrence',
        orderTypeLabel: 'Recorrência',
        status: 'em_separacao',
        expectedDate: '15/02/2025',
        items: [
          { name: 'Kit Sensor Rúmi Plus', quantity: 2 },
          { name: 'Bateria de Reposição AA', quantity: 8 },
        ],
      },
      {
        id: 'so2',
        type: 'smartlab',
        orderTypeLabel: 'SmartLab',
        status: 'enviado',
        expectedDate: '10/02/2025',
        items: [
          { name: 'Análise de Solo SmartLab Premium', quantity: 1 },
        ],
      },
    ],
  },
];
