'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    console.log('Form data:', payload);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong.');
      }

      const result = await res.json();
      console.log('Signup success:', result);

      // Optionally redirect or show a success message
      alert('Account created successfully!');
    } catch (err: any) {
      console.error('Signup error:', err.message);
      alert(err.message || 'Signup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-screen">
      {/* Left: Background Image */}
      <div className="hidden md:block w-1/2 bg-home" />

      {/* Right: Sign Up Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100 dark:bg-gray-900 px-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700 p-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Create your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="name@company.com"
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
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
