$(document).ready(function() {
    console.log("ready");
    
        $("#submit").on("click", function(event) {
            event.preventDefault();
            Initialize();
            
            var city = $("#location-input").val().trim();
            var foodCat = $("#food-input").val().trim();
            var apiKEY = "WXvXh_2X02Ed3bRqbc0N4e0xnIKUP1zNlEwQgMHXlZw60jRCNGjxavi8ID5P9eaDDeC3y2TXKYoDlsLSfdmi4mCWn5LbNqpXMA7qNwrlv9Fq1tbIE7SRQ0kdSzmdW3Yx";
            if (city === "") {
                
            }
            
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + city + "&limit=10&categories=" + foodCat + "&sort_by=rating",
                success: function(data, status) {
                    console.log(data.businesses.length);
                    for (var i = 0; i < data.businesses.length; i++) {
                        //company name, rating, address
                        var compName = data.businesses[i].name;
                        var compRating = data.businesses[i].rating;
                        var compAddress = data.businesses[i].location.display_address;
                        
    
                        $("#api-results").append("<p>" + compName + "<br>" + compRating + "<br>" + compAddress + "</p>" + "<br>");
                        console.log("The returned data", data);
                    //company name, rating, address
                    };
                    
                },
                beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + apiKEY); }
               
            });

            var foodSearch = $("#food-input").val().replace(" ", "-").trim();
            var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+foodSearch;
            console.log(queryURL);
        
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
                var gifImage = $("<img>");
        
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