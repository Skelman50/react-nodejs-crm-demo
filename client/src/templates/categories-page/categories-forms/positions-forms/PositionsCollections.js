import React, { Component } from 'react';
import Preloader from '../../../../components/preloader/Preloader';

class PositionsCollections extends Component {
  render() {
    return (
      <div className="collection">
        {this.props.preload ? <Preloader />
          : (
            <div>
              {this.props.positions.length !== 0
                ? this.props.positions.map((position, index) => (
                  <i
                    onClick={() => this.props.onUpdatePosition(position)}
                    className="collection-item collection-item-icon blue-text"
                    key={index}
                  >
                    <span>
                      {position.name}
                      {' '}
                      <strong>
                        {position.cost}
                        {' '}
грн.
                      </strong>
                    </span>
                    <span>
                      <i
                        onClick={(event) => {
                          this.props.onDeletePosition(position);
                          event.stopPropagation();
                        }
                    }
                        className="material-icons"
                      >
delete
                      </i>
                    </span>
                  </i>
                )) : <div className="center"> у вас пока нет позиций</div>
    }
            </div>
          )
        }
      </div>
    );
  }
}

export default PositionsCollections;
