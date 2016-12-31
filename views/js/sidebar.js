function openSidebar(){
  $("#sidebar").css("width", "250px");
  $("#main_content").css("margin-left", "250px");
  $(".menu").css("margin-left", "250px");
  $("#m").css("margin-left", "250px");
  $(".emojis").css("margin-left", "250px");
  $("#menu_sidebar_icon").removeClass("fa-chevron-right").addClass("fa-chevron-left");
  $(".back").attr("onclick", "closeSidebar()");
}

function closeSidebar(){
  $("#sidebar").css("width", "0px");
  $("#main_content").css("margin-left", "0px");
  $(".menu").css("margin-left", "0px");
  $("#m").css("margin-left", "0px");
  $(".emojis").css("margin-left", "0px");
  $("#menu_sidebar_icon").removeClass("fa-chevron-right").addClass("fa-chevron-left");
  $(".back").attr("onclick", "openSidebar()");
}

$('#saveSettingBtn').click(function(){
  $('#userSettingForm').submit();
  return false;
});

function submitAva(input) {
  input.form.submit();
  if (input.files && input.files[0]) {
    var reader = new FileReader();
      reader.onload = function (e) {
        $('#settingAva')
             .attr('src', e.target.result)
        };
      reader.readAsDataURL(input.files[0]);
    }
  }
