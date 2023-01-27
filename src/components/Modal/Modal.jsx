import PropTypes from 'prop-types';
import { useEffect } from 'react';

import s from './Modal.module.css';

export default function Modal({ onModalClose, card }) {
  const hendleCklickOverlay = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };
  const hendleKeyEscaep = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', hendleKeyEscaep);
    return () => window.removeEventListener('keydown', hendleKeyEscaep);
  }, []);
  const { largeImageURL, tags } = card;
  return (
    <div className={s.Overlay} onClick={hendleCklickOverlay}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
