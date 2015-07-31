var sounds= {
    "explosionShark": {
        "webURL": "https://www.freesound.org/people/thehorriblejoke/sounds/259962/",
        //"soundURL": "https://www.freesound.org/data/previews/259/259962_2463454-lq",
        "soundURL": "http://s1download-universal-soundbank.com/mp3/sounds/18591",
        "audio":""
    },
    "explosionBug": {
        "webURL": "https://www.freesound.org/people/timgormly/sounds/170144/",
        "soundURL": "https://www.freesound.org/data/previews/170/170144_2578041-lq",
        "audio":""
    },
    "laserShark": {
        "webURL": "https://www.freesound.org/people/TheDweebMan/sounds/277218/",
        "soundURL": "https://www.freesound.org/data/previews/277/277218_5324223-lq",
        "audio":""
    },
    "laserBug": {
        "webURL": "https://www.freesound.org/people/timgormly/sounds/170161",
        "soundURL": "https://www.freesound.org/data/previews/170/170161_2578041-lq",
        "audio":""
    }
};
function initSound(){
  for(var i in sounds){
    file = sounds[i];
    file.soundURL+=".mp3";
    //file.soundURL+=".ogg"
    file.audio = new Audio(file.soundURL);
  }
}
initSound();

//sounds[i]cloneNode(true).play();
