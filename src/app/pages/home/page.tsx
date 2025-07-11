'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Navbar from '../../../components/ui/Navbar';
import UnauthorizedModal from '@/components/auth/statusModal';
import { DeleteConfirmationModal } from '@/components/ui/deleteModal';
import EditPostModal from '../../../components/ui/editpostModal';  
import useAuthenticaton from '@/components/auth/useAuthentication';
import {jwtDecode} from 'jwt-decode';

type Content = {
  _id: string;
  caption: string;
  videoUrl: string;
  thumbnail: string;
  isAd?: boolean; 
};



function HomePage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null); // For editing
  const [unauthModalVisible, setUnauthModalVisible] = useState(false);
  const [progressPostId, setProgressPostId] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [modalVideo, setModalVideo] = useState<Content | null>(null);
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [comments, setComments] = useState<{ [key: string]: Array<{ user: string; text: string }> }>({});
  const [commentLoading, setCommentLoading] = useState<{ [key: string]: boolean }>({});



// Helper to decode JWT and get userId
function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    // Adjust this line to match your JWT payload
    return decoded.userId || decoded.id || decoded._id || decoded.sub || null;
  } catch {
    return null;
  }
}

// Fetch user progress
async function fetchUserProgress(userId: string) {
  const res = await fetch(`http://localhost:3001/user-progress/${userId}`);
  if (!res.ok) return null;
  return res.json();
}

// Update user progress
async function updateUserProgress(userId: string, postId: string, postCaption: string) {
  await fetch('http://localhost:3001/user-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, postId, postCaption }),
  });
}


  // Intersection Observer for autoplay
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        setTimeout(() => { localStorage.clear() }, 1000 * 60 * 60);
        const res = await fetch('http://localhost:3001/posts/getContents?page=1&limit=1000', {
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

        if (Array.isArray(data.listOfContents)) {
          const cleaned = data.listOfContents
            .filter((item:any) => item && item._id)
            .map((item: any) => ({
              _id: item._id,
              caption: item.caption || 'No caption provided',
              videoUrl: Array.isArray(item.video_url) ? item.video_url[0] : item.video_url || '',
              thumbnail: Array.isArray(item.thumbnail) ? item.thumbnail[0] : item.thumbnail,
              isAd: item.isAd,
              user: item.user,
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
    const userId = getUserIdFromToken(localStorage.getItem('token'));
    if (userId) {
      fetchUserProgress(userId).then((progress) => {
        if (progress && progress.postId) {
          setProgressPostId(progress.postId);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (progressPostId && contents.length > 0) {
      const el = document.getElementById(`post-${progressPostId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [progressPostId, contents]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(handleIntersection, {
      threshold: 0.6,
    });
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [contents, handleIntersection]);

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

  const fetchComments = async (postId: string) => {
    setCommentLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      const res = await fetch(`http://localhost:3001/comments/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setComments((prev) => ({ ...prev, [postId]: data.comments || [] }));
      }
    } finally {
      setCommentLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const postComment = async (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    setCommentLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      const token = localStorage.getItem('token');
      const userId = getUserIdFromToken(token);
      const res = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId: postId, userId, text }),
      });
      if (res.ok) {
        setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
        fetchComments(postId);
      }
    } finally {
      setCommentLoading((prev) => ({ ...prev, [postId]: false }));
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

  // Split posts into ads and non-ads
  const adPosts = contents.filter(post => post.isAd);
  const nonAdPosts = contents.filter(post => !post.isAd);
  const currentUserId = getUserIdFromToken(localStorage.getItem('token'));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black flex flex-col md:flex-row items-center md:items-start py-8">
        <div className="w-full max-w-md flex flex-col gap-8 md:mr-8">
          {nonAdPosts.map((content, idx) => (
            <div
              key={content._id}
              id={`post-${content._id}`}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden flex flex-col items-center"
            >
              <video
                ref={el => { videoRefs.current[idx] = el; }}
                className="w-full h-96 object-cover bg-black cursor-pointer"
                src={content.videoUrl}
                poster={content.thumbnail}
                controls={false}
                muted
                loop
                playsInline
              />
              <button
                className="mt-4 mb-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow transition-all duration-200"
                onClick={() => {
                  setModalVideo(content);
                  const token = localStorage.getItem('token');
                  const userId = getUserIdFromToken(token);
                  if (userId) {
                    updateUserProgress(userId, content._id, content.caption);
                  }
                }}
              >
                ▶️ Watch
              </button>
              <div className="p-4 w-full flex flex-col items-start">
                <h2 className="text-lg font-semibold text-white mb-2 truncate" title={content.caption}>{content.caption}</h2>
                <div className="w-full h-px bg-white/10 my-2" />
                <div className="flex gap-6 mt-2">
                  <button
                    className="text-xl transition-colors"
                    onClick={() => {
                      setOpenCommentPostId(openCommentPostId === content._id ? null : content._id);
                      if (openCommentPostId !== content._id) fetchComments(content._id);
                    }}
                    aria-label="Comment"
                  >
                    💬
                  </button>
                  <button
                    className="text-xl transition-colors"
                    onClick={() => setLikedPosts(prev => ({ ...prev, [content._id]: !prev[content._id] }))}
                    aria-label="Like"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={likedPosts[content._id] ? '#ef4444' : 'white'}
                      viewBox="0 0 24 24"
                      stroke="none"
                      className="w-7 h-7"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                  </button>
                  <button className="text-green-400 hover:text-green-300 text-xl">🔗</button>
                </div>
                <div className="flex gap-4 mt-4">
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
              {/* Inline Comment Input & Display */}
              {openCommentPostId === content._id && (
                <div className="w-full mt-4 bg-white/5 rounded-xl p-3">
                  <div className="flex gap-2 items-center mb-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Add a comment..."
                      value={commentInputs[content._id] || ''}
                      onChange={e => setCommentInputs(prev => ({ ...prev, [content._id]: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') postComment(content._id); }}
                      disabled={commentLoading[content._id]}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                      onClick={() => postComment(content._id)}
                      disabled={commentLoading[content._id] || !(commentInputs[content._id]?.trim())}
                    >
                      Post
                    </button>
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {commentLoading[content._id] ? (
                      <div className="text-blue-200 text-sm">Loading comments...</div>
                    ) : (
                      (comments[content._id]?.filter(c => c)?.length ? comments[content._id].filter(c => c).map((c, i) => (
                        <div key={i} className="flex items-center gap-2 text-white/90 text-sm">
                          <span className="font-semibold text-blue-200">{c.user === currentUserId ? 'Me' : (c.user || 'User')}:</span>
                          <span>{c.text}</span>
                        </div>
                      )) : <div className="text-gray-400 text-xs">No comments yet.</div>)
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {showDeleteModal && (
            <DeleteConfirmationModal
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={() => selectedId && handleDelete(selectedId)}
            />
          )}
          {selectedContent && (
            <EditPostModal
              content={selectedContent}
              onCancel={() => setSelectedContent(null)}
              onUpdate={handleUpdate}
            />
          )}
          <UnauthorizedModal
            isVisible={unauthModalVisible}
            onClose={() => setUnauthModalVisible(false)}
            message="You are not authorized to access this page. Redirecting...."
          />
        </div>
        {/* Sidebar for Ads */}
        <aside className="hidden md:block w-80 min-h-[600px] ml-auto bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 mt-2 sticky top-8">
          <h2 className="text-xl font-bold text-white mb-4">Sponsored</h2>
          <div className="flex flex-col gap-6">
            {adPosts.length === 0 ? (
              <div className="text-blue-200 text-center">No ads to display.</div>
            ) : (
              adPosts.map((ad, idx) => (
                <div key={ad._id} className="bg-white/20 rounded-xl p-4 flex flex-col items-center shadow">
                  <span className="text-lg font-semibold text-blue-200 mb-2">Sponsored</span>
                  <video
                    // no ref needed
                    className="w-32 h-20 object-cover rounded-lg mb-2 bg-black"
                    src={ad.videoUrl}
                    poster={ad.thumbnail}
                    controls={false}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  <span className="text-sm text-white/80 truncate w-full">{ad.caption}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </main>
      {/* Video Modal */}
      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setModalVideo(null)}>
          <div className="bg-gray-900 text-white border border-gray-700 rounded-2xl shadow-2xl p-4 max-w-lg w-full mx-2 relative scale-100 animate-modal-in" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white hover:text-red-500 text-3xl font-bold bg-gray-800/60 rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-gray-700"
              onClick={() => setModalVideo(null)}
              aria-label="Close"
            >
              ×
            </button>
            <video
              className="w-full h-80 object-contain bg-black rounded-lg"
              src={modalVideo.videoUrl}
              poster={modalVideo.thumbnail}
              controls
              autoPlay={false}
            />
            <div className="mt-4 text-center text-lg font-semibold text-white truncate">{modalVideo.caption}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default useAuthenticaton(HomePage);
