'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUpload, FaInfoCircle } from 'react-icons/fa';

function Navbar() {
  const pathname = usePathname();

  const isAuthPage = ['/auth/login', '/auth/signup'].includes(pathname);
  const isLandingPage = pathname === '/pages/landing';

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 backdrop-blur-sm border-b border-blue-400/30 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/pages/landing" className="group">
          <h1 className="text-2xl font-bold tracking-tight flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-300/50 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">QR</span>
            </div>
            <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent transition-all duration-500 group-hover:from-blue-300 group-hover:to-blue-100">
              QuickReels
            </span>
          </h1>
        </Link>

        {!isAuthPage && !isLandingPage && (
          <ul className="flex space-x-8 font-medium">
            {[
              { href: '/pages/home', icon: FaHome, text: 'Home' },
              { href: '/pages/upload', icon: FaUpload, text: 'Upload' },
              { href: '/pages/about', icon: FaInfoCircle, text: 'About' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className={`flex items-center space-x-2 transition-all duration-300 group relative ${
                        isActive ? 'text-blue-400' : 'hover:text-blue-300'
                      }`}
                    >
                      <Icon
                        className={`transition-transform duration-300 ${
                          isActive ? 'scale-125' : 'group-hover:scale-125'
                        }`}
                      />
                      <span
                        className={`${
                          isActive
                            ? 'bg-blue-400/10 px-3 py-1 rounded-lg'
                            : 'group-hover:bg-blue-400/10 group-hover:px-3 group-hover:py-1 group-hover:rounded-lg'
                        } transition-all duration-300`}
                      >
                        {item.text}
                      </span>
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-blue-400 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {isLandingPage && (
          <div className="flex justify-end items-center gap-2 p-5 text-sm">
            <p className="text-blue-200">Don’t have an account?</p>
            <a
              href="/auth/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium"
            >
              Sign Up
            </a>
            <p className="text-blue-200">Already registered?</p>
            <a
              href="/auth/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
