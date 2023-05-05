
// Get the current date using Day.js and display it in the header element
var currentDate = dayjs().format("dddd, MMMM D");
$("#currentDay").text(currentDate);

// Generate timeblocks for standard business hours
for (var i = 9; i <= 17; i++) {
  // Create a row element with a unique id and add classes based on the current hour
  var rowEl = $("<div>").addClass("row time-block").attr("id", "hour-" + i);
  if (i < dayjs().hour()) {
    rowEl.addClass("past");
  } else if (i === dayjs().hour()) {
    rowEl.addClass("present");
  } else {
    rowEl.addClass("future");
  }

  // Add the hour, textarea, and save button elements to the row element
  var hourEl = $("<div>").addClass("col-2 col-md-1 hour").text(dayjs(i, "H").format("hA"));
  var textareaEl = $("<textarea>").addClass("col-8 col-md-10 description").val(localStorage.getItem("hour-" + i));
  var saveBtnEl = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
  saveBtnEl.append($("<i>").addClass("fas fa-save"));

  rowEl.append(hourEl, textareaEl, saveBtnEl);
  $(".container-lg").append(rowEl);

  // Add an event listener to the save button element to save the text in local storage
  saveBtnEl.on("click", function() {
    var hour = $(this).parent().attr("id");
    var text = $(this).siblings(".description").val();
    localStorage.setItem(hour, text);
  });
}

// Retrieve saved events from local storage and display them in the corresponding textarea elements
for (var i = 9; i <= 17; i++) {
  var savedText = localStorage.getItem("hour-" + i);
  if (savedText) {
    $("#hour-" + i + " .description").val(savedText);
  }
}


