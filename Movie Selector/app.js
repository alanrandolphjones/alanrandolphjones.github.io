const app = {};

	app.movieArray = [];

	app.yearRangeStrings = [];

	app.yearRange = [];

	app.genres = [];

	app.actors = [];

	app.actorStrings = [];

	app.counter = 0;

//JSON-style log of questions. Perhaps move to its own document if more questions are added?

app.questions = [
	{
		type: "genre",
		question: "Who is your favourite Harrison Ford Character?",
		answers: [
			{
				answer: "Han Solo in Star Wars",
				value: "878",
				ID: 11
			},
			{
				answer: "Indiana Jones in Raiders of the Lost Ark",
				value: "12",
				ID: 85
			},
			{
				answer: "John Book in Witness",
				value: "18",
				ID: 9281
			},
			{
				answer: "Jack Trainer in Working Girl",
				value: "10749",
				ID: 3525
			}
		]
	},
	{
		type: "genre",
		question: "Which killer do you fear the most",
		answers: [
			{
				answer: "Jaws from Moonraker",
				value: "28",
				ID: 698
			},
			{
				answer: "Mugatu in Zoolander",
				value: "35",
				ID: 9398
			},
			{
				answer: "Michael Myers in Halloween",
				value: "27",
				ID: 948
			},
			{
				answer: "Voldemort in Harry Potter and the Goblet of Fire",
				value: "14",
				ID: 674
			}
		]
	},
	{
		type: "yearRange",
		question: "Who is your favourite Spider-Man?",
		answers: [
			{
				answer: "Tobey Maguire",
				value: "2000 2005",
				ID: 557
			},
			{
				answer: "Andrew Garfield",
				value: "2008 2013",
				ID: 1930
			},
			{
				answer: "Tom Holland",
				value: "2014 2017",
				ID: 315635
			},
			{
				answer: "a cartoon",
				value: "1994 1998",
				ID: 270768
			}
		]
	},
	{
		type: "yearRange",
		question: "Who is your favourite James Bond?",
		answers: [
			{
				answer: "Sean Connery",
				value: "1962 1971",
				ID: 658
			},
			{
				answer: "Roger Moore",
				value: "1973 1985",
				ID: 691
			},
			{
				answer: "Pierce Brosnan",
				value: "1995 2002",
				ID: 710
			},
			{
				answer: "Daniel Craig",
				value: "2006 2017",
				ID: 37724
			}
		]
	},
	{
		type: "actors",
		question: "Which ensemble movie makes you the most excited?",
		answers: [
			{
				answer: "Ocean's 11",
				value: "161",
				ID: 161
			},
			{
				answer: "Nashville",
				value: "3121",
				ID: 3121

			},
			{
				answer: "It’s a Mad, Mad, Mad, Mad World",
				value: "11576",
				ID: 11576
			},
			{
				answer: "Love Actually",
				value: "508",
				ID: 508
			}
		]
	},
	{
		type: "actors",
		question: "Which pack of actors do you like the most?",
		answers: [
			{
				answer: "The Rat Pack",
				value: "299",
				ID: 299
			},
			{
				answer: "The Brat Pack",
				value: "2108",
				ID: 2108
			},
			{
				answer: "Bridesmaids",
				value: "55721",
				ID: 55721
			},
			{
				answer: "The Family from Furious Seven",
				value: "168259",
				ID: 168259
			}
		]
	},
]

app.questions.forEach(function(question,i){

	let radioHTML = []
	
	question.answers.forEach(function(answer,i2){

		radioHTML.push(
			`
			<div class="choice">
				<div class="overlay"></div>
				<div class="float">
					<input id="a${i2}" type="radio" name="q${i}" value="${answer.value}"><label class="a${i2}" for="a${i2}"></label>
				</div>
		 	</div>

			`
			)

	})

	radioHTML = radioHTML.join(` `)

	app.questions[i].html = `
		<p>${question.question}</p>
		<form class="${question.type}">
			${radioHTML}
			<input class="submit" type="submit">
		</form>
		`
})



//Generate a first question
//Ensure that selected random question is removed from array.

app.generateQuestion = () => {

	const random = Math.floor(Math.random() * app.questions.length);

	$('.questionBlock').html(app.questions[random].html)

	app.questions[random].answers.forEach(function(answer,i) {
		
		$.ajax({
			url: `https://api.themoviedb.org/3/movie/${answer.ID}?api_key=bd5ee0c206e79e2dc0186972054894df&language=en-US`,
				method: 'GET',
				dataType: 'json'
		}).then(function(res){

			$('label.a' + i).html(`<p>${answer.answer}</p><img src="https://image.tmdb.org/t/p/w500${res.poster_path}" class="a${i}" alt="">
				`)
		})
	
	})

	app.questions.splice(random,1)

};

//Generate next question after submission.

app.nextQuestion = () => {

	const random = Math.floor(Math.random() * app.questions.length);

	if (app.className === 'genre') {

		if (app.questions[random].type === 'yearRange') {
			$('.questionBlock').html(app.questions[random].html)

			app.questions[random].answers.forEach(function(answer,i) {
				
				$.ajax({
					url: `https://api.themoviedb.org/3/movie/${answer.ID}?api_key=bd5ee0c206e79e2dc0186972054894df&language=en-US`,
						method: 'GET',
						dataType: 'json'
				}).then(function(res){

					$('label.a' + i).html(`<p>${answer.answer}</p><img src="https://image.tmdb.org/t/p/w500${res.poster_path}" class="a${i}" alt="">
						`)

				})
			
			})

			app.questions.splice(random,1)


		}
		else {
			app.nextQuestion()
		}

	} else if (app.className === 'yearRange') {
		
		if (app.questions[random].type === 'actors') {
			$('.questionBlock').html(app.questions[random].html)

			app.questions[random].answers.forEach(function(answer,i) {
				
				$.ajax({
					url: `https://api.themoviedb.org/3/movie/${answer.ID}?api_key=bd5ee0c206e79e2dc0186972054894df&language=en-US`,
						method: 'GET',
						dataType: 'json'
				}).then(function(res){

					$('label.a' + i).html(`<p>${answer.answer}</p><img src="https://image.tmdb.org/t/p/w500${res.poster_path}" class="a${i}" alt="">
						`)

				})
			
			})

			app.questions.splice(random,1)

		}
		else {
			app.nextQuestion()
		}

	} else if (app.className === 'actors') {

		if (app.questions[random].type === 'genre') {
			$('.questionBlock').html(app.questions[random].html)

			app.questions[random].answers.forEach(function(answer,i) {
				
				$.ajax({
					url: `https://api.themoviedb.org/3/movie/${answer.ID}?api_key=bd5ee0c206e79e2dc0186972054894df&language=en-US`,
						method: 'GET',
						dataType: 'json'
				}).then(function(res){

					$('label.a' + i).html(`<p>${answer.answer}</p><img src="https://image.tmdb.org/t/p/w500${res.poster_path}" class="a${i}" alt="">
						`)

				})
			
			})

			app.questions.splice(random,1)

		}
		else {
			app.nextQuestion()
		}

	}

};

//When Question is answered. Collect data and generate next question. Ensure that selected random question is removed from array. Final version of this quiz would include more than six questions.

app.collectAnswers = () => {

   	$(document).on('click', 'input', function(){
   		$('form').submit();
   	});

	$(document).on('submit', '.questionBlock form', function(e){
		e.preventDefault();

		if ($(this).find(':checked').val() === undefined) {
				alert("Please select an answer")
		} else {

			app.counter++;

			app.className = this.getAttribute('class');

			if (app.counter < 6) {

				if (app.className === 'genre') {
					app.genres.push($(this).find(':checked').val());

					app.nextQuestion()
					
				} else if (app.className === 'yearRange') {
					
					app.yearRange.push($(this).find(':checked').val());

					app.nextQuestion()

				} else if (app.className === 'actors') {
										
					app.actors.push($(this).find(':checked').val());

					app.nextQuestion()

				};

			} else if (app.counter === 6) {

				if (app.className === 'genre') {
					app.genres.push($(this).find(':checked').val());
					
				} else if (app.className === 'yearRange') {
					app.yearRange.push($(this).find(':checked').val());

				} else if (app.className === 'actors') {
					app.actors.push($(this).find(':checked').val());

				};

				app.randomize();

			};
			
		};

	});

};

//Select random answers from the various inputs for the final query.

app.randomize = () => {

	const randomGenre = Math.floor(Math.random() * app.genres.length);

	app.genreQuery = app.genres[randomGenre];

	const randomYears = Math.floor(Math.random() * app.yearRange.length);

	app.yearRangeQuery = app.yearRange[randomYears];

	app.yearRangeQuery = app.yearRangeQuery.split(" ");

	const randomActors = Math.floor(Math.random() * app.actors.length);

	app.actorsQuery = Number(app.actors[randomActors]);

	app.findMovie();

};

//Final function that will produce a movie result and paste in the page

app.findMovie = () => {

//First, turn the movie ID from the actors question into a clump of actor IDs

	const p1 = $.ajax({
		url: `https://api.themoviedb.org/3/movie/${app.actorsQuery}/credits?api_key=bd5ee0c206e79e2dc0186972054894df`,
			method: 'GET',
			dataType: 'json'

	})

	.then(function(res){

		for (i = 0;i<10;i++) {
			app.actorStrings.push(res.cast[i].id)
			
			app.actorClump = `${app.actorStrings[0]}|${app.actorStrings[1]}|${app.actorStrings[2]}|${app.actorStrings[3]}|${app.actorStrings[4]}|${app.actorStrings[5]}|${app.actorStrings[6]}|${app.actorStrings[7]}|${app.actorStrings[8]}|${app.actorStrings[9]}`
		
		};
	});

	//Next, use all this data in a query for movies. Then, randomly select one of them.

	$.when(p1).then(function(){

		//Note: I had trouble making the promises work beyond this one, which is why everything is chained after this. I will do some online practices to figure out promises because I currently find them VERY ANNOYING. 
		

		const p2 = $.ajax({
		url: `https://api.themoviedb.org/3/discover/movie?api_key=bd5ee0c206e79e2dc0186972054894df&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${app.yearRangeQuery[0]}&primary_release_date.lte=${app.yearRangeQuery[1]}&with_genres=${app.genreQuery}&with_people=${app.actorClump}`,
			method: 'GET',
			dataType: 'json'
		})

		.then(function(res){
			const random = randomYears = Math.floor(Math.random() * res.results.length);
			
			app.movie = res.results[random];

			//Note: There are still some queries that will break the app. Hopefully, more questions will help prevent this.

			if (app.movie === undefined) {
				app.randomize();
			}

			app.movieID = app.movie.id;
			app.year = app.movie.release_date.substring(0,4)

			//Now that we have the movie ID, paste a couple things on the DOM.

			$('.questionBlock').remove();

			$('.movieInfo').css("display","flex");

			$('.box1').html(`<h2>${app.movie.title} (${app.year})</h2><img src="https://image.tmdb.org/t/p/w500${app.movie.poster_path}" class="poster" alt="">
							`);
			$('.box2').html(`<h2>${app.movie.title} (${app.year})</h2><div class="directors"></div><div class="writers"></div>`)

			$('.plot').html(`<h3>Plot:</h3><p>${app.movie.overview}</p>`);

		})

		//Use the movie ID to find cast and credits, then paste those on the DOM as well. 

		.then(function() {
			$.ajax({ 
			url: `https://api.themoviedb.org/3/movie/${app.movieID}/credits?api_key=bd5ee0c206e79e2dc0186972054894df`,
					method: 'GET',
					dataType: 'json'
			})

			.then(function(res){

				app.cast = [];

				for (i=0;i<5;i++) {
					app.cast.push(res.cast[i]);
				}

				app.directors = [];
				app.writers = [];

				for (i=0;i< res.crew.length;i++){

					if (res.crew[i].job === "Director"){
						app.directors.push(res.crew[i]);
					} 

					else if (res.crew[i].job === "Screenplay" || res.crew[i].job === "Writer") {
						app.writers.push(res.crew[i]);
					}
				}

				$('.directors').append(`<h3>Director${app.directors.length > 1 ? 's' : ''}:</h3>`);

				$('.writers').append(`<h3>Writer${app.directors.length > 1 ? 's' : ''}:</h3>`);

				$('.cast').append('<h3>Cast:</h3>');

					
				for (i=0;i<app.directors.length;i++) {
					
					if (app.directors[i].profile_path == null) {
						app.poster = 'assets/undefined.jpg'
					} else {
						app.poster = `https://image.tmdb.org/t/p/w500${app.directors[i].profile_path}`
					}

					$('.directors').append(`
						<div class="person">
							<img src=${app.poster} class="poster" alt="">
								<p>${app.directors[i].name}</p>
						</div>
					`)};
					
				for (i=0;i<app.writers.length;i++) {

					if (app.writers[i].profile_path == null) {
						app.poster = 'assets/undefined.jpg'
					} else {
						app.poster = `https://image.tmdb.org/t/p/w500${app.writers[i].profile_path}`
					}

					$('.writers').append(`
						<div class="person">
							<img src=${app.poster} class="poster" alt="">
							<p>${app.writers[i].name}</p>
						</div>
				`)};

				for (i=0;i<app.cast.length;i++) {

					$('.cast').append(`<div class=" person cast${i}"></div>`)
					
					if (app.cast[i].profile_path == null) {

						$('.cast' + i).append(`<img src="assets/undefined.jpg" class="poster" alt="">`);
					} else {
						$('.cast' + i).append(`<img src="https://image.tmdb.org/t/p/w500${app.cast[i].profile_path}" class="poster" alt="">`);
					};

					$('.cast' + i).append(`<p>${app.cast[i].name}:</br>${app.cast[i].character}</p>`);		

				};

			});
				
		});
	
	});

};

app.init = () => {
	app.generateQuestion();
	app.collectAnswers();
};

$(function() {
	app.init();
})