var Orders = new Mongo.Collection('orders');

Schemas = {}
Schemas.Order = new SimpleSchema({
  orderID: {
    type: String,
    label: "ID for order identification"
  }
})