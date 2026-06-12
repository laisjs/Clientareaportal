import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileSignature, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { cn } from '../components/ui/utils';
import ruminaIcon from '../../assets/rumina-icon.png';

type PageState = 'pending' | 'accepted' | 'expired';

const TERM_TEXT = `TERMO DE ADESÃO — PLATAFORMA RÚMINA

O presente Termo de Adesão ("Termo") é celebrado entre a Rúmina Tecnologia Ltda., inscrita no CNPJ sob nº 00.000.000/0001-00, com sede em Belo Horizonte/MG ("Rúmina"), e o Cliente identificado no contrato vinculado a este aceite ("Cliente").

1. OBJETO
A Rúmina concede ao Cliente licença de uso não exclusiva, intransferível e revogável das plataformas contratadas, conforme descrito no contrato correspondente.

2. OBRIGAÇÕES DO CLIENTE
O Cliente se compromete a utilizar as plataformas exclusivamente para fins legítimos relacionados à atividade agropecuária, mantendo sigilo sobre credenciais de acesso e respondendo por uso indevido por terceiros.

3. PRIVACIDADE E DADOS
O tratamento de dados segue a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). A Rúmina coletará apenas dados necessários à prestação dos serviços e não os compartilhará com terceiros sem consentimento, exceto quando exigido por lei.

4. LIMITAÇÃO DE RESPONSABILIDADE
A Rúmina não se responsabiliza por perdas decorrentes de uso inadequado das plataformas, indisponibilidade por caso fortuito ou força maior, ou decisões tomadas com base nas informações fornecidas pelo sistema.

5. VIGÊNCIA
Este Termo entra em vigor na data do aceite eletrônico e permanece válido pelo período de vigência do contrato, podendo ser renovado automaticamente conforme as condições contratuais estabelecidas.

6. FORO
As partes elegem o foro da Comarca de Belo Horizonte/MG para dirimir quaisquer controvérsias oriundas deste Termo, com renúncia expressa a qualquer outro foro.`;

export function TermAcceptancePublicPage() {
  const [pageState, setPageState] = useState<PageState>('pending');
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    if (!checked) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
    setPageState('accepted');
  };

  const switchState = (state: PageState) => {
    setPageState(state);
    setChecked(false);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Preview banner */}
      <div className="bg-[#500d5b] text-white text-center py-2.5 text-[11px] font-semibold tracking-wider uppercase shrink-0">
        Visualização de Layout — Tela pública de aceite do Termo de Adesão
      </div>

      {/* State switcher */}
      <div className="bg-white border-b border-gray-200 shrink-0">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-2">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-2">Estado:</span>
          {(['pending', 'accepted', 'expired'] as PageState[]).map((state) => (
            <button
              key={state}
              onClick={() => switchState(state)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-semibold transition-colors',
                pageState === state
                  ? 'bg-[#500d5b] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {state === 'pending' ? 'Pendente' : state === 'accepted' ? 'Aceito' : 'Link Expirado'}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated public page */}
      <div className="flex-1 flex flex-col items-center px-4 py-10">

        {/* Branding */}
        <div className="flex items-center gap-3 mb-8">
          <img src={ruminaIcon} alt="Rúmina" className="w-10 h-10" />
          <div>
            <p className="text-xl font-semibold text-gray-900 leading-none">Rúmina</p>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-1">Portal do Cliente</p>
          </div>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">

          {/* Estado: Pendente */}
          {pageState === 'pending' && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-lg"
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#500d5b]/10 shrink-0">
                    <FileSignature className="size-5 text-[#500d5b]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Termo de Adesão</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Leia e aceite o termo para confirmar sua adesão</p>
                  </div>
                </div>
              </div>

              {/* Infos do contrato */}
              <div className="px-6 pt-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Contrato</p>
                    <p className="text-sm font-semibold text-gray-900">CTR-2025-001</p>
                  </div>
                  <div className="px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Plano</p>
                    <p className="text-sm font-semibold text-gray-900">Ideagri Pro</p>
                  </div>
                  <div className="px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Versão do Termo</p>
                    <p className="text-sm font-semibold text-gray-900">2026-01</p>
                  </div>
                  <div className="px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Enviado em</p>
                    <p className="text-sm font-semibold text-gray-900">01/03/2026</p>
                  </div>
                </div>
              </div>

              {/* Texto do termo */}
              <div className="px-6 pt-4">
                <div className="h-56 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {TERM_TEXT}
                </div>
              </div>

              {/* Checkbox */}
              <div className="px-6 pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    disabled={isLoading}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#500d5b] cursor-pointer shrink-0"
                  />
                  <span className="text-sm text-gray-700 leading-snug">
                    Li e concordo com o Termo de Adesão
                    <br />
                    <span className="text-xs text-gray-400">
                      Aceite registrado em nome de{' '}
                      <span className="font-semibold text-gray-600">Fazenda Boa Vista</span>
                    </span>
                  </span>
                </label>
              </div>

              {/* Botão */}
              <div className="px-6 py-5">
                <button
                  onClick={handleAccept}
                  disabled={!checked || isLoading}
                  className={cn(
                    'w-full py-3 text-sm font-semibold text-white rounded-lg transition-all',
                    checked && !isLoading
                      ? 'bg-[#500d5b] hover:bg-[#3d0a45] shadow-lg shadow-[#500d5b]/20'
                      : 'bg-[#500d5b]/40 cursor-not-allowed'
                  )}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Registrando aceite...
                    </span>
                  ) : (
                    'Aceitar Termo'
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Este aceite tem validade jurídica conforme a Lei nº 13.709/2018 (LGPD).
                </p>
              </div>
            </motion.div>
          )}

          {/* Estado: Aceito */}
          {pageState === 'accepted' && (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-lg text-center px-6 py-10"
            >
              <div className="flex justify-center mb-5">
                <div className="p-4 bg-[#1bc47d]/10 rounded-full">
                  <CheckCircle2 className="size-12 text-[#1bc47d]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Termo aceito com sucesso!</h2>
              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                O aceite foi registrado. Você receberá uma confirmação no e-mail cadastrado.
              </p>

              <div className="mt-6 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-left space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Registrado em</span>
                  <span className="font-semibold text-gray-900">12/06/2026 às 10:45</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Em nome de</span>
                  <span className="font-semibold text-gray-900">Fazenda Boa Vista</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Contrato</span>
                  <span className="font-semibold text-gray-900">CTR-2025-001 · Ideagri Pro</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Versão do Termo</span>
                  <span className="font-semibold text-gray-900">2026-01</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-6">Você pode fechar esta janela com segurança.</p>
            </motion.div>
          )}

          {/* Estado: Link expirado */}
          {pageState === 'expired' && (
            <motion.div
              key="expired"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-lg text-center px-6 py-10"
            >
              <div className="flex justify-center mb-5">
                <div className="p-4 bg-amber-50 rounded-full">
                  <Clock className="size-12 text-amber-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Link expirado</h2>
              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                Este link é válido por 72 horas após o envio. O prazo para este link já foi encerrado.
              </p>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 text-left">
                Para solicitar um novo link, acesse a{' '}
                <span className="font-semibold">Área do Cliente</span> ou entre em contato com o suporte Rúmina.
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-10">© 2026 Rúmina Tecnologia Ltda. · Todos os direitos reservados.</p>
      </div>
    </div>
  );
}
