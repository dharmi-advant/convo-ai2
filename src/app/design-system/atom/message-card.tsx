// Tremor Card [v1.0.0]

import React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cx } from '@/lib';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : 'div';
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          'relative w-full rounded-4xl border p-4 text-left shadow-xs',
          // background color
          'bg-[#303030] text-white dark:bg-[#090E1A]',
          // border color
          className
        )}
        tremor-id="tremor-raw"
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card, type CardProps };
