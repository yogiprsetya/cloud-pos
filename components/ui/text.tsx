import { cva, VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';
import { cn } from '~/utils/css';

type Tags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

const textVariant = cva('', {
  variants: {
    variant: {
      'heading-1': 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      'heading-2': 'scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl',
      base: '',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

interface TextProps extends VariantProps<typeof textVariant> {
  tag?: Tags;
  className?: string;
  children: ReactNode;
}

export const Text: FC<TextProps> = ({ tag = 'p', children, variant = 'base', className }) => {
  const Element = tag;

  return <Element className={cn(textVariant({ variant: variant }), className)}>{children}</Element>;
};
