'use client' // Add this directive at the very top

import { useState } from 'react';
import Image from 'next/image';

interface Thumbnail {
  id: number;
  title: string;
  thumbnailUrl: string;
}

export default function Home() {
  const [mockThumbnails] = useState<Thumbnail[]>(
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      title: `Reel ${i + 1}`,
      thumbnailUrl: "/What-Does-a-Social-Media-Manager-Do-Reach-Marketing-Pro-768x768.png",
    }))
  );

  const [selectedThumbnail, setSelectedThumbnail] = useState<number | null>(null);

  const handleThumbnailClick = (id: number) => {
    setSelectedThumbnail(id);
    // Add your navigation logic here
  };

  return (
    
      <><h1 className="text-3xl font-bold mb-6 text-gray-800">QuickReels</h1><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mockThumbnails.map(({ id, title, thumbnailUrl }) => (
        <div
          key={id}
          className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${selectedThumbnail === id ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => handleThumbnailClick(id)}
        >
          <div className="relative h-48 w-full">
            <Image
              src={thumbnailUrl}
              alt={`Thumbnail for ${title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">00:30</p> {/* Add duration */}
          </div>
        </div>
      ))}
    </div></>

    )
}