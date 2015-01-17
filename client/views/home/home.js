Session.set("widgetSet", false);
var key = "AtbKYH0e1SaKhjt2yUq8Nz";

Template.home.rendered = function () {
  if (!Session.get("widgetSet")) {
    loadPicker(key);
  }
};

Template.home.events({
  "click #attachment": function(event) {
    filepicker.pick();
    console.log("hello");
  }
})