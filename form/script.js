$(document).ready(function () {
  //-------------------------------SELECT CASCADING-------------------------//
  let selectedCountry = (selectedRegion = selectedCity = "");
  // This is a demo API key for testing purposes. You should rather request your API key (free) from http://battuta.medunes.net/
  let BATTUTA_KEY = "00000000000000000000000000000000";
  // Populate country select box from battuta API
  url =
    "https://battuta.medunes.net/api/country/all/?key=" +
    BATTUTA_KEY +
    "&callback=?";

  // EXTRACT JSON DATA.
  $.getJSON(url, function (data) {
    console.log(data);
    $.each(data, function (index, value) {
      // APPEND OR INSERT DATA TO SELECT ELEMENT.
      $("#country").append(
        '<option value="' +
          value.name +
          "-" +
          value.code +
          '">' +
          value.name +
          "</option>"
      );
    });
  });
  // Country selected --> update region list .
  $("#country").change(function () {
    selectedCountry = this.options[this.selectedIndex].text;
    countryCode = $("#country").val().split("-")[1];
    // Populate country select box from battuta API
    url = `https://battuta.medunes.net/api/region/ 
      ${countryCode} 
      "/all/?key=" 
      ${BATTUTA_KEY} 
      &callback=?`;
    $.getJSON(url, function (data) {
      $("#region option").remove();
      $("#region").append(
        '<option value="">Please select your region</option>'
      );
      $.each(data, function (index, value) {
        // APPEND OR INSERT DATA TO SELECT ELEMENT.
        $("#region").append(
          '<option value="' + value.region + '">' + value.region + "</option>"
        );
      });
    });
  });
  // Region selected --> updated city list
  $("#region").on("change", function () {
    selectedRegion = this.options[this.selectedIndex].text;
    // Populate country select box from battuta API
    countryCode = $("#country").val().split("-")[1];
    region = $("#region").val();
    url = `https://battuta.medunes.net/api/city/
      ${countryCode} 
      /search/?region=
      ${region} +
      &key=
      ${BATTUTA_KEY} 
      &callback=?`;
    $.getJSON(url, function (data) {
      console.log(data);
      $("#city option").remove();
      $("#city").append('<option value="">Please select your city</option>');
      $.each(data, function (index, value) {
        // APPEND OR INSERT DATA TO SELECT ELEMENT.
        $("#city").append(
          '<option value="' + value.city + '">' + value.city + "</option>"
        );
      });
    });
  });
  // city selected --> update location string
  $("#city").on("change", function () {
    selectedCity = this.options[this.selectedIndex].text;
    $("#location").html(
      "Location: Country: " +
        selectedCountry +
        ", Region: " +
        selectedRegion +
        ", City: " +
        selectedCity
    );
  });
});
