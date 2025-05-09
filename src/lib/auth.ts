import { signIn } from 'next-auth/react'

export async function handleCredentialsLogin(email: string, password: string) {
  const result = await signIn('credentials', {
    redirect: false,
    email,
    password
  })
  
  if (result?.error) {
    throw new Error(result.error)
  }
  
  return result
}

export async function handleSocialLogin(provider: 'google' | 'github') {
  await signIn(provider, { callbackUrl: '/dashboard' })
}