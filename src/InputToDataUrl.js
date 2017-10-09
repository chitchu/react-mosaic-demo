import React, { Component } from 'react';
import Style from 'styled-components';

const Label = Style.label`
  background-color: white;
  padding: 1rem;
  font-family: 'Courgette', cursive;
  color: pink;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(33, 33, 33, 0.2);
  transition: all 1s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
class InputFileToDataURL extends Component {
  constructor() {
    super();
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange({ target: { files: [file] } }) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      this.props.onChange(result);
    };
    reader.readAsDataURL(file);
  }
  render() {
    return (
      <Label>
        Open an image...{' '}
        <input
          type="file"
          onChange={this.handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </Label>
    );
  }
}

export { InputFileToDataURL as default };
