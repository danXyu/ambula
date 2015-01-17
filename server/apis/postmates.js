/* Postmates API: Used to create prescription and necessities deliveries for the customer. */

// Secrets configuration data for linking with Postmates API.
var BASE_URL = 'https://api.postmates.com'
var CUSTOMER_ID = 'cus_KAaPapYoJR9HYF'
var PRODUCTION_API_KEY = '047f564f-a230-45da-87fd-aa00b7fc7a3c'
var TEST_API_KEY = '36ac1598-0e46-43ef-97f6-93b7efdfb44d'

// Load Future().
Future = Npm.require('fibers/future');

// Various calls against Postmates API.
Meteor.methods({

  /* HTTP POST Request: Interface with API to return a delivery quote. Assigns an auth header with username and
   * password for successful authorization. Returns the callback with result.
   */
  getDeliveryQuote: function(query) {
    var future = new Future();

    // Options to pass to HTTP request.
    var options = {
      auth: TEST_API_KEY + ':',
      params: {
        pickup_address: query.pickup_address,
        dropoff_address: query.dropoff_address
      }
    }

    // HTTP Post Request to return result data.
    HTTP.call('POST', BASE_URL + '/v1/customers/' + CUSTOMER_ID + '/delivery_quotes', options, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        future.return(result);
      }
    });

    return future.wait();
  },


  /* HTTP POST Request: Create a delivery using delivery quote and running post request. Grabs parameters from
   * passed in query data from the client-side's javacsript.
   */
  createDelivery: function(query) {
    var future = new Future();

    // Options to pass to HTTP request.
    var options = {
      auth: TEST_API_KEY + ':',
      params: {
        manifest: query.manifest,
        pickup_name: query.pickup_name,
        pickup_address: query.pickup_address,
        pickup_phone_number: query.pickup_phone_number,
        pickup_business_name: query.pickup_business_name,
        pickup_notes: query.pickup_notes,
        dropoff_name: query.dropoff_name,
        dropoff_address: query.dropoff_address,
        dropoff_phone_number: query.dropoff_phone_number,
        dropoff_business_name: query.dropoff_business_name,
        dropoff_notes: query.dropoff_notes,
        quote_id: query.quote_id
      }
    };

    // HTTP Post Request to return result data.
    HTTP.call('POST', BASE_URL + '/v1/customers/' + CUSTOMER_ID + '/deliveries', options, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        future.return(result);
      }
    });

    return future.wait();
  },


  /* HTTP GET Request: Retrives updated details about a delivery by searching for the delivery object using a
   * delivery_id, which is passed through the query parameter. Details are returned to client through callback.
   */
   getDelivery: function(query) {
    var future = new Future();

    // Create delivery_id to create proper http endpoint.
    var delivery_id = query.delivery_id;

    // HTTP Get Request to return result data.
    HTTP.call("GET", BASE_URL + '/v1/customers/' + CUSTOMER_ID + '/deliveries/' + delivery_id, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        future.return(result);
      }
    });

    return future.wait();
   },


   /* HTTP POST Request: Cancel a delivery using delivery quote and running post request. Grabs delivery_id from
    * passed in query data from the client-side's javacsript.
    */
  cancelDelivery: function(query) {
    var future = new Future();

    // Create delivery_id to create proper http endpoint.
    var delivery_id = query.delivery_id;

    // HTTP Post Request to return result data.
    HTTP.call('POST', BASE_URL + '/v1/customers/' + CUSTOMER_ID + '/deliveries/' + delivery_id + '/cancel', function(error, result) {
      if(error) {
        console.log(error);
      } else {
        future.return(result);
      }
    });

    return future.wait();
  },


  /* HTTP POST Request: Return a delivery using delivery quote and running post request. Grabs delivery_id from
   * passed in query data from the client-side's javacsript.
   */
  returnDelivery: function(query) {
    var future = new Future();

    // Create delivery_id to create proper http endpoint.
    var delivery_id = query.delivery_id;

    // HTTP Post Request to return result data.
    HTTP.call('POST', BASE_URL + '/v1/customers/' + CUSTOMER_ID + '/deliveries/' + delivery_id + '/return', function(error, result) {
      if(error) {
        console.log("error occured :" + error);
      } else {
        future.return(result);
      }
    });

    return future.wait();
  }
});