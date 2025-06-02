import { FeatureSection } from "@/components/feature-section";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 px-1">
      <HeroSection />
      <FeatureSection />
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-center">
          Sua loja de afiliados, simples, do jeito que deveria ser
        </h1>
        <p className="text-lg text-center">
          Crie sua loja de afiliados em minutos e comece a vender hoje mesmo!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Recursos</h2>
        <ul className="list-disc list-inside">
          <li>Fácil de usar</li>
          <li>Integração com as principais plataformas de afiliados</li>
          <li>Suporte dedicado</li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Comece agora!</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Criar meu post!
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Suporte</h2>
        <p className="text-lg">
          Se você tiver alguma dúvida, entre em contato conosco pelo e-mail{" "}
          <a
            href="mailto:joao@gmail.com"
            className="text-blue-500 hover:underline"
          >
            joao@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
