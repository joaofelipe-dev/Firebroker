import { Navigation } from "@/components/Navigation";

export const metadata = {
  title: "FireBroker",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-container-lowest)] lg:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <Navigation.Provider activeItem="dashboard">
        <Navigation.Sidebar>
          <div className="hidden lg:block p-4">
            <Navigation.Brand />
          </div>

          <div className="p-4 text-[0.75rem] font-semibold text-[var(--on-surface-variant)] uppercase tracking-[0.05em]">
            Operações
          </div>

          <Navigation.Menu orientation="vertical">
            <Navigation.Item id="dashboard" href="/admin">
              Dashboard
            </Navigation.Item>
            <Navigation.Item id="reports" href="/admin">
              Relatórios Ativos
            </Navigation.Item>
            <Navigation.Item id="map" href="/map">
              Visualização Mapa
            </Navigation.Item>
          </Navigation.Menu>

          <div className="mt-auto p-4 border-t border-[rgba(90,65,56,0.1)]">
            <Navigation.Action
              href="/"
              variant="ghost"
              className="w-full justify-start"
            >
              Voltar ao Front
            </Navigation.Action>
          </div>
        </Navigation.Sidebar>
      </Navigation.Provider>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1280px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
