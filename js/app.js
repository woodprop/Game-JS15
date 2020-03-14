(function () {

    const fieldSize = 4;

// ---------- ELEMENTS ----------
    const game = document.querySelector('.game-wrapper');


    game.appendChild(buildGameField());
    generateStartPosition();





// ---------- EVENTS ----------

    game.addEventListener('click', onBoxClickHandler);





// ---------- FUNCTIONS ----------

    function onBoxClickHandler({target}) {
        const emptyBox = getEmptySibling(target);
        console.log(emptyBox);
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