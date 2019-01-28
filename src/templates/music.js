import React from 'react';
import { Layout, Article, Wrapper, Button, SectionTitle } from 'components';
import styled from 'styled-components';
import moment from 'moment';
import { media } from '../utils/media';
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
  const dataSet = tracks.recenttracks.track;
  const lastArtist = dataSet[0].artist['#text'];
  const lastalbum = dataSet[0].album['#text'];
  const lastImg = dataSet[0].image[3]['#text'];
  const lastTrack = dataSet[0].name;
  const lastURL = dataSet[0].url;
  const listening = ``;
  const images = '';
  let main;
  let lastImage;

  if (dataSet[0]['@attr'] === undefined) {
    const lastDate = dataSet[0].date['#text'];
    const offset = new Date().getTimezoneOffset();
    const a = moment(Date.parse(lastDate)).subtract(offset, 'minutes');
    const timeString = a.format('ddd, MMM Do YYYY, h:mm a');

    main = () => (
      <>
        <h1
          className="nowListeningText"
          style={{
            color: 'white',
            fontSize: `21px`,
            fontletiant: `small-caps`,
            fontFamily: `Raleway`,
            textShadow: `2px 2px 3px #000`,
          }}
        >
          What i've been listening to
          <i className="fa fa-music text-primary" />
        </h1>
        <h3 className="notListeningText" style={{ color: `white`, fontSize: `14px`, marginTop: `-9px` }}>
          <span style={{ color: `white`, textShadow: `2px 2px 3px #000`, fontFamily: 'Oswald' }}>
            Updated:
            <span
              style={{
                color: `rgba(147, 147, 147, 1)`,
                textShadow: `2px 2px 3px #000`,
                fontFamily: 'Raleway',
                fontSize: `14px`,
              }}
            >
              timeString
            </span>
          </span>
        </h3>
        <h1
          className="notListeningText"
          style={{
            color: `white`,
            fontSize: `20px`,
            fontWeight: `bold`,
            marginTop: `-7px`,
            textShadow: `2px 2px 3px #000`,
            fontFamily: 'Raleway',
            fontletiant: `small-caps`,
          }}
        >
          <span style={{ color: `white`, textShadow: `2px 2px 3px #000`, fontFamily: 'Oswald', fontSize: `14px` }}>
            Last Track:
          </span>
          lastTrack lastArtist
        </h1>
        <div className="lastAlbumImage text-center center-block" id="lastAlbumImage">
          <img className="lastAlbum" id="lastAlbum" src={lastImg} />
          <div className="lastAlbumImageFace" onClick={() => window.open(lastURL)}>
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
    return main();
  }
  if (dataSet[0]['@attr'].nowplaying === 'true') {
    main = () => (
      <>
        <h1
          className="nowListeningText"
          style={{ fontSize: `24px`, fontWeight: `bold`, color: `white`, textShadow: `2px 2px 3px #000` }}
        >
          Now Listening
          <i className="fa fa-music text-primary" />
        </h1>
        <p className="trackText">{lastTrack}</p>
        <p style={{ marginTop: `-5px`, marginBottom: `2px`, color: `white`, textShadow: `2px 2px 3px #000` }}>by</p>
        <h1 className="nowListeningText">{lastArtist}</h1>
        <div className="currentAlbumImage text-center" id="lastAlbumImage">
          <img className="currentAlbum" id="currentAlbum" src={lastImg} alt="Picture not available :(" />
          <div className="currentAlbumImageFace" align="center" onClick={() => window.open(lastURL)}>
            <h2 className="currentArtistName">{lastArtist}</h2>
            <h2 className="currentAlbumName">{lastalbum}</h2>
          </div>
        </div>
      </>
    );
    return main();
  }
  return <div>hi</div>;
};

const imageComponent = (artistName, albumName, rank, albumImages, url) => (
  <div className="image text-center" id="image">
    <img className="albumImages img-responsive" id="albumImages" src={albumImages} alt="Album image not found :(" />
    <div className = "imageFace" onClick={() => window.open(url)}>
      <h2 className = "artistName">{artistName}</h2>
      <h2 className = "albumName">{albumName}</h2>
      <h2 className = "rank">Rank: <br/>{rank}</h2>
    </div>
  </div>
);

const getImages = data => {
  const components = [];
  for (let i = 0; i <= 11; i++) {
    const url = data.topalbums.album[i].url;
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

export default ({ pageContext: { albums, tracks } }) => {
  console.log(albums, tracks);
  return (
    <Layout>
      <Wrapper>
        <Hero className="topAlbumText">
          {getTracks(tracks)}
          {getImages(albums)}
        </Hero>
      </Wrapper>
    </Layout>
  );
};
