import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, MailCheck } from "lucide-react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { forgotPasswordSchema } from "../../utils/validation";
import { useForgotPassword } from "../../hooks/useAuth";

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const forgot = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = (values) =>
    forgot.mutate(values, { onSuccess: () => setSent(true) });

  if (sent) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle="We've sent a password reset link to your email."
      >
        <div className="flex flex-col items-center rounded-2xl border border-border-subtle bg-surface px-6 py-10 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
            <MailCheck className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm text-muted">
            Follow the link in the email to choose a new password. The link
            expires in 20 minutes.
          </p>
        </div>
        <Link
          to="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          leftIcon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={forgot.isPending}
        >
          Send reset link
        </Button>
      </form>
      <Link
        to="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
