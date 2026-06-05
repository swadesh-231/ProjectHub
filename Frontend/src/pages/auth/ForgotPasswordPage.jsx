import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { forgotPasswordSchema } from "../../utils/validation";
import { useForgotPassword } from "../../hooks/useAuth";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const forgot = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = ({ email }) =>
    forgot.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("We've emailed you a 6-digit reset code.");
          // Carry the email to the reset page so the user only types the code.
          navigate("/reset-password", { state: { email } });
        },
      }
    );

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a 6-digit reset code."
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
          Send reset code
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
