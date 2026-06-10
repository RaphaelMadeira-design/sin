import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/PDA.scss'

import Snake from './Snake'
import JumpGame from './JumpGame'
import MediaPlayer from './MediaPlayer'

// ─── CONFIGURATION DES APPS PDA ──────────────────────────────────
const PDA_APPS = [
  { id: 'identite', label: 'Identité', icon: '◉' },
  { id: 'stats',    label: 'Pouvoir',  icon: '◆' },
  { id: 'histoire', label: 'Histoire', icon: '▤' },
  { id: 'contacts', label: 'Contacts', icon: '☰' },
]

const GAME_APPS = [
  { id: 'snake', label: 'Snake', icon: '§' },
  { id: 'jump',  label: 'Jump',  icon: '^' },
  { id: 'media', label: 'Media', icon: '♪' },
]

const PAGE_ORDER = ['identite', 'stats', 'histoire', 'contacts']

// ─── IDENTITÉ ────────────────────────────────────────────────────
const IDENTITY = {
  codename: 'KŌGA',
  fullName: 'Kiba Igarashi',
  alias: 'Croc Écarlate, Kōga',
  age: 19,
  birth: '23/05/6070',
  sexe: 'Masculin ♂',
  clan: 'Magaishi',
  role: 'Membre',
  shokan: "Dualité",
  rank: 'E',
  type: 'Divers',
}

// ─── DESCRIPTION PHYSIQUE (wiki) ──────────────────────────────────
const PHYSICAL = {
  intro: "Du haut de son 1m80 et pesant 71kg, Kiba est un homme qui possède un physique plutôt banal. Ses cheveux carmins tirent légèrement vers un rouge brun et sont coiffés de manière naturelle, presque négligée avec des mèches désordonnées qui retombent sur son front sans jamais vraiment masquer ses yeux. Son visage est équilibré, aux traits nets mais assez doux. Ses yeux sont violets et dessinés en amande. Le grain de beauté sous son œil gauche attire subtilement l’attention et ajoute une petite signature visuelle qui casse la symétrie de son visage. Kiba ne possède aucun tatouage ni piercing, et son corps ne présente aucune cicatrice visible ou importante.",
  traits: [
    ['TATOUAGES', "Aucun"],
    ['CICATRICES', "Aucune"],
    ['STYLE', "Streetwear minimaliste"],
  ],
}

// ─── PROFIL PSYCHOLOGIQUE (wiki) ──────────────────────────────────
const PSYCHO = {
  intro: "Kiba est quelqu’un d’ouvert, avenant et facile à approcher. Il engage la conversation sans difficulté et met naturellement les autres à l’aise, sans effort particulier. Son attitude détendue et son sens du contact lui permettent de s’intégrer rapidement, quel que soit le contexte. Il possède une énergie plutôt tranquille, sans jamais devenir envahissant, ce qui rend sa présence agréable. Il trouve instinctivement sa place parmi les autres, sans chercher à s’imposer. Sociable sans être dépendant, Kiba apprécie les échanges simples et sincères, mais garde toujours une certaine maîtrise de lui-même. Il sait écouter, répondre, plaisanter, mais choisit avec soin ce qu’il révèle réellement de lui.",
  traits: [
    ['QUALITÉS',    "Stable, empathique, loyal."],
    ['DÉFAUTS',     "Secret, têtu, trop spontanné"],
    ['PEURS',       "Stagnation, l'échec continuel"],
    ['MOTIVATION',  "Indépendance, liens sincères"],
  ],
}

const STATS_LIST = [
  { name: 'Perception', value: 0 },
  { name: 'Dextérité',  value: 0 },
  { name: 'Endurance',  value: 0 },
  { name: 'Force',      value: 0 },
  { name: 'Résistance', value: 0 },
  { name: 'Shokan',     value: 0 },
]

const VITALS = {
  level:  1,
  hp:     { cur: 800,  max: 800  },
  energy: { cur: 500,  max: 500   },
  xp:     { cur: 50, max: 10000 },
}

const ABILITIES = [
  { key: 'A', name: 'Permutation',          cost: 'E',  dur: '⧗ 1 tour',
    desc: "Technique basique qui permet à Kiba d'échanger sa position avec celle de sa projection de la Dualité, lui offrant ainsi une grande mobilité tactique pour surprendre ses adversaires ou échapper à des situations dangereuses." },
]

const HISTORY_CHAPTERS = [
  { id: 1, year: '6070',      title: 'Naissance',
    body: " Kiba Igarashi voit le jour au sein de la famille Igarashi, une lignee mineure quasi oubliée, éclipsée par les branches superieures du clan Magaishi. Contrairement aux lignées principales, ou les héritiers sont formes des l'enfance pour occuper des fonctions stratégiques, la branche dont il est issu occupe une position de second plan, souvent reléguée à des rôles d'exécution ou de soutien. Ses parents, bien que membres du clan, n'ont jamais été très impliqués dans les affaires internes. Ils ont laissé une grande liberté à leur fils, tant qu'il respectait les règles de base. Ce coté indépendant lui a permis d'explorer ses propres intérêts et de développer sa personnalité sans être constamment comparé à des figures plus prestigieuses de la famille. De ce fait, Kiba a grandi loin des projecteurs et dans une relative obscurité, sans les pressions et les attentes qui pèsent sur les membres plus en vue du clan. Une enfance presque ordinaire, si l'on oublie le nom qu'il porte et le sang qui coule dans ses veines. Personne, à ce moment-là, ne soupconnait ce que cet enfant deviendrait." },
  { id: 2, year: '6078',       title: 'Enfance',
    body: "Élevé dans le quartier de Bunkyo a Tokyo, Kiba n'a pas eu d'enfance particulierement dure, ni reellement privilégiée. Les ruelles étroites, les parcs bordés d'érables, les toits accessibles par les escaliers de secours, tout cela est devenu son terrain de jeu bien avant qu'il ne sache ce qu'était le parkour. Il passait ses journées a vadrouiller dans les rues des différents quartiers de la capitale, sautant par-dessus les murets, grimpant aux façades des immeubles abandonnes, courant sur les toits des garages. Ce n'était pas par rebellion, mais plutôt par instinct. Quelque chose en lui cherchait le mouvement, l'espace et la vitesse. A l'école, Kiba était le genre de gamin qu'on ne remarque pas vraiment. Ce n'était pas le meilleur mais pas le pire non plus, juste dans la moyenne. Il était sociable sans pour autant être envahissant, il savait écouter, plaisanter, s'adapter ou même s'affirmer, mais il ne se livrait jamais complètement. Même enfant, il gardait une certaine distance, comme si une partie de lui observait le monde plutôt que d'y participer pleinement. Ses parents ne posaient pas de questions. La liberté qu'ils lui accordaient n'était pas de l'indifférence, c'était une forme de confiance silencieuse. Tant qu'il rentrait avant la nuit, tant qu'il ne déshonorait pas le nom des Igarashi ou qu'il ne s'apportait pas trop d'ennuis, il pouvait faire ce qu'il voulait. Et ce qu'il voulait, c'était courir librement." },
  { id: 3, year: '6081',  title: 'Éveil',
    body: " C'est au collège que tout à réellement commencé. Ses journées passées à profiter de cette liberté en vadrouillant dans les rues l'amènent à faire la rencontre de Ryohei Nishikawa, un camarade de classe qui deviendra rapidement son meilleur ami. Ryohei est le leader naturel d'un petit groupe cherchant à former un club de parkour au sein du college. Il recrute Kiba afin de permettre la création officielle du club, qui est completé par Kazuki Kurogane, un garçon sûr de lui, ambitieux, et cherchant a surpasser Ryohei ; ainsi que Aoi Kanzaki, une adolescente silencieuse, analytique, et qui est le véritable cerveau stratégique de la future équipe. Les Ura Ura Kidz sont nés. Pour Kiba, c'était la première fois qu'il ressentait ça, ce sentiment d'appartenance. Pas lié au clan pour qui il n'était qu'un pion de plus, ni lié au sang. Juste quatre gamins qui couraient ensemble, qui se poussaient mutuellement, qui rêvaient de devenir les meilleurs traceurs de Tokyo. Ryohei avait cette énergie contagieuse. Il voyait en chaque toit un chemin et en chaque mur une possibilité de continuer. Il disait toujours : 'Le parkour, c'est pas juste sauter, c'est choisir de ne pas s'arrêter.'. Une expression qu'il avait emprunté à un traceur français très connu de la scène européenne, lu dans un vieux magazine qu'il considérait comme sa bible personnelle. Kiba ne le savait pas encore, mais cette phrase allait définir le reste de sa vie." },
  { id: 4, year: "6082",     title: "Découverte",
    body: "Sous le nom des Ura Ura Kidz, ils participent à des courses clandestines contre d'autres équipes des collèges de l'arrondissement de Bunkyo. Leur progression est fulgurante. Leur cohésion, leur créativité et leur style attirent l'attention des Tenku Striders, une équipe de lycéens réputée dans tout Tokyo. Un tournoi final est organisé. Les meilleures équipes des collèges environnants s'affrontent. Une seule equipe sera choisie et aura le privilège de porter le nom de Tenku Striders et de poursuivre leur travail. Les Ura Ura Kidz parviennent jusqu'en finale sans trop de mal. Mais lors de cette course décisive, tout bascule. Alors que la victoire semble à leur portée, Kazuki révèle ses véritables intentions et trahit le groupe. Au moment d'un saut critique, il pousse volontairement Ryohei dans le vide. La chute est violente et malgré les tentatives désespérées de Kiba et Aoi pour le rattraper, Ryohei s'ecrase lourdement après plusieurs mètres de chute libre. Graves blessures aux jambes, la course est perdue. Les Tenku Striders se voient dans l'obligation de recruter l'équipe adverse, avec Kazuki à leur tête. Ce jour-là, quelque chose s'est brisé chez Kiba. Mais ce n'est pas sa determination ; plutôt sa naïveté qui s'envole en éclats. Il a compris que le monde ne récompensait pas toujours les meilleurs. Parfois, il récompensait les plus cruels." },
  { id: 5, year: "6085",       title: 'Combat',
    body: "Après une longue réeducation, Ryohei parvient à remarcher mais ne peut plus pratiquer le parkour au même niveau. A leur entrée au lycée, il choisit d'abandonner son rêve d'être le meilleur traceur du Japon et se tourne vers la gestion. Avant de tourner la page, il confie ses dernières instructions à son meilleur ami : 'Continue. Avance. Ne laisse pas cette trahison être la fin de notre histoire. Un mur sur notre route n'est pas un obstacle, c'est une invitation à créer notre propre chemin.' Encouragés par leur ami, Kiba et Aoi fondent leur propre équipe : les Bunkyo City Bolts, en hommage à leur quartier d'origine, comme pour prévenir les nouveaux Tenku Striders qu'ils en sont les dignes représentants. Leur approche change drastiquement. Moins naïve, plus directe et plus ancrée dans la performance plutôt que dans le rêve. Ils sont rejoints par Hidemichi Oyama, un lycéen a la carrure impressionnante, et Daigo Kawamura, considéré comme l'un des traceurs les plus rapides du nord de Tokyo. Les Bolts se font rapidement un nom. Rapides, agressifs, imprevisibles et surtout, chaque membre détient un Shokan. C'est ainsi qu'ils intègrent la Tokyo Skyrunner League, une compétition officieuse mais extrêmement influente, où l'utilisation de Shokan est autorisée, même indispensable pour concourir. C'est là que Kiba découvre l'utilité de son propre Shokan pour la première fois. Au milieu d'une course, pris entre deux immeubles, sans prise et sans issue, une main d'apparence spectrale jaillit de nulle part et le rattrape. Une main qui n'appartenait à personne d'autre qu'à lui-même. Dualité sera son atout pour se hisser au sommet." },
  { id: 6, year: "6089",       title: 'Aujourd\'hui',
    body: "Ryohei commence à s'intéresser à ce qui entoure réellement la Tokyo Skyrunner League. Il repère un schéma : des Chevaliers de rang faible, aux Shokans instables ou atypiques, qui disparaissent du circuit du jour au lendemain et les organisateurs n'en parlent jamais. Et puis il y a les silhouettes. Des figures immobiles, aux yeux ambrés luisants, postées en hauteur tout au long des parcours. Elles observent toujours les mêmes participants. La majorité les ignore et ceux qui les pointent publiquement du doigt finissent rarement par les revoir. Lors de leurs derniers échanges, Ryohei confie à Kiba une intuition troublante : quelqu'un observe la ligue et sélectionne. Ceux qui possèdent un Shokan particulierement instable, atypique ou prometteur. Puis, quelques mois après l'obtention de leur diplôme, Ryohei cesse de répondre. Il laisse un dernier message : 'Je m'absente un moment. Inutile de me chercher.' Les messages restent sans réponse, les appels tombent dans le vide et les lieux qu'il fréquentait sont devenus déserts. Comme s'il avait simplement disparu au bon moment. Aujourd'hui, plus de 2 mois après sa disparition, Kiba poursuit les recherches. Chaque course est devenue une analyse. Chaque adversaire est une piste ou un suspect. Et chaque disparition, une répétition du même schéma. La question reste ouverte : Saura-t-il percer le secret de la disparition de son meilleur ami ?" },
]

// ─── CONTACTS & CONVERSATIONS (repris de MSN.jsx) ─────────────────
const CONTACTS_LIST = [
  { id: 'naomi',    name: 'naomi_07',      status: 'online',
    msg: 'Toujours à la recherche d\'un scoop',       note: "Journaliste indépendante pour ActuNet." },
  { id: 'yuki',     name: 'YukiChan',      status: 'online',
    msg: "j'en ai marre des exams...",       note: "Camarade de lycée, maintenant dans la même fac." },
  { id: 'kagami',   name: 'KagamiSpirit',  status: 'away',
    msg: 'Le reflet ne ment jamais.',        note: "C'est qui ?" },
  { id: 'masahiro', name: 'MasaMasa',      status: 'offline',
    msg: "Concert bientôt — Let's go !",     note: "Pote de fac, membre d'un groupe de musique." },
  { id: 'ryo',      name: 'Ry0',           status: 'offline',
    msg: "",               note: "Disparu depuis 2 mois." },
]

const SELF = 'koga99'

const CONVERSATIONS = {
  naomi: {
    date: "Aujourd'hui — 20:45",
    messages: [
      { from: 'naomi_07', text: "kiba !! t'as vu les nouvelles de ce soir ?", time: '20:45' },
      { from: SELF,       text: 'non, quoi encore',                            time: '20:46' },
      { from: 'naomi_07', text: 'ya une nouvelle course clandestine',          time: '20:46' },
      { from: 'naomi_07', text: 'et de nouveaux crews foutent le bordel pour entrer dans la ligue', time: '20:47' },
      { from: 'naomi_07', text: 'tu devrais lire mes articles de temps en temps -_-', time: '20:47' },
      { from: SELF,       text: 'je regarde sur ton site',                      time: '20:49' },
      { from: 'naomi_07', text: "j'ai besoin de toi sur ce coup",              time: '20:49' },
      { from: SELF,       text: 'laisse les se faire choper par les flics ou les clans', time: '20:50' },
      { from: 'naomi_07', text: "c'est ça... ^^",                               time: '20:50' },
      { from: 'naomi_07', text: "tu sais très bien qu'ils vont rien faire",     time: '20:51' },
      { from: SELF,       text: "j'avoue",                                      time: '20:51' },
      { from: 'naomi_07', text: "le run se passe à toshima, près d'ikebukuro", time: '20:52' },
      { from: SELF,       text: 'je me prépare',                                time: '20:52' },
      { from: 'naomi_07', text: 'je pars mtn ^^ rendez-vous au pont de maruyama. 23h.', time: '20:54' },
      { from: SELF,       text: 'ok',                                           time: '20:54' },
    ],
  },
  yuki: {
    date: "Aujourd'hui — 21:12",
    messages: [
      { from: 'YukiChan_☆', text: "KIBA !!! j'ai eu une vision ce matin omg", time: '21:12' },
      { from: 'YukiChan_☆', text: "c'était bizarre... tu étais là mais pas toi en même temps ??", time: '21:12' },
      { from: SELF,         text: 'une vision de quoi exactement',              time: '21:14' },
      { from: 'YukiChan_☆', text: 'une silhouette derrière toi. noire. mais familière', time: '21:15' },
      { from: SELF,         text: "qu'est-ce que tu racontes",                  time: '21:16' },
      { from: SELF,         text: "t'es chelou avec tes histoires de visions",  time: '21:17' },
      { from: 'YukiChan_☆', text: "dis moi que c'est rien ;_;",                 time: '21:18' },
      { from: SELF,         text: "c'est rien. oublie cette vision.",           time: '21:18' },
      { from: 'YukiChan_☆', text: '... :/ tu mens très mal tu sais xD',         time: '21:19' },
      { from: SELF,         text: 'passe une bonne nuit yuki',                  time: '21:20' },
      { from: 'YukiChan_☆', text: 'toi aussi... fais attention à toi stp ;_;',  time: '21:20' },
    ],
  },
  kagami: {
    date: 'Hier — 22:01',
    messages: [
      { from: 'KagamiSpirit', text: 'Le reflet ne ment jamais.',                time: '22:01' },
      { from: SELF,           text: "t'es qui toi",                             time: '22:01' },
      { from: 'KagamiSpirit', text: 'Ce que tu portes... il le sent aussi.',    time: '22:02' },
      { from: 'KagamiSpirit', text: 'Méfie-toi de ton ombre.',                  time: '22:02' },
      { from: SELF,           text: "de quoi tu parles. je t'ai jamais ajouté", time: '22:03' },
      { from: 'KagamiSpirit', text: 'Bientôt. Le voile est fin cette nuit.',    time: '22:03' },
      { from: 'KagamiSpirit', text: 'Ne te retourne pas.',                      time: '22:04', italic: true },
      { from: 'system',       text: '[KagamiSpirit est injoignable]',           time: '22:04' },
    ],
  },
  masahiro: {
    date: "Aujourd'hui — 21:01",
    messages: [
      { from: '♫-MasaMasa-♫', text: 'Hello mon batteur préféré~~',              time: '21:01' },
      { from: SELF,           text: 'yo',                                       time: '21:01' },
      { from: '♫-MasaMasa-♫', text: "On organise une répét' jeudi avec le groupe", time: '21:02' },
      { from: '♫-MasaMasa-♫', text: 'Ça te dit de jouer avec nous ?',           time: '21:02' },
      { from: SELF,           text: 'wakatsuru est encore malade ?',            time: '21:06' },
      { from: '♫-MasaMasa-♫', text: 'Non pas cette fois',                       time: '21:08' },
      { from: '♫-MasaMasa-♫', text: "Depuis qu'il sort avec Reina-chan, il vient plus trop", time: '21:08' },
      { from: SELF,           text: "c'est con",                                time: '21:10' },
      { from: SELF,           text: 'quelle heure',                             time: '21:10' },
      { from: '♫-MasaMasa-♫', text: 'On sait pas encore',                       time: '21:11' },
      { from: '♫-MasaMasa-♫', text: 'Je te dis ça demain, ok ?',                time: '21:11' },
      { from: SELF,           text: 'ok mais je promets rien',                  time: '21:12' },
      { from: '♫-MasaMasa-♫', text: 'Je compte sur toi~ à demain',              time: '21:12' },
      { from: SELF,           text: 'a+',                                       time: '21:15' },
      { from: 'system',       text: '[♫-MasaMasa-♫ est déconnecté]' },
    ],
  },
  ryo: {
    date: 'Il y a 2 mois',
    messages: [
      { from: 'Ry0',    text: 'ya un truc bizarre qui se prepare',              time: '14:22' },
      { from: 'Ry0',    text: 'je dois disparaître un moment',                  time: '14:23' },
      { from: SELF,     text: 'quoi ? pourquoi',                                time: '14:23' },
      { from: 'Ry0',    text: 'tu comprendras plus tard.',                      time: '14:24' },
      { from: 'Ry0',    text: 'ne me cherche pas.',                             time: '14:24' },
      { from: SELF,     text: "ryo. qu'est-ce qui se passe vraiment",           time: '14:25' },
      { from: 'system', text: '[CONNEXION PERDUE]',                             time: '14:25' },
      { from: 'system', text: "Ry0 n'est plus en ligne depuis 2 mois." },
    ],
  },
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────
export default function PDAView() {
  const [currentApp, setCurrentApp] = useState('home')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [battery] = useState(48)
  // États d'alimentation : 'off' (éteint) → 'booting' (démarre) → 'on' (allumé)
  const [powerState, setPowerState] = useState('off')
  // Joue l'animation d'extinction uniquement lors d'un vrai on → off
  const [animatingOff, setAnimatingOff] = useState(false)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
      setDate(`${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`)
    }
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (powerState !== 'booting') return
    const timer = setTimeout(() => setPowerState('on'), 2500)
    return () => clearTimeout(timer)
   }, [powerState])

  const handlePowerToggle = () => {
    if (powerState === 'off') {
      setPowerState('booting')
    } else if (powerState === 'on') {
      setAnimatingOff(true)
      setPowerState('off')
      setCurrentApp('home')
    }
    // Si 'booting' → ignore
  }

  const navigateTo = (appId) => setCurrentApp(appId)

  const cycleOffset = (offset) => {
    const idx = PAGE_ORDER.indexOf(currentApp)
    if (idx === -1) return
    const next = (idx + offset + PAGE_ORDER.length) % PAGE_ORDER.length
    setCurrentApp(PAGE_ORDER[next])
  }
  const isCyclable = PAGE_ORDER.includes(currentApp)

  const renderAppContent = () => {
    switch (currentApp) {
      case 'home':     return <PDAHomeScreen apps={PDA_APPS} onAppSelect={navigateTo} date={date} />
      case 'identite': return <PDAIdentity />
      case 'stats':    return <PDAStats />
      case 'histoire': return <PDAHistoire />
      case 'contacts': return <PDAContacts />
      case 'games':    return <PDAHomeScreen apps={GAME_APPS} onAppSelect={navigateTo} title="Jeux & Media" subtitle="// DIVERTISSEMENT" date={date} />
      case 'snake':    return <Snake />
      case 'jump':     return <JumpGame />
      case 'media':    return <MediaPlayer />
      default:         return null
    }
  }

  const getAppTitle = () => {
    const app = [...PDA_APPS, ...GAME_APPS].find(a => a.id === currentApp)
    if (currentApp === 'games') return 'Jeux'
    return app?.label || 'KIBA.PDA'
  }

  if (powerState === 'off') {
    return (
      <PDAShell
        powerState="off"
        onPower={handlePowerToggle}
        currentApp={currentApp}
        navigateTo={navigateTo}
        animatingOff={animatingOff}
        onOffAnimationEnd={() => setAnimatingOff(false)}
      />
    )
  }

  if (powerState === 'booting') {
    return (
      <PDAShell
        powerState="booting"
        onPower={handlePowerToggle}
        currentApp={currentApp}
        navigateTo={navigateTo}
      />
    )
  }

  return (
    <div className="pda" data-testid="pda-view">
      <div className="pda__frame">
        <div className="pda__screen">
          <div key="on" className="pda__screen-inner">
            <div className="pda__scanlines" />

            {/* Status Bar */}
            <div className="pda__statusbar">
              <span className="pda__statusbar-title">{getAppTitle()}</span>
              <div className="pda__statusbar-right">
                <span className="pda__battery">
                  <span className="pda__battery-icon" style={{ '--level': `${battery}%` }} />
                  {battery}%
                </span>
                <span className="pda__time">{time}</span>
              </div>
            </div>

            {/* Contenu */}
            <div className="pda__content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentApp}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.18 }}
                  className="pda__app-container"
                >
                  {renderAppContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav Bar : ◂ gauche | ● Menu centre | ▸ droite */}
            <div className="pda__navbar">
              <button
                className="pda__nav-arrow"
                onClick={() => cycleOffset(-1)}
                disabled={!isCyclable}
                data-testid="pda-prev"
                title="Page précédente"
              >◂</button>

              <button
                className="pda__nav-btn pda__nav-btn--home"
                onClick={() => navigateTo('home')}
                data-testid="pda-home"
              >● Menu</button>

              <button
                className="pda__nav-arrow"
                onClick={() => cycleOffset(1)}
                disabled={!isCyclable}
                data-testid="pda-next"
                title="Page suivante"
              >▸</button>
            </div>
          </div>
        </div>

        {/* Boutons physiques : 2 raccourcis | POWER | 2 raccourcis */}
        <PDAButtonsRow
          currentApp={currentApp}
          navigateTo={navigateTo}
          onPower={handlePowerToggle}
          powerOn
        />

        <div className="pda__brand">
          <span>PYR//TECH</span>
          <small>PDA-98</small>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ROW DE BOUTONS PHYSIQUES (2 raccourcis + POWER + 2 raccourcis)
// ═══════════════════════════════════════════════════════════════════
function PDAButtonsRow({ currentApp, navigateTo, onPower, powerOn = false }) {
  return (
    <div className="pda__buttons">
      {PDA_APPS.slice(0, 2).map((app, i) => (
        <div
          key={app.id}
          className={`pda__button ${currentApp === app.id ? 'pda__button--active' : ''}`}
          onClick={() => navigateTo && navigateTo(app.id)}
          title={app.label}
          data-testid={`pda-hw-btn-${app.id}`}
        >
          <span>{i + 1}</span>
        </div>
      ))}

      <button
        type="button"
        className={`pda__button pda__button--power ${powerOn ? 'pda__button--power-on' : ''}`}
        onClick={onPower}
        title={powerOn ? 'Éteindre' : 'Allumer'}
        aria-label="Bouton d'alimentation"
        data-testid="pda-hw-btn-power"
      >
        <span className="pda__power-glyph">⏻</span>
      </button>

      {PDA_APPS.slice(2).map((app, i) => (
        <div
          key={app.id}
          className={`pda__button ${currentApp === app.id ? 'pda__button--active' : ''}`}
          onClick={() => navigateTo && navigateTo(app.id)}
          title={app.label}
          data-testid={`pda-hw-btn-${app.id}`}
        >
          <span>{i + 3}</span>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ÉCRAN D'ACCUEIL
// ═══════════════════════════════════════════════════════════════════
function PDAHomeScreen({ apps, onAppSelect, title = 'KIBA.PDA', subtitle = '// MENU PRINCIPAL', date }) {
  return (
    <div className="pda-home">
      <div className="pda-home__header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="pda-home__grid">
        {apps.map((app, index) => (
          <motion.button
            key={app.id}
            className="pda-home__app"
            onClick={() => onAppSelect(app.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            data-testid={`pda-app-${app.id}`}
          >
            <span className="pda-home__app-icon">{app.icon}</span>
            <span className="pda-home__app-label">{app.label}</span>
          </motion.button>
        ))}
      </div>
      <div className="pda-home__footer" data-testid="pda-home-date">
        <span className="pda-home__date-label">DATE SYSTÈME</span>
        <span className="pda-home__date-val">{date}</span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// IMAGE VERTE (canvas + dithering Floyd-Steinberg, palette LCD 4 niveaux)
// ═══════════════════════════════════════════════════════════════════
function PDAGreenImage({ src, width = 132, height = 150 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      ctx.imageSmoothingEnabled = false
      // Remplit d'abord en fond sombre
      ctx.fillStyle = '#0a1a0a'
      ctx.fillRect(0, 0, width, height)

      // Dessine l'image en "cover"
      const ratio = Math.max(width / img.width, height / img.height)
      const w = img.width * ratio
      const h = img.height * ratio
      ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h)

      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      // Palette LCD (4 niveaux de vert, du sombre au clair)
      const palette = [
        [10, 26, 10],    // lcd-shadow
        [26, 136, 51],   // lcd-text-dim
        [51, 255, 102],  // lcd-text
        [68, 255, 119],  // lcd-highlight
      ]

      // Grayscale buffer
      const gray = new Float32Array(width * height)
      for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      }

      // Floyd-Steinberg → 4 levels
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x
          const oldV = gray[idx]
          const level = Math.max(0, Math.min(3, Math.round((oldV / 255) * 3)))
          const newV = (level / 3) * 255
          const err = oldV - newV

          if (x + 1 < width)                       gray[idx + 1]         += err * 7 / 16
          if (y + 1 < height) {
            if (x > 0)         gray[idx + width - 1] += err * 3 / 16
                               gray[idx + width]     += err * 5 / 16
            if (x + 1 < width) gray[idx + width + 1] += err * 1 / 16
          }

          const color = palette[level]
          const p = idx * 4
          data[p]     = color[0]
          data[p + 1] = color[1]
          data[p + 2] = color[2]
          data[p + 3] = 255
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }

    img.onerror = () => {
      // Fallback : trame verte si l'image ne charge pas
      ctx.fillStyle = '#1a2b1a'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = '#1a8833'
      ctx.font = '10px "Pixelify Sans", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('[NO IMG]', width / 2, height / 2)
    }

    img.src = src
  }, [src, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="pda-img"
      data-testid="pda-portrait"
    />
  )
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : IDENTITÉ
// ═══════════════════════════════════════════════════════════════════
function PDAIdentity() {
  const rows = [
    ['NOM',     IDENTITY.fullName],
    ['ALIAS',   IDENTITY.alias],
    ['ÂGE',     `${IDENTITY.age} ans`],
    ['NAISS.',  IDENTITY.birth],
    ['CLAN',    IDENTITY.clan],
    ['ROLE',    IDENTITY.role],
    ['SHOKAN',  IDENTITY.shokan],
    ['RANG',    IDENTITY.rank],
    ['TYPE',  IDENTITY.type],
  ]

  return (
    <div className="pda-page" data-testid="pda-page-identite">
      <div className="pda-page__title">&gt; IDENTITE.DAT</div>

      <div className="pda-id__head">
        <div className="pda-id__avatar">
          <PDAGreenImage src="/images/4.jpg" width={150} height={150} />
        </div>
        <div className="pda-id__tag">
          <div className="pda-id__label">REGISTRE CLAN</div>
          <div className="pda-id__value">#MAG01-2119</div>
          <div className="pda-id__label" style={{ marginTop: 8 }}>REGISTRE SHOKAN</div>
          <div className="pda-id__value">#JP01-482-E</div>
          <div className="pda-id__label" style={{ marginTop: 8 }}>STATUT CHEVALIER</div>
          <div className="pda-id__value pda-id__value--ok">▣ ACTIF</div>
        </div>
      </div>

      <div className="pda-page__section">[ FICHE SUJET ]</div>
      <table className="pda-table">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <td className="pda-table__k">{k}</td>
              <td className="pda-table__sep">:</td>
              <td className="pda-table__v">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pda-page__note">
        &gt; E-mail : <strong>koga99@hotmail.jp</strong>
      </div>

      {/* ── DESCRIPTION PHYSIQUE ─────────────────── */}
      <div className="pda-page__section">[ DESCRIPTION PHYSIQUE ]</div>
      <p className="pda-wiki__intro">{PHYSICAL.intro}</p>
      <dl className="pda-wiki">
        {PHYSICAL.traits.map(([k, v]) => (
          <div key={k} className="pda-wiki__row">
            <dt className="pda-wiki__k">{k}</dt>
            <dd className="pda-wiki__v">{v}</dd>
          </div>
        ))}
      </dl>

      {/* ── PROFIL PSYCHOLOGIQUE ─────────────────── */}
      <div className="pda-page__section">[ PROFIL PSYCHOLOGIQUE ]</div>
      <p className="pda-wiki__intro">{PSYCHO.intro}</p>
      <dl className="pda-wiki">
        {PSYCHO.traits.map(([k, v]) => (
          <div key={k} className="pda-wiki__row">
            <dt className="pda-wiki__k">{k}</dt>
            <dd className="pda-wiki__v">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : STATS / POUVOIR
// ═══════════════════════════════════════════════════════════════════
function PDAStats() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const pct = (v, m) => Math.round((v / m) * 100)

  return (
    <div className="pda-page" data-testid="pda-page-stats">
      <div className="pda-page__title">&gt; POWER.SYS</div>

      <div className="pda-page__section">[ VITALS ]</div>
      <div className="pda-vitals">
        <VitalRow label="LVL" value={VITALS.level} pctValue={0} hideBar />
        <VitalRow label="PV"  value={VITALS.hp.cur}     max={VITALS.hp.max}     pctValue={mounted ? pct(VITALS.hp.cur,     VITALS.hp.max)     : 0} />
        <VitalRow label="EN"  value={VITALS.energy.cur} max={VITALS.energy.max} pctValue={mounted ? pct(VITALS.energy.cur, VITALS.energy.max) : 0} />
        <VitalRow label="XP"  value={VITALS.xp.cur}     max={VITALS.xp.max}     pctValue={mounted ? pct(VITALS.xp.cur,     VITALS.xp.max)     : 0} />
      </div>

      <div className="pda-page__section">[ STATISTIQUES ]</div>
      <div className="pda-stats">
        {STATS_LIST.map(s => (
          <div key={s.name} className="pda-stat">
            <span className="pda-stat__name">{s.name.toUpperCase()}</span>
            <span className="pda-stat__bar">
              <BlockBar value={mounted ? s.value : 0} />
            </span>
            <span className="pda-stat__val">{s.value.toString().padStart(3, '0')}</span>
          </div>
        ))}
      </div>

      <div className="pda-page__section">[ SHOKAN // DUALITÉ ]</div>
      <div className="pda-shokan">
        <p>
          Manifestation éphémère de sa volonté sous forme de fragments d'une silhouette (main, bras, jambe)
          dans un rayon de <strong>4 m</strong>. Durée actuelle : <strong>1–2 s</strong>.
          Frappe égale à celle de l'utilisateur.
        </p>
      </div>

      <div className="pda-page__section">[ TECHNIQUE SPÉCIALE ]</div>
      <div className="pda-abilities">
        {ABILITIES.map(a => (
          <div key={a.key} className={`pda-ab ${a.ult ? 'pda-ab--ult' : ''}`} data-testid={`pda-ability-${a.key}`}>
            <div className="pda-ab__key">{a.key}</div>
            <div className="pda-ab__body">
              <div className="pda-ab__head">
                <span className="pda-ab__name">{a.name}</span>
                <span className="pda-ab__meta">◉ RANG {a.cost} · {a.dur}</span>
              </div>
              <p className="pda-ab__desc">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VitalRow({ label, value, max, pctValue = 0, hideBar = false }) {
  return (
    <div className="pda-vital">
      <span className="pda-vital__label">{label}</span>
      {!hideBar && (
        <span className="pda-vital__bar">
          <BlockBar value={pctValue} />
        </span>
      )}
      <span className={`pda-vital__val ${hideBar ? 'pda-vital__val--big' : ''}`}>
        {value}{max ? <span className="pda-vital__max">/{max}</span> : ''}
      </span>
    </div>
  )
}

function BlockBar({ value = 0, total = 20 }) {
  const filled = Math.round((value / 100) * total)
  return (
    <span className="pda-blockbar" aria-label={`${value}%`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`pda-blockbar__cell ${i < filled ? 'pda-blockbar__cell--on' : ''}`}
        />
      ))}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : HISTOIRE
// ═══════════════════════════════════════════════════════════════════
function PDAHistoire() {
  const [openId, setOpenId] = useState(1)

  return (
    <div className="pda-page" data-testid="pda-page-histoire">
      <div className="pda-page__title">&gt; HISTORY.LOG</div>
      <div className="pda-page__subtitle">5 entrées — tri chronologique</div>

      <ul className="pda-history">
        {HISTORY_CHAPTERS.map(ch => {
          const open = openId === ch.id
          return (
            <li key={ch.id} className={`pda-chap ${open ? 'pda-chap--open' : ''}`}>
              <button
                className="pda-chap__head"
                onClick={() => setOpenId(open ? null : ch.id)}
                data-testid={`pda-chap-${ch.id}`}
              >
                <span className="pda-chap__marker">{open ? '▼' : '▶'}</span>
                <span className="pda-chap__year">{ch.year}</span>
                <span className="pda-chap__title">{ch.title}</span>
              </button>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className="pda-chap__body"
                >
                  <p>{ch.body}</p>
                </motion.div>
              )}
            </li>
          )
        })}
      </ul>

      <div className="pda-page__note">&gt; Fin du journal — EOF_</div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : CONTACTS
// ═══════════════════════════════════════════════════════════════════
function PDAContacts() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return <PDAContactDetail contact={selected} onBack={() => setSelected(null)} />
  }

  const online  = CONTACTS_LIST.filter(c => c.status === 'online' || c.status === 'away')
  const offline = CONTACTS_LIST.filter(c => c.status === 'offline')

  return (
    <div className="pda-page" data-testid="pda-page-contacts">
      <div className="pda-page__title">&gt; CONTACTS.ADB</div>
      <div className="pda-page__subtitle">
        {CONTACTS_LIST.length} entrée(s) — {online.length} en ligne
      </div>

      <div className="pda-page__section">[ EN LIGNE ]</div>
      <ul className="pda-contacts">
        {online.map(c => (
          <ContactRow key={c.id} contact={c} onClick={() => setSelected(c)} />
        ))}
      </ul>

      <div className="pda-page__section">[ HORS LIGNE ]</div>
      <ul className="pda-contacts">
        {offline.map(c => (
          <ContactRow key={c.id} contact={c} onClick={() => setSelected(c)} />
        ))}
      </ul>
    </div>
  )
}

function ContactRow({ contact, onClick }) {
  const icon = contact.status === 'online' ? '●'
             : contact.status === 'away'   ? '◐'
             : '○'
  return (
    <li
      className={`pda-contact pda-contact--${contact.status}`}
      onClick={onClick}
      data-testid={`pda-contact-${contact.id}`}
    >
      <span className="pda-contact__dot">{icon}</span>
      <span className="pda-contact__body">
        <span className="pda-contact__name">{contact.name}</span>
        <span className="pda-contact__msg">{contact.msg || '—'}</span>
      </span>
      <span className="pda-contact__chev">▸</span>
    </li>
  )
}

function PDAContactDetail({ contact, onBack }) {
  const statusLabel = {
    online:  'EN LIGNE',
    away:    'ABSENT',
    offline: 'HORS LIGNE',
  }[contact.status]

  const conv = CONVERSATIONS[contact.id]

  return (
    <div className="pda-page" data-testid={`pda-contact-detail-${contact.id}`}>
      <div className="pda-page__title">&gt; {contact.name.toUpperCase()}.VCF</div>

      <div className="pda-detail">
        <div className="pda-detail__row">
          <span className="pda-detail__k">STATUT</span>
          <span className={`pda-detail__v pda-detail__v--${contact.status}`}>
            ● {statusLabel}
          </span>
        </div>
        <div className="pda-detail__row">
          <span className="pda-detail__k">PSEUDO</span>
          <span className="pda-detail__v">{contact.name}</span>
        </div>
        <div className="pda-detail__row">
          <span className="pda-detail__k">MESSAGE</span>
          <span className="pda-detail__v">{contact.msg || '—'}</span>
        </div>

        <div className="pda-page__section" style={{ marginTop: 14 }}>[ NOTE ]</div>
        <p className="pda-detail__note">{contact.note}</p>

        {/* Conversation */}
        {conv && (
          <>
            <div className="pda-page__section" style={{ marginTop: 14 }}>
              [ CONVERSATION ]
            </div>
            <div className="pda-conv" data-testid={`pda-conv-${contact.id}`}>
              {conv.date && <div className="pda-conv__date">— {conv.date} —</div>}
              {conv.messages.map((m, i) => {
                if (m.from === 'system') {
                  return (
                    <div key={i} className="pda-conv__sys">{m.text}</div>
                  )
                }
                const isSelf = m.from === SELF
                return (
                  <div key={i} className={`pda-conv__msg ${isSelf ? 'pda-conv__msg--self' : ''}`}>
                    <div className="pda-conv__head">
                      <span className="pda-conv__from">
                        {isSelf ? 'koga99' : contact.name}
                      </span>
                      {m.time && <span className="pda-conv__time">{m.time}</span>}
                    </div>
                    <div className={`pda-conv__text ${m.italic ? 'pda-conv__text--italic' : ''}`}>
                      &gt; {m.text}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        <button className="pda-btn" onClick={onBack} data-testid="pda-contact-back">
          ◀ Liste des contacts
        </button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SHELL (écran éteint OU boot) — même frame + même bouton power
// ═══════════════════════════════════════════════════════════════════
function PDAShell({ powerState, onPower, currentApp, navigateTo, animatingOff = false, onOffAnimationEnd }) {
  const rootClass =
    powerState === 'booting'
      ? 'pda pda--boot'
      : `pda pda--off${animatingOff ? ' pda--off-anim' : ''}`

  return (
    <div className={rootClass} data-testid={`pda-${powerState}`}>
      <div className="pda__frame">
        <div className={`pda__screen ${powerState === 'booting' ? 'pda__screen--boot' : 'pda__screen--off'}`}>
          <div
            key={powerState}
            className="pda__screen-inner"
            onAnimationEnd={powerState === 'off' && animatingOff ? onOffAnimationEnd : undefined}
          >
            {powerState === 'booting' && <div className="pda__scanlines" />}
            {powerState === 'off' && (
              <div className="pda-off" data-testid="pda-off-screen">
                {/* Reflet diagonal sur écran éteint */}
                <div className="pda-off__hint">
                  <div className="pda-off__hint-text">
                    — appuyer sur ⏻ pour allumer —
                  </div>
                </div>
              </div>
            )}
            {powerState === 'booting' && <PDABootScreen />}
          </div>
        </div>

        <PDAButtonsRow
          currentApp={currentApp}
          navigateTo={navigateTo}
          onPower={onPower}
          powerOn={powerState !== 'off'}
        />

        <div className="pda__brand">
          <span>PYR//TECH</span>
          <small>PDA-98</small>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// BOOT SCREEN
// ═══════════════════════════════════════════════════════════════════
function PDABootScreen() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const id = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pda-boot">
      <div className="pda-boot__logo">
        <span>PYR//</span>
        <small>Personal Digital Assistant</small>
      </div>
      <div className="pda-boot__text">
        <p>Initialisation système{dots}</p>
        <div className="pda-boot__progress">
          <motion.div
            className="pda-boot__progress-bar"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </div>
        <p className="pda-boot__version">v2.5b — © 2000 Shokan no Kishi</p>  
      </div>
    </div>
  )
}