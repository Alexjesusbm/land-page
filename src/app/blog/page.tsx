import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/md-utils";
import { formatDate } from "@/lib/utils";
import { Header } from "@/components/header";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="h-full flex flex-col bg-card rounded-lg overflow-hidden border border-border transition-colors hover:border-primary">
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
                  <time className="text-sm text-muted-foreground mb-2 block">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
