import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, ArrowRight, MailWarning } from "lucide-react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { loginSchema } from "../../utils/validation";
import { useLogin, useResendVerification } from "../../hooks/useAuth";

const LoginPage = () => {
  const login = useLogin();
  const resend = useResendVerification();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  // Backend returns 403 when the account exists but the email isn't verified.
  const needsVerification = login.error?.response?.status === 403;

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your workspace."
    >
      {needsVerification && (
        <div className="mb-4 rounded-xl border border-warning/40 bg-warning/10 p-3.5 text-sm">
          <div className="flex items-start gap-2.5">
            <MailWarning className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <div>
              <p className="font-medium text-foreground">
                Verify your email to continue
              </p>
              <p className="mt-0.5 text-muted">
                We sent a verification link to your inbox. Didn't get it?{" "}
                <button
                  type="button"
                  disabled={resend.isPending}
                  onClick={() => resend.mutate(watch("email"))}
                  className="font-medium text-brand hover:underline disabled:opacity-60"
                >
                  {resend.isPending ? "Sending…" : "Resend email"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit((values) => login.mutate(values))}
        className="space-y-4"
      >
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          leftIcon={Mail}
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={Lock}
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="mt-2 text-right">
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-brand hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={login.isPending}
          rightIcon={ArrowRight}
        >
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-brand hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
