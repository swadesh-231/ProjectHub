import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, AtSign, Mail, Lock, ArrowRight } from "lucide-react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { registerSchema } from "../../utils/validation";
import { useRegister } from "../../hooks/useAuth";

const RegisterPage = () => {
  const signup = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start organizing your team's work in minutes."
    >
      <form
        onSubmit={handleSubmit((values) => signup.mutate(values))}
        className="space-y-4"
      >
        <Input
          label="Full name"
          placeholder="Ada Lovelace"
          leftIcon={User}
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Input
          label="Username"
          placeholder="adalovelace"
          leftIcon={AtSign}
          autoComplete="username"
          error={errors.username?.message}
          {...register("username")}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          leftIcon={Mail}
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          leftIcon={Lock}
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={signup.isPending}
          rightIcon={ArrowRight}
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
