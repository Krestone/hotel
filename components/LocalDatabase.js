import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  } from 'react-native';


  exports.storeToken=function(token){
   AsyncStorage.setItem('access_token', token);
  }

  exports.getAccessToken=function(){

    AsyncStorage.getItem('access_token')
    .then((value) => {
           if(value) {
             this.setState({ //Dont forget to bind 'this' to LocalDb.getAccessToken in react constructor!! ORNEK :this.serviceMethod= HotelAdminService.serviceMethod.(this); AND LocalDb.getAccessToken=LocalDb.getAccessToken.bind(this);
               token: value,
             });

        }
      })
    .done();
  }
