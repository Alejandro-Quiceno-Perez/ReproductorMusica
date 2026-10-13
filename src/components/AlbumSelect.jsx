
import { useEffect, useRef, useState } from 'react';
import "../assets/css/albumSelect.css";

const AlbumSelect = ({ albums, albumId, handleAlbumChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedAlbum = albums.find(
    (album) => String(album.id) === String(albumId)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const selectAlbum = (album) => {
    handleAlbumChange({ target: { value: album.id } });
    setIsOpen(false);
  };

  return (
    <div className="album-select" ref={selectRef}>
      <button
        type="button"
        className={`album-select__trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Seleccionar álbum"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedAlbum?.title ?? 'Seleccionar álbum'}</span>
        <span className="album-select__arrow" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="album-select__menu" role="listbox" aria-label="Álbumes">
          {albums.map((album) => (
            <button
              type="button"
              key={album.id}
              role="option"
              aria-selected={String(album.id) === String(albumId)}
              className={`album-select__option ${
                String(album.id) === String(albumId) ? 'is-selected' : ''
              }`}
              onClick={() => selectAlbum(album)}
            >
              {album.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumSelect;
