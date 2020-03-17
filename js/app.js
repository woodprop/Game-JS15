(function () {

    let fieldSize = 2;

// ---------- ELEMENTS ----------
    const startMenu = document.querySelector('.start-menu');
    const fieldSizeInput = document.querySelector('#fieldSizeSelect');
    const startButton = document.querySelector('.game-start-btn');
    const game = document.querySelector('.game-wrapper');


// ---------- EVENTS ----------

    startButton.addEventListener('click', gameStart);
    game.addEventListener('click', onBoxClickHandler);

// ---------- FUNCTIONS ----------

    function gameStart() {
        fieldSize = +fieldSizeInput.value;
        startMenu.classList.toggle('active');
        game.classList.toggle('active');
        game.appendChild(buildGameField());
        generateStartPosition();
    }


    function onBoxClickHandler({target}) {
        const emptyBox = getEmptySibling(target);
        if (emptyBox) {
            swapBoxes(target, emptyBox);
            if (checkWin()) setTimeout(win);
        }

    }


    function checkWin() {
        let countCorrect = 0;
        let boxes = document.querySelectorAll('.field-box');
        boxes.forEach(box => {
           if (box.dataset['value'] === '0') return;
           if (box.dataset['fieldNumber'] === box.textContent) countCorrect++;
        });
        return countCorrect === Math.pow(fieldSize, 2) - 1;

    }


    function win() {
        alert('YOU WIN!');
    }


    function swapBoxes(clicked, empty) {
        clicked.classList.toggle('empty');
        empty.classList.toggle('empty');
        empty.textContent = clicked.textContent;
        clicked.textContent = '';
        empty.dataset['value'] = clicked.dataset['value'];
        clicked.dataset['value'] = '0';
    }


    function getEmptySibling(box) {
        let siblings = [];
        const boxNum = parseInt(box.dataset['fieldNumber']);
        const firstColumn = [];
        const lastColumn = [];
        for (let i = 1; i < Math.pow(fieldSize, 2); i += fieldSize) firstColumn.push(i);
        for (let i = fieldSize; i <= Math.pow(fieldSize, 2); i += fieldSize) lastColumn.push(i);

        siblings.push(boxNum - 1);
        siblings.push(boxNum + 1);
        siblings.push(boxNum - fieldSize);
        siblings.push(boxNum + fieldSize);

        // If 1st row
        if (boxNum <= fieldSize) {
            siblings = siblings.filter(s => {
                return s !== boxNum - fieldSize;
            });
        }
        // If last row
        if (boxNum > (Math.pow(fieldSize, 2) - fieldSize)) {
            siblings = siblings.filter(s => {
                return s !== boxNum + fieldSize;
            });
        }
        // If 1st column
        if (firstColumn.indexOf(boxNum) !== -1) {
            siblings = siblings.filter(s => {
                return s !== boxNum - 1;
            });
        }
        // If last column
        if (lastColumn.indexOf(boxNum) !== -1) {
            siblings = siblings.filter(s => {
                return s !== boxNum + 1;
            });
        }

        let emptyBox = false;
        siblings.forEach(s => {
           const box = document.querySelector(`.field-box[data-field-number="${s}"]`);
           if (box.classList.contains('empty')) emptyBox = box;
        });

        return emptyBox;
        // console.log(siblings);
    }



// ---------- GAME FIELD BUILDING ----------

    function buildGameField() {
        const gameField = document.createDocumentFragment();

        for (let i = 0; i < fieldSize; i++) {
            gameField.appendChild(createFieldRow(fieldSize, i * fieldSize + 1));
        }
        return gameField;
    }


    function createFieldRow(elementsQty, startNumber) {
        const row = document.createElement('div');
        row.classList.add('field-row');
        for (let i = startNumber; i < (startNumber + elementsQty); i++) {
            row.appendChild(createFieldElement(i));
        }
        return row;
    }


    function createFieldElement(fieldNumber) {
        const box = document.createElement('div');
        box.classList.add('field-box');
        box.setAttribute('data-field-number', fieldNumber);
        return box;
    }

    function generateStartPosition() {
        const numArr = [];
        for (let i = 0; i < Math.pow(fieldSize, 2); i++) {
            numArr.push(i);
        }
        shuffle(numArr);

        numArr.forEach((num, i) => {
            const box = document.querySelector(`.field-box[data-field-number="${i + 1}"]`);
            box.setAttribute('data-value', num);
            if (num === 0) {
                box.classList.toggle('empty');
                return;
            }
            box.textContent = num;
        });
    }

    function shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }




})();