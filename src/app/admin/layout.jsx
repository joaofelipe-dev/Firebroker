import { Navigation } from "@/components/Navigation";
import styles from "./Admin.module.css";

export const metadata = {
  title: "Sentinel Admin | FireBroker",
};

export default function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>
      {/* SIDEBAR NAVIGATION */}
      <Navigation.Provider activeItem="dashboard">
        <Navigation.Sidebar>
          <Navigation.Brand />

          <div
            style={{
              padding: "var(--space-4)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--on-surface-variant)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Operações
          </div>

          <Navigation.Menu>
            <Navigation.Item id="dashboard" href="/admin" icon="📊">
              Dashboard
            </Navigation.Item>
            <Navigation.Item id="reports" href="/admin" icon="🔥">
              Relatórios Ativos
            </Navigation.Item>
            <Navigation.Item id="map" href="/" icon="🗺️">
              Visão Tática
            </Navigation.Item>
            <Navigation.Item id="users" href="/" icon="👥">
              Agentes
            </Navigation.Item>
          </Navigation.Menu>

          <div
            style={{
              marginTop: "auto",
              padding: "var(--space-4)",
              borderTop: "1px solid rgba(90,65,56,0.1)",
            }}
          >
            <Navigation.Action
              href="/"
              variant="ghost"
              style={{ width: "100%", justifyContent: "flex-start" }}
            >
              ⬅ Voltar ao Front
            </Navigation.Action>
          </div>
        </Navigation.Sidebar>
      </Navigation.Provider>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: "var(--space-8)", overflowY: "auto" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>{children}</div>
      </main>
    </div>
  );
}
