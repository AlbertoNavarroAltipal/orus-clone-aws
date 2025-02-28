import { LayoutProps } from "@/types/layout";
import { Toaster } from 'sonner';

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-full flex-1 flex-col justify-center">
        {children}
        <Toaster richColors position="bottom-right" />
      </div>
    </div>
  );
}
