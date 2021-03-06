import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {

    static propTypes = {
      details: React.PropTypes.object.isRequired,
      index: React.PropTypes.string.isRequired,
      addToOrder: React.PropTypes.func.isRequired
    }

    render() {
        const { details, index, addToOrder} = this.props;
        const isAvailable = details.status === 'available';
        const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';
        return(
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3>{this.props.details.name}</h3>
                <span className="price">{formatPrice(details.price)}</span>
                <p>{details.desc}</p>
                <button onClick={() => addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
            </li>
        )
    }
}

export default Fish;
