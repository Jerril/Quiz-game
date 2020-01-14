class Question{

	// Query API to get question
	async getQuestion(){
		const url = await fetch('https://opentdb.com/api.php?amount=1');
		const data = await url.json();

		return data;
	}

}