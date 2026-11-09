import { Search } from "lucide-react";

interface Props {
  valor: string;
  onCambiar: (valor: string) => void;
}

export function Buscador({ valor, onCambiar }: Props) {
  return (
    <div className="relative w-full sm:max-w-md">
      <Search
        aria-hidden="true"
        size={19}
        className="absolute top-3.5 left-3.5 text-outline"
      />
      <input
        type="search"
        aria-label="Buscar cursos por nombre o código"
        placeholder="Buscar por nombre o código..."
        value={valor}
        onChange={(event) => onCambiar(event.target.value)}
        className="min-h-12 w-full rounded-lg border border-outline-variant bg-white py-3 pr-4 pl-11 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
      />
    </div>
  );
}
