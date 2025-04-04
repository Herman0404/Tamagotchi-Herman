let tomoArr = [];
let idNum = 0;
const tomoForm = document.getElementById("tomoForm");

class Tomogotchi {
    constructor(name, animalType) {
        this.name = name;
        this.animalType = animalType;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
        this.index = idNum++;

        this.startTimer();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.energy = this.maxminVal(this.energy - 15);
            this.fullness = this.maxminVal(this.fullness - 15);
            this.happiness = this.maxminVal(this.happiness - 15);
            this.runAway();
        }, 10000);
    }

    maxminVal(value) {
        return Math.max(0, Math.min(100, value));
    }

    nap() {
        this.energy = this.maxminVal(this.energy + 40);
        this.happiness = this.maxminVal(this.happiness - 10);
        this.fullness = this.maxminVal(this.fullness - 10);
        this.log("nap")
        this.runAway();
    }

    play() {
        this.energy = this.maxminVal(this.energy - 10);
        this.happiness = this.maxminVal(this.happiness + 30);
        this.fullness = this.maxminVal(this.fullness - 10);
        this.log("play")
        this.runAway();
    }

    eat() {
        this.energy = this.maxminVal(this.energy - 15);
        this.happiness = this.maxminVal(this.happiness + 5);
        this.fullness = this.maxminVal(this.fullness + 30);
        this.log("eat")
        this.runAway();
    }

    log(action) {
        let tomoLog = document.getElementById("tomo-log");
        let newLog = document.createElement("p");

        // Set the text content based on the action
        if (action === "nap") {
            newLog.innerHTML = `You took a nap with ${this.name}.`;
        } else if (action === "play") {
            newLog.innerHTML = `You played with ${this.name}!`;
        } else if (action === "eat") {
            newLog.innerHTML = `You ate with ${this.name}.`;
        } else {
            newLog.innerHTML = `${this.name} ran away because they were too tired, sad, or hungry!`;
        }

        // Append the new log entry to the log container
        tomoLog.appendChild(newLog);

        // Set a margin (e.g., 30px) from the bottom to trigger auto-scroll
        const margin = 30;

        // Check if we are within the margin of the bottom
        const isNearBottom = (tomoLog.scrollHeight - tomoLog.scrollTop - tomoLog.clientHeight) <= margin;

        // If we're near the bottom (within margin), scroll to the bottom
        if (isNearBottom) {
            tomoLog.scrollTop = tomoLog.scrollHeight; // Scroll to the bottom
        }
    }




    runAway() {
        if (this.energy === 0 || this.happiness === 0 || this.fullness === 0) {
            this.log(null)
            clearInterval(this.timer);
            const index = tomoArr.findIndex(tomo => tomo.index === this.index);
            if (index > -1) {
                tomoArr.splice(index, 1);
            }
        }
        displayTomo();
    }

    display(tomoContainer) {
        let tomoElement = document.createElement("li");
        tomoElement.classList.add("tomo-item");

        tomoElement.innerHTML = `
        <div class="tomo-details">
            <h2>${this.name}</h2>
            <h3>${this.animalType}</h3>
            <p>Energy: <span class="energy">${this.energy}</span></p>
            <p>Happiness: <span class="happiness">${this.happiness}</span></p>
            <p>Fullness: <span class="fullness">${this.fullness}</span></p>
        </div>
        <div class="tomo-actions">
            <button class="nap-btn">Nap</button>
            <button class="play-btn">Play</button>
            <button class="eat-btn">Eat</button>
        </div>
        `;

        // Attach button event listeners inside the object
        tomoElement.querySelector(".nap-btn").addEventListener("click", () => this.nap());
        tomoElement.querySelector(".play-btn").addEventListener("click", () => this.play());
        tomoElement.querySelector(".eat-btn").addEventListener("click", () => this.eat());

        tomoContainer.appendChild(tomoElement);
    }
}

tomoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (tomoArr.length < 4) {
        const name = document.getElementById("name").value;
        const animalType = document.getElementById("animalType").value;

        const newTomogotchi = new Tomogotchi(name, animalType);
        tomoArr.push(newTomogotchi);

        displayTomo();
    } else {
        alert("You already have 4 tomogotchis, take care of them instead of adding more...")
    }
    tomoForm.reset();
});

function displayTomo() {
    let tomoContainer = document.getElementById("tomo-container");
    tomoContainer.innerHTML = "";
    tomoArr.forEach((tomo) => {
        tomo.display(tomoContainer);
    });
}
