import { cn } from './ui/utils';

interface StatusBadgeProps {
  status: 'Vigente' | 'Encerrado';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    Vigente: {
      backgroundColor: 'rgba(27, 196, 125, 0.1)',
      color: '#1bc47d',
      borderColor: 'rgba(27, 196, 125, 0.3)',
    },
    Encerrado: {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
      color: '#6b7280',
      borderColor: 'rgba(107, 114, 128, 0.3)',
    },
  };

  const style = variants[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-md text-sm border',
        className
      )}
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderColor: style.borderColor,
      }}
    >
      {status}
    </span>
  );
}
