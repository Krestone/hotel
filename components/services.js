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


exports.handleErrors=function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    }


async function TokenGet(){
     var token = await AsyncStorage.getItem('access_token');
     return token;
}
//date i requeste uygun formata sokuyor
exports.getNowInFormat=function(newDate){
  let now=newDate;
  let year=now.getFullYear();
  let month=now.getMonth()+1; // Ocak=0 Aralik=11
  let day=now.getDate();
 //rakam basina 0
  if(day<10){
    day="0"+day;
  }
  if(month<10){
    month="0"+month;
  }
  return date= month + "/" +day +"/"+year;
}
exports.login=function(){

    var usr= 'yasemincidem@gmail.com';
    var pass='yasemin1991';
    this.setState({
      loading:true,
    })
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
                                                  this.setState({
                                                    errorMessage:'Logging In...'
                                                  });
                                                   responseStatus = response.status

                                                   return response.json()
                                                  })
                             .then((responseData) => {//responsedATA = RESPONSE.json()

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
                                                               Actions.dashboard( {hotel: responseData[0],});
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

        //console.log(responseData);
        this.setState({
          rawData:responseData,
          dataLoaded:true,
          dataSource: this.state.dataSource.cloneWithRows(responseData),

        });



      }).done();
   })
 }

//number of current guests in hotel
 exports.getGuestStats=function(start,end){


   let key=this.props.hotel
   let URL='http://checkinadvance.com/Statistics/GetGuests'
   let params={
     start:start,
     end:end,
     type:key,
   };

   //encode body into form urlencoded
   let data = "";
   for (var k in params) {
       data += k + "=" + params[k] + "&"
   }

   console.log("Guest Stats: Before reacging AsyncStorage");
   AsyncStorage.getItem('access_token').then((value) =>{
     console.log("Guest Stats: got token, sending request...");

     fetch(URL, {
      method: 'POST',
      cache: false,
      headers: {
        'Authorization': 'Bearer ' + value,
         'Content-Type': 'application/x-www-form-urlencoded',
         'Accept': 'application/json',

      },
      body: data
     })
     .then((response) => {
        console.log("Guest Stats: got response");
        return response.json()
     })
     .then((responseData)=>{
    //   console.log("ResponseData in stats")
    //   console.log(responseData);
      // console.log(responseData[0]["Y"]);
         console.log('Guest Stats: got responseData');
         console.log(responseData);
       this.setState({
         guestStats:responseData,
         guestStatsLoaded:true,
       });
       console.log("Guest Stats: set state done");





     });


 }).done()
 }

 exports.getReservationStats=function(start,end){

   let key=this.props.hotel
   let URL='http://checkinadvance.com/Statistics/GetReservationsBetweenDatesByKeys'
   let params={
     start:start,
     end:end,
     type:key,
   };

   //encode body into form urlencoded
   let data = "";
   for (var k in params) {
       data += k + "=" + params[k] + "&"
   }
   //chain htto requesrs to get all stats
   console.log("Reservation Stats: reaching token")
   AsyncStorage.getItem('access_token').then((value) =>{
     console.log("Reservation Stats: got token, sending request...");
     fetch(URL, {
      method: 'POST',
      cache: false,
      headers: {
        'Authorization': 'Bearer ' + value,
         'Content-Type': 'application/x-www-form-urlencoded',
      //   'Accept': 'application/json',

      },
      body: data
     })
     .then((response) => {

        console.log(response);
        return response.json()
     })
     .then((responseData)=>{
        console.log('Reservation Stats: got responseData');
        //console.log(responseData);

        this.setState({
         reservationStats:responseData,
         reservationStatsLoaded:true
       });
       console.log("Reservation Stats: changed state");


   }).done();
 }).done()
 }

 exports.getOccupiedItems=function(start,end){


   let key=this.props.hotel
   let URL='http://checkinadvance.com/Statistics/GetOccupiedItems'
   let params={
     start:start,
     end:end,
     type:key,
   };

   //encode body into form urlencoded
   let data = "";
   for (var k in params) {
       data += k + "=" + params[k] + "&"
   }
   //chain htto requesrs to get all stats
   console.log("Occup Stats: reaching token...")
   AsyncStorage.getItem('access_token').then((value) =>{
     console.log("Occup Stats: got token, sending request...");
     fetch(URL, {
      method: 'POST',
      cache: false,
      headers: {
        'Authorization': 'Bearer ' + value,
         'Content-Type': 'application/x-www-form-urlencoded',
         'Accept': 'application/json',

      },
      body: data
     })
     .then((response) => {

        console.log(response);
        return response.json()
     })
     .then((responseData)=>{
       console.log("Occup stats: got responseData");
       console.log(responseData);
       this.setState({
         occupiedStats:responseData,
         occupiedLoaded:true
       });
       console.log("Occup stats: changed state")

   });
 }).done()
}

exports.getAvailableItems=function(start,end){

  let key=this.props.hotel
  let URL='http://checkinadvance.com/Statistics/GetAvailableItems'
  let params={
    start:start,
    end:end,
    type:key,
  };

  //encode body into form urlencoded
  let data = "";
  for (var k in params) {
      data += k + "=" + params[k] + "&"
  }
  //chain htto requesrs to get all stats
  AsyncStorage.getItem('access_token').then((value) =>{

    fetch(URL, {
     method: 'POST',
     cache: false,
     headers: {
       'Authorization': 'Bearer ' + value,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',

     },
     body: data
    })
    .then((response) => {

       console.log(response);
       return response.json()
    })
    .then((responseData)=>{
      console.log(responseData);
      console.log(responseData.length)
      this.setState({
        availableStats:responseData,
        availableLoaded:true
      });

  });
})
}

 exports.getLogins=function(start, end){

  let key=this.props.hotel
  let URL='http://checkinadvance.com/Statistics/GetLogins'
  let params={
    start:start,
    end:end,
    type:key,
  };

  //encode body into form urlencoded
  let data = "";
  for (var k in params) {
      data += k + "=" + params[k] + "&"
  }
  //chain htto requesrs to get all stats
  console.log("Login Stats: reaching token...")
  AsyncStorage.getItem('access_token').then((value) =>{
    console.log("Login Stats: got token, fetching data...")
    fetch(URL, {
     method: 'POST',
     cache: false,
     headers: {
       'Authorization': 'Bearer ' + value,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',

     },
     body: data
    })
    .then((response) => {

       console.log(response);
       return response.json()
    })
    .then((responseData)=>{
      console.log("Login Stats: got response");
      console.log(responseData);
      console.log(responseData.length)
      this.setState({
        loginStats:responseData,
        loginsLoaded:true
      });
      console.log("Login Stats: changed state");

  });
})
}






 exports.getGuestList=function(){

    let key=this.props.hotel
    let URL=config.baseUrl + 'api/HotelAdmin/GetGuests?key=' + key
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
           rawData:responseData,
           dataLoaded:true,
           dataSource: this.state.dataSource.cloneWithRows(responseData),

         });
         console.log("after guest list set state");
       }).done();
    })
  }





exports.tester=function(){

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
