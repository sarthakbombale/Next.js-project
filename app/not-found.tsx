import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4">
      {/* Big 404 Text */}
      <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">
        404
      </h1>
      
      {/* Decorative Badge */}
      <div className="bg-blue-600 text-white px-2 text-sm rounded rotate-12 absolute">
        Error not found
      </div>

      {/* Message Area */}
      <div className="mt-5 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Looks like you're lost in space.
        </h2>
        <p className="mt-4 text-gray-500 italic">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="mt-8 px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
      >
        Go back to Home
      </Link>
    </main>
  );
}