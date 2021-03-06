import React, { Component } from 'react';
import Style from 'styled-components';

import Mosaic from 'react-mosaic';
import Progress from './Progress';
import Options from './Options';
import StockPhoto from './stock-photo.jpg';
import { polygonRenderer, circleRenderer, halfToneRenderer } from './Renderers';
import InputToDataUrl from './InputToDataUrl';

import debounce from 'lodash/debounce';

class App extends Component {
  state = {
    image: StockPhoto,
    tileSize: 8,
    mosaicWidth: 1024,
    mosaicHeight: 768,
    tileRenderer: 'halfToneRenderer',
  };

  renderers = { polygonRenderer, circleRenderer, halfToneRenderer };

  Container = Style.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  Input = Style.input`
    padding: 1rem;
    width: 50%;
    font-family: 'Courgette', cursive;
    color: #777;
    border: none;
    box-shadow: 0px 1px 2px rgba(33, 33, 33, 0.2);

    &:focus {
      outline: none;
    }

    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: pink;
    }
    &::-moz-placeholder { /* Firefox 19+ */
      color: pink;
    }
    &:-ms-input-placeholder { /* IE 10+ */
      color: pink;
    }
    &:-moz-placeholder { /* Firefox 18- */
      color: pink;
    }
  `;

  StyledMosaic = Style(Mosaic)`
    position: absolute;
    z-index: -1;
  `;

  componentDidMount() {
    this.setState({
      mosaicWidth: window.innerWidth,
      mosaicHeight: window.innerHeight,
    });
  }

  handleOnChange = image => {
    this.setState(() => ({ image }));
  };
  handleOptionsChange = ({ tileSize, selectedRenderer }) => {
    this.setState({ tileSize: tileSize, tileRenderer: selectedRenderer });
  };

  emitter = {
    on(handler) {
      this.handler = handler;
    },
    fire(args) {
      if (this.handler) this.handler(args);
    },
  };

  handleProgress = ({ current, total }) => {
    const progress = Math.round(current / total * 100);
    this.emitter.fire({ progress });
  };

  render() {
    return (
      <this.Container>
        <Progress emitter={this.emitter} />
        <Options
          onChange={this.handleOptionsChange}
          tileSize={this.state.tileSize}
          renderers={Object.keys(this.renderers)}
          selectedRenderer={this.state.tileRenderer}
        />
        <InputToDataUrl onChange={this.handleOnChange} />
        <Mosaic
          src={this.state.image}
          tileSize={this.state.tileSize}
          width={this.state.mosaicWidth}
          height={this.state.mosaicHeight}
          tileRenderer={this.renderers[this.state.tileRenderer] || null}
          onProgress={this.handleProgress}
          style={{ position: 'absolute', zIndex: -1, left: 0, top: 0 }}
        />
      </this.Container>
    );
  }
}

export { App as default };
