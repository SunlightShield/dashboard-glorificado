import type { HeaderProps } from "../../types/HeaderTypes";

function Header({ name, role, countdown, onRefresh, onLogout }: HeaderProps) {
  const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
  const seconds = String(countdown % 60).padStart(2, "0");

  return (
    <header className="w-full bg-zinc-900 border-b border-zinc-800 px-4 py-4 md:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col">
        <span className="text-white font-semibold text-sm">{name}</span>
        <span className="text-amber-500 text-xs font-mono tracking-widest uppercase">
          {role}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex flex-col sm:items-end gap-1">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
            Próximo refresco
          </span>
          <span className="text-amber-400 font-mono text-lg">
            {minutes}:{seconds}
          </span>
        </div>

        <div className="flex gap-2 mr-2">
          <button
            onClick={onRefresh}
            className="flex-1 sm:flex-none bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            ↺ Refrescar
          </button>
          <button
            onClick={onLogout}
            className="flex-1 sm:flex-none bg-zinc-800 hover:bg-red-500/10 border border-zinc-700 hover:border-red-500/50 text-zinc-400 hover:text-red-400 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            ✕ Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
