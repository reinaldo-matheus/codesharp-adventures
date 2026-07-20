import { Link } from "react-router-dom";
import { ArrowLeftRight, Sword, ShieldCheck, Coffee, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export type TrailId = "csharp" | "qa" | "java";

interface TrailMeta {
  id: TrailId;
  path: string;
  name: string;
  description: string;
  icon: typeof Sword;
}

const TRAILS: TrailMeta[] = [
  { id: "csharp", path: "/", name: "Trilha C#", description: "Heracles, seu guia mágico", icon: Sword },
  { id: "qa", path: "/qa", name: "Trilha QA", description: "Égide, Guardiã da Qualidade", icon: ShieldCheck },
  { id: "java", path: "/java", name: "Trilha Java", description: "Duque, o Mestre Cafeeiro", icon: Coffee },
];

interface TrailSwitcherProps {
  current: TrailId;
  variant?: "pill" | "icon";
}

export const TrailSwitcher = ({ current, variant = "pill" }: TrailSwitcherProps) => {
  const trigger =
    variant === "icon" ? (
      <button
        title="Trocar de trilha"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 border border-border hover:border-primary/50 transition-colors"
      >
        <ArrowLeftRight className="w-4 h-4 text-foreground" />
      </button>
    ) : (
      <button className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
        <ArrowLeftRight className="w-3.5 h-3.5" />
        Trocar de trilha
      </button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        <DropdownMenuLabel>Trilhas disponíveis</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {TRAILS.map((trail) => {
          const Icon = trail.icon;
          const isCurrent = trail.id === current;
          return (
            <DropdownMenuItem key={trail.id} asChild disabled={isCurrent} className="cursor-pointer">
              <Link to={trail.path} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{trail.name}</p>
                  <p className="text-xs text-muted-foreground">{trail.description}</p>
                </div>
                {isCurrent && <Check className="w-4 h-4 text-primary" />}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
