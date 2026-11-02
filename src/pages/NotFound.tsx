import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center">
      <span className="text-xs uppercase tracking-[0.3em] text-muted">404</span>
      <h1 className="font-display text-6xl italic text-text-primary md:text-8xl">Lost in space</h1>
      <Link to="/" className="text-sm text-muted underline-offset-4 hover:text-text-primary hover:underline">
        Back home
      </Link>
    </div>
  );
}
