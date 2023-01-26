import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({ card, onOpenModal }) {
  const { id, webformatURL, tags } = card;
  return (
    <li className={s.ImageGalleryItem} onClick={() => onOpenModal(id)}>
      <img
        className={s['ImageGalleryItem-image']}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
