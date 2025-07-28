import { Suspense } from 'react';
import { LoginForm } from './_form';

const SigninPage = () => (
  <Suspense>
    <LoginForm />
  </Suspense>
);

export default SigninPage;
