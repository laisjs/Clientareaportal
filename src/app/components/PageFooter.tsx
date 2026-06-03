interface PageFooterProps {
  className?: string;
}

export function PageFooter({ className = '' }: PageFooterProps) {
  return (
    <footer className={`bg-white border-t border-gray-200 mt-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
        <p className="text-xs text-gray-500 text-center">
          © 2026 Rúmina. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
