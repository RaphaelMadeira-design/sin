import { useState, useEffect, useCallback } from 'react'
import '../styles/Browser.scss'
import config from '../data/browserConfig.json'
import secretData from '../data/browserSecret.json'
import homeData from '../data/browserHome.json'
import wikiData from '../data/browserWikipedia.json'
import newsData from '../data/browserActunet.json'
import searchData from '../data/browserSearch.json'

const { IE_ICON, KONAMI, SECRET_SEARCHES, SECRET_URLS, WIKI_URL, NEWS_URL, TAB_DEFS, EXACT_URL_MAP } = config

// ── Pages secrètes ───────────────────────────────────────────────

const FRAGMENTS = secretData.fragments

function SecretPage() {
    const [visible, setVisible] = useState([])
    useEffect(() => {
        setVisible([])
        const timers = FRAGMENTS.map((f, i) =>
            setTimeout(() => setVisible(p => [...p, i]), f.delay)
        )
        return () => timers.forEach(clearTimeout)
    }, [])

    return (
        <div className="browser__secret">
            <div className="browser__secret-scanlines" />
            <div className="browser__secret-content">
                {FRAGMENTS.map((f, i) =>
                    visible.includes(i) ? (
                        <div
                            key={i}
                            className={[
                                'browser__secret-line',
                                f.cmd ? 'browser__secret-line--cmd' : '',
                                f.frag ? 'browser__secret-line--frag' : '',
                                f.warn ? 'browser__secret-line--warn' : '',
                            ].filter(Boolean).join(' ')}
                        >
                            {f.text || 'u00A0'}
                        </div>
                    ) : null
                )}
                {visible.length >= FRAGMENTS.length && (
                    <div className="browser__secret-cursor">_</div>
                )}
            </div>
        </div>
    )
}

function GlitchSearch({ query }) {
    const g = secretData.glitchSearch
    return (
        <div className="browser__glitch-search">
            <div className="browser__glitch-header">
                <span className="browser__glitch-logo">
                    {g.logo.map((l, i) => (
                        <span key={i} style={{ color: l.color }}>{l.letter}</span>
                    ))}
                </span>
                <div className="browser__glitch-query-bar">
                    <span>{query}</span>
                </div>
            </div>
            <div className="browser__glitch-count" dangerouslySetInnerHTML={{ __html: g.countHtml }} />
            <div className="browser__glitch-results">
                {g.results.map((r, i) => (
                    <div key={i} className={'browser__glitch-result' + (r.blocked ? ' browser__glitch-result--blocked' : '')}>
                        {r.blocked ? (
                            <span className="browser__glitch-result-title">{r.title}</span>
                        ) : (
                            <span className="browser__glitch-result-title browser-glitch-text" data-text={r.title}>
                                {r.title}
                            </span>
                        )}
                        <div className="browser__glitch-result-url">{r.url}</div>
                        <p className="browser__glitch-result-desc">{r.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ── Résultats de recherche Google « vintage » (fin 90's / 2000) ─────────

const TARGET_MAP = { wiki: WIKI_URL, news: NEWS_URL }
const SEARCH_TOPICS = searchData.topics.map(t => ({
    ...t,
    real: { ...t.real, target: TARGET_MAP[t.real.target] || t.real.target },
}))

function matchTopic(query) {
    const q = query.trim().toLowerCase()
    if (!q) return null
    for (const t of SEARCH_TOPICS) {
        if (t.keys.some(k => q.includes(k))) return t
    }
    return null
}

function FakeGoogleResults({ topic, query, onResultClick, onSearch }) {
    const [q, setQ] = useState(query)
    useEffect(() => { setQ(query) }, [query])
    const submit = () => { if (q.trim()) onSearch(q) }
    const gr = searchData.googleResults
    return (
        <div className="browser__gresults">
            <div className="browser__gresults-header">
                <div className="browser__gresults-logo">
                    {gr.header.logo.map((l, i) => (
                        <span key={i} style={{ color: l.color }}>{l.letter}</span>
                    ))}
                </div>
                <div className="browser__gresults-searchline">
                    <input
                        className="browser__gresults-input"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && submit()}
                    />
                    <button className="browser__gresults-btn" onClick={submit}>{gr.submitLabel}</button>
                </div>
            </div>
            <div className="browser__gresults-tabs">
                {gr.tabs.map((t, i) => (
                    <span key={i} className={'browser__gresults-tab' + (t.active ? ' browser__gresults-tab--active' : '')}>
                        {t.label}
                    </span>
                ))}
            </div>
            <div className="browser__gresults-count">
                Résultats <b>1 - {topic.fakes.length + 1}</b> sur environ <b>{topic.resultsCount}</b> pour <b>{query}</b>. ({topic.seconds} secondes)
            </div>

            <ol className="browser__gresults-list">
                <li className="browser__gresults-item browser__gresults-item--real">
                    <a
                        className="browser__gresults-title"
                        href="#"
                        onClick={(e) => { e.preventDefault(); onResultClick(topic.real.target) }}
                    >
                        {topic.real.title}
                    </a>
                    <p className="browser__gresults-desc">{topic.real.desc}</p>
                    <div className="browser__gresults-url">
                        {topic.real.url} - <span className="browser__gresults-cache">Cache</span> - <span className="browser__gresults-cache">Pages similaires</span>
                    </div>
                </li>

                {topic.fakes.map((r, i) => (
                    <li className="browser__gresults-item" key={i}>
                        <span className="browser__gresults-title browser__gresults-title--dead">
                            {r.title}
                        </span>
                        <p className="browser__gresults-desc">{r.desc}</p>
                        <div className="browser__gresults-url">
                            {r.url} - <span className="browser__gresults-cache">Cache</span> - <span className="browser__gresults-cache">Pages similaires</span>
                        </div>
                    </li>
                ))}
            </ol>

            <div className="browser__gresults-pager">
                <span className="browser__gresults-gooogle">
                    {gr.pagerLogo.map((l, i) => (
                        <span key={i} style={{ color: l.color }}>{l.letter}</span>
                    ))}
                </span>
                <div className="browser__gresults-pages">
                    <b>1</b>
                    <span className="browser__gresults-page-link">2</span>
                    <span className="browser__gresults-page-link">3</span>
                    <span className="browser__gresults-page-link">4</span>
                    <span className="browser__gresults-page-link">5</span>
                    <span className="browser__gresults-page-link">Suivant ›</span>
                </div>
            </div>
        </div>
    )
}

function Page404({ url }) {
    const p = config.page404
    return (
        <div className="browser__404">
            <div className="browser__404-header">
                <img src={p.errorIcon} alt="" />
                <h1>{p.title}</h1>
            </div>
            <div className="browser__404-body">
                <p>{p.description}</p>
                <ul>
                    <li>{p.checks[0]} : <em>{url}</em></li>
                    <li>{p.checks[1]}</li>
                </ul>
                <div className="browser__404-code">{p.code}</div>
            </div>
            <details className="browser__404-details">
                <summary>Informations techniques</summary>
                <pre className="browser__404-hidden">{p.hiddenComment}</pre>
            </details>
        </div>
    )
}

/* ──────────────────────────────────────────────────────────
   PAGE D'ACCUEIL — MSN.COM (style 1999-2000, en français)
   ────────────────────────────────────────────────────────── */

function FakeMSN({ onNormalSearch, onSecretSearch, onOpenNews }) {
    const [query, setQuery] = useState('')
    const [hotmailUser, setHotmailUser] = useState('')
    const [hotmailPass, setHotmailPass] = useState('')

    const handleSearch = () => {
        const q = query.trim()
        if (!q) return
        const topic = matchTopic(q)
        if (topic) { onNormalSearch(q, topic); return }
        const lower = q.toLowerCase()
        if (SECRET_SEARCHES.some(s => lower.includes(s))) onSecretSearch(q)
        else onNormalSearch(q, null)
    }

    const m = homeData

    return (
        <div className="browser__msn" data-testid="msn-home">

            {/* BAND 1 : logo + promo + date */}
            <div className="browser__msn-top">
                <div className="browser__msn-logo">
                    <span className="browser__msn-logo-text">{m.logo.text}</span>
                    <span className="browser__msn-logo-sub">{m.logo.sub}</span>
                </div>
                <div className="browser__msn-promo" dangerouslySetInnerHTML={{ __html: m.promoHtml }} />
                <div className="browser__msn-date">{m.date.month} <strong>{m.date.day}</strong></div>
            </div>

            {/* BAND 2 : barre bleue Search */}
            <div className="browser__msn-searchbar">
                <span className="browser__msn-searchbar-arrows">»</span>
                <span className="browser__msn-searchbar-label" dangerouslySetInnerHTML={{ __html: m.searchbarLabelHtml }} />
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    data-testid="msn-search-input"
                />
                <button className="browser__msn-searchbar-go" onClick={handleSearch}>go</button>
            </div>

            {/* BAND 3 : nav blanche/noire */}
            <div className="browser__msn-mainnav">
                {m.mainNav.map((label, i) => (
                    <span key={i} className={'browser__msn-mainnav-item' + (i === 0 ? ' browser__msn-mainnav-item--active' : '')}>
                        {label}
                    </span>
                ))}
                <div className="browser__msn-mainnav-spacer" />
                <div className="browser__msn-mainnav-passport">
                    <em>Passport</em>
                    <strong>Se connecter</strong>
                </div>
            </div>

            {/* BAND 4 : sous-nav bleue */}
            <div className="browser__msn-subnav">
                {m.subNavCols.map((col, i) => (
                    <div key={i} className="browser__msn-subnav-col">
                        {col.map((label, j) => (
                            <span key={j} className="link">{label}</span>
                        ))}
                    </div>
                ))}
                <div className="browser__msn-subnav-ad" onClick={onOpenNews}>
                    <span dangerouslySetInnerHTML={{ __html: m.subNavAdHtml }} />
                    <em>{m.subNavAdCta}</em>
                </div>
            </div>

            {/* BAND 5 : corps 3 colonnes */}
            <div className="browser__msn-body">

                {/* gauche : catégories */}
                <div className="browser__msn-cats">
                    {m.categories.map((c, i) => {
                        const label = typeof c === 'string' ? c : c.label
                        const isNew = typeof c === 'object' && c.isNew
                        return (
                        <span key={i} className="browser__msn-cats-item">
                            {label}{isNew && <em>New!</em>}
                        </span>
                        )
                    })}
                </div>

                {/* centre */}
                <div className="browser__msn-center">

                    <div className="browser__msn-shortcuts">
                        {m.shortcuts.map((s, i) => (
                            <span key={i} className={'link' + (s.orange ? ' is-orange' : '')}>{s.label}</span>
                        ))}
                    </div>

                    <div className="browser__msn-feature">
                        <div className="browser__msn-feature-title" onClick={onOpenNews}>
                            {m.feature.title}
                        </div>
                        <div className="browser__msn-feature-row">
                            <div>
                                <div className="browser__msn-feature-img">
                                    <img src={m.feature.image.src} alt="" />
                                    <div className="browser__msn-feature-img-credit">{m.feature.image.credit}</div>
                                </div>
                                <div className="browser__msn-feature-caption">{m.feature.image.caption}</div>
                            </div>
                            <div className="browser__msn-feature-also">
                                <h3>{m.feature.alsoTitle}</h3>
                                <ul>
                                    {m.feature.alsoList.map((l, i) => (
                                        <li key={i}><span className="link">{l}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="browser__msn-connect">
                        <div className="browser__msn-connect-list">
                            <h3>{m.connect.title}</h3>
                            <ul>
                                {m.connect.list.map((l, i) => (
                                    <li key={i}><span className="link">{l}</span></li>
                                ))}
                            </ul>
                        </div>
                        <div className="browser__msn-connect-side">
                            <div className="browser__msn-connect-side-img">
                                <img src={m.connect.side.img} alt="" />
                                <div className="browser__msn-connect-side-img-credit">{m.connect.side.credit}</div>
                            </div>
                            <span className="browser__msn-connect-side-label">
                                {m.connect.side.label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* droite : message center */}
                <div className="browser__msn-msgcenter">
                    <h2>{m.messageCenter.title}</h2>
                    <label>{m.messageCenter.emailLabel}</label>
                    <label>{m.messageCenter.userLabel}</label>
                    <input value={hotmailUser} onChange={e => setHotmailUser(e.target.value)} />
                    <label>{m.messageCenter.passLabel}</label>
                    <input type="password" value={hotmailPass} onChange={e => setHotmailPass(e.target.value)} />
                    <div className="browser__msn-msgcenter-actions">
                        <button>go</button>
                    </div>
                    <span className="browser__msn-msgcenter-link">{m.messageCenter.signupLabel}</span>

                    <h3>{m.messageCenter.peopleTitle}</h3>
                    {m.messageCenter.peopleLinks.map((l, i) => (
                        <span key={i} className="browser__msn-msgcenter-link">{l}</span>
                    ))}
                </div>
            </div>

            {/* BAND 6 : help */}
            <div className="browser__msn-help">{m.helpLabel}</div>

            {/* BAND 7 : footer */}
            <div className="browser__msn-footer">
                {m.footerBlocks.map((b, i) => (
                    <div key={i} className="browser__msn-footer-block">
                        <div className="browser__msn-footer-block-hd">{b.head}</div>
                        <div className="browser__msn-footer-block-body">
                            {b.h4 && <h4>{b.h4}</h4>}
                            {b.items && (
                                <ul>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                            )}
                            {b.links && b.links.map((l, j) => (
                                <span key={j} className="link">{l}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function FakeGoogleNoResult({ query, onSearch }) {
    const [q, setQ] = useState(query)
    useEffect(() => { setQ(query) }, [query])
    const submit = () => { if (q.trim()) onSearch(q) }
    const gr = searchData.googleResults
    const nr = searchData.noResult
    return (
        <div className="browser__gresults">
            <div className="browser__gresults-header">
                <div className="browser__gresults-logo">
                    {gr.header.logo.map((l, i) => (
                        <span key={i} style={{ color: l.color }}>{l.letter}</span>
                    ))}
                </div>
                <div className="browser__gresults-searchline">
                    <input
                        className="browser__gresults-input"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && submit()}
                    />
                    <button className="browser__gresults-btn" onClick={submit}>{gr.submitLabel}</button>
                </div>
            </div>
            <div className="browser__gresults-count">
                Votre recherche - <b>{query}</b> - n&apos;a produit aucun document.
            </div>
            <div className="browser__gresults-empty">
                <p>{nr.suggestionsTitle}</p>
                <ul>
                    {nr.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </div>
        </div>
    )
}

function FakeWikipedia({ onLogoClick }) {
    const w = wikiData
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    return (
        <div className="browser__wiki">
            <div className="browser__wiki-header">
                <div className="browser__wiki-logo" onClick={onLogoClick} title={w.header.logo.title}>
                    <div className="browser__wiki-logo-ball">
                        <img src={w.header.logo.src} alt={w.header.logo.alt} />
                    </div>
                    <div className="browser__wiki-logo-text">
                        <strong>{w.header.logo.name}</strong>
                        <small>{w.header.logo.tagline}</small>
                    </div>
                </div>
                <div className="browser__wiki-nav">
                    {w.header.nav.map((n, i) => <span key={i}>{n}</span>)}
                </div>
            </div>
            <div className="browser__wiki-body">
                <div className="browser__wiki-sidebar">
                    {w.sidebar.map((s, i) => (
                        <div key={i} className="browser__wiki-sidebar-section">
                            <strong>{s.title}</strong>
                            <ul>{s.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                        </div>
                    ))}
                </div>
                <div className="browser__wiki-content">
                    <h1 className="browser__wiki-title">{w.title}</h1>
                    <div className="browser__wiki-subtitle" dangerouslySetInnerHTML={{ __html: w.subtitleHtml }} />
                    <div className="browser__wiki-notice" dangerouslySetInnerHTML={{ __html: w.noticeHtml }} />
                    <div className="browser__wiki-infobox">
                        <div className="browser__wiki-infobox-title">{w.infobox.title}</div>
                        <div className="browser__wiki-infobox-img">
                            <img src={w.infobox.image.src} alt={w.infobox.image.alt} onError={e => { e.target.style.display = 'none' }} />
                            <small>{w.infobox.image.credit}</small>
                        </div>
                        <table className="browser__wiki-infobox-table">
                            <tbody>
                                {w.infobox.rows.map(([k, v], i) => (
                                    <tr key={i}><th>{k}</th><td>{v}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {w.introParagraphs.map((p, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                    <div className="browser__wiki-toc">
                        <div className="browser__wiki-toc-title">{w.toc.title}</div>
                        <ol>
                            {w.toc.items.map((item, i) => (
                                <li key={i}>
                                    <span
                                        className="browser__wiki-link"
                                        onClick={() => scrollTo(item.id)}
                                        dangerouslySetInnerHTML={{ __html: item.labelHtml }}
                                    />
                                    {item.children && (
                                        <ol>
                                            {item.children.map((c, j) => (
                                                <li key={j}>
                                                    <span
                                                        className="browser__wiki-link"
                                                        onClick={() => scrollTo(c.id)}
                                                        dangerouslySetInnerHTML={{ __html: c.labelHtml }}
                                                    />
                                                </li>
                                            ))}
                                        </ol>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                    {w.sections.map((s, i) => {
                        const HeadingTag = s.level === 2 ? 'h2' : 'h3'
                        const headingClass = s.level === 2 ? 'browser__wiki-h2' : 'browser__wiki-h3'
                        return (
                            <div key={i}>
                                <HeadingTag id={s.id} className={headingClass} dangerouslySetInnerHTML={{ __html: s.titleHtml }} />
                                {s.paragraphs && s.paragraphs.map((p, j) => (
                                    <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                                {s.list && (
                                    <ul className="browser__wiki-list">
                                        {s.list.map((li, j) => (
                                            <li key={j} dangerouslySetInnerHTML={{ __html: li }} />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )
                    })}
                    <div className="browser__wiki-references">
                        <h2 id={w.references.id} className="browser__wiki-h2">{w.references.title}</h2>
                        <ol className="browser__wiki-ref-list">
                            {w.references.items.map((r, i) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: r }} />
                            ))}
                        </ol>
                    </div>
                    <div className="browser__wiki-categories">
                        <strong>Catégories :</strong>
                        {w.categories.map((c, i) => (
                            <span key={i}>
                                <span className="browser__wiki-link">{c}</span>
                                {i < w.categories.length - 1 && ' • '}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function KonamiOverlay({ onDismiss }) {
    const k = secretData.konami
    return (
        <div className="browser__konami" onClick={onDismiss}>
            <div className="browser__konami-static" />
            <div className="browser__konami-content">
                <div className="browser__konami-glitch" data-text={k.title}>
                    {k.title}
                </div>
                <div className="browser__konami-body">
                    {k.lines.map((line, i) => (
                        <p key={i}>
                            {line.text}
                            {line.highlight && <span className="browser__konami-hi">{line.highlight}</span>}
                            {line.red && <span className="browser__konami-red">{line.red}</span>}
                        </p>
                    ))}
                    <p className="browser__konami-dismiss">{k.dismissLabel}</p>
                </div>
            </div>
        </div>
    )
}

// ── ActuNet News ──────────────────────────────────────────────────

const NEWS_DATE = newsData.date
const TICKER_ITEMS = newsData.tickerItems
const NEWS_ARTICLES = newsData.articles
const NEWS_BRIEFS = newsData.briefs
const TICKER_STR = TICKER_ITEMS.join('  ◆  ') + '  ◆  '

function FakeNewsPortal() {
    const [activeArticle, setActiveArticle] = useState(null)

    if (activeArticle) {
        return (
            <div className="browser__news-art">
                <div className="browser__news-art-bar">
                    <button className="browser__news-back" onClick={() => setActiveArticle(null)}>
                        « Retour aux actualités
                    </button>
                    <span className="browser__news-art-cat" style={{ color: activeArticle.catColor }}>
                        {activeArticle.category}
                    </span>
                </div>
                <div className="browser__news-art-body">
                    <div className="browser__news-art-meta">
                        {activeArticle.date} &nbsp;|&nbsp; ActuNet Actualités
                    </div>
                    <h1 className="browser__news-art-title">{activeArticle.headline}</h1>
                    <p className="browser__news-art-lead">{activeArticle.summary}</p>
                    <hr className="browser__news-hr" />
                    {activeArticle.paragraphs.map((p, i) => (
                        <p key={i} className="browser__news-art-p">{p}</p>
                    ))}
                    <div className="browser__news-art-foot">
                        <span dangerouslySetInnerHTML={{ __html: newsData.articleFooterHtml }} />
                        {newsData.articleFooterLinks.map((l, i) => (
                            <span key={i}>
                                <span className="browser__news-link">{l}</span>
                                {i < newsData.articleFooterLinks.length - 1 && ' u00A0|u00A0 '}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const featured  = NEWS_ARTICLES[0]
    const secondary = NEWS_ARTICLES.slice(1, 3)
    const rest      = NEWS_ARTICLES.slice(3)

    return (
        <div className="browser__news">
            <div className="browser__news-header">
                <div className="browser__news-logo">
                    <span className="browser__news-logo-a">Actu</span>
                    <span className="browser__news-logo-b">Net</span>
                    <span className="browser__news-logo-tag">Actualités</span>
                </div>
                <div className="browser__news-header-r">
                    <span className="browser__news-datestr">{NEWS_DATE}</span>
                    <div className="browser__news-search">
                        <input className="browser__news-search-input" placeholder="Rechercher…" readOnly />
                        <button className="browser__news-search-btn">OK</button>
                    </div>
                </div>
            </div>

            <div className="browser__news-nav">
                {newsData.nav.map((c, i) => (
                    <span key={c} className="browser__news-nav-item">
                        {i > 0 && <span className="browser__news-nav-sep">|</span>}
                        {c}
                    </span>
                ))}
            </div>

            <div className="browser__news-ticker">
                <span className="browser__news-ticker-label">FLASH</span>
                <div className="browser__news-ticker-wrap">
                    <span className="browser__news-ticker-track">
                        {TICKER_STR}{TICKER_STR}
                    </span>
                </div>
            </div>

            <div className="browser__news-body">

                <div className="browser__news-sidebar">
                    <div className="browser__news-sb-section">
                        <div className="browser__news-sb-title">RUBRIQUES</div>
                        {newsData.sidebarCategories.map(c => (
                            <div key={c} className="browser__news-sb-link">{c}</div>
                        ))}
                    </div>
                    <div className="browser__news-sb-section">
                        <div className="browser__news-sb-title">MÉTÉO</div>
                        <div className="browser__news-weather">
                            <div className="browser__news-weather-city">{newsData.weather.city}</div>
                            <div className="browser__news-weather-temp">{newsData.weather.temp}</div>
                            <div className="browser__news-weather-desc">{newsData.weather.desc}</div>
                        </div>
                    </div>
                    <div className="browser__news-sb-section">
                        <div className="browser__news-sb-title">EN BREF</div>
                        {NEWS_BRIEFS.map((b, i) => (
                            <div key={i} className="browser__news-brief">{b}</div>
                        ))}
                    </div>
                    <div className="browser__news-ad">
                        <div>{newsData.ad.label}</div>
                        <strong>{newsData.ad.title}</strong>
                        {newsData.ad.lines.map((l, i) => <div key={i}>{l}</div>)}
                    </div>
                </div>

                <div className="browser__news-main">
                    <div className="browser__news-featured">
                        <span className="browser__news-catbadge" style={{ background: featured.catColor }}>
                            {featured.category}
                        </span>
                        <h2
                            className="browser__news-feat-title browser__news-link"
                            onClick={() => setActiveArticle(featured)}
                        >
                            {featured.headline}
                        </h2>
                        <div className="browser__news-feat-meta">{featured.date}</div>
                        <p className="browser__news-feat-summary">{featured.summary}</p>
                        <span className="browser__news-readmore browser__news-link" onClick={() => setActiveArticle(featured)}>
                            Lire la suite ›
                        </span>
                    </div>

                    <hr className="browser__news-hr" />
                    <div className="browser__news-section-hd">ACTUALITÉS RÉCENTES</div>

                    <div className="browser__news-grid">
                        {secondary.map(art => (
                            <div key={art.id} className="browser__news-card">
                                <div className="browser__news-card-cat" style={{ color: art.catColor }}>
                                    [{art.category}]
                                </div>
                                <div
                                    className="browser__news-card-title browser__news-link"
                                    onClick={() => setActiveArticle(art)}
                                >
                                    {art.headline}
                                </div>
                                <div className="browser__news-card-meta">{art.date}</div>
                                <p className="browser__news-card-sum">{art.summary}</p>
                                <span className="browser__news-readmore browser__news-link" onClick={() => setActiveArticle(art)}>
                                    Lire ›
                                </span>
                            </div>
                        ))}
                    </div>

                    <hr className="browser__news-hr" />
                    <div className="browser__news-section-hd">AUTRES ARTICLES</div>

                    <div className="browser__news-list">
                        {rest.map(art => (
                            <div key={art.id} className="browser__news-listitem">
                                <span className="browser__news-card-cat" style={{ color: art.catColor }}>
                                    [{art.category}]
                                </span>{' '}
                                <span
                                    className="browser__news-link"
                                    onClick={() => setActiveArticle(art)}
                                >
                                    {art.headline}
                                </span>
                                <span className="browser__news-listitem-date"> — {art.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="browser__news-footer">
                {newsData.footer}
                <br />
                <small>{newsData.footerSmall}</small>
            </div>
        </div>
    )
}

// ── Browser ──────────────────────────────────────────────────────

export default function Browser() {
    const [openedTabs, setOpenedTabs] = useState(['google'])
    const [activeTab, setActiveTab] = useState('google')
    const [secretTabVisible, setSecretTabVisible] = useState(false)
    const [addressValue, setAddressValue] = useState(TAB_DEFS.google.url)
    const [glitching, setGlitching] = useState(false)
    const [logoClicks, setLogoClicks] = useState(0)
    const [konamiIdx, setKonamiIdx] = useState(0)
    const [showKonami, setShowKonami] = useState(false)
    const [contentMode, setContentMode] = useState('normal')
    const [glitchQuery, setGlitchQuery] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchTopic, setSearchTopic] = useState(null)
    const [status, setStatus] = useState('Terminé')
    const [addressSaved, setAddressSaved] = useState('')

    const handleAddressFocus = () => {
        setAddressSaved(addressValue)
        setAddressValue('')
    }
    const handleAddressBlur = () => {
        if (!addressValue.trim()) setAddressValue(addressSaved)
    }

    const tabs = [
        ...openedTabs.map(id => TAB_DEFS[id]),
        ...(secretTabVisible ? [secretData.secretTab] : []),
    ]

    const openTab = useCallback((id) => {
        setOpenedTabs(prev => (prev.includes(id) ? prev : [...prev, id]))
    }, [])

    const closeTab = (id) => {
        if (id === 'google') return
        if (id === 'secret') {
            setSecretTabVisible(false)
        } else {
            setOpenedTabs(prev => prev.filter(t => t !== id))
        }
        if (activeTab === id) {
            setActiveTab('google')
            setAddressValue(TAB_DEFS.google.url)
            setContentMode('normal')
        }
    }

    // ── Konami ─────────────────────────────────────────────────────
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === KONAMI[konamiIdx]) {
                const next = konamiIdx + 1
                if (next === KONAMI.length) {
                    setShowKonami(true)
                    setKonamiIdx(0)
                } else {
                    setKonamiIdx(next)
                }
            } else {
                setKonamiIdx(e.key === KONAMI[0] ? 1 : 0)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [konamiIdx])

    // ── Glitch helper ──────────────────────────────────────────────
    const triggerGlitch = useCallback((cb) => {
        setGlitching(true)
        setStatus('Chargement...')
        setTimeout(() => {
            setGlitching(false)
            setStatus('Terminé')
            cb()
        }, 650)
    }, [])

    // ── Navigation barre d'adresse ─────────────────────────────────
    const normalizeUrl = (s) =>
        s.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '')

    const navigate = useCallback((raw) => {
        const trimmedLow = raw.trim().toLowerCase()
        const norm = normalizeUrl(raw)
        triggerGlitch(() => {
            if (SECRET_URLS.includes(trimmedLow)) {
                setSecretTabVisible(true)
                setActiveTab('secret')
                setAddressValue('isen://core')
                setContentMode('normal')
                return
            }
            const tabId = EXACT_URL_MAP[norm]
            if (tabId) {
                openTab(tabId)
                setActiveTab(tabId)
                setContentMode('normal')
                setAddressValue(TAB_DEFS[tabId].url)
                return
            }
            const topic = matchTopic(raw)
            openTab('google')
            setActiveTab('google')
            setSearchQuery(raw)
            setSearchTopic(topic)
            setContentMode(topic ? 'google-results' : 'google-noresult')
            setAddressValue(
                `http://www.google.jp/search?q=${encodeURIComponent(raw).replace(/%20/g, '+')}`
            )
        })
    }, [triggerGlitch, openTab])

    // ── Logo ⊙ clics (×3 = onglet secret) ─────────────────────────
    const handleLogoClick = () => {
        const count = logoClicks + 1
        setLogoClicks(count)
        if (count >= 3) {
            setLogoClicks(0)
            triggerGlitch(() => {
                setSecretTabVisible(true)
                setActiveTab('secret')
                setAddressValue('isen://core')
                setContentMode('normal')
            })
        }
    }

    // ── Recherche "normale" ────────────────────────────────────────
    const handleNormalSearch = (query, topic) => {
        triggerGlitch(() => {
            setSearchQuery(query)
            setSearchTopic(topic)
            setContentMode(topic ? 'google-results' : 'google-noresult')
        })
    }

    // ── Recherche secrète ───────────────────────────────────
    const handleSecretSearch = (query) => {
        triggerGlitch(() => {
            setGlitchQuery(query)
            setContentMode('glitch-search')
        })
    }

    // ── Clic sur un résultat réel ──────────────────────────────────
    const handleResultClick = (targetUrl) => {
        navigate(targetUrl)
    }

    // ── Ouverture onglet ActuNet depuis MSN ────────────────────────
    const handleOpenNews = () => {
        triggerGlitch(() => {
            openTab('news')
            setActiveTab('news')
            setContentMode('normal')
            setAddressValue(TAB_DEFS.news.url)
        })
    }

    // ── Changement d'onglet ────────────────────────────────────────
    const handleTabChange = (id) => {
        const tab = tabs.find(t => t.id === id)
        if (!tab) return
        setActiveTab(id)
        setAddressValue(tab.url)
        setContentMode('normal')
    }

    // ── Rendu contenu ──────────────────────────────────────────────
    const renderContent = () => {
        if (contentMode === 'glitch-search')
            return <GlitchSearch query={glitchQuery} />
        if (contentMode === 'google-results' && searchTopic)
            return <FakeGoogleResults topic={searchTopic} query={searchQuery} onResultClick={handleResultClick} onSearch={navigate} />
        if (contentMode === 'google-noresult')
            return <FakeGoogleNoResult query={searchQuery} onSearch={navigate} />
        if (activeTab === 'secret')
            return <SecretPage />
        if (activeTab === 'wiki')
            return <FakeWikipedia onLogoClick={handleLogoClick} />
        if (activeTab === 'news')
            return <FakeNewsPortal />
        return (
            <FakeMSN
                onNormalSearch={handleNormalSearch}
                onSecretSearch={handleSecretSearch}
                onOpenNews={handleOpenNews}
            />
        )
    }

    return (
        <div className={`browser${glitching ? ' browser--glitching' : ''}`}>
            {showKonami && <KonamiOverlay onDismiss={() => setShowKonami(false)} />}

            <div className="browser__navbar">
                <div className="browser__nav-btns">
                    <button className="browser__nav-btn" title="Précédent"
                        onClick={() => { setContentMode('normal'); setActiveTab('google'); setAddressValue(TAB_DEFS.google.url) }}>◄</button>
                    <button className="browser__nav-btn" title="Suivant">►</button>
                    <button className="browser__nav-btn browser__nav-btn--stop" title="Arrêter">✕</button>
                    <button className="browser__nav-btn" title="Actualiser" onClick={() => navigate(addressValue)}>↺</button>
                    <button className="browser__nav-btn" title="Accueil" onClick={() => handleTabChange('google')}>🏠</button>
                </div>
                <div className="browser__address-bar">
                    <span className="browser__address-label">Adresse</span>
                    <div className="browser__address-input">
                        <img src={IE_ICON} alt="" className="browser__address-icon" />
                        <input
                            type="text"
                            className="browser__address-text"
                            value={addressValue}
                            onChange={e => setAddressValue(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && navigate(addressValue)}
                            onFocus={handleAddressFocus}
                            onBlur={handleAddressBlur}
                            spellCheck={false}
                        />
                    </div>
                    <button className="browser__address-go" onClick={() => navigate(addressValue)}>OK</button>
                </div>
            </div>

            <div className="browser__tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={[
                            'browser__tab',
                            activeTab === tab.id && contentMode !== 'glitch-search' ? 'browser__tab--active' : '',
                            tab.id === 'secret' ? 'browser__tab--secret' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => handleTabChange(tab.id)}
                        data-testid={`tab-${tab.id}`}
                    >
                        <span className="browser__tab-icon"><img src={tab.icon} alt="" /></span>
                        <span className="browser__tab-label">{tab.label}</span>
                        {tab.id !== 'google' && (
                            <span
                                className="browser__tab-close"
                                role="button"
                                aria-label="Fermer l'onglet"
                                title="Fermer"
                                onClick={(e) => { e.stopPropagation(); closeTab(tab.id) }}
                                data-testid={`tab-close-${tab.id}`}
                            >
                                <span>✕</span>
                            </span>
                        )}
                    </button>
                ))}
                <div className="browser__tabs-fill" />
            </div>

            <div className={`browser__content${glitching ? ' browser__content--glitch' : ''}`}>
                {renderContent()}
            </div>

            <div className="browser__statusbar">
                <span>{status}</span>
                <div className="browser__statusbar-right">
                    <img src={IE_ICON} alt="IE" style={{ width: 14, height: 14 }} />
                    <span>Zone Internet</span>
                </div>
            </div>
        </div>
    )
}