'use strict';

//for autocomplete on datalist if used on not supported browser
$(document).ready(function () {
  var nativedatalist = !!('list' in document.createElement('input')) && !!(document.createElement('datalist') && window.HTMLDataListElement);

  if (!nativedatalist) {
    $('input[list]').each(function () {
      var availableTags = $('#' + $(this).attr("list")).find('option').map(function () {
        return this.value;
      }).get();
      $(this).autocomplete({ source: availableTags });
    });
  }
});

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: function success(result, status, xhr) {

      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });
};

$(document).ready(function () {
  $("#signupForm").on("submit", function (e) {
    e.preventDefault();

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      handleError("All fields are required");
      return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    if ($("#user").val() == '' || $("#pass").val() == '') {
      handleError("Username or password is empty");
      return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });

  $("#pokemonForm").on("submit", function (e) {
    e.preventDefault();

    if ($("#pnameI").val() == '') {
      handleError("All fields are required");
      return false;
    }
    var url = 'https://pokeapi.co/api/v2/pokemon/' + $("#pnameI").val();
    console.log(url);
    //other ajax call
    //need parapeters of the pokemon
    //needs to return number, types, and picture
    var numb = 0;
    var type1 = '';
    var type2 = '';
    var pict = '';

    $.ajax({
      url: url,
      async: false,
      type: "GET",
      dataType: 'json',
      success: function success(result) {
        numb = result.game_indices[0].game_index;
        if ($("#shinyI").val() == "true") {
          pict = result.sprites.front_shiny;
        } else {
          pict = result.sprites.front_default;
        }
        type1 = result.types[0].type.name;
        if (result.types[1].type.name) {
          type2 = result.types[1].type.name;
        } else {
          type2 = 'none';
        }
      }

    });
    console.log(numb + "," + type1 + "," + type2 + "," + pict);
    $("#picture").val(pict);
    $("#num").val(numb);
    $("#type1").val(type1);
    $("#type2").val(type2);

    console.log($("#type1").val());
    sendAjax($("#pokemonForm").attr("action"), $("#pokemonForm").serialize());
    return false;
  });
});
