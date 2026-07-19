import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, Loader2 } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Mode = "signin" | "signup";

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError(null);
    setInfo(null);
  };

  const handleModeSwitch = (nextMode: Mode) => {
    setMode(nextMode);
    setError(null);
    setInfo(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const result = mode === "signin" ? await signIn(email, password) : await signUp(email, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (mode === "signup" && result.needsEmailConfirmation) {
      setInfo("Conta criada! Verifique seu e-mail para confirmar antes de entrar.");
      return;
    }

    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) resetForm();
        onOpenChange(next);
      }}
    >
      <DialogContent className="bg-card border-primary/30 sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <DialogTitle className="font-display">
              {mode === "signin" ? "Entrar" : "Criar conta"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {mode === "signin"
              ? "Entre para sincronizar seu progresso entre dispositivos."
              : "Crie uma conta para levar seu progresso para qualquer dispositivo."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block" htmlFor="auth-email">
              E-mail
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="voce@exemplo.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block" htmlFor="auth-password">
              Senha
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Mínimo 6 caracteres"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm text-success bg-success/10 border border-success/30 rounded-lg px-3 py-2">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-rpg-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{mode === "signin" ? "Entrar" : "Criar conta"}</span>
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <>
              Ainda não tem conta?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("signup")}
                className="text-primary font-medium hover:underline"
              >
                Criar conta
              </button>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("signin")}
                className="text-primary font-medium hover:underline"
              >
                Entrar
              </button>
            </>
          )}
        </p>
      </DialogContent>
    </Dialog>
  );
};
