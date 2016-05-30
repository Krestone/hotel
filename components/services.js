



var loginScript=function(){
  fetch('https://checkinadvance.com/tokenn', {
                              method: 'POST',
                              headers: {
                               'Accept': 'application/json',
                               'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                username: this.state.username,
                                password: this.state.password
                              })
                             })
                             then(function(res) {
      return res.json();
     })
    .then(function(resJson) {
      return resJson;
     })

}
