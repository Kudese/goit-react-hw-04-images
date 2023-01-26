import PropTypes from 'prop-types';
import s from './ImageGallary.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
export default class ImageGallery extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.list.length === this.props.list.length) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.props.list?.map(card => {
          return (
            <ImageGalleryItem
              onOpenModal={this.props.onOpenModal}
              key={card.id}
              card={card}
            />
          );
        })}
      </ul>
    );
  }
}

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
