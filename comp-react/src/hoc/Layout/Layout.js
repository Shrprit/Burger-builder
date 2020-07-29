import React, {Component} from 'react';

import Auxi from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSideDrawer: true,
    }
    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    SideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return  {showSideDrawer: !prevState.showSideDrawer};
            });
        
    }
    render () {
        return(
    <Auxi>
    <Toolbar drawerToggleClicked = {this.SideDrawerToggleHandler}/>
    <SideDrawer open = {this.state.showSideDrawer} closed = {this.SideDrawerClosedHandler} />
    <main className = {classes.Content}>
         {this.props.children}
     </main>
    </Auxi>
        )
    }
};

export default Layout;
