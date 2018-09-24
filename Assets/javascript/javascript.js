$(document).ready(function() {
    console.log("ready");
    
        $("#submit").on("click", function(event) {
            event.preventDefault();
            Initialize();
            document.getElementById("totalBody").style.visibility = "visible";
            
            var city = $("#location-input").val().trim();
            var foodCat = $("#food-input").val().trim();
            var apiKEY = "WXvXh_2X02Ed3bRqbc0N4e0xnIKUP1zNlEwQgMHXlZw60jRCNGjxavi8ID5P9eaDDeC3y2TXKYoDlsLSfdmi4mCWn5LbNqpXMA7qNwrlv9Fq1tbIE7SRQ0kdSzmdW3Yx";
           
                
            
            if (city === "" || foodCat === "" || foodSearch === "") {
                var modal = document.getElementById('myModal');

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // When the user clicks the button, open the modal 
                    modal.style.display = "block";
                    
                

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            }
            
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + city + "&limit=10&categories=" + foodCat + "&sort_by=rating",
                success: function(data, status) {
                    console.log(data.businesses.length);
                    var compLength = data.businesses.length;
                    for (var i = 0; i < data.businesses.length; i++) {
                        //company name, rating, address
                        var compName = data.businesses[i].name;
                        var compRating = data.businesses[i].rating;
                        var compAddress = data.businesses[i].location.display_address;
                        var reviewCount = data.businesses[i].review_count;
                        
    
                        // $("#api-results").append("<p>" + compName + "<br>" + compRating + "<br>" + compAddress + "</p>" + "<br>");
                        
                        // $("#api-results").append("<p>" + compName + "<br>Rating: " + compRating + " Stars<br>" + compAddress + "</p>");

                        // $("#api-results").append(`<p> ${compName} `\n` Rating: ${compRating} `\n` ${compAddress} </p>`); 

                        // concatenating the results into one line
                        $("#api-results").append(`<p> ${compName} | Rating: ${compRating} | Review Count: ${reviewCount} | ${compAddress} </p>`); 

                    };
                    console.log("The returned data", data);
                    if (compLength === 0) {
                        var modal = document.getElementById('theModal');

                        // Get the <span> element that closes the modal
                        var span = document.getElementsByClassName("close")[0];

                        // When the user clicks the button, open the modal 
                            modal.style.display = "block";
                            
                        

                        // When the user clicks on <span> (x), close the modal
                        span.onclick = function() {
                            modal.style.display = "none";
                        }

                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }
                    }

                },
                beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + apiKEY); }
               
            });

            var foodSearch = $("#food-input").val().replace(" ", "-").trim();
            var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg-13&tag="+foodSearch;
        
            // Perfoming an AJAX GET request to our queryURL
            $.ajax({
              url: queryURL,
              method: "GET"
            })
        
            // After the data from the AJAX request comes back
              .then(function(response) {
        
              // Saving the image_original_url property
              console.log(response);
                var imageUrl = response.data.images.fixed_height.url;
        
                // Creating and storing an image tag
                var gifImage = $("<img style= width:250px; height:250px>");
        
                // Setting the gifImage src attribute to imageUrl
                gifImage.attr("src", imageUrl);
                gifImage.attr("alt", "Gif Image");
        
                // Attaching the gifImage to the gifImages div
                $("#gifResults").html(gifImage);
              });


           
        });

        // Mani's code begins here!

        

          function Initialize() {
              $("#gifResults").empty();
              $("#api-results").empty();
          };

          


         
        });


          function Initialize() {
            $("#gifResults").empty();
            $("#api-results").empty();
        }



    
    
   