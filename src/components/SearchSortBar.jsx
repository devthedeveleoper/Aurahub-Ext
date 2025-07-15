export default function SearchSortBar({ search, setSearch, sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
      <input
        className="border p-2 rounded w-full sm:w-1/2"
        placeholder="Search videos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="border p-2 rounded"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="name">Name (A-Z)</option>
        <option value="-name">Name (Z-A)</option>
        <option value="date">Newest</option>
        <option value="-date">Oldest</option>
        <option value="size">Size (Asc)</option>
        <option value="-size">Size (Desc)</option>
      </select>
    </div>
  );
}
