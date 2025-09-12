import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center space-x-2 text-primary">
            <Icons.logo className="h-8 w-8" />
            <span className="text-2xl font-bold text-foreground">
              farmerhive
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
