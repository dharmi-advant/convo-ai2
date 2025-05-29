import { cx, focusInput, hasErrorInput } from '@/lib';
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }: TextareaProps, forwardedRef) => {
    return (
      <textarea
        ref={forwardedRef}
        className={cx(
          // base
          'flex min-h-[6rem] w-full  px-4 py-2 shadow-xs outline-hidden transition-colors sm:text-base rounded-[28px] bg-clip-padding contain-inline-size overflow-clip sm:shadow-lg dark:shadow-none!',
          'text-white dark:text-gray-50',
          // border color
          // background color
          'bg-[#303030] dark:bg-gray-950',
          // placeholder color
          'placeholder-gray-400 dark:placeholder-gray-300 p-4, mx-4, my-3',
          // disabled
          //   "disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-300",
          //   "dark:disabled:border-gray-650 dark:disabled:bg-gray-800 dark:disabled:text-gray-500",
          // focus
          focusInput,
          // error
          hasError ? hasErrorInput : '',
          //   invalid (optional)
          //   "dark:aria-invalid:ring-red-400/20 aria-invalid:ring-2 aria-invalid:ring-red-200 aria-invalid:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
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
