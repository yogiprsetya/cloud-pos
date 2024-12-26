'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { signIn } from 'next-auth/react';

export const LoginForm = () => {
  const searchParam = useSearchParams();
  const search = searchParam.get('returnUrl');

  const onAuth = () => signIn('google', { callbackUrl: search ?? '/dashboard' });

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Continue with your Google account.</CardDescription>
        </CardHeader>

        <CardContent>
          <Button onClick={onAuth} variant="secondary" className="w-full" size="lg">
            <span className="mr-4">
              <svg role="img" viewBox="0 0 24 24" className="w-4 h-4">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
            </span>
            Login with Google
          </Button>
        </CardContent>

        <CardFooter className="text-center text-sm text-muted-foreground">
          <p>
            By clicking continue, you agree to our{' '}
            <a
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
              href="https://policies.google.com/terms"
              rel="noreferrer"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
              href="https://policies.google.com/privacy"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
