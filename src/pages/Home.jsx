import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoCard from '../components/VideoCard';
import SkeletonCard from '../components/SkeletonCard';
import AgeGate from '../components/AgeGate';
import SearchSortBar from '../components/SearchSortBar';

const PAGE_SIZE = 6;
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const [allVideos, setAllVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [ageConfirmed, setAgeConfirmed] = useState(localStorage.getItem('is18plus') === 'true');

  // Back to top button
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sorting logic
  const sortVideos = (videos) => {
    const shuffled = [...videos].sort(() => 0.5 - Math.random()); // Randomize
    if (sort === 'name') return shuffled.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === '-name') return shuffled.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'date') return shuffled.sort((a, b) => new Date(b.created) - new Date(a.created));
    if (sort === '-date') return shuffled.sort((a, b) => new Date(a.created) - new Date(b.created));
    if (sort === 'size') return shuffled.sort((a, b) => a.size - b.size);
    if (sort === '-size') return shuffled.sort((a, b) => b.size - a.size);
    return shuffled;
  };

  // Initial load with caching
  useEffect(() => {
    const cached = localStorage.getItem('video_cache');
    const lastUpdated = localStorage.getItem('video_cache_time');
    const shouldRefresh = !cached || !lastUpdated || Date.now() - lastUpdated > 60000;

    if (shouldRefresh) {
      fetch(`${BASE_API_URL}/api/files`)
        .then((res) => res.json())
        .then((data) => {
          const files = data.result?.files || [];
          localStorage.setItem('video_cache', JSON.stringify(files));
          localStorage.setItem('video_cache_time', Date.now().toString());
          setAllVideos(files);
        })
        .catch(() => console.error('Failed to load videos'))
        .finally(() => setLoading(false));
    } else {
      const files = JSON.parse(cached);
      setAllVideos(files);
      setLoading(false);
    }
  }, []);

  // Filtered + sorted + initial page
  useEffect(() => {
    const filtered = allVideos.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = sortVideos(filtered);
    setDisplayedVideos(sorted.slice(0, PAGE_SIZE));
    setPage(1);
    setHasMore(sorted.length > PAGE_SIZE);
  }, [allVideos, search, sort]);

  const fetchMoreVideos = () => {
    const filtered = allVideos.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = sortVideos(filtered);
    const nextPage = page + 1;
    const newVideos = sorted.slice(0, nextPage * PAGE_SIZE);
    setDisplayedVideos(newVideos);
    setPage(nextPage);
    setHasMore(newVideos.length < sorted.length);
  };

  if (!ageConfirmed) {
    return <AgeGate onConfirm={() => setAgeConfirmed(true)} />;
  }

  return (
    <div className="p-4 dark:bg-black min-h-screen transition-colors duration-300">
      <SearchSortBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
      <InfiniteScroll
        dataLength={displayedVideos.length}
        next={fetchMoreVideos}
        hasMore={hasMore}
        loader={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        }
        scrollThreshold={0.9}
        endMessage={
          <p className="text-center text-gray-400 mt-4">🎉 No more videos</p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVideos.map((video) => (
            <VideoCard key={video.linkid} video={video} />
          ))}
        </div>
      </InfiniteScroll>

      {/* Fallback Load More button */}
      {!hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={fetchMoreVideos}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-3 py-2 rounded-full shadow hover:bg-blue-700 transition"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}
