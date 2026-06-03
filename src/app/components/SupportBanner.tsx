interface SupportBannerProps {
  className?: string;
}

export function SupportBanner({ className = '' }: SupportBannerProps) {
  return (
    <div className={`mt-6 mx-4 sm:mx-8 px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 ${className}`}>
      <p className="text-xs text-gray-600 text-center">
        Dúvidas? Entre em contato:{' '}
        <span className="font-medium text-gray-700">suporte@rumina.com.br</span> •{' '}
        <span className="font-medium text-gray-700">(31) 99509-3854</span>
      </p>
    </div>
  );
}
