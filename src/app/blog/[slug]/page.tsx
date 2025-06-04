import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPosts, getMarkdownContent } from "@/lib/md-utils";
import { formatDate } from "@/lib/utils";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getMarkdownContent(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <time className="text-muted-foreground">{formatDate(post.date)}</time>
          <h1 className="text-4xl font-bold text-foreground">{post.title}</h1>
        </div>

        {post.image && (
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </div>
        )}
        <div
          className="prose dark:prose-invert prose-primary max-w-none
            prose-headings:text-foreground
            prose-p:text-muted-foreground
            prose-strong:text-foreground
            prose-a:text-primary hover:prose-a:text-primary/80
            prose-code:text-muted-foreground
            prose-pre:bg-muted prose-pre:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </article>
  );
}
