import { useEffect, useState } from 'react'
import '../styles/Pouvoirs.scss'

// ─── DATA ────────────────────────────────────────────────────────
const HERO = {
    firstName: 'ISEN',
    lastName: 'SHURA',
    title: "L'Agent Nonchalant",
    matricule: "#0791",
    affiliation: "CGU-NET · SECTION 7 · ÉQUIPE 2",
    origin: 'Reach',
    role: 'Agent de Terrain',
    alignment: 'Neutre',
    description:
        "Opérateur d'élite affecté à la Section 7 du CGU-NET, Isen Shura cultive une nonchalance étudiée qui masque un instinct redoutable. Sous son regard ennuyé et son apparente indolence se cache un agent indépendant, méthodique et secret — capable de transmuter sa paresse en précision chirurgicale lorsque le terrain l'exige.",
}

const STATS = [
    { name: 'FORCE',     value: 62, color: '#ff5e6c' },
    { name: 'AGILITÉ',   value: 91, color: '#5ee6ff' },
    { name: 'DÉFENSE',   value: 54, color: '#a98bff' },
    { name: 'VITESSE',   value: 84, color: '#5effa1' },
    { name: 'ENDURANCE', value: 71, color: '#ffd24a' },
]

const HP     = { current: 720, max: 900 }
const ENERGY = { current: 480, max: 600 }

const SPELLS = [
    {
        key: 'Q',
        name: 'Sort I',
        cost: 30,
        duration: '1 TOUR',
        desc: 'Placeholder — Capacité offensive de base. Inflige des dégâts ciblés à courte portée et marque la cible.',
    },
    {
        key: 'W',
        name: 'Sort II',
        cost: 55,
        duration: '2 TOURS',
        desc: 'Placeholder — Capacité de contrôle. Ralentit la cible et applique un statut de vulnérabilité.',
    },
    {
        key: 'E',
        name: 'Sort III',
        cost: 70,
        duration: '3 TOURS',
        desc: 'Placeholder — Capacité de mobilité. Permet un déplacement rapide et renforce l\'esquive.',
    },
    {
        key: 'R',
        name: 'Ultime',
        cost: 120,
        duration: '4 TOURS',
        desc: 'Placeholder — Technique ultime. Déchaîne une frappe dévastatrice à zone d\'effet étendue.',
        ult: true,
    },
]

// ─── RADAR GEOMETRY ──────────────────────────────────────────────
const CX = 130, CY = 130, R = 90
const ANGLES = STATS.map((_, i) => -Math.PI / 2 + (2 * Math.PI * i) / STATS.length)
const OUTER = ANGLES.map(a => ({ x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }))
const DATA = STATS.map((s, i) => ({
    x: CX + R * (s.value / 100) * Math.cos(ANGLES[i]),
    y: CY + R * (s.value / 100) * Math.sin(ANGLES[i]),
}))
const RINGS = [0.25, 0.5, 0.75, 1.0]
const polyOf = pts => pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

// ─── COMPONENT ───────────────────────────────────────────────────
export default function Pouvoirs() {
    const [mounted, setMounted] = useState(false)
    const [bars, setBars] = useState(false)

    useEffect(() => {
        const t1 = setTimeout(() => setMounted(true), 60)
        const t2 = setTimeout(() => setBars(true), 520)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [])

    return (
        <div className="moba" data-testid="pouvoirs">
            {/* Animated background layers */}
            <div className="moba__bg-grid" />
            <div className="moba__bg-orb moba__bg-orb--1" />
            <div className="moba__bg-orb moba__bg-orb--2" />
            <div className="moba__scanlines" />

            <div className={`moba__inner ${mounted ? 'is-in' : ''}`}>

                {/* Top bar */}
                <header className="moba__topbar">
                    <div className="moba__crumb">
                        <span className="moba__crumb-dot" />
                        PROFIL / AGENTS / <strong>SHURA, ISEN</strong>
                    </div>
                    <div className="moba__rank">
                        <span className="moba__rank-label">RANG</span>
                        <span className="moba__rank-val">ELITE</span>
                        <span className="moba__rank-mat">{HERO.matricule}</span>
                    </div>
                </header>

                {/* Main 3-col grid */}
                <div className="moba__grid">

                    {/* LEFT: identity + radar */}
                    <section className="moba__col moba__col--left">
                        <div className="moba__name-block">
                            <h1 className="moba__name" data-testid="hero-name">{HERO.firstName}</h1>
                            <h2 className="moba__lastname">{HERO.lastName}</h2>
                            <div className="moba__subtitle">— {HERO.title} —</div>
                            <div className="moba__affiliation">{HERO.affiliation}</div>
                        </div>

                        <p className="moba__desc" data-testid="hero-desc">{HERO.description}</p>

                        {/* Identity tags */}
                        <div className="moba__tags">
                            <span className="moba__tag"><i>ORIGINE</i>{HERO.origin}</span>
                            <span className="moba__tag"><i>RÔLE</i>{HERO.role}</span>
                            <span className="moba__tag"><i>ALIGNEMENT</i>{HERO.alignment}</span>
                        </div>

                        {/* Radar */}
                        <div className="moba__panel moba__radar-panel">
                            <div className="moba__panel-head">
                                <span className="moba__panel-title">CARACTÉRISTIQUES</span>
                                <span className="moba__panel-dot" />
                            </div>
                            <div className="moba__radar-wrap">
                                <svg className="moba__radar" viewBox="0 0 260 260" data-testid="stats-radar">
                                    <defs>
                                        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#5ee6ff" stopOpacity="0.55" />
                                            <stop offset="100%" stopColor="#1e7ae0" stopOpacity="0.05" />
                                        </radialGradient>
                                    </defs>
                                    {RINGS.map((s, ri) => (
                                        <polygon
                                            key={ri}
                                            points={polyOf(OUTER.map(p => ({
                                                x: CX + (p.x - CX) * s,
                                                y: CY + (p.y - CY) * s,
                                            })))}
                                            fill="none"
                                            stroke={s === 1 ? '#3a82d9' : 'rgba(94,140,210,0.18)'}
                                            strokeWidth={s === 1 ? 1.2 : 0.7}
                                        />
                                    ))}
                                    {OUTER.map((p, i) => (
                                        <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="rgba(94,140,210,0.18)" strokeWidth="0.7" />
                                    ))}
                                    <polygon
                                        points={polyOf(DATA)}
                                        fill="url(#radarFill)"
                                        stroke="#5ee6ff"
                                        strokeWidth="1.8"
                                        style={{
                                            filter: 'drop-shadow(0 0 6px rgba(94,230,255,0.55))',
                                            transformOrigin: `${CX}px ${CY}px`,
                                            transform: mounted ? 'scale(1)' : 'scale(0)',
                                            transition: 'transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s',
                                        }}
                                    />
                                    {DATA.map((p, i) => (
                                        <circle key={i} cx={p.x} cy={p.y} r="3.2" fill={STATS[i].color}
                                            style={{ filter: `drop-shadow(0 0 4px ${STATS[i].color})` }} />
                                    ))}
                                    {STATS.map((s, i) => {
                                        const lx = CX + (R + 20) * Math.cos(ANGLES[i])
                                        const ly = CY + (R + 20) * Math.sin(ANGLES[i])
                                        return (
                                            <g key={i}>
                                                <text x={lx} y={ly - 4} textAnchor="middle" dominantBaseline="middle"
                                                    fill="#9fc6ff" fontSize="9" fontWeight="700" letterSpacing="1.5">
                                                    {s.name}
                                                </text>
                                                <text x={lx} y={ly + 7} textAnchor="middle" dominantBaseline="middle"
                                                    fill={s.color} fontSize="10" fontWeight="800">
                                                    {s.value}
                                                </text>
                                            </g>
                                        )
                                    })}
                                </svg>
                            </div>
                        </div>
                    </section>

                    {/* CENTER: portrait */}
                    <section className="moba__col moba__col--center">
                        <div className="moba__portrait" data-testid="hero-portrait">
                            <div className="moba__portrait-glow" />
                            <div className="moba__portrait-frame">
                                <img src="/images/isen.png" alt="Isen Shura" className="moba__portrait-img" />
                            </div>
                            <div className="moba__portrait-watermark">
                                {HERO.firstName} <br/>{HERO.lastName}
                            </div>
                            <div className="moba__portrait-base" />
                        </div>
                    </section>

                    {/* RIGHT: bars + spells */}
                    <section className="moba__col moba__col--right">

                        {/* Vital bars */}
                        <div className="moba__panel moba__bars-panel">
                            <div className="moba__panel-head">
                                <span className="moba__panel-title">VITALITÉ</span>
                                <span className="moba__panel-dot" />
                            </div>

                            <div className="moba__bar-block" data-testid="hp-bar">
                                <div className="moba__bar-row">
                                    <span className="moba__bar-name">PV</span>
                                    <span className="moba__bar-val">
                                        {HP.current}<i>/{HP.max}</i>
                                    </span>
                                </div>
                                <div className="moba__bar-track">
                                    <div
                                        className="moba__bar-fill moba__bar-fill--hp"
                                        style={{
                                            width: bars ? `${(HP.current / HP.max) * 100}%` : '0%',
                                        }}
                                    />
                                    <div className="moba__bar-shine" />
                                </div>
                            </div>

                            <div className="moba__bar-block" data-testid="energy-bar">
                                <div className="moba__bar-row">
                                    <span className="moba__bar-name">ÉNERGIE</span>
                                    <span className="moba__bar-val">
                                        {ENERGY.current}<i>/{ENERGY.max}</i>
                                    </span>
                                </div>
                                <div className="moba__bar-track">
                                    <div
                                        className="moba__bar-fill moba__bar-fill--energy"
                                        style={{
                                            width: bars ? `${(ENERGY.current / ENERGY.max) * 100}%` : '0%',
                                        }}
                                    />
                                    <div className="moba__bar-shine" />
                                </div>
                            </div>
                        </div>

                        {/* Spells */}
                        <div className="moba__panel moba__spells-panel">
                            <div className="moba__panel-head">
                                <span className="moba__panel-title">CAPACITÉS</span>
                                <span className="moba__panel-dot" />
                            </div>

                            <div className="moba__spells" data-testid="spells-grid">
                                {SPELLS.map((sp, i) => (
                                    <div
                                        key={sp.key}
                                        className={`moba__spell ${sp.ult ? 'is-ult' : ''}`}
                                        style={{ animationDelay: `${0.4 + i * 0.08}s` }}
                                        data-testid={`spell-${sp.key.toLowerCase()}`}
                                    >
                                        <div className="moba__spell-ico">
                                            <span className="moba__spell-glyph">{sp.key}</span>
                                            <span className="moba__spell-key">{sp.key}</span>
                                        </div>
                                        <div className="moba__spell-body">
                                            <div className="moba__spell-head">
                                                <span className="moba__spell-name">{sp.name}</span>
                                                <div className="moba__spell-meta">
                                                    <span className="moba__spell-cost">◆ {sp.cost}</span>
                                                    <span className="moba__spell-dur">⧗ {sp.duration}</span>
                                                </div>
                                            </div>
                                            <p className="moba__spell-desc">{sp.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}