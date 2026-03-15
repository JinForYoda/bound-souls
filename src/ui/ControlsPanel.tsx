export function ControlsPanel() {
  return (
    <div className="panel-surface rounded-[2rem] p-5 shadow-panel">
      <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Controls</p>
      <p className="mt-3 text-sm leading-6 text-stone-200">
        Move with WASD or the arrow keys. Press R to restart the chamber.
      </p>
    </div>
  );
}
