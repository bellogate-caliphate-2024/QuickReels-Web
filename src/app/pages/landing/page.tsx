'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/ui/Navbar';

interface ContentItem {
  _id: string;
  caption: string;
  videoUrl: string;
  thumbnail: string;
}

export default function LandingPage() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unauthModalVisible, setUnauthModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        setTimeout(() => {
          localStorage.clear();
        }, 1000 * 60 * 60);

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

        if (Array.isArray(data.listOfContents)) {
          const cleaned = data.listOfContents
            .filter((item: any) => item && item._id)
            .map((item: any) => ({
              _id: item._id,
              caption: item.caption || 'No caption provided',
              videoUrl: Array.isArray(item.video_url)
                ? item.video_url[0]
                : item.video_url || '',
              thumbnail: Array.isArray(item.thumbnail)
                ? item.thumbnail[0]
                : item.thumbnail,
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-black text-white px-6 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-32 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl animate-float-delayed"></div>

        <div className="flex-grow flex flex-col items-center justify-center relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-10 animated-gradient bg-clip-text text-transparent transition-all duration-300">
            QuickReels
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-blue-200/90 max-w-xl mx-auto animate-fade-in-up delay-100">
            Transform moments into magic. Share your story through captivating
            short videos.
          </p>

          <a
            href="/pages/upload"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-full 
              shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 animate-fade-in-up delay-200"
          >
            Start Creating →
          </a>

          {/* 🎬 Video Content */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-6xl">
            {loading ? (
              <p className="text-blue-200/70">Loading...</p>
            ) : error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              contents.slice(0, 6).map((content) => (
                <div
                  key={content._id}
                  className="bg-white/5 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 border border-white/10"
                >
                  <video
                    className="w-full h-40 object-cover"
                    src={content.videoUrl}
                    controls
                    poster={content.thumbnail}
                  />
                  <div className="p-2">
                    <p className="text-blue-100 font-semibold text-sm truncate">
                      {content.caption}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Feature badges */}
          <div className="mt-12 flex justify-center gap-4 flex-wrap animate-fade-in-up delay-300">
            <a
              href="/pages/upload"
              className="bg-white/5 px-4 py-2 rounded-full text-sm border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              🚀 Instant Uploads
            </a>
            <div
                 className="bg-white/5 px-4 py-2 rounded-full text-sm border border-white/10 backdrop-blur-sm">
              🎨 Creative Tools
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-full text-sm border border-white/10 backdrop-blur-sm">
              🔒 Private Sharing
            </div>
          </div>
        </div>

        <footer className="mt-10 text-sm text-blue-300/70 text-center space-y-2 animate-fade-in-up delay-500 pb-6">
          <p>© {new Date().getFullYear()} QuickReels. Crafted with passion</p>
          <div className="text-xs space-x-4">
            <a href="/privacy" className="hover:text-blue-400 transition">
              Privacy
            </a>
            <a href="/terms" className="hover:text-blue-400 transition">
              Terms
            </a>
            <a href="/about" className="hover:text-blue-400 transition">
              About
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
