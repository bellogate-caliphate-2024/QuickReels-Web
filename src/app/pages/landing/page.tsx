import Navbar from '@/components/ui/Navbar';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-black-900 to-blue-900 text-white px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-32 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl animate-float-delayed"></div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col items-center justify-center relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-10 animated-gradient bg-clip-text text-transparent transition-all duration-300">
            QuickReels
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-blue-200/90 max-w-xl mx-auto animate-fade-in-up delay-100">
            Transform moments into magic. Share your story through captivating
            short videos.
          </p>

          <div className="animate-fade-in-up delay-200">
            <a
              href="/pages/upload"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-full 
            shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              Start Creating →
            </a>
          </div>

          {/* Feature badges */}
          <div className="mt-12 flex justify-center gap-4 flex-wrap animate-fade-in-up delay-300">
            <div className="bg-white/5 px-4 py-2 rounded-full text-sm border border-white/10 backdrop-blur-sm">
              🚀 Instant Uploads
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-full text-sm border border-white/10 backdrop-blur-sm">
              🎨 Creative Tools
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-full text-sm border border-white/10 backdrop-blur-sm">
              🔒 Private Sharing
            </div>
          </div>
        </div>

        {/* Footer */}
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
