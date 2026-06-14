import { useState } from 'react'
import '../styles/Mail.scss'

const ICONS = {
inbox:       'https://win98icons.alexmeub.com/icons/png/outlook_express_tack-1.png',
inboxFolder: 'https://win98icons.alexmeub.com/icons/png/mailbox_world-1.png',
sent:        'https://win98icons.alexmeub.com/icons/png/envelope_open_sheet-1.png',
drafts:      'https://win98icons.alexmeub.com/icons/png/write_file-0.png',
trash:       'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty_cool-4.png',
mailRead:    'https://win98icons.alexmeub.com/icons/png/message_envelope_open-1.png',
mailUnread:  'https://win98icons.alexmeub.com/icons/png/envelope_closed-1.png',
attach:      'https://win98icons.alexmeub.com/icons/png/notepad_file-0.png',
newMail:     'https://win98icons.alexmeub.com/icons/png/envelope_closed-0.png',
reply:       'https://win98icons.alexmeub.com/icons/png/outlook_express-0.png',
forward:     'https://win98icons.alexmeub.com/icons/png/media_player_stream_conn1.png',
delete:      'https://win98icons.alexmeub.com/icons/png/media_player_stream_no.png',
print:       'https://win98icons.alexmeub.com/icons/png/printer-5.png',
}

const FOLDERS = [
{ id: 'inbox', label: 'Boîte de réception', icon: ICONS.inboxFolder },
{ id: 'sent', label: 'Éléments envoyés', icon: ICONS.sent },
{ id: 'drafts', label: 'Brouillons', icon: ICONS.drafts },
{ id: 'trash', label: 'Éléments supprimés', icon: ICONS.trash },
]

const INBOX = [
{
id: 'e1',
from: 'Cmdt. Hoshino',
fromAddr: 'hoshino@kishi.jp',
subject: 'Re: ta dernière course',
date: '02/05/2026 — 09:14',
unread: false,
body: `Igarashi,

Bon travail sur le rapport SHK-2026-041. Tu commences à voir ce que les autres préfèrent ne pas voir. Continue.

Mais je te le dis sans détour : ne fais PAS de zèle. Tu es encore rang E. Tu ouvres une porte trop grande, tu ne la refermes pas.

Reste sur tes tâches. Le reste viendra.

— Hoshino`,
},
{
id: 'e2',
from: 'Aoi Kanzaki',
fromAddr: 'a.kanzaki@bolts.tsl',
subject: 'truc bizarre hier',
date: '03/05/2026 — 23:47',
unread: true,
body: `Kiba,

J'ai recroisé Kazuki ce soir, près de la gare de Suidobashi. Il était PAS seul. Le type avec lui avait les yeux jaunes-orange. Pas du contact, pas un mot, mais Kazuki avait l'air... obéissant. Genre, vraiment obéissant.

J'ai pas eu le réflexe de filmer. Désolée. Mais je voulais que tu saches.

PS : J'ai retrouvé un vieux dossier de Ryo dans mes affaires. Faut qu'on parle, mais pas par mail.

— Aoi`,
},
{
id: 'e3',
from: 'Système Kishi-NET',
fromAddr: 'noreply@kishi.jp',
subject: 'Mot de passe expiré',
date: '04/05/2026 — 00:00',
unread: true,
body: `Cher utilisateur,

Votre mot de passe d'accès secondaire (NIVEAU-1) a été régénéré.
Nouveau token : ECHO77

Conservez ce token en lieu sûr. Utilisez la commande "auth NIVEAU-1 ECHO77" sur votre terminal pour renouveler votre session.

— Système`,
},
{
id: 'e4',
from: '???',
fromAddr: '????@?????',
subject: 'tu me cherches.',
date: '??/??/2026 — ??:??',
unread: true,
body: `tu me cherches.
arrête.
ou continue.
tu auras la même réponse.

— R.`,
},
{
id: 'e5',
from: 'Daigo Kawamura',
fromAddr: 'd.kawamura@bolts.tsl',
subject: 'session de demain',
date: '01/05/2026 — 18:22',
unread: false,
body: `Yo Kiba,

Tu viens demain matin pour l'entraînement sur le toit du parking d'Ochanomizu ? Hidemichi a dit qu'il pouvait apporter les caméras.

À demain j'espère.

— Daigo`,
},
{
id: 'e6',
from: 'TSL Officiel',
fromAddr: 'admin@tsl-league.jp',
subject: '[Tour 12] Classement provisoire — Bunkyo City Bolts',
date: '30/04/2026 — 17:00',
unread: false,
body: `BUNKYO CITY BOLTS — Tour 12

Position : 4e (sur 18 équipes)
Points : 287
Différentiel : +12 vs Tour 11

Prochain affrontement : Tenku Striders (Tour 14, 21/05/2026)

— Administration TSL`,
},
]

const SENT = [
{
id: 's1',
from: 'Moi',
fromAddr: 'kiba.igarashi@kishi.jp',
subject: 'Rapport SHK-2026-041 — joint',
date: '28/03/2026 — 22:48',
unread: false,
body: `Bonsoir Commandant,

Rapport joint comme demandé. J'ai notamment relevé un schéma sur le secteur K-7 qui pourrait correspondre à ce que vous m'aviez mentionné en mars.

Tenez-moi au courant.

— K. Igarashi`,
},
]

export default function Mail() {
const [folder, setFolder] = useState('inbox')
const [selected, setSelected] = useState(INBOX[0])
const [readIds, setReadIds] = useState(() => new Set(INBOX.filter(m => !m.unread).map(m => m.id)))

const messages = folder === 'inbox' ? INBOX
: folder === 'sent' ? SENT
: []

const handleSelect = (msg) => {
setSelected(msg)
if (!readIds.has(msg.id)) {
setReadIds(prev => new Set([...prev, msg.id]))
}
}

const unreadCount = INBOX.filter(m => !readIds.has(m.id)).length

return (
<div className="mail" data-testid="mail-window">
{/* Menubar */}
<div className="mail__menubar">
{['Fichier', 'Édition', 'Affichage', 'Outils'].map(m => (
<span key={m} className="mail__menu"><u>{m[0]}</u>{m.slice(1)}</span>
))}
</div>

{/* Toolbar */}
<div className="mail__toolbar">
<ToolBtn icon={ICONS.newMail} label="Nouveau" />
<div className="mail__sep" />
<ToolBtn icon={ICONS.reply} label="Répondre" />
<ToolBtn icon={ICONS.forward} label="Transférer" />
<div className="mail__sep" />
<ToolBtn icon={ICONS.delete} label="Supprimer" />
<ToolBtn icon={ICONS.print} label="Imprimer" />
</div>

{/* Body : 2 panneaux (dossiers | messages+preview) */}
<div className="mail__body">
{/* Folder tree */}
<div className="mail__sidebar">
<div className="mail__sb-title">Dossiers</div>
<div className="mail__sb-tree">
<div className="mail__sb-root">
<img src={ICONS.inbox} alt="" />
<span>Boîte aux lettres — #0791</span>
</div>
{FOLDERS.map(f => (
<div
key={f.id}
className={`mail__folder${folder === f.id ? ' is-active' : ''}`}
onClick={() => { setFolder(f.id); setSelected(null) }}
data-testid={`outlook-folder-${f.id}`}
>
<img src={f.icon} alt="" />
<span>{f.label}</span>
{f.id === 'inbox' && unreadCount > 0 && (
<span className="mail__badge">({unreadCount})</span>
)}
</div>
))}
</div>
</div>

{/* Right pane : list + preview */}
<div className="mail__right">
<div className="mail__list">
<div className="mail__list-head">
<div className="col-flag"></div>
<div className="col-from">De</div>
<div className="col-subj">Objet</div>
<div className="col-date">Reçu</div>
</div>
<div className="mail__list-body">
{messages.length === 0 && (
<div className="mail__empty">— Aucun message —</div>
)}
{messages.map(m => {
const isUnread = !readIds.has(m.id) && folder === 'inbox'
const isSel = selected?.id === m.id
return (
<div
key={m.id}
className={`mail__row${isSel ? ' is-sel' : ''}${isUnread ? ' is-unread' : ''}`}
onClick={() => handleSelect(m)}
data-testid={`outlook-msg-${m.id}`}
>
<div className="col-flag">
<img src={isUnread ? ICONS.mailUnread : ICONS.mailRead} alt="" />
</div>
<div className="col-from">{m.from}</div>
<div className="col-subj">{m.subject}</div>
<div className="col-date">{m.date}</div>
</div>
)
})}
</div>
</div>

{/* Preview pane */}
<div className="mail__preview">
{selected ? (
<>
<div className="mail__prev-head">
<div><b>De :</b> {selected.from} &lt;{selected.fromAddr}&gt;</div>
<div><b>Objet :</b> {selected.subject}</div>
<div><b>Date :</b> {selected.date}</div>
</div>
<pre className="mail__prev-body">{selected.body}</pre>
</>
) : (
<div className="mail__prev-empty">Sélectionnez un message pour le lire.</div>
)}
</div>
</div>
</div>

{/* Status bar */}
<div className="mail__statusbar">
<span>{messages.length} message(s)</span>
<span>{unreadCount} non lu(s)</span>
<span>Connexion sécurisée vers #0791</span>
</div>
</div>
)
}

function ToolBtn({ icon, label }) {
return (
<button className="mail__tbtn" title={label} type="button">
<img src={icon} alt="" />
<span>{label}</span>
</button>
)
}