const emojis = ["🛹", "🛹", "🚁", "🚁", "🛩️", "🛩️", "🍔", "🍔", "🎅", "🎅", "👽", "👽", "👻", "👻", "🏀", "🏀"];
const shuffl = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

let openBoxes = []; // Array to track currently open boxes

for (let i = 0; i < shuffl.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffl[i];

    box.onclick = function () {
        // If the box is already open or matched, do nothing
        if (this.classList.contains('boxOpen') || this.classList.contains('boxMatch')) {
            return;
        }

        // Add the box to the openBoxes array and mark it as open
        openBoxes.push(this);
        this.classList.add('boxOpen');

        // If two boxes are open, check for a match
        if (openBoxes.length === 2) {
            setTimeout(() => {
                const [firstBox, secondBox] = openBoxes;

                // If the innerHTML matches, mark them as matched
                if (firstBox.innerHTML === secondBox.innerHTML) {
                    firstBox.classList.add('boxMatch');
                    secondBox.classList.add('boxMatch');

                    // Check if all boxes are matched
                    if (document.querySelectorAll('.boxMatch').length === emojis.length) {
                        alert('You win!');
                    }
                } else {
                    // If no match, close the boxes
                    firstBox.classList.remove('boxOpen');
                    secondBox.classList.remove('boxOpen');
                }

                // Reset the openBoxes array
                openBoxes = [];
            }, 500);
        }
    };

    document.querySelector('.game').appendChild(box);
}