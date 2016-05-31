


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TextInput,
  Image
} from 'react-native';

import SecureView from './SecureView.js'
var HotelAdminService = require('./services.js')



class LoginView extends Component {



    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",

        };

       //binds 'this' keyword to LoginView.js(this file)
       this.login =HotelAdminService.login.bind(this);
       

      //console.log(this.onSubmitPressed())
    }



  render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Sign In
                </Text>
                <View>
                    <TextInput
                        placeholder="Username"
                        onChange={(event) => this.setState({username: event.nativeEvent.text})}
                        style={styles.formInput}
                        value={this.state.username} />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        onChange={(event) => this.setState({password: event.nativeEvent.text})}
                        style={styles.formInput}
                        value={this.state.password} />
                    <TouchableHighlight onPress={HotelAdminService.login.bind(this)} style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
                    <Text>{this.state.errorMessage}
                    </Text>
                </View>
            </View>
        );
    }


}




var styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 30,
        marginTop: 65,
        alignItems: "stretch"
    },
    title: {
        fontSize: 18,
        marginBottom: 10,

    },
    formInput: {
        height: 40,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 8,
        color: "#555555"
    },
    button: {
        height: 36,
        flex: 1,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
});

module.exports = LoginView;
