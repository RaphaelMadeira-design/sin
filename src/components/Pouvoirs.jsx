import { useEffect, useState } from 'react'
import '../styles/Pouvoirs.scss'
import pouvoirsData from '../data/pouvoirs.json'

// ─── DATA (content lives in ../data/pouvoirs.json) ───────────────
const { hero: HERO, stats: STATS, hp: HP, energy: ENERGY, spells: SPELLS } = pouvoirsData

// ─── RADAR GEOMETRY ──────────────────────────────────────────────
const CX = 130, CY = 130, R = 90
const ANGLES = STATS.map((_, i) => -Math.PI / 2 + (2 * Math.PI * i) / STATS.length)
const OUTER = ANGLES.map(a => ({ x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }))
const DATA = STATS.map((s, i) => ({
    x: CX + R * (s.value / 100) * Math.cos(ANGLES[i]),
    y: CY + R * (s.value / 100) * Math.sin(ANGLES[i]),
}))
const RINGS = [0.25, 0.5, 0.75, 1.0]
const polyOf = pts => pts.map(p => `${Math.round(p.x)},${Math.round(p.y)}`).join(' ')

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
            {/* Retro background layers */}
            <div className="moba__bg-grid" />
            <div className="moba__bg-dither" />

            <div className={`moba__inner ${mounted ? 'is-in' : ''}`}>

                {/* Top bar */}
                <header className="moba__topbar">
                    <div className="moba__crumb">
                        <span className="moba__crumb-dot" />
                        PROFIL \ AGENTS \ <strong>SHURA, ISEN</strong>
                    </div>
                    <div className="moba__rank">
                        <span className="moba__rank-label">RANG</span>
                        <span className="moba__rank-val">{HERO.rank}</span>
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
                                <svg className="moba__radar" viewBox="0 0 260 260" data-testid="stats-radar" shapeRendering="crispEdges">
                                    {RINGS.map((s, ri) => (
                                        <polygon
                                            key={ri}
                                            points={polyOf(OUTER.map(p => ({
                                                x: CX + (p.x - CX) * s,
                                                y: CY + (p.y - CY) * s,
                                            })))}
                                            fill="none"
                                            stroke={s === 1 ? '#3a82d9' : 'rgba(94,140,210,0.35)'}
                                            strokeWidth={s === 1 ? 2 : 1}
                                        />
                                    ))}
                                    {OUTER.map((p, i) => (
                                        <line key={i} x1={CX} y1={CY} x2={Math.round(p.x)} y2={Math.round(p.y)} stroke="rgba(94,140,210,0.35)" strokeWidth="1" />
                                    ))}
                                    <polygon
                                        points={polyOf(DATA)}
                                        fill="rgba(94,230,255,0.28)"
                                        stroke="#5ee6ff"
                                        strokeWidth="2"
                                        style={{
                                            transformOrigin: `${CX}px ${CY}px`,
                                            transform: mounted ? 'scale(1)' : 'scale(0)',
                                            transition: 'transform 0.6s steps(8, end) 0.3s',
                                        }}
                                    />
                                    {DATA.map((p, i) => (
                                        <rect key={i} x={Math.round(p.x) - 3} y={Math.round(p.y) - 3} width="6" height="6" fill={STATS[i].color} />
                                    ))}
                                    {STATS.map((s, i) => {
                                        const lx = Math.round(CX + (R + 20) * Math.cos(ANGLES[i]))
                                        const ly = Math.round(CY + (R + 20) * Math.sin(ANGLES[i]))
                                        return (
                                            <g key={i}>
                                                <text x={lx} y={ly - 4} textAnchor="middle" dominantBaseline="middle"
                                                    fill="#9fc6ff" fontSize="9" letterSpacing="1">
                                                    {s.name}
                                                </text>
                                                <text x={lx} y={ly + 8} textAnchor="middle" dominantBaseline="middle"
                                                    fill={s.color} fontSize="11">
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
                                <img src={HERO.portrait} alt={`${HERO.firstName} ${HERO.lastName}`} className="moba__portrait-img" />
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
                                                    <span className="moba__spell-cost">[{sp.cost}]</span>
                                                    <span className="moba__spell-dur">{sp.duration}</span>
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