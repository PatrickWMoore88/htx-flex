$(document).ready(function() {
  requestAllTodo();

  function requestAllTodo() {
    $.get("/todo", function(data) {
      $("#todoList").html(renderTodo(data));
    });
  }
  function renderTodo(data) {
    let html = "<ol>";
    data.forEach(element => {
      html += `<li>${element.todo} <button class="delete-item" onclick="deleteButton(${element.id})" todoId="${element.id}">Remove Item</button></li>`;
    });
    html += "</ol>";
    return html;
  }

  $("#addTodo").click(function() {
    let text = $("#newTodo").val();
    if (text == "") {
      alert("Please type in a task.");
      return;
    }

    text = text.split("\n");
    text.forEach(element => {
      $.post("/todo", { todo: element });
    });
    requestAllTodo();
    $("newTodo").val("");
  });
});

function deleteButton(id) {
  console.log(id);
  $.ajax({
    url: "/todo/" + id,
    type: "Delete",
    success: function() {
      console.log("successful");
    }
  });
}
