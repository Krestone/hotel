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

    var usr= 'yunus@nevotek.com';
    var pass='123qweASD';
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
                                                     AsyncStorage.setItem('access_token', token).then((value)=> {

                                                       AsyncStorage.getItem('access_token').then((value) => {

                                                         fetch('http://checkinadvance.com/api/HotelAdmin/GetKey', {
                                                         method: 'GET',
                                                         headers: {
                                                           'Authorization': 'Bearer ' + value,
                                                          }
                                                        })
                                                        .then((response) => response.json())
                                                        .then((responseData) => {
                                                             if(responseData.length>1){
                                                               Actions.pageTwo( {hotels: responseData,});
                                                             }
                                                             else{
                                                               Actions.dashboard( {hotel: responseData[0],
                                                                                    //hideNavBar:true,

                                                                                });

                                                             }

                                                         }).done();
                                                       }).done();
                                                     }).done();

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
exports.getReservationList=function(){
   let key=this.props.hotel
   let URL=config.baseUrl + 'api/HotelAdmin/GetReservations?key=' + key
   AsyncStorage.getItem('access_token').then((value) =>{
     fetch(URL, {
     method: 'GET',
     headers: {
       'Authorization': 'Bearer ' + value
     }
      })
      .then((response) => response.json())
      .then((responseData) => {

        console.log(responseData);
        this.setState({

          dataLoaded:true,
          dataSource: this.state.dataSource.cloneWithRows(responseData),

        });



      }).done();
   })
 }




exports.tester=function(){
//  var REQUEST_URL= 'http://checkinadvance.com/api/HotelAdmin/GetKey';

/*  console.log("Naber");
  //var accessToken=TokenGet();
  let test=TokenGet();
  console.log(test);
*/

  AsyncStorage.getItem('access_token').then((value) => {

    fetch('http://checkinadvance.com/api/HotelAdmin/GetKey', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + value,
     }
   })
   .then((response) => response.json())
   .then((responseData) => {
     console.log(responseData);

     this.setState({
        key: responseData,
        keyLoaded: true,
        dataSource: this.state.dataSource.cloneWithRows(responseData),
      });
    }).done();
  }).done();
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
