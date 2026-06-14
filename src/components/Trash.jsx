import { useState } from 'react'
import Sounds from '../components/Sounds'
import '../styles/Trash.scss'

const ICONS = {
    recycleFull:  'https://win98icons.alexmeub.com/icons/png/recycle_bin_full-4.png',
    recycleEmpty: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png',
    txt:    'https://win98icons.alexmeub.com/icons/png/notepad_file-0.png',
    img:    'https://win98icons.alexmeub.com/icons/png/kodak_imaging_file-0.png',
    mp3:    'https://win98icons.alexmeub.com/icons/png/wm_file-5.png',
    exe:    'https://win98icons.alexmeub.com/icons/png/executable_gear-0.png',
    zip:    'https://win98icons.alexmeub.com/icons/png/zip-1.png',
    folder: 'https://win98icons.alexmeub.com/icons/png/directory_closed-2.png',
}

const getIcon = (name = '') => {
    if (name.endsWith('.txt')) return ICONS.txt
    if (name.match(/\.(jpg|jpeg|png|gif|bmp)$/i)) return ICONS.img
    if (name.endsWith('.mp3')) return ICONS.mp3
    if (name.endsWith('.exe')) return ICONS.exe
    if (name.endsWith('.zip')) return ICONS.zip
    return ICONS.folder
}

const INITIAL_TRASH = [
    { id: 't1', name: 'brouillon_message_Ryohei.txt', origin: 'C:\\Kiba\\Documents\\Drafts',     size: '2,4 Ko', deletedAt: '12/03/6076 - 23:47' },
    { id: 't2', name: 'Kazuki_preuve.jpg',            origin: 'C:\\Kiba\\Images\\Enquete',       size: '184 Ko', deletedAt: '04/04/6076 - 02:13' },
    { id: 't3', name: 'ancien_mdp.txt',               origin: 'C:\\Kiba\\Important',             size: '512 o',  deletedAt: '21/02/6076 - 18:02' },
    { id: 't4', name: 'tenku_striders_logo.png',      origin: 'C:\\Kiba\\Images',                size: '76 Ko',  deletedAt: '15/01/6076 - 09:35' },
    { id: 't5', name: 'demo_track_v0.mp3',            origin: 'C:\\Kiba\\Musique\\Bruts',        size: '3,7 Mo', deletedAt: '28/12/6075 - 14:21' },
    { id: 't6', name: 'parcours_ikebukuro.bmp',       origin: 'C:\\Kiba\\Images\\Repérages',     size: '912 Ko', deletedAt: '09/11/6075 - 21:08' },
    { id: 't7', name: 'CGU-NET_install.exe',          origin: 'C:\\Temp',                        size: '1,2 Mo', deletedAt: '03/10/6075 - 11:58' },
    { id: 't8', name: 'archive_Ura_Ura_Kidz.zip',     origin: 'C:\\Kiba\\Documents\\Histoire',   size: '8,9 Mo', deletedAt: '18/09/6075 - 16:44' },
    { id: 't9', name: 'todo_Bunkyo.txt',              origin: 'C:\\Kiba\\Documents',             size: '1,1 Ko', deletedAt: '02/08/6075 - 07:50' },
]

export default function Trash() {
    const [items, setItems] = useState(INITIAL_TRASH)
    const [selected, setSelected] = useState(null)
    const [confirmEmpty, setConfirmEmpty] = useState(false)

    const isEmpty = items.length === 0

    const handleEmpty = () => {
        Sounds.windowClose?.()
        setItems([])
        setSelected(null)
        setConfirmEmpty(false)
    }

    return (
        <div className="trash" data-testid="corbeille-window">
            {/* Menubar */}
            <div className="win98-window__menubar">
                <span>Fichier</span>
                <span>Édition</span>
                <span>Affichage</span>
                <span>Aide</span>
            </div>

            {/* Toolbar */}
            <div className="win98-window__toolbar trash__toolbar">
                <button
                    className={`win98-window__toolbar-btn ${isEmpty ? 'win98-window__toolbar-btn--disabled' : ''}`}
                    disabled={isEmpty}
                    onClick={() => setConfirmEmpty(true)}
                    data-testid="corbeille-empty-btn"
                >
                    <img src={ICONS.recycleFull} alt="" />
                    Vider la corbeille
                </button>
                <button className="win98-window__toolbar-btn win98-window__toolbar-btn--disabled" disabled>
                    Restaurer
                </button>
                <div className="trash__toolbar-spacer" />
                <span className="trash__toolbar-info">{items.length} objet(s) dans la corbeille</span>
            </div>

            {/* Address bar */}
            <div className="win98-window__address-bar">
                <label>Adresse</label>
                <div className="trash__address">
                    <img src={isEmpty ? ICONS.recycleEmpty : ICONS.recycleFull} alt="" />
                    <span>Corbeille</span>
                </div>
            </div>

            {/* Content */}
            <div className="trash__content">
                {isEmpty ? (
                    <div className="trash__empty">
                        <img src={ICONS.recycleEmpty} alt="" />
                        <span>La Corbeille est vide.</span>
                    </div>
                ) : (
                    <table className="trash__table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Emplacement d'origine</th>
                                <th>Date de suppression</th>
                                <th>Taille</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(it => (
                                <tr
                                    key={it.id}
                                    className={`trash__row ${selected === it.id ? 'trash__row--selected' : ''}`}
                                    onClick={() => setSelected(it.id)}
                                    data-testid={`corbeille-item-${it.id}`}
                                >
                                    <td>
                                        <img src={getIcon(it.name)} alt="" />
                                        {it.name}
                                    </td>
                                    <td>{it.origin}</td>
                                    <td>{it.deletedAt}</td>
                                    <td>{it.size}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Status bar */}
            <div className="win98-window__statusbar">
                <span>{items.length} objet(s)</span>
                {selected && <span>1 objet sélectionné</span>}
            </div>

            {/* Confirm dialog */}
            {confirmEmpty && (
                <div className="trash__dialog-overlay">
                    <div className="trash__dialog" data-testid="corbeille-confirm-dialog">
                        <div className="win98-window__titlebar">
                            <span className="win98-window__title-text">Confirmation de la suppression de fichiers</span>
                            <div className="win98-window__controls">
                                <button
                                    className="win98-window__ctrl-btn win98-window__ctrl-btn--close"
                                    onClick={() => setConfirmEmpty(false)}
                                    aria-label="Fermer"
                                    data-testid="corbeille-confirm-close"
                                />
                            </div>
                        </div>
                        <div className="trash__dialog-body">
                            <img src={ICONS.recycleFull} alt="" />
                            <span>Voulez-vous vraiment supprimer ces {items.length} éléments ?</span>
                        </div>
                        <div className="trash__dialog-buttons">
                            <button className="trash__dialog-btn" onClick={handleEmpty} data-testid="corbeille-confirm-yes">
                                Oui
                            </button>
                            <button className="trash__dialog-btn" onClick={() => setConfirmEmpty(false)} data-testid="corbeille-confirm-no">
                                Non
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}