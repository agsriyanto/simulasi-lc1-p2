const baseUrl = 'http://localhost:3000'

function auth() {
  if(!localStorage.getItem("access_token")){
    $("#login-page").show()
    $("#main-page").hide()
    $("#home-page").hide()
    $("#my-gallery-page").hide()
  } else {
    $("#login-page").hide()
    $("#main-page").show()
    $("#home-page").show()
    $("#my-gallery-page").show()
  }
}

function login() {
  const email = $("#email").val()
  const password = $("#password").val()
  
  $.ajax({
    url: baseUrl + "/login",
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(respond => {
      localStorage.setItem("access_token", respond.access_token)
      auth()
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
    .always(_ => {
      $("#email").val("")
      $("#password").val("")
    })
}

function logout() {
  localStorage.removeItem("access_token")
  auth()
}

function getPhotos() {
  const acc_tojke
}

$(document).ready(() => {
  auth()

  $("#logout").on("click", (e) => {
    e.preventDefault()
    logout()
  })

  $('#login-page form').on("submit", (e) => {
    e.preventDefault()
    login()
  })
} )