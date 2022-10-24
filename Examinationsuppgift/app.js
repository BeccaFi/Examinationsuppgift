//Create one array of all countries in the area, and one with its capitals on the matching index
 let europeCountries = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'The Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];
let europeCapitals = ['tirana', 'andorra la vella', 'yerevan', 'vienna', 'baku', 'minsk', 'brussels', 'sarajevo', 'sofia', 'zagreb', 'nicosia', 'prague', 'copenhagen', 'tallinn', 'helsinki', 'paris', 'tbilisi', 'berlin', 'athens', 'budapest', 'reykjavik', 'dublin', 'rome', 'pristina', 'riga', 'vaduz', 'vilnius', 'luxembourg', 'valletta', 'chisinau', 'monaco', 'podgorica', 'amsterdam', 'skopje', 'oslo', 'warsaw', 'lisbon', 'bucharest', 'moscow', 'san marino', 'belgrade', 'bratislava', 'ljubljana', 'madrid', 'stockholm', 'bern', 'ankara', 'kyiv', 'london', 'vatican city'];

//Every element from index.html that I wish to modify in the js code is stored in a variable each. These are all accessed using querySelector and its class attribute.
const qCountry = document.querySelector('.country');
const htmlScore = document.querySelector('.score');
const answer = document.querySelector('.input');
const aCorrect = document.querySelector('.correct');
const aIncorrect = document.querySelector('.incorrect');
const container = document.querySelector('.container');
const highscore = document.querySelector('.highscore');
const htmlQuestion = document.querySelector('.question');
const corScore = document.querySelector('.corScore');
const incScore = document.querySelector('.incScore');

//Declaring randomIndex in the the global scope to make it accessibe outside the getRandomCountry function where it's value will be defined.
//Declaring variables to work as counters for correct and incorrect answers, to add to the player's score
let randomIndex;
let correct = 0;
let incorrect = 0;
let userAnswer = ''; //Set to empty string, it will be redefined with the user input value later on.

//Function to set the css display attribute to 'none', will be used with a timer to make text disappear after it's shown 400ms.
function yayBooTimer(){
    aCorrect.style.display = 'none';
    aIncorrect.style.display = 'none';
}

    //For each element in the europeCountries array, do the following:
        europeCountries.forEach(() => { 
            //A function to randomize our questions:
            //First calculates a random integer using math.random on math.floor, (minimum 0, maximum the number of the length of the array/argument), and assigns it to our variable randomIndex.
            //We declare a variable named country, and set its value to the element in the array/argument which is stored on that randomized index number.
            //The function then returns the value (the element on the randomized array index) to the user.
            function getRandomCountry(countriesArray) {
                randomIndex = Math.floor(Math.random() * countriesArray.length);
                const country = countriesArray[randomIndex];
                return country;
            }

            //The randomized country from the function above will be assigned to 'question'.
            let question = getRandomCountry(europeCountries); 
            
            //The value of 'question' (the randomized country) is added to the text inside the .country p-tag (qCountry reference) in our html code,
            //displaying the country as our question in the browser.
            qCountry.innerText = question;
 
            //The user types their answer in the input field, submitting by pressing Enter.
            //This event listener fires every time enter is released (enter is key code 13)
            answer.addEventListener('keyup', (e) => {
                if(europeCountries.length >0){ //Only fires as long as there are elements in the array (although forEach probably already has that covered)
                if(e.keyCode === 13) { //if Enter is pressed:
                    userAnswer = e.target.value; //Assign the input value to the userAnswer variable
                    e.target.value = ''; //Change the input value back to empty string, to empty the input field for the next question (userAnswer remains assigned)
                    if(userAnswer === europeCapitals[randomIndex]){ //if the assigned input in userAnswer matches the capital on the same index number as the country:
                        aCorrect.style.display = 'block'; //display "yay" (which is originally set to 'none')
                        setTimeout(yayBooTimer, 400); //serTimeout makes "yay" disappear using the yayBooTimer function above, after 400ms.
                        correct += 1; //Add 1 point to the correct score
                        htmlScore.innerText = `Score: ${correct}`; //Add score to the score html tag to show in browser.
                        europeCountries.splice(randomIndex, 1); //Remove the randomized index value from the array to only show each coutry once.
                        europeCapitals.splice(randomIndex, 1); //Remove the randomized index value from the array of answers/capitals as well.
                        
                    }else{ //in case userAnswer did not match:
                        aIncorrect.style.display = 'block'; //display "boo"
                        setTimeout(yayBooTimer, 400); // -||-
                        incorrect += 1; //Increase incorrect value by 1
                        europeCountries.splice(randomIndex, 1); //Remove the randomized index value from the array to only show each coutry once.
                        europeCapitals.splice(randomIndex, 1); //Remove the randomized index value from the array of answers/capitals as well.
                       
                    }
                    
                    //Call the getRandomCountry function again to assign the next value to question
                    question = getRandomCountry(europeCountries);
                    if(europeCountries[0] == undefined){ //Kept showing "undefined" as the last country, quick fix by popping it (removing it) from the array before showing highscore.
                        europeCountries.pop();
                    }else{
                    qCountry.innerText = question; //Assign new question to html tag to show in browser. This all needs to be done again here to keep looping through the questions after the keyup event is fired.
                    }
                }
               
                //Once the array is empty, the corScore and incScore p-tags inside the highscore <div> are reassigned the final value of correct and incorrect answers.
                //The highscore display attribute is reassigned "block" (previously 'none') and covers the original container, showing its score content.
                //Input field (answer) is set to display: none; so that the user won't be able to keep pressing enter (because that would interfere with the score points)
            }else if(europeCountries.length === 0){
                corScore.innerText += correct;
                incScore.innerText += incorrect;
                // qCountry.innerText = 'FINISHED! 🎉';
                // htmlQuestion.style.display = 'none';
                highscore.style.display = 'block';
                answer.style.display = 'none';
            }

            });

            //Reset input field data for the next question
            answer = '';

        });