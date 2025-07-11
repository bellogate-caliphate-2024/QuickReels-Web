// app/api/videos/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const mockVideos = [
    {
      id: '1',
      videoUrl: '/sample.mp4',
      caption: 'Demo video',
      thumbnail: '/thumbnail.jpg',
    },
  ];

  return NextResponse.json(mockVideos);
}
