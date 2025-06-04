import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  id: string;
  sender: "user" | "assistant";
  text: string;
};

// Exemplo de base de conhecimento local (pode ser substituído por busca em banco, API, etc)
const knowledgeBase = [
  {
    title: "Sobre a plataforma",
    content:
      "Nossa plataforma permite criar lojas de afiliados de forma simples e rápida. Você pode integrar produtos de diversas plataformas e personalizar sua loja facilmente.",
  },
  {
    title: "Integração",
    content:
      "Oferecemos integração com Hotmart, Monetizze, Eduzz e outras plataformas populares de afiliados.",
  },
  {
    title: "Suporte",
    content:
      "Nosso suporte está disponível por e-mail (joao@gmail.com) para ajudar em qualquer dúvida ou problema.",
  },
  {
    title: "Recursos",
    content:
      "Você pode acompanhar vendas, personalizar o layout, adicionar domínios próprios e acessar relatórios detalhados.",
  },
];

// Função simples para buscar trechos relevantes (pode ser substituída por busca vetorial)
function retrieveRelevantDocs(question: string, topK = 2) {
  // Busca por palavras-chave simples
  const q = question.toLowerCase();
  return knowledgeBase
    .filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        doc.content.toLowerCase().includes(q)
    )
    .slice(0, topK)
    .map((doc) => `${doc.title}: ${doc.content}`)
    .join("\n");
}

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { reply: "API key não configurada." },
      { status: 500 }
    );
  }

  // Recupera contexto relevante
  const retrievedContext = retrieveRelevantDocs(message);

  const messages = [
    {
      role: "system",
      content:
        "Você é um assistente virtual da plataforma de lojas de afiliados. Use o contexto fornecido para responder de forma clara, amigável e ajude o usuário com dúvidas sobre criação de lojas, recursos, integração e suporte. Se não souber, oriente o usuário a buscar suporte pelo e-mail joao@gmail.com.",
    },
    ...(retrievedContext
      ? [
          {
              role: "system",
              content: `Contexto relevante do negócio:\n${retrievedContext}`,
          },
        ]
      : []),
    ...((history as ChatMessage[]) || []).map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    })),
    { role: "user", content: message },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 256,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content?.trim() || "Desculpe, não entendi.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Erro ao conectar ao LLM." },
      { status: 500 }
    );
  }
}