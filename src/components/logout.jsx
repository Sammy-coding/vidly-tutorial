import { Component } from 'react';
import auth from '../services/authService';

class Logout extends Component {
    componentDidMount() {
        auth.Logout();
        window.location = '/';
    }
    render() {return null;}
}
 
export default Logout;