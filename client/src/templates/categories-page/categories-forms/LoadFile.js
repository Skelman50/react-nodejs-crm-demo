import React, { Component } from 'react';


class LoadFile extends Component {
  constructor() {
    super();
    this.file = React.createRef();
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  onFileUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.props.showImage({ loadImage: null, imagePreview: reader.result, file });
    };
    reader.readAsDataURL(file);
  }


  render() {
    return (
      <div>
        <input
          ref={this.file}
          onChange={this.onFileUpload}
          type="file"
          style={{ display: 'none' }}
        />
        <button
          onClick={() => this.file.current.click()}
          className="waves-effect waves-light btn orange lighten-2 mb2"
        >
          <i className="material-icons left">backup</i>
              Загрузить изображение
        </button>
      </div>
    );
  }
}

export default LoadFile;
