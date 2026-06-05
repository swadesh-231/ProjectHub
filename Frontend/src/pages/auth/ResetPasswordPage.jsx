import { useNavigate, useLocation, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Lock, Mail, KeyRound, ArrowLeft } from "lucide-react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { resetPasswordSchema } from "../../utils/validation";
import { useResetPassword } from "../../hooks/useAuth";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reset = useResetPassword();
  // Email is carried over from the forgot-password step; falls back to an
  // editable field if the user landed here directly or refreshed.
  const emailFromState = location.state?.email ?? "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: emailFromState },
  });

  const onSubmit = ({ email, code, newPassword }) =>
    reset.mutate(
      { email, code, newPassword },
      {
        onSuccess: () => {
          toast.success("Password reset. Please sign in.");
          navigate("/login", { replace: true });
        },
      }
    );

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Enter the 6-digit code we emailed you, then choose a new password."
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
        <Input
          label="Reset code"
          inputMode="numeric"
          maxLength={6}
          placeholder="6-digit code"
          leftIcon={KeyRound}
          error={errors.code?.message}
          {...register("code")}
        />
        <Input
          label="New password"
          type="password"
          placeholder="At least 6 characters"
          leftIcon={Lock}
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter password"
          leftIcon={Lock}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={reset.isPending}
        >
          Reset password
        </Button>
      </form>
      <div className="mt-6 flex items-center justify-between text-sm">
        <Link
          to="/login"
          className="flex items-center gap-2 font-medium text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
        <Link
          to="/forgot-password"
          className="font-medium text-brand hover:underline"
        >
          Resend code
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
