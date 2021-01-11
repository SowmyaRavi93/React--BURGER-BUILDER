// functional component

import React, {Component} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux';
//import classes from './Layout.css';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer};
    });
}
    render() {
        return (
            // because we cant have two div adjacent to each other we have to wrap it is AUx
    <Aux>
    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
    <SideDrawer 
    open = {this.state.showSideDrawer}
    closed = { this.sideDrawerClosedHandler}/>
    <main className= {classes.Content}> 
    { /* component to wrap with layout*/}
    {this.props.children}

    </main>

</Aux>
        )
    }
}
export default Layout;

