
$(document).ready(function(){
//Connect to Instagram and set base year as 2013
        instagram = {
            clientID: '6bcadf7016694ec7a8da9139c7918c8a',
            apiHost: 'https://api.instagram.com',
            accessToken: '198593368.6bcadf7.052f0401cf9a4baa9752ace8bc6eb50d'
        };
        $('#year').val("2017");

        var min =""
//Function To Pull Data & Display Photos From Instagram
        function loadInstagram(year) {
             console.log(year);
             console.log(instagram.apiHost + "/v1/tags/" + year + "/media/recent");
            //Get Data From Instagram
             $.ajax({
                type: "GET",
                url: instagram.apiHost + "/v1/tags/" + year + "/media/recent",
                // https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN
                // https://api.instagram.com/v1/tags/1978/media/recent
                data: {'access_token': instagram.accessToken, 'scope': 'public_content', 'max_tag_id': min},
                dataType: "jsonp"
            //Display Photos
              }).done(function(photos){
                console.log(photos);
              if(!loadMore)
                    $('#feed').html("");
                for(i=0;i<photos.data.length;i++){
            //Vars that hold api data
                    var img = photos.data[i].images.low_resolution.url;
                    var link = photos.data[i].link;
                    var id= photos.data[i].id;
            //Attach photos to list
                $('#feed').append("<li><a href='"+link+"'><img src='"+img+"'></a></li>");
            //Pagination - Still Need to Get this Working
                $('.paginate').show();
                min = photos.pagination.next_max_tag_id;
                console.log(min);
                }
            })
        }

//Function To Initialize & Set Slider/Year Values
        function createSlider(slider, input) {
           slider.slider({
                        value:2013,
                        min:1913,
                        max:2013,
                        step:1,
                slide: function(event, ui){
                input.val( ui.value )
                },
                stop: function( event, ui ) {
                input.val( ui.value );
                var year =$('#yearSlider').slider("value");
                    loadMore=false;
                loadInstagram(year);
                }
          })
        }
//Function To Run App
        $(function() {
                        createSlider($( "#yearSlider" ), $( "#year" ));
                    });

$('.view-more').click(function(){
  loadMore=true;
  year =$('#yearSlider').slider("value");
  loadInstagram(year);
});

});




