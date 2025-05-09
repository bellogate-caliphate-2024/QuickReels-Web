'use client';

import { useForm } from 'react-hook-form';

type AuthFormProps = {
  type: 'login' | 'signup';
  onSubmit: (data: { email: string; password: string }) => void;
};

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
    name?: string;
  }>();

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {type === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          {...register('password')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </button>
    </form>
  );
}
