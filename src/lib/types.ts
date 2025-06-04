// Em um arquivo, por exemplo, src/lib/types.ts ou similar

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  contentHtml: string;
  [key: string]: string | undefined; // Permite apenas valores string ou undefined para campos extras
}