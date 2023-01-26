import axios from 'axios';
import { Component } from 'react';
import s from './App.module.css';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searcbar from './Searchbar/Searchbar';

const BASEURL = 'https://pixabay.com/api/';
const KEYURL = '31478931-cee6e25ac54ee9bbca917239e';
axios.defaults.baseURL = BASEURL;
export class App extends Component {
  state = {
    list: [],
    isnotLoading: true,
    basePage: 1,
    search: '',
    isModalClose: true,
    card: {},
  };
  componentDidMount() {
    this.setState({ isnotLoading: false });
    this.fethData();
  }

  async fethData(basePage = 1, search = this.state.search) {
    this.setState({ isnotLoading: false });
    try {
      const list = await axios.get(`?key=${KEYURL}`, {
        params: {
          per_page: 12,
          page: basePage,
          q: search,
        },
      });
      await this.setState(prevState => {
        return { list: prevState.list.concat(list.data.hits) };
      });
    } catch (error) {
      alert('Uoops!');
    } finally {
      this.setState({ isnotLoading: true });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const search = e.target.search.value;
    this.setState({ basePage: 1, search, list: [] });
    this.fethData(1, search);
  };

  handleLearMore = () => {
    const nextPage = this.state.basePage + 1;
    this.fethData(nextPage);
    this.setState(() => {
      return { basePage: nextPage };
    });
  };
  handleOpenModal = id => {
    this.setState(() => {
      const index = this.state.list.findIndex(item => {
        return item.id === id;
      });

      return { card: this.state.list[index], isModalClose: false };
    });
  };
  handleModalClose = () => {
    this.setState(() => {
      return { isModalClose: true };
    });
  };
  render() {
    return (
      <div className={s.App}>
        <Searcbar onSubmit={this.handleSubmit} />
        {this.state.list.length && (
          <>
            <ImageGallery
              list={this.state.list}
              onOpenModal={this.handleOpenModal}
            />
            {this.state.list.length === this.state.basePage * 12 && (
              <Button onLearMore={this.handleLearMore} />
            )}
          </>
        )}

        {this.state.isnotLoading || <Loader />}
        {this.state.isModalClose || (
          <Modal onModalClose={this.handleModalClose} card={this.state.card} />
        )}
      </div>
    );
  }
}
