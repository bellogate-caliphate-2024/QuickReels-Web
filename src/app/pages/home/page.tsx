'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../../components/ui/Navbar';
import UnauthorizedModal from '@/components/auth/statusModal';
import { DeleteConfirmationModal } from '@/components/ui/deleteModal';
import EditPostModal from '../../../components/ui/editpostModal';  // Edit Modal component
import useAuthenticaton from '@/components/auth/useAuthentication';

type Content = {
  _id: string;
  caption: string;
  videoUrl: string;
  thumbnail: string;
};

function HomePage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null); // For editing
  const [unauthModalVisible, setUnauthModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        setTimeout(() => { localStorage.clear() }, 1000 * 60 * 60);
        const res = await fetch(`http://localhost:3001/posts/getContents`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          setError('Unauthorized');
          setUnauthModalVisible(true);
          return;
        }

        const data = await res.json();
        console.log('Raw response:', data);

        if (Array.isArray(data.listOfContents)) {
          const cleaned = data.listOfContents.map((item: any) => ({
            _id: item._id,
            caption: item.caption || 'No caption provided',
            videoUrl: Array.isArray(item.video_url) ? item.video_url[0] : item.video_url || '',
            thumbnail: Array.isArray(item.thumbnail) ? item.thumbnail[0] : item.thumbnail,
          }));

          setContents(cleaned);
        } else {
          console.error('Invalid data format:', data);
          setError('Invalid response format from server.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch contents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      console.log('token from :', token);

      if (!token) {
        console.error('No token found');
        return;
      }
      const res = await fetch(`http://localhost:3001/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (res.ok) {
        setContents((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error('Failed to delete item.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  const handleEdit = (content: Content) => {
    setSelectedContent(content);
  };

  const handleUpdate = async (updatedContent: Content) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3001/posts/${updatedContent._id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContent),
      });

      if (res.ok) {
        const updated = await res.json();
        setContents((prev) =>
          prev.map((item) => (item._id === updatedContent._id ? updated : item))
        );
        setSelectedContent(null);
      } else {
        console.error('Failed to update content.');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-blue-900">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-indigo-500 animate-pulse mb-4">
            Loading...
          </h1>
          <p className="text-lg sm:text-xl text-blue-300 animate-bounce">
            Please wait while we load your content.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="p-6 min-h-screen bg-gradient-to-br from-black-900 to-blue-800">
        <h1 className="text-5xl font-extrabold text-center mb-10 animated-gradient bg-clip-text text-transparent transition-all duration-300">
          WELCOME TO QUICKREELS
        </h1>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {contents.map((content) => (
            <div
              key={content._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] relative"
            >
              <img
                src={content.thumbnail}
                alt={content.caption}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h2
                  className="text-base font-semibold text-white truncate mb-3"
                  title={content.caption}
                >
                  {content.caption}
                </h2>
                <div className="flex justify-between items-center text-sm">
                  <a
                    href={content.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300 font-medium transition"
                  >
                    🎬 Watch Video
                  </a>
                  <button
                    onClick={() => handleEdit(content)}
                    className="text-green-400 hover:text-green-300 font-medium transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(content._id);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-400 hover:text-red-300 font-medium transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <DeleteConfirmationModal
            onCancel={() => {
              setShowDeleteModal(false);
              setSelectedId(null);
            }}
            onConfirm={() => selectedId && handleDelete(selectedId)}
          />
        )}

        {/* Unauthorized Error Modal */}
        <UnauthorizedModal
          isVisible={unauthModalVisible}
          onClose={() => {
            setUnauthModalVisible(false);
          }}
          message="You are not authorized to access this content. Please log in."
        />

        {/* Edit Post Modal */}
        {selectedContent && (
          <EditPostModal
            content={selectedContent}
            onCancel={() => setSelectedContent(null)}
            onUpdate={handleUpdate}
          />
        )}
      </main>
    </>
  );
}

export default useAuthenticaton(HomePage);
