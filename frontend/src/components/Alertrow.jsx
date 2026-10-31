export default function AlertRow({ label, count, items, color, onSelect }) {
  if (count === 0) return null;

  const styles = {
    red: {
      box: "bg-red-50 border-red-200 text-red-700",
      btn: "bg-red-600 hover:bg-red-700 text-white",
    },
    amber: {
      box: "bg-amber-50 border-amber-200 text-amber-800",
      btn: "bg-amber-500 hover:bg-amber-600 text-white",
    },
  }[color];

  const shown = items.slice(0, 4);
  const extra = count - shown.length;
  const chip = "text-xs px-2.5 py-1 rounded-full bg-white/70";

  return (
    <div className={`border rounded-xl px-4 py-3 ${styles.box}`}>
      <button
        onClick={onSelect}
        className={`font-medium px-4 py-1.5 rounded-lg shadow-sm hover:shadow-md active:scale-95 transition cursor-pointer ${styles.btn}`}
      >
        {label} ({count})
      </button>
      <div className="flex flex-wrap gap-2 mt-3">
        {shown.map((name, i) => (
          <span key={i} className={chip}>{name || "Unnamed"}</span>
        ))}
        {extra > 0 && <span className={chip}>+{extra} more</span>}
      </div>
    </div>
  );
}