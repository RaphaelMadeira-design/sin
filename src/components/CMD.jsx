import { useState, useRef, useEffect } from 'react'
import '../styles/CMD.scss'

const BOOT_LINES = [
'Nicrosoft(R) Vindows 98',
'(C)Copyright Nicrosoft Corp XXXX-XXXX.',
'',
]

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF'

const COMMANDS = {
help: () => [
'Commandes disponibles :',
'',
'  help              Affiche cette aide',
'  ver               Version du système',
'  whoami            Informations utilisateur',
'  dir               Liste les fichiers',
'  cls               Efface l\'écran',
'  echo [msg]        Affiche un message',
'  ping [host]       Teste la connexion',
'  auth [LVL] [tok]  Authentification Kishi-NET',
'  status            Affiche la clearance actuelle',
'  logout            Ferme la session Kishi-NET',
'  matrix            ???',
'  hack              ???',
'  koga              ???',
'  sudo              ???',
'  format c:         ATTENTION',
'',
'Tapez une commande et appuyez sur Entrée.',
],

ver: () => [
'',
'Nicrosoft Vindows 98 [Version 4.10.2222]',
'Pyrakitaï Edition — Build 0001',
'',
],

whoami: () => [
'',
'┌─────────────────────────────────┐',
'│  UTILISATEUR : Isen Shura       │',
'│  RANG        : E                │',
'│  CLAN        : Magaishi         │',
'│  SHOKAN      : [DIVERS]         │',
'│  STATUT      : VIVANT           │',
'└─────────────────────────────────┘',
'',
],

dir: () => [
'',
' Répertoire de C:\\ISEN\\SYSTEM32',
'',
'  TROJAN.exe      42 Ko',
'  RAPPORT_SHOKAN.dat    ???  Ko',
'  new_tricks.txt             18 Ko',
'  SNAKE.exe                 8 Ko',
'  JUMP.exe                  6 Ko',
'  TSL.txt               1337 Ko',
'  MEMORIES.locked         [ACCÈS REFUSÉ]',
'  --------                          ',
'  7 fichier(s)    ??? Ko disponibles',
'',
],

sudo: () => [
'',
'sudo: command not found',
'Ce n\'est pas Linux ici, tu crois qu\'on est chez qui ?',
'',
],

koga: () => [
'',
'> Initialisation du protocole SHOKAN NO KISHI...',
'> Chargement des données de personnage...',
'> ...',
'> ...',
'> [DONNÉES CORROMPUES]',
'> Certaines vérités ne sont pas encore accessibles.',
'> Réessaie plus tard.',
'',
],

auth: '__AUTH__',

logout: () => {
sessionStorage.removeItem('cgu_clearance')
return [
'',
'> Session Kishi-NET fermée. Clearance révoquée.',
'',
]
},

status: () => {
const lvl = parseInt(sessionStorage.getItem('cgu_clearance') || '0', 10)
return [
'',
'┌─────────────────────────────────┐',
`│ SESSION KISHI-NET               │`,
`│ CLEARANCE ACTUELLE : NIVEAU ${lvl}    │`,
`│ UTILISATEUR : K. Igarashi       │`,
`│ POSTE : KIBA-PC98               │`,
'└─────────────────────────────────┘',
'',
]
},

'format c:': () => [
'',
'Avertissement : Cette opération va effacer TOUS les fichiers.',
'Êtes-vous sûr(e) ? (O/N)',
'...',
'...',
'...',
'...',
'...',
'...',
'..?',
'???',
'...',
'...',
'T\'as vraiment essayé ? Respect.',
'',
],

matrix: '__MATRIX__',
hack: '__HACK__',
}

function generateHackLines() {
const lines = [
'Initialisation du protocole de connexion...',
'Bypass firewall... [OK]',
'Injection de paquets... [OK]',
'Accès au système SHOKAN NO KISHI... [OK]',
'Déchiffrement des données...',
'> MÉMOIRE FRAGMENT #1 : [ILLISIBLE]',
'> MÉMOIRE FRAGMENT #2 : "...il ne faut pas..."',
'> MÉMOIRE FRAGMENT #3 : [CORROMPU]',
'> MÉMOIRE FRAGMENT #4 : "...je suis encore là..."',
'Connexion terminée.',
'Tu n\'aurais pas dû chercher.',
'',
]
return lines
}

export default function CMD() {
const [history, setHistory] = useState(BOOT_LINES)
const [input, setInput] = useState('')
const [cmdHistory, setCmdHistory] = useState([])
const [historyIndex, setHistoryIndex] = useState(-1)
const [isMatrix, setIsMatrix] = useState(false)
const [isHacking, setIsHacking] = useState(false)
const bottomRef = useRef(null)
const inputRef = useRef(null)
const matrixRef = useRef(null)

useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [history])

useEffect(() => {
inputRef.current?.focus()
}, [])

// Matrix effect
useEffect(() => {
if (!isMatrix) return
const canvas = matrixRef.current
if (!canvas) return
const ctx = canvas.getContext('2d')
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight
const cols = Math.floor(canvas.width / 16)
const drops = Array(cols).fill(1)

const draw = () => {
ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = '#00ff41'
ctx.font = '14px monospace'
drops.forEach((y, i) => {
const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
ctx.fillText(char, i * 16, y * 16)
if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0
drops[i]++
})
}

const interval = setInterval(draw, 50)
const timeout = setTimeout(() => {
clearInterval(interval)
setIsMatrix(false)
setHistory(prev => [...prev, '> Séquence terminée. Tu as vu ce que tu voulais voir.', ''])
}, 6000)

return () => { clearInterval(interval); clearTimeout(timeout) }
}, [isMatrix])

const runCommand = (raw) => {
const cmd = raw.trim().toLowerCase()
const newHistory = [...history, `C:\\WINDOWS> ${raw}`]

if (cmd === 'cls') {
setHistory(['C:\\WINDOWS>'])
return
}

if (cmd.startsWith('echo ')) {
setHistory([...newHistory, raw.slice(5), ''])
return
}

if (cmd.startsWith('ping ')) {
const host = raw.slice(5).trim()
setHistory([...newHistory,
``,
`Envoi d'une requête 'ping' sur ${host}...`,
`Réponse de ${host} : délai=1337ms TTL=98`,
`Réponse de ${host} : délai=404ms  TTL=98`,
`Réponse de ${host} : délai=∞ms    TTL=0`,
`Réponse de ${host} : [AUCUNE RÉPONSE]`,
``,
`Statistiques : connexion établie puis perdue.`,
`Certains hôtes ne répondent pas. C'est leur choix.`,
``,
])
return
}

if (cmd === 'matrix') {
setHistory([...newHistory, '> Activation de la séquence Matrix...', '> Appuie sur une touche pour arrêter.'])
setIsMatrix(true)
return
}

if (cmd === 'hack') {
setIsHacking(true)
const lines = generateHackLines()
let i = 0
const base = [...newHistory]
const interval = setInterval(() => {
base.push(lines[i])
setHistory([...base])
i++
if (i >= lines.length) {
clearInterval(interval)
setIsHacking(false)
}
}, 300)
return
}

// ─── Authentification Kishi-NET ───
if (cmd.startsWith('auth ')) {
const parts = raw.trim().split(/\s+/)
const level = (parts[1] || '').toUpperCase()
const token = (parts[2] || '').toUpperCase()

const VALID = {
'NIVEAU-1': { token: 'ECHO77', lvl: 1 },
'NIVEAU-2': { token: 'KISHI-OMEGA', lvl: 2 },
'NIVEAU-3': { token: 'KOGA-VEIL', lvl: 3 },
}

if (!VALID[level]) {
setHistory([...newHistory,
'',
`> Erreur : niveau "${level || '(vide)'}" inconnu.`,
'> Format : auth NIVEAU-X TOKEN',
'',
])
return
}
if (VALID[level].token !== token) {
setHistory([...newHistory,
'',
'> ╳ Token rejeté. Tentative consignée.',
`> Niveau demandé : ${level}`,
'',
])
return
}
sessionStorage.setItem('cgu_clearance', String(VALID[level].lvl))
setHistory([...newHistory,
'',
'> ████████████████████████████████',
`> ✓ Authentification ${level} validée.`,
`> Clearance élevée à NIVEAU ${VALID[level].lvl}.`,
'> Bienvenue, Agent SHURA.',
'> ████████████████████████████████',
'',
])
return
}

const result = COMMANDS[cmd]
if (result) {
setHistory([...newHistory, ...result()])
} else if (cmd === '') {
setHistory([...newHistory, 'C:\\WINDOWS>'])
} else {
setHistory([...newHistory,
`'${cmd}' n'est pas reconnu comme commande interne ou externe.`,
'',
])
}
}

const handleKeyDown = (e) => {
if (e.key === 'Enter') {
if (isHacking) return
if (isMatrix) { setIsMatrix(false); return }
runCommand(input)
setCmdHistory(prev => [input, ...prev])
setHistoryIndex(-1)
setInput('')
} else if (e.key === 'ArrowUp') {
e.preventDefault()
const next = Math.min(historyIndex + 1, cmdHistory.length - 1)
setHistoryIndex(next)
setInput(cmdHistory[next] || '')
} else if (e.key === 'ArrowDown') {
e.preventDefault()
const next = Math.max(historyIndex - 1, -1)
setHistoryIndex(next)
setInput(next === -1 ? '' : cmdHistory[next])
}
}

return (
<div className="cmd" onClick={() => inputRef.current?.focus()} data-testid="cmd-window">
{isMatrix && (
<canvas
ref={matrixRef}
className="cmd__matrix"
onClick={() => setIsMatrix(false)}
/>
)}
<div className="cmd__output">
{history.map((line, i) => (
<div key={i} className="cmd__line">{line}</div>
))}
<div className="cmd__input-row" ref={bottomRef}>
{!isMatrix && !isHacking && (
<>
<span className="cmd__prompt">C:\WINDOWS&gt; </span>
<input
ref={inputRef}
className="cmd__input"
value={input}
onChange={e => setInput(e.target.value)}
onKeyDown={handleKeyDown}
spellCheck={false}
autoComplete="off"
data-testid="cmd-input"
/>
</>
)}
</div>
</div>
</div>
)
}