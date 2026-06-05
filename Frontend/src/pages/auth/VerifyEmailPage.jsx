import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Button } from "../../components/common/Button";
import { Spinner } from "../../components/common/Spinner";
import { authApi } from "../../api/auth.api";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    authApi
      .verifyEmail(token)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  const content = {
    loading: {
      icon: <Spinner className="h-8 w-8" />,
      title: "Verifying your email",
      text: "Hang tight, this only takes a moment.",
    },
    success: {
      icon: <CheckCircle2 className="h-12 w-12 text-success" />,
      title: "Email verified",
      text: "Your email address has been confirmed. You're all set.",
    },
    error: {
      icon: <XCircle className="h-12 w-12 text-danger" />,
      title: "Verification failed",
      text: "This link is invalid or has expired. Please request a new one.",
    },
  }[status];

  return (
    <AuthLayout title="Email verification" subtitle="Confirming your account.">
      <div className="flex flex-col items-center rounded-2xl border border-border-subtle bg-surface px-6 py-12 text-center">
        {content.icon}
        <h2 className="mt-5 font-display text-lg font-semibold text-foreground">
          {content.title}
        </h2>
        <p className="mt-1.5 max-w-xs text-sm text-muted">{content.text}</p>
      </div>
      {status !== "loading" && (
        <Link to="/login" className="mt-6 block">
          <Button className="w-full" size="lg" rightIcon={ArrowRight}>
            Continue to sign in
          </Button>
        </Link>
      )}
    </AuthLayout>
  );
};

export default VerifyEmailPage;
