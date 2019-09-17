$(function () {
  function buildHTML(message) {
    var content = message.content ? `${message.content}` : "";
    var img = message.image ? `<img class="lower-info__image" src="${message.image}">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-info">
                    <p class="upper-info__user">
                      ${message.user_name}
                    </p>
                    <p class="upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                    <div class="lower-info">
                      <p class="lower-info__content">
                          ${content}
                      </p>
                          ${img}
                    </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
   e.preventDefault();
  //  console.log(this);
   var formData = new FormData(this);
   var url = $(this).attr('action')
   $.ajax({
     url: url,
     type: "POST",
     data: formData,
     dataType: 'json',
     processData: false,
     contentType: false
   })
    .done(function(data){
      // console.log(data)
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
    })
     .fail(function(){
       alert('error');
     });
     return false;
   });
  });