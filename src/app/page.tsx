'use client';

import { useEffect, useState } from 'react';

type Content = {
  _id: string;
  title: string;
  caption: string;
  videoUrl: string;
  thumbnail: string;
};

export default function HomePage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/posts/getContents`);
        const data = await res.json();

        if (Array.isArray(data.contents)) {
          setContents(data.contents);
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

  if (loading) {
    return <main className="p-4 text-center text-gray-600">Loading...</main>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Content Grid</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contents.map((content) => (
          <div key={content._id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={content.thumbnail}
              alt={content.title || 'Video thumbnail'}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{content.title}</h2>
            <p className="text-gray-600">{content.caption}</p>
            <a
              href={content.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-2 inline-block"
            >
              Watch Video
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
