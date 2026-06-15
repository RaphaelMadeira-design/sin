import { useState, useEffect, useCallback } from 'react'
import '../styles/Browser.scss'

const IE_ICON = 'https://win98icons.alexmeub.com/icons/png/search_web-0.png'
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const SECRET_SEARCHES = ['résonance', 'resonance', 'éveil', 'eveil', 'mémoire', 'memoire', 'fréquence', 'frequence', '528', 'raphurst', 'academia', 'académie']
const SECRET_URLS = ['isen://core', 'isen://secret', 'about:isen', 'isen://memories']

// ── Pages secrètes ───────────────────────────────────────────────

const FRAGMENTS = [
    { text: '> CONNEXION ÉTABLIE — PROTOCOLE SHOKAN NO KISHI v0.0.1', cmd: true, delay: 0 },
    { text: '> Chargement CORE_DUMP.exe...', cmd: true, delay: 280 },
    { text: '> Lecture des fragments mémoire...', cmd: true, delay: 560 },
    { text: '', delay: 840 },
    { text: ' [FRAGMENT #001] ████████████████████ [CORROMPU]', frag: true, delay: 1120 },
    { text: ' [FRAGMENT #002] "...ils ne savent pas ce que j\'ai perçu ce soir-là.', frag: true, delay: 1400 },
    { text: ' [FRAGMENT #003] ████████████ [DATE EFFACÉE]', frag: true, delay: 1680 },
    { text: ' [FRAGMENT #004] "ils étaient là avant moi. avant nous tous."', frag: true, delay: 1960 },
    { text: ' [FRAGMENT #005] ████ [ACCÈS REFUSÉ — NIVEAU 5]', frag: true, delay: 2240 },
    { text: ' [FRAGMENT #006] "Pas une simple présence. Un présage."', frag: true, delay: 2520 },
    { text: '', delay: 2800 },
    { text: '> COORDONNÉES : 34.9876° N, 135.7553° E', cmd: true, delay: 3080 },
    { text: '> FRÉQUENCE MÉMORIELLE : [NON DOCUMENTÉE]', cmd: true, delay: 3360 },
    { text: '> STATUT ACTUEL : ACTIF / [INDÉTERMINÉ]', cmd: true, delay: 3640 },
    { text: '', delay: 3920 },
    { text: '> Fin du dump. Connexion fermée.', cmd: true, delay: 4200 },
    { text: '> Tu n\'aurais pas dû trouver ça.', cmd: true, warn: true, delay: 4480 },
]

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
    return (
        <div className="browser__glitch-search">
            <div className="browser__glitch-header">
                <span className="browser__glitch-logo">
                    <span style={{ color: '#4285F4' }}>G</span>
                    <span style={{ color: '#EA4335' }}>o</span>
                    <span style={{ color: '#FBBC05' }}>o</span>
                    <span style={{ color: '#4285F4' }}>g</span>
                    <span style={{ color: '#34A853' }}>l</span>
                    <span style={{ color: '#EA4335' }}>e</span>
                </span>
                <div className="browser__glitch-query-bar">
                    <span>{query}</span>
                </div>
            </div>
            <div className="browser__glitch-count">
                Environ <b>██████</b> résultats (<b>█.██</b> secondes)
            </div>
            <div className="browser__glitch-results">
                <div className="browser__glitch-result">
                    <span className="browser__glitch-result-title browser-glitch-text" data-text="isen-hata.████ — Dossier [CLASSIFIÉ]">
                        isen-hata.████ — Dossier [CLASSIFIÉ]
                    </span>
                    <div className="browser__glitch-result-url">http://www.isen-hata.██████.jp/core</div>
                    <p className="browser__glitch-result-desc">
                        Sujet actif. Classe ??? détectée. Fréquence d'émission : 528 Hz. Rapport incident #00x7 — [suite inaccessible]. Ne pas distribuer.
                    </p>
                </div>
                <div className="browser__glitch-result">
                    <span className="browser__glitch-result-title browser-glitch-text" data-text="Archives de l'Éveil — Incident #00x7">
                        Archives de l'Éveil — Incident #00x7
                    </span>
                    <div className="browser__glitch-result-url">http://archives-████████.gouv.jp/7</div>
                    <p className="browser__glitch-result-desc">
                        ...sujet a manifesté une résonance active sans précédent... données corrompues à 23h47... connexion perdue... ne pas approcher sans équipement...
                    </p>
                </div>
                <div className="browser__glitch-result browser__glitch-result--blocked">
                    <span className="browser__glitch-result-title">████████████ — [ACCÈS REFUSÉ]</span>
                    <div className="browser__glitch-result-url">isen://core</div>
                    <p className="browser__glitch-result-desc">
                        █████ ██ ████████ ████ ██████. Tu sais ce que tu cherches vraiment.
                    </p>
                </div>
            </div>
        </div>
    )
}

// ── Résultats de recherche Google « vintage » (fin 90's / 2000) ─────────

const WIKI_URL = 'https://jp.wikipedia.org/wiki/Isen_Hata'
const NEWS_URL = 'http://www.actunet-news.jp/'

const SEARCH_TOPICS = [
    {
        keys: ['isen hata', 'isen', 'hata', 'kōga', 'koga', 'croc écarlate', 'croc ecarlate'],
        displayQuery: 'Isen Hata',
        resultsCount: '2 340',
        seconds: '0,24',
        real: {
            title: 'Isen Hata — Wikipédia, l\'encyclopédie libre',
            url: 'jp.wikipedia.org/wiki/Isen_Hata',
            target: WIKI_URL,
            desc: "Isen Hata (五十嵐 伊勢), aussi appelé Kōga ou « Croc Écarlate », est un chevalier de rang E issu de la souche inférieure du clan Magaishi. Membre des Bunkyo City Bolts ...",
        },
        fakes: [
            { title: 'Isen_Koga (@isen_koga) — photos & messages', url: 'www.photoroll.jp/isen_koga', desc: 'Profil public — 412 photos, 89 abonnés. Dernier post : "training session, Bunkyo, 03h22". Aucun message depuis 11 jours.' },
            { title: 'Registre municipal de Tokyo — Hata, I.', url: 'www.tokyo.metro.jp/registre/hata-i', desc: 'Inscrit branche secondaire Magaishi. Dernière mise à jour partielle. Certaines lignes du recensement sont marquées « données retirées ».' },
            { title: 'Forum ParkourJP :: [Topic] Qui est vraiment "Kōga" ?', url: 'www.parkourjp.net/forum/viewtopic?t=88471', desc: '— …peu de tout, il a un style très versatile et il court comme s\'il connaissait le circuit depuis toujours. Perso, je ne crois pas une seconde au rang E.  |  34 réponses.' },
            { title: 'Shokan Index — "Dualité" [rang E]', url: 'shokan-index.org/E/dualite', desc: 'Manifestation semi-indépendante d\'énergie. Portée ≈ 4 m. Durée ≈ 1–2 s. Peu de données fiables.' },
            { title: 'Tokyo Skyrunner League — Classement 6089', url: 'skyrunner-league.jp/classement/6089', desc: '01. Tenku Striders — 114 pts  |  02. Bunkyo City Bolts — 112 pts  |  03. White Sparrows — 108 pts  |  04. Kanda Ravens — 104 pts ... Ligue officieuse, non affiliée à la fédération.' },
            { title: 'Hata (homonymie) — Wikipédia', url: 'jp.wikipedia.org/wiki/Hata_(homonymie)', desc: 'Page d\'homonymie : Hata peut désigner un patronyme japonais, une lignée du clan Magaishi, ou une région montagneuse de la préfecture de Niigata...' },
            { title: 'Recrutez un "Sakiba Hata" — AnnuairePro', url: 'www.annuairepro.jp/prestataire/sakiba-hata', desc: 'Plombier à Osaka, 41 ans. Aucun lien connu avec le membre du clan Magaishi du même nom. Note clients : 3,9 / 5.' },
            { title: 'Magaishi — Souches inférieures, liste indicative', url: 'www.clans-japon.jp/magaishi/souches-inferieures', desc: 'Ce document recense les lignées mineures rattachées au clan Magaishi. La ligne « Hata » y figure, bien que plusieurs entrées soient datées « [retirée] ».' },
        ],
    },
    {
        keys: ['actunet', 'actualités', 'actualites', 'actunet news'],
        displayQuery: 'ActuNet',
        resultsCount: '5 710',
        seconds: '0,18',
        real: {
            title: 'ActuNet Actualités — Toutes les dépêches en direct',
            url: 'www.actunet-news.jp',
            target: NEWS_URL,
            desc: "Portail d'information : Japon, Monde, Faits divers, Sports, Sciences. Édition quotidienne depuis 6078. Ticker en continu, édition du jour...",
        },
        fakes: [
            { title: 'ActuNet — Pages Jaunes Internet', url: 'www.pj-internet.jp/annuaire/a/actunet', desc: 'Référencement officiel du portail ActuNet. Catégorie : Presse en ligne / Information générale. Siège : Tokyo - Arakawa' },
            { title: 'ActuNet Pro — hébergement web dès 2000¥/mois', url: 'www.actunet-pro.jp/hebergement', desc: 'Offres d\'hébergement mutualisé, nom de domaine .jp inclus, support FTP. Ne concerne pas le portail ActuNet Actualités.' },
            { title: 'Fédération de presse numérique — membre : ActuNet', url: 'www.fpn.jp/membres/actunet', desc: 'Fiche associative — ActuNet Actualités (JP). Rédacteur en chef : [données protégées].' },
            { title: '"Pourquoi ActuNet a retiré son article ?" — Forum Médias', url: 'www.forum-medias.jp/sujet/23418', desc: '— Quelqu\'un a sauvegardé l\'article sur le rapport #00x7 avant qu\'ils le suppriment ? Je le trouve plus nulle part.  |  12 réponses.' },
            { title: 'ActuNet : archives hebdomadaires (6070–6089)', url: 'archives.actunet-news.jp/6070-6089', desc: 'Accès aux numéros archivés. Certaines éditions de novembre 1999 sont manquantes : « édition non distribuée pour raisons indépendantes de notre volonté ».' },
            { title: 'ActuNet contre-attaque après une plainte anonyme', url: 'www.pressewatch.jp/actunet-plainte-anonyme', desc: 'Le portail d\'actualités maintient ses publications sur la Tokyo Skyrunner League, malgré une demande de retrait reçue début janvier 6089.' },
            { title: 'Webring ActuNet — sites partenaires', url: 'webring.actunet-news.jp/partenaires', desc: 'Liste des sites frères : Météo-Express, Sports-JP, Tech6079. Optimisé pour Internet Explorer 5.0 et Netscape Navigator 4.0.' },
            { title: 'Naomi Miyamoto (animatrice TV) — fiche biographique', url: 'www.stars-tv.jp/fiche/naomi-miyamoto', desc: 'Homonymie : Naomi Miyamoto animatrice d\'une émission régionale. Aucun lien avec le portail d\'information.' },
        ],
    },
    {
        keys: ['clan magaishi', 'magaishi', 'souche magaishi'],
        displayQuery: 'Clan Magaishi',
        resultsCount: '918',
        seconds: '0,31',
        real: {
            title: 'Clan Magaishi — mentionné sur la fiche Isen Hata (Wikipédia)',
            url: 'jp.wikipedia.org/wiki/Isen_Hata#Clan_Magaishi',
            target: WIKI_URL,
            desc: "Le clan Magaishi contrôle une grande partie de la métropole de Tokyo. La souche inférieure, dont est issue la branche Hata, est reléguée à des rôles de second plan...",
        },
        fakes: [
            { title: 'Clans de Tokyo — fiche administrative MAGAISHI', url: 'www.tokyo.metro.jp/clans/magaishi', desc: 'Fiche officielle — Territoire : arrondissements de Bunkyo, Toshima, partie de Shinjuku. Porte-parole : [non divulgué]. Statut juridique : reconnu.' },
            { title: 'Magaishi — Pages Jaunes des grandes familles', url: 'www.pj-familles.jp/magaishi', desc: 'Siège principal : immeuble Magaishi, Chiyoda, Tokyo. Téléphone : [masqué sur demande du déclarant].' },
            { title: 'Le blog de Ko — "J\'ai travaillé chez les Magaishi"', url: 'www.leblogdeko.jp/post/chez-les-magaishi', desc: '— On dit plein de choses, mais la vérité c\'est surtout un énorme système hiérarchique. Il y a beaucoup d\'inégalités au sein des différentes branches.' },
            { title: 'Rumeurs et "purges" dans les branches inférieures', url: 'www.forum-medias.jp/sujet/24011', desc: '— Trois noms qui ne figurent plus au recensement. Le clan nie tous les soupçons.  |  45 réponses.' },
            { title: 'Magaishi (clan) — fandom encyclopédique', url: 'fandom-clans.jp/wiki/Magaishi', desc: 'Article de fandom : hiérarchie, branches, symboles. Attention, nombreuses sections sont contestées / non sourcées.' },
            { title: 'Clan moderne ou traditionnel ? Le cas Magaishi', url: 'www.sociologie-japon.jp/essai/magaishi-moderne', desc: 'Essai universitaire (6080) comparant l\'organisation du clan Magaishi aux structures traditionnelles. Conclusion : modèle hybride, post-moderne.' },
            { title: 'Magaishi Zaibatsu. — dépôt de marque 5877', url: 'www.inpi.jp/marques/magaishi-zaibatsu', desc: 'Dépôt classes 9, 35, 41, 45. Statut : enregistrée. Signe distinctif associé : [Informations demandées].' },
            { title: 'Magaishi Shoten — boutique de thés traditionnels', url: 'www.magaishi-shoten.jp', desc: 'Homonymie : boutique de thé située à Kyoto, fondée en 6024. Aucun lien officiel connu avec le clan Magaishi de Tokyo.' },
        ],
    },
    {
        keys: ['tokyo skyrunner league', 'skyrunner league', 'skyrunner', 'skyrunner tokyo'],
        displayQuery: 'Tokyo Skyrunner League',
        resultsCount: '1 487',
        seconds: '0,27',
        real: {
            title: 'Tokyo Skyrunner League — la scène underground décryptée (ActuNet)',
            url: 'www.actunet-news.jp/culture/parkour-tokyo',
            target: NEWS_URL,
            desc: "Notre article culture consacré au parkour tokyoïte évoque longuement la compétition officieuse que les crews appellent « Tokyo Skyrunner League », et les raisons de son succès auprès des jeunes.",
        },
        fakes: [
            { title: 'Skyrunner League — communiqué FJP (fédération)', url: 'www.fjparkour.jp/communique/skyrunner', desc: 'La Fédération Japonaise de Parkour rappelle qu\'elle ne reconnaît aucune compétition appelée "Skyrunner League". Avis aux pratiquants.' },
            { title: 'Classement Tokyo Skyrunner League — 6089', url: 'skyrunner-league.jp/classement/6089', desc: '01. Bunkyo City Bolts  |  02. White Sparrows  |  03. Kanda Ravens  |  04. Tenku Striders  |  ... liste des 16 crews.' },
            { title: 'Parcours Nakano-Kōenji (vidéo amateur)', url: 'video-share.jp/v/82417', desc: 'Durée 04:12 — course de la 3ᵉ manche, vue d\'un toit voisin. Commentaires désactivés sur cette vidéo.' },
            { title: '"Silhouettes aux yeux ambrés" — on a vu la même chose', url: 'www.forum-medias.jp/sujet/24198', desc: '— Pas juste à Bunkyo. Ikebukuro aussi. Toujours en hauteur, toujours immobiles. Personne ne veut en parler officiellement.  |  88 réponses.' },
            { title: 'Ligue Skyrunner (Osaka) — à ne pas confondre', url: 'www.skyrunner-osaka.jp', desc: 'Championnat régional de course en montagne. Rien à voir avec la ligue de parkour de Tokyo. Calendrier 2000 disponible en ligne.' },
            { title: 'Skyrunner — définition (Kodansha en ligne)', url: 'www.kodansha.jp/dictionnaires/skyrunner', desc: 'Anglicisme : coureur s\'adonnant à la course verticale, urbaine ou montagnarde. Forme féminine : skyrunneuse.' },
            { title: 'Tokyo Skyrunner League — site officiel', url: 'skyrunner-league.jp', desc: 'Dates des prochaines manches, liste officielle des crews. Avertissement en pied de page : "la ligue décline toute responsabilité en cas d\'incident lors des courses".' },
            { title: 'Tokyo SKY Runner — marathon annuel (homonymie)', url: 'www.tokyo-sky-runner.jp', desc: 'Course caritative longue distance. Homonymie fréquente avec la ligue officieuse. Inscriptions ouvertes.' },
        ],
    },
    {
        keys: ['tenku striders', 'tenku', 'striders', 'kazuki kurogane'],
        displayQuery: 'Tenku Striders',
        resultsCount: '746',
        seconds: '0,22',
        real: {
            title: 'Tenku Striders — section dans l\'article Isen Hata (Wikipédia)',
            url: 'jp.wikipedia.org/wiki/Isen_Hata#Tenku_Striders',
            target: WIKI_URL,
            desc: "Le crew lycéen des Tenku Striders, mené par Kazuki Kurogane, est cité dans la biographie de Isen Hata — notamment pour sa rivalité historique avec les Bunkyo City Bolts.",
        },
        fakes: [
            { title: 'Tenku Striders — classement Skyrunner League', url: 'skyrunner-league.jp/crew/tenku-striders', desc: 'Position actuelle : 4ᵉ. Capitaine : T. Kurogane. Bilan saison : 2 victoires, 5 podiums, 1 disqualification.' },
            { title: 'Kazuki Kurogane — interview exclusive (parkourjp.net)', url: 'www.parkourjp.net/interviews/Kazuki-kurogane', desc: '"Je ne lis pas les articles d\'ActuNet. Ce qui s\'est passé au tournoi des Ura Ura Kidz ne regarde personne." — T. Kurogane, mars 6088.' },
            { title: 'Forum ParkourJP :: Tenku Striders, vrais champions ?', url: 'www.parkourjp.net/forum/viewtopic?t=90112', desc: '— Depuis qu\'ils ont recruté Kazuki, ils n\'ont plus gagné une seule fois contre les Bolts. Coïncidence ?  |  61 réponses.' },
            { title: 'Tenku Striders (manga) — tome 3 en librairie', url: 'www.librairie-manga.jp/tenku-striders-t3', desc: 'Manga en 5 tomes publié chez Éditions Tōkai. Aucun lien avec le crew réel, selon l\'éditeur.' },
            { title: 'Ura Ura Kidz → Tenku Striders : la bascule', url: 'archives.actunet-news.jp/sports/uraura-tenku', desc: 'Retour sur le tournoi décisif opposant les Ura Ura Kidz à la relève Tenku Striders. L\'article évoque la chute de Ryohei Nishikawa.' },
            { title: 'Skyrunner League — vidéo : Tenku vs Bolts, manche 2', url: 'video-share.jp/v/81006', desc: 'Durée 06:44 — passage au ralenti du virage contesté du 4ᵉ checkpoint. Vidéo signalée puis réactivée.' },
            { title: 'Tenku Striders — t-shirts & goodies officiels', url: 'www.shop-skyrunner.jp/tenku-striders', desc: 'Merchandising officiel : maillots (éditions printemps), casquettes, pochettes. Expédition Japon uniquement.' },
            { title: 'Pourquoi Kazuki esquive les interviews ?', url: 'www.forum-medias.jp/sujet/24350', desc: '— Il pète la forme sur les courses mais dès qu\'un micro arrive, il est pressé. Quelqu\'un a une théorie ?  |  39 réponses.' },
        ],
    },
    {
        keys: ['bunkyo city bolts', 'bunkyo bolts', 'bunkyo', 'city bolts', 'aoi kanzaki', 'hidemichi oyama', 'daigo kawamura'],
        displayQuery: 'Bunkyo City Bolts',
        resultsCount: '1 093',
        seconds: '0,19',
        real: {
            title: 'Bunkyo City Bolts — composition du crew (Wikipédia / fiche Isen Hata)',
            url: 'jp.wikipedia.org/wiki/Isen_Hata#Bunkyo_City_Bolts',
            target: WIKI_URL,
            desc: "Crew de parkour de l'arrondissement de Bunkyo. Membres : Isen Hata (Kōga), Aoi Kanzaki, Hidemichi Ōyama, Daigo Kawamura. Rivaux historiques des Tenku Striders.",
        },
        fakes: [
            { title: 'Bunkyo City Bolts — fiche crew officielle', url: 'skyrunner-league.jp/crew/bunkyo-city-bolts', desc: 'Leader : K. Hata. Palmarès 6089 : 1er au classement saison. Style : rapide, agressif, imprévisible. 4 titulaires + 0 remplaçants.' },
            { title: 'Bunkyo — quartier parkour par excellence (JP-Trip)', url: 'www.jp-trip.jp/guides/bunkyo-parkour', desc: 'Guide touristique : spots légaux, cafés fréquentés par les traceurs, meilleurs toits pour observer les courses nocturnes (à vos risques).' },
            { title: 'Aoi Kanzaki — "le cerveau des Bolts" (portrait)', url: 'www.actunet-news.jp/sports/aoi-kanzaki-portrait', desc: 'Portrait d\'Aoi Kanzaki, stratège du crew. Silencieuse en course, redoutable sur le tableau. Peu d\'apparitions publiques.' },
            { title: 'Hidemichi Ōyama — fiche physique / Skyrunner', url: 'skyrunner-league.jp/athlete/hidemichi-oyama', desc: 'Taille 1m94, 94 kg. Style : puissance, franchissement. Ne possède pas de Shokan documenté mais plusieurs témoignages contraires existent.' },
            { title: 'Daigo Kawamura — le plus rapide du nord de Tokyo', url: 'www.parkourjp.net/profils/daigo-kawamura', desc: 'Profil athlète : temps records sur checkpoints droits. Réputation sulfureuse : 2 disqualifications, 1 accrochage avec les White Sparrows.' },
            { title: 'Bunkyo City — mairie d\'arrondissement', url: 'www.city.bunkyo.lg.jp', desc: 'Site officiel de la mairie de Bunkyo. Nous ne commentons pas les événements liés à la "Tokyo Skyrunner League" (communiqué du 15/01/6089).' },
            { title: 'Bunkyo Bolts (équipe de football) — à ne pas confondre', url: 'www.foot-amateur-jp.jp/clubs/bunkyo-bolts', desc: 'Club amateur de football, division régionale. Saison 2000 : 3 victoires, 4 nuls, 2 défaites.' },
            { title: 'Bolts — agence de pub (homonymie)', url: 'www.bolts-agency.com', desc: 'Agence de communication numérique basée à Londres. Aucun rapport avec le crew de parkour japonais.' },
        ],
    },
    {
        keys: ['ryohei nishikawa', 'ryohei', 'nishikawa', 'disparition ryohei'],
        displayQuery: 'Ryohei Nishikawa',
        resultsCount: '3 821',
        seconds: '0,26',
        real: {
            title: 'Disparition d\'un étudiant de l\'Université de Tokyo (ActuNet)',
            url: 'www.actunet-news.jp/faits-divers/etudiant-todai-disparu',
            target: NEWS_URL,
            desc: "Notre article à la une évoque la disparition d'un jeune homme de 20 ans inscrit à l'Université de Tokyo, sans nouvelles depuis plus de deux mois. Plusieurs forums l'identifient — sans confirmation officielle — comme Ryohei Nishikawa.",
        },
        fakes: [
            { title: 'Ryohei Nishikawa — appel à témoins (police de Tokyo)', url: 'www.keishicho.metro.tokyo.jp/appel/nishikawa-r', desc: 'Homme, 19 ans, 1m82, dernier signalement : Bunkyo, 07/11/6089 vers 23h. Toute information peut être communiquée à la préfecture.' },
            { title: 'Ryohei Nishikawa (@ryo_nishi) — profil archivé', url: 'www.photoroll.jp/ryo_nishi', desc: 'Profil inactif depuis 68 jours. Dernier post : photo floue d\'un toit, légende "ils sont là, encore une fois". Commentaires désactivés.' },
            { title: 'Todai — communiqué du service des admissions', url: 'www.u-tokyo.ac.jp/communique/avr-6089', desc: "L'Université de Tokyo indique coopérer avec les autorités. Par respect pour la famille, aucune information personnelle concernant l'étudiant ne sera divulguée." },
            { title: 'Forum Bunkyo :: "Ryohei Nishikawa, quelqu\'un l\'a revu ?"', url: 'www.forum-bunkyo.jp/sujet/24457', desc: '— Des rumeurs de forum, rien de solide. Les médias généralistes ne citent pas son nom. ActuNet est le seul à évoquer l\'hypothèse, et encore, à demi-mot.  |  72 réponses.' },
            { title: 'Nishikawa (homonymie) — Wikipédia', url: 'jp.wikipedia.org/wiki/Nishikawa', desc: 'Page d\'homonymie : Nishikawa, patronyme japonais répandu. Aucune page individuelle dédiée à ce jour pour un « Ryohei Nishikawa ».' },
            { title: 'Famille Nishikawa : appel à la discrétion', url: 'www.actunet-news.jp/faits-divers/famille-nishikawa', desc: "La famille remercie les personnes mobilisées et demande que sa vie privée soit respectée pendant que l'enquête se poursuit." },
            { title: 'Ryohei Nishikawa (judoka) — à ne pas confondre', url: 'www.judojp.jp/athletes/ryohei-nishikawa', desc: 'Judoka vétéran de Nagoya, ceinture noire 5ᵉ dan. Aucun lien avec le jeune étudiant porté disparu à Tokyo.' },
            { title: 'Pétition en ligne — Relancer l\'enquête', url: 'www.petition-web.jp/nishikawa-rouvrir-enquete', desc: '14 218 signataires. Objectif : 20 000. Adressée à la préfecture de police de Tokyo et au bureau d\'enquêtes spéciales.' },
        ],
    },
]

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
    return (
        <div className="browser__gresults">
            <div className="browser__gresults-header">
                <div className="browser__gresults-logo">
                    <span style={{ color: '#0000cc' }}>G</span>
                    <span style={{ color: '#cc0000' }}>o</span>
                    <span style={{ color: '#cc9900' }}>o</span>
                    <span style={{ color: '#0000cc' }}>g</span>
                    <span style={{ color: '#339900' }}>l</span>
                    <span style={{ color: '#cc0000' }}>e</span>
                </div>
                <div className="browser__gresults-searchline">
                    <input
                        className="browser__gresults-input"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && submit()}
                    />
                    <button className="browser__gresults-btn" onClick={submit}>Recherche Google</button>
                </div>
            </div>
            <div className="browser__gresults-tabs">
                <span className="browser__gresults-tab browser__gresults-tab--active">Web</span>
                <span className="browser__gresults-tab">Images</span>
                <span className="browser__gresults-tab">Groupes</span>
                <span className="browser__gresults-tab">Annuaire</span>
                <span className="browser__gresults-tab">Actualités</span>
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
                    <span style={{ color: '#0000cc' }}>G</span>
                    <span style={{ color: '#cc0000' }}>o</span>
                    <span style={{ color: '#cc9900' }}>o</span>
                    <span style={{ color: '#cc9900' }}>o</span>
                    <span style={{ color: '#0000cc' }}>o</span>
                    <span style={{ color: '#339900' }}>o</span>
                    <span style={{ color: '#cc0000' }}>o</span>
                    <span style={{ color: '#0000cc' }}>g</span>
                    <span style={{ color: '#339900' }}>l</span>
                    <span style={{ color: '#cc0000' }}>e</span>
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
    return (
        <div className="browser__404">
            <div className="browser__404-header">
                <img src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png" alt="" />
                <h1>Impossible d'afficher la page</h1>
            </div>
            <div className="browser__404-body">
                <p>Internet Explorer ne peut pas afficher la page demandée.</p>
                <ul>
                    <li>Vérifiez l'adresse saisie : <em>{url}</em></li>
                    <li>Contactez l'administrateur réseau.</li>
                </ul>
                <div className="browser__404-code">Erreur HTTP 404 — Page introuvable</div>
            </div>
            <details className="browser__404-details">
                <summary>Informations techniques</summary>
                <pre className="browser__404-hidden">
{`// Accès non autorisé détecté.
// Vous n'étiez pas censé trouver cette page.
// Coordonnées archivées : 34.9876° N, 135.7553° E
// Fréquence de résonance : 528 Hz
// Ils savent que tu cherches.`}
                </pre>
            </details>
        </div>
    )
}

/* ──────────────────────────────────────────────────────────
   PAGE D'ACCUEIL — MSN.COM (style 1999-2000, en français)
   ────────────────────────────────────────────────────────── */

const MSN_TOP_NAV = [
    'Hotmail', 'Messagerie', 'Recherche Web', 'Shopping', 'Argent',
    'People & Chat', 'Passport',
]

const MSN_CHANNELS = [
    { color: '#FF6600', label: 'Achats en ligne' },
    { color: '#0066CC', label: 'Actualités' },
    { color: '#CC0066', label: 'Annuaire' },
    { color: '#FF9900', label: 'Automobile' },
    { color: '#009966', label: 'Cartes & Itinéraires' },
    { color: '#993366', label: 'Cinéma' },
    { color: '#FF6600', label: 'Communautés' },
    { color: '#0066CC', label: 'Découverte' },
    { color: '#CC0000', label: 'Emploi & Carrière' },
    { color: '#FF9900', label: 'Encarta' },
    { color: '#009966', label: 'Enchères' },
    { color: '#993366', label: 'Famille' },
    { color: '#FF6600', label: 'Finance' },
    { color: '#0066CC', label: 'Femmes' },
    { color: '#CC0066', label: 'Hotmail' },
    { color: '#FF9900', label: 'Jeux' },
    { color: '#009966', label: 'Jeunesse' },
    { color: '#993366', label: 'Loisirs' },
    { color: '#FF6600', label: 'Maison' },
    { color: '#0066CC', label: 'Messenger' },
    { color: '#CC0000', label: 'Musique' },
    { color: '#FF9900', label: 'Rencontres' },
    { color: '#009966', label: 'Santé' },
    { color: '#993366', label: 'Sports' },
    { color: '#FF6600', label: 'Tourisme & Voyages' },
    { color: '#0066CC', label: 'Villes & Régions' },
    { color: '#CC0066', label: 'Web Events' },
]

const MSN_HEADLINES = [
    { tag: 'À LA UNE', text: "Tokyo : un étudiant de la prestigieuse Todai porté disparu depuis plus de deux mois", openNews: true },
    { tag: 'FAITS DIVERS', text: "Harajuku — explosion d'un yatai en pleine soirée, huit blessés dont deux graves" },
    { tag: 'SCIENCES', text: "Yokohama : un implant neural promet la régénération des fibres nerveuses" },
    { tag: 'CULTURE', text: "Le parkour, discipline underground qui s'empare des toits de Tokyo" },
    { tag: 'MONDE', text: "Sommet de Genève : le Japon dévoile ses engagements climatiques pour 6095" },
]

const MSN_TODAY = [
    { title: "Horoscope du jour", desc: "Découvrez ce que les étoiles vous réservent en cette journée du 17 avril." },
    { title: "Soldes de printemps", desc: "Les meilleures affaires du moment sur MSN Shopping — livraison sous 7 jours." },
    { title: "Choisir son fournisseur d'accès", desc: "Notre comparatif des FAI au Japon : RTC vs Numéris vs ADSL." },
]

const MSN_SHOPPING = [
    'Livres', 'Disques & CD', 'Voyages', 'Électronique', 'Informatique',
    'Fleurs', 'Vêtements', 'Cadeaux',
]

const MSN_FOOTER_LINKS = [
    'À propos de MSN', 'Mentions légales', 'Confidentialité', 'Aide',
    'Plan du site', 'Annoncer sur MSN', 'Emplois MSN',
]

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

  const CATS = [
    'Autos', 'Business', 'Carrières', 'Informatique & Web', 'Divertissement',
    'Jeux', 'Santé', { label: 'Loisirs', isNew: true }, 'Maison & Prêts',
    { label: 'Guides locaux', isNew: true }, 'MSN Update', 'Actualités',
    'Finance perso', 'Radio & Vidéo', 'Recherche & École', 'Sports', 'Voyages', 'Femmes',
  ]

  return (
    <div className="browser__msn" data-testid="msn-home">

      {/* BAND 1 : logo + promo + date */}
      <div className="browser__msn-top">
        <div className="browser__msn-logo">
          <span className="browser__msn-logo-text">nsn</span>
          <span className="browser__msn-logo-sub">Nicrosoft®</span>
        </div>
        <div className="browser__msn-promo">
          Bénéficiez de <em>10€ de réduction</em> dès <em>30€ d'achat</em><br />
          cette saison sur <span className="link">wine.com</span>.
        </div>
        <div className="browser__msn-date">AVRIL <strong>17</strong></div>
      </div>

      {/* BAND 2 : barre bleue Search */}
      <div className="browser__msn-searchbar">
        <span className="browser__msn-searchbar-arrows">»</span>
        <span className="browser__msn-searchbar-label">
          <strong>RECHERCHER</strong> sur le Web
        </span>
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
        <span className="browser__msn-mainnav-item browser__msn-mainnav-item--active">Accueil</span>
        <span className="browser__msn-mainnav-item">Hotmail</span>
        <span className="browser__msn-mainnav-item">Recherche</span>
        <span className="browser__msn-mainnav-item">Shopping</span>
        <span className="browser__msn-mainnav-item">Argent</span>
        <span className="browser__msn-mainnav-item">People &amp; Chat</span>
        <div className="browser__msn-mainnav-spacer" />
        <div className="browser__msn-mainnav-passport">
          <em>Passport</em>
          <strong>Se connecter</strong>
        </div>
      </div>

      {/* BAND 4 : sous-nav bleue */}
      <div className="browser__msn-subnav">
        <div className="browser__msn-subnav-col">
          <span className="link">Téléchargement gratuit</span>
          <span className="link">MSN Messenger Service</span>
        </div>
        <div className="browser__msn-subnav-col">
          <span className="link">Personnaliser cette page</span>
          <span className="link">Obtenez ce que vous aimez</span>
        </div>
        <div className="browser__msn-subnav-ad" onClick={onOpenNews}>
          <span><strong>Envoyez des chocolats Godiva</strong><br />pour cette saison</span>
          <em>Cliquez ici</em>
        </div>
      </div>

      {/* BAND 5 : corps 3 colonnes */}
      <div className="browser__msn-body">

        {/* gauche : catégories */}
        <div className="browser__msn-cats">
          {CATS.map((c, i) => {
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
            <span className="link">Billets d'avion</span>
            <span className="link">Acheter musique</span>
            <span className="link">Jeux gratuits</span>
            <span className="link">Cartes</span>
            <span className="link is-orange">Enchères</span>
            <span className="link">Téléchargements</span>
            <span className="link">Se connecter</span>
            <span className="link">Cours boursiers</span>
            <span className="link">Acheter livres</span>
            <span className="link">Cartes virtuelles</span>
            <span className="link">Pages perso</span>
            <span className="link is-orange">Plus…</span>
          </div>

          <div className="browser__msn-feature">
            <div className="browser__msn-feature-title" onClick={onOpenNews}>
              À la une : Disparition d'un étudiant de Todai
            </div>
            <div className="browser__msn-feature-row">
              <div>
                <div className="browser__msn-feature-img">
                  <img
                    src="https://placehold.co/200x130/000040/ffffff?text=NASA"
                    alt=""
                  />
                  <div className="browser__msn-feature-img-credit">NASA</div>
                </div>
                <div className="browser__msn-feature-caption">Vue de Tokyo depuis l'espace</div>
              </div>
              <div className="browser__msn-feature-also">
                <h3>Aujourd'hui aussi</h3>
                <ul>
                  <li><span className="link">10 conseils fiscaux</span></li>
                  <li><span className="link">Ce que les hommes lisent</span></li>
                  <li><span className="link">Voyages hors saison</span></li>
                  <li><span className="link">Emmenez Barbie en voyage</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="browser__msn-connect">
            <div className="browser__msn-connect-list">
              <h3>Restez connecté</h3>
              <ul>
                <li><span className="link">Top téléphones sans fil</span></li>
                <li><span className="link">Anxiété en société ?</span></li>
                <li><span className="link">Envoyez une e-card</span></li>
              </ul>
            </div>
            <div className="browser__msn-connect-side">
              <div className="browser__msn-connect-side-img">
                <img src="https://placehold.co/80x100/dddddd/333333?text=•" alt="" />
                <div className="browser__msn-connect-side-img-credit">PhotoDisc</div>
              </div>
              <span className="browser__msn-connect-side-label">
                Guide de drague pour timides
              </span>
            </div>
          </div>
        </div>

        {/* droite : message center */}
        <div className="browser__msn-msgcenter">
          <h2>MESSAGE CENTER</h2>
          <label>E-mail</label>
          <label>Identifiant Hotmail :</label>
          <input value={hotmailUser} onChange={e => setHotmailUser(e.target.value)} />
          <label>Mot de passe :</label>
          <input type="password" value={hotmailPass} onChange={e => setHotmailPass(e.target.value)} />
          <div className="browser__msn-msgcenter-actions">
            <button>go</button>
          </div>
          <span className="browser__msn-msgcenter-link">Inscrivez-vous gratuitement</span>

          <h3>People &amp; Chat</h3>
          <span className="browser__msn-msgcenter-link">Créer une communauté</span>
          <span className="browser__msn-msgcenter-link">Communautés populaires</span>
          <span className="browser__msn-msgcenter-link">Lobby Emoticon Chat</span>
          <span className="browser__msn-msgcenter-link">Nouveautés du chat</span>
        </div>
      </div>

      {/* BAND 6 : help */}
      <div className="browser__msn-help">AIDE</div>

      {/* BAND 7 : footer */}
      <div className="browser__msn-footer">
        <div className="browser__msn-footer-block">
          <div className="browser__msn-footer-block-hd">Exclusivités MSN</div>
          <div className="browser__msn-footer-block-body">
            <h4>Envie de gratuit ?</h4>
            <span className="link">Trouvez-en plein ici</span>
          </div>
        </div>
        <div className="browser__msn-footer-block">
          <div className="browser__msn-footer-block-hd">Actualités</div>
          <div className="browser__msn-footer-block-body">
            <h4>MSNBC News</h4>
            <ul>
              <li>Sommet climatique de Genève — accord signé</li>
            </ul>
          </div>
        </div>
        <div className="browser__msn-footer-block">
          <div className="browser__msn-footer-block-hd">Recherche locale</div>
          <div className="browser__msn-footer-block-body">
            <span className="link">Pages jaunes</span>
            <span className="link">Pages blanches</span>
            <span className="link">Météo</span>
          </div>
        </div>
      </div>

    </div>
  )
}

function FakeGoogleNoResult({ query, onSearch }) {
    const [q, setQ] = useState(query)
    useEffect(() => { setQ(query) }, [query])
    const submit = () => { if (q.trim()) onSearch(q) }
    return (
        <div className="browser__gresults">
            <div className="browser__gresults-header">
                <div className="browser__gresults-logo">
                    <span style={{ color: '#0000cc' }}>G</span>
                    <span style={{ color: '#cc0000' }}>o</span>
                    <span style={{ color: '#cc9900' }}>o</span>
                    <span style={{ color: '#0000cc' }}>g</span>
                    <span style={{ color: '#339900' }}>l</span>
                    <span style={{ color: '#cc0000' }}>e</span>
                </div>
                <div className="browser__gresults-searchline">
                    <input
                        className="browser__gresults-input"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && submit()}
                    />
                    <button className="browser__gresults-btn" onClick={submit}>Recherche Google</button>
                </div>
            </div>
            <div className="browser__gresults-count">
                Votre recherche - <b>{query}</b> - n'a produit aucun document.
            </div>
            <div className="browser__gresults-empty">
                <p>Suggestions :</p>
                <ul>
                    <li>Vérifiez l'orthographe des termes recherchés.</li>
                    <li>Essayez des mots-clés différents.</li>
                    <li>Essayez des mots-clés plus généraux.</li>
                </ul>
            </div>
        </div>
    )
}

function FakeWikipedia({ onLogoClick }) {
    return (
        <div className="browser__wiki">
            <div className="browser__wiki-header">
                <div className="browser__wiki-logo" onClick={onLogoClick} title="Wikipédia ???">
                    <div className="browser__wiki-logo-ball">
                        <img src="/images/Wikipedia_logo.png" alt="Wikipedia" />
                    </div>
                    <div className="browser__wiki-logo-text">
                        <strong>Wikipédia</strong>
                        <small>L'encyclopédie libre</small>
                    </div>
                </div>
                <div className="browser__wiki-nav">
                    <span>Discussion</span>
                    <span>Modifier</span>
                    <span>Historique</span>
                </div>
            </div>
            <div className="browser__wiki-body">
                <div className="browser__wiki-sidebar">
                    <div className="browser__wiki-sidebar-section">
                        <strong>Navigation</strong>
                        <ul>
                            <li>Accueil</li>
                            <li>Portails thématiques</li>
                            <li>Article au hasard</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className="browser__wiki-sidebar-section">
                        <strong>Contribuer</strong>
                        <ul>
                            <li>Débuter sur Wikipédia</li>
                            <li>Aide</li>
                            <li>Communauté</li>
                        </ul>
                    </div>
                    <div className="browser__wiki-sidebar-section">
                        <strong>Outils</strong>
                        <ul>
                            <li>Pages liées</li>
                            <li>Suivi des pages liées</li>
                            <li>Importer un fichier</li>
                        </ul>
                    </div>
                </div>
                <div className="browser__wiki-content">
                    <h1 className="browser__wiki-title">Isen Hata</h1>
                    <div className="browser__wiki-subtitle">
                        <em>Cet article traite d'une personnalité publique. Pour d'autres usages, voir <span className="browser__wiki-link">Hata (homonymie)</span>.</em>
                    </div>
                    <div className="browser__wiki-notice">
                        <strong>Cet article est une ébauche concernant une personne physique.</strong> Vous pouvez partager vos connaissances en l'améliorant.
                    </div>
                    <div className="browser__wiki-infobox">
                        <div className="browser__wiki-infobox-title">Isen Hata</div>
                        <div className="browser__wiki-infobox-img">
                            <img src="/images/id.jpg" alt="Isen Hata" onError={e => { e.target.style.display = 'none' }} />
                            <small>Illustration par Pyr</small>
                        </div>
                        <table className="browser__wiki-infobox-table">
                            <tbody>
                                <tr><th>Nom complet</th><td>Isen Hata</td></tr>
                                <tr><th>Surnoms</th><td>Croc Écarlate, Kōga</td></tr>
                                <tr><th>Naissance</th><td>3 août 6070 (28 ans) (♊︎)</td></tr>
                                <tr><th>Sexe</th><td>Masculin ♂</td></tr>
                                <tr><th>Alignement</th><td>Neutre - Bon</td></tr>
                                <tr><th>Clan</th><td>Magaishi</td></tr>
                                <tr><th>Rôle</th><td>Membre</td></tr>
                                <tr><th>Shokan</th><td>Dualité</td></tr>
                                <tr><th>Type</th><td>Divers</td></tr>
                                <tr><th>Rang</th><td>E</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>Isen Hata</strong> (五十嵐 牙, <em>Hata Isen</em>), aussi appelé <strong>Kōga</strong> ou <strong>Croc Écarlate</strong>, est un <em>chevalier</em> de rang E. C'est un membre issu de la souche inférieure du clan <strong>Magaishi</strong>, qui contrôle une grande partie de la <em>métropole de Tokyo</em>. Affilié de second plan du fait de son jeune âge et de sa position au sein de la hiérarchie, il est peu impliqué dans les affaires officielles du clan et apparaît rarement dans les registres gouvernementaux qui y sont liés.
                    </p>
                    <p>Il est membre des <strong>Bunkyo City Bolts</strong>, un groupe de <em>parkour</em> très présent sur la scène locale et participant à de nombreuses compétitions dans la capitale, qu'ils ont remportées à plusieurs reprises. Ils alimentent une rivalité avec le fameux crew <strong>Tenku Striders</strong>.</p>
                    <div className="browser__wiki-toc">
                        <div className="browser__wiki-toc-title">Sommaire</div>
                        <ol>
                            <li>
                                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-apparence')?.scrollIntoView({ behavior: 'smooth' })}>Apparence</span>
                                <ol>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-physique')?.scrollIntoView({ behavior: 'smooth' })}>Physique</span></li>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-style')?.scrollIntoView({ behavior: 'smooth' })}>Style vestimentaire</span></li>
                                </ol>
                            </li>
                            <li>
                                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-personnalite')?.scrollIntoView({ behavior: 'smooth' })}>Personnalité</span>
                                <ol>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-temperament')?.scrollIntoView({ behavior: 'smooth' })}>Tempérament</span></li>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-qualites')?.scrollIntoView({ behavior: 'smooth' })}>Qualités et Défauts</span></li>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-desirs')?.scrollIntoView({ behavior: 'smooth' })}>Désirs et craintes</span></li>
                                </ol>
                            </li>
                            <li>
                                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-biographie')?.scrollIntoView({ behavior: 'smooth' })}>Biographie</span>
                                <ol>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-origine')?.scrollIntoView({ behavior: 'smooth' })}>Origine et famille</span></li>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-parkour')?.scrollIntoView({ behavior: 'smooth' })}>Découverte du parkour et les <em>Ura Ura Kidz</em></span></li>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-bunkyo')?.scrollIntoView({ behavior: 'smooth' })}><em>Bunkyo City Bolts</em> et la <em>Skyrunner League</em></span></li>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-disparition')?.scrollIntoView({ behavior: 'smooth' })}>Premier contact et disparition de Ryohei Nishikawa</span></li>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-present')?.scrollIntoView({ behavior: 'smooth' })}>Présent</span></li>
                                </ol>
                            </li>
                            <li>
                                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-aptitudes')?.scrollIntoView({ behavior: 'smooth' })}>Aptitudes et compétences</span>
                                <ol>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-competences')?.scrollIntoView({ behavior: 'smooth' })}>Compétences générales</span></li>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-combat')?.scrollIntoView({ behavior: 'smooth' })}>Style de combat</span></li>
                                    <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-shokan')?.scrollIntoView({ behavior: 'smooth' })}>Shokan</span></li>
                                </ol>
                            </li>
                            <li>
                                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-references')?.scrollIntoView({ behavior: 'smooth' })}>Références</span>
                            </li>
                        </ol>
                    </div>
                    <h2 id="wiki-apparence" className="browser__wiki-h2">Apparence</h2>
                    <h3 id="wiki-physique" className="browser__wiki-h3">Physique</h3>
                    <p>
                        Du haut de son mètre quatre-vingt (<em>1m80</em>) et pesant soixante-et-onze kilogrammes (<em>71kg</em>), Isen est un homme qui possède un physique plutôt banal. Ses cheveux carmins tirent légèrement vers un rouge brun et sont coiffés de manière naturelle, presque négligée avec des mèches désordonnées qui retombent sur son front sans jamais vraiment masquer ses yeux. Son visage est équilibré, aux traits nets mais assez doux. Ses yeux sont violets et dessinés en amande. Le grain de beauté sous son œil gauche attire subtilement l’attention et ajoute une petite signature visuelle qui casse la symétrie de son visage. Isen ne possède aucun tatouage ni piercing, et son corps ne présente aucune cicatrice visible ou importante.
                    </p>
                    <h3 id="wiki-style" className="browser__wiki-h3">Style vestimentaire</h3>
                    <p>
                        Côté style vestimentaire, Isen privilégie l’essentiel. Des vêtements simples, confortables mais toujours pratiques. Son style penche vers le streetwear, sans extravagance et fonctionnel avant tout, sans jamais être négligé. Son accoutrement de prédilection est un sweat à capuche beige et ample, un pantalon chino bleu nuit bien ajusté, des sneakers basses blanches délavées à scratch et un blouson type bomber vert foncé. Il ne porte pas d'accessoires particuliers, préférant garder une apparence épurée et sans fioritures, à l’image de sa personnalité.
                    </p>
                    <h2 id="wiki-personnalite" className="browser__wiki-h2">Personnalité</h2>
                    <h3 id="wiki-temperament" className="browser__wiki-h3">Tempérament</h3>
                    <p>
                        Isen est quelqu’un d’ouvert, avenant et facile à approcher. Il engage la conversation sans difficulté et met naturellement les autres à l’aise, sans effort particulier. Son attitude détendue et son sens du contact lui permettent de s’intégrer rapidement, quel que soit le contexte. Il possède une énergie plutôt tranquille, sans jamais devenir envahissant, ce qui rend sa présence agréable. Il trouve instinctivement sa place parmi les autres, sans chercher à s’imposer. Sociable sans être dépendant, Isen apprécie les échanges simples et sincères, mais garde toujours une certaine maîtrise de lui-même. Il sait écouter, répondre, plaisanter, mais choisit avec soin ce qu’il révèle réellement de lui. En effet, derrière cette facilité apparente se cache quelqu’un de plus mesuré, qui ne se livre jamais complètement, même dans des relations proches.
                    </p>
                    <h3 id="wiki-qualites" className="browser__wiki-h3">Qualités et Défauts</h3>
                    <p>
                        Isen possède un excellent sens du relationnel. Il comprend rapidement les dynamiques sociales et sait adapter son comportement en fonction des personnes qu’il a en face de lui, sans jamais paraître artificiel. Il est aussi constant dans ses efforts. Peu importe les circonstances, il maintient un rythme stable et fiable, ce qui fait de lui quelqu’un sur qui l’on peut compter dans la durée. Il n'est pas du genre à trop réfléchir et vouloir tout analyser avant de se lancer, préférant prendre des risques au risque d'échouer. Enfin, Isen est assez pragmatique et ne s’attarde pas inutilement sur ce qui ne peut pas être changé car il préfère se concentrer sur ce qui dépend réellement de lui.
                    </p>
                    <p>
                        Mais à l'inverse, Isen peut donner l’illusion d’être plus proche des autres qu’il ne l’est réellement. Sa facilité sociale masque une sorte de distance émotionnelle, qui peut créer un décalage entre ce que les autres ressentent et ce qu’il est prêt à offrir. Il a tendance à éviter les confrontations importantes en les désamorçant par le dialogue ou l’humour. Mais si cela fonctionne dans des situations légères, cela devient problématique lorsque les enjeux sont plus sérieux. Finalement, Isen est parfois trop spontané dans ses décisions, au point de ne pas toujours peser le pour et le contre.
                    </p>
                    <h3 id="wiki-desirs" className="browser__wiki-h3">Désirs et craintes</h3>
                    <p>
                        Au fond, Isen aspire à une forme de liberté simple et honnête. Il ne cherche ni la gloire ni le pouvoir, mais souhaite avancer selon ses propres règles, sans être défini par son nom ou son appartenance au clan Magaishi. À travers le parkour, il cherche un espace où il peut exister pleinement, sans contrainte ni attente extérieure. C’est dans ces moments qu’il se sent le plus proche de ce qu’il veut être. Bien qu’il ne l’exprime pas ouvertement, Isen aspire à créer des liens sincères, des relations basées sur la confiance et le respect mutuel, loin des hiérarchies et des intérêts du clan.
                    </p>
                    <p>
                        L'une des plus grandes craintes de Isen est la stagnation. L’idée de rester au même point et de ne pas évoluer malgré ses efforts, est quelque chose qu’il perçoit comme un échec profond. Il redoute aussi de ne pas être à la hauteur. Non pas aux yeux des autres, mais face à ses propres attentes et c'est cette peur alimente son besoin constant de progresser.
                    </p>
                    <h2 id="wiki-biographie" className="browser__wiki-h2">Biographie</h2>
                    <h3 id="wiki-origine" className="browser__wiki-h3">Origine et famille</h3>
                    <p>
                        Isen est issu de la famille <strong>Hata</strong>, une lignée mineure quasiment oubliée et éclipsée par les branches supérieures du clan <strong>Magaishi</strong>. Contrairement aux lignées principales, où les héritiers sont formés dès l’enfance pour occuper des fonctions stratégiques, la branche dont il est issu occupe une position de second plan et est souvent reléguée à des rôles d’exécution ou de soutien. De ce fait, il a grandi loin des projecteurs, dans une relative obscurité, sans les pressions et les attentes qui pèsent sur les membres plus en vue du clan.
                    </p>
                    <p>
                        Élevé dans le quartier de <em>Bunkyo</em> à Tokyo, Isen n'a pas eu d'enfance particulièrement dure, ni réellement privilégiée. Ses parents, bien que membres du clan, n'ont jamais été très impliqués dans les affaires internes et ont laissé une grande liberté à leur fils, tant qu'il respectait les règles de base. Ce côté indépendant lui a permis d'explorer ses propres intérêts et de développer sa personnalité sans être constamment comparé à des figures plus prestigieuses de la famille.
                    </p>
                    <h3 id="wiki-parkour" className="browser__wiki-h3">Découverte du parkour et les <em>Ura Ura Kidz</em></h3>
                    <p>
                        Ses journées passées à profiter de cette liberté en vadrouillant dans les rues des différents quartiers de la capitale l'amènent à faire la rencontre de <strong>Ryohei Nishikawa</strong>, un camarade de collège qui deviendra rapidement son meilleur ami. Ryohei est le leader naturel d’un petit groupe cherchant à former un club de parkour au sein du collège. Il recrute Isen afin de permettre la création officielle du club, qui est complété par <strong>Kazuki Kurogane</strong>, un garçon sûr de lui, ambitieux, et cherchant à surpasser Ryohei ; ainsi que <strong>Aoi Kanzaki</strong>, une adolescente silencieuse, analytique, et qui est le véritable cerveau stratégique de l'équipe.
                    </p>
                    <p>
                        Sous le nom des <em>Ura Ura Kidz</em>, ils participent à des courses clandestines contre d’autres équipes des collèges de l’arrondissement de Bunkyo. Leur progression est rapide et ils sont bientôt invités à participer à des runs organisées. Leur cohésion, leur créativité et leur style attirent l’attention des <em>Tenku Striders</em>, une équipe de lycéens réputée dans tout Tokyo, qui cherchent à recruter une nouvelle génération pour reprendre leur place avant d'obtenir leur diplôme de fin d'études. Un tournoi final est organisé et oppose les meilleures équipes des collèges environnants. Mais une seule équipe sera choisie et aura le privilège de porter le nom de <em>Tenku Striders</em>.
                    </p>
                    <p>
                        Les <em>Ura Ura Kidz</em> parviennent jusqu'en finale sans trop de mal. Mais lors de cette course décisive, tout bascule. Alors que la victoire semble à leur portée, Kazuki révèle ses véritables intentions et finit par trahir le groupe. Au moment d’un saut critique, il pousse volontairement le leader des <em>Ura Ura Kidz</em> dans le vide. La chute est violente et malgré les tentatives désespérées de Isen et Aoi pour le rattraper, Ryohei, considéré comme le meilleur <em>traceur</em> du tournoi, s’écrase lourdement après plusieurs mètres de chute libre et subit de graves blessures aux jambes. La course est perdue et les <em>Tenku Striders</em> recrutent l’équipe adverse, avec Kazuki à leur tête.
                    </p>
                    <h3 id="wiki-bunkyo" className="browser__wiki-h3"><em>Bunkyo City Bolts</em> et la <em>Tokyo Skyrunner League</em></h3>
                    <p>
                        Après une longue rééducation, Ryohei parvient à remarcher mais ne peut plus pratiquer le parkour au même niveau. À leur entrée au lycée, il choisit d’abandonner son rêve d'être le meilleur traceur du Japon et se tourne vers une autre passion liée à cette pratique qu'il aime tant, la gestion. Il espère voir la pratique se démocratiser et il est prêt à tout pour que cela arrive. Cependant, avant de tourner la page, il confie ses dernières instructions à son meilleur ami. Continuer, avancer et ne pas laisser cette trahison être la fin de leur histoire. Encouragés par leur ami, Isen et Aoi fondent leur propre équipe au club de parkour du lycée. Les <em>Bunkyo City Bolts</em> sont nés. Contrairement aux <em>Ura Ura Kidz</em>, leur approche de la course change drastiquement. Moins naïve, plus directe et ancrée dans la performance plutôt que dans le rêve. Ils sont rejoints par <strong>Hidemichi Ōyama</strong>, un lycéen à la carrure impressionnante qui respire la puissance ainsi que <strong>Daigo Kawamura</strong>, considéré comme l'un des traceurs les plus rapides du nord de Tokyo, mais qui manque de discipline.
                    </p>
                    <p>
                        Les <em>Bunkyo City Bolts</em> se font rapidement un nom dans la scène underground de Tokyo grâce à leur style reconnaissable. Ils sont rapides, agressifs et imprévisibles mais surtout, chaque membre détient un <em>Shokan</em>. C'est donc tout naturellement que le crew finit par intégrer la <strong>Tokyo Skyrunner League</strong>, une compétition officieuse mais extrêmement influente, où s’affrontent les meilleures équipes de parkour urbain avec un twist : l'utilisation de <em>Shokan</em> est autorisée et (presque) tous les coups sont permis. Mais tout sport populaire possède son lot de sombres secrets, surtout quand ils touchent aux <em>Chevaliers</em>, et les jeux de pouvoirs sont comme un poison inévitable qui corrompt tout ce qu'il touche.
                    </p>
                    <h3 id="wiki-disparition" className="browser__wiki-h3">Premier contact et disparition de Ryohei Nishikawa</h3>
                    <p>
                        Alors que les <em>Bunkyo City Bolts</em> s’imposent progressivement dans la <em>Tokyo Skyrunner League</em>, Isen et le crew maintiennent un lien régulier avec Ryohei. Contrairement à ce que l’on pourrait attendre, leur relation ne s’est jamais brisée. Ryohei suit attentivement les performances des Bolts, commente leurs courses, corrige certains choix, à la manière d'un coach qui fait encore partie de l’équipe. Mais quelque chose a changé. Depuis leur entrée dans la ligue, Ryohei se montre plus attentif à certains détails, comme les équipes qui utilisent des <em>Shokans</em>, les comportements anormaux en course, ou même certains participants qui disparaissent du circuit du jour au lendemain. Au début, cela ressemble à de simples observations mais progressivement au fil des ans, ses remarques deviennent plus précises. Il évoque des schémas, des absences répétées et des noms qui cessent d’apparaître sans explication. Plusieurs crews remarquent aussi la présence d'une ou plusieurs silhouettes placées à plusieurs endroits de la course, qui observent de leurs yeux ambrés et brillants, les membres les plus éminents. Phénomène qui devient systématique au fil des ans, mais ignoré par la grande majorité. En dernière année au lycée, Ryohei commence à s’intéresser à ce qui entoure réellement la <em>Tokyo Skyrunner League</em> et surtout aux <em>Chevaliers</em> qui participent.
                    </p>
                    <p>
                        Lors de leurs derniers échanges, Ryohei confie à Isen une intuition troublante. Selon lui, certains participants ne sont pas simplement éliminés ou blessés, ils sont ciblés. Ceux qui possèdent un <em>Shokan</em> particulièrement instable, atypique ou prometteur. Bien sûr, il n’a aucune preuve concrète mais se décide de mener l'enquête, avec un sentiment persistant : quelqu’un observe la ligue et sélectionne. Parce que malgré sa blessure, Ryohei reste un cas à part. Son talent n’a jamais réellement disparu, il s’est transformé. Moins explosif, mais plus précis. Moins rapide, mais plus efficace. Et surtout, lui aussi est détenteur d'un <em>Shokan</em>, que personne, pas même Isen, n'a eu l'occasion d'observer.
                    </p>
                    <p>
                        Puis quelques mois après avoir obtenu leur diplôme de fin d'études, Ryohei cesse de répondre. Il envoie une dernière instruction à son meilleur ami, pour le prévenir qu'il s'absente et qu'il est inutile de partir à sa recherche. Les messages restent sans réponse, les appels tombent dans le vide. Les lieux qu’il fréquentait sont déserts et ses habitudes s’arrêtent net. Comme s’il avait simplement disparu au bon moment.
                    </p>
                    <h3 id="wiki-present" className="browser__wiki-h3">Présent</h3>
                    <p>
                        Aujourd'hui encore, plus de 2 mois après la disparition de son meilleur ami, Isen poursuit les recherches. Officiellement, rien n’a changé. Il continue d’évoluer avec les <em>Bunkyo City Bolts</em>, d’enchaîner les courses dans la <em>Tokyo Skyrunner League</em>, et de participer aux compétitions comme n’importe quel autre traceur. Sauf qu'en réalité, tout a changé. Chaque course est devenue une analyse. Chaque adversaire, une piste potentielle. Chaque disparition, une répétition du même schéma. Et ces mystérieuses silhouettes, toujours présentes pour les observer, mais toujours assez loin pour être inaccessibles... La majorité des participants les ignore et les organisateurs n’en parlent pas. Mais ceux qui les pointent publiquement du doigt, finissent rarement par les revoir une deuxième fois.
                    </p>
                    <p>
                        Isen est face à un mystère qui dépasse largement le cadre de son petit monde, du parkour. Un système qui semble intimement lié aux <em>Chevaliers</em> et aux <em>Shokans</em>. Ce n'est pas la ligue qu'il observent mais certains participants. Une question se pose alors :
                    </p>
                    <p>
                        <strong>Saura-t-il percer le secret de la disparition de son meilleur ami ?</strong>
                    </p>
                    <h2 id="wiki-aptitudes" className="browser__wiki-h2">Aptitudes et compétences</h2>
                    <h3 id="wiki-competences" className="browser__wiki-h3">Compétences générales</h3>
                    <ul className="browser__wiki-list">
                        <li><strong>Motricité</strong> — Isen est ambidextre depuis son plus jeune âge et possède une excellente coordination œil-main et œil-pied.</li>
                        <li><strong>Ouïe surdéveloppée</strong> — Il perçoit les sons avec une acuité exceptionnelle, ce qui lui permet de détecter des bruits subtils.</li>
                        <li><strong>Langues</strong> — En plus du japonais, sa langue maternelle, Isen parle aussi couramment l'anglais, le mandarin et le cantonais.</li>
                        <li><strong>Technologie</strong> — Isen est familier avec les dernières avancées technologiques et connaît plusieurs langages de programmation.</li>
                    </ul>
                    <h3 id="wiki-combat" className="browser__wiki-h3">Style de combat</h3>
                    <p>
                        Isen ne possède pas de style de combat à proprement parler. Sa manière de combattre se rapproche plus du <em>street fighting</em> que des arts martiaux traditionnels. Il emprunte des techniques de <strong>boxe anglaise</strong>, de <strong>lutte libre</strong>, de <strong>taekwondo</strong> et de <strong>capoeira</strong> qu'il adapte à sa propre manière de bouger. Bien qu'il reste amateur, son style est fluide, imprévisible et chaotique, basé sur les feintes, les changements de rythme mais aussi sur son environnement immédiat.
                    </p>
                    <h3 id="wiki-shokan" className="browser__wiki-h3">Shokan</h3>
                    <p>
                        Le <em>Shokan</em> de Isen lui permet, via son téléphone, de matérialiser sa volonté sous la forme d'une entité semi-indépendante, baptisée <strong>Dualité</strong>, qui combat à ses côtés. Cette présence se manifeste comme une ombre déformée qui à mi-chemin entre apparition et disparition, gravitant autour de lui. Plutôt qu’un corps complet permanent, elle prend vie par impulsions. Ses membres surgissent, frappent, bloquent ou assistent, puis redeviennent translucides et flous aussitôt, comme s'il lui était impossible de demeurer dans le plan physique trop longtemps.
                    </p>
                    <p>
                        Ce <em>Shokan</em> présente plusieurs contraintes qui limitent grandement son efficacité, expliquant son rang au plus bas dans la hiérarchie. D'abord, ces manifestations sont brèves, <strong>1 à 2 secondes</strong> tout au plus, et ne peuvent surgir que dans un <strong>rayon de 4 mètres</strong> autour de Isen. Ensuite, leur puissance de frappe est équivalente à celle de l'utilisateur, comme s'il s'agissait d'une extension de son propre corps, bien qu'elles ne partagent pas de sensations.
                    </p>
                    <div className="browser__wiki-references">
                        <h2 id="wiki-references" className="browser__wiki-h2">Références</h2>
                        <ol className="browser__wiki-ref-list">
                            <li>Mairie de Tokyo, <em>Recensement des membres de clan</em>, 6089.</li>
                            <li>« Registre gouvernemental des Shokans », <em>Grand Lexique du Japon</em>, consulté le 7 avril 6089.</li>
                            <li>Archives Magaishi, document interne, non daté.</li>
                        </ol>
                    </div>
                    <div className="browser__wiki-categories">
                        <strong>Catégories :</strong>
                        <span className="browser__wiki-link">Homme</span> •
                        <span className="browser__wiki-link">Magaishi</span> •
                        <span className="browser__wiki-link">Souche inférieure</span> •
                        <span className="browser__wiki-link">Shokan</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function KonamiOverlay({ onDismiss }) {
    return (
        <div className="browser__konami" onClick={onDismiss}>
            <div className="browser__konami-static" />
            <div className="browser__konami-content">
                <div className="browser__konami-glitch" data-text="INTRUSION DÉTECTÉE">
                    INTRUSION DÉTECTÉE
                </div>
                <div className="browser__konami-body">
                    <p>PROTOCOLE DE CONFINEMENT ACTIVÉ</p>
                    <p>SUJET : <span className="browser__konami-hi">ISEN HATA</span></p>
                    <p>FRÉQUENCE ÉMISE : <span className="browser__konami-hi">██████ Hz</span></p>
                    <p>NIVEAU DE MENACE : <span className="browser__konami-red">INDÉTERMINÉ</span></p>
                    <p>ACCÈS SYSTÈME : <span className="browser__konami-red">COMPROMIS</span></p>
                    <p className="browser__konami-dismiss">[ Cliquez pour fermer ]</p>
                </div>
            </div>
        </div>
    )
}

// ── ActuNet News ──────────────────────────────────────────────────

const NEWS_DATE = 'Vendredi 17 avril 6089'

const TICKER_ITEMS = [
    "FLASH : Harajuku — explosion d'un yatai, au moins huit blessés dont deux graves",
    "TODAI : Disparition inquiétante d'un étudiant admis en première année, deux mois sans nouvelles",
    "SANTÉ : Un nouvel implant neural prometteur présenté au salon MediTech de Yokohama",
    "CULTURE : Le parkour, phénomène urbain en pleine expansion à Tokyo",
    "TECHNOLOGIE : Vers un meilleur encardrement des shokans et des chevaliers ?",
    "MONDE : Sommet climatique de Genève — le Japon annonce ses engagements pour 6095",
    "FAIT DIVERS : Nouvelle « observation ambre » signalée à Ikebukuro",
    "ÉCONOMIE : Le yen poursuit sa remontée face au dollar",
]

const NEWS_ARTICLES = [
    {
        id: 1,
        category: "Faits divers",
        catColor: '#336600',
        date: "Jeu. 16 Avr. 6089  |  08:12 JST",
        headline: "Todai : un étudiant de première année porté disparu depuis plus de deux mois",
        summary: "Admis à l'Université de Tokyo à la rentrée dernière, un jeune homme de vingt ans n'a plus donné signe de vie depuis mi-février. Sa famille lance un appel à témoins.",
        paragraphs: [
            "La préfecture de police de Tokyo a confirmé ce lundi que l'enquête ouverte à la suite de la disparition d'un étudiant de première année de l'Université de Tokyo reste active, sans piste privilégiée. Le jeune homme, âgé de vingt ans et décrit par ses proches comme « sérieux et mesuré », avait rejoint le campus de Hongō à l'automne dernier.",
            "Selon sa famille, ses dernières communications — des messages brefs envoyés à un ami d'enfance — ne laissaient présager aucun départ volontaire : « Je m'absente un moment. Inutile de me chercher. » Rien d'autre. Aucun message depuis.",
            "Les enquêteurs n'excluent aucune hypothèse, mais précisent qu'il n'existe à ce stade « aucun élément tangible permettant d'évoquer un crime ». Les caméras du campus ne l'ont pas filmé franchir les portiques depuis le 12 février.",
            "Un appel à témoins est relayé par la mairie de Bunkyo. La famille remercie par avance toute personne disposant d'informations de se manifester auprès de la préfecture ou de la rédaction d'ActuNet.",
        ],
    },
    {
        id: 2,
        category: "Faits divers",
        catColor: '#336600',
        date: "Mer. 15 Avr. 6089  |  21:04 JST",
        headline: "Harajuku : explosion d'un stand de yatai sur Takeshita-dōri, plusieurs blessés",
        summary: "Un stand de nourriture de rue a violemment explosé mardi soir au cœur du quartier commerçant de Harajuku. Le bilan officiel fait état de huit blessés, dont deux en urgence absolue.",
        paragraphs: [
            "Vers 20h47 mardi soir, une détonation a ébranlé le quartier de Harajuku, au croisement de Takeshita-dōri et d'une petite rue adjacente. Un yatai spécialisé dans les okonomiyaki a explosé au beau milieu de l'affluence, projetant débris et morceaux de métal sur plusieurs mètres.",
            "Les pompiers de Tokyo, rapidement sur place, ont évacué huit personnes blessées, dont deux en urgence absolue. Les premiers éléments de l'enquête s'orientent vers une fuite de gaz sur la bouteille d'appoint du stand, bien qu'une source proche du dossier indique qu' « aucune hypothèse n'est écartée, y compris un acte volontaire ».",
            "Plusieurs témoins, encore sous le choc, décrivent une scène d'effroi : « J'ai cru à un tremblement de terre. Puis j'ai vu la fumée, et les gens qui couraient. » Le quartier est resté bouclé une partie de la nuit, le temps des relevés techniques.",
            "La mairie de Shibuya a annoncé un renforcement immédiat des contrôles de sécurité sur l'ensemble des yatai du quartier, et promet une rencontre avec les représentants de la filière dans les prochains jours.",
        ],
    },
    {
        id: 3,
        category: "Sciences",
        catColor: '#004499',
        date: "Mar. 14 Avr. 6089  |  10:30 JST",
        headline: "Un implant neural capable de régénérer les tissus nerveux présenté à Yokohama",
        summary: "Au salon MediTech de Yokohama, une équipe de l'Université de Kyoto dévoile un prototype d'implant capable de stimuler la repousse de fibres nerveuses endommagées. Premiers résultats jugés « très encourageants ».",
        paragraphs: [
            "C'est peut-être l'annonce la plus remarquée du salon MediTech de Yokohama cette semaine : une équipe de recherche de l'Université de Kyoto, associée à deux sociétés de biotech, a présenté un implant neural miniature capable de stimuler la régénération de fibres nerveuses endommagées, notamment au niveau de la moelle épinière.",
            "« Nous n'en sommes qu'à la phase précoce des essais cliniques, mais les résultats précliniques dépassent nos attentes, » a expliqué la Pr Akari Matsuda, directrice du programme. Sur les vingt-deux patients volontaires, dix-neuf ont vu leur sensibilité partielle revenir dans les trois mois suivant l'implantation.",
            "La technologie, encore loin d'une commercialisation, redonne espoir aux personnes souffrant de séquelles lourdes après un traumatisme vertébral. Le dispositif, de la taille d'un grain de riz, émet des micro-impulsions programmables via un boîtier externe porté à la ceinture.",
            "Des essais à grande échelle doivent débuter dès l'automne, soutenus par un financement public. « L'objectif est d'ouvrir cette option aux patients d'ici cinq ans au plus, » précise la chercheuse.",
        ],
    },
    {
        id: 4,
        category: "Culture",
        catColor: '#990000',
        date: "Lun. 13 Avr. 6089  |  15:22 JST",
        headline: "Le parkour, la discipline underground qui s'empare des toits de Tokyo",
        summary: "Longtemps confiné à quelques crews confidentiels, le parkour urbain connaît un engouement grandissant auprès des jeunes tokyoïtes. Portrait d'une pratique entre art, sport et rébellion douce.",
        paragraphs: [
            "Si vous levez les yeux un soir en traversant Bunkyo, Shibuya ou Nakano, vous les verrez peut-être : des silhouettes rapides qui sautent d'un toit à l'autre, enchaînent franchissements et réceptions avec une précision quasi chorégraphique. Le parkour — cette discipline née en banlieue parisienne dans les années 1990 — a désormais trouvé à Tokyo un terrain de jeu à sa (dé)mesure.",
            "« Ce n'est pas juste un sport, c'est une manière de relire la ville, » explique Rika, 22 ans, l'une des rares pratiquantes à accepter de nous parler à visage découvert. « Un mur n'est plus un mur, c'est un passage. Une rampe n'est plus une rampe, c'est un tremplin. »",
            "La discipline reste largement informelle et évolue en marge des fédérations officielles. Les crews — des collectifs d'une poignée de traceurs — se retrouvent dans des spots rarement publiés, pour éviter à la fois les interventions de police et les afflux de curieux mal équipés. Les accidents, quoique rares chez les pratiquants expérimentés, existent : chutes, entorses, parfois bien pire.",
            "Depuis un an, plusieurs équipes tentent d'organiser la pratique autour de compétitions officieuses — la plus citée étant la « Tokyo Skyrunner League ». La fédération officielle rappelle cependant qu'elle ne reconnaît aucun événement de ce type, et déconseille fermement la participation.",
        ],
    },
    {
        id: 5,
        category: "Monde",
        catColor: '#004499',
        date: "Dim. 12 Avr. 6089  |  08:00 JST",
        headline: "Sommet climatique de Genève : le Japon annonce ses engagements pour 6095",
        summary: "À l'issue de trois jours de négociations à Genève, la délégation japonaise s'est engagée sur une réduction renforcée de ses émissions de CO₂ à l'horizon 6095. Les ONG saluent prudemment.",
        paragraphs: [
            "Le sommet climatique de Genève s'est conclu samedi soir par la signature d'un protocole additionnel auquel le Japon s'est associé. Tokyo s'engage à réduire de 42 % ses émissions brutes de CO₂ d'ici 6095, par rapport aux niveaux de 6080.",
            "« C'est un signal fort, à la hauteur du moment, » a déclaré la cheffe de la délégation japonaise lors de sa conférence de presse de clôture. Plusieurs ONG, historiquement critiques, reconnaissent un effort réel mais jugent les mécanismes de contrôle encore « largement insuffisants ».",
            "Sur le plan national, l'annonce devrait se traduire par un plan d'investissement public-privé orienté vers les énergies renouvelables, le rail longue distance et la rénovation thermique des bâtiments publics. Le ministère des Finances doit présenter le détail budgétaire en commission dès le mois prochain.",
            "La prochaine étape diplomatique est attendue à Séoul, où les grandes puissances asiatiques doivent se retrouver en juin pour aborder la question de la coopération régionale sur l'hydrogène bas-carbone.",
        ],
    },
]

const NEWS_BRIEFS = [
    "HARAJUKU — Explosion d'un yatai hier soir, l'enquête démarre (15/04)",
    "TODAI — La famille de l'étudiant disparu relance l'appel à témoins (14/04)",
    "SANTÉ — Ouverture d'un nouveau CHU spécialisé à Yokohama (11/04)",
    "TECHNOLOGIE — Une nouvelle régularisation des Shokans à l'étude (09/04)",
    "SPORT — Les Yomiuri Giants s'inclinent face aux Fukuoka Hawks (09/04)",
]

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
                        © 2000 ActuNet Actualités &nbsp;|&nbsp;
                        <span className="browser__news-link">Envoyer cet article</span> &nbsp;|&nbsp;
                        <span className="browser__news-link">Imprimer</span> &nbsp;|&nbsp;
                        <span className="browser__news-link">Signaler une erreur</span>
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
                {['Accueil','Japon','Monde','Sciences','Technologie','Faits divers','Sports','Météo','Finance'].map((c, i) => (
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
                        {['Japon','Monde','Sciences','Technologie','Faits divers','Sports','Culture','Météo'].map(c => (
                            <div key={c} className="browser__news-sb-link">{c}</div>
                        ))}
                    </div>
                    <div className="browser__news-sb-section">
                        <div className="browser__news-sb-title">MÉTÉO</div>
                        <div className="browser__news-weather">
                            <div className="browser__news-weather-city">Tokyo, JP</div>
                            <div className="browser__news-weather-temp">19°C</div>
                            <div className="browser__news-weather-desc">Ciel dégagé</div>
                        </div>
                    </div>
                    <div className="browser__news-sb-section">
                        <div className="browser__news-sb-title">EN BREF</div>
                        {NEWS_BRIEFS.map((b, i) => (
                            <div key={i} className="browser__news-brief">{b}</div>
                        ))}
                    </div>
                    <div className="browser__news-ad">
                        <div>PUBLICITÉ</div>
                        <strong>ActuNet Pro</strong>
                        <div>Hébergement web</div>
                        <div>dès 2000¥/mois</div>
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
                © 2000 ActuNet Actualités — Publicité — Aide — Contact — Conditions d'utilisation
                <br />
                <small>Ce site est optimisé pour Netscape Navigator 4.0 et Internet Explorer 5.0 · Résolution recommandée : 800×600</small>
            </div>
        </div>
    )
}

// ── TABS (définitions) ──────────────────────────────────────────

const TAB_DEFS = {
    google: {
        id: 'google',
        label: 'nsn.com',
        url: 'http://www.nsn.com/',
        icon: 'https://win98icons.alexmeub.com/icons/png/msn_messenger-5.png',
    },
    wiki: {
        id: 'wiki',
        label: 'Isen Hata — Wikipédia',
        url: 'https://jp.wikipedia.org/wiki/Isen_Hata',
        icon: 'https://win98icons.alexmeub.com/icons/png/web_file-0.png',
    },
    news: {
        id: 'news',
        label: 'ActuNet Actualités',
        url: 'http://www.actunet-news.jp/',
        icon: 'https://win98icons.alexmeub.com/icons/png/web_file-0.png',
    },
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
        ...(secretTabVisible ? [{ id: 'secret', label: '????', url: 'isen://core', icon: '⚠' }] : []),
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

    const EXACT_URL_MAP = {
        'www.nsn.com':    'google',
        'nsn.com':        'google',
        'home.nsn.com':   'google',
        'www.google.jp':  'google',
        'google.jp':      'google',
        'www.google.com': 'google',
        'google.com':     'google',
        'jp.wikipedia.org/wiki/isen_hata': 'wiki',
        'www.actunet-news.jp': 'news',
        'actunet-news.jp':     'news',
    }

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