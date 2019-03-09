import React, { Component } from 'react';


class ImageView extends Component {
  render() {
    return (
      <div className="col s12 l4 center">
        {this.props.image.imagePreview || this.props.image.loadImage
          ? (
            <img
              className="responsive-img"
              style={{ height: '200px' }}
              src={this.props.image.imagePreview ? this.props.image.imagePreview : this.props.image.loadImage}
              alt={this.props.image.imagePreview}
            />
          ) : null}
      </div>

    );
  }
}

export default ImageView;
