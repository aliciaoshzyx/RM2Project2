//for autocomplete on datalist if used on not supported browser
$(document).ready(function () {
  var nativedatalist = !!('list' in document.createElement('input')) && 
    !!(document.createElement('datalist') && window.HTMLDataListElement);

  if (!nativedatalist) {
    $('input[list]').each(function () {
      var availableTags = $('#' + $(this).attr("list")).find('option').map(function () {
        return this.value;
      }).get();
      $(this).autocomplete({ source: availableTags });
    });
  }
});

const handleError = (message) => {
  $("#errorMessage").text(message);
}

const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: (result, status, xhr) => {

      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });        
}

$(document).ready(() => {
  $("#passChangeForm").on("submit", (e) => {
    e.preventDefault();

    sendAjax($("#passChangeForm").attr("action"), $("#passChangeForm").serialize());
    $("#errorMessage").val("PasswordChanged");
  });

  $("#signupForm").on("submit", (e) => {
    e.preventDefault();


    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      handleError("All fields are required");
      return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;           
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });

  $("#loginForm").on("submit", (e) => {
    e.preventDefault();


    if($("#user").val() == '' || $("#pass").val() == '') {
      handleError("Username or password is empty");
      return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });
  
  $("#pokemonForm").on("submit", (e) => {
    e.preventDefault();

    if($("#pnameI").val() == '' || $("#dateCaughtI").val() == ''||
       $("#shinyI").val() == '' || $("#combatPowerI").val() == '' ||
       $("#heightI").val() == '' || $("#weightI").val() == ''||
       $("#genderI").val() == '' || $("#quickAI").val() == '' ||
       $("#chargedAI").val() == '' || $("#ivI").val() == '') {
      handleError("All fields are required");
      return false;
    } 
     let url = 'https://pokeapi.co/api/v2/pokemon/' + $("#pnameI").val();
     
     let url2 = 'https://www.pokemon.com/us/api/pokedex/kalos'; 
     //other ajax call
     //need parapeters of the pokemon
     //needs to return number, types, and picture
     let numb = 0;
     let type1 = '';
     let type2 = '';
     let pict = 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/';
    
    if($("#pnameI").val() == "meltan"){
      numb = 808;
      type1 = "steel";
      type2 = "none";
    } else if ( $("#pnameI").val() == "melmetal"){
      numb = 809;
      type1 = "steel";
      type2 = "none";
    } else {
    $.ajax({ 
         url: url, 
         async: false,
         type: "GET",
         dataType: 'json',
         success:(result) => {
              numb = result.game_indices[0].game_index;
              //shiny pictures?
              //if($("#shinyI").val() == "true"){
              //  pict = result.sprites.front_shiny;
              //  } else { pict = result.sprites.front_default;}
              type1 = result.types[0].type.name;
              if(result.types[1]){
                type2 = result.types[1].type.name;
              } else { type2 = 'none';}
            }

            
        });
      }
      //adding a query makes it so the link doesnt break when something adds a /
      if(numb>0 && numb <10){
        pict = pict + "00" + numb + ".png?width=360";
      } else if (numb >10 && numb < 100){
        pict = pict + "0" + numb + ".png?width=360";
      } else {
        pict = pict + numb + ".png?width=360";
      }

      
      console.log(numb + "," + type1 + "," + type2 + "," + pict);
      $("#picture").val(pict);
      console.log( $("#picture").val());
      $("#num").val(numb);
      $("#type1").val(type1);
      $("#type2").val(type2);

     sendAjax($("#pokemonForm").attr("action"), $("#pokemonForm").serialize());
     console.log( $("#picture").val());
     return false;
   });
});