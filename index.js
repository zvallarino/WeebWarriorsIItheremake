const baseURL = 'http://localhost:3000/'
let ImageAnchorTop = document.getElementById('image-line-top')
let ImageAnchorBottom = document.getElementById('image-line-bottom')
let startButton = document.getElementById('startbutton');
let buttonRSF = document.getElementById('buttonRSF');
let mainMenuButton = document.createElement('BUTTON');
let formNewCharacter = document.getElementById('charactercreationform');
let formNewMap = document.getElementById('mapcreationform');
mainMenuButton.textContent = 'Main Menu';
mainMenuButton.id = 'mainMenuButton'
mainMenuButton.className = 'redButtonsThatLookCool'

mainMenuButton.addEventListener('click', refreshPage)


function init(){
starter()
fetchObjects('characters')
}
// Starter function and Start button is unrelated to RSF button

function starter(){
  startButton.addEventListener('click',startFunction)}

function startFunction(event){
  document.getElementById('startbutton').remove();
  let mainMenu = document.createElement('div');
  let campaign = document.createElement('BUTTON');
  let versus = document.createElement('BUTTON');
  let training = document.createElement('BUTTON');
  let creation = document.createElement('BUTTON');
  let options  = document.createElement('BUTTON');
  let credits  = document.createElement('BUTTON');
  mainMenu.id = 'mainMenu';
  campaign.id = 'campaign';
  campaign.className = 'redButtonsThatLookCool';
  versus.id = 'versusMainMenu';
  versus.className = 'redButtonsThatLookCool';
  training.id = 'training';
  training.className = 'redButtonsThatLookCool';
  creation.id = 'creation';
  creation.className = 'redButtonsThatLookCool';
  options.id = 'options';
  options.className = 'redButtonsThatLookCool';
  credits.id = 'options';
  credits.className = 'redButtonsThatLookCool';
  campaign.textContent = 'CAMPAIGN';
  versus.textContent = 'VERSUS';
  versus.addEventListener('click', versusMode)
  training.textContent = 'TRAINING';
  creation.textContent = 'WORKSHOP';
  creation.addEventListener('click', creating)
  options.textContent = 'OPTIONS';
  credits.textContent = 'CREDITS ';
  mainMenu.append(campaign,versus,training,creation, options, credits)
  document.getElementById('startingPage').append(mainMenu)
  document.getElementById('startingPage').style.backgroundImage = "url('https://wallpaperaccess.com/full/1118941.jpg')"
}

// Starter function and Start button is unrelated to RSF button

function creating(){
  let createNewCharacter = document.createElement("BUTTON");
  createNewCharacter.textContent = 'Create New Character';
  createNewCharacter.id = 'createNewCharacter';
  createNewCharacter.className = 'redButtonsThatLookCool';
  createNewCharacter.addEventListener('click',buttoncreatingNewCharacter)
  let createNewMap = document.createElement("BUTTON");
  createNewMap.textContent = 'Create New Map';
  createNewMap.id = 'createNewMap';
  createNewMap.className = 'redButtonsThatLookCool';
  createNewMap.addEventListener('click',buttoncreatingMap)
  document.getElementById('mainMenu').replaceChildren();
  document.getElementById('mainMenu').append(createNewCharacter,createNewMap,mainMenuButton);
}

//Create New Character Function//

function buttoncreatingNewCharacter(){
  buttonRemoval();
  document.getElementById('charactercreationform').style.display ='flex';
  submitNewCharacter();
}

function submitNewCharacter(){
formNewCharacter.addEventListener('submit',(e)=>
{
  e.preventDefault();
  PostNewCharacter();
})
}

//Create New Map Function//

function buttoncreatingMap(){
  buttonRemoval();
  document.getElementById('mapcreationform').style.display ='flex';
  submitNewMap();

}


function submitNewMap(){
  formNewMap.addEventListener('submit',(e)=>
  {
    e.preventDefault();
    PostNewMap();
  })
  }

function buttonRemoval(){
  document.getElementById('createNewCharacter').remove()
  document.getElementById('createNewMap').remove() 
}

function versusMode(){
  document.getElementById('everything').style.display = 'flex';
  document.getElementById('mainMenu').style.display = 'none';
  document.getElementById('startingPage').style.display = 'none';
  document.getElementById('everything').style.backgroundImage = "url('https://i.pinimg.com/originals/92/ff/be/92ffbe4f4f8f6b5c5e4da77185c9ba17.png')"
}

//Ready //

buttonRSF.addEventListener('click',setRemoves)


function setRemoves (event){
  buttonRSF.textContent = 'SET';
  console.log(document.getElementById('image-line-bottom'))
  document.getElementById('image-line-bottom').replaceChildren();
  document.getElementById('image-line-top').replaceChildren();
  fetchMaps('maps')
}

function setFight(){
  buttonRSF.remove();
  let setFightBtn = document.createElement('BUTTON');
  setFightBtn.id = 'setFightBtn'
  setFightBtn.textContent ='FIGHT' 
  setFightBtn.addEventListener('click',()=>{
    console.log('its working')
  })
  document.getElementById('helpMeCenter').append(setFightBtn)

}

function fetchObjects (data){
  fetch(baseURL + data)
  .then(response => response.json())
  .then(objectXs => {
    objectXs.forEach((objectX)=>{
    generateCharCard(objectX,ImageAnchorTop,'charCardTop','playerTwoPic','red');
    }
    )
    //generates the top
    objectXs.forEach((objectX)=>{
    generateCharCard(objectX,ImageAnchorBottom,'charCardBottom','playerOnePic','blue');
    }
    )
  }
  )
  //generates the bottom
}

function generateCharCard (character,anchorOfImage,nameOfClass,nameOfPic,color) {
  let charCard = document.createElement('div');
  let imgOfChar = document.createElement('img');
  let nameOfChar = document.createElement('h3');
  charCard.className = nameOfClass;
  nameOfChar.textContent = character.name;
  imgOfChar.src = character.face;
  imgOfChar.alt = character.desc;
  charCard.append(imgOfChar, nameOfChar);
  anchorOfImage.append(charCard);
  charCard.addEventListener('click',()=>setMainChar(nameOfPic, character))
  charCard.addEventListener('click',() => highlightCard(nameOfClass,charCard,color))
  charCard.addEventListener('mouseover',() => highlightingFont(nameOfChar))
  charCard.addEventListener('mouseout',() => highlightingFontOff(nameOfChar))
}

function fetchMaps (data){
  fetch(baseURL + data)
  .then(response => response.json())
  .then(objectXs => {
    objectXs.forEach((objectX)=>{
      let charCard = document.createElement('div');
      let imgOfMap = document.createElement('img');
      imgOfMap.src = objectX.image;
      charCard.append(imgOfMap);
      charCard.className = 'maps';
      ImageAnchorBottom.append(charCard)
      charCard.addEventListener('click',() => clickFunctionForPictureofMap(objectX))
    });
  }
  )
}


function clickFunctionForPictureofMap (map){
    document.getElementById('versuspicture').src=map.image;
    let switchFromSetToFight = document.getElementById('buttonRSF')
    switchFromSetToFight.id = 'thisisthefightbutton'
    switchFromSetToFight.textContent = 'FIGHT'
    switchFromSetToFight.addEventListener('click', () =>fightButtonFunction(map))
    // document.getElementById('helpMeCenter').append(fightButton);
}

function fightButtonFunction (map){
  document.getElementById('image-line-bottom').replaceChildren();
  let mapSelected = map.image
  document.getElementById('everything').style.backgroundImage = `url(${mapSelected})`;
  document.getElementById('versuspicture').style.display = "none";
  document.getElementById('thisisthefightbutton').remove();
  let tussle = document.createElement('BUTTON');
  tussle.id = 'tussle';
  tussle.className = 'buttonsRSF';
  tussle.textContent = 'Tussle';
  document.getElementById('helpMeCenter').append(tussle);
  tussle.addEventListener('click',tussling)
  document.getElementById('image-line-bottom').remove()
}

function tussling (){
  tussle.remove();
  let runItBack = document.createElement('BUTTON');
  runItBack.id = 'runitback';
  runItBack.className = 'buttonsRSF';
  runItBack.textContent = 'Run It Back'
  let StartANewGame = document.createElement('BUTTON');
  StartANewGame.id = 'StartANewGame';
  StartANewGame.className = 'buttonsRSF';
  StartANewGame.textContent = 'Start A New Game'
  runItBack.addEventListener('click',()=>{
    console.log('bye')
  })
  StartANewGame.addEventListener('click',refreshPage);
  document.getElementById('helpMeCenter').append(runItBack,StartANewGame)
}

function refreshPage(){
  location.reload();
}





function highlightCard(nameOfLine,charCard,color){
  unhighlight(nameOfLine)
  charCard.style.border = `thick solid ${color}`
}

function unhighlight(nameOfLine){
  let cards = document.getElementsByClassName(nameOfLine);
  for (const card of cards) {
    card.style.border = "thick solid white"
  }
}

function setMainChar(pictureYouAreSetting, character){
  document.getElementById(pictureYouAreSetting).src = character.image;
}

function highlightingFont(nameOfChar){
  nameOfChar.style.background = 'yellow';

}
function highlightingFontOff(nameOfChar){
  nameOfChar.style.background = "white";
}



function PostNewCharacter(){
  let newName = document.getElementById('fname').value
  let newDesc = document.getElementById('descOfPerson').value
  let newfacePicture = document.getElementById('fpic').value
  let newfullBodyPicture = document.getElementById('bpic').value
  let newallegiance = document.getElementById('bpic').value

  let objectZZ = {
    name:newName,
    image:newfullBodyPicture,
    face:newfacePicture,
    desc:newDesc
  }

  fetch((baseURL+'characters'),{
    method:'POST',
    headers:{
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(objectZZ)
  })
  .then(response => response.json())
  .then(objectreturned =>console.log("Lets Go"))
}

function PostNewMap(){
  let newName = document.getElementById('mname').value
  let newDesc = document.getElementById('descMap').value
  let newImage = document.getElementById('lpic').value

  let objectZZ = {
    name:newName,
    image:newImage,
    desc:newDesc
  }

  fetch((baseURL+'maps'),{
    method:'POST',
    headers:{
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(objectZZ)
  })
  .then(response => response.json())
  .then(objectreturned =>console.log("Lets Go"))
}




// function setToPlayerOne()


init()