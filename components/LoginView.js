


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TextInput
} from 'react-native';

import SecureView from './SecureView.js'




class LoginView extends Component {



    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",


        };

       this.onSubmitPressed = this.onSubmitPressed.bind(this);
       this.loginScript =this.loginScript.bind(this);
       this.navigatorPush=this.navigatorPush.bind(this);
      //console.log(this.onSubmitPressed())
    }

    loginScript(){
      var usr= this.state.username;
      var pass=this.state.password;
      var params = {
      username: usr,
      password: pass,
      grant_type: 'password'
      };

      var data = "";
      var responseStatus=0;
      for (var k in params) {
          data += k + "=" + params[k] + "&"
      }

           fetch('https://checkinadvance.com/tokenn', {
                                method: 'POST',
                                timeout: 100000,
                                headers: {
                                 'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: data
                               })
                               .then((response) => {
                                                     //console.log("response :");
                                                     //console.log(response);
                                                    // console.log(response.status);
                                                     //console.log(response.status != 200);
                                                     responseStatus = response.status




                                                    // console.log("State in loginscript");
                                                    // console.log(this.state);
                                                     return response.json()
                                                    })
                               .then((responseData) => {
                                                     console.log("responseData :");
                                                     console.log(responseData);

                                                     console.log("PLS PRINT:");
                                                     console.log(responseStatus);
                                                     if(responseStatus == 200){ //proceed to next page
                                                       this.navigatorPush();
                                                     }
                                                     else if(responseStatus != 200){  //re render with error message
                                                       this.setState({

                                                         errorMessage:"Invalid login",
                                                       });
                                                     }
                                                     return responseData;
                                                    })
                                                    .catch((error) => {
                                                    console.warn(error);

                                                  })


                                .done();

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
                    <TouchableHighlight onPress={this.loginScript.bind(this)} style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
                    <Text>{this.state.errorMessage}
                    </Text>
                </View>
            </View>
        );
    }

    onSubmitPressed() {
        this.loginScript(this.state.username, this.state.password);
        console.log("Valid Trans in onSubmitpressed: ")
        console.log(this.state);
      //  if(this.state.validTransition ===1){
      //    this.navigatorPush();
    //    }

        }



    navigatorPush(){

      this.props.navigator.push({
          title: "Secure Page",
          component: SecureView,
          passProps: {username: this.state.username, password: this.state.password},
      });
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
