import axios from 'axios';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import s from './App.module.css';
import Button from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searcbar from './Searchbar/Searchbar';

const BASEURL = 'https://pixabay.com/api/';
const KEYURL = '31478931-cee6e25ac54ee9bbca917239e';
axios.defaults.baseURL = BASEURL;

export function App() {
  const [list, setList] = useState([]);
  const [isnotLoading, setIsNotLoading] = useState(true);
  const [basePage, setBasePage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalClose, setIsModalClose] = useState(true);
  const [card, setCard] = useState({});

  useEffect(() => {
    fethData(basePage, search);
  }, []);

  const fethData = async (basePage, search) => {
    setIsNotLoading(false);
    try {
      const list = await axios.get(`?key=${KEYURL}`, {
        params: {
          per_page: 12,
          page: basePage,
          q: search,
        },
      });
      await setList(prev => {
        return prev.concat(list.data.hits);
      });
    } catch (error) {
      alert('Uoops!');
    } finally {
      setIsNotLoading(true);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const searchFind = e.target.search.value;

    setBasePage(1);
    setSearch(searchFind);
    setList([]);
    fethData(1, searchFind);
  };
  const handleLearMore = () => {
    const nextPage = basePage + 1;
    fethData(nextPage, search);
    setBasePage(() => {
      return nextPage;
    });
  };
  const handleOpenModal = id => {
    const index = list.findIndex(item => {
      return item.id === id;
    });
    setCard(list[index]);
    setIsModalClose(false);
  };
  const handleModalClose = () => {
    setIsModalClose(true);
  };
  return (
    <div className={s.App}>
      <Searcbar onSubmit={handleSubmit} />
      {list.length && (
        <>
          <ImageGallery list={list} onOpenModal={handleOpenModal} />
          {list.length === basePage * 12 && (
            <Button onLearMore={handleLearMore} />
          )}
        </>
      )}

      {isnotLoading || <Loader />}
      {isModalClose || <Modal onModalClose={handleModalClose} card={card} />}
    </div>
  );
}
