(function () {

    const fieldSize = 4;

// ---------- ELEMENTS ----------
    const game = document.querySelector('.game-wrapper');


    game.appendChild(buildGameField());
    generateStartPosition();





// ---------- EVENTS ----------

    game.addEventListener('click', onBoxClickHandler);







    function onBoxClickHandler({target}) {
        getSiblings(target);
    }



    function getSiblings(box) {
        let siblings = [];
        const boxNum = parseInt(box.dataset['fieldNumber']);
        const firstColumn = [];
        const lastColumn = [];
        (fs => {
            for (let i = 1; i < Math.pow(fs, 2); i += fs) firstColumn.push(i);
        })(fieldSize);

        (fs => {
            for (let i = fs; i <= Math.pow(fs, 2); i += fs) lastColumn.push(i);
        })(fieldSize);



        siblings.push(boxNum - 1);
        siblings.push(boxNum + 1);
        siblings.push(boxNum - fieldSize);
        siblings.push(boxNum + fieldSize);

        // 1st row
        if (boxNum <= fieldSize) {
            siblings = siblings.filter(s => {
                return s !== boxNum - fieldSize;
            });
        }
        // last row
        if (boxNum > (Math.pow(fieldSize, 2) - fieldSize)) {
            siblings = siblings.filter(s => {
                return s !== boxNum + fieldSize;
            });
        }
        // 1st column
        if (firstColumn.indexOf(boxNum) !== -1) {
            siblings = siblings.filter(s => {
                return s !== boxNum - 1;
            });
        }
        // last column
        if (lastColumn.indexOf(boxNum) !== -1) {
            siblings = siblings.filter(s => {
                return s !== boxNum + 1;
            });
        }




        console.log(siblings);
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