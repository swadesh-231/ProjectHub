import { Link } from "react-router";
import { Home } from "lucide-react";
import { Button } from "../components/common/Button";
import { Logo } from "../components/common/Logo";

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
    <Logo className="mb-8" />
    <p className="font-display text-7xl font-semibold tracking-tight text-brand">
      404
    </p>
    <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
      Page not found
    </h1>
    <p className="mt-2 max-w-sm text-sm text-muted">
      The page you're looking for doesn't exist or may have been moved.
    </p>
    <Link to="/" className="mt-7">
      <Button leftIcon={Home}>Back to dashboard</Button>
    </Link>
  </div>
);

export default NotFoundPage;
