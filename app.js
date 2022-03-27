const puzzle = document.querySelector('#puzzle')
const solveBtn = document.querySelector('#solve_btn')
const solDisplay = document.querySelector('#solDisplay')
const square = 81
const submission = []

for (let i = 0; i < square; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    if(
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
        inputElement.classList.add('odd-section')
    }
    puzzle.appendChild(inputElement)
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })
    console.log('submission', submission)
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if(isSolvable && solution){
        inputs.forEach((input,i) => {
            input.value = solution[i]
        })
        solDisplay.innerHTML('Solutions is displayed')
    }
    else{
        solDisplay.innerHTML('Solution not found')
    }
} 

const solve = () => {
    joinValues()
    const data = submission.join('')
    console.log('data', data)
    var options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
            'X-RapidAPI-Key': 'b382ab96bfmsh3b6a91ddf42e986p163ed8jsn2847a6ef3ca8'
        },
        data: {
            puzzle: data
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data)
        populateValues(response.data.solvable, response.data.solution);
    }).catch(function (error) {
        console.error(error);
    });
}





solveBtn.addEventListener('click', solve)