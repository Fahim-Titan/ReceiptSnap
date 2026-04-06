import React from 'react';
import { Text, TextProps } from 'react-native';

export interface TypographyProps extends TextProps {
  variant?: 'display' | 'headline' | 'title' | 'body' | 'label';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string; // e.g. text-on-surface
  className?: string;
  children: React.ReactNode;
}

const getVariantStyles = (variant: string, size: string) => {
  // Map our editorial hierarchy
  if (variant === 'headline' || variant === 'display') {
    return `font-headline tracking-tight`;
  }
  return `font-body`;
};

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'sm': return 'text-sm';
    case 'lg': return 'text-lg';
    case 'xl': return 'text-xl';
    case 'md':
    default:
      return 'text-base';
  }
};

const getWeightStyles = (weight: string) => {
  switch (weight) {
    case 'normal': return 'font-normal';
    case 'medium': return 'font-medium';
    case 'semibold': return 'font-semibold';
    case 'bold': return 'font-bold';
    case 'extrabold': return 'font-extrabold';
    default: return '';
  }
};

export const Typography = ({
  variant = 'body',
  size = 'md',
  weight = 'normal',
  color = 'text-on-surface',
  className = '',
  children,
  ...props
}: TypographyProps) => {
  const baseStyle = getVariantStyles(variant, size);
  const sizeStyle = getSizeStyles(size);
  const weightStyle = getWeightStyles(weight);

  return (
    <Text
      className={`${baseStyle} ${sizeStyle} ${weightStyle} ${color} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Headline = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="headline" weight="bold" {...props} />
);

export const Body = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body" {...props} />
);

export const Label = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="label" weight="medium" {...props} />
);
