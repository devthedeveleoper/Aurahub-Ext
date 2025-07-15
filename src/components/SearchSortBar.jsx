import React from 'react';

export default function SearchSortBar({ search, setSearch, sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search videos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        <option value="">Sort By</option>
        <option value="name">Name ↑</option>
        <option value="-name">Name ↓</option>
        <option value="date">Date ↓</option>
        <option value="-date">Date ↑</option>
        <option value="size">Size ↑</option>
        <option value="-size">Size ↓</option>
      </select>
    </div>
  );
}
