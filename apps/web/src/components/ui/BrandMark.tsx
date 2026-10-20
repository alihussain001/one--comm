import logoImg from '../../assets/LOGO.png';

interface BrandMarkProps {
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export default function BrandMark({
  className = '',
  variant = 'auto',
}: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={logoImg}
        alt="One-Comm"
        className={`h-9 sm:h-11 w-auto object-contain transition-transform duration-150 ${
          variant === 'dark'
            ? 'filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
            : ''
        }`}
      />
    </span>
  );
}
