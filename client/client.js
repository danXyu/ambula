if(Meteor.isClient) {
  Meteor.startup(function() {

    filepicker.setKey("AtbKYH0e1SaKhjt2yUq8Nz");
    filepicker.constructWidget(document.getElementById('attachment'));

    var query1 = {
      pickup_address: "20 McAllister St, San Francisco, CA",
      dropoff_address: "101 Market St, San Francisco, CA"
    };

    var query2 = {
      manifest: "a box of kittens",
      pickup_name: "The Warehouse",
      pickup_address: "20 McAllister St, San Francisco, CA",
      pickup_phone_number: "555-555-5555",
      pickup_business_name: "Optional Pickup Business Name, Inc.",
      pickup_notes: "Optional note that this is Invoice #123",
      dropoff_name: "Alice",
      dropoff_address: "101 Market St, San Francisco, CA",
      dropoff_phone_number: "415-555-1234",
      dropoff_business_name: "Optional Dropoff Business Name, Inc.",
      dropoff_notes: "Optional note to ring the bell",
      quote_id: "qUdje83jhdk"
    }

    Meteor.call('getDeliveryQuote', query1, function(err, data) {
      console.log(data);
    });

  });
}