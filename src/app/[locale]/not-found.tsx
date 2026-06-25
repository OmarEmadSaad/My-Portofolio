import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-6xl font-bold text-primary-600 dark:text-primary-400">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link
        href="/en"
        className="mt-6 rounded-lg bg-primary-600 px-6 py-3 text-white transition-colors hover:bg-primary-700"
      >
        Back to home
      </Link>
    </main>
  );
}
