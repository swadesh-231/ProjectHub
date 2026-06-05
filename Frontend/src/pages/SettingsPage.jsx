import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Sun, Moon, BadgeCheck, ShieldAlert } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import { useThemeStore } from "../store/theme.store";
import { useChangePassword } from "../hooks/useAuth";
import { changePasswordSchema } from "../utils/validation";
import { PageHeader } from "../components/common/PageHeader";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Avatar } from "../components/common/Avatar";
import { Badge } from "../components/common/Badge";
import { cn } from "../utils/cn";

const THEME_CHOICES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

const SettingsPage = () => {
  const user = useAuthStore((s) => s.user);
  const { theme, setTheme } = useThemeStore();
  const changePassword = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(changePasswordSchema) });

  const onSubmit = ({ oldPassword, newPassword }) =>
    changePassword.mutate(
      { oldPassword, newPassword },
      { onSuccess: () => reset() }
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, security and appearance."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Profile */}
        <Card className="p-6 lg:col-span-1">
          <h3 className="font-display text-base font-semibold text-foreground">
            Profile
          </h3>
          <div className="mt-5 flex flex-col items-center text-center">
            <Avatar
              name={user?.fullName || user?.username}
              src={user?.avatar?.url}
              size="lg"
              className="h-20 w-20 text-2xl"
            />
            <p className="mt-4 font-display text-lg font-semibold text-foreground">
              {user?.fullName || user?.username}
            </p>
            <p className="text-sm text-muted">@{user?.username}</p>
            <p className="mt-1 text-sm text-muted">{user?.email}</p>
            <div className="mt-3">
              {user?.isEmailVerified ? (
                <Badge tone="success" dot>
                  <BadgeCheck className="h-3.5 w-3.5" /> Email verified
                </Badge>
              ) : (
                <Badge tone="warning" dot>
                  <ShieldAlert className="h-3.5 w-3.5" /> Not verified
                </Badge>
              )}
            </div>
          </div>
        </Card>

        <div className="space-y-5 lg:col-span-2">
          {/* Appearance */}
          <Card className="p-6">
            <h3 className="font-display text-base font-semibold text-foreground">
              Appearance
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              Choose how Project Camp looks to you.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-md">
              {THEME_CHOICES.map((choice) => {
                const Icon = choice.icon;
                const active = theme === choice.value;
                return (
                  <button
                    key={choice.value}
                    onClick={() => setTheme(choice.value)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all",
                      active
                        ? "border-brand bg-brand-soft"
                        : "border-border-strong hover:border-faint"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-lg",
                        active ? "bg-brand text-white" : "bg-canvas text-muted"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {choice.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6">
            <h3 className="font-display text-base font-semibold text-foreground">
              Change password
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              Use a strong password you don't reuse elsewhere.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-4 sm:max-w-md"
            >
              <Input
                label="Current password"
                type="password"
                leftIcon={Lock}
                error={errors.oldPassword?.message}
                {...register("oldPassword")}
              />
              <Input
                label="New password"
                type="password"
                leftIcon={Lock}
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />
              <Input
                label="Confirm new password"
                type="password"
                leftIcon={Lock}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
              <Button type="submit" isLoading={changePassword.isPending}>
                Update password
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
