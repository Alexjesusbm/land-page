import { getAllPosts } from "@/lib/md-utils";
import { Header } from "@/components/header";
import BlogClient from "./blog-client";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <BlogClient posts={posts} />
    </div>
  );
}
