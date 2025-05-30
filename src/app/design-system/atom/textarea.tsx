import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

// Utility functions
// Utility functions
const mergeClasses = (...args: import('clsx').ClassValue[]) => {
  return twMerge(clsx(...args));
};

const focusInputStyles = [
  'focus:ring-2',
  'focus:ring-blue-200 dark:focus:ring-blue-700/30',
  'focus:border-blue-500 dark:focus:border-blue-700',
];

const hasErrorInputStyles = [
  'ring-2',
  'border-red-500 dark:border-red-700',
  'ring-red-200 dark:ring-red-700/30',
];

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }: TextareaProps, forwardedRef) => {
    return (
      <textarea
        ref={forwardedRef}
        className={mergeClasses(
          // base
          'flex min-h-[6rem] w-full  px-4 py-2 shadow-xs outline-hidden transition-colors sm:text-base rounded-[28px] bg-clip-padding contain-inline-size overflow-clip sm:shadow-lg dark:shadow-none!',
          'text-white dark:text-gray-50',
          // border color
          // background color
          'bg-[#303030] dark:bg-gray-950',
          // placeholder color
          'placeholder-gray-400 dark:placeholder-gray-300 p-4, mx-4, my-3',
          // focus
          focusInputStyles,
          // error
          hasError ? hasErrorInputStyles : '',
          className
        )}
        tremor-id="tremor-raw"
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, type TextareaProps };
