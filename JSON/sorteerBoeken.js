
//const url = "boeken.json";

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
  if(this.readyState==4 && this.status == 200){
    sorteerBoekObj.data = JSON.parse(this.responseText);
    sorteerBoekObj.voegJSdatumIn();
    sorteerBoekObj.sorteren();
  }
}
xmlhttp.open('GET', "boeken.json", true);
xmlhttp.send();

const maakTabelKnop = (arr) => {
  let knop = "<table class='boekSelectie'><tr>";
  arr.forEach((item) => {
    knop += "<th>" + item + "</th>"
  });
  knop += "</tr>";
  return knop;
}
////////////
const maakTabelRij = (arr, accent) => {
  let rij = "";
  if(accent ==true){
    rij = "<tr class='boekSelectie__rij--accent'>";
  }else {
    rij = "<tr class='boekSelectie__rij'>";
  }
//////
  arr.forEach((item) => {
    rij += "<td class='boekSelectie__data-cel'>" + item + "</td>"
  });
  rij += "</tr>";
  return rij;
}
///////////////////////////////////////////
const geefMaandNummer = (maand) => {
  let nummer;
  switch (maand) {
    case "januari":   nummer = 0; break;
    case "febuari":   nummer = 1; break;
    case "maart":     nummer = 2; break;
    case "april":     nummer = 3; break;
    case "mei":       nummer = 4; break;
    case "juni":      nummer = 5; break;
    case "juli":      nummer = 6; break;
    case "augustus":  nummer = 7; break;
    case "september": nummer = 8; break;
    case "oktober":   nummer = 9; break;
    case "november":  nummer = 10; break;
    case "december":  nummer = 11; break;
    default: nummer = 0

  }
  return nummer;
}



const maakJSdatum = (maandJaar) => {
  let mjArray = maandJaar.split(" ");
  let datum = new Date(mjArray[1], geefMaandNummer(mjArray[0]));
  return mjArray;
}

const maakOpsomming = (array) => {
  let string = "";
  for (let i=0; i<array.length; i++) {
    switch (i) {
      case array.length-1 : string += array[i]; break;
      case array.length-2 : string += array[i] + " en "; break;
      default: string += array[i] + ", ";
    }
  }
  return string;
}


////////////////////////////////

let sorteerBoekObj = {
  data: "",

  kenmerk: "titel",

  oplopend: 1,

  ////////////////////////////////////////////////////////////////////////////////
  voegJSdatumIn: function() {
    this.data.forEach((item) => {
      item.jsDatum = maakJSdatum(item.uitgave);
    });
  },

    sorteren: function() {
    this.data.sort( (a,b) => a[this.kenmerk] > b[this.kenmerk] ? 1*this.oplopend : -1*this.oplopend );
    this.uitvoeren(this.data);
  },

  uitvoeren: function(data) {
    let uitvoer = maakTabelKnop(
      ["titel",
       "auteur(s)",
       "cover",
       "uitgave",
       "bladzijden",
       "prijs",
       "stars",
       "taal",
       "EAN"]);
    for( let i=0; i<data.length; i++){
      let accent = false;
      i%2 == 0 ? accent = true : accent = false;
      let imgElement =
      "<img src='"
      + data[i].cover +
      "' class='boekSelectie__cover' alt='" +
      data[i].titel+
       "'>";
       //////////////////////////////////////////
       let auteurs = maakOpsomming(data[i].auteur);
      uitvoer += maakTabelRij(
        [data[i].titel,
        auteurs,
        imgElement ,
        data[i].uitgave,
        data[i].paginas,
        data[i].prijs,
        data[i].fame,
        data[i].taal,
        data[i].ean], accent);

    }
    document.getElementById('uitvoer').innerHTML = uitvoer;
  }
}
document.getElementById('kenmerk').addEventListener('change', (e) => {
  sorteerBoekObj.kenmerk = e.target.value;
  sorteerBoekObj.sorteren();
});

document.getElementsByName('oplopend').forEach((item) => {
   item.addEventListener('click', (e)=> {
     sorteerBoekObj.oplopend = parseInt(e.target.value);
     sorteerBoekObj.sorteren();
   })
})
