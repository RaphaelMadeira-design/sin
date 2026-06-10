import { useState } from 'react'
import Sounds from '../components/Sounds'

const ICONS = {
  folderClosed: 'https://win98icons.alexmeub.com/icons/png/directory_closed-4.png',
  folderOpen:   'https://win98icons.alexmeub.com/icons/png/directory_open_cool-3.png',
  myDocs:       'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png',
  txt:          'https://win98icons.alexmeub.com/icons/png/notepad_file-0.png',
  mp3:          'https://win98icons.alexmeub.com/icons/png/wm_file-5.png',
  img:          'https://win98icons.alexmeub.com/icons/png/kodak_imaging_file-0.png',
}

const getFileIcon = (name = '') => {
  if (name.endsWith('.mp3')) 
    return ICONS.mp3
  if (name.match(/.(jpg|jpeg|png|gif|bmp)$/i)) 
    return ICONS.img
  return ICONS.txt
}

export const FILE_TREE = {
  root: {
    name: 'Mes Documents',
    children: ['histoire', 'musique', 'images', 'important'],
  },

  // --- Histoire ---
  histoire: {
    name: 'Histoire',
    parent: 'root',
    children: ['chapitre1', 'chapitre2', 'chapitre3'],
  },
  chapitre1: {
    name: 'Chapitre I - Les Origines',
    parent: 'histoire',
    children: ['c1p1', 'c1p2', 'c1p3'],
  },
  chapitre2: {
    name: "Chapitre II - L'Éveil",
    parent: 'histoire',
    children: ['c2p1', 'c2p2'],
  },
  chapitre3: {
    name: 'Chapitre III - Le Chemin',
    parent: 'histoire',
    children: ['c3p1'],
  },
  c1p1: { 
    name: 'Partie 1 - Naissance.txt',     
    parent: 'chapitre1', 
    type: 'file', 
    content: `CHAPITRE I — LES ORIGINES
    Partie 1 : Naissance
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    23 mai 6070. Quartier de Bunkyo, Tokyo.

    Kiba Igarashi voit le jour au sein de la famille Igarashi, une lignee mineure quasi oubliée, éclipsée par les branches superieures du clan Magaishi. Contrairement aux lignées principales, ou les héritiers sont formes des l'enfance pour occuper des fonctions stratégiques, la branche dont il est issu occupe une position de second plan, souvent reléguée à des rôles d'exécution ou de soutien.

    Ses parents, bien que membres du clan, n'ont jamais été très impliqués dans les affaires internes. Ils ont laissé une grande liberté à leur fils, tant qu'il respectait les règles de base. Ce coté indépendant lui a permis d'explorer ses propres intérêts et de développer sa personnalité sans être constamment comparé à des figures plus prestigieuses de la famille.

    De ce fait, Kiba a grandi loin des projecteurs et dans une relative obscurité, sans les pressions et les attentes qui pèsent sur les membres plus en vue du clan. Une enfance presque ordinaire, si l'on oublie le nom qu'il porte et le sang qui coule dans ses veines.

    Personne, à ce moment-là, ne soupconnait ce que cet enfant deviendrait.

    [FIN DE LA PARTIE 1]`
  },
  c1p2: { 
    name: 'Partie 2 - Enfance.txt',        
    parent: 'chapitre1', 
    type: 'file', 
    content: `CHAPITRE I — LES ORIGINES
    Partie 2 : Enfance
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Élevé dans le quartier de Bunkyo a Tokyo, Kiba n'a pas eu d'enfance particulierement dure, ni reellement privilégiée. Les ruelles étroites, les parcs bordés d'érables, les toits accessibles par les escaliers de secours, tout cela est devenu son terrain de jeu bien avant qu'il ne sache ce qu'était le parkour.

    Il passait ses journées a vadrouiller dans les rues des différents quartiers de la capitale, sautant par-dessus les murets, grimpant aux façades des immeubles abandonnes, courant sur les toits des garages. Ce n'était pas par rebellion, mais plutôt par instinct. Quelque chose en lui cherchait le mouvement, l'espace et la vitesse.

    A l'école, Kiba était le genre de gamin qu'on ne remarque pas vraiment. Ce n'était pas le meilleur mais pas le pire non plus, juste dans la moyenne. Il était sociable sans pour autant être envahissant, il savait écouter, plaisanter, s'adapter ou même s'affirmer, mais il ne se livrait jamais complètement. Même enfant, il gardait une certaine distance, comme si une partie de lui observait le monde plutôt que d'y participer pleinement.

    Ses parents ne posaient pas de questions. La liberté qu'ils lui accordaient n'était pas de l'indifférence, c'était une forme de confiance silencieuse. Tant qu'il rentrait avant la nuit, tant qu'il ne déshonorait pas le nom des Igarashi ou qu'il ne s'apportait pas trop d'ennuis, il pouvait faire ce qu'il voulait.

    Et ce qu'il voulait, c'était courir librement.

    [FIN DE LA PARTIE 2]` 
  },
  c1p3: { 
    name: 'Partie 3 - Premier éveil.txt',  
    parent: 'chapitre1', 
    type: 'file', 
    content: `CHAPITRE I — LES ORIGINES
    Partie 3 : Premier éveil
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    C'est au collège que tout à réellement commencé.

    Ses journées passées à profiter de cette liberté en vadrouillant dans les rues l'amènent à faire la rencontre de Ryohei Nishikawa, un camarade de classe qui deviendra rapidement son meilleur ami. Ryohei est le leader naturel d'un petit groupe cherchant à former un club de parkour au sein du college.

    Il recrute Kiba afin de permettre la création officielle du club, qui est completé par Kazuki Kurogane, un garçon sûr de lui, ambitieux, et cherchant a surpasser Ryohei ; ainsi que Aoi Kanzaki, une adolescente silencieuse, analytique, et qui est le véritable cerveau stratégique de la future équipe.

    Les Ura Ura Kidz sont nés.

    Pour Kiba, c'était la première fois qu'il ressentait ça, ce sentiment d'appartenance. Pas lié au clan pour qui il n'était qu'un pion de plus, ni lié au sang. Juste quatre gamins qui couraient ensemble, qui se poussaient mutuellement, qui rêvaient de devenir les meilleurs traceurs de Tokyo.

    Ryohei avait cette énergie contagieuse. Il voyait en chaque toit un chemin et en chaque mur une possibilité de continuer. Il disait toujours : \"Le parkour, c'est pas juste sauter, c'est choisir de ne pas s'arrêter.\". Une expression qu'il avait emprunté à un traceur français très connu de la scène européenne, lu dans un vieux magazine qu'il considérait comme sa bible personnelle.

    Kiba ne le savait pas encore, mais cette phrase allait définir le reste de sa vie.

    [FIN DE LA PARTIE 3]`
  },
  c2p1: { 
    name: 'Partie 1 - La Découverte.txt',  
    parent: 'chapitre2', 
    type: 'file', 
    content: `CHAPITRE II — L'EVEIL
    Partie 1 : La Découverte
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Sous le nom des Ura Ura Kidz, ils participent à des courses clandestines contre d'autres équipes des collèges de l'arrondissement de Bunkyo. Leur progression est fulgurante. Leur cohésion, leur créativité et leur style attirent l'attention des Tenku Striders, une équipe de lycéens réputée dans tout Tokyo.

    Un tournoi final est organisé. Les meilleures équipes des collèges environnants s'affrontent. Une seule equipe sera choisie et aura le privilège de porter le nom de Tenku Striders et de poursuivre leur travail.

    Les Ura Ura Kidz parviennent jusqu'en finale sans trop de mal. Mais lors de cette course décisive, tout bascule.

    Alors que la victoire semble à leur portée, Kazuki révèle ses véritables intentions et trahit le groupe. Au moment d'un saut critique, il pousse volontairement Ryohei dans le vide.

    La chute est violente et malgré les tentatives désespérées de Kiba et Aoi pour le rattraper, Ryohei s'ecrase lourdement après plusieurs mètres de chute libre. Graves blessures aux jambes, la course est perdue. Les Tenku Striders se voient dans l'obligation de recruter l'équipe adverse, avec Kazuki à leur tête.

    Ce jour-là, quelque chose s'est brisé chez Kiba. Mais ce n'est pas sa determination ; plutôt sa naïveté qui s'envole en éclats. Il a compris que le monde ne récompensait pas toujours les meilleurs. Parfois, il récompensait les plus cruels.

    [FIN DE LA PARTIE 1]` 
  },
  c2p2: { 
    name: 'Partie 2 - Premier combat.txt', 
    parent: 'chapitre2', 
    type: 'file', 
    content: `CHAPITRE II — L'EVEIL
    Partie 2 : Premier combat
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Après une longue réeducation, Ryohei parvient à remarcher mais ne peut plus pratiquer le parkour au même niveau. A leur entrée au lycée, il choisit d'abandonner son rêve d'être le meilleur traceur du Japon et se tourne vers la gestion.

    Avant de tourner la page, il confie ses dernières instructions à son meilleur ami : \"Continue. Avance. Ne laisse pas cette trahison être la fin de notre histoire. Un mur sur notre route n'est pas un obstacle, c'est une invitation à créer notre propre chemin.\"

    Encouragés par leur ami, Kiba et Aoi fondent leur propre équipe : les Bunkyo City Bolts, en hommage à leur quartier d'origine, comme pour prévenir les nouveaux Tenku Striders qu'ils en sont les dignes représentants. Leur approche change drastiquement. Moins naïve, plus directe et plus ancrée dans la performance plutôt que dans le rêve.

    Ils sont rejoints par Hidemichi Oyama, un lycéen a la carrure impressionnante, et Daigo Kawamura, considéré comme l'un des traceurs les plus rapides du nord de Tokyo.

    Les Bolts se font rapidement un nom. Rapides, agressifs, imprevisibles et surtout, chaque membre détient un Shokan. C'est ainsi qu'ils intègrent la Tokyo Skyrunner League, une compétition officieuse mais extrêmement influente, où l'utilisation de Shokan est autorisée, même indispensable pour concourir.

    C'est là que Kiba découvre l'utilité de son propre Shokan pour la première fois. Au milieu d'une course, pris entre deux immeubles, sans prise et sans issue, une main d'apparence spectrale jaillit de nulle part et le rattrape. Une main qui n'appartenait à personne d'autre qu'à lui-même.

    Echo Rémanent sera son atout pour se hisser au sommet.

    [FIN DE LA PARTIE 2]` 
  },
  c3p1: { 
    name: 'Partie 1 - En cours.txt',       
    parent: 'chapitre3', 
    type: 'file', 
    content: `CHAPITRE III — LE CHEMIN
    Partie 1 : Disparition
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ryohei commence à s'intéresser à ce qui entoure réellement la Tokyo Skyrunner League. Il repère un schéma : des Chevaliers de rang faible, aux Shokans instables ou atypiques, qui disparaissent du circuit du jour au lendemain et les organisateurs n'en parlent jamais.

    Et puis il y a les silhouettes. Des figures immobiles, aux yeux ambrés luisants, postées en hauteur tout au long des parcours. Elles observent toujours les mêmes participants. La majorité les ignore et ceux qui les pointent publiquement du doigt finissent rarement par les revoir.

    Lors de leurs derniers échanges, Ryohei confie à Kiba une intuition troublante : quelqu'un observe la ligue et sélectionne. Ceux qui possèdent un Shokan particulierement instable, atypique ou prometteur.

    Puis, quelques mois après l'obtention de leur diplôme, Ryohei cesse de répondre. Il laisse un dernier message : \"Je m'absente un moment. Inutile de me chercher.\"

    Les messages restent sans réponse, les appels tombent dans le vide et les lieux qu'il fréquentait sont devenus déserts. Comme s'il avait simplement disparu au bon moment.

    Aujourd'hui, plus de 2 mois après sa disparition, Kiba poursuit les recherches. Chaque course est devenue une analyse. Chaque adversaire est une piste ou un suspect. Et chaque disparition, une répétition du même schéma.

    La question reste ouverte :
    Saura-t-il percer le secret de la disparition de son meilleur ami ?

    [...A SUIVRE...]`  
  },

  // --- Musique ---
  musique: {
    name: 'Musique',
    parent: 'root',
    children: ['mus1', 'mus2', 'mus3', 'mus4', 'mus5'],
  },
  mus1: { 
    name: 'dust.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track01.mp3' 
  },
  mus2: { 
    name: 'sun.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track02.mp3' 
  },
  mus3: { 
    name: 'interlinked.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track03.mp3' 
  },
  mus4: { 
    name: 'rnb.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track04.mp3' 
  },
  mus5: { 
    name: 'fractures.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track05.mp3' 
  },

  // --- Images ---
  images: {
    name: 'Images',
    parent: 'root',
    children: ['img1', 'img2', 'img3', 'img4'],
  },
  img1: { 
    name: '1.jpg', 
    parent: 'images', 
    type: 'file', 
    content: null, 
    imageFile: '/images/1.jpg' 
  },
  img2: { 
    name: '2.jpg', 
    parent: 'images', 
    type: 'file', 
    content: null, 
    imageFile: '/images/2.jpg' 
  },
  img3: { 
    name: '3.jpg', 
    parent: 'images', 
    type: 'file', 
    content: null, 
    imageFile: '/images/3.jpg' 
  },
  img4: { 
    name: '4.jpg', 
    parent: 'images', 
    type: 'file', 
    content: null, 
    imageFile: '/images/4.jpg' 
  },
  // --- Autre ---
  important: {
    name: 'Important',
    parent: 'root',
    children: ['mdp'],
  },
  mdp: {
    name: 'Mots de passe.txt',
    parent: 'important',
    type: 'file',
    content: `MOTS DE PASSE — NE PAS PARTAGER
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ordinateur      : kiba.igarashi99
    Wi-Fi           : zqSd45hBPm7!4aJmM
    MSN Messenger   : koga99@hotmail.jp / bcb99
    Forum parkour   : CrocEcarlate / ********
    Compte banque   : 6524 JP88 4579 5***

    NOTE : Changer mes mots de passe
    Check les articles sur ActuNet
    Aller voir les parents de Ryo`
  }
}

// Remonte les ancêtres d'un nœud (root inclus)
const getAncestors = (id) => {
  const ancestors = new Set()
  let cur = FILE_TREE[id]?.parent
  while (cur) {
    ancestors.add(cur)
    cur = FILE_TREE[cur]?.parent
  }
  return ancestors
}

// Composant récursif pour l'arbre latéral
function TreeNode({ id, depth, currentFolder, selectedItem, onNavigate, onSelectFile }) {
  const node = FILE_TREE[id]
  if (!node) return null

  const isFolder = !node.type
  const isCurrentFolder = currentFolder === id
  const ancestors = getAncestors(currentFolder)
  const isExpanded = isCurrentFolder || ancestors.has(id)

  const icon = id === 'root'
    ? ICONS.myDocs
    : isFolder
      ? (isExpanded ? ICONS.folderOpen : ICONS.folderClosed)
      : getFileIcon(node.name)

  return (
    <div>
      <div
        className={`file-explorer__tree-item${isCurrentFolder ? ' file-explorer__tree-item--selected' : ''}`}
        style={{ paddingLeft: `${depth * 14 + 4}px` }}
        onClick={() => isFolder ? onNavigate(id) : onSelectFile(id)}
        onDoubleClick={() => !isFolder && onSelectFile(id)}
        data-testid={`tree-${id}`}
      >
        <img src={icon} alt="" />
        {node.name}
      </div>

      {/* Enfants affichés si le dossier est expanded */}
      {isFolder && isExpanded && node.children?.map(childId => (
        <TreeNode
          key={childId}
          id={childId}
          depth={depth + 1}
          currentFolder={currentFolder}
          selectedItem={selectedItem}
          onNavigate={onNavigate}
          onSelectFile={onSelectFile}
        />
      ))}
    </div>
  )
}

export default function FileExplorer({ onOpenNotepad, onPlayMusic, onOpenImage, initialFolder = 'root' }) {
  const [currentFolder, setCurrentFolder] = useState(initialFolder)
  const [selectedItem, setSelectedItem] = useState(null)
  const [history, setHistory] = useState(() => {
    const path = []
    let cur = initialFolder
    while (cur) { path.unshift(cur); cur = FILE_TREE[cur]?.parent || null }
    return path
  })

  const getPathTo = (id) => {
    const path = []
    let cur = id
    while (cur) {
      path.unshift(cur)
      cur = FILE_TREE[cur]?.parent || null
    }
    return path
  }

  const navigateFolder = (id) => {
    if (id === currentFolder) return
    Sounds.navigate()
    setHistory(getPathTo(id))
    setCurrentFolder(id)
    setSelectedItem(null)
  }

  const openFile = (id) => {
    const node = FILE_TREE[id]
    if (!node || node.type !== 'file') return
    setSelectedItem(id)
    if (node.name.endsWith('.txt') && onOpenNotepad) {
      onOpenNotepad({ id, name: node.name, content: node.content })
    }
    if (node.name.endsWith('.mp3') && onPlayMusic) {
      onPlayMusic({ file: node.musicFile, title: node.name.replace('.mp3', '') })
    }
    if (node.name.match(/\.(png|jpg|jpeg|gif|bmp)$/i) && onOpenImage) {
      onOpenImage({ file: node.imageFile, name: node.name })
    }
  }

  const goBack = () => {
    if (history.length <= 1) return
    const newHistory = history.slice(0, -1)
    setHistory(newHistory)
    setCurrentFolder(newHistory[newHistory.length - 1])
    setSelectedItem(null)
  }

  const current = FILE_TREE[currentFolder]
  const children = current?.children || []
  const addressPath = history.map(id => FILE_TREE[id]?.name || id).join('\\')

  return (
    <div className="file-explorer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Menubar */}
      <div className="win98-window__menubar">
        <span>Fichier</span>
        <span>Édition</span>
        <span>Affichage</span>
        <span>Aide</span>
      </div>

      {/* Toolbar */}
      <div className="win98-window__toolbar">
        <button
          className={`win98-window__toolbar-btn ${history.length <= 1 ? 'win98-window__toolbar-btn--disabled' : ''}`}
          onClick={goBack}
          data-testid="explorer-back"
          disabled={history.length <= 1}
          style={{ gap: '4px' }}
        >
          <span style={{ fontSize: '13px', lineHeight: 1 }}>◄</span>
          Précédent
        </button>
      </div>

      {/* Barre d'adresse */}
      <div className="win98-window__address-bar">
        <label>Adresse</label>
        <input
          type="text"
          value={`C:\\Kiba\\${addressPath}`}
          readOnly
          data-testid="explorer-address"
        />
      </div>

      {/* Panneaux */}
      <div className="file-explorer__panes" style={{ flex: 1, overflow: 'hidden' }}>

        {/* Arbre de navigation */}
        <div className="file-explorer__tree">
          <TreeNode
            id="root"
            depth={0}
            currentFolder={currentFolder}
            selectedItem={selectedItem}
            onNavigate={navigateFolder}
            onSelectFile={openFile}
          />
        </div>

        {/* Zone de contenu */}
        <div className="file-explorer__content">
          <div className="file-explorer__grid">
            {children.map(id => {
              const node = FILE_TREE[id]
              const isFolder = !node.type
              return (
                <div
                  key={id}
                  className={`file-explorer__file-item ${selectedItem === id ? 'file-explorer__file-item--selected' : ''}`}
                  onClick={() => setSelectedItem(id)}
                  onDoubleClick={() => isFolder ? navigateFolder(id) : openFile(id)}
                  data-testid={`explorer-item-${id}`}
                >
                  <img src={isFolder ? ICONS.folderClosed : getFileIcon(node.name)} alt="" />
                  <span>{node.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Barre de statut */}
      <div className="win98-window__statusbar">
        <span>{children.length} objet(s)</span>
        <span>{`C:\\Kiba\\${addressPath}`}</span>
      </div>
    </div>
  )
}