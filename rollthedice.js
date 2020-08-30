/*
acutally: no Class needed
class DiceRoll{
	eye;
	image;

	constructor(eye,image){
		this.eye = eye;
		this.image = image;
	}
}
*/

//Get Players name with Prompt:
/*
var namePlayerOne = prompt('Name Player 1', '');
var namePlayerTwo = prompt('Name Player 2', '');
*/

//just for testing
//Default settings without input
var namePlayerOne = "Player1";
var namePlayerTwo = "Player2";
var amountDices = 4;

//Get number of dices with Prompt:
// catch error for amounts > 25
//var amountDices = prompt('Amount of Dices', '');

var count1 = 0;
var win1 = 0;
var count2 = 0;
var win2 = 0;
var sum1 = 0;
var sum2 = 0;

//give the names to the board
name1 = document.getElementById("p1_name");
name1.innerHTML = namePlayerOne.toUpperCase();

name2 = document.getElementById("p2_name");
name2.innerHTML = namePlayerTwo.toUpperCase();

function startGame() {
  document.getElementById("error").innerHTML = "";
  namePlayerOne = document.forms["input"]["namePlayerOne"].value;
  namePlayerTwo = document.forms["input"]["namePlayerTwo"].value;
  amountDices = document.forms["input"]["amountDices"].value;

  name1 = document.getElementById("p1_name");
  name1.innerHTML = namePlayerOne.toUpperCase();

  name2 = document.getElementById("p2_name");
  name2.innerHTML = namePlayerTwo.toUpperCase();

  amountDices = Number(amountDices);

  error = document.getElementById("error");

  //Board leeren
  output1 = document.getElementById("dice_left");
  output1.innerHTML = "";
  sum1 = document.getElementById("sumPlayerOne");
  sum1.innerHTML = "";
  output2 = document.getElementById("dice_right");
  output2.innerHTML = "";
  sum2 = document.getElementById("sumPlayerTwo");
  sum2.innerHTML = "";

  //Try-Catch-Block for Errorhandling
  try {
    if (amountDices > 25) throw "Max amount: 25 dices! ";
    if (amountDices == "") throw "Please input amount of dices!";
    if (isNaN(amountDices)) throw "Please input a number of dices";
  } catch (err) {
	error.innerHTML = "INPUT ERROR: " + err;
	error.style.backgroundColor = "#633030";
  }

  return false;
}

function randomOneDice() {
  number = Math.floor(Math.random() * 6 + 1);

  //console.log("the random number is " + number);

  return number;
}

function rollDicesPlayerOne() {
  //resetting the html-div
  document.getElementById("dice_left").innerHTML = "";

  sum1 = document.getElementById("sumPlayerOne");
  output1 = document.getElementById("dice_left");

  sum = 0;
  rollArray = [];

  // 1) getting the randomnumbers
  // 2) put them in an array and
  // 3) calculate the sum

  for (i = 0; i < amountDices; i++) {
    roll = Number(randomOneDice());
    //console.log("in the for loop: number is " + roll );

    //var dice = new DiceRoll(roll,"img\\" + (roll+1)+".png");

    rollArray.push(roll);
    //console.log("rollArray: " + rollArray);

    sum += roll;
    //console.log("for: the sum is " + sum);
  }
  //console.log("rollArray draussen: " + rollArray);

  //creation of the instances of DiceRolls
  /*
	DiceRoll_1 = new DiceRoll(rollArray[0],rollArray[0]+1+".png");
	DiceRoll_2 = new DiceRoll(rollArray[1],rollArray[1]+1+".png");
	DiceRoll_3 = new DiceRoll(rollArray[1],rollArray[1]+1+".png");
	*/

  //building the loop for html

  //working version non dynamic for i=3
  //output1.innerHTML = "<div><img src=\"img\\"+rollArray[0]+".png\"></div><div><img src=\"img\\"+rollArray[1] +".png\"></div><div><img src=\"img\\"+rollArray[2]+".png\"></div>";

  //better (and actual easier)
  for (i = 0; i < rollArray.length; i++) {
    output1.innerHTML += '<div><img src="img\\' + rollArray[i] + '.png"></div>';
  }

  sum1.innerHTML = "Sum: " + sum;

  //Feedback
  sum1 = sum;
  count1++;

  if (count2 < count1) {
    output2 = document.getElementById("dice_right");
    output2.innerHTML = "";
    sum2 = document.getElementById("sumPlayerTwo");
    sum2.innerHTML = "";
  }

  //console.log("player one: count of rolling: " + count1);
  giveFeedback();

  return false;
}

function rollDicesPlayerTwo() {
  //analog to rollDicesPlayerOne

  document.getElementById("dice_right").innerHTML = "";

  sum2 = document.getElementById("sumPlayerTwo");
  output2 = document.getElementById("dice_right");

  sum = 0;
  rollArray = [];

  for (i = 0; i < amountDices; i++) {
    roll = Number(randomOneDice());
    rollArray.push(roll);
    sum += roll;
  }
  //console.log("rollArray: " + rollArray);

  for (i = 0; i < rollArray.length; i++) {
    output2.innerHTML += '<div><img src="img\\' + rollArray[i] + '.png"></div>';
  }

  //sum2.innerHTML = sum;
  sum2.innerHTML = `Sum: ${sum}`;

  //Feedback
  sum2 = sum;
  count2++;
  if (count2 > count1) {
    output1 = document.getElementById("dice_left");
    output1.innerHTML = "";
    sum1 = document.getElementById("sumPlayerOne");
    sum1.innerHTML = "";
  }
  //console.log("player two: count of rolling: " + count2);
  giveFeedback();

  return false;
}

function giveFeedback() {
  //console.log("count1: " + count1 + "sum1: " + sum1);
  //console.log("count2: " + count2 + "sum2: " + sum2);

  feedback1 = document.getElementById("feedback1");
  feedback2 = document.getElementById("feedback2");

  if (count1 == count2 && sum1 > sum2) {
    win1++;
    feedback1.innerHTML = "YOU WIN!!";
    feedback2.innerHTML = "YOU LOSE!!";
    feedback1.style.backgroundColor = "green";
    feedback2.style.backgroundColor = "red";
  } else if (count1 == count2 && sum2 > sum1) {
    win2++;
    feedback2.innerHTML = "YOU WIN!!";
    feedback1.innerHTML = "YOU LOSE!!";
    feedback1.style.backgroundColor = "green";
    feedback2.style.backgroundColor = "red";
  } else if (count1 == count2 && sum2 == sum1) {
    feedback2.innerHTML = "DRAW!!";
    feedback1.innerHTML = "DRAW!!";
    feedback1.style.backgroundColor = "blue";
    feedback2.style.backgroundColor = "blue";
  } else {
    feedback2.innerHTML = "";
    feedback1.innerHTML = "";
    feedback1.style.backgroundColor = "orange";
    feedback2.style.backgroundColor = "orange";
  }
}
