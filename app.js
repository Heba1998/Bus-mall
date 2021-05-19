'user strict';

let maxAttempts;
let userAttemp=0;

let ImageNames = [];
let ImageVotes = [];
let ImageShown = []; 

// to compare images in last attempt with images in these attempt
let img1FromLastAttempt;
let img2FromLastAttempt;
let img3FromLastAttempt;


let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');

function BusMall(name, Path) {
    this.name = name;
    this.Path = Path;
    this.votes=0;
    this.shown = 0;
    ImageNames.push(this.name);
    AllImages.push(this);
    
}
let AllImages = [];

new BusMall('bag', 'img/bag.jpg');
new BusMall('banana', 'img/banana.jpg');
new BusMall('bathroom', 'img/bathroom.jpg');
new BusMall('boots', 'img/boots.jpg');
new BusMall('breakfast', 'img/breakfast.jpg');
new BusMall('bubblegum', 'img/bubblegum.jpg');
new BusMall('chair', 'img/chair.jpg');
new BusMall('cthulhu', 'img/cthulhu.jpg');
new BusMall('dog-duck', 'img/dog-duck.jpg');
new BusMall('dragon', 'img/dragon.jpg');
new BusMall('pen', 'img/pen.jpg');
new BusMall('pet-sweep', 'img/pet-sweep.jpg');
new BusMall('scissors', 'img/scissors.jpg');
new BusMall('shark', 'img/shark.jpg');
new BusMall('sweep', 'img/sweep.png');
new BusMall('tauntaun', 'img/tauntaun.jpg');
new BusMall('unicorn', 'img/unicorn.jpg');
new BusMall('water-can', 'img/water-can.jpg');
new BusMall('wine-glass', 'img/wine-glass.jpg');





function setImage() {
    let imagedata = JSON.stringify(AllImages);
    console.log(AllImages);
    console.log(imagedata);
    localStorage.setItem('BusMall', imagedata);
 
}


function getImage() {
    let imagedata1 = localStorage.getItem('BusMall');
    let data = JSON.parse(imagedata1);
    if (data !== null) {
        AllImages = data;
    }
}


// Create Random function

function CreateRandomimg() {
    return Math.floor(Math.random() * AllImages.length);
}
CreateRandomimg();
let img1Index = CreateRandomimg();
let img2Index = CreateRandomimg();
let img3Index = CreateRandomimg();


// function to user choose
function UserTries() {
    maxAttempts = document.getElementById("Number").value;
    
  }



// Create Render Function 
function render3Images() {
    
    //      do {
        //          img2Index=CreateRandomimg();
        //      } while (img2Index === img3Index || img2Index === img1Index || img3Index ===img1Index); 
        //  img1Element.src=Allimage[img1Index].path;
        //  img2Element.src=Allimage[img2Index].path;
        //  img3Element.src=Allimage[img3Index].path;
        //  }
        
        //  render3Images();


        img1Index = CreateRandomimg();
        img2Index = CreateRandomimg();
        img3Index = CreateRandomimg();
        
        if (img1Index === img2Index || img1Index === img3Index || img1Index === img1FromLastAttempt ||img1Index === img2FromLastAttempt ||img1Index === img3FromLastAttempt) {
            img1Index = CreateRandomimg();
        } else if (img2Index === img1Index || img2Index === img3Index || img2Index === img1FromLastAttempt ||img2Index === img2FromLastAttempt ||img2Index === img3FromLastAttempt) {
            img2Index = CreateRandomimg();
        } else if (img3Index === img1Index || img3Index === img2Index || img3Index === img1FromLastAttempt ||img3Index === img2FromLastAttempt ||img3Index === img3FromLastAttempt) {
            img3Index = CreateRandomimg();
        }else{
            img1.src = AllImages[img1Index].Path;
            img3.src = AllImages[img3Index].Path;
            img2.src = AllImages[img2Index].Path;
            
            
            img1FromLastAttempt = img1Index;
            img2FromLastAttempt = img2Index;
            img3FromLastAttempt = img3Index;

            AllImages[img1Index].shown++;
            AllImages[img2Index].shown++;
            AllImages[img3Index].shown++;
        } 
    }
    render3Images();
    
    
    img1.addEventListener('click',OnClick);
    img2.addEventListener('click',OnClick);
    img3.addEventListener('click',OnClick);
    
    
    
    
    function renderShow() {
        let index = document.createElement('button');
        index.textContent = 'Show Result';
        button.appendChild(index);
        
        document.getElementById("button").addEventListener("click", function() {
            let Indexlist ; 
            for (let i = 0; i < AllImages.length; i++) {
                Indexlist = document.createElement('li');
                result.appendChild(Indexlist);
                Indexlist.textContent=`${AllImages[i].name}  has ${AllImages[i].votes} votes`;
            }    
        });
        
    }
    
    
    function OnClick(event) {
        setImage();
        userAttemp++;
        if (userAttemp <= maxAttempts) {
            if (event.target.id === 'img1') {
                AllImages[img1Index].votes = AllImages[img1Index].votes + 1
            } else if (event.target.id === 'img2') {
                AllImages[img2Index].votes = AllImages[img2Index].votes + 1
            } else if(event.target.id === 'img3') {
                AllImages[img3Index].votes = AllImages[img3Index].votes + 1
            }
            render3Images();
        }
        else {
            img1.removeEventListener('click', OnClick);
            img2.removeEventListener('click', OnClick);
            img3.removeEventListener('click', OnClick);
            renderShow();
            
        }
}
getImage();