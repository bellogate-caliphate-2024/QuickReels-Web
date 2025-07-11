import { FaPen, FaTimesCircle } from 'react-icons/fa';
import { useState } from 'react';

 const EditPostModal = ({
  content,
  onCancel,
  onUpdate,
}: {
  content: {
    _id: string;
    caption: string;
    videoUrl: string;
    thumbnail: string;
  };
  onCancel: () => void;
  onUpdate: (updatedContent: {
    _id: string;
    caption: string;
    videoUrl: string;
    thumbnail: string;
  }) => void;
}) => {
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(updatedContent);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border border-white/20 animate-slide-up transition-all text-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <FaPen className="text-silver-300 text-2xl" />
            <h3 className="text-xl font-semibold text-white-200">Edit Post</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-white/50 hover:text-white transition"
            aria-label="Close modal"
          >
            <FaTimesCircle className="text-lg" />
          </button>
        </div>

        <div className="space-y-4 pl-9 pr-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-white/80">Caption</label>
            <input
              type="text"
              name="caption"
              value={updatedContent.caption}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Edit caption"
            />
          </div>

          {/* <div>
            <label className="block mb-1 text-sm font-medium text-white/80">Video URL</label>
            <input
              type="text"
              name="videoUrl"
              value={updatedContent.videoUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Edit video URL"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-white/80">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              value={updatedContent.thumbnail}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Edit thumbnail URL"
            />
          </div> */}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onCancel}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-white transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditPostModal;