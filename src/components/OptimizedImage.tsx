/**
 * Optimized Image Component
 * Wrapper around Next.js Image with fallback support
 */

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = '/images/placeholder.png',
  priority = false,
  quality = 85,
  sizes,
  fill = false,
  style,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // For external images that might not have width/height
  const imageProps = fill
    ? { fill: true }
    : { width: width || 100, height: height || 100 };

  return (
    <div className={`relative ${className || ''}`} style={style}>
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-700 animate-pulse rounded"
          style={{ zIndex: 1 }}
        />
      )}

      <Image
        src={imgSrc}
        alt={alt}
        {...imageProps}
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          objectFit: 'cover',
          ...style,
        }}
      />
    </div>
  );
}

/**
 * Coin Image Component - Specialized for cryptocurrency icons
 */
interface CoinImageProps {
  src: string;
  symbol: string;
  size?: number;
  className?: string;
}

export function CoinImage({ src, symbol, size = 32, className }: CoinImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={`${symbol} icon`}
      width={size}
      height={size}
      className={className}
      fallbackSrc={`https://via.placeholder.com/${size}x${size}/1e293b/94a3b8?text=${symbol.charAt(0)}`}
      quality={90}
    />
  );
}

/**
 * Exchange Logo Component
 */
interface ExchangeLogoProps {
  src: string;
  name: string;
  size?: number;
  className?: string;
}

export function ExchangeLogo({ src, name, size = 40, className }: ExchangeLogoProps) {
  return (
    <OptimizedImage
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={className}
      fallbackSrc="/images/exchange-placeholder.png"
      quality={90}
    />
  );
}
