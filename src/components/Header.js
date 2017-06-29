/**
 * Created by jameslove on 1/9/17.
 */
import React from 'react';

// stateless functional component
const Header = (props) => {


  return(
    <header className="top">
      <h1>
          Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
      </h1>
      <h3 className="tagline">{props.tagline}</h3>
    </header>
  )
};

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}
export default Header;
