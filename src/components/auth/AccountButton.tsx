import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { LogIn, LogOut, User } from "lucide-react";

interface AccountButtonProps {
  variant?: "pill" | "icon";
}

export const AccountButton = ({ variant = "pill" }: AccountButtonProps) => {
  const { user, loading, isCloudEnabled, signOut } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (!isCloudEnabled || loading) return null;

  if (variant === "icon") {
    if (user) {
      return (
        <button
          onClick={() => void signOut()}
          title={`Conectado como ${user.email} - clique para sair`}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 hover:border-destructive/50 transition-colors"
        >
          <User className="w-4 h-4 text-primary" />
        </button>
      );
    }

    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          title="Entrar para salvar seu progresso na nuvem"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 border border-border hover:border-primary/50 transition-colors"
        >
          <LogIn className="w-4 h-4 text-foreground" />
        </button>
        <AuthModal open={modalOpen} onOpenChange={setModalOpen} />
      </>
    );
  }

  if (user) {
    return (
      <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground">
        <User className="w-3.5 h-3.5 text-primary" />
        <span className="max-w-[10rem] truncate">{user.email}</span>
        <button
          onClick={() => void signOut()}
          className="flex items-center gap-1 text-destructive hover:underline ml-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
      >
        <LogIn className="w-3.5 h-3.5" />
        Entrar para salvar na nuvem
      </button>
      <AuthModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};
