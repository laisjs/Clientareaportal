import { useState } from 'react';
import { motion } from 'motion/react';
import { FileSignature, Loader2 } from 'lucide-react';
import { cn } from './ui/utils';

interface TermAcceptanceModalProps {
  isOpen: boolean;
  contractName: string;
  termVersion: string;
  clientName: string;
  viewOnly?: boolean;
  onAccept?: () => Promise<void>;
  onClose: () => void;
}

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

export function TermAcceptanceModal({
  isOpen,
  contractName,
  termVersion,
  clientName,
  viewOnly = false,
  onAccept,
  onClose,
}: TermAcceptanceModalProps) {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAccept = async () => {
    if (!checked || !onAccept) return;
    setIsLoading(true);
    setError(null);
    try {
      await onAccept();
    } catch {
      setError('Não foi possível registrar o aceite. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#500d5b]/10 shrink-0">
              <FileSignature className="size-5 text-[#500d5b]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Termo de Adesão</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {viewOnly ? 'Visualização do termo de adesão' : 'Leia e aceite o termo para continuar'}
              </p>
            </div>
          </div>
        </div>

        {/* Contrato vinculado */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Contrato</span>
            <span className="text-xs font-semibold text-gray-700">{contractName}</span>
            <span className="ml-auto text-[11px] text-gray-400">Versão {termVersion}</span>
          </div>
        </div>

        {/* Texto do termo */}
        <div className="px-6 pt-3">
          <div className="h-52 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
            {TERM_TEXT}
          </div>
        </div>

        {/* Checkbox — apenas no modo de aceite */}
        {!viewOnly && (
          <div className="px-6 pt-4">
            <label className={cn('flex items-start gap-3 cursor-pointer', isLoading && 'opacity-50 cursor-not-allowed')}>
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
                  <span className="font-semibold text-gray-600">{clientName}</span>
                </span>
              </span>
            </label>
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="mx-6 mt-3 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-5 flex items-center justify-end gap-3">
          {viewOnly ? (
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
          ) : (
            <>
              <p className="text-[11px] text-gray-400 mr-auto">Ao cancelar, você será desconectado do portal.</p>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleAccept}
                disabled={!checked || isLoading}
                className={cn(
                  'px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all',
                  checked && !isLoading
                    ? 'bg-[#500d5b] hover:bg-[#3d0a45] shadow-lg shadow-[#500d5b]/20'
                    : 'bg-[#500d5b]/40 cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Registrando...
                  </span>
                ) : (
                  'Aceitar Termo'
                )}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
