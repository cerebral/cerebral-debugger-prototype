import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

@Cerebral()
class Debugger extends React.Component {
  render() {
    return (
      <div>
       Hello world!
      </div>
    );
  }
}

 export default Debugger
