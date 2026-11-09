interface Props {
  titulo: string;
  valor: number;
}

export function TarjetaEstadistica({ titulo, valor }: Props) {
  return (
    <div className="rounded-2xl border border-outline-variant/60 bg-white p-6 shadow-sm">
      <p className="text-sm text-on-surface-variant">{titulo}</p>
      <p className="mt-3 text-4xl font-semibold text-primary">{valor}</p>
    </div>
  );
}
