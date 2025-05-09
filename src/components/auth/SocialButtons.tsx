'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function SocialButtons({
  callbackUrl = '../auth/app/page.tsx',
  providers = ['google', 'github'],
  className,
}: {
  callbackUrl?: string;
  providers?: ('google' | 'github')[];
  className?: string;
}) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setLoadingProvider(provider);
      await signIn(provider, { callbackUrl });
    } catch (error) {
      console.error('Social login error:', error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const providerConfig = {
    google: {
      name: 'Google',
      icon: 'https://authjs.dev/img/providers/google.svg',
    },
    github: {
      name: 'GitHub',
      icon: 'https://authjs.dev/img/providers/github.svg',
    },
  };

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {providers.map((provider) => (
        <Button
          key={provider}
          variant="outline"
          className="w-full sm:w-auto px-6 py-3 gap-2"
          onClick={() => handleSocialLogin(provider)}
          disabled={!!loadingProvider}
          type="button"
        >
          {loadingProvider === provider ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Image
                src={providerConfig[provider].icon}
                alt={providerConfig[provider].name}
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="hidden sm:inline">
                Continue with {providerConfig[provider].name}
              </span>
            </>
          )}
        </Button>
      ))}
    </div>
  );
}
