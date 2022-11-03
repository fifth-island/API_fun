// Purpose: as soon as the page is loaaded, the protocols
//          for requesting an API, openning it, and sending it 
//          are performed
//   Notes: - error cases were also included 
function load_animal_API() {
  
  // make instance of request object
  // to make HTTP request after tha page is loaded
  request = new XMLHttpRequest();
  
  // if request is unsuccesful, an alert is sent
  if (!request) {
    {alert("Unable to create HTTPRequest object"); return; }
  };  
  
  // set the URL for the AJAX request to be the JSON file API
  request.open("GET", "https://zoo-animal-api.herokuapp.com/animals/rand", true);

  // set up event handler/callback
  request.onreadystatechange = function() {
    // check for success
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("greetings").innerHTML =
        "Thank you for taking a look in our beloved animals!";
    } else {
        document.getElementById("greetings").innerHTML =
        "Error on accessing API. Reload the page";
    }
  };
  
  // send the request 
  request.send();

}


// Purpose: retrieve elements from the API database, fetching elements
//   Notes: - delegate the action to a helper function (display_animal)
//          - event function -> is activated once the button on HTML is clicked
function output_animal() {

  fetch("https://zoo-animal-api.herokuapp.com/animals/rand")
    .then(response => response.json())
    .then(json => display_animal(json))
    .catch(error => console.log(error));

}

// Purpose: print on specific HTML divs data fetched from the JSON API
function display_animal(struct) {
  $("#animal").html( "<br>" +
  struct["name"])
  $("#animal-origin").html(
    "Now that this " + struct["name"] + " has been rescued," +
    " we will run a careful readaptation process so it can" +
    " be prepared to live in any of its natural habitats:<br><br> "
    + struct["habitat"] + "<br><br>")
  $("#animal-image").html(
    "<img src=\"" 
  + struct["image_link"] + "\" width='200px' /> <br><br>")
}

  
