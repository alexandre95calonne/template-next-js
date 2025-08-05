"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="mx-auto max-w-md px-6 text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gray-900">404</h1>
          <div className="mt-4 h-px w-16 bg-gray-300 mx-auto"></div>
        </div>

        <h2 className="mb-4 text-2xl font-medium text-gray-900">
          Page non trouvée
        </h2>

        <p className="mb-8 text-gray-600">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Retour à l&apos;accueil
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
