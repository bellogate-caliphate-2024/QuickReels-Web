// // src/components/ui/input.tsx
// 'use client';

// import { cn } from '@/lib/utils';
// import { InputHTMLAttributes, forwardRef } from 'react';

// const Input = forwardRef<
//   HTMLInputElement,
//   InputHTMLAttributes<HTMLInputElement>
// >(({ className, type, ...props }, ref) => {
//   return (
//     <input
//       type={type}
//       className={cn(
//         'flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background', // Changed bg-background to bg-white
//         'file:border-0 file:bg-transparent file:text-sm file:font-medium',
//         'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
//         'disabled:cursor-not-allowed disabled:opacity-50',
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   );
// });

// Input.displayName = 'Input';

// export { Input };
