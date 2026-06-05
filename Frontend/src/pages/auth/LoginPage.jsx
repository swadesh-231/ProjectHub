import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { loginSchema } from "../../utils/validation";
import { useLogin } from "../../hooks/useAuth";

const LoginPage = () => {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your workspace."
    >
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
