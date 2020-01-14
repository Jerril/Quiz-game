// Instantiate classes
const question = new Question();
const ui = new UI();


// variables
let rightAnswers = (localStorage.getItem('quiz_game_correct')?localStorage.getItem('quiz_game_correct'):0),
	wrongAnswers = (localStorage.getItem('quiz_game_incorrect')?localStorage.getItem('quiz_game_incorrect'):0);

let correctAnswer;

// functions
clearStorage = () => {
	// Set all score to 0	
	localStorage.setItem('quiz_game_correct', 0);
	localStorage.setItem('quiz_game_incorrect', 0);
	// Reload page
	setTimeout(()=>{
		window.location.reload();
	}, 500);
};

saveIntoStorage = () => {	
	localStorage.setItem('quiz_game_correct', rightAnswers);
	localStorage.setItem('quiz_game_incorrect', wrongAnswers);
};


validateAnswer = () => {
	let userAnswer;

	if(document.querySelector('.active')){
		userAnswer = document.querySelector('.active').textContent;

		if (userAnswer === correctAnswer){
			rightAnswers++;
		}else{
			wrongAnswers++;
		}

		// save into storage
		saveIntoStorage();

		// Remove previous questions
		document.querySelector('#app > div').remove();

		// Display another question
		loadQuestion();
	}else{
		ui.printMessage('Please select 1 answer', 'text-center alert alert-danger col-md-6');
	}
};

loadQuestion = () => {

	// Get question
	question.getQuestion()
	.then(info => {
		const result = info.results[0];
		// Display question
		ui.displayQuestion(result);
		// Save the correct answer
		correctAnswer = result.correct_answer;
	})
	.catch(err => {
		alert(`Error! ${err}`);
	});

};


// Event listeners
eventListeners = () => {
	// When the DOM loads
	document.addEventListener('DOMContentLoaded', ()=>{
		// load a new question from API
		loadQuestion();
	});

	// When Check btn is clicked
	document.querySelector('#check-answer').addEventListener('click', e =>{
		e.preventDefault();
		//
		validateAnswer();
	});

	// When clear results btn is clicked
	document.querySelector('#clear-storage').addEventListener('click', e =>{
		e.preventDefault();
		// Start game again
		clearStorage();
	});
};
eventListeners();