import { useState, useEffect } from 'react'
import '../styles/Intranet.scss'
import intranetData from '../data/intranet.json'
import Sounds from '../components/Sounds'

// ─── CGU CREDENTIALS ───────────────────────────────────────────
const CGU_CREDENTIALS = {
    matricule: 'CHANGE_ME',
    password:  'CHANGE_ME',
}

const { 
    tasks: TASKS, 
    reports: REPORTS, 
    personnel: PERSONNEL, 
    personnelStructure: PERSONNEL_STRUCTURE, 
    squads: SQUADS, 
    logs: LOGS, 
    tabs: TABS, 
    secure: SECURE 
} = intranetData

const getClearance = () => {
    const n = parseInt(sessionStorage.getItem('cgu_clearance') || '0', 10)
    return isNaN(n) ? 0 : n
}

// ─── CGU INTRANET LOGIN ────────────────────────────────────────
function IntranetLogin({ onLogin }) {
    const [matricule, setMatricule] = useState('')
    const [password, setPassword]   = useState('')
    const [error, setError]         = useState('')
    const [loading, setLoading]     = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            if (
                matricule.trim() === CGU_CREDENTIALS.matricule &&
                password === CGU_CREDENTIALS.password
            ) {
                Sounds?.msnNotify?.()
                sessionStorage.setItem('cgu_auth', '1')
                onLogin()
            } else {
                Sounds?.error?.()
                setError("Matricule ou code d'accès invalide. Vérifiez vos informations et réessayez.")
                setLoading(false)
            }
        }, 900)
    }

    return (
        <div className="cgu-login" data-testid="intranet-login">
            {/* Bandeau de marque CGU */}
            <div className="cgu-login__header">
                <div className="cgu-login__crest" />
                    <div>
                        <div className="cgu-login__title">SERVEUR INTERNE — WELLSTON-NET</div>
                        <div className="cgu-login__subtitle">
                            POSTE DE TRAVAIL MONITORÉ
                        </div>
                    </div>
                </div>

                {/* Corps : centre le formulaire */}
                <div className="cgu-login__body">
                    <form onSubmit={handleSubmit} className="cgu-login__form">
                        <div className="cgu-login__banner">
                            ACCÈS RESTREINT — AUTHENTIFICATION REQUISE
                        </div>

                        <p className="cgu-login__intro">
                            Veuillez saisir votre matricule et votre code d'accèspour consulter le réseau interne.
                        </p>

                        <div className="cgu-login__form-group">
                            <label className="cgu-login__label" htmlFor="cgu-matricule">
                                Matricule agent&nbsp;:
                            </label>
                            <input
                                id="cgu-matricule"
                                type="text"
                                className="win98-input"
                                value={matricule}
                                onChange={(e) => setMatricule(e.target.value)}
                                placeholder="Ex. #1234"
                                autoFocus
                                autoComplete="off"
                                spellCheck={false}
                                data-testid="cgu-matricule-input"
                            />
                        </div>

                        <div className="cgu-login__form-group">
                            <label className="cgu-login__label" htmlFor="cgu-password">
                                Code d'accès&nbsp;:
                            </label>
                            <input
                                id="cgu-password"
                                type="password"
                                className="win98-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                                data-testid="cgu-password-input"
                            />
                        </div>

                        {error && (
                            <div className="cgu-login__error">⚠ {error}</div>
                        )}

                        <div className="cgu-login__actions">
                            <button
                                type="submit"
                                className="win98-btn"
                                disabled={loading}
                                data-testid="cgu-login-submit"
                            >
                                {loading ? 'Vérification...' : 'Se connecter'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer collé tout en bas de la fenêtre */}
                <div className="cgu-login__footer">
                    Toute tentative d'intrusion est consignée et tracée.<br/>
                    WELLSTON-NET VERSION 5.04
                </div>
        </div>
    )
}

export default function Intranet() {
    const [authed, setAuthed] = useState(
        () => sessionStorage.getItem('cgu_auth') === '1'
    )
    const [tab, setTab] = useState('tasks')
    const [openReport, setOpenReport] = useState(null)
    const [openPerson, setOpenPerson] = useState(null)
    const [clearance, setClearance] = useState(getClearance())
    const [openSquad, setOpenSquad] = useState(2)

    useEffect(() => {
        const i = setInterval(() => setClearance(getClearance()), 1000)
        return () => clearInterval(i)
    }, [])

    if (!authed) {
        return <IntranetLogin onLogin={() => setAuthed(true)} />
    }

    const groupedPersonnel = PERSONNEL.reduce((acc, p) => {
        if (!p.team) return acc
        acc[p.team] = acc[p.team] || []
        acc[p.team].push(p)
        return acc
    }, {})

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

    const renderPersonnelCard = (p) => {
        const locked = p.locked && clearance < p.locked
        const clickAllowed = p.team === 'Équipe 2' && !locked
        return (
            <div
                key={p.id}
                className={`intranet__card${!clickAllowed ? ' is-locked' : ''}`}
                onClick={() => clickAllowed && setOpenPerson(p)}
                title={!clickAllowed ? 'Accès restreint — Équipe 2 uniquement' : ''}
                >
                <div className="intranet__card-id">N° {p.id.toUpperCase()}</div>
                <div className="intranet__card-name">{locked ? '████████████' : p.name}</div>
                <div className="intranet__card-rank">{locked ? '[ACCÈS RESTREINT]' : p.rank}</div>
                <div className={`intranet__card-status s-${p.status.toLowerCase().replace(/ /g, '-')}`}>{p.status}</div>
            </div>
        )
    }

    return (
        <div className="intranet" data-testid="intranet-window">
            {/* Header */}
            <div className="intranet__header">
                <div className="intranet__crest"></div>
                <div className="intranet__title">
                    <div className="intranet__org">Université de Wellston</div>
                    <div className="intranet__sub">Intranet WELLSTON-NET v5.04 — Section 7</div>
                </div>
                <div className={`intranet__clearance lvl-${clearance}`}>AUTORISATION : NIVEAU {clearance}</div>
            </div>

            {/* Tabs */}
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
                {/* Tasks */}
                {tab === 'tasks' && (
                    <table className="intranet__table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tâche</th>
                                <th>Priorité</th>
                                <th>Échéance</th>
                                <th>Statut</th>
                                <th>Assigné par</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TASKS.map(t => (
                                <tr key={t.id}>
                                    <td>{String(t.id).padStart(3,'0')}</td>
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

                {/* Reports */}
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
                                    <div className={`intranet__stamp ${r.classification.toLowerCase().replace(/ /g,'-')}`}>
                                        {locked ? `NIVEAU ${r.locked} REQUIS` : r.classification}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}

                {tab === 'reports' && openReport && (
                    <div className="intranet__doc">
                        <button className="intranet__back" onClick={() => setOpenReport(null)}>
                            ◄ Retour
                        </button>
                        <div className="intranet__doc-head">
                            <div className="intranet__doc-org">SECTION 7, ÉQUIPE 2 — RAPPORT OFFICIEL</div>
                            <div className={`intranet__stamp ${openReport.classification.toLowerCase().replace(/ /g,'-')}`}>{openReport.classification}</div>
                        </div>
                        <div className="intranet__doc-meta">
                            <div><b>Réf. :</b> {openReport.code}</div>
                            <div><b>Auteur :</b> {openReport.author}</div>
                            <div><b>Date :</b> {openReport.date}</div>
                            <div><b>Lieu :</b> {openReport.place}</div>
                        </div>
                        <h3 className="intranet__doc-title">{openReport.title}</h3>
                        <pre className="intranet__doc-body">{openReport.body}</pre>
                    </div>
                )}

                {/* Personnel */}
                {tab === 'personnel' && !openPerson && (
                    <div className="intranet__personnel-groups">
                        <section className="intranet__group">
                            <div className="intranet__group-title">CHEF DE LA SECTION 7</div>
                            <div className="intranet__cards">
                                {PERSONNEL.filter(p => PERSONNEL_STRUCTURE.leader.includes(p.id)).map(renderPersonnelCard)}
                            </div>
                        </section>

                        {SQUADS.map(number => (
                            <section key={number} className="intranet__group">
                                <button 
                                className="intranet__squad-header" 
                                onClick={() => setOpenSquad(openSquad === number ? null : number)}
                                >
                                {openSquad === number ? '▼' : '▶'} ÉQUIPE {String(number).padStart(2,'0')}
                                </button>

                                {openSquad === number && (
                                <>
                                    {/* Agents de terrain */}
                                    <div className="intranet__subgroup">
                                    <div className="intranet__subgroup-title">AGENTS DE TERRAIN</div>
                                    <div className="intranet__cards">
                                        {PERSONNEL_STRUCTURE[`squad${number}`]?.fieldAgents
                                        .map(id => PERSONNEL.find(p => p.id === id))
                                        .filter(Boolean)
                                        .map(renderPersonnelCard)}
                                    </div>
                                    </div>

                                    {/* Téléopérateur */}
                                    <div className="intranet__subgroup">
                                    <div className="intranet__subgroup-title">TÉLÉOPÉRATEUR</div>
                                    <div className="intranet__cards">
                                        {PERSONNEL_STRUCTURE[`squad${number}`]?.teleoperator
                                        .map(id => PERSONNEL.find(p => p.id === id))
                                        .filter(Boolean)
                                        .map(renderPersonnelCard)}
                                    </div>
                                    </div>

                                    {/* Pour l’équipe 2 uniquement, ajouter les autres données archivées */}
                                    {number === 2 && (
                                    <div className="intranet__subgroup">
                                        <div className="intranet__subgroup-title">DONNÉES ARCHIVÉES</div>
                                        <div className="intranet__cards">
                                        {PERSONNEL.filter(p => PERSONNEL_STRUCTURE.other.includes(p.id))
                                            .map(renderPersonnelCard)}
                                        </div>
                                    </div>
                                    )}
                                </>
                                )}
                            </section>
                        ))}
                    </div>
                )}

                {tab === 'personnel' && openPerson && (
                    <div className="intranet__doc">
                        <button className="intranet__back" onClick={() => setOpenPerson(null)}>
                            ◄ Retour fiches
                        </button>
                        <div className="intranet__doc-head">
                            <div className="intranet__doc-org">FICHE ÉLÈVE — DOSSIER N° {openPerson.id.toUpperCase()}</div>
                            <div className={`intranet__stamp classifié`}>USAGE INTERNE</div>
                        </div>

                        <div className="intranet__fiche-layout">
                            <table className="intranet__fiche">
                                <tbody>
                                    {Object.entries({ 
                                        "Nom complet": openPerson.name,
                                        "Âge": openPerson.age,
                                        "Genre": openPerson.genre,
                                        "Orientation": openPerson.orientation,
                                        "Spécialisation": openPerson.race,
                                        "Cycle": openPerson.ethnicity,
                                        "Année": openPerson.origin,
                                        "Poste": openPerson.role, 
                                        "Alignement": openPerson.alignment 
                                    }).map(([k,v]) => (
                                        <tr key={k}>
                                            <th>{k}</th>
                                            <td>{v}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {openPerson.image && (
                                <figure className="intranet__photo-frame">
                                    <div className="intranet__photo-caption">TROMBINOSCOPE</div>
                                    <div className="intranet__photo-inner">
                                        <img
                                            src={openPerson.image}
                                            alt={openPerson.name}
                                            className="intranet__photo-img"
                                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                                        />
                                    </div>
                                    <figcaption className="intranet__photo-id">
                                        N° {openPerson.id.toUpperCase()}
                                    </figcaption>
                                </figure>
                            )}
                        </div>
                        {('physicalDescription' in openPerson || 'psychProfile' in openPerson) && (
                            <div className="intranet__profiles">
                                <section className="intranet__profile-card">
                                    <div className="intranet__profile-head">DESCRIPTION PHYSIQUE</div>
                                    <div className="intranet__profile-body">
                                        {openPerson.physicalDescription
                                            ? openPerson.physicalDescription
                                            : <span className="intranet__profile-empty">— Donnée non renseignée —</span>}
                                    </div>
                                </section>
                                <section className="intranet__profile-card">
                                    <div className="intranet__profile-head">PROFIL PSYCHOLOGIQUE</div>
                                    <div className="intranet__profile-body">
                                        {openPerson.psychProfile
                                            ? openPerson.psychProfile
                                            : <span className="intranet__profile-empty">— Donnée non renseignée —</span>}
                                    </div>
                                </section>
                            </div>
                        )}
                        {('shortTermGoals' in openPerson || 'longTermGoals' in openPerson) && (
                            <div className="intranet__profiles">
                                <section className="intranet__profile-card intranet__profile-card--full">
                                    <div className="intranet__profile-head">OBJECTIFS DU PERSONNAGE</div>
                                    <div className="intranet__profile-body">
                                        <div className="intranet__profile-subhead">▸ Court terme</div>
                                        <p>
                                            {openPerson.shortTermGoals
                                                ? openPerson.shortTermGoals
                                                : <span className="intranet__profile-empty">— Donnée non renseignée —</span>}
                                        </p>

                                        <div className="intranet__profile-subhead">▸ Long terme</div>
                                        <p>
                                            {openPerson.longTermGoals
                                                ? openPerson.longTermGoals
                                                : <span className="intranet__profile-empty">— Donnée non renseignée —</span>}
                                        </p>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                )}

                {/* Logs */}
                {tab === 'logs' && (
                    <div className="intranet__logs">
                        {LOGS.map((l,i) => <div key={i} className="intranet__logline">{l}</div>)}
                    </div>
                )}

                {/* Secure */}
                {tab === 'secure' && (
                    <div className="intranet__secure">
                        {Object.values(SECURE).map(item => (
                            <div key={item.title} className={`intranet__sealed${clearance >= item.level ? ' is-open' : ''}`}>
                                <div className="intranet__sealed-head">{item.title} — Niveau {item.level}</div>
                                {clearance >= item.level ? (
                                    <pre>{item.content}</pre>
                                ) : (
                                    <div className="intranet__sealed-lock">Niveau {item.level} requis</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="intranet__footer">
                WELLSTON-NET — Section 7, Équipe 2 — Utilisateur : S. ASHU'RA # 0791 — Session : {new Date().toLocaleTimeString('fr-FR')}
            </div>
        </div>
    )
}