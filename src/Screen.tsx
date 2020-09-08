import React from 'react';
import {PureComponent} from 'react';
import axios from 'axios';
import _ from 'lodash';
import {ScrollView} from 'react-native';
import {Card} from './Card';
import {Carousel} from './Carousel';
import {Content} from './Content';
import {Stack} from './Stack';
import {Badge} from './Badge';

const checkIcon = 'https://image.emojipng.com/733/300733.jpg';

const api_key = '9f5bfb9e46dc9d29842c84653c92251f';
const base_URL = 'https://image.tmdb.org/t/p/original/';
const movies_db =
  'https://api.themoviedb.org/3/movie/upcoming?api_key=' +
  api_key +
  '&language=en-US';

async function getMovies(url: string) {
  const movies = await axios.get(url);
  return movies;
}

class Screen extends PureComponent {
  state = {
    moviesList: [],
    selected: [],
    title: 'Title',
    text: 'Text',
  };

  async componentDidMount() {
    const movies = await getMovies(movies_db);
    this.setState({
      moviesList: movies.data.results,
      title: movies.data.results[0].title,
      text: movies.data.results[0].overview,
    });
  }

  renderCard(movie: String, index: number) {
    const imageSource = base_URL + movie.poster_path;
    return (
      <Card
        source={imageSource}
        key={index}
        shadow
        onPress={() => this.toggleSelected(movie)}
        selected={_.includes(this.state.selected, movie)}
      />
    );
  }

  renderStack(movie: String, index: number) {
    const imageSource = base_URL + movie.poster_path;
    return (
      <Card
        borderWidth={2}
        borderRadius={10}
        borderColor="white"
        source={imageSource}
        key={index}
        width={100}
        height={150}
      />
    );
  }

  setCurrentPage(offsetX: number) {
    if (offsetX >= 0) {
      const cardOffset = Math.floor((100 + offsetX) / 275);
      const moviesCount = this.state.moviesList.length - 1;
      const currentCard = _.min([cardOffset, moviesCount]);
      this.setState({
        title: this.state.moviesList[currentCard].title,
        text: this.state.moviesList[currentCard].overview,
      });
    }
  }

  toggleSelected = (card) => {
    this.setState({
      selected: _.xor(this.state.selected, [card]),
    });
  };

  render() {
    const selectedCount = this.state.selected.length;
    return (
      <ScrollView style={{flex: 1}}>
        <Carousel
          onScroll={(event) => {
            this.setCurrentPage(event.nativeEvent.contentOffset.x);
          }}>
          {this.state.moviesList &&
            _.map(this.state.moviesList, (image, index) =>
              this.renderCard(image, index),
            )}
        </Carousel>
        <Content title={this.state.title} content={this.state.text} />
        <Stack>
          {this.state.moviesList &&
            _.map(this.state.selected, (image, index) =>
              this.renderStack(image, index),
            )}
        </Stack>
        {selectedCount > 0 && (
          <Badge
            /* source={checkIcon} */ size={'medium'}
            text={selectedCount.toString()}
          />
        )}
      </ScrollView>
    );
  }
}

export {Screen};
