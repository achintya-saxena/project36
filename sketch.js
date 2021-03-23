var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedTime,addFood
//create feed and lastFed variable here
var feed,lastfed;



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

 

  //create feed the dog button here
  feed=createButton("Feed the dog");
  feed.position(800,95);
  feed.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("orange");
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref('feedtime');
  feedTime.on("value",function(data){
    lastfed=data.val();
  })
 
  //write code to display text lastFed time here
  fill("white");
  textSize(20);
  textStyle("bold");
  if(lastfed>=12) {
   text("Last Feed: "+lastfed %12 + "PM",250,30) ;
  }
else if(lastfed===0) {
  text("Last Feed: 12 AM",250,30) ;
}
else{
  text("Last Feed: "+lastfed  + "AM",250,30) ;
}
textSize(30);
textStyle("bold");
text("Virtual Pet Feeding App",430,380);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedtime:hour()
})

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
