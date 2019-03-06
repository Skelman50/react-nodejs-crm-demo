import React, { Component } from 'react';

class GainContent extends Component {
  render() {
    return (
      <div className="col s12 l6">
        <div className="card light-blue lighten-2 white-text">
          <div className="card-content">
            <span className="card-title">Выручка:</span>
            <h3>
              {this.props.gain.yesterday}
              {' '}
грн.
            </h3>
            <h3
              className={this.props.gain.isHigher ? 'green-text text-darket-2 m0 mb1' : 'red-text m0 mb1'}
            >
              <i className="material-icons">
                {this.props.gain.isHigher ? 'arrow_upward' : 'arrow_downward'}
              </i>
              {this.props.gain.percent}
%
            </h3>
            <p>
                Выручка вашего бизнеса вчера на
              {' '}
              {this.props.gain.percent}
%
              {this.props.gain.isHigher ? ' выше ' : ' ниже '}
                среднего:
              {' '}
              {this.props.gain.compare}
              {' '}
грн. в день
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default GainContent;
