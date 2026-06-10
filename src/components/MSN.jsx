import { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Sounds from '../components/Sounds'
import '../styles/msn.scss';

// ─── CREDENTIALS ────────────────────────────────────────────────
const CREDENTIALS = {
  email: 'koga99@hotmail.jp',
  password: 'bcb99',
};

// ─── CONTACTS ───────────────────────────────────────────────────
const CONTACTS = [
  {
    id: 'naomi',
    name: 'naomi_07',
    status: 'online',
    personalMessage: "Toujours à la recherche d'un scoop",
    senderColor: '#0000bb',
  },
  {
    id: 'yuki',
    name: 'YukiChan_☆',
    status: 'online',
    personalMessage: "j'en ai marre des exams... →_→",
    senderColor: '#cc007a',
  },
  {
    id: 'kagami',
    name: 'KagamiSpirit',
    status: 'away',
    personalMessage: 'Le reflet ne ment jamais.',
    senderColor: '#171717',
  },
  {
    id: 'masahiro',
    name: '♫-MasaMasa-♫',
    status: 'offline',
    personalMessage: "Concert bientôt !! Let's go !",
    senderColor: '#721d9d',
  },
  {
    id: 'ryo',
    name: 'Ry0',
    status: 'offline',
    personalMessage: '',
    senderColor: '#cd1919',
  },
];

// ─── CONVERSATIONS ──────────────────────────────────────────────
const CONVERSATIONS = {
  naomi: {
    date: "Aujourd'hui — 20:45",
    messages: [
      { from: 'naomi_07',  text: "kiba !! t'as vu les nouvelles de ce soir ?",              time: '20:45' },
      { from: 'koga99', text: 'non, quoi encore',                                         time: '20:46' },
      { from: 'naomi_07',  text: 'ya une nouvelle course clandestine',                time: '20:46' },
      { from: 'naomi_07',  text: 'et de nouveaux crews foutent le bordel pour entrer dans la ligue',     time: '20:47' },
      { from: 'naomi_07',  text: 'tu devrais lire mes articles de temps en temps -_-',     time: '20:47' },
      { from: 'koga99',  text: 'je regarde sur ton site',     time: '20:49' },
      { from: 'naomi_07',  text: "j'ai besoin de toi sur ce coup",                           time: '20:49' },
      { from: 'koga99', text: 'laisse les se faire choper par les flics ou les clans',             time: '20:50' },
      { from: 'naomi_07',  text: "c'est ça... ^^",                                 time: '20:50' },
      { from: 'naomi_07',  text: "tu sais très bien qu'ils vont rien faire",    time: '20:51' },
      { from: 'koga99',  text: "j'avoue",                               time: '20:51' },
      { from: 'naomi_07',  text: "le run se passe à toshima, près d'ikebukuro",    time: '20:52' },
      { from: 'koga99', text: 'je me prépare',                      time: '20:52' },
      { from: 'naomi_07',  text: 'je pars mtn ^^ rendez-vous au pont de maruyama. 23h.',  time: '20:54' },
      { from: 'koga99', text: 'ok',                                                       time: '20:54' },
    ],
  },
  yuki: {
    date: "Aujourd'hui — 21:12",
    messages: [
      { from: 'YukiChan_☆', text: "KIBA !!! j'ai eu une vision ce matin omg",                   time: '21:12' },
      { from: 'YukiChan_☆', text: "c'était bizarre... tu étais là mais pas toi en même temps ??", time: '21:12' },
      { from: 'koga99',  text: 'une vision de quoi exactement',                               time: '21:14' },
      { from: 'YukiChan_☆', text: 'une silhouette derrière toi. noire. mais familière',          time: '21:15' },
      { from: 'koga99',  text: "qu'est-ce que tu racontes",                            time: '21:16' },
      { from: 'koga99',  text: "t'es chelou avec tes histoires de visions",            time: '21:17' },
      { from: 'YukiChan_☆', text: " dis moi que c'est rien ;_;",                        time: '21:18' },
      { from: 'koga99',  text: "c'est rien. oublie cette vision.",                            time: '21:18' },
      { from: 'YukiChan_☆', text: '... :/ tu mens très mal tu sais xD',                          time: '21:19' },
      { from: 'koga99',  text: 'passe une bonne nuit yuki',                                   time: '21:20' },
      { from: 'YukiChan_☆', text: 'toi aussi... fais attention à toi stp ;_;',                   time: '21:20' },
    ],
  },
  kagami: {
    date: 'Hier — 22:01',
    messages: [
      { from: 'KagamiSpirit', text: 'Le reflet ne ment jamais.',                time: '22:01' },
      { from: 'koga99',    text: "t'es qui toi",          time: '22:01' },
      { from: 'KagamiSpirit', text: 'Ce que tu portes... il le sent aussi.',     time: '22:02' },
      { from: 'KagamiSpirit', text: 'Méfie-toi de ton ombre.',                   time: '22:02' },
      { from: 'koga99',    text: "de quoi tu parles. je t'ai jamais ajouté",            time: '22:03' },
      { from: 'KagamiSpirit', text: 'Bientôt. Le voile est fin cette nuit.',     time: '22:03' },
      { from: 'KagamiSpirit', text: 'Ne te retourne pas.', italic: true,         time: '22:04' },
      { from: 'system',       text: "[KagamiSpirit est injoignable]",           time: '22:04' },
    ],
  },
  masahiro: {
    date: 'Aujourd’hui — 21:01',
    messages: [
      { from: '♫-MasaMasa-♫', text: 'Hello mon batteur préféré~~',                time: '21:01' },
      { from: 'koga99',    text: "yo",          time: '21:01' },
      { from: '♫-MasaMasa-♫', text: "On organise une répét' jeudi avec le groupe",     time: '21:02' },
      { from: '♫-MasaMasa-♫', text: 'Ça te dit de jouer avec nous ?',                   time: '21:02' },
      { from: 'koga99',    text: 'wakatsuru est encore malade ?',            time: '21:06' },
      { from: '♫-MasaMasa-♫', text: 'Non pas cette fois',     time: '21:08' },
      { from: '♫-MasaMasa-♫', text: "Depuis qu'il sort avec Reina-chan, il vient plus trop",       time: '21:08' },
      { from: 'koga99',    text: "c'est con",       time: '21:10' },
      { from: 'koga99',    text: "quelle heure",       time: '21:10' },
      { from: '♫-MasaMasa-♫',    text: "On sait pas encore",       time: '21:11' },
      { from: '♫-MasaMasa-♫',    text: "Je te dis ça demain, ok ?",       time: '21:11' },
      { from: 'koga99',    text: "ok mais je promets rien",       time: '21:12' },
      { from: '♫-MasaMasa-♫',    text: "Je compte sur toi~ à demain",       time: '21:12' },
      { from: 'koga99',    text: "a+",       time: '21:15' },
      { from: 'system',       text: "[♫-MasaMasa-♫ est déconnecté]"},
    ],
  },
  ryo: {
    date: 'Il y a 2 mois',
    messages: [
      { from: 'Ry0',       text: 'ya un truc bizarre qui se prepare',             time: '14:22' },
      { from: 'Ry0',       text: 'je dois disparaître un moment',             time: '14:23' },
      { from: 'koga99', text: 'quoi ? pourquoi',                           time: '14:23' },
      { from: 'Ry0',       text: 'tu comprendras plus tard.',                  time: '14:24' },
      { from: 'Ry0',       text: 'ne me cherche pas.',                        time: '14:24' },
      { from: 'koga99', text: "ryo. qu'est-ce qui se passe vraiment",      time: '14:25' },
      { from: 'system',    text: '[CONNEXION PERDUE]',                        time: '14:25' },
      { from: 'system',    text: "Ry0 n'est plus en ligne depuis 2 mois.",   time: ''      },
    ],
  },
};

// ─── WIN98 WINDOW WRAPPER (avec Rnd pour redimensionnement) ──────
function Win98Window({ title, icon, children, onClose, onMinimize, zIndex = 100, initPos, initSize, showMinimize = true }) {
  const [pos, setPos]         = useState(initPos  || { x: 150, y: 80 });
  const [size, setSize]       = useState(initSize || { width: 380, height: 400 });
  const [minimized, setMin]   = useState(false);
  const [maximized, setMax]   = useState(false);
  const prevState             = useRef(null);

  const handleMinimize = () => {
    if (onMinimize) { onMinimize(); return; }
    setMin(true);
  };

  const handleMaximize = () => {
    if (maximized) {
      if (prevState.current) {
        setPos(prevState.current.pos);
        setSize(prevState.current.size);
      }
      setMax(false);
    } else {
      prevState.current = { pos, size };
      setMax(true);
    }
  };

  if (minimized) return null;

  if (maximized) {
    return (
      <div
        className="win98-window msn-window-inner"
        style={{ position: 'absolute', inset: 0, zIndex }}
        data-testid={`msn-window-${title.replace(/s/g, '-').toLowerCase()}`}
      >
        <div className="win98-titlebar">
          {icon && <img src={icon} alt="" className="win98-titlebar__icon" />}
          <span className="win98-titlebar__title">{title}</span>
          <div className="win98-titlebar__btns">
            {showMinimize && (
              <button className="win98-titlebar__btn" onClick={handleMinimize} title="Réduire">_</button>
            )}
            <button className="win98-titlebar__btn" onClick={handleMaximize} title="Restaurer">❐</button>
            <button className="win98-titlebar__btn win98-titlebar__btn--close" onClick={onClose} title="Fermer" data-testid="msn-close-btn">✕</button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <Rnd
      position={pos}
      size={size}
      onDragStop={(e, d) => setPos({ x: d.x, y: d.y })}
      onResizeStop={(e, dir, ref, delta, position) => {
        setSize({ width: ref.style.width, height: ref.style.height });
        setPos(position);
      }}
      minWidth={260}
      minHeight={220}
      bounds="parent"
      style={{ zIndex, position: 'absolute' }}
      dragHandleClassName="win98-titlebar"
      data-testid={`msn-window-${title.replace(/s/g, '-').toLowerCase()}`}
    >
      <div className="win98-window msn-window-inner" style={{ width: '100%', height: '100%' }}>
        <div className="win98-titlebar">
          {icon && <img src={icon} alt="" className="win98-titlebar__icon" />}
          <span className="win98-titlebar__title">{title}</span>
          <div className="win98-titlebar__btns">
            {showMinimize && (
              <button className="win98-titlebar__btn" onClick={handleMinimize} title="Réduire">_</button>
            )}
            <button className="win98-titlebar__btn" onClick={handleMaximize} title="Agrandir">☐</button>
            <button className="win98-titlebar__btn win98-titlebar__btn--close" onClick={onClose} title="Fermer" data-testid="msn-close-btn">✕</button>
          </div>
        </div>
        {children}
      </div>
    </Rnd>
  );
}

// ─── MSN LOGIN ──────────────────────────────────────────────────
function MSNLogin({ onLogin, onClose }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email.trim() === CREDENTIALS.email && password === CREDENTIALS.password) {
        Sounds.msnNotify();
        onLogin();
      } else {
        Sounds.error();
        setError('Adresse de messagerie ou mot de passe incorrect. Vérifiez vos informations et réessayez.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <Win98Window
      title="MSN Messenger"
      icon="https://win98icons.alexmeub.com/icons/png/msn3-1.png"
      onClose={onClose}
      zIndex={200}
      initPos={{ x: 200, y: 60 }}
      initSize={{ width: 340, height: 360 }}
      showMinimize={false}
    >
      <div className="msn-header">
        <div className="msn-header__logo">
          <img src="https://win98icons.alexmeub.com/icons/png/msn3-4.png" />
        </div>
        <div>
          <div className="msn-header__title">MSN Messenger</div>
          <div className="msn-header__subtitle">La messagerie instantanée Windows</div>
        </div>
      </div>

      <div className="msn-login__body">
        <form onSubmit={handleSubmit}>
          <div className="msn-login__form-group">
            <label className="msn-login__label">Adresse de messagerie :</label>
            <input
              type="text"
              className="win98-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="utilisateur@hotmail.fr"
              autoFocus
              autoComplete="off"
              spellCheck={false}
              data-testid="msn-email-input"
            />
          </div>
          <div className="msn-login__form-group">
            <label className="msn-login__label">Mot de passe :</label>
            <input
              type="password"
              className="win98-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
              data-testid="msn-password-input"
            />
          </div>

          {error && (
            <div className="msn-login__error" data-testid="msn-login-error">
              ⚠ {error}
            </div>
          )}

          <div className="msn-login__checkbox-row">
            <input type="checkbox" id="msn-remember" />
            <label htmlFor="msn-remember">Mémoriser mon mot de passe</label>
          </div>

          <div className="msn-login__actions">
            <button type="submit" className="win98-btn" disabled={loading} data-testid="msn-login-btn">
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            <button type="button" className="win98-btn" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>

      <div className="msn-login__copyright">
        © 1999 Microsoft Corporation. Tous droits réservés.
      </div>
    </Win98Window>
  );
}

// ─── MSN CONTACT LIST ────────────────────────────────────────────
function MSNContactList({ onOpenChat, onClose, onMinimize }) {
  const [expanded, setExpanded] = useState({ online: true, offline: true });

  const online  = CONTACTS.filter(c => c.status === 'online' || c.status === 'away');
  const offline = CONTACTS.filter(c => c.status === 'offline');
  const toggle  = (group) => setExpanded(p => ({ ...p, [group]: !p[group] }));

  return (
    <Win98Window
      title="MSN Messenger"
      icon="https://win98icons.alexmeub.com/icons/png/msn3-1.png"
      onClose={onClose}
      onMinimize={onMinimize}
      zIndex={150}
      initPos={{ x: 90, y: 70 }}
      initSize={{ width: 260, height: 430 }}
      showMinimize={true}
    >
      <div className="msn-contacts__user-bar">
        <span className="msn-dot msn-dot--online" />
        <div>
          <div className="msn-contacts__user-name">koga99</div>
          <div className="msn-contacts__user-status">En ligne</div>
        </div>
      </div>

      <div className="msn-contacts__body" data-testid="msn-contacts-list">
        <div className="msn-group-header" onClick={() => toggle('online')} data-testid="msn-group-online">
          <span className="msn-group-header__arrow">{expanded.online ? '▼' : '▶'}</span>
          <span>En ligne ({online.length})</span>
        </div>
        {expanded.online && online.map(contact => (
          <ContactItem key={contact.id} contact={contact} onDoubleClick={() => onOpenChat(contact.id)} />
        ))}

        <div className="msn-group-header" onClick={() => toggle('offline')} data-testid="msn-group-offline">
          <span className="msn-group-header__arrow">{expanded.offline ? '▼' : '▶'}</span>
          <span>Hors ligne ({offline.length})</span>
        </div>
        {expanded.offline && offline.map(contact => (
          <ContactItem key={contact.id} contact={contact} onDoubleClick={() => onOpenChat(contact.id)} />
        ))}
      </div>

      <div className="msn-contacts__toolbar">
        <button className="win98-btn msn-toolbar-btn">Contacts</button>
        <button className="win98-btn msn-toolbar-btn">Outils</button>
        <button className="win98-btn msn-toolbar-btn">Aide</button>
      </div>
    </Win98Window>
  );
}

function ContactItem({ contact, onDoubleClick }) {
  return (
    <div
      className={`msn-contact-item ${contact.status === 'offline' ? 'msn-contact-item--offline' : ''}`}
      onDoubleClick={onDoubleClick}
      title="Double-cliquez pour ouvrir la conversation"
      data-testid={`msn-contact-${contact.id}`}
    >
      <span className={`msn-dot msn-dot--${contact.status}`} />
      <div>
        <div className="msn-contact-item__name">{contact.name}</div>
        {contact.personalMessage && (
          <div className="msn-contact-item__msg">{contact.personalMessage}</div>
        )}
      </div>
    </div>
  );
}

// ─── MSN CHAT WINDOW ─────────────────────────────────────────────
function MSNChat({ contact, index, onClose }) {
  const chatRef = useRef(null);
  const conv    = CONVERSATIONS[contact.id];

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

  return (
    <Win98Window
      title={`Conversation avec ${contact.name}`}
      icon="https://win98icons.alexmeub.com/icons/png/msn3-1.png"
      onClose={onClose}
      zIndex={200 + index}
      initPos={{ x: 370 + index * 30, y: 70 + index * 20 }}
      initSize={{ width: 390, height: 440 }}
      showMinimize={true}
    >
      <div className="msn-chat__contact-bar">
        <span className={`msn-dot msn-dot--${contact.status}`} />
        <div>
          <div className="msn-chat__contact-name">{contact.name}</div>
          <div className="msn-chat__contact-status">
            {contact.personalMessage || (contact.status === 'offline' ? 'Hors ligne' : 'En ligne')}
          </div>
        </div>
      </div>

      <div className="msn-chat__messages" ref={chatRef} data-testid={`msn-chat-messages-${contact.id}`}>
        {conv.date && <div className="msn-chat__separator">{conv.date}</div>}
        {conv.messages.map((msg, i) => {
          const isSystem = msg.from === 'system';
          const isSelf   = msg.from === 'koga99';

          if (isSystem) {
            return (
              <div key={i} className="msn-msg">
                <span className="msn-msg__text msn-msg__text--system">{msg.text}</span>
              </div>
            );
          }

          return (
            <div key={i} className="msn-msg">
              <div className="msn-msg__header">
                <span
                  className={`msn-msg__sender ${isSelf ? 'msn-msg__sender--self' : 'msn-msg__sender--other'}`}
                  style={!isSelf ? { color: contact.senderColor } : {}}
                >
                  {msg.from} dit :
                </span>
                {msg.time && <span className="msn-msg__time">({msg.time})</span>}
              </div>
              <div className={`msn-msg__text ${msg.italic ? 'msn-msg__text--italic' : ''}`}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="msn-chat__input-area">
        <div className="msn-chat__input-label">koga99 dit :</div>
        <textarea
          className="msn-chat__textarea"
          placeholder="Tapez votre message ici..."
          data-testid={`msn-chat-input-${contact.id}`}
          disabled={contact.status === 'offline'}
        />
        <div className="msn-chat__actions">
          <button
            className="win98-btn msn-chat__action-btn"
            disabled={contact.status === 'offline'}
            title={contact.status === 'offline' ? 'Ce contact est hors ligne' : ''}
          >
            Envoyer
          </button>
          <button className="win98-btn msn-chat__action-btn">Bloquer</button>
        </div>
      </div>
    </Win98Window>
  );
}

// ─── MAIN MSN APP ────────────────────────────────────────────────
export default function MSNApp({ onClose, onMinimize }) {
  const [phase, setPhase]         = useState('login');
  const [openChats, setOpenChats] = useState([]);

  const openChat  = (id) => { if (!openChats.includes(id)) { Sounds.msnNotify(); setOpenChats(p => [...p, id]); } };
  const closeChat = (id) => setOpenChats(p => p.filter(c => c !== id));

  return (
    <>
      {phase === 'login' ? (
        <MSNLogin onLogin={() => setPhase('contacts')} onClose={onClose} />
      ) : (
        <MSNContactList onOpenChat={openChat} onClose={onClose} onMinimize={onMinimize} />
      )}

      {openChats.map((contactId, i) => {
        const contact = CONTACTS.find(c => c.id === contactId);
        return (
          <MSNChat key={contactId} contact={contact} index={i} onClose={() => closeChat(contactId)} />
        );
      })}
    </>
  );
}