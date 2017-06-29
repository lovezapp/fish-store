/**
 * Created by jameslove on 1/8/17.
 */
import React from 'react';
import { getFunName } from '../helpers';
import { render } from 'react-dom';

class StorePicker extends React.Component {



    goToStore(event) {
        event.preventDefault();
        console.log('You changed the URL');
        // first grab the text from the box
        const storeId = this.storeInput.value;
        console.log(`Going to ${storeId}`);
        // transition from / to /store/:storeId
        this.context.router.transitionTo(`/store/${storeId}`)
    }

    render() {
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
            {/* This is how you comment in JSX. MUST BE INSIDE ELEMENT */}
                <h2>Please Enter A Store</h2>
                <input
                    type="text"
                    required placeholder="Store Name"
                    defaultValue={getFunName()}
                    ref={(input) => { this.storeInput = input}}
                />
                <button type="submit">Visit Store -> </button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
};

export default StorePicker;