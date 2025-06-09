"use client";

import { useState, useEffect } from "react";
import { BaseSearch } from "@/components/search";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const normalizedQuery = query.toLowerCase();
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [query, posts]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="w-[50%] mx-auto">
        <BaseSearch query={query} setQuery={setQuery} />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-white">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="h-full flex flex-col rounded-lg overflow-hidden border border-neutral-800 transition-colors shadow-lg bg-neutral-900">
              <div className="relative aspect-[16/9]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex-1 p-6">
                <time className="text-sm mb-2 block text-gray-300">
                  {formatDate(post.date)}
                </time>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-gray-300 transition-colors text-white">
                  {post.title}
                </h2>
                <p className="line-clamp-2 text-gray-300">
                  {post.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}