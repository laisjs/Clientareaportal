import ideagriIcon from 'figma:asset/7294337bec6a54cc77bc61766ae19189dbdc678a.png';
import rumiFlowIcon from 'figma:asset/341e72b38085758e067f478121d4409fbd0baffb.png';
import onFarmIcon from 'figma:asset/9ece7af519bbd55e5e9e28ec85a91ac808e02130.png';
import rumiAnalyzerIcon from 'figma:asset/4804a2c362a4c486796fe203337e0ea6d69afa22.png';
import rumiPulseIcon from 'figma:asset/7121ec929018bc8700d60cc718a8245b49c9b06f.png';

interface ProductIconProps {
  productName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Mapeamento de produtos para seus respectivos ícones
const productIconMap: { [key: string]: string } = {
  'Ideagri': ideagriIcon,
  'Rumi Flow': rumiFlowIcon,
  'On Farm': onFarmIcon,
  'Rumi Analyzer': rumiAnalyzerIcon,
  'Rumi Pulse': rumiPulseIcon,
  'Pro Care': rumiPulseIcon, // Usando RP como fallback
};

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
};

export function ProductIcon({ productName, size = 'md', className = '' }: ProductIconProps) {
  const iconSrc = productIconMap[productName] || ideagriIcon; // fallback para Ideagri
  const iconSize = sizeMap[size];
  
  return (
    <img 
      src={iconSrc}
      alt={`Ícone ${productName}`}
      className={`object-cover ${className}`}
      style={{ 
        width: `${iconSize}px`, 
        height: `${iconSize}px`,
      }}
    />
  );
}