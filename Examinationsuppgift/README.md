# Quiz: Capitals of Europe

This is a European capitals quiz, randomizing countries and taking user input as a condition to match its capital respectively.

### Quick start

Install "Live Served" extension if not already installed
Right click on index.html --> 'Open with Live Server' to open the quiz in your browser
**Get playing**
Press Enter to submit answer

### Code issues

There were several issues faced when creating this quiz. The three major ones being:

1. How to randomize questions and make sure every country is only shown once per round
2. How to check if the user input is actually the capital of the country shown and set the score
2. How to remove the current content and display highscore after the quiz is finished

### Plan
1. Calculate a random index number and make sure each "used" element is removed from its array after it has been shown to the user
2. Collect the input data and use it as a condition to compare it to the country's capital
3. Make the original container disappear from the page and replace it with another one

### Solutions
1. The forEach() method is used on an array used to store all countries of Europe. The code inside the method will execute once per element.
Inside the forEach, we'll use a function to create a random integer between 0 and the length of the array of countries. This integer will be stored in a variable, which will be used to determine which index value we want to output. The function then returns that value.
We will call the function when assigning its value to another variable.
Then, we assign the value (the country) to the content of the html tag that is used to display the questions, using its reference + .innerText = 'blabla new content';
Each time we've collected new user input (solution in nr.2), we use the .splice() method on both the country array and the capitals array, using the current randomized index number as our first argument to target the showing country element, and 1 as our second argument to remove only 1. This way, the shown element is removed from the arrays and will not be shown again unless player restarts the game.

2. .addEventListener is added to the input field reference, listening for the 'keyup' event, meaning every time a specific key is released. Enter has the keycode 13.
If enter is pressed, we use e.target.value and assign it to a variable to store the user's input data.
We then reset the target value so that it's empty for the next question.
Now that we have the data stored in a variable, we can use it as a condition in an if statement to check if the answer is correct or not.
We have already created a second array containing all capitals of europe. Each capital is stored on the same index number as it's country, so the randomized index number we get from the function in the last step, can be used to check if they are matching.
If the user input matches the capital on the same index as the country, the user scores one point which is added to a variable containing correct points.
If it does not match (just as an else statement), the score remains the same, and one point is added to a variable containing incorrect points.
At the end of the entire code, we'll use answer = ''; to reset the input data to clear it for the upcoming question.

3. I was trying to make the original container (the first div tag, containgin the game itself) disappear in time for the highscore div appearing, before I realized the highscore div lays ontop of the game if it's display attribut is set to block, covering the whole container anyways.
We'll use an else if inside our keyup eventListener to check if our country array is emptied and has no more questions to show. We do this using (europeCountries.length === 0) as our condition.
If this block runs (when our splice method has removed all elements/has been fired 50 times) we change the css display attribute of our highscore div block to 'block'. This will make the highscore block appear and cover the game, showing the highscore tags content instead. We set the correct and incorrect highscore tags's .innerText to the value of our correct and incorrect variables.
A Play again button is shown, which function is to refresh the page to run the code again from scratch.
The same applies to the Reset button which is shown during the entire quiz. 


### Improvements

Future improvements to be made:
1. Adding all other continents for the player to pick from, including one with all of them combined.
2. Storing countries and capitals in a separate JSON-file.
3. Improve the function of the Play again and Refresh buttons, without having them refresh the entire page.