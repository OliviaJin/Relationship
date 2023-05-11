//Creating all the variables and arrays for the personality quiz
var grammar, lines, json, result; 
var questionState = 0;	//Keeps track of users place in quiz
var quizActive = true;	//True until the last question is answered
var userStats = [
	0,	//Personality descriptions to come soon (profile descriptions)
	0, 
	0, 
	0, 	
	0, 	
	0, 
	0, 	
	0,
];

var startStats = userStats; //Holds the increasing values in userStats relating to user selection
var questionText = [
	"How often do you contact with your parents?", //q1
	"Who usually opens the communication first?", //q2
	"Who usually talks more?",  //q3
	"How long is each contact?", //q4
	"Type of contact:", //q5
	"Contact content:", //q6
	"Choose parent attitude toward you:", //q7
	"Choose you feeling after each conversation: ", //q8
];

var answerText = [		
    //question 1 answers													
	[   "Daily",
		"Weekly",
		"Monthly",
		"Rarely talk"],

	//question 2 answers
	["yourself",
		"Mother.",
		"Father.",
		"Random" ],

	//question 3 answers
	["yourself",
		"Mother.",
		"Father.",
		"Random"],

	//question 4 answers
	["A few minute",
		"Half an hour",
		"An hour",
		"A few hours"],
	
	//question 5 answers
	["Text",
		"Call",
		"Photo",
		"Video"],

	//question 6 answers
		["Superficial",
		"Middel",
		"Meaningful",
		"Deep"],

	//question 7 answers
        ["Support",
        "Respect",
        "Controlling",
        "Disregard"],

	//question 8 answers
        ["Supported",
        "Released",
        "Stressful",
        "Angry"],
];

var answerValues = [
	//question 1 answer values
	[[1, 0, 0, 1, 1, 0, 0, 1],
	[0, 1, 1, 0, 0, 2, 0, 1],
	[2, 1, 1, 0, 1, 0, 1, 0],
	[1, 0, 0, 1, 0, 1, 0, 1],
	],

	//question 2 answer values
	[[1, 0, 1, 1, 1, 0, 1, 1],
	[0, 2, 1, 0, 0, 1, 1, 0],
	[1, 0, 0, 1, 1, 1, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
	],

	//question 3 answer values
	[[1, 0, 2, 0, 1, 0, 1, 1],
	[0, 2, 0, 1, 1, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1],
	[0, 1, 0, 1, 0, 0, 1, 1],
	],

	//question 4 answer values
	[[1, 1, 0, 0, 1, 1, 0, 2],
	[1, 1, 0, 2, 1, 0, 0, 1],
	[1, 0, 0, 1, 2, 0, 0, 1],
	[0, 0, 1, 0, 1, 1, 1, 0],
	],

	//question 5 answer values
	[[2,0,1,1,1,0,1,1],
	[0,1,1,0,1,0,1,0],
	[1,1,2,0,1,0,1,0],
	[0,1,0,2,1,1,0,1],
	],

	//question 6 answer values
	[[1,0,1,0,1,0,1,0],
	[1,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,0,1],
	[0,1,0,1,0,1,0,1],
	],

	//question 7 answer values
	[[1,0,1,1,1,1,1,0],
	[1,1,1,1,1,1,1,1],
	[0,1,0,1,1,1,0,1],
	[1,1,2,1,1,1,1,1],
	],

	//question 8 answer values
	[[0,0,0,0,0,0,0,0],
	[1,0,1,0,0,1,0,1],
	[1,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,0,1],
	],
];

var results = document.getElementById("results");
var resultPlural = document.getElementById("plural");
var quiz = document.getElementById("quiz");
var printResult = document.getElementById("topScore");
var printDescription = document.getElementById("description");
var printDescription2 = document.getElementById("description2");
var printBotanical = document.getElementById("botanical");
var buttonElement = document.getElementById("button");
var theme = document.getElementsByTagName('link')[0];
var printLines = document.getElementById("gen");

buttonElement.addEventListener("click", changeState);

//This function progresses the user through the quiz

function changeState() {

	updatePersonality(); 	//Adds the values of the startStats to the userStats	
	swapCSS("quiz.css");									
	
	if (quizActive) {
		initText(questionState);	//sets up next question based on user's progress through quiz
		questionState++;			//advances progress through quiz
		buttonElement.disabled = true; //disables button until user chooses next answer
		buttonElement.innerHTML = "Please select an answer";
		buttonElement.style.opacity = 0.8;

	} else {
		/*All questions answered*/

		setResultPage(); //runs set up for result page
	}
};

//This function determines the question and answer content based on user progress through the quiz

function initText(question) {

	var answerSelection = "";
	for (i = 0; i < answerText[question].length; i++) {

		answerSelection += "<li><input type='radio' name='question" +
			(question + 1) + "' onClick='setAnswer(" + i + ")' id='" + answerText[question][i] + "'><label for='" + answerText[question][i] + "'>" + answerText[question][i] + "</label></li>";
	}

	document.getElementById("questions").innerHTML = questionText[question];	//set question text
	document.getElementById("answers").innerHTML = answerSelection;				//set answer text
};

//This function is called when a user selects an answer, NOT when answer is submitted

function setAnswer(input) {

	clearStartStats();	//clear startStats in case user reselects their answer
	
	startStats = answerValues[questionState - 1][input];	//selects personality values based on user selection 

	if (questionState < questionText.length) {
		/*User has not reached the end of the quiz */

		buttonElement.innerHTML = "Continue";
		buttonElement.disabled = false;
		buttonElement.style.opacity = 1;

	} else {
		/*All questions answered*/

		quizActive = false;
		buttonElement.innerHTML = "RESULTS"
		buttonElement.disabled = false;
		buttonElement.style.opacity = 1;
	}
};

function clearStartStats() {
	startStats = [0, 0, 0, 0, 0, 0, 0, 0];
};

//This function adds the values of the startStats to the userStats based on user selection 

function updatePersonality() {

	for (i = 0; i < userStats.length; i++) {
		userStats[i] += startStats[i];
	}
};

function swapCSS(value) {
	var sheets = document.getElementsByTagName('link');

	sheets[0].href = value;
}

//This function determines the highest personality value

function setResultPage() {

	var highestStatPosition = 0;	//highest stat defaults as 'bamboo'

	//This statement loops through all personality stats and updates highestStatPosition based on a highest stat 

	for (i = 1; i < userStats.length; i++) {

		if (userStats[i] > userStats[highestStatPosition]) {
			highestStatPosition = i;
		}
	}

	displayResults(highestStatPosition); //passes the index value of the highest stat discovered

	/* Hides the quiz content, shows results content */
	quiz.style.display = "none";

}


function displayResults(personality) {
	switch (personality) {

		case 0:	//type1 code
			results.style.display = "flex";
			//results.classList.add("Bamboo");
			printResult.innerText = "Alienated Family";
			//printDescription.innerText = "Purple Bamboo, or";
			//printBotanical.innerText =  "Phyllostachys nigra";
			printDescription2.innerText = "You filling much more relief after moving into an enviironment that s far away from home. But you still have a hope towardsimporving the boundariies between parents."
			printLines.innerText = result;
			resultPlural.innerText = "Good Luck!";
			break;

		case 1:		//type2
			results.style.display = "flex";
			//results.classList.add("Orchid");
			printResult.innerText = "Bounded Family";
			//printDescription.innerText = "The Moon Orchid, or";
			//printBotanical.innerText =  "Phalaenopsis amabilis";
			printDescription2.innerText = "You do not reject the current mode of communication, but would like to have closer contact with parents."
			printLines.innerText = result;
			resultPlural.innerText = "Good Luck!";
			break;

		case 2:		//type3
			results.style.display = "flex";
			//results.classList.add("Ficus");
			printResult.innerText = "The Maximizer";
			//printDescription.innerText = "The Rubber Fig, or";
			//printBotanical.innerText =  "Ficus elastica";
			printDescription2.innerText = "You have unrealistic expectations of a partner and are always looking for better opportunities. You like going clubbing and are just looking for something casual."
			printLines.innerText = result;
			resultPlural.innerText = "Good Luck!";
			break;

		/*case 3:		//type4
			results.style.display = "flex";
			//results.classList.add("Wakame");
			printResult.innerText = "The Hesitator";
			//printDescription.innerText = "Wakame, or";
			//printBotanical.innerText =  "Undaria pinnatifida";
			printDescription2.innerText = "You have low self-confidence and never feel ready to date or start a relationship. You like quiet cafes and really love personal alone-time."
			printLines.innerText = result;
			resultPlural.innerText = "Good Luck!";
			break;

		case 4:		//type5
			results.style.display = "flex";
			//results.classList.add("Sakura");
			printResult.innerText = " The Nurturer/Protector";
			//printDescription.innerText = "The Japanese Cherry Tree, or";
			//printBotanical.innerText =  "Prunus serrulata";
			printDescription2.innerText = "You always end up dating dependent and needy people. You like givin people gifts and just want the comfort of their company so you end up buying them with money."
			printLines.innerText = result;
			resultPlural.innerText = "Good Luck!";
			break;

		case 5:		//type6
			results.style.display = "flex";
			//results.classList.add("Hydrangea");
			printResult.innerText = "The Charmer.";
			//printDescription.innerText = "The Big-Leaf Hydrangea, or";
			//printBotanical.innerText =  "Hydrangea macrophylla";
			printDescription2.innerText = "You dates many people for short periods and are against monogamy. You like going clubbing and are just looking for something casual."
			printLines.innerText = result;
			resultPlural.innerText = "Good Luck!";
			break;

		case 6:		//type7
			results.style.display = "flex";
			//esults.classList.add("lotus");
			printResult.innerText = "The Martyr";
			//printDescription.innerText = "The Lotus, or";
			//printBotanical.innerText =  "Nelumbo nucifera";
			printDescription2.innerText = "You cannot say no to a new relationship and date people that choose you. You like going for walks and love spending quality time! Your favourite food is Italian!l"
			printLines.innerText = result;
			resultPlural.innerText = "Good Luck!";
			break;

		case 7:		//type8
			results.style.display = "flex";
			//results.classList.add("gingko");
			printResult.innerText = "The Balanced!";
			//printDescription.innerText = "The Gingko Tree, or";
			//printBotanical.innerText =  "Ginkgo biloba";
			printDescription2.innerText = "."
			printLines.innerText = result;
			resultPlural.innerText = "Gingko Trees";
			break;*/


		default:
			document.getElementById("error").style.display = "inline-block";

	}
}

// Profiles
var profile_one = document.querySelector(".two");
var profile_three = document.querySelector(".three");

profile_one.addEventListener("click", message);
profile_three.addEventListener("click", message);
// profile_one.removeEventListener("click", message);

function message(){
	fail.innerHTML = '<div class="failbox"> You chose the wrong person! You are the worst matchmaker and this is why you are single, you will die alone. </div> '
}

const heart = document.querySelector(".heart-like-button");
var fail = document.querySelector(".fail");

heart.addEventListener("click", () => {
  if (heart.classList.contains("liked")) {
    heart.classList.remove("liked");
	console.log("check");
  } else {
    heart.classList.add("liked");
  }
});

heart.addEventListener("click", () => {
	fail.innerHTML = '<div class="failbox"> You chose the wrong person! You are the worst matchmaker and this is why you are single, you will die alone. </div> '
})

