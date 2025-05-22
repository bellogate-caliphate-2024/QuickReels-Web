import { FaTimesCircle } from 'react-icons/fa';
import React from 'react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl max-w-md w-full animate-slide-up transition-all text-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <FaTimesCircle className="text-red-400 text-2xl" />
            <h2 className="text-xl font-semibold text-red-300">
              Oops! Something went wrong
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition"
            aria-label="Close modal"
          >
            <FaTimesCircle className="text-lg" />
          </button>
        </div>

        <p className="text-blue-200 pl-9 mb-6">{message}</p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// export const AccessDeniedErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center text-black"  >
//       <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
//       <p className="mb-4">You are Unauthorized to access this page</p>
//       <button
//         onClick={onClose}
//         className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         Close
//       </button>
//     </div>
//   </div>

//   );
