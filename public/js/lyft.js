var clientId = 'ydgWzNZ4qVrS';
var clientSecret = '04gYKvHBfWi_HS7uuiERZqBiH9V_YWBd';

$.ajax({
  url: 'https://api.lyft.com/oauth/token',
  type: 'POST',
  data: {
    grant_type: 'client_credentials',
    scope: 'public'
  },
  beforeSend: function (xhr) {
    xhr.setRequestHeader ("Authorization", "Basic " + btoa(clientId+":"+clientSecret));
  },
  success: function(response) {
    console.log(response);
  },
  error: function(error) {
    console.log(error);
  }
});