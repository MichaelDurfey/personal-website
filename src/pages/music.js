/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Layout, Article, Wrapper, Button, SectionTitle } from 'components';
import styled from 'styled-components';
import moment from 'moment';
import { media } from '../utils/media';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import './musicStyles.css';

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 6rem 2rem;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.grey.dark};

  p {
    font-size: 1.68rem;
    margin-top: -1rem;
    @media ${media.phone} {
      font-size: 1.25rem;
    }
    @media ${media.tablet} {
      font-size: 1.45rem;
    }
  }
`;

const getTracks = tracks => {
  if (!tracks.recenttracks){
    return;
  }
  const dataSet = tracks.recenttracks.track;
  const lastArtist = dataSet[0].artist['#text'];
  const lastalbum = dataSet[0].album['#text'];
  const lastImg = dataSet[0].image[3]['#text'];
  const lastTrack = dataSet[0].name;
  const lastURL = dataSet[0].url;

  if (dataSet[0]['@attr'] === undefined) {
    const lastDate = dataSet[0].date['#text'];
    const offset = new Date().getTimezoneOffset();
    const a = moment(Date.parse(lastDate)).subtract(offset, 'minutes');
    const timeString = a.format('ddd, MMM Do YYYY, h:mm a');

    return (
      <>
        <h1
          className="nowListeningText"
          style={{
            color: 'black',
            fontSize: `21px`,
            fontletiant: `small-caps`,
            fontFamily: `Raleway`,
          }}
        >
          What i've been listening to
          <i className="fa fa-music text-primary" />
        </h1>
        <h3 className="notListeningText" style={{ color: `black`, fontSize: `14px`, marginTop: `-9px` }}>
          <span style={{ color: `black`, fontFamily: 'Oswald' }}>
            Updated: <br/>
            <span
              style={{
                color: `black`,
                fontFamily: 'Raleway',
                fontSize: `14px`,
              }}
            >
              {timeString}
            </span>
          </span>
        </h3>
        <h1
          className="notListeningText"
          style={{
            color: `black`,
            fontSize: `20px`,
            fontWeight: `bold`,
            marginTop: `-7px`,
            fontFamily: 'Raleway',
            fontletiant: `small-caps`,
          }}
        >
          <span style={{ color: `black`, fontFamily: 'Oswald', fontSize: `14px` }}>
            Last Track:
          </span>
          <br/>
          {lastTrack} <br/>
          by <br/>
          {lastArtist}
        </h1>
        <div className="lastAlbumImage text-center center-block" id="lastAlbumImage">
          <img className="lastAlbum" id="lastAlbum" src={lastImg} alt="Last Album" />
          <div
            className="lastAlbumImageFace"
            id="lastAlbumImageFace"
            role="button"
            onClick={() => window.open(lastURL)}
          >
            <h2
              className="lastArtistName"
              style={{
                paddingRight: `5%`,
                paddingLeft: `5%`,
                paddingTop: `10%`,
                fontSize: `4vh`,
                color: `white`,
                width: `100%`,
                fontFamily: 'Raleway',
                fontWeight: `bold`,
              }}
            >
              {lastArtist}
            </h2>
            <h2
              className="lastAlbumName"
              style={{
                paddingLeft: `5%`,
                paddingRight: `5%`,
                paddingTop: `5%`,
                fontSize: `3vh`,
                fontFamily: 'Raleway',
                color: `white`,
                width: `100%`,
                fontWeight: `bold`,
              }}
            >
              {lastalbum}
            </h2>
          </div>
        </div>
      </>
    );
  }
  if (dataSet[0]['@attr'].nowplaying === 'true') {
    return (
      <>
        <h1
          className="nowListeningText"
          style={{ fontSize: `24px`, fontWeight: `bold`, color: `black`, }}
        >
          Now Listening
          <i className="fa fa-music text-primary" />
        </h1>
        <p className="trackText">{lastTrack}</p>
        <p style={{ marginTop: `-5px`, marginBottom: `2px`, color: `black`, }}>by</p>
        <h1 className="nowListeningText">{lastArtist}</h1>
        <div className="currentAlbumImage text-center" id="lastAlbumImage">
          <img className="currentAlbum" id="currentAlbum" src={lastImg} alt="Not available :(" />
          <div className="currentAlbumImageFace" role="button" align="center" onClick={() => window.open(lastURL)}>
            <h2 className="currentArtistName">{lastArtist}</h2>
            <h2 className="currentAlbumName">{lastalbum}</h2>
          </div>
        </div>
      </>
    );
  }
  return <div>hi</div>;
};

const imageComponent = (artistName, albumName, rank, albumImages, url) => (
  <div className="image text-center" id="image">
    <img className="albumImages img-responsive" id="albumImages" src={albumImages} alt="Album not found :(" />
    <div className="imageFace" role="button" onClick={() => window.open(url)}>
      <h2 className="artistName">{artistName}</h2>
      <h2 className="albumName">{albumName}</h2>
      <h2 className="rank">
        Rank: <br />
        {rank}
      </h2>
    </div>
  </div>
);

const getImages = data => {
  if(!data.topalbums) {
    return;
  }
  const components = [];
  for (let i = 0; i <= 11; i += 1) {
    const { url } = data.topalbums.album[i];
    const artistName = data.topalbums.album[i].artist.name;
    const albumName = data.topalbums.album[i].name;
    const { rank } = data.topalbums.album[i]['@attr'];
    const albumImages = data.topalbums.album[i].image[3]['#text'];
    if (albumImages) {
      components.push(imageComponent(artistName, albumName, rank, albumImages, url));
    }
  }
  return (
    <div>
      <h1 className="topAlbumText" id="topAlbumText">
        Top albums this month
      </h1>
      <div className="images">{components}</div>
    </div>
  );
};

export default class MusicPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      tracks: {},
      albums: {}
    };
  }

  componentDidMount() {
    this.fetchMusicStats();
  }

  fetchMusicStats() {
    const apiKey = process.env.API_KEY
    const loadStuff = async () => {
      try {
        this.setState({ loading: true })
        const tracks = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=almostcrimes_&api_key=${apiKey}&format=json`);
        const albums = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=almostcrimes_&period=1month&api_key=${apiKey}&format=json`);
        this.setState({ 
          tracks: tracks.data, 
          albums: albums.data,
          loading: false
        });
      } catch (err) {
        console.log(err);
      }
    };
    loadStuff();
  }

  loadStuff = () => {
      return (
        <>
          {getTracks(this.state.tracks)}
          {getImages(this.state.albums)}
        </>
      )
    }

  render() {
    const loading = this.state.loading;
    return (
      <Layout>
        <Wrapper>
          <Hero className="topAlbumText">
            {loading ? <Loader type="Audio" color="#000" height={80} width={80} /> : this.loadStuff()}
          </Hero>
        </Wrapper>
      </Layout>
    );
  }
}