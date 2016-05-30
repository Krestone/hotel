import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  Linking,
  TextInput
} from 'react-native';

import { Actions } from 'react-native-router-flux';


exports.loginScript=function(){

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

                                                   return response.json()
                                                  })
                             .then((responseData) => {
                                                   console.log("responseData :");
                                                   console.log(responseData);

                                                   console.log("PLS PRINT:");
                                                   console.log(responseStatus);
                                                   if(responseStatus == 200){ //proceed to next page
                                                     Actions.pageTwo();
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

                                                }).done();

}
