import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  console.log('SignInPage rendered');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn routing="path" path="/sign-in"  />
    </div>
  );
}
