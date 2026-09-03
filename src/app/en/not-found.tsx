import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="legal-page">
      <header className="page-hero page-hero-narrow">
        <p className="page-kicker">404</p>
        <h1>Page not found</h1>
        <p>The page you requested could not be found.</p>
        <div className="article-actions"><Link className="primary-action" href="/en/">Return home</Link></div>
      </header>
    </main>
  );
}
