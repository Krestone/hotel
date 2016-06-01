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
  TextInput,
  AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import LocalDb from './LocalDatabase.js'


var config = {
		//baseUrl: "https://checkinadvance.com/",
		baseUrl: "http://checkinadvance.com/",
		remoteDataUrl: "/",
		cache: false,
		timeout: 100000,
  };

async function TokenGet(){
     var token = await AsyncStorage.getItem('access_token');
     return token;
  }
exports.login=function(){

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
                              timeout: config.timeout,
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
                             .then((responseData) => {//responsedATA = RESPONSE.json()
                                                   console.log("responseData :");
                                                   console.log(responseData);

                                                   console.log("PLS PRINT:");
                                                   console.log(responseStatus);
                                                   if(responseStatus == 200){ //proceed to next page
                                                     var token= responseData.access_token;
                                                     console.log("Token");
                                                     console.log(token);
                                                     LocalDb.storeToken(token);
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



exports.tester=function(){
  let REQUEST_URL= config.baseUrl + 'api/HotelAdmin/GetKey';

  console.log("Naber");
  var accessToken=TokenGet();
  accessToken.then((value) => {

    fetch(REQUEST_URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + value,
     }
   }).then((response) => {return response.json()}  ).then((responseData) => {return(responseData)}).done();



  });



}

exports.GetKey=function(){
 var accessToken=TokenGet();
 console.log('Token from TokenGet');
 console.log(accessToken)


//  LocalDb.getAccessToken();//sets token to state
//  var accessToken=this.state.token;
/*  REQUEST_URL='http://checkinadvance.com/api/HotelAdmin/GetKey';
  fetch(REQUEST_URL, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + accessToken,
  }}).then((response) =>
   {
     this.setState({ //Dont forget to bind 'this' to LocalDb.getAccessToken in react constructor!! ORNEK :this.serviceMethod= HotelAdminService.serviceMethod.(this); AND LocalDb.getAccessToken=LocalDb.getAccessToken.bind(this);
       //token: value,
       dataLoaded:true,
     });

   }).done();*/
}
















/*

}}).then((response) =>

 return response.json())
.then((responseData) => {
  console.log(responseData);
  this.setState({
  //  dataSource: this.state.dataSource.cloneWithRows(responseData),
    dataLoaded:true,
  });
})
.done();
}*/
