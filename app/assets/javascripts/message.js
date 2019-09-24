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
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id"); 
    var urlRegex = new RegExp("groups/\[0-9]{1,}/messages")
  var currentUrl = location.pathname
  if( urlRegex.test(currentUrl) ) {
    $.ajax({
      type: 'get',
      url: './api/messages',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
      });
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('error');
    });
  }
  };
  setInterval(reloadMessages, 3000);
});
