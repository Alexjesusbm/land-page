import { FeatureSection } from "@/components/feature-section";
import { getAllPosts } from "@/lib/md-utils";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export default async function Home() {
  const recentPosts = (await getAllPosts()).slice(0, 3);

  return (
    <div className="flex flex-col gap-4 px-1 bg-black text-white">
      <FeatureSection />
      <div className="flex flex-col items-center justify-center gap-4 bg-neutral-900 rounded-xl shadow-lg p-6 border border-neutral-800">
        <h1 className="text-3xl font-bold text-center">
          Sua loja de afiliados, simples, do jeito que deveria ser
        </h1>
        <p className="text-lg text-center">
          Crie sua loja de afiliados em minutos e comece a vender hoje mesmo!
        </p>
      </div>
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-neutral-900 rounded-xl shadow p-8 border border-neutral-800">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Posts Recentes
          </h2>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="flex gap-6 items-start bg-neutral-800 rounded-lg p-4 hover:shadow-lg transition border border-neutral-700">
                  <div className="relative aspect-[16/9] w-48 rounded-lg overflow-hidden shrink-0 bg-neutral-700">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <time className="text-sm mb-2 block text-gray-300">
                      {formatDate(post.date)}
                    </time>
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-gray-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center gap-4 bg-neutral-900 rounded-xl shadow p-6 border border-neutral-800">
        <h2 className="text-2xl font-semibold">Recursos</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>Fácil de usar</li>
          <li>Integração com as principais plataformas de afiliados</li>
          <li>Suporte dedicado</li>
        </ul>
      </div>
    </div>
  );
}
