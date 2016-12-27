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
