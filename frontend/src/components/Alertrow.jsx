export default function AlertRow({ label, count, items, color, filterKey, onSelect }) {
  if (count === 0) return null;

  const styles = {
    red: "bg-red-50 border-red-200 text-red-700",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
  };

  const shown = items.slice(0, 4);
  const extra = count - shown.length;

  return (
    <div className={`flex flex-wrap items-center gap-2 border rounded-lg px-4 py-3 ${styles[color]}`}>
      <span className="font-medium">{label} ({count})</span>
      {shown.map((name) => (
        <span key={name} className="text-xs px-2 py-1 rounded-full bg-white/70 border border-current/20 cursor-pointer">
          {name}
        </span>
        
      ))}
      {extra > 0 && (
        <span className="text-xs px-2 py-1 rounded-full bg-white border border-current/20 cursor-pointer">
          +{extra} more
        </span>
      )}
    </div>
  );
}