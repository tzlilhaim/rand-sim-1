// BAD PRACTICE - not proper MVC. Should be separated to files.
const render = function (todos) {
  $("#todos").empty()
    const source = $("#todo-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({todos})
    $("#todos").append(newHTML)
}

const add = function () {
  if ($("#todo-input").val()) {
    $.post("/todo", { text: $("#todo-input").val() }, function (todosArr) {
      render(todosArr.todos)
      $("#todo-input").val("")
    })
  } else {
    alert("Must insert input!!!")
  }
}

$("#todos").on("click", ".fa-check-circle", function () {
  const id = $(this).closest(".todo").data().id
  $.ajax({
    method: "PUT",
    url: "/todo/" + id + "/toggleComplete",
    success: (todosArr) => {
      render(todosArr.todos)
    },
  })
})

$("#todos").on("click", ".fa-trash", function () {
  const id = $(this).closest(".todo").data().id
  $.ajax({
    method: "DELETE",
    url: "/todo/" + id,
    success: (todosArr) => render(todosArr.todos),
  })
})

$("#todos").on("click", ".text", function () {
    const id = $(this).closest(".todo").data().id
  $.ajax({
    method: "PUT",
    url: "/todo/" + id + "/upgradePriority",
    success: (todosArr) => render(todosArr.todos),
  })
})

$.get("/todos", (todosArr) => {
  render(todosArr.todos)
})
