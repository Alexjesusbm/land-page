import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { PostData } from './types'; // Certifique-se que a interface está em src/lib/types.ts

const contentDirectory = path.join(process.cwd(), 'src/content/recursos_educacionais');

function getSlugFromFileName(fileName: string): string {
  return fileName.replace(/\.md$/, '');
}

/**
 * Busca e processa um post markdown pelo slug.
 * Retorna null se campos obrigatórios estiverem ausentes.
 */
export async function getMarkdownContent(slug: string): Promise<PostData | null> {
  console.log(`[markdownUtils] Attempting to get content for slug: ${slug}`);
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  console.log(`[markdownUtils] Full path for slug ${slug}: ${fullPath}`);

  try {
    if (!fs.existsSync(fullPath)) {
      console.error(`[markdownUtils] ERROR: Markdown file not found for slug ${slug} at path: ${fullPath}`);
      return null;
    }
    console.log(`[markdownUtils] File found for slug ${slug}. Reading content...`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const { title, date, description, image } = matterResult.data;
    // Validação dos campos obrigatórios
    if (!title || !date || !description || !image) {
      console.warn(`[markdownUtils] WARN: Post "${slug}" is missing required frontmatter fields (title, date, description, image).`);
      return null;
    }

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Monta o objeto PostData, garantindo que campos essenciais não sejam sobrescritos
    const result: PostData = {
      slug,
      contentHtml,
      title: String(title),
      date: String(date), // Para ordenação, converta para Date em getAllPosts
      description: String(description),
      image: String(image),
      // Espalha outros campos do frontmatter, sem sobrescrever os essenciais
      ...(Object.fromEntries(
        Object.entries(matterResult.data).filter(
          ([key]) => !['slug', 'contentHtml', 'title', 'date', 'description', 'image'].includes(key)
        )
      )),
    };
    console.log(`[markdownUtils] Successfully processed markdown for slug ${slug}.`);
    return result;

  } catch (error) {
    console.error(`[markdownUtils] CRITICAL ERROR reading or processing markdown file for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Busca todos os posts válidos do diretório de conteúdo.
 * Retorna um array ordenado por data decrescente (mais recentes primeiro).
 */
export async function getAllPosts(): Promise<PostData[]> {
  try {
    const fileNames = fs.readdirSync(contentDirectory);
    const posts: PostData[] = [];

    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;
      const slug = getSlugFromFileName(fileName);
      const post = await getMarkdownContent(slug);
      if (post) posts.push(post);
    }

    // Ordena por data decrescente (mais recentes primeiro)
    posts.sort((a, b) => {
      // Converte para Date para garantir ordenação correta
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    console.log(`[markdownUtils] getAllPosts: ${posts.length} posts encontrados e ordenados.`);
    return posts;
  } catch (error) {
    console.error(`[markdownUtils] CRITICAL ERROR reading posts directory:`, error);
    return [];
  }
}