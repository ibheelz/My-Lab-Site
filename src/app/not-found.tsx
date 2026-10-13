import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-10">
      <div className="text-center">
        <div className="text-[120px] font-bold text-red mb-4">404</div>
        <h1 className="text-4xl font-bold text-white mb-4">route not found</h1>
        <p className="text-base text-muted mb-8">abiola@abiola:~$ the page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="text-white hover:text-red transition-colors text-base font-medium">
          → go back home
        </Link>
      </div>
    </div>
  );
}
