import { useState, useCallback } from 'react'
import Sounds from '../components/Sounds'

const ICONS = {
  start:        'https://win98icons.alexmeub.com/icons/png/windows-0.png',
  powers:       'https://win98icons.alexmeub.com/icons/png/shell_window5-0.png',
  folder:       'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png',
  folderClosed: 'https://win98icons.alexmeub.com/icons/png/directory_closed-4.png',
  shutdown:     'https://win98icons.alexmeub.com/icons/png/monitor_blue_grad-0.png',
  snake:        'https://win98icons.alexmeub.com/icons/png/joystick_alt-0.png',
  jump:         'https://win98icons.alexmeub.com/icons/png/joystick_alt-0.png',
  games:        'https://win98icons.alexmeub.com/icons/png/joystick-2.png',
  media:        'https://win98icons.alexmeub.com/icons/png/wm-4.png',
  cmd:          'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png',
  browser:      'https://win98icons.alexmeub.com/icons/png/msie1-1.png',
  msn:          'https://win98icons.alexmeub.com/icons/png/msn3-3.png',
}

export default function StartMenu({ onClose, onOpenWindow, onShutdown }) {
  const [gamesOpen, setGamesOpen] = useState(false)
  const [docsOpen,  setDocsOpen]  = useState(false)

  const handle = useCallback((id, options = {}) => {
    Sounds.click()
    onOpenWindow(id, options)
    onClose()
  }, [onOpenWindow, onClose])

  return (
    <>
      <div className="start-menu__overlay" onClick={onClose} />

      <div className="start-menu" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
        <div className="start-menu__sidebar">
          <span><strong>Windows</strong> 98</span>
        </div>

        <div className="start-menu__content">

          <div className="start-menu__item" onClick={() => handle('powers')} data-testid="start-menu-powers">
            <img src={ICONS.powers} alt="Pouvoirs" />
            Rapport - Shokan
          </div>

          <div className="start-menu__item" onClick={() => handle('browser')} data-testid="start-menu-browser">
            <img src={ICONS.browser} alt="Internet Explorer" />
            Internet Explorer
          </div>

          <div className="start-menu__item" onClick={() => handle('msn')} data-testid="start-menu-msn">
            <img src={ICONS.msn} alt="MSN" />
            MSN Messenger
          </div>

          <div className="start-menu__item" onClick={() => handle('media')} data-testid="start-menu-media">
            <img src={ICONS.media} alt="Media" />
            Media Player
          </div>

          {/* Mes Documents avec sous-menu */}
          <div
            className={`start-menu__item${docsOpen ? ' start-menu__item--sub-open' : ''}`}
            onMouseEnter={() => setDocsOpen(true)}
            onMouseLeave={() => setDocsOpen(false)}
            data-testid="start-menu-docs"
          >
            <img src={ICONS.folder} alt="Mes Documents" />
            Mes Documents
            <span className="start-menu__item__arrow">▶</span>

            {docsOpen && (
              <div className="start-menu__submenu">
                <div className="start-menu__item" onClick={() => handle('documents', { initialFolder: 'histoire' })} data-testid="start-menu-docs-histoire">
                  <img src={ICONS.folderClosed} alt="Histoire" />
                  Histoire
                </div>
                <div className="start-menu__item" onClick={() => handle('documents', { initialFolder: 'musique' })} data-testid="start-menu-docs-musique">
                  <img src={ICONS.folderClosed} alt="Musique" />
                  Musique
                </div>
                <div className="start-menu__item" onClick={() => handle('documents', { initialFolder: 'images' })} data-testid="start-menu-docs-images">
                  <img src={ICONS.folderClosed} alt="Images" />
                  Images
                </div>
              </div>
            )}
          </div>

          {/* Jeux avec sous-menu */}
          <div
            className={`start-menu__item${gamesOpen ? ' start-menu__item--sub-open' : ''}`}
            onMouseEnter={() => setGamesOpen(true)}
            onMouseLeave={() => setGamesOpen(false)}
            data-testid="start-menu-games"
          >
            <img src={ICONS.games} alt="Jeux" />
            Jeux
            <span className="start-menu__item__arrow">▶</span>

            {gamesOpen && (
              <div className="start-menu__submenu">
                <div className="start-menu__item" onClick={() => handle('snake')} data-testid="start-menu-snake">
                  <img src={ICONS.snake} alt="Snake" />
                  SNAKE.exe
                </div>
                <div className="start-menu__item" onClick={() => handle('jump')} data-testid="start-menu-jump">
                  <img src={ICONS.jump} alt="Jump" />
                  JUMP.exe
                </div>
              </div>
            )}
          </div>

          <div className="start-menu__separator" />

          <div className="start-menu__item" onClick={() => handle('cmd')} data-testid="start-menu-cmd">
            <img src={ICONS.cmd} alt="CMD" />
            Invite de commandes
          </div>

          <div className="start-menu__separator" />

            <div className="start-menu__item" onClick={() => { Sounds.error(); onShutdown(); onClose(); }} data-testid="start-menu-shutdown">
            <img src={ICONS.shutdown} alt="Arrêt" />
            <strong>Arrêter...</strong>
          </div>

        </div>
      </div>
    </>
  )
}
