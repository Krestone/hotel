import React, { Component, PropTypes } from 'react'
import Drawer from 'react-native-drawer'
import SideDrawerContent from './SideDrawerContent.js'


export default class SideDrawer extends Component {
	render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={()=>Actions.refresh({key:state.key, open: true})}
                onClose={()=>Actions.refresh({key:state.key, open: false})}
                type="displace"
                content={<TabView />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
								styles={drawerStyles}
                negotiatePan={true}
                tweenHandler={(ratio) => ({
                 main: { opacity:Math.max(0.54,1-ratio) }
            })}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}




var drawerStyles = {
	drawer: { backgroundColor: '#ffffff' },
	main: { paddingLeft: 3 }
}
