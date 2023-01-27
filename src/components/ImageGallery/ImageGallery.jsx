import PropTypes from 'prop-types';
import s from './ImageGallary.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { memo } from 'react';


export  const ImageGallery = memo(({list,onOpenModal})=>{
  return (
          <ul className={s.ImageGallery}>
            {list?.map(card => {
              return (
                <ImageGalleryItem
                  onOpenModal={onOpenModal}
                  key={card.id}
                  card={card}
                />
              );
            })}
          </ul>
        );

},(prevProp,nextProp)=>{
return prevProp.list.length===nextProp.list.length
})

ImageGallery.displayName='ImageGallery'

ImageGallery.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
