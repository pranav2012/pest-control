'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import BlogCard from '@/components/BlogCard';

interface Blog {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  author: string;
}

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Simulated blog data
  const blogs: Blog[] = [
    {
      id: 1,
      title: "How to treat Fungal infected Walls and Wood",
      image: "/images/blogs/fungal-infected-wall.png",
      summary: "Learn about effective treatments for fungal infections in walls and wood, including identification, prevention, and professional solutions.",
      date: "2024-03-20",
      author: "Pest Control Expert"
    }
  ];

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'popular', label: 'Most popular' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative bg-[#075e54] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Our <span className="text-[#25D366]">Blog</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Discover insightful articles, tutorials, and stories from our
              community of writers and experts.
            </p>

            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#075e54]" />
              <Input
                type="text"
                placeholder="Search posts by title, content, or tags..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 py-6 bg-white border-[#25D366] text-[#075e54] focus-visible:ring-[#25D366] placeholder:text-[#075e54]/60"
              />
            </div>
          </motion.div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            className="absolute bottom-0 w-full h-full"
          >
            <path
              fill="white"
              d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Filters and Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#075e54]">
              Sort by:
            </span>
            <div className="relative">
              <button
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className="flex items-center gap-1 px-3 py-1.5 border border-[#075e54] rounded-md bg-white text-sm text-[#075e54] hover:bg-[#e7f5e8] transition-colors"
              >
                {sortBy === 'newest'
                  ? 'Newest'
                  : sortBy === 'oldest'
                    ? 'Oldest'
                    : 'Popular'}
                <ChevronDown className="h-4 w-4" />
              </button>
              {isSortMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-[#075e54] rounded-md shadow-lg z-10">
                  {sortOptions.map(option => (
                    <label
                      key={option.value}
                      className="flex items-center px-4 py-2 text-sm text-[#075e54] hover:bg-[#e7f5e8] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="sortBy"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={() => {
                          setSortBy(option.value);
                          setIsSortMenuOpen(false);
                        }}
                        className="mr-2 h-4 w-4 text-[#25D366] focus:ring-[#25D366]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Posts grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-[#075e54]/20 bg-white shadow-lg"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <Skeleton className="h-4 w-1/3 mb-3" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-red-500 text-lg mb-4">
              Error loading posts: {error.message}
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="border-[#075e54] text-[#075e54] hover:bg-[#e7f5e8]"
            >
              Try again
            </Button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-[#075e54] mb-2">
              No posts found
            </h2>
            <p className="text-[#075e54]/70 mb-6 text-center">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : 'No posts available at the moment'}
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setDebouncedQuery('');
                }}
                className="border-[#075e54] text-[#075e54] hover:bg-[#e7f5e8]"
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {blogs.map((blog: Blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogCard {...blog} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
} 