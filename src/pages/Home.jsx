import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [ageConfirmed, setAgeConfirmed] = useState(
    localStorage.getItem('is18plus') === 'true'
  );

  const loader = useRef(null);

  // Sort logic
  const sortVideos = useCallback(
    (videos) => {
      const sorted = [...videos];
      if (sort === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === '-name') {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sort === 'date') {
        sorted.sort((a, b) => new Date(b.created) - new Date(a.created));
      } else if (sort === '-date') {
        sorted.sort((a, b) => new Date(a.created) - new Date(b.created));
      } else if (sort === 'size') {
        sorted.sort((a, b) => a.size - b.size);
      } else if (sort === '-size') {
        sorted.sort((a, b) => b.size - a.size);
      }
      return sorted;
    },
    [sort]
  );

  // Initial fetch with caching
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

  // Apply search and sort whenever data or filter changes
  useEffect(() => {
    const filtered = allVideos.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = sortVideos(filtered);
    setDisplayedVideos(sorted.slice(0, PAGE_SIZE));
    setPage(1);
  }, [search, sort, allVideos, sortVideos]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const filtered = allVideos.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = sortVideos(filtered);
    const nextVideos = sorted.slice(0, nextPage * PAGE_SIZE);
    setDisplayedVideos(nextVideos);
    setPage(nextPage);
  }, [page, allVideos, search, sortVideos]);

  // Infinite Scroll
  useEffect(() => {
    if (!loader.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) loadMore();
    });
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loader, loadMore, loading]);

  if (!ageConfirmed) {
    return <AgeGate onConfirm={() => setAgeConfirmed(true)} />;
  }

  return (
    <div className="p-4">
      <SearchSortBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedVideos.map((video, index) => (
          <VideoCard
            key={video.linkid}
            video={video}
            refProp={index === displayedVideos.length - 1 ? loader : null}
          />
        ))}
        {loading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}
