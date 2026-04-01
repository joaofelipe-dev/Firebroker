import styles from "./Footer.module.css";
import Link from "next/link";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.brand}>
              <span className={styles.brandIcon}>🔥</span>
              <span className={styles.brandName}>FireBroker</span>
            </div>
            <p className={styles.description}>
              O sistema Sentinel de inteligência ambiental. Transformando olhos
              atentos em ações decisivas para a preservação dos biomas
              brasileiros.
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.heading}>Recursos</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/" className={styles.link}>
                  Mapa Global
                </Link>
              </li>
              <li>
                <Link href="/" className={styles.link}>
                  Relatórios Anuais
                </Link>
              </li>
              <li>
                <Link href="/" className={styles.link}>
                  API para Governos
                </Link>
              </li>
              <li>
                <Link href="/" className={styles.link}>
                  Seja um Voluntário
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.heading}>Informações</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/" className={styles.link}>
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="/" className={styles.link}>
                  Acesso API
                </Link>
              </li>
              <li>
                <Link href="/" className={styles.link}>
                  Protocolos de Segurança
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.heading}>Estação Central</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/" className={styles.link}>
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/admin" className={styles.link}>
                  Admin Ledger
                </Link>
              </li>
              <li>
                <Link href="/" className={styles.link}>
                  Status do Sistema
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} FireBroker CORE. TODOS OS DIREITOS
            RESERVADOS.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/" className={styles.legalLink}>
              Privacidade
            </Link>
            <Link href="/" className={styles.legalLink}>
              Termos
            </Link>
            <Link href="/" className={styles.legalLink}>
              Sistemas Mínimos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
