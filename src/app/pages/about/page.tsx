'use client';

import Navbar from '@/components/ui/Navbar';
import { FaRocket, FaVideo, FaShieldAlt, FaHeart } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black-900  to-blue-900 text-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              About QuickReels
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Revolutionizing short-form video sharing with speed, simplicity,
              and creativity at its core.
            </p>
          </div>

          {/* Our Story */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-16 border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Our Story</h2>
            <p className="text-lg text-blue-200 leading-relaxed">
              Born from a passion for authentic storytelling, QuickReels emerged
              in 2024 as a platform dedicated to empowering creators. We believe
              everyone has a story worth sharing, and we've built the tools to
              make video creation effortless and enjoyable.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: FaRocket,
                title: 'Instant Upload',
                text: 'Get your content live in seconds with our optimized upload system',
              },
              {
                icon: FaVideo,
                title: 'Seamless Experience',
                text: '4K video support with real-time processing and preview',
              },
              {
                icon: FaShieldAlt,
                title: 'Secure Platform',
                text: 'Military-grade encryption and privacy controls for your content',
              },
              {
                icon: FaHeart,
                title: 'Community First',
                text: 'Built with love for creators by creators',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <feature.icon className="text-4xl text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-300">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <h2 className="text-3xl font-bold mb-6 text-purple-300">
                Our Values
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Creativity Unleashed
                  </h3>
                  <p className="text-blue-200">
                    No algorithms dictating trends - just pure creative
                    expression
                  </p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Authentic Connections
                  </h3>
                  <p className="text-blue-200">
                    Foster real engagement without vanity metrics
                  </p>
                </div>
                <div className="border-l-4 border-indigo-400 pl-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Innovation Driven
                  </h3>
                  <p className="text-blue-200">
                    Constantly evolving to meet creator needs
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Join the Revolution</h3>
              <p className="text-blue-100 mb-6">
                Start sharing your story today
              </p>
              <a
                href="/upload"
                className="bg-white text-blue-900 py-3 px-6 rounded-full font-semibold hover:bg-blue-100 transition text-center"
              >
                Create Your First Reel
              </a>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 text-center text-blue-300">
            <p className="text-sm">
              © {new Date().getFullYear()} QuickReels. Crafted with passion and
              Next.js
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
