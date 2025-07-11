// 'use client';

// import { useRouter } from 'next/navigation';
// import React from 'react';
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// interface StatusModalProps {
//   isVisible: boolean;
//   onClose: () => void;
//   type?: 'success' | 'error';
//   title?: string;
//   message: string;
//   showLoginButton?: boolean;
// }

// const StatusModal: React.FC<StatusModalProps> = ({
//   isVisible,
//   onClose,
//   type = 'error',
//   title = type === 'error' ? 'Error' : 'Success',
//   message,
//   showLoginButton = false,
// }) => {
//   const router = useRouter();
//   if (!isVisible) return null;

//   const Icon = type === 'error' ? FaTimesCircle : FaCheckCircle;
//   const iconColor = type === 'error' ? 'text-red-400' : 'text-green-400';
//   const titleColor = type === 'error' ? 'text-red-300' : 'text-green-300';

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border border-white/20 animate-slide-up transition-all">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center gap-3">
//             <Icon className={`${iconColor} text-2xl`} />
//             <h3 className={`text-xl font-semibold ${titleColor}`}>{title}</h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-white/50 hover:text-white transition"
//             aria-label="Close modal"
//           >
//             <FaTimesCircle className="text-lg" />
//           </button>
//         </div>

//         <p className="text-blue-200 pl-9">{message}</p>

//         <div className="mt-6 flex justify-end">
//           {showLoginButton && (
//             <button
//               onClick={() => {
//                 onClose();
//                 router.push('/auth/login');
//               }}
//               className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition-colors"
//             >
//               Go to Login
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatusModal;

'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface StatusModalProps {
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error';
  title?: string;
  message: string;
  showLoginButton?: boolean;
  duration?: number; // auto-close duration in ms
}

const StatusModal: React.FC<StatusModalProps> = ({
  isVisible,
  onClose,
  type = 'error',
  title = type === 'error' ? 'Error' : 'Success',
  message,
  showLoginButton = false,
  duration,
}) => {
  const router = useRouter();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  // Auto-close after duration
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const Icon = type === 'error' ? FaTimesCircle : FaCheckCircle;
  const iconColor = type === 'error' ? 'text-red-400' : 'text-green-400';
  const titleColor = type === 'error' ? 'text-red-300' : 'text-green-300';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full sm:w-11/12 border border-white/20 animate-slide-up transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <Icon className={`${iconColor} text-2xl`} />
            <h3 className={`text-xl font-semibold ${titleColor}`}>{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition"
            aria-label="Close modal"
          >
            <FaTimesCircle className="text-lg" />
          </button>
        </div>

        <p className="text-blue-200 pl-9">{message}</p>

        <div className="mt-6 flex justify-end">
          {showLoginButton && (
            <button
              onClick={() => {
                onClose();
                router.push('/auth/login');
              }}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition-colors"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
