import { useState, useEffect, useRef } from 'react'
import Sounds from '../components/Sounds'
import '../styles/MyComputer.scss'

/* -----------------------------------------------------------
Icones Win98 (alexmeub)
----------------------------------------------------------- */
const ICONS = {
myComputer:   'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png',
hdd:          'https://win98icons.alexmeub.com/icons/png/hard_disk_drive-4.png',
floppy:       'https://win98icons.alexmeub.com/icons/png/floppy_drive_3_5_cool-0.png',
floppyLocked: 'https://win98icons.alexmeub.com/icons/png/floppy_drive_3_5_cool-0.png',
controlPanel: 'https://win98icons.alexmeub.com/icons/png/directory_control_panel-4.png',
folder:       'https://win98icons.alexmeub.com/icons/png/directory_closed-0.png',
explorer:       'https://win98icons.alexmeub.com/icons/png/directory_explorer-2.png',
windowsDir:   'https://win98icons.alexmeub.com/icons/png/directory_open_cool-5.png',
programFiles: 'https://win98icons.alexmeub.com/icons/png/directory_closed-0.png',
txt:          'https://win98icons.alexmeub.com/icons/png/notepad-4.png',
exe:          'https://win98icons.alexmeub.com/icons/png/executable-0.png',
bat:          'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png',
sys:          'https://win98icons.alexmeub.com/icons/png/message_file-0.png',
warning:      'https://win98icons.alexmeub.com/icons/png/msg_warning-0.png',
error:        'https://win98icons.alexmeub.com/icons/png/msg_error-0.png',
info:         'https://win98icons.alexmeub.com/icons/png/msg_information-0.png',
key:          'https://win98icons.alexmeub.com/icons/png/key_win-0.png',
}

/* -----------------------------------------------------------
Arborescence "Poste de travail"
----------------------------------------------------------- */
const TREE = {
computer: {
name: 'PC',
children: ['driveA', 'driveB', 'driveC'],
isRoot: true,
},

driveA: {
name: 'Disquette 3½ (A:)',
parent: 'computer',
drive: 'A',
icon: ICONS.floppy,
empty: true,
},

driveB: {
name: 'Disquette chiffrée (B:)',
parent: 'computer',
drive: 'B',
icon: ICONS.floppyLocked,
locked: true,
password: 'echo-remanent',
children: ['b_readme', 'b_log', 'b_keys'],
},
b_readme: {
name: 'LISEZ-MOI.txt',
parent: 'driveB',
type: 'file',
content: `[ DISQUETTE CHIFFRÉE — ACCÈS AUTORISÉ ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bravo. Tu as trouvé le mot de passe.

Cette disquette contient les fragments
qu'on a effacés du dossier officiel.

Garde ça pour toi. Ils nous surveillent.

—K.`,
},
b_log: {
name: 'observation.log',
parent: 'driveB',
type: 'file',
content: `>> LOG D'OBSERVATION — TOKYO SKYRUNNER LEAGUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[06/03] Silhouette aux yeux ambrés — toit nord. Immobile.
[12/03] Disparition de N.K. (Shokan instable, rang E).
[24/03] Ryohei : "Ils sélectionnent". Il a peur.
[02/04] Plus de signal. Plus de SMS. Plus rien.

Conclusion provisoire :
→ Ce ne sont pas des spectateurs.
→ Ce sont des recruteurs.`,
},
b_keys: {
name: 'cles_perdues.txt',
parent: 'driveB',
type: 'file',
content: `// fragments mémoire — ne pas effacer

ID_INTRANET   : kishi.kiba-99
PASS_INTRANET : ********
SHOKAN_SIGN   : echo-remanent / pattern 04-A
SAFE_HOUSE    : Bunkyo, 3-12, 5e étage
SIGNAL        : si je disparais, va voir Aoi.`,
},

driveC: {
name: 'Disque local (C:)',
parent: 'computer',
drive: 'C',
icon: ICONS.hdd,
children: ['c_windows', 'c_programs', 'c_users', 'c_autoexec', 'c_config', 'c_readme'],
},

c_windows: {
name: 'WINDOWS',
parent: 'driveC',
icon: ICONS.windowsDir,
children: ['win_system', 'win_command', 'win_wallpaper'],
},
win_system: {
name: 'SYSTEM',
parent: 'c_windows',
children: ['sys_kernel', 'sys_shokan'],
},
sys_kernel: {
name: 'KERNEL32.DLL',
parent: 'win_system',
type: 'file',
locked: true,
content: `// Fichier système — accès refusé
// Ce fichier ne doit pas être modifié.
// Ouverture en lecture seule.

[ ERREUR : module verrouillé par le système ]`,
},
sys_shokan: {
name: 'SHOKAN.DLL',
parent: 'win_system',
type: 'file',
content: `// SHOKAN.DLL — module spirituel
// version 6.07 — build "Echo Rémanent"

> Charge la signature du porteur
> Mappe les manifestations rémanentes
> Stabilise la projection

NOTE : NE PAS DÉSACTIVER.
L'arrêt du module entraîne perte de Shokan.`,
},
win_command: {
name: 'COMMAND.COM',
parent: 'c_windows',
type: 'file',
content: `MS-DOS COMMAND INTERPRETER
(C) Microsoft Corporation 1981-1998

Tape "exit" pour revenir à Windows.`,
},
win_wallpaper: {
name: 'WALLPAPER.BMP',
parent: 'c_windows',
type: 'file',
content: `[ Image bitmap 800x600 — Fond d'écran système ]
"Tokyo, toits — vue depuis Bunkyo, 3h12 AM"`,
},

c_programs: {
name: 'Program Files',
parent: 'driveC',
icon: ICONS.programFiles,
children: ['p_msn', 'p_ie', 'p_media', 'p_notepad'],
},
p_msn: {
name: 'MSN Messenger',
parent: 'c_programs',
type: 'file',
content: `MSN Messenger 4.7
(C) Microsoft Corporation 1999

Compte enregistré : koga99@hotmail.jp
Statut : en ligne
Contacts : 3`,
},
p_ie: {
name: 'Internet Explorer',
parent: 'c_programs',
type: 'file',
content: `Internet Explorer 5.5
(C) Microsoft Corporation 2000

Page d'accueil : kishi-net://intranet.local`,
},
p_media: {
name: 'Windows Media',
parent: 'c_programs',
type: 'file',
content: `Windows Media Player 6.4
Pour lire un titre, ouvre "Mes Documents > Musique".`,
},
p_notepad: {
name: 'Notepad.exe',
parent: 'c_programs',
type: 'file',
content: `Bloc-notes — éditeur de texte.
Glisse n'importe quel .txt dessus pour l'ouvrir.`,
},

u_explorer: {
name: 'Explorateur de fichiers',
parent: 'u_isen',
icon: ICONS.explorer,
type: 'shortcut',
target: 'explorer',
},

c_users: {
name: 'Users',
parent: 'driveC',
children: ['u_isen'],
},
u_isen: {
name: 'isen.shura',
parent: 'c_users',
children: ['u_desktop', 'u_explorer', 'u_pwd'],
},
u_desktop: {
name: 'Bureau',
parent: 'u_isen',
children: [],
},
u_pwd: {
name: 'note_perso.txt',
parent: 'u_isen',
type: 'file',
content: `Pense-bête —

- Rappeler Aoi avant minuit
- Vérifier le dossier "Important"
- Ne plus jamais croire Kazuki

— K.`,
},

c_autoexec: {
name: 'AUTOEXEC.BAT',
parent: 'driveC',
type: 'file',
content: `@ECHO OFF
PROMPT $P$G
PATH=C:WINDOWS;C:WINDOWSCOMMAND
SET TEMP=C:WINDOWSTEMP
LH C:WINDOWSSHOKAN.DLL
ECHO Bienvenue, Kiba.`,
},
c_config: {
name: 'CONFIG.SYS',
parent: 'driveC',
type: 'file',
content: `DEVICE=C:WINDOWSHIMEM.SYS
DOS=HIGH,UMB
FILES=60
BUFFERS=30
DEVICEHIGH=C:WINDOWSSHOKAN.SYS /STABLE`,
},
c_readme: {
name: 'LISEZ-MOI.txt',
parent: 'driveC',
type: 'file',
content: `PC-98 — Disque local C:
━━━━━━━━━━━━━━━━━━━━━━━━━━

Bienvenue sur la station de Isen Shura      .

Tu peux explorer librement :
• WINDOWS        — système (sensible, ne pas toucher)
• Program Files  — applications installées
• Mes Documents  — histoire, musiques, images
• Users          — profils utilisateurs

Si une disquette est insérée dans A:, son contenu
apparaîtra automatiquement. La disquette B: est chiffrée.`,
},
}

/* -----------------------------------------------------------
Helpers
----------------------------------------------------------- */
const fileIcon = (node) => {
const name = node.name || ''
if (name.endsWith('.BAT') || name.endsWith('.bat') || name.endsWith('.COM')) return ICONS.bat
if (name.endsWith('.exe') || name.endsWith('.EXE')) return ICONS.exe
if (name.endsWith('.SYS') || name.endsWith('.DLL') || name.endsWith('.dll') || name.endsWith('.sys')) return ICONS.sys
if (name.endsWith('.log')) return ICONS.sys
return ICONS.txt
}

const nodeIcon = (id) => {
const n = TREE[id]
if (!n) return ICONS.folder
if (n.icon) return n.icon
if (n.type === 'file') return fileIcon(n)
if (n.type === 'shortcut') return ICONS.explorer
return ICONS.folder
}

const getAddress = (history) =>
history
.map(id => {
const n = TREE[id]
if (!n) return id
if (n.isRoot) return 'PC'
if (n.drive) return `${n.drive}:`
return n.name
})
.join('\\')

/* -----------------------------------------------------------
Boîte de dialogue Win98 — Rendu INLINE (comme <Loading />)
✅ Plus de createPortal : utilise position:fixed comme Loading
✅ S'affiche au centre de l'écran CRT grâce au filter
qui crée un containing block sur .crt-monitor__content
----------------------------------------------------------- */
function Win98Dialog({ icon, title, children, onClose, buttons }) {
return (
<div
className="my-computer__dialog-backdrop"
onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.() }}
data-testid="mycomputer-dialog-backdrop"
>
<div
className="my-computer__dialog"
role="dialog"
aria-modal="true"
onMouseDown={(e) => e.stopPropagation()}
>
<div className="my-computer__dialog-titlebar">
<span>{title}</span>
</div>
<div className="my-computer__dialog-body">
{icon && <img src={icon} alt="" className="my-computer__dialog-icon" />}
<div className="my-computer__dialog-content">{children}</div>
</div>
<div className="my-computer__dialog-buttons">{buttons}</div>
</div>
</div>
)
}

/* -----------------------------------------------------------
Composant principal MyComputer
----------------------------------------------------------- */
export default function MyComputer({ onOpenNotepad, onOpenWindow }) {
const [history, setHistory] = useState(['computer'])
const [selected, setSelected] = useState(null)
const [unlocked, setUnlocked] = useState(false)

const [pwdDialog, setPwdDialog] = useState(false)
const [pwdInput, setPwdInput]   = useState('')
const [pwdError, setPwdError]   = useState(false)
const [floppyDialog, setFloppyDialog] = useState(false)
const [sysDialog, setSysDialog] = useState(null)

const pwdRef = useRef(null)
useEffect(() => { if (pwdDialog && pwdRef.current) pwdRef.current.focus() }, [pwdDialog])

const currentId = history[history.length - 1]
const current = TREE[currentId]

const enter = (id) => {
const node = TREE[id]
if (!node) return

if (node.type === 'shortcut') {
Sounds.click?.()
if (onOpenWindow && node.target) onOpenWindow(node.target)
return
}
if (node.empty) {
Sounds.error?.()
setFloppyDialog(true)
return
}
if (node.locked && !unlocked && node.drive === 'B') {
Sounds.error?.()
setPwdInput('')
setPwdError(false)
setPwdDialog(true)
return
}
if (node.type === 'file' && node.locked) {
Sounds.error?.()
setSysDialog({
title: 'Accès refusé',
message: `Le fichier "${node.name}" est protégé par le système et ne peut pas être ouvert.`
})
return
}
if (node.type === 'file') {
Sounds.click?.()
onOpenNotepad?.({ id, name: node.name, content: node.content })
return
}
Sounds.navigate?.()
setHistory(h => [...h, id])
setSelected(null)
}

const goBack = () => {
if (history.length <= 1) return
Sounds.navigate?.()
setHistory(h => h.slice(0, -1))
setSelected(null)
}
const goUp = goBack
const goHome = () => {
Sounds.navigate?.()
setHistory(['computer'])
setSelected(null)
}

const submitPwd = (e) => {
e?.preventDefault?.()
const target = TREE.driveB
if (pwdInput.trim().toLowerCase() === target.password) {
Sounds.click?.()
setUnlocked(true)
setPwdDialog(false)
setHistory(h => [...h, 'driveB'])
} else {
Sounds.error?.()
setPwdError(true)
}
}

const findDrive = (id) => {
let cur = id
while (cur && TREE[cur]) {
if (TREE[cur].drive) return TREE[cur]
cur = TREE[cur].parent
}
return null
}

const renderDrivesView = () => {
const drives = current.children.map(id => TREE[id])
return (
<div className="file-explorer__content">
<div className="my-computer__section-title">Les fichiers et dossiers stockés sur cet ordinateur</div>
<div className="file-explorer__grid">
{drives.map(d => {
const id = current.children[drives.indexOf(d)]
return (
<div
key={id}
className={`file-explorer__file-item ${selected === id ? 'file-explorer__file-item--selected' : ''}`}
onClick={() => setSelected(id)}
onDoubleClick={() => enter(id)}
data-testid={`mycomputer-drive-${d.drive}`}
>
<img src={d.icon} alt="" />
<span>{d.name}</span>
</div>
)
})}
</div>
</div>
)
}

const renderFolderView = () => {
const children = current.children || []
return (
<div className="file-explorer__content">
<div className="file-explorer__grid">
{children.map(id => {
const node = TREE[id]
return (
<div
key={id}
className={`file-explorer__file-item ${selected === id ? 'file-explorer__file-item--selected' : ''}`}
onClick={() => setSelected(id)}
onDoubleClick={() => enter(id)}
data-testid={`mycomputer-item-${id}`}
title={node.name}
>
<img src={nodeIcon(id)} alt="" />
<span>{node.name}</span>
</div>
)
})}
{children.length === 0 && (
<div className="my-computer__empty">Ce dossier est vide.</div>
)}
</div>
</div>
)
}

const renderLeftPane = () => {
if (current.isRoot) {
return (
<div className="my-computer__sidebar">
<div className="my-computer__sidebar-title">Poste de travail</div>
<div className="my-computer__sidebar-text">
Cette section vous permet d&apos;afficher le contenu de votre ordinateur.
<br /><br />
Cliquez sur un élément pour afficher sa description.
</div>
{selected && TREE[selected] && (
<>
<div className="my-computer__sidebar-sep" />
<div className="my-computer__sidebar-text">
<strong>{TREE[selected].name}</strong><br />
{TREE[selected].drive === 'A' && 'Lecteur de disquette 3½'}
{TREE[selected].drive === 'B' && 'Lecteur de disquette chiffrée'}
{TREE[selected].drive === 'C' && 'Disque dur local — système installé'}
</div>
</>
)}
</div>
)
}
const drive = findDrive(currentId)
return (
<div className="my-computer__sidebar">
<div className="my-computer__sidebar-title">{drive?.name || current.name}</div>
<div className="my-computer__sidebar-text">
{drive?.drive === 'C' && (<>Espace utilisé : 1.8 Go<br />Espace libre : 0.4 Go<br />Système : FAT32</>)}
{drive?.drive === 'B' && (<>Volume chiffré.<br />Lecture en clair autorisée.<br />Ne pas extraire.</>)}
{drive?.drive === 'A' && (<>Disquette 3½.<br />Capacité : 1.44 Mo.</>)}
</div>
</div>
)
}

const addressPath = getAddress(history)
const drive = findDrive(currentId)

return (
<div className="file-explorer my-computer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
<div className="win98-window__menubar">
<span>Fichier</span><span>Édition</span><span>Affichage</span><span>Aide</span>
</div>

<div className="win98-window__toolbar">
<button
className={`win98-window__toolbar-btn ${history.length <= 1 ? 'win98-window__toolbar-btn--disabled' : ''}`}
onClick={goBack} disabled={history.length <= 1}
data-testid="mycomputer-back" style={{ gap: '4px' }}
>
<span style={{ fontSize: '13px', lineHeight: 1 }}>◄</span>Précédent
</button>
<button
className={`win98-window__toolbar-btn ${history.length <= 1 ? 'win98-window__toolbar-btn--disabled' : ''}`}
onClick={goUp} disabled={history.length <= 1}
data-testid="mycomputer-up" style={{ gap: '4px' }}
>
<span style={{ fontSize: '13px', lineHeight: 1 }}>▲</span>Dossier parent
</button>
</div>

<div className="win98-window__address-bar">
<label>Adresse</label>
<input type="text" value={addressPath} readOnly data-testid="mycomputer-address" />
</div>

<div className="file-explorer__panes" style={{ flex: 1, overflow: 'hidden' }}>
{renderLeftPane()}
{current.isRoot ? renderDrivesView() : renderFolderView()}
</div>

<div className="win98-window__statusbar">
<span>
{current.isRoot
? `${current.children.length} objet(s)`
: `${(current.children || []).length} objet(s)`}
</span>
<span>{drive ? `Lecteur ${drive.drive}:` : 'Mon ordinateur'}</span>
</div>

{/* --------- Dialogue : Disquette A: vide --------- */}
{floppyDialog && (
<Win98Dialog
title={"A:\\ n'est pas accessible"}
icon={ICONS.warning}
onClose={() => setFloppyDialog(false)}
buttons={
<>
<button onClick={() => setFloppyDialog(false)} data-testid="mycomputer-floppy-ok">Réessayer</button>
<button onClick={() => setFloppyDialog(false)} data-testid="mycomputer-floppy-cancel">Annuler</button>
</>
}
>
Le périphérique nest pas prêt.<br />
Insérez une disquette dans le lecteur <strong>A:</strong>.
</Win98Dialog>
)}

{/* --------- Dialogue : Mot de passe B: --------- */}
{pwdDialog && (
<Win98Dialog
title="Volume chiffré — Authentification"
icon={ICONS.key}
onClose={() => setPwdDialog(false)}
buttons={
<>
<button onClick={submitPwd} data-testid="mycomputer-pwd-ok">OK</button>
<button onClick={() => setPwdDialog(false)} data-testid="mycomputer-pwd-cancel">Annuler</button>
</>
}
>
<form onSubmit={submitPwd} style={{ margin: 0 }}>
La disquette <strong>B:</strong> est protégée.<br />
Entrez le mot de passe&nbsp;:
<div style={{ marginTop: 8 }}>
<input
ref={pwdRef} type="password" value={pwdInput}
onChange={(e) => { setPwdInput(e.target.value); setPwdError(false) }}
className="my-computer__pwd-input"
data-testid="mycomputer-pwd-input" autoComplete="off"
/>
</div>
{pwdError && (
<div className="my-computer__pwd-error" data-testid="mycomputer-pwd-error">
Mot de passe incorrect. Réessayez.
</div>
)}
</form>
</Win98Dialog>
)}

{/* --------- Dialogue : fichier système verrouillé --------- */}
{sysDialog && (
<Win98Dialog
title={sysDialog.title}
icon={ICONS.error}
onClose={() => setSysDialog(null)}
buttons={<button onClick={() => setSysDialog(null)} data-testid="mycomputer-sys-ok">OK</button>}
>
{sysDialog.message}
</Win98Dialog>
)}
</div>
)
}