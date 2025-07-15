export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
}
