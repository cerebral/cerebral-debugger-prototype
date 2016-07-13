import React from 'react';
import classNames from 'classnames';
import {connect} from 'cerebral-view-react';
import styles from './styles.css';
import icons from 'common/icons.css';
import connector from 'connector';

@connect({
  currentPage: 'debugger.currentPage',
  currentApp: 'debugger.currentApp'
})
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedSignals: null
    };
  }
  onDisableDebuggerClick() {
    connector.sendEvent('toggleDisableDebugger');
  }
  onCopySignalsClick() {
    this.setState({copiedSignals: JSON.stringify(this.props.currentApp.signals, null, 2)}, () => {
      this.refs.textarea.select();
    });
  }
  render() {
    const currentApp = this.props.currentApp || {};

    return (
      <ul className={styles.toolbar}>
        {
          this.state.copiedSignals ?
            <li className={styles.textarea}>
              <textarea ref="textarea" value={this.state.copiedSignals} onBlur={() => this.setState({copiedSignals: null})}/>
            </li>
          :
            null
        }
        <li className={styles.item}>
          <ul className={styles.tabs}>
            <li
              className={classNames(styles.tab, {[styles.activeTab]: this.props.currentPage === 'signals'})}
              onClick={() => this.props.signals.debugger.pageChanged({page: 'signals'})}>
              <i className={icons.signals}/> SIGNALS
            </li>
            <li
              className={classNames(styles.tab, {[styles.activeTab]: this.props.currentPage === 'components'})}
              onClick={() => this.props.signals.debugger.pageChanged({page: 'components'})}>
              <i className={icons.components}/> COMPONENTS
            </li>
            <li
              className={classNames(styles.tabOnSmall, styles.tab, {[styles.activeTab]: this.props.currentPage === 'model'})}
              onClick={() => this.props.signals.debugger.pageChanged({page: 'model'})}>
              <i className={icons.model}/> MODEL
            </li>
            <li className={styles.rightItem}>
              <button
                onClick={() => this.onDisableDebuggerClick()}
                disabled={currentApp.isExecutingAsync}>{currentApp.disableDebugger ? 'enable' : 'disable'}</button>
            </li>
            <li className={styles.rightItem}>
              <button
                onClick={() => this.onCopySignalsClick()}
                disabled={currentApp.isExecutingAsync}>copy signals</button>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}

 export default Toolbar
