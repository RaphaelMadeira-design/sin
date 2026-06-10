import { useState, useEffect, useRef } from 'react'
import '../styles/Pouvoirs.scss'

// ─── TYPEWRITER HOOK ──────────────────────────────────────────────
function useTypewriter(text, speed = 22, startDelay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(intervalRef.current)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeoutRef.current)
      clearInterval(intervalRef.current)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

// ─── DATA ─────────────────────────────────────────────────────────
const STATS = [
  { 
    name: 'Perception', 
    value: 10, 
    color: '#bfff44' 
  },
  { 
    name: 'Dextérité',  
    value: 10, 
    color: '#44d4ff' 
  },
  { 
    name: 'Endurance',  
    value: 10, 
    color: '#ff9944' 
  },
  { 
    name: 'Force',      
    value: 10, 
    color: '#ff4466' 
  },
  { 
    name: 'Résistance', 
    value: 10, 
    color: '#cc44ff' 
  },
  { 
    name: 'Shokan',     
    value: 10, 
    color: '#44ffb0' 
  },
]

const HP     = { current: 800,  max: 800 }
const ENERGY = { current: 500,  max: 500  }
const XP     = { current: 50, max: 10000 }
const LEVEL  = 1

const SPELLS = [
  {
    id: 1, key: 'E',
    name: 'Permutation',
    icon: '/images/spell-1.jpg',
    cost: 'TECHNIQUE DE RANG E', duration: '1 tour',
    desc: "Technique basique qui permet à Kiba d'échanger sa position avec celle de sa projection de la Dualité, lui offrant ainsi une grande mobilité tactique pour surprendre ses adversaires ou échapper à des situations dangereuses.",
  },
]

const HEADER_TEXT = '// CLAN MAGAISHI // REGISTRE DES SHOKANS :: DOSSIER CHEVALIER //  CLIENT v2.4.1 — PATCH 0.9.7'

// ─── RADAR GEOMETRY ───────────────────────────────────────────────
const CX = 110, CY = 108, R = 72
const ANGLES   = STATS.map((_, i) => -Math.PI / 2 + (2 * Math.PI * i) / 6)
const OUTER_PTS = ANGLES.map(a => ({ x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }))
const DATA_PTS  = STATS.map((s, i) => ({
  x: CX + R * (s.value / 100) * Math.cos(ANGLES[i]),
  y: CY + R * (s.value / 100) * Math.sin(ANGLES[i]),
}))
const RINGS  = [0.25, 0.5, 0.75, 1.0]
const toPoly = pts => pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function Pouvoirs() {
  const [mounted, setMounted] = useState(false)
  const [barsOn,  setBarsOn]  = useState(false)

  const { displayed: headerText, done: headerDone } = useTypewriter(HEADER_TEXT, 20, 80)

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 60)
    const t2 = setTimeout(() => setBarsOn(true),  420)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const animCls = (cls) => mounted ? cls : 'pv-hidden'

  const basicSpells = SPELLS.filter(sp => !sp.ultimate)
  const ultimateSpell = SPELLS.find(sp => sp.ultimate)

  return (
    <div className="pouvoirs" data-testid="pouvoirs">

      {/* ── Header typewriter ─────────────────── */}
      <div className={`gp__header ${animCls('pv-fade-down')}`} data-testid="pouvoirs-header">
        <span className="gp__header-title">
          {headerText}
          {!headerDone && <span className="pouvoirs__cursor">_</span>}
        </span>
        <span className="gp__header-ver">
          SESSION: {new Date().toLocaleDateString('fr-FR')}
        </span>
      </div>

      {/* ── Body ─────────────────────────────── */}
      <div className="gp__body">

        {/* ── Left column ───────────────────── */}
        <div className={`gp__left ${animCls('pv-slide-left')}`}>

          {/* Portrait */}
          <div className={`gp__portrait-frame ${animCls('pv-portrait-in')}`}>
            <span className="gp__type-badge">DIVERS</span>
            <span className="gp__lvl-badge">RANG E</span>
            <img src="/images/pose.png" alt="Kiba Igarashi" className="gp__portrait" />
            <div className="gp__char-name">KIBA IGARASHI</div>
            <div className="gp__char-class">• Clan Magaishi •</div>
          </div>

          {/* Barres PV / EN / XP */}
          <div className="gp__bars">
            {[
              { 
                label: 'PV', 
                cur: HP.current,     
                max: HP.max,     
                mod: 'hp'     
              },
              { 
                label: 'EN', 
                cur: ENERGY.current,  
                max: ENERGY.max, 
                mod: 'energy' 
              },
              { 
                label: 'XP', 
                cur: XP.current,      
                max: XP.max,     
                mod: 'xp'     
              },
            ].map(b => (
              <div key={b.label} className="gp__bar-row">
                <span className="gp__bar-label">{b.label}</span>
                <div className="gp__bar-track">
                  <div
                    className={`gp__bar-fill gp__bar-fill--${b.mod}`}
                    style={{
                      width: barsOn ? `${(b.cur / b.max) * 100}%` : '0%',
                      transition: 'width 1.3s cubic-bezier(0.08, 0.92, 0.3, 1)',
                    }}
                  />
                </div>
                <span className="gp__bar-nums">
                  {b.cur}<span className="gp__bar-max">/{b.max}</span>
                </span>
              </div>
            ))}
          </div>

          {/* ── Radar + stats (déplacé ici) ─── */}
          <div className="gp__panel">
            <div className="gp__section-lbl">[ STATISTIQUES DE COMBAT ]</div>
            <div className="gp__radar-row">
              <svg className={`gp__radar-svg ${animCls('pv-radar')}`} viewBox="0 0 220 216">
                {/* Grille */}
                {RINGS.map((s, ri) => (
                  <polygon
                    key={ri}
                    points={toPoly(OUTER_PTS.map(p => ({
                      x: CX + (p.x - CX) * s,
                      y: CY + (p.y - CY) * s,
                    })))}
                    fill="none"
                    stroke={s === 1 ? '#e8c147' : '#23243a'}
                    strokeWidth={s === 1 ? 1.2 : 0.6}
                  />
                ))}
                {/* Axes */}
                {OUTER_PTS.map((p, i) => (
                  <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#23243a" strokeWidth="0.6" />
                ))}
                {/* Polygone de données */}
                <polygon
                  points={toPoly(DATA_PTS)}
                  fill="rgba(76,200,255,0.12)"
                  stroke="#4cc8ff"
                  strokeWidth="1.2"
                />
                {/* Points */}
                {DATA_PTS.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={STATS[i].color} />
                ))}
                {/* Labels */}
                {STATS.map((s, i) => {
                  const lx = CX + (R + 17) * Math.cos(ANGLES[i])
                  const ly = CY + (R + 17) * Math.sin(ANGLES[i])
                  return (
                    <text
                      key={i}
                      x={lx.toFixed(1)} y={ly.toFixed(1)}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="#e8c147" fontSize="7" fontFamily="Pixelify Sans, sans-serif"
                    >
                      {s.name}
                    </text>
                  )
                })}
              </svg>
            </div>
          </div>

        </div>

        {/* ── Right column ──────────────────── */}
        <div className={`gp__right ${animCls('pv-slide-right')}`}>

          {/* ── Dossier sujet (déplacé ici) ─── */}
          <div className="gp__dossier">
            <div className="gp__section-lbl">[ DOSSIER SUJET ]</div>

            <p className={`gp__dossier-p ${animCls('pv-para-1')}`}>
              Le <em>Shokan de la Dualité</em> est une capacité unique de <em>type divers</em> permettant à Kiba de matérialiser une projection partielle de lui-même depuis son téléphone, qu’il est capable de contrôler à volonté.
            </p>
            <p className={`gp__dossier-p ${animCls('pv-para-2')}`}>
              Cette projection se manifeste sous la forme d’une <em>silhouette humanoïde sombre</em>, quasiment <em>translucide</em> et dont les contours vacillent dans un flou instable. Ce clone évolue en permanence à proximité de Kiba, agissant comme une extension directe de sa volonté, capable de <em>combattre</em>, de <em>défendre</em> ou de simplement l'<em>épauler</em> dans ses actions. Cependant à son niveau actuel, Kiba est incapable de maintenir cette entité à la vue de tous dans son intégralité. Seuls des fragments du double peuvent être correctement matérialisés de manière récurrente : les bras et les jambes. Ces manifestations sont brèves ne durent que quelques secondes, avant de redevenir transparents aussitôt, comme si le double était incapable de perdurer et intéragir plus longtemps sur le plan physique. La Dualité peut <em>se déplacer librement autour de Kiba</em> mais reste confinée à un périmètre limité qu’elle ne peut dépasser.
            </p>
            <p className={`gp__dossier-p ${animCls('pv-para-3')}`}>
              Ce shokan présente plusieurs contraintes qui limitent son impact ainsi que son utilisation. Outre sa portée limitée à <em>4 mètres</em> tout autour de Kiba, les manifestations sont éphémères et ne durent que <em>1 à 2 secondes</em> avant de donner l'impression de disparaître. Naturellement, les statistiques de cette projection sont équivalentes à celles de Kiba lui-même et reflétent parfaitement ses propres aptitudes sans jamais les dépasser. Maintenir le clone trop longtemps est épuisant et provoque des migraines à l'utilisateur. Toutefois, la Dualité n'est pas une entité vivante et ne ressent pas la douleur, bien qu'il soit possible de l'attaquer, pour peu qu'on puisse clairement la voir.
            </p>
          </div>

          {/* Sorts / Capacités */}
          <div className="gp__panel gp__panel--spells">
            <div className="gp__spells">
              <div className="gp__section-lbl">[ TECHNIQUE SPÉCIALE ]</div>
              {basicSpells.map((sp, i) => (
                <div
                  key={sp.id}
                  className={`gp__spell ${animCls(`pv-spell-${i}`)}`}
                >
                  <div className="gp__spell-ico-wrap">
                    <img src={sp.icon} alt={sp.name} className="gp__spell-ico" />
                    <span className="gp__spell-key">{sp.key}</span>
                  </div>
                  <div className="gp__spell-body">
                    <div className="gp__spell-name">{sp.name}</div>
                    <div className="gp__spell-meta">
                      <span className="gp__spell-cost">◉ {sp.cost}</span>
                      <span className="gp__spell-dur">⧗ {sp.duration}</span>
                    </div>
                  </div>
                  <p className="gp__spell-desc">{sp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}