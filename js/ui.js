class UI{



	// Display question
	displayQuestion(result){

		let correctAnswer = result.correct_answer;
		let possibleAnswers = result.incorrect_answers;

		// Reschuffle Array
		possibleAnswers.splice(Math.floor(Math.random() * 3), 0, correctAnswer);

		// 
		const questionHTML = document.createElement('div');
		questionHTML.classList.add('col-12');
		questionHTML.innerHTML = `
			<div class="row justify-content-between heading">
				<p class="category">Category: ${result.category}</p>
				<div class="totals">
					<span class="badge badge-success">${rightAnswers}</span>
					<span class="badge badge-danger">${wrongAnswers}</span>
				</div>
			</div>
			<h2 class="text-center">${result.question}</h2>
		`;

		//
		const answerDiv = document.createElement('div'); 
		answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');
		//
		possibleAnswers.forEach(item => {
			const option = document.createElement('li');
			option.classList.add('col-12', 'col-md-5');
			option.innerHTML = item;

			// When option is clicked
			option.addEventListener('click', e => {
				// Remove other active elements
				if(document.querySelector('.active')){
					document.querySelector('.active').classList.remove('active');
				};
				// Add an active class
				e.target.classList.add('active');
			});

			answerDiv.appendChild(option);
		});

		questionHTML.appendChild(answerDiv);

		// Render in UI
		document.getElementById('app').appendChild(questionHTML);

	}

	printMessage(message, className){
		const div = document.createElement('div');
		div.className = className;
		div.appendChild(document.createTextNode(message));
		document.querySelector('.questions').appendChild(div);

		setTimeout(()=>{
			document.querySelector('.alert').remove();
		},3000);
	}
}