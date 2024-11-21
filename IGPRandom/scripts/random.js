
const playstyles = ["Turtle",
                    "Pressure",
                    "Mega Expand",
                    "Proxy Base",
                    "Siege",
                    "One Base",
                    "Be Sneaky",
                    "Deathball",
                    "Pyre Greed"];
const factions = ["ARU",
                  "QRATH"];
const qrathImmortals = ["ORZUM",
                        "AJARI"];
const aruImmortals = ["MALA",
                      "XOL"];
const malaUnits = ["Masked Hunter",
                   "Xacal",
                   "Ichor",
                   "Bloodbound",
                   "Dread Sister",
                   "Brood Anchor",
                   "Wraith Bow",
                   "Incubator",
                   "Thrum",
                   "Aarox",
                   "Behemoth"];     
const xolUnits = ["Bone Stalker",
                  "Xacal",
                  "Underspine",
                  "Ichor",
                  "White Wood Reaper",
                  "Red Seer",
                  "Thrum",
                  "Aarox",
                  "Behemoth",
                  "Brood Anchor",
                  "Wraith Bow"];
const orzumUnits = ["Zentari",
                    "Zephyr",
                    "Magi",
                    "Dervish",
                    "Absolver",
                    "Castigator",
                    "Hallower",
                    "Scepter",
                    "Sentinel",
                    "Sharu",
                    "Throne"];
const ajariUnits = ["Sipari",
                    "Zephyr",
                    "Saoshin",
                    "Dervish",
                    "Absolver",
                    "Castigator",
                    "Arc Mother",
                    "Warden",
                    "Sentinel",
                    "Sharu",
                    "Throne"];
                    
const buttonLabels = ["What?",
                      "Hmmm?",
                      "Huh?",
                      "How?",
                      "That's silly.",
                      "Ridiculous.",
                      "Certain death.",
                      "No way.",
                      "Not doing it.",
                      "Never works.",
                      "Really?",
                      "Not a chance."];


    
function rand(array) {
    return array[Math.floor(Math.random() * array.length)];
}

class IGPRandomiser {
    
    constructor() {
    }

    onLoad() {
        this.immortalBox = document.getElementById("immortalBox");
        this.playstyleBox = document.getElementById("playstyleBox");
        this.factionIconBox = document.getElementById("factionIconBox");
        // //this.question = document.getElementById("question");
        this.factionIcon = document.getElementById("factionIcon");
        this.factionLabel = document.getElementById("factionLabel");
        this.goButton = document.getElementById("button");

        this.buttonTimeout = null;
        this.unitTimeout = null;
        this.playstyleTimeout = null;
        
        this.clear();
        this.showStart();
    }
        
    showStart() {
    }
    
    setImmortal(name) {
        let fadeWrapper = document.createElement("div");
        fadeWrapper.classList.add("fadeIn");
        
        let prefix = document.createElement("p");
        prefix.classList.add("prefix");
        prefix.innerHTML = "Play";
        fadeWrapper.appendChild(prefix);
        
        let label = document.createElement("p");
        label.innerHTML = name;
        label.classList.add("immortalName");
        fadeWrapper.appendChild(label);
        
        let img = document.createElement("img");
        img.classList.add("immortalPic");
        let filename = name.toLowerCase() + ".png";
        img.src = "images/" + filename;
        fadeWrapper.appendChild(img);
        
        this.immortalBox.appendChild(fadeWrapper);
    }
    
    setUnit(unitname) {
        let label = document.createElement("p");
        label.innerHTML = unitname;
        label.classList.add("unitName");
        label.classList.add("fadeIn");
        this.playstyleBox.appendChild(label);
            
        let img = document.createElement("img");
        img.classList.add("unitPic");
        img.classList.add("fadeIn");
        let filename = unitname.replace(/ /g,"_").toLowerCase() + ".png";
        img.src = "images/" + filename;
        this.playstyleBox.appendChild(img);
    }
    
    setPlaystyle(playstyle) {
        let prefix = document.createElement("p");
        prefix.classList.add("prefix");
        prefix.classList.add("fadeIn");
        prefix.innerHTML = "And";
        this.playstyleBox.appendChild(prefix);
       
        let label = document.createElement("p");
        label.innerHTML = playstyle;
        label.classList.add("playstyleLabel");
        label.classList.add("fadeIn");
        this.playstyleBox.appendChild(label);    
    }

    setFaction(faction) {  
        // this.question.style.display = "none";
        this.factionIcon.innerHTML = `<use xlink:href="images/sprite.svg#logo-${faction.toLowerCase()}"></use>`;
        this.factionIcon.style.display = "block";
        this.factionLabel.innerHTML = faction;
        //this.factionLabel.style.display = "block";
    }

    randomSelection() {
        let faction = rand(factions);
        let immortal = "<NOT SET>";
        let unit = "<NOT SET>";
        switch (faction) {
            case "ARU":
                immortal = rand(aruImmortals);
                break;
            case "QRATH":
                immortal = rand(qrathImmortals);
                 break;
            default:
                console.warn("Unknown faction: " + faction);
                return;
        }
        switch (immortal) {
            case "ORZUM":
                unit = rand(orzumUnits);
                break;
            case "AJARI":
                unit = rand(ajariUnits);
                break;
            case "MALA":
                unit = rand(malaUnits);
                break;
            case "XOL":
                unit = rand(xolUnits);
                break;
            default:
                console.warn("Unknown immortal: " + faction);
                return;
        }
        let playstyle = rand(playstyles);
        return {faction, immortal, unit, playstyle};
    }
    
    buttonClick() {
        this.clear();
        this.goButton.innerHTML = "...";
        setTimeout(()=> {
            this.chooseRandom();
            this.buttonTimeout = setTimeout(()=> {
                this.goButton.innerHTML = rand(buttonLabels);
            }, 3000);
        }, 20);
    }

    chooseRandom() {
        let choices = this.randomSelection();
        this.setFaction(choices.faction);
        this.setImmortal(choices.immortal);
        this.unitTimeout = setTimeout(()=> {
            this.setUnit(choices.unit);
        }, 1000);
        this.playstyleTimeout = setTimeout(()=> {
            this.setPlaystyle(choices.playstyle);
        }, 2000);
    }
    
    clear() {
        this.factionIcon.style.display = "none";
        this.factionLabel.style.display = "none";
        this.playstyleBox.innerHTML = "";
        this.immortalBox.innerHTML = "";
        if (this.unitTimeout !== null) {
            clearTimeout(this.unitTimeout);
        }
        if (this.playstyleTimeout !== null) {
            clearTimeout(this.playstyleTimeout);
        }
        if (this.buttonTimeout !== null) {
            clearTimeout(this.buttonTimeout);
        }
    }
}

randomiser = new IGPRandomiser();

function start() {
    randomiser.onLoad();
   
}