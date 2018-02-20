import { connect } from 'react-redux';
import State from './state';
import Actions from './actions';
import Template from './template';

export default connect(State, Actions)(Template);
