$('.dropdown').dropdown({
    transition: 'fade down'
});

$("#logout").on("click", () => {
    $.get("/logout", () => {
        return;
    })
});

//---- Delete Specialist ----//
function deleteSpecialist(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    console.log($(this).data("id"))
    $.ajax({
        method: "DELETE",
        url: "/specialists/delete/" + id
    }).done(function(result) {
        console.log(result);
        window.location.href = result.url;
    });
}

function deleteTask(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    console.log($(this).data("id"))
    $.ajax({
        method: "DELETE",
        url: "/tasks/delete/" + id
    }).done(function(result) {
        console.log(result);
        window.location.href = result.url;
    });
}
$(document).on("click", ".minus.icon", deleteSpecialist);
$(document).on("click", "input[type='checkbox']", deleteTask);
$(document).on("click", "i.add.circle.icon", function() {
    $('.ui.modal').modal('show', {
        onApprove: function() {
            return false;
        }
    });
});

function hideModal() {
    $('.ui.modal').modal('hide');
}

$(document).on("click", "#cancel-modal", hideModal);