import React, { Component } from 'react';


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Image,
  DatePickerAndroid,
  AsyncStorage,
  Picker,
} from 'react-native';

var ProgressBar = require('ProgressBarAndroid');
import { Actions } from 'react-native-router-flux';
var HotelAdminService = require('./services.js');
import Chart from 'react-native-chart';
var bgImage= require('./images/statbg.png');

class AvailableGraph extends Component{
  constructor(props){
    super(props)
    let initNow= new Date();
    this.props.initNow = HotelAdminService.getNowInFormat(initNow); //format date

    this.state={
      moment1:this.props.initNow,
      moment2:this.props.initNow,
      presetDate: new Date(2020, 4, 5),
      dataLoaded:false,
      language:'',
    };
    this.getAvailableItems=HotelAdminService.getAvailableItems.bind(this);
  }

  getData(date, date_end){
    AsyncStorage.getItem('access_token').then((token)=>{
    switch(this.state.stat){
      case 'availableStats':
         HotelAdminService.getAvailableItems.bind(this)(date, date_end, token );

      case 'occupiedStats':
          HotelAdminService.getOccupiedItems.bind(this)(date, date_end, token );

    }
  }).done();

  }



  render(){
    const data=[
      [2,3],
      [5,6],
      [7,7],
      [7,7],
      [7,7],
      [7,9],
      [7,13],
      [7,7],
      [7,15],
    ]
    console.log(this.state);



    return(
      <View style={styles.container}>

        <View>
        <Picker
        selectedValue={this.state.stat}
        onValueChange={(stat) => this.setState({stat: stat, selected:true})}
        mode='dropdown'>
        <Picker.Item label="Availability" value="availableStats" />
        <Picker.Item label="Occupancy" value="occupiedStats" />
        <Picker.Item label="Emails" value="emailStats" />
        <Picker.Item label="Pictures" value="pictureStats" />
        <Picker.Item label="Logins" value="loginStats" />
        </Picker>

        <View style={styles.header}>
         <Text>Select Dates:</Text>
         <TouchableHighlight  onPress={ ()=>this.showPicker1({date: this.state.presetDate}) }>
            <Text>{this.state.moment1}</Text>
         </TouchableHighlight>
         <TouchableHighlight onPress={ ()=>this.showPicker2({date: this.state.presetDate}) }>
            <Text>{this.state.moment2}</Text>
         </TouchableHighlight>
         <TouchableHighlight onPress={()=>this.clickedOK()}>
            <Text>OK</Text>
         </TouchableHighlight>

        </View>


        </View>

        <Chart
                    style={styles.chart}
                    data={data}
                    type="bar"
                    color='black'
                    lineWidth={5}
                    showDataPoint={true}

                 />



      </View>

    )
  }
  async showPicker1(changedState,options) {
    console.log("date launched");
    let newDate="";
    try {

    const {action, year, month, day} = await DatePickerAndroid.open(options);
    if (action === DatePickerAndroid.dismissedAction) {
      console.log("Dismissed")
      newDate=this.state.moment1;
    } else {
      var date = new Date(year, month, day);
      //newState[stateKey + 'Text'] = date.toLocaleDateString();
      newDate= HotelAdminService.getNowInFormat(date);
    }
    this.setState({moment1: newDate});
  } catch ({code, message}) {
    console.warn('Error in example', message);
  }
}

async showPicker2(changedState,options) {
  let newDate="";
  console.log("date launched");
  try {

  const {action, year, month, day} = await DatePickerAndroid.open(options);
  if (action === DatePickerAndroid.dismissedAction) {
    console.log("Dismissed")
    newDate=this.state.moment2;
  } else {
    var date = new Date(year, month, day);
    newDate= HotelAdminService.getNowInFormat(date);
  }
  this.setState({moment2: newDate});
} catch ({code, message}) {
  console.warn('Error in example', message);
}
}

clickedOK(){
  let date1=this.state.moment1;
  let date2=this.state.moment2;
  //ikinci arguman callback
  this.setState(
    {dataLoaded:false,} ,this.getData.bind(this)(date1,date2)

  )
}









}

var styles = StyleSheet.create({
  container: {
      flex:1,
     backgroundColor: '#F5FCFF',
      marginTop: 56,
      alignItems:'stretch',
      justifyContent:'space-between',
  },
  header:{
    backgroundColor: '#F5FCFF',
    flex:2,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:15
  },
  backgroundImage: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    width:null,
    height:null,
},
chart: {
     width: 600,
     height: 500,
     alignItems:'center',
     marginBottom:70

   },
   chartContainer: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'white',
   },




});


module.exports = AvailableGraph;
