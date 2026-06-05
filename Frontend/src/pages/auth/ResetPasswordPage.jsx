import { useNavigate, useParams, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Lock, ArrowLeft } from "lucide-react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { resetPasswordSchema } from "../../utils/validation";
import { useResetPassword } from "../../hooks/useAuth";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const reset = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = ({ newPassword }) =>
    reset.mutate(
      { token, newPassword },
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
      subtitle="Choose a strong password you'll remember."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <Link
        to="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
