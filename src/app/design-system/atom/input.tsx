// import { Input as UIInput } from '@/app/components/ui/Input-ui';

// export default function Input({ children }: { children: React.ReactNode }) {
//   return <UIInput>{children}</UIInput>;
// }
import React from 'react';
import { RiEyeFill, RiEyeOffFill, RiSearchLine } from '@remixicon/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes using twMerge
 * @param inputs - Class names to combine
 * @returns Merged class names string
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define hasErrorInput styles directly in the file
const hasErrorInput = [
  // base
  'ring-2',
  // border color
  'border-red-500 dark:border-red-700',
  // ring color
  'ring-red-200 dark:ring-red-700/30',
];

const inputStyles = tv({
  base: [
    // base
    // ... existing code ...
    // 'relative block w-full max-w-xxl my-4 appearance-none shadow-xs outline-none transition sm:text-sm border-0',
    // // ... existing code ...,
    // // text color
    // 'text-white dark:text-white',
    // // placeholder color
    // 'placeholder-gray-400 dark:placeholder-white',
    // background color
    // 'bg-[#424242] dark:bg-gray-800/40',
    // file
    [
      'file:-my-2 file:-ml-2.5 file:cursor-pointer file:rounded-l-[5px] file:rounded-r-none file:border-0 file:px-3 file:py-2 file:outline-hidden focus:outline-none disabled:pointer-events-none file:disabled:pointer-events-none',
      'file:border-solid file:border-gray-300 file:bg-gray-50 file:text-gray-500 file:hover:bg-gray-100 dark:file:border-gray-800 dark:file:bg-gray-950 dark:file:hover:bg-gray-900/20 dark:file:disabled:border-gray-700',
      'file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]',
      'file:disabled:bg-gray-100 file:disabled:text-gray-500 dark:file:disabled:bg-gray-800',
    ],
    // remove focus styles
    'focus:ring-0 focus:border-0',
    // remove search cancel button (optional)
    '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
    // number input
    enableStepper: {
      false:
        '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
    },
  },
});

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, inputClassName, hasError, enableStepper = true, type, ...props }: InputProps,
    forwardedRef
  ) => {
    const [typeState, setTypeState] = React.useState(type);

    const isPassword = type === 'password';
    const isSearch = type === 'search';

    return (
      <div className={cx('relative w-full', className)} tremor-id="tremor-raw">
        <input
          ref={forwardedRef}
          type={isPassword ? typeState : type}
          className={cx(
            inputStyles({ hasError, enableStepper }),
            {
              'pl-8': isSearch,
              'pr-10': isPassword,
            },
            inputClassName
          )}
          {...props}
        />
        {isSearch && (
          <div
            className={cx(
              // base
              'pointer-events-none absolute bottom-0 left-2 flex h-full items-center justify-center',
              // text color
              'text-gray-400 dark:text-gray-600'
            )}
          >
            <RiSearchLine className="size-[1.125rem] shrink-0" aria-hidden="true" />
          </div>
        )}
        {isPassword && (
          <div
            className={cx('absolute bottom-0 right-0 flex h-full items-center justify-center px-3')}
          >
            <button
              aria-label="Change password visibility"
              className={cx(
                // base
                'h-fit w-fit rounded-xs outline-hidden transition-all',
                // text
                'text-gray-400 dark:text-gray-600',
                // hover
                'hover:text-gray-500 dark:hover:text-gray-500',
                'focus:ring-0 focus:border-0'
              )}
              type="button"
              onClick={() => {
                setTypeState(typeState === 'password' ? 'text' : 'password');
              }}
            >
              <span className="sr-only">
                {typeState === 'password' ? 'Show password' : 'Hide password'}
              </span>
              {typeState === 'password' ? (
                <RiEyeFill aria-hidden="true" className="size-5 shrink-0" />
              ) : (
                <RiEyeOffFill aria-hidden="true" className="size-5 shrink-0" />
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputStyles, type InputProps };
