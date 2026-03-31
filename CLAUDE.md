# CLAUDE.md — Área do Cliente · Portal iMilk

Fonte única de verdade para decisões de design e desenvolvimento da Área do Cliente.
Destinado a: agente de IA atuando como designer UX/UI sênior e desenvolvedores frontend novos no projeto.

---

## 1. Visão Geral do Produto

**Produto:** Portal do Cliente iMilk — portal web self-service B2C para clientes da Rúmina.

**Objetivo principal:** Permitir que produtores rurais e responsáveis financeiros de fazendas consultem seus contratos, acompanhem o status de pagamentos e gerenciem meios de pagamento — sem precisar acionar o time de atendimento para operações básicas.

**Tipo de sistema:** Aplicação web responsiva (SPA), acesso esporádico, predominantemente via smartphone em campo.

**Perfis de usuário:**
- Produtor rural: acessa para verificar se tudo está em ordem. Baixa frequência, baixa tolerância a fricção.
- Responsável financeiro da fazenda: acessa para resolver pendências, trocar cartão, baixar comprovantes.

**Contexto de uso:**
- Acesso esporádico (não diário).
- Conexão móvel potencialmente instável em zonas rurais.
- Perfis com variação ampla de familiaridade tecnológica.
- Não é um sistema de backoffice — o cliente não opera, ele consulta e solicita.

**Diferença crítica em relação ao backoffice iMilk:**
O cliente não é um operador treinado. A interface deve ser autoexplicativa. Rótulos, estados e feedbacks devem usar linguagem natural em português brasileiro — sem jargão técnico ou financeiro exposto. Ações de gestão (cancelamento, alteração de plano, edição cadastral) pertencem ao backoffice, não a este portal.

---

## 2. Stack de Frontend e Design

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework UI | React | 18.3.1 |
| Build tool | Vite | 6.3.5 |
| Linguagem | TypeScript | (via Vite plugin) |
| Estilos | Tailwind CSS | 4.1.12 |
| Animações CSS | tw-animate-css | 1.3.8 |
| Animações JS | motion (Framer Motion) | 12.23.24 |
| Componentes base | Radix UI (primitives) | vários |
| Ícones | lucide-react | 0.487.0 |
| Notificações | sonner | 2.0.3 |
| Formulários | react-hook-form | 7.55.0 |
| Temas | next-themes | 0.4.6 |
| Assets de produto | Figma assets (PNG) | — |

**Dependência instalada mas não utilizada nos componentes principais:** `@mui/material` / `@emotion`. Não introduzir componentes MUI — o projeto usa shadcn/ui sobre Radix.

**Fonte:** `fonts.css` existe mas está vazia. Nenhuma fonte custom está carregada. O sistema usa a stack de fontes padrão do sistema operacional via Tailwind. [INFERÊNCIA: A definição de fonte customizada está pendente.]

**Performance móvel:** [INFERÊNCIA] Imagens de ícones de produto são PNGs individuais carregados como assets do Figma. Para conexões lentas, considerar lazy loading de imagens e evitar carregar todos os ícones na inicialização.

---

## 3. Sistema de Design

### Tokens de cor (definidos em `src/styles/theme.css`)

**Marca / Primária:**
- `--primary`: `#030213` (quase preto — texto e UI de alta ênfase)
- Brand purple (usada diretamente em classes Tailwind): `#500d5b`
  - Esta é a cor identitária do portal. Usada em: sidebar ativo, ícones de destaque, bordas de ênfase, botões primários.
  - Variante hover: `#3d0a45`
  - Variante alpha: `#500d5b/10`, `#500d5b/08`

**Cores de feedback:**
- Sucesso / Adimplente: `#1bc47d` (verde)
- Info / Ação secundária: `#0d99ff` (azul)
- Atenção / Pendente: `#f59e0b` / `#fbbf24` (âmbar)
- Erro / Inadimplente / Destrutivo: `#ef4444` / `#d4183d`

**Neutros:**
- Background geral: `#ffffff` / `gray-50` (`#f9fafb`)
- Card surface: `#ffffff`
- Muted: `#ececf0`
- Muted foreground: `#717182`
- Border padrão: `rgba(0, 0, 0, 0.1)`
- Input background: `#f3f3f5`

**Sidebar:**
- Background: `oklch(0.985 0 0)` (quase branco)
- Sidebar primary: `#030213`

### Escala tipográfica

Base: `16px` (`--font-size: 16px`). Tailwind v4 herda os tokens `--text-*`.

| Elemento | Tailwind class | Uso |
|---|---|---|
| Título de página | `text-3xl font-semibold` | `h1` de cada página |
| Título de seção | `text-sm font-semibold` ou `text-xl` | cabeçalhos de cards/sections |
| Rótulo de campo | `text-[11px] font-semibold uppercase tracking-wider` | Labels internos de cards |
| Corpo / dado | `text-sm font-semibold text-gray-900` | Valores exibidos |
| Texto auxiliar | `text-xs text-gray-500` | Subtítulos, hints |
| Micro label | `text-[10px] font-bold uppercase tracking-widest` | Labels de ação, status pill |

Tamanho mínimo para texto legível em mobile: `text-xs` (12px). Abaixo disso, usar apenas para labels de suporte, nunca para informação primária.

### Espaçamento e grid

- Container de conteúdo: `max-w-7xl mx-auto px-8`
- Padding de página (header e main): `py-8` / `px-8`
- Gap entre cards: `gap-3`
- Gap interno de card expandido: `p-5`
- Touch targets: botões e itens clicáveis devem ter `py-2.5` a `py-3` mínimo (≥ 44px de área).
- Grid responsivo de informações: `grid-cols-1 md:grid-cols-3`

### Border radius

- `--radius`: `0.625rem` (10px)
- Cards e containers: `rounded-lg` (8px)
- Modais: `rounded-xl` (12px)
- Badges / pills: `rounded-md` ou `rounded-full`
- Botões de ação: `rounded-md` a `rounded-lg`
- Nav items sidebar: `rounded-xl`

### Sombras e elevação

- Card em hover: `hover:shadow-md`
- Modal: `shadow-2xl`
- Botão primário: `shadow-lg shadow-[#500d5b]/20`
- Sticky headers: sem sombra, separados por `border-b border-gray-200`

### Modos

- Dark mode: tokens definidos em `.dark` em `theme.css`. `next-themes` está instalado.
- [INFERÊNCIA] Dark mode não está completamente implementado — nenhum `ThemeProvider` está visível em `App.tsx`. Não presumir suporte ativo a dark mode até confirmação.

---

## 4. Estrutura de Componentes

### Componentes de domínio (`src/app/components/`)

| Componente | Responsabilidade |
|---|---|
| `Sidebar.tsx` | Navegação principal fixa lateral. Exibe logo iMilk, menu de 3 itens, dados do usuário e botão de logout. Estado ativo controlado por prop. |
| `ContractCard.tsx` | Card expansível de um contrato. Exibe header sempre visível (produto, plano, datas, status) e corpo expansível com dados do cliente, produtos incluídos, serviços adicionais, fazendas, resumo financeiro, status de cobrança, histórico de pagamentos e documentação. |
| `ContractDetailView.tsx` | Sub-view de 3 colunas usada dentro de `BillingMethodsPage`. Exibe: produtos incluídos no plano / informações de cobrança / método de pagamento com ações. Aceita `contract: any` — gap de tipagem a corrigir. |
| `StatusBadge.tsx` | Badge de status de contrato: `Vigente` (verde) ou `Encerrado` (cinza). Props tipadas com union type. |
| `ProductIcon.tsx` | Renderiza o ícone PNG do produto a partir de um mapa `productName → asset`. Tamanhos: `sm` (32px), `md` (48px), `lg` (64px). Fallback: ícone Ideagri. |
| `figma/ImageWithFallback.tsx` | Utilitário Figma Make para imagens com fallback. Não modificar. |

### Produtos mapeados em `ProductIcon`

| Nome | Asset |
|---|---|
| `Ideagri` | `7294337b...png` |
| `Rumi Flow` | `341e72b3...png` |
| `On Farm` | `9ece7af5...png` |
| `Rumi Analyzer` | `4804a2c3...png` |
| `Rumi Pulse` | `7121ec92...png` |
| `Pro Care` | usa `Rumi Pulse` como fallback |

Para adicionar novo produto: incluir o asset em `src/assets/` e adicionar entrada em `productIconMap`.

### Componentes de UI base (`src/app/components/ui/`)

Baseados em shadcn/ui sobre Radix UI. Os principais em uso no projeto:

- `button.tsx`, `dialog.tsx`, `badge.tsx`, `card.tsx`, `select.tsx`, `input.tsx`, `label.tsx`
- `tabs.tsx`, `accordion.tsx`, `separator.tsx`, `skeleton.tsx`, `sonner.tsx`
- `utils.ts` — exporta `cn()` para merge de classes Tailwind

**Regra:** Não modificar componentes de `ui/` sem revisão humana. São primitivos compartilhados. Preferir customizar via props e `className` em vez de editar o arquivo.

### Utilitários

- `use-mobile.ts` — hook de detecção de viewport mobile
- `utils.ts` — função `cn(clsx + tailwind-merge)`

### Componentes não presentes mas previstos

- [INFERÊNCIA] Componente de estado vazio padronizado (hoje implementado inline).
- [INFERÊNCIA] Componente de loading/skeleton para listas de contratos.

### Compartilhamento com backoffice iMilk

Nenhum componente compartilhado identificado no repositório atual. Os componentes de `ui/` são gerados localmente. [INFERÊNCIA: Eventual extração para design system compartilhado não está implementada.]

---

## 5. Padrões de Interface

### Layout geral

```
┌──────────────────────────────────────────────────────┐
│  SIDEBAR (280px, fixed, z-50)                        │
│  ┌─────────┐ ┌────────────────────────────────────┐  │
│  │  Logo   │ │  MAIN CONTENT (flex-1, ml-[280px]) │  │
│  │  Nav    │ │  ┌──────────────────────────────┐  │  │
│  │  User   │ │  │ STICKY HEADER (z-40)         │  │  │
│  └─────────┘ │  │ breadcrumb + título + ações  │  │  │
│              │  └──────────────────────────────┘  │  │
│              │  ┌──────────────────────────────┐  │  │
│              │  │ MAIN CONTENT AREA            │  │  │
│              │  │ max-w-7xl, px-8, py-8        │  │  │
│              │  └──────────────────────────────┘  │  │
│              └────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

**Atenção:** A sidebar atual é fixa em 280px sem comportamento responsivo para mobile. O `ml-[280px]` no `<main>` não colapsa em telas pequenas. Esta é uma lacuna crítica de responsividade a resolver.

### Navegação

- Tab-based via `useState` em `App.tsx` (sem router instalado).
- 3 seções: `contracts` (Dashboard), `payments` (PaymentsPage), `billing-methods` (BillingMethodsPage).
- Breadcrumb em cada header de página: `Portal iMilk > [Seção atual]`.
- Profundidade máxima atual: 2 níveis. Não aumentar sem revisão de arquitetura de navegação.

### Padrões de visualização de contratos

- Listagem: `ContractCard` em grid de 1 coluna com gap-3.
- Contratos ativos aparecem primeiro; encerrados ficam colapsados em seção separada com contador.
- Card colapsável: header sempre visível (clicável), corpo expansível com animação `ChevronDown`.
- Estado inadimplente: borda vermelha no card + tag animada com `animate-pulse` + banner de alerta expandido.
- Estado encerrado: `opacity: 0.85`, background `#fafafa`.

### Padrões de visualização de pagamentos

- Agrupado por produto/plano (seções colapsáveis com `PaymentSection`).
- Regra de exibição: se há pendentes → exibe pendentes + último pago; se não há → exibe apenas último pago.
- Expansão progressiva: `visibleCount` começa em 3, incrementa de 3 em 3.
- Filtros por contrato, status e período (atualmente estáticos / decorativos).

### Padrões de gestão de pagamento

- Alteração de método: modal `PaymentMethodSelectionModal` com radio buttons visuais (Cartão de Crédito / Boleto).
- Cadastro de cartão: modal `CardRegistrationModal` com validação client-side inline.
- Aviso de cartão próximo ao vencimento: tag âmbar no header do accordion (dentro de 60 dias).
- Alteração válida a partir do próximo ciclo (informado em tooltip no modal).
- Confirmação de operação: `toast.success()` via sonner, posição `top-right`.

### Padrões de feedback

| Estado | Padrão |
|---|---|
| Loading | Não implementado — usar `Skeleton` de `ui/skeleton.tsx` |
| Erro | Não implementado globalmente — usar banner vermelho inline com CTA de próximo passo |
| Sucesso | `toast.success()` via sonner |
| Estado vazio | Ícone centralizado + texto explicativo + (quando aplicável) CTA |
| Inadimplência | Banner vermelho expansível com botão "Regularizar Agora" |
| Confirmações | Modal com dois botões: ação destrutiva/primária à direita, "Cancelar" à esquerda |

### Padrões de modais

- Overlay: `bg-black/50 backdrop-blur-sm`
- Entrada: `motion` com `scale: 0.95 → 1` + `opacity: 0 → 1`
- Header: ícone + título + subtítulo + botão X
- Footer: botões lado a lado, primário à direita
- Botão primário: `bg-[#500d5b]` com shadow
- Botão cancelar: `bg-white border-2 border-gray-200`
- Linguagem: simples, sem jargão. Exemplo correto: "Trocar Cartão" — não "Atualizar instrumento de pagamento".

---

## 6. Fluxos de Usuário Críticos

### 6.1 Visualizar contratos ativos

1. Usuário acessa o portal → sidebar carregada com tab `contracts` ativa.
2. `Dashboard` exibe header com contador de contratos ativos.
3. Lista de `ContractCard` para contratos `Vigente`.
4. Usuário clica em um card → expande revelando detalhes do plano, cliente, financeiro e histórico.
5. Estado de inadimplência visível imediatamente no header do card (tag + borda vermelha).
6. Contratos encerrados: ocultos em seção colapsável no final da lista.

**Estados de interface a cobrir:**
- Lista vazia: ícone + "Nenhum contrato ativo no momento"
- Carregando: skeleton de card
- Inadimplente: banner de alerta + CTA "Regularizar Agora"

### 6.2 Acompanhar status de pagamento e inadimplência

1. Usuário acessa "Meus Pagamentos" via sidebar.
2. Lista de seções por produto/plano, cada uma colapsável.
3. Seção expandida mostra pagamentos relevantes (pendentes em primeiro lugar).
4. Usuário clica em um `PaymentRow` → expande com detalhes: meio de pagamento, recorrência, referência.
5. Se status `PAGO`: botão "Download Comprovante".
6. Se status `PENDENTE` ou `ATRASADO` e boleto: botão "Download Boleto".

### 6.3 Atualizar método de pagamento

1. Usuário acessa "Meio de Pagamento" via sidebar.
2. Lista de contratos ativos em accordion.
3. Usuário expande um contrato → `ContractDetailView` com 3 colunas.
4. Usuário clica em "Alterar pagamento" → `PaymentMethodSelectionModal`.
5. Seleciona novo método → confirma.
6. Se cartão de crédito: abre `CardRegistrationModal` para inserir dados.
7. Dados validados client-side → `toast.success()` confirma a alteração.

**Estados de interface a cobrir:**
- Cartão próximo ao vencimento: tag âmbar no header do accordion
- Erro de validação do formulário: mensagem inline abaixo do campo

### 6.4 Pagar link de primeiro pagamento

[INFERÊNCIA] Fluxo não implementado no código atual. Previsto como necessidade futura. Quando implementado, deve ser uma página ou modal dedicado, acionado por link recebido por e-mail — não deve estar exposto na navegação principal.

### 6.5 Consultar histórico de cobranças

1. Usuário acessa "Meus Pagamentos".
2. Cada seção de produto exibe os pagamentos mais recentes.
3. "Ver mais" carrega +3 itens por vez.
4. Filtros de contrato, status e período permitem refinamento da visualização (a implementar com dados reais).

---

## 7. Acessibilidade e Responsividade

### Acessibilidade (meta: WCAG AA)

- Usar `aria-label` em botões icônicos (ex: botão de fechar modal).
- Componentes Radix UI já gerenciam foco, escape e role por padrão — não sobrescrever sem motivo.
- Contraste mínimo: texto sobre fundo. Verificar especialmente `#717182` sobre `#ececf0` e micro labels.
- Formulário de cartão: todos os campos têm `<label>` associado.
- Não usar `alert()` nativo em produção — substituir por modais de confirmação acessíveis.
- Cores de status (verde/vermelho/âmbar) nunca devem ser o único indicador — sempre acompanhar de texto.

### Mobile-first (obrigatório)

A sidebar atual **não é responsiva**: está fixada em `w-[280px]` e o `<main>` tem `ml-[280px]` sem media query. Em telas menores que ~640px, o conteúdo fica parcialmente oculto.

**Comportamento esperado (a implementar):**
- `< md`: sidebar recolhe, acionada por hamburguer ou swipe.
- `>= md`: sidebar fixa visível, comportamento atual mantido.

Hook `use-mobile.ts` já está disponível para detectar breakpoint.

### Breakpoints Tailwind (v4, padrão)

| Prefixo | Largura |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Considerações para baixa literacia digital

- Rótulos de ação devem ser verbos diretos: "Trocar Cartão", "Ver Contrato", "Regularizar Agora".
- Evitar abreviações: escrever "Número do Cartão" em vez de "Nº Cartão".
- Estados de erro devem sempre indicar o próximo passo: "Número inválido — verifique os 16 dígitos do cartão".
- Ícones sempre acompanhados de texto em ações principais.

---

## 8. Convenções do Projeto

### Nomeação

- Componentes: PascalCase (`ContractCard`, `StatusBadge`).
- Arquivos de componente: `NomeDoComponente.tsx`.
- Hooks: camelCase com prefixo `use` (`use-mobile.ts`).
- Dados mock: arquivo separado em `src/data/` (`contracts.ts`).
- Tipos/interfaces: PascalCase, colocalizados com os dados ou no arquivo de componente.

### Estrutura de novo componente

```
src/app/components/NomeDoComponente.tsx
```

```tsx
// 1. Imports externos
// 2. Imports internos (ui/, utils, data)
// 3. Interface de props
// 4. Função componente exportada
// 5. Sub-componentes auxiliares (se pequenos e colocalizados)
```

Sub-componentes grandes devem ter arquivos próprios.

### Extensão do sistema de design

- Novas cores de marca: adicionar como CSS var em `theme.css` e referenciar via `@theme inline`.
- Não usar valores hex hardcoded em Tailwind (`bg-[#123456]`) para cores de marca — preferir o token.
- Exceção aceitável atual: `#500d5b` e `#0d99ff` e `#1bc47d` são usados diretamente nas classes. Enquanto não houver token nomeado, manter consistência nos valores literais.
- Para novas variantes de `StatusBadge` ou `ProductIcon`, estender os mapas internos existentes.

### Props e variantes

- Props de variante: usar union types literais (`'sm' | 'md' | 'lg'`, `'Vigente' | 'Encerrado'`).
- Evitar prop `variant: string` aberto — o agente não vai saber quais valores são válidos.
- Evitar `any` — o `ContractDetailView.tsx` usa `contract: any`, o que é um débito técnico a corrigir com o tipo `Contract` de `src/data/contracts.ts`.

### Linguagem da interface

- Idioma: português brasileiro.
- Tom: direto, acolhedor, sem termos financeiros/jurídicos expostos.
- Certo: "Pagamento em dia", "Situação irregular", "Próxima cobrança".
- Errado: "Status: Adimplente", "Instrumento de pagamento", "Inadimplência detectada" (em título de seção visível ao usuário).
- Datas: formato `DD/MM/AAAA`, consistente com os dados mock.
- Valores monetários: `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.

---

## 9. Boas Práticas para o Agente de Design

### Onde adicionar novos componentes

- Componentes de domínio (específicos da Área do Cliente): `src/app/components/`
- Primitivos reutilizáveis de UI: `src/app/components/ui/` — apenas se baseados em Radix e alinhados ao padrão shadcn existente
- Novos produtos/ícones: adicionar asset em `src/assets/` e entrada em `ProductIcon.tsx`
- Novos dados mock: `src/data/`

### Onde não mexer sem revisão humana

- `src/app/components/ui/` — primitivos Radix/shadcn
- `src/app/components/figma/` — utilitários do Figma Make
- `src/styles/theme.css` — tokens do sistema de design
- `vite.config.ts`, `postcss.config.mjs`, `package.json`

### Como manter consistência visual

1. Usar `#500d5b` como cor primária da marca — não substituir por azul ou outro tom de roxo sem alinhamento.
2. Seguir o padrão de header de página: breadcrumb + h1 + subtítulo + ações à direita, sticky com `z-40`.
3. Cards de listagem: `bg-white rounded-lg border border-gray-200`, expansíveis com `ChevronDown`.
4. Seções internas de card expandido: `p-5 bg-white border-b border-gray-200`.
5. Labels internos de card: `text-[11px] font-semibold text-gray-400 uppercase tracking-wider`.

### Como validar uma alteração antes de considerar concluída

- [ ] O componente funciona em viewport 375px (iPhone SE)?
- [ ] Touch targets têm no mínimo 44px de altura?
- [ ] O estado vazio está tratado?
- [ ] O texto de erro orienta o próximo passo?
- [ ] Ações destrutivas têm confirmação explícita?
- [ ] Nenhum valor hex de cor de marca foi introduzido sem token?
- [ ] `cn()` foi usado para merge de classes condicionais?

### Princípios de UX prioritários

- **Simplicidade acima de densidade.** Se há dúvida entre mostrar mais informação ou menos, mostrar menos.
- **Mobile-first sempre.** Toda nova interface começa pelo viewport 375px.
- **Ações destrutivas exigem confirmação explícita.** Remover cartão, qualquer ação irreversível: sempre modal de confirmação com linguagem clara sobre a consequência.
- **O cliente consulta e solicita — não gerencia.** Ações de gestão (cancelar contrato, alterar plano, editar cadastro) não pertencem a este portal.
- **Estados de erro orientam o próximo passo.** Nunca apenas informar o problema. Sempre indicar o que o usuário deve fazer.
- **Feedback imediato em toda ação.** Toast de sucesso, loading visível, erro explicado.

---

## 10. Limites de Responsabilidade do Cliente

### O cliente PODE (implementar neste portal):

- Visualizar contratos ativos e encerrados
- Consultar detalhes do contrato: plano, produtos incluídos, fazendas vinculadas, serviços adicionais
- Consultar status financeiro: adimplente/inadimplente
- Consultar histórico de pagamentos por contrato/produto
- Baixar comprovante de pagamento
- Baixar boleto pendente
- Atualizar cartão de crédito cadastrado
- Alterar método de pagamento entre cartão e boleto
- Solicitar cópia formal do termo de adesão (ação envia solicitação ao jurídico)
- Acessar link de primeiro pagamento (fluxo a implementar)
- Visualizar dados cadastrais (razão social, CNPJ/CPF) — somente leitura

### O cliente NÃO PODE (não implementar neste portal):

- Cancelar contrato diretamente
- Alterar plano ou adicionar/remover serviços
- Editar dados cadastrais (razão social, CNPJ, endereço) sem validação humana
- Acessar dados de outros clientes
- Gerenciar usuários ou permissões
- Emitir notas fiscais
- Alterar datas de vencimento
- Aplicar ou remover descontos
- Visualizar dados internos de custo ou margem
- Acessar qualquer funcionalidade do backoffice iMilk

---

## 11. Pontos em Aberto / Incertezas

### Lacunas de implementação confirmadas

- **Sidebar não responsiva:** `ml-[280px]` no `<main>` sem comportamento mobile. Crítico para o perfil de uso.
- **Sem router:** Navegação via `useState` em `App.tsx`. Não suporta deep linking, back/forward do browser, nem URLs diretas por seção.
- **Sem autenticação:** Nenhum fluxo de login, sessão ou proteção de rota implementado.
- **Dados mock:** Todo o conteúdo vem de `src/data/contracts.ts`. Nenhuma chamada de API.
- **Filtros de pagamento decorativos:** Os selects de contrato, status e período na `PaymentsPage` não filtram nada.
- **`alert()` nativo:** Usado em ações de "Regularizar Agora", "Visualizar PDF" e "Solicitar cópia do termo" — substituir por modais reais antes de produção.
- **`ContractDetailView` usa `contract: any`:** Débito de tipagem a corrigir com o tipo `Contract`.

### Inferências sem confirmação

- [INFERÊNCIA] Dark mode não está ativo — `ThemeProvider` do `next-themes` não está em `App.tsx`. Os tokens `.dark` em `theme.css` são legado do template gerado.
- [INFERÊNCIA] Fonte customizada está pendente — `fonts.css` está vazio.
- [INFERÊNCIA] O fluxo de "link de primeiro pagamento" está fora do escopo atual mas previsto.
- [INFERÊNCIA] O `@mui/material` instalado no `package.json` não está sendo usado e pode ser removido.
- [INFERÊNCIA] Não há sistema de design compartilhado com o backoffice iMilk neste repositório.

### Decisões de design pendentes

- Comportamento da sidebar em mobile (drawer? bottom nav? hamburguer?).
- Página de perfil/configurações do usuário.
- Fluxo de recuperação de acesso / onboarding de primeiro login.
- Tratamento de erro global (boundary de erro, página 404, timeout de sessão).
- Componente de loading/skeleton padronizado.
- Estado vazio padronizado como componente.

---

## 12. Histórico de Atualizações

- 2026-03-31: Criação inicial do arquivo. Análise completa do repositório exportado do Figma Make. Cobertura: stack, design tokens, todos os componentes de domínio (5 componentes + 5 páginas/views), fluxos de usuário, convenções e limites de escopo.
