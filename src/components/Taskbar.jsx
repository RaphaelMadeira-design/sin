import { useState, useEffect } from 'react'
import Sounds from '../components/Sounds'

const ICONS = {
  start: 'https://win98icons.alexmeub.com/icons/png/windows-0.png',
  volume: 'https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-0.png',
  network: 'https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-0.png',
  powers: 'https://win98icons.alexmeub.com/icons/png/executable_script-0.png',
  documents: 'https://win98icons.alexmeub.com/icons/png/directory_closed-3.png',
  notepad: 'https://win98icons.alexmeub.com/icons/png/notepad-0.png',
  snake : 'https://win98icons.alexmeub.com/icons/png/joystick_alt-1.png',
  jump: 'https://win98icons.alexmeub.com/icons/png/joystick_alt-1.png',
  media: 'https://win98icons.alexmeub.com/icons/png/wm-3.png',
  cmd: 'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png',
  imageviewer: 'https://win98icons.alexmeub.com/icons/png/kodak_imaging_file-0.png',
  browser: 'https://win98icons.alexmeub.com/icons/png/msie1-2.png',
  msn: 'https://win98icons.alexmeub.com/icons/png/msn3-3.png',
  intranet: 'https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-0.png',
  mail: 'https://win98icons.alexmeub.com/icons/png/outlook_express-2.png',
}

const getIcon = (id) => {
  if (id === 'powers') return ICONS.powers
  if (id === 'documents') return ICONS.documents
  if (id === 'media') return ICONS.media
  if (id === 'snake') return ICONS.snake
  if (id ==='mail') return ICONS.mail
  if (id === 'jump') return ICONS.jump
  if (id === 'browser') return ICONS.browser
  if (id === 'intranet') return ICONS.intranet
  if (id === 'cmd') return ICONS.cmd
  if (id === 'imageviewer') return ICONS.imageviewer
  if (id === 'msn') return ICONS.msn
  if (id.startsWith('notepad-')) return ICONS.notepad
  return ICONS.start
}

export default function Taskbar({ windows, onWindowFocus, onWindowToggle, onStartClick, startOpen }) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      setTime(`${h}:${m}`)

      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()
      setDate(`${day}/${month}/${year}`)
    }
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="taskbar" data-testid="taskbar">
      {/* Start Button */}
      <button
        className="taskbar__start-btn"
        onClick={onStartClick}
        data-testid="start-button"
        style={startOpen ? { borderTop: '2px solid #000', borderLeft: '2px solid #000', borderRight: '2px solid #fff', borderBottom: '2px solid #fff' } : {}}
      >
        <img src={ICONS.start} alt="Windows" />
        <span>Démarrer</span>
      </button>

      <div className="taskbar__separator" />

      {/* Open Windows */}
      <div className="taskbar__items">
        {windows.map(win => (
          <button
            key={win.id}
            className={`taskbar__item ${win.focused ? 'taskbar__item--active' : ''}`}
            onClick={() => { Sounds.click(); onWindowToggle(win.id) }}
            data-testid={`taskbar-item-${win.id}`}
          >
            <img src={getIcon(win.id)} alt={win.title} />
            <span>{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="taskbar__tray" data-testid="taskbar-tray">
        <img
          src={ICONS.network}
          alt="Réseau"
          className="taskbar__tray-icon"
          title="Connexion Ethernet - Connecté"
          data-testid="tray-network"
        />
        <img
          src={ICONS.volume}
          alt="Volume"
          className="taskbar__tray-icon"
          title="Volume"
          data-testid="tray-volume"
        />
        <span className="taskbar__clock" title={date} data-testid="taskbar-clock">
          {time}
        </span>
      </div>
    </div>
  )
}