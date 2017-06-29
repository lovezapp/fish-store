/**
 * Created by jameslove on 1/9/17.
 */
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';
import base from '../base';

class App extends React.Component {
    constructor(...args) {
        super(...args);

        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        // initial state
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount() {
        // check if any fishes are stored on Firebase
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        // check if there is an order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if (localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }


    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`,
            JSON.stringify(nextState.order));
    }



    addFish = (fish) => {
        // update our state
        const fishes = {...this.state.fishes};
        // add in our new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set state
        this.setState({ fishes });
    }

    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});

    }

    removeFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }

    loadSamples = () => {
        this.setState({
            fishes: sampleFishes
        });
    };

    addToOrder = (key) => {
        let order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order });

    }

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul>
                        {Object.keys(this.state.fishes)
                            .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                    params={this.props.params}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    storeId={this.props.params.storeId}
                />
            </div>
        )
    }
}

App.propTypes = {
  params: React.PropTypes.object
}
export default App;
