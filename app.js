//jshint esversion:6
// const express=require('express');
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true});

//schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"] // using for more authentication
  },
  rating: {

    type: Number,
    // for validation
    min:1,
    max:10
  },
  review: String
});
const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number, 
  favouriteFruit: fruitSchema // embedding a fruit document in this schema
});

//note: without validation satisfaction by new data the data is not inserted into the DB.

//model
const Fruit = mongoose.model("Fruit", fruitSchema);
const Person=mongoose.model("Person",peopleSchema);

// // objects
// const fruit = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "Pretty solid as a fruit."
// });
// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "The best fruit!"
// });
// const orange = new Fruit({
//   name: "Orange",
//   rating: 4,
//   review: "Too sour for me"
// });
// const banana = new Fruit({
//   name: "Banana",
//   rating: 3,
//   review: "Weird texture"
// });

// // for Person Model
// const person = new Person({
//   name: "John",
//   age: 37
// });

//inserting many at a time
Fruit.insertMany([kiwi, orange, banana])
.then(function(){
  console.log("Successfully saved all the fruits to fruitsDB");
})
.catch(function(){
  console.log(err);
});

// reading Data back
Fruit.find()
.then(function(fruits){
  fruits.forEach(element => {
    console.log(element.name);
  });
  mongoose.connection.close(); // closing the connection after we use the DB
})
.catch(function(fruits){
  console.log(err);
})

// // updating data
// Fruit.updateOne({_id: "5e8e1b9b9e1b9c1e1c8c1c2c"}, {name: "Peach"})
// .then(function(){
//   console.log("Successfully updated the document.");
// })
// .catch(function(err){
//   console.log(err);
// });

// // deleting data
// Fruit.deleteOne({name: "Peach"})
// .then(function(){
//   console.log("Successfully deleted the document.");
// })
// .catch(function(err){
//   console.log(err);
// });

// // deleting many
// Person.deleteMany({name: "John"})
// .then(function(){
//   console.log("Successfully deleted all the documents.");
// })
// .catch(function(err){
//   console.log(err);
// });

console.log("server running at the given PORT")

// Note: order of objects doesnot matter inside Json