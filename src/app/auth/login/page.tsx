'use client';

import Navbar from '@/components/ui/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorModal } from '@/components/ui/errorModal';

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Login failed');
      }

      const result = await res.json();
      localStorage.setItem('token', result.accessToken);
      router.push('/pages/landing');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex h-screen">
        {/* Left: Background Image */}
        <div className="hidden md:block w-1/2 bg-home" />

        {/* Right: Login Form */}
        <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100 dark:bg-gray-900 px-6">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700 p-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Sign in to your account
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email') as string;
                const password = formData.get('password') as string;

                handleSubmit({ email, password });
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-500 dark:text-gray-300">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a
                  href="/auth/signup"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
            {error && (
              <ErrorModal message={error} onClose={() => setError(null)} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
