lijst = ["Carmen", "Demi", "Wesley", "Jordy", "Gianni", "Steff", "Mustafa"];

lijst = lijst.sort((a,b) => a.length - b.length>0 ? 1 : -1 );

let uitvoer = "";
lijst.forEach((item) => {
  uitvoer += item + '<br>';
});
document.getElementById('uitvoer').innerHTML = uitvoer;
