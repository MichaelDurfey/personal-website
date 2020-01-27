/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Layout, Wrapper, Header } from 'components';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import Loader from 'react-loader-spinner';
import { media } from '../utils/media';
import './musicStyles.css';

import config from '../../config/SiteConfig';

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 6rem 2rem;
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
  if (!tracks.recenttracks) {
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
    const time = a.format('h:mma');
    const dayMonthYear = a.format('ddd, MMM Do YYYY');

    return (
      <>
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
          <span style={{ color: `black`, fontFamily: 'Oswald', fontSize: `14px` }}>Last Track:</span>
          <br />
          {lastTrack}
          <br />
          <span style={{ color: `black`, fontFamily: 'Oswald', fontSize: `11px` }}>by</span>
          <br />
          {lastArtist}
        </h1>
        <h4 className="notListeningText" style={{ color: `black`, fontSize: `14px`, marginBottom: '5px' }}>
          <span style={{ color: `black`, fontFamily: 'Oswald' }}>
            <span
              style={{
                color: `black`,
                fontFamily: 'Raleway',
                fontSize: `14px`,
              }}
            >
              {time}
              <br />
              {dayMonthYear}
            </span>
          </span>
        </h4>
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
        <h1 className="nowListeningText" style={{ fontSize: `24px`, fontWeight: `bold`, color: `black` }}>
          Now Listening
          <i className="text-primary" />
        </h1>
        <p className="trackText">{lastTrack}</p>
        <p style={{ marginBottom: `3px`, color: `black` }}>by</p>
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

const imageComponent = (artistName, albumName, rank, albumImages, url, key) => (
  <div className="image text-center" id="image" key={key}>
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
  if (!data.topalbums) {
    return;
  }
  const components = [];
  for (let i = 0; i <= 11; i += 1) {
    const { url } = data.topalbums.album[i];
    const artistName = data.topalbums.album[i].artist.name;
    const albumName = data.topalbums.album[i].name;
    const { rank } = data.topalbums.album[i]['@attr'];
    const albumImage = data.topalbums.album[i].image[3]['#text'];
    const key = `unique${i}`;
    if (albumImage) {
      components.push(imageComponent(artistName, albumName, rank, albumImage, url, key));
    }
  }

  const SectionTwo = styled.div`
    margin-top: 20px;
  `;
  return (
    <SectionTwo>
      <h2 className="topAlbumText" id="topAlbumText">
        Top albums this month
      </h2>
      <div className="images">{components}</div>
    </SectionTwo>
  );
};

export default class MusicPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      tracks: {},
      albums: {},
    };
  }

  componentDidMount() {
    this.fetchMusicStats();
  }

  loadStuff = () => (
    <>
      {getTracks(this.state.tracks)}
      {getImages(this.state.albums)}
    </>
  );

  fetchMusicStats() {
    const apiKey = process.env.GATSBY_API_KEY;
    const tracksUrl = process.env.GATSBY_API_TRACKS_URL;
    const albumsUrl = process.env.GATSBY_API_ALBUMS_URL;

    (async () => {
      try {
        this.setState({ loading: true });
        if (!apiKey || !tracksUrl || !albumsUrl) {
          throw new Error('Urls or apikeys are missing. Do you have the right .env configuration?');
        }
        const tracks = await axios.get(`${tracksUrl}${apiKey}&format=json`);
        const albums = await axios.get(`${albumsUrl}${apiKey}&format=json`);
        this.setState({
          tracks: tracks.data,
          albums: albums.data,
          loading: false,
        });
      } catch (err) {
        console.error('error fetching music stats! --->', err);
        window.location.assign('/');
      }
    })();
  }

  render() {
    const { loading } = this.state;
    return (
      <Layout>
        <Wrapper>
          <Helmet title={`Contact | ${config.siteTitle}`} />
          <Header>
            <Link to="/">{config.siteTitle}</Link>
          </Header>
          <Hero className="topAlbumText">
            {loading ? <Loader type="Audio" color="#000" height={80} width={80} /> : this.loadStuff()}
          </Hero>
        </Wrapper>
      </Layout>
    );
  }
}
