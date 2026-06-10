import { useState, useEffect } from 'react'
import '../styles/Intranet.scss'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHOKAN NO KISHI — INTRANET (KISHI-NET v1.04)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Niveaux de clearance débloqués via CMD :
//   auth NIVEAU-1 ECHO77       -> Clearance 1 (rapports internes)
//   auth NIVEAU-2 KISHI-OMEGA  -> Clearance 2 (dossiers sensibles)
//   auth NIVEAU-3 KOGA-VEIL    -> Clearance 3 (top secret / Ryohei)

const TASKS = [
  { id: 1, title: 'Surveillance du parcours Shibuya-Nord', priority: 'HAUTE', deadline: '2026-05-12', status: 'EN COURS', assigned: 'Cmdt. Hoshino' },
  { id: 2, title: 'Rapport sur la course de la Tour-3', priority: 'MOYENNE', deadline: '2026-05-08', status: 'À RENDRE', assigned: 'Section 7' },
  { id: 3, title: 'Entretien terrain avec Aoi Kanzaki', priority: 'BASSE', deadline: '2026-05-15', status: 'PLANIFIÉE', assigned: 'Auto-assigné' },
  { id: 4, title: 'Analyse vidéo : silhouettes aux yeux ambrés', priority: 'CRITIQUE', deadline: '2026-05-05', status: 'EN RETARD', assigned: 'Cmdt. Hoshino' },
  { id: 5, title: 'Mise à jour du registre Shokan personnel', priority: 'BASSE', deadline: '2026-05-20', status: 'COMPLÉTÉE', assigned: 'Auto' },
  { id: 6, title: 'Localiser dernier signal de R. Nishikawa', priority: 'CRITIQUE', deadline: '???', status: 'BLOQUÉE', assigned: 'Confidentiel' },
]

const REPORTS = [
  {
    id: 'r001',
    code: 'SHK-2026-041',
    classification: 'USAGE INTERNE',
    title: 'Course du 27 mars — Parcours Ueno → Asakusa',
    author: 'Chev. K. Igarashi',
    date: '28/03/2026',
    body: `OBJECTIF : Observation de l'équipe rivale "Tenku Striders" durant la course officielle TSL n°41.

OBSERVATIONS :
- Kazuki Kurogane a utilisé son Shokan ("Pas du Fauve") 4 fois en moins de 90 secondes. Surcharge anormale.
- Une silhouette en hauteur, immobile, secteur K-7. Yeux ambrés. N'a bougé qu'au passage de Mei Sakurai (rang D).
- Mei Sakurai n'est pas revenue au point d'arrivée. Aucun signalement officiel à ce jour.

CONCLUSION :
Le schéma identifié par R. Nishikawa se confirme. Recommande l'ouverture d'un dossier de surveillance prolongée.

— K. Igarashi, Chevalier de rang E
   Section 7 — Tokyo`,
  },
  {
    id: 'r002',
    code: 'SHK-2026-042',
    classification: 'CONFIDENTIEL',
    title: 'Incident de la Tour-3 — Analyse post-course',
    author: 'Chev. K. Igarashi',
    date: '12/04/2026',
    body: `INCIDENT : Chute non létale de l'opérateur Hidemichi Oyama (Bolts).

CONTEXTE :
- Saut prévu : 4m. Réalisé : 6,2m (mesure caméra Sect-3).
- Trace énergétique inhabituelle relevée à 30cm sous la ligne de chute (signature non répertoriée).
- Aucun adversaire visible n'a déclenché de Shokan offensif.

HYPOTHÈSE :
Shokan tiers à distance. Profil compatible avec l'inconnu désigné "AMBRE-01".

ACTION REQUISE :
Demande d'élévation de clearance pour accès au journal complet.`,
  },
  {
    id: 'r003',
    code: 'SHK-2026-043',
    classification: 'TOP SECRET',
    title: '[ACCÈS RESTREINT — NIVEAU 3 REQUIS]',
    author: '???',
    date: '??/??/2026',
    body: null,
    locked: 3,
  },
]


const PERSONNEL = [
  {
    id: 'kiba',
    name: 'IGARASHI, Kiba',
    rank: 'Chevalier rang E',
    clan: 'Magaishi (branche Igarashi)',
    age: '21',
    team: 'Bunkyo City Bolts',
    shokan: 'Écho Rémanent — Manifestation spectrale d\'une main fantôme prolongeant ses propres mouvements.',
    status: 'ACTIF',
    notes: 'Sujet stable. Discrétion notable. À surveiller pour escalade éventuelle.',
  },
  {
    id: 'kazuki',
    name: 'KUROGANE, Kazuki',
    rank: 'Chevalier rang C',
    clan: 'Indépendant',
    age: '21',
    team: 'Tenku Striders',
    shokan: 'Pas du Fauve — Brève accélération musculaire couplée à une perception réflexe accrue.',
    status: 'SOUS SURVEILLANCE',
    notes: 'Comportement irrégulier depuis fév. 2026. Contacts confirmés avec individus non identifiés (cf. AMBRE-01).',
  },
  {
    id: 'aoi',
    name: 'KANZAKI, Aoi',
    rank: 'Chevalier rang D',
    clan: 'Aucun',
    age: '21',
    team: 'Bunkyo City Bolts',
    shokan: 'Lecture des Trajectoires — Capacité analytique permettant de prévoir 1,5s à l\'avance les mouvements observés.',
    status: 'ACTIF',
    notes: 'Asset stratégique. Loyauté envers Igarashi totale.',
  },
  {
    id: 'ryohei',
    name: 'NISHIKAWA, Ryohei',
    rank: '[ANCIEN] rang ???',
    clan: 'Aucun',
    age: '21',
    team: '[DISSOUTE]',
    shokan: '[DONNÉES SCELLÉES]',
    status: 'DISPARU',
    notes: 'Dernier message daté du 14/02/2026. Aucun signal depuis. Dossier complet — clearance NIVEAU 3.',
    locked: 3,
  },
  {
    id: 'hidemichi',
    name: 'OYAMA, Hidemichi',
    rank: 'Chevalier rang D',
    clan: 'Aucun',
    age: '20',
    team: 'Bunkyo City Bolts',
    shokan: 'Ancrage — Multiplie temporairement sa masse apparente, le rendant immobile par la force.',
    status: 'ACTIF',
    notes: 'RAS.',
  },
  {
    id: 'daigo',
    name: 'KAWAMURA, Daigo',
    rank: 'Chevalier rang D',
    clan: 'Aucun',
    age: '21',
    team: 'Bunkyo City Bolts',
    shokan: 'Foulée Brève — Téléportation courte distance (<3m) le long d\'une ligne droite visible.',
    status: 'ACTIF',
    notes: 'Recommandé pour passage rang C en sept. 2026.',
  },
]

const LOGS = [
  '04/05/2026 02:14:09 — [SYS] Connexion Kishi-NET (poste KIBA-PC98)',
  '04/05/2026 02:14:11 — [AUTH] Session NIVEAU-1 expirée',
  '04/05/2026 02:14:42 — [APP] Ouverture module "Tâches"',
  '04/05/2026 02:15:01 — [APP] Ouverture module "Rapports"',
  '04/05/2026 02:15:30 — [WARN] Tentative d\'accès SHK-2026-043 — refusée (clearance insuffisante)',
  '04/05/2026 02:16:18 — [APP] Ouverture module "Messagerie"',
  '04/05/2026 02:16:45 — [WARN] Email non-traçable détecté (exp.: ???). Conservé.',
  '04/05/2026 02:17:02 — [APP] Ouverture module "Personnel"',
  '04/05/2026 02:18:11 — [SYS] Latence inhabituelle — pingback 1337ms',
  '03/05/2026 23:59:58 — [SYS] Ping entrant inconnu — origine masquée',
  '03/05/2026 23:59:58 — [SYS] Ping entrant inconnu — origine masquée',
  '03/05/2026 23:59:58 — [SYS] Ping entrant inconnu — origine masquée',
  '03/05/2026 23:47:12 — [APP] Réception email — A. Kanzaki',
  '03/05/2026 19:02:00 — [USR] Déconnexion volontaire',
  '03/05/2026 14:30:00 — [USR] Soumission rapport SHK-2026-042',
]

const TABS = [
  { id: 'tasks',     label: 'Tâches',       icon: 'https://win98icons.alexmeub.com/icons/png/certificate_checklist-0.png' },
  { id: 'reports',   label: 'Rapports',     icon: 'https://win98icons.alexmeub.com/icons/png/notepad_file-1.png' },
  { id: 'personnel', label: 'Personnel',    icon: 'https://win98icons.alexmeub.com/icons/png/users-1.png' },
  { id: 'logs',      label: 'Journaux',     icon: 'https://win98icons.alexmeub.com/icons/png/executable_script-0.png' },
  { id: 'secure',    label: 'Confidentiel', icon: 'https://win98icons.alexmeub.com/icons/png/key_padlock-1.png' },
]

const getClearance = () => {
  const n = parseInt(sessionStorage.getItem('kishi_clearance') || '0', 10)
  return isNaN(n) ? 0 : n
}

export default function Intranet() {
  const [tab, setTab] = useState('tasks')
  const [openReport, setOpenReport] = useState(null)
  const [openPerson, setOpenPerson] = useState(null)
  const [clearance, setClearance] = useState(getClearance())

  // Re-check clearance every 1s (synchronise après CMD auth)
  useEffect(() => {
    const i = setInterval(() => setClearance(getClearance()), 1000)
    return () => clearInterval(i)
  }, [])

  const priColor = (p) => ({
    'CRITIQUE': '#c00',
    'HAUTE': '#d2691e',
    'MOYENNE': '#7a6f00',
    'BASSE': '#3a6e3a',
  }[p] || '#333')

  const statusColor = (s) => ({
    'EN COURS': '#06408b',
    'À RENDRE': '#a05a00',
    'EN RETARD': '#b00',
    'PLANIFIÉE': '#555',
    'COMPLÉTÉE': '#2c7a2c',
    'BLOQUÉE': '#888',
  }[s] || '#333')

  return (
    <div className="intranet" data-testid="intranet-window">
      {/* Header officiel */}
      <div className="intranet__header">
        <div className="intranet__crest"></div>
        <div className="intranet__title">
          <div className="intranet__org">ORDRE DES SHOKAN NO KISHI</div>
          <div className="intranet__sub">Intranet KISHI-NET v1.04 — Section 7, Tokyo</div>
        </div>
        <div className={`intranet__clearance lvl-${clearance}`}>
          CLEARANCE : NIVEAU {clearance}
        </div>
      </div>

      {/* Onglets */}
      <div className="intranet__tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`intranet__tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
            data-testid={`intranet-tab-${t.id}`}
          >
            <img src={t.icon} alt="" className="intranet__tab-icon" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="intranet__body">
        {/* ─── TÂCHES ─── */}
        {tab === 'tasks' && (
          <table className="intranet__table">
            <thead>
              <tr>
                <th>#</th><th>Tâche</th><th>Priorité</th><th>Échéance</th><th>Statut</th><th>Assigné par</th>
              </tr>
            </thead>
            <tbody>
              {TASKS.map(t => (
                <tr key={t.id}>
                  <td>{String(t.id).padStart(3, '0')}</td>
                  <td>{t.title}</td>
                  <td><span className="intranet__pill" style={{ background: priColor(t.priority) }}>{t.priority}</span></td>
                  <td>{t.deadline}</td>
                  <td><span className="intranet__pill" style={{ background: statusColor(t.status) }}>{t.status}</span></td>
                  <td>{t.assigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ─── RAPPORTS ─── */}
        {tab === 'reports' && !openReport && (
          <ul className="intranet__list">
            {REPORTS.map(r => {
              const locked = r.locked && clearance < r.locked
              return (
                <li key={r.id} className="intranet__listitem" onClick={() => !locked && setOpenReport(r)}>
                  <div className="intranet__listmain">
                    <div className="intranet__listcode">{r.code}</div>
                    <div className="intranet__listtitle">{locked ? '[ACCÈS RESTREINT]' : r.title}</div>
                    <div className="intranet__listmeta">{r.author} — {r.date}</div>
                  </div>
                  <div className={`intranet__stamp ${r.classification.toLowerCase().replace(/ /g, '-')}`}>
                    {locked ? `NIVEAU ${r.locked} REQUIS` : r.classification}
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {tab === 'reports' && openReport && (
          <div className="intranet__doc">
            <button className="intranet__back" onClick={() => setOpenReport(null)}>◄ Retour</button>
            <div className="intranet__doc-head">
              <div className="intranet__doc-org">⚔ ORDRE DES SHOKAN NO KISHI — RAPPORT OFFICIEL</div>
              <div className={`intranet__stamp ${openReport.classification.toLowerCase().replace(/ /g, '-')}`}>{openReport.classification}</div>
            </div>
            <div className="intranet__doc-meta">
              <div><b>Réf. :</b> {openReport.code}</div>
              <div><b>Auteur :</b> {openReport.author}</div>
              <div><b>Date :</b> {openReport.date}</div>
            </div>
            <h3 className="intranet__doc-title">{openReport.title}</h3>
            <pre className="intranet__doc-body">{openReport.body}</pre>
            <div className="intranet__doc-sign">
              ____________________<br />
              Signé : {openReport.author}<br />
              Section 7 — Tokyo
            </div>
          </div>
        )}

        {/* ─── PERSONNEL ─── */}
        {tab === 'personnel' && !openPerson && (
          <div className="intranet__cards">
            {PERSONNEL.map(p => {
              const locked = p.locked && clearance < p.locked
              return (
                <div key={p.id} className="intranet__card" onClick={() => !locked && setOpenPerson(p)}>
                  <div className="intranet__card-id">N° {p.id.toUpperCase()}</div>
                  <div className="intranet__card-name">{locked ? '████████████' : p.name}</div>
                  <div className="intranet__card-rank">{locked ? '[ACCÈS RESTREINT]' : p.rank}</div>
                  <div className={`intranet__card-status s-${p.status.toLowerCase().replace(/ /g, '-')}`}>{p.status}</div>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'personnel' && openPerson && (
          <div className="intranet__doc">
            <button className="intranet__back" onClick={() => setOpenPerson(null)}>◄ Retour fiches</button>
            <div className="intranet__doc-head">
              <div className="intranet__doc-org">🗂️ FICHE PERSONNEL — DOSSIER N° {openPerson.id.toUpperCase()}</div>
              <div className={`intranet__stamp classifié`}>USAGE INTERNE</div>
            </div>
            <table className="intranet__fiche">
              <tbody>
                <tr><th>Nom complet</th><td>{openPerson.name}</td></tr>
                <tr><th>Rang</th><td>{openPerson.rank}</td></tr>
                <tr><th>Clan</th><td>{openPerson.clan}</td></tr>
                <tr><th>Âge</th><td>{openPerson.age}</td></tr>
                <tr><th>Équipe</th><td>{openPerson.team}</td></tr>
                <tr><th>Shokan</th><td>{openPerson.shokan}</td></tr>
                <tr><th>Statut</th><td><b>{openPerson.status}</b></td></tr>
                <tr><th>Notes</th><td>{openPerson.notes}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ─── LOGS ─── */}
        {tab === 'logs' && (
          <div className="intranet__logs">
            {LOGS.map((l, i) => <div key={i} className="intranet__logline">{l}</div>)}
          </div>
        )}

        {/* ─── CONFIDENTIEL ─── */}
        {tab === 'secure' && (
          <div className="intranet__secure">
            <div className="intranet__secure-banner">
              ⚠ ZONE À ACCÈS RESTREINT — Clearance actuelle : <b>NIVEAU {clearance}</b>
            </div>

            <div className={`intranet__sealed${clearance >= 1 ? ' is-open' : ''}`}>
              <div className="intranet__sealed-head">📁 DOSSIER « ÉCHO » — Niveau 1</div>
              {clearance >= 1 ? (
                <pre>{`Suivi du Shokan "Écho Rémanent" de K. Igarashi.
Mesure dernière main spectrale : portée 1,8m / persistance 0,4s.
Conclusion partielle : sujet n'a pas atteint son palier supérieur.
Recommandation : ne pas pousser. Le sujet ignore encore.`}</pre>
              ) : (
                <div className="intranet__sealed-lock">🔒 Authentification requise — utilise le CMD : <code>auth NIVEAU-1 &lt;token&gt;</code></div>
              )}
            </div>

            <div className={`intranet__sealed${clearance >= 2 ? ' is-open' : ''}`}>
              <div className="intranet__sealed-head">📁 DOSSIER « AMBRE-01 » — Niveau 2</div>
              {clearance >= 2 ? (
                <pre>{`Sujet AMBRE-01 : entité humanoïde, iris ambrés luminescents.
Observé 14 fois en 6 mois. Toujours surplombant un parcours TSL.
N'a jamais été filmé clairement (signal optique perturbé à 6m).
Lien suspecté avec disparitions : 11 sur 13 confirmées dans son périmètre d'observation.
HYPOTHÈSE : recruteur ou sélectionneur pour entité tierce non identifiée.`}</pre>
              ) : (
                <div className="intranet__sealed-lock">🔒 Niveau 2 requis — <code>auth NIVEAU-2 &lt;token&gt;</code></div>
              )}
            </div>

            <div className={`intranet__sealed${clearance >= 3 ? ' is-open' : ''}`}>
              <div className="intranet__sealed-head">📁 DOSSIER « KOGA-VEIL » — Niveau 3 — TOP SECRET</div>
              {clearance >= 3 ? (
                <pre>{`Dernier signal R. Nishikawa : 14/02/2026, 03:11, antenne Akihabara-3.
Triangulation : impossible — signal réinjecté depuis 4 points simultanés.
Ce n'est pas une fuite. C'est un message.

Le terme "KOGA" apparaît 7 fois dans ses dernières notes manuscrites.
Aucune entrée KOGA dans nos archives. Aucune. Comme si quelqu'un avait nettoyé.

— Cmdt. Hoshino, 02/05/2026
   Pour les yeux de K. Igarashi uniquement.`}</pre>
              ) : (
                <div className="intranet__sealed-lock">🔒 Niveau 3 requis — <code>auth NIVEAU-3 &lt;token&gt;</code></div>
              )}
            </div>

            <div className="intranet__hint">
              💡 Tokens d'authentification a entrer dans l'<i>Invite de commandes système</i>.
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="intranet__footer">
        KISHI-NET © 6071 — Section 7, Tokyo — Utilisateur : K. Igarashi — Session : {new Date().toLocaleTimeString('fr-FR')}
      </div>
    </div>
  )
}