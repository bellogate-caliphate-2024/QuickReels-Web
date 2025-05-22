import { FaTrash, FaTimesCircle } from 'react-icons/fa';

export const DeleteConfirmationModal = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border border-white/20 animate-slide-up transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <FaTrash className="text-red-400 text-2xl" />
          <h3 className="text-xl font-semibold text-red-300">Delete Post</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-white/50 hover:text-white transition"
          aria-label="Close modal"
        >
          <FaTimesCircle className="text-lg" />
        </button>
      </div>

      <p className="text-blue-200 pl-9 mb-6">
        Are you sure you want to delete this post? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
