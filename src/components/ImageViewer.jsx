import { useEffect, useState } from 'react'
import '../styles/ImageViewer.scss'

const IMAGES = [
  { name: '1.jpg', file: '/images/1.jpg' },
  { name: '2.jpg', file: '/images/2.jpg' },
  { name: '3.jpg', file: '/images/3.jpg' },
  { name: '4.jpg', file: '/images/4.jpg' },
]

export default function ImageViewer({ requestedImage }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [zoom, setZoom] = useState(1)

  // Quand une image est demandée depuis FileExplorer
  useEffect(() => {
    if (!requestedImage) return
    const idx = IMAGES.findIndex(img => img.file === requestedImage.file)
    if (idx !== -1) {
      setCurrentIdx(idx)
      setZoom(1)
    }
  }, [requestedImage])

  const image = IMAGES[currentIdx]

  const zoomIn  = () => setZoom(z => Math.min(z + 0.25, 4))
  const zoomOut = () => setZoom(z => Math.max(z - 0.25, 0.25))
  const fitView = () => setZoom(1)
  const prev    = () => { setCurrentIdx(i => (i - 1 + IMAGES.length) % IMAGES.length); setZoom(1) }
  const next    = () => { setCurrentIdx(i => (i + 1) % IMAGES.length); setZoom(1) }

  return (
    <div className="imgv">
      {/* Menu bar */}
      <div className="imgv__menubar">
        {['Fichier', 'Affichage', 'Image', 'Aide'].map(m => (
          <span key={m}>{m}</span>
        ))}
      </div>

      {/* Toolbar */}
      <div className="imgv__toolbar">
        <button className="imgv__btn" onClick={prev} title="Image précédente">◄</button>
        <button className="imgv__btn" onClick={next} title="Image suivante">►</button>
        <div className="imgv__separator" />
        <button className="imgv__btn" onClick={zoomIn}  title="Zoom +">+</button>
        <button className="imgv__btn" onClick={zoomOut} title="Zoom -">−</button>
        <button className="imgv__btn" onClick={fitView} title="Taille normale">⊡</button>
        <div className="imgv__separator" />
        <span className="imgv__zoom-label">{Math.round(zoom * 100)}%</span>
      </div>

      {/* Zone d'affichage */}
      <div className="imgv__canvas">
        <div className="imgv__checkerboard">
          <img
            src={image.file}
            alt={image.name}
            className="imgv__image"
            style={{ transform: `scale(${zoom})` }}
            draggable={false}
          />
        </div>
      </div>

      {/* Barre de statut */}
      <div className="imgv__statusbar">
        <span>{image.name}</span>
        <span>{currentIdx + 1} / {IMAGES.length}</span>
      </div>
    </div>
  )
}