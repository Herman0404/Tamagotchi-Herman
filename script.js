let tomogotchiArr = [];

class Tomogotchi {
    constructor(name, animalType) {
        this.name = name;
        this.animalType = animalType;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
    }

    maxminVal(value) {
        return Math.max(0, Math.min(100, value));
    }

    nap() {
        this.energy = this.maxminVal(this.energy + 40);
        this.happiness = this.maxminVal(this.happiness - 10);
        this.fullness = this.maxminVal(this.fullness - 10);
        console.log(`You took a nap with ${this.name}.`)
        this.runAway();
    }

    play() {
        this.energy = this.maxminVal(this.energy - 10);
        this.happiness = this.maxminVal(this.happiness + 30);
        this.fullness = this.maxminVal(this.fullness - 10);
        console.log(`You played with ${this.name}!`)
        this.runAway();
    }

    eat() {
        this.energy = this.maxminVal(this.energy - 15);
        this.happiness = this.maxminVal(this.happiness + 5);
        this.fullness = this.maxminVal(this.fullness + 30);
        console.log(`You ate with ${this.name}.`)
        this.runAway();
    }

    runAway() {
        if (this.energy === 0 || this.happiness === 0 || this.fullness === 0) {
            console.log(`${this.name} has run away because they are too tired, sad, or hungry!`);

            const index = tomogotchiArr.indexOf(this);
            if (index > -1) {
                tomogotchiArr.splice(index, 1);
            }
        }
    }
    display(tomoContainer) {
        let tomoElement = document.createElement("li");
        tomoElement.classList.add("tomo-item");

        tomoElement.innerHTML = `
            ${this.name}
			`;

        tomoContainer.appendChild(tomoElement);
    }
}


tomoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const animalType = document.getElementById("animalType").value;
    const newTomogotchi = new Tomogotchi(name, animalType);
    tomogotchiArr.push(newTomogotchi);
    console.log(tomogotchiArr);
    displayTomo();
})

function displayTomo() {
    let tomoContainer = document.getElementById("tomo-container");
    tomoContainer.innerHTML = "";
    tomogotchiArr.forEach((tomo) => {
        tomo.display(tomoContainer);
    })
}