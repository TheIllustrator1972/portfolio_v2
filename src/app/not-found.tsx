import Link from "next/link";

export default function NotFound() {
  return (
    <div className="column py-20">
      <h1 className="type-h2">Page not found</h1>
      <p className="type-body measure mt-3">
        That page doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn btn-secondary mt-6">
        Back home
      </Link>
    </div>
  );
}
