import "./globals.css";

export const metadata = {
  title: "FireBroker | Protegendo o que Importa",
  description:
    "Sistema inteligente de monitoramento e denúncia de incêndios florestais. Transformando olhos atentos em ações decisivas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
