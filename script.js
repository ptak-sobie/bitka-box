
//////////////////////////// INITIALIZATIONS ////////////////////////////

//creatures container
const crs = document.getElementById('creatures');

//creature cell indices
let initIndex = 0, nameIndex     = 1,
hpIndex       = 2, dmgIndex      = 3,
acIndex       = 4, legResIndex   = 5,
regenIndex    = 6, notesIndex      = 7;
const indices = ['initIndex','nameIndex','hpIndex','dmgIndex','acIndex','legResIndex','regenIndex','notesIndex'];

//monsters to choose from, w/ data
//Legs: Actinium, Aluminum, Americium
//Slots: Argon
const monOptions = [
  {
    dex: 1,
    regen: true, name: "Actinium",
    slots: [0], maxHp: "3d12+15",
    legRes: 4, legActs: 3, ac: 20,
},{
    dex: 1,
    regen: true, name: "Aluminum",
    slots: [0], maxHp: "5d8+20",
    legRes: 4, legActs: 2, ac: 18,
},{
    dex: 5,
    regen: true, name: "Americium",
    slots: [0], maxHp: "4d6+10",
    legRes: 4, legActs: 1, ac: 11,
},{
    dex: 2,
    regen: true, name: "Antimony",
    slots: [0], maxHp: "3d10+12",
    legRes: 4, legActs: 0, ac: 15,
},{
    dex: 1,
    regen: true, name: "Argon",
    slots: [0,4,4,4,3,3,2,2,1,1], 
    maxHp: "2d6+18", legRes: 4, legActs: 0, ac: 19,
},{
    dex: 4,
    regen: true, name: "Arsenic",
    slots: [0], maxHp: "6d8+15",
    legRes: 4, legActs: 0, ac: 18,
},{
    dex: 5,
    regen: true, name: "Astatine",
    slots: [0], maxHp: "2d10+8",
    legRes: 4, legActs: 0, ac: 11,
},{
    dex: 1,
    regen: true, name: "Barium",
    slots: [0], maxHp: "4d8+10",
    legRes: 4, legActs: 0, ac: 16,
},{
    dex: 4,
    regen: true, name: "Berkelium",
    slots: [0], maxHp: "3d6+20",
    legRes: 4, legActs: 0, ac: 13,
},{
    dex: 5,
    regen: true, name: "Beryllium",
    slots: [0], maxHp: "5d6+25",
    legRes: 4, legActs: 0, ac: 17,
},{
    dex: 5,
    regen: true, name: "Bismuth",
    slots: [0], maxHp: "4d10+20",
    legRes: 4, legActs: 0, ac: 18,
},{
    dex: 3,
    regen: true, name: "Boron",
    slots: [0], maxHp: "2d4+8",
    legRes: 4, legActs: 0, ac: 11,
},{
    dex: 2,
    regen: true, name: "Bromine",
    slots: [0], maxHp: "3d6+5",
    legRes: 4, legActs: 0, ac: 11,
},{
    dex: 3,
    regen: true, name: "Cadmium",
    slots: [0], maxHp: "5d8+10",
    legRes: 4, legActs: 0, ac: 19,
},{
    dex: 5,
    regen: true, name: "Calcium",
    slots: [0], maxHp: "3d6+15",
    legRes: 4, legActs: 0, ac: 10,
},{
    dex: 5,
    regen: true, name: "Californium",
    slots: [0], maxHp: "6d10+25",
    legRes: 4, legActs: 0, ac: 19,
},{
    dex: 2,
    regen: true, name: "Carbon",
    slots: [0], maxHp: "4d8+10",
    legRes: 4, legActs: 3, ac: 16,
},{
    dex: 5,
    regen: true, name: "Cerium",
    slots: [0], maxHp: "5d10+15",
    legRes: 4, legActs: 0, ac: 19,
},{
    dex: 5,
    regen: true, name: "Cesium",
    slots: [0], maxHp: "2d6+10",
    legRes: 4, legActs: 0, ac: 11,
},{
    dex: 2,
    regen: true, name: "Chlorine",
    slots: [0], maxHp: "4d8+10",
    legRes: 4, legActs: 0, ac: 11
}
];

//monsters, names only
const monNames = [];
for (i=0;i<monOptions.length;i++) {
  monNames.push(monOptions[i].name);
}

//PC List
const pcOptions = [{
  regen: true, name: 'PC 1',
  ac: 10,
  active: true
  },{
  regen: true, name: 'PC 2',
  ac: 15,
  active: true
  },{
  regen: true, name: 'PC 3',
  ac: 20,
  active: true
  }
];

//populate pcs menu
populatePCsMenu();
//New Monster Input Field
makeAutofill(document.getElementById('newMonster'),monNames);
//Creature Header
const header = document.getElementById('creaturesHeader');
populateCrHeader();


//////////////////////////// EVENT LISTENERS ////////////////////////////

//Reset Encounter
document.getElementById('reset').addEventListener('click', function(e) {
  while (crs.children.length > 0) {
    crs.removeChild(crs.children.item(0));
  }
  document.getElementById('round').textContent = '0';
  document.getElementById('turnIndex').textContent = '0';
})

//Load PC's
document.getElementById('loadPCs').addEventListener('click', function(e) {
  for (let i=0;i<pcOptions.length;i++) {
    let pc = pcOptions[i];
    if (pc.active == true) {
      addCreature('pc',pc.name);
    }
  }
});

//Reveal/Hide PCs Menu ("Manage PC's")
document.getElementById('managePCs').addEventListener('click', function(e) {
  if (this.textContent == "Manage PC's") {
    document.getElementById('pcs').style = 'display: block';
    this.textContent = 'Close PC Menu';
  }
  else {
    document.getElementById('pcs').style = 'display: none';
    this.textContent = "Manage PC's";
  }
});

//Hide PCs Menu ("close")
document.getElementById('closePCs').addEventListener('click', function(e) {
  document.getElementById('pcs').style = 'display: none';
  document.getElementById('managePCs').textContent = "Manage PC's";
});

//Save New PC
document.getElementById('saveNewPC').addEventListener('click', function(e) {
  var name = document.getElementById('newPC');
  var ac = document.getElementById('ac');
  newPcRow([name.value,ac.value]);
  name.value = '';
  ac.value = '';
});

//Next Turn
document.getElementById('nextTurn').addEventListener('click', function(e) {
  let turn = document.getElementById('turnIndex'); //index # for creatures.children
  let round = document.getElementById('round');
  let initHavers = crs.getElementsByClassName('hasInit');
  //if the encounter hasn't started, make it the first creature's turn.
  if (parseInt(turn.textContent) == 0 && !initHavers[0].classList.contains('myTurn')) {
    round.textContent = 1;
    for (let i=0;i<initHavers.length;i++) {
      let cr = initHavers[i];
      if (!cr.classList.contains('dead')) {
        cr.classList.add('myTurn');
        break;
      }
    }
  }
  //if the encounter has already started...
  else {
    let loop = true;
    while (loop != false) {
      //iterate the turn index
      turn.textContent = parseInt(turn.textContent) + 1;
      //if the turn index is now greater than the greatest index value of creatures.children,
      //iterate the 'round' value and reset the turn index to zero.
      if (parseInt(turn.textContent) >= initHavers.length) {
        initHavers[parseInt(turn.textContent) - 1].classList.remove('myTurn');
        turn.textContent = 0;
        round.textContent = parseInt(round.textContent) + 1;
      }
      //otherwise, just remove the myTurn class from the previous creature.
      else {
        initHavers[parseInt(turn.textContent) - 1].classList.remove('myTurn');
      }

      let newTurnHaver = initHavers[parseInt(turn.textContent)];
      //add the myTurn class to the creature whose turn it is now
      if (!newTurnHaver.classList.contains('dead')) {
        newTurnHaver.classList.add('myTurn');
        loop = false;
      }
    }
  }
});


//////////////////////////// PAGE CONTROL FUNCTIONS ////////////////////////////

//function to make element autofill
function makeAutofill(inp,arr) {
  var currentFocus;
  inp.addEventListener("input", function(e){
    var itemContainer;
    var listContainer;
    let val = this.value;
    currentFocus = -1;
    /*close any already open lists of autocompleted values*/
    closeAutofills();
    if (!val) { return false;}
    /*create a DIV element that will contain the items (values):*/
    listContainer = document.createElement('div');
    listContainer.setAttribute("id", this.id + "autocomplete-list");
    listContainer.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(listContainer);
    /*for each item in the array...*/
    for (i=0;i<arr.length;i++) {
      
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        itemContainer = document.createElement('div');
        /*make the matching letters bold:*/
        itemContainer.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        itemContainer.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        itemContainer.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        
        itemContainer.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          let monName = this.getElementsByTagName("input")[0].value
          inp.value = monName;
          addCreature('mon',monName);
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAutofills();
          inp.value = '';
        })

        listContainer.appendChild(itemContainer);
      }
    }    
  });
  inp.addEventListener("dblclick", function(e) {
    var itemContainer;
    var listContainer;
    currentFocus = -1;
    closeAutofills();
    listContainer = document.createElement('div');
    listContainer.setAttribute("id", this.id + "autocomplete-list");
    listContainer.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(listContainer);
    for (i=0;i<arr.length;i++) {
        /*create a DIV element for each matching element:*/
        itemContainer = document.createElement('div');
        itemContainer.innerHTML = arr[i];
        /*insert a input field that will hold the current array item's value:*/
        itemContainer.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        
        itemContainer.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          let monName = this.getElementsByTagName("input")[0].value
          inp.value = monName;
          addCreature('mon',monName);
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAutofills();
          inp.value = '';
        })

        listContainer.appendChild(itemContainer);
    }    
  });

/*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.key == "ArrowDown") {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.key == "ArrowUp") { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.key == "Enter") {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAutofills(elmnt) {
    let autoLists = document.getElementsByClassName('autocomplete-items');
    for (i=0;i<autoLists.length;i++) {
      if (elmnt != autoLists[i] && elmnt != inp) {
        autoLists[i].parentNode.removeChild(autoLists[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAutofills(e.target);
  });
}

//add a new PC to the list of PC's
function newPcRow(pcArr) {
  const row = document.createElement('div');
  pcArr.push('<input type="checkbox" checked>');
  pcArr.push('<div class="centerAlign"><button class="deletePC">💀</button></div>');
  for (i=0;i<pcArr.length;i++) {
    cell = document.createElement('td');
    cell.innerHTML = pcArr[i];
    row.appendChild(cell);
  }
  var pcInputRow = document.getElementById('pcInputRow');
  var pcTable = pcInputRow.parentNode;
  pcTable.insertBefore(row,pcInputRow);
}

//populate the "manage pcs" menu
//based on the pcOptions array
function populatePCsMenu() {
  let pcTable = document.getElementById('pcs');
    
  //for each object in the PC List
  for (i = 0; i < pcOptions.length; i++) {
    let pcObj = pcOptions[i]; 
    let row, cell, butt;
    //create new row
    row = document.createElement('tr');
    //add 4 cells
    for (j = 0; j < 4; j++) {
      cell = document.createElement('td');
      row.appendChild(cell);
    }
    //Name
    cell = row.children[0];
    cell.textContent = pcObj.name;
    //AC
    cell = row.children[1];
    cell.textContent = pcObj.ac;
    //Active?
    cell = row.children[2];
    box = createCheckbox('checked');
    cell.appendChild(box);
    if (pcObj.active != true) {
      box.setAttribute('checked','false');
    }
    box.addEventListener('click',function(e) {
      pcObj.active = this.checked;
    });
    
    //Delete
    cell = row.children[3];
    butt = document.createElement('button');
    butt.textContent = '💀';
    cell.appendChild(butt);
    cell.classList.add('centerAlign');
    butt.addEventListener('click',function(e) {this.closest('tr').remove();});

    pcTable.appendChild(row);
  }
  pcTable.appendChild(document.getElementById('pcInputRow'));
  pcTable.appendChild(document.getElementById('closePCs'));
}

//////////////////////////// CREATURE FUNCTIONS ////////////////////////////

//add a creature to the encounter
//either monster or pc
function addCreature(which,crName) {
  
  //construct
  const crDiv = document.createElement('div');
  let row = document.createElement('div');
  row.classList.add('crRow','coreRow');
  crDiv.appendChild(row);
  for (let i=0;i<indices.length;i++) {
    let cell = document.createElement('div');
    cell.classList.add('crCell','coreCell','coreNug');
    row.appendChild(cell);
  }

  //get statblock object
  let obj = getStatblock(which,crName);

  //assign element properties & classes
  setCreatureProps(crDiv,which,obj);
  //populate cells
  populateCrCells(which,crDiv);

  //add to page
  crs.appendChild(crDiv);
  sortByInit();

  //spell slots 
  addSlots(crDiv);

  //add legendary actions
  if (obj.legActs != 0) {addLegs(crDiv);}

  return crDiv;
}

//add legendary actions to the initiative order
function addLegs(mon) {
  //for # of legendary actions...
  for (itty=0;itty<parseInt(mon.dataset.legActs);itty++) {
    //new div element
    let stolik = document.createElement('div');
    stolik.classList.add('hasInit','leg');
    //add row with 2 cells
    let row = document.createElement('div');
    row.classList.add('legRow');
    stolik.appendChild(row);
    for (let i=0;i<2;i++) {
      let cell = document.createElement('div');
      cell.classList.add('legCell');
      row.appendChild(cell);
    }
    
    //designators & make editable
    let cell = row.getElementsByClassName('legCell')[initIndex];
    stolik.setAttribute('data-init',`${roll('1d20')}`)
    cell.textContent = stolik.dataset.init;
    cell.classList.add('init-cell');
    makeEditable('init',cell);
    
    cell = row.getElementsByClassName('legCell')[nameIndex];
    cell.classList.add('legNickCell');
    cell.textContent = `${mon.dataset.name} Legendary Action`;
    makeEditable('default',cell);
    cell.style.width = `393px`;
    
    //add source
    stolik.setAttribute('data-source',mon.id);
    //finalize
    crs.appendChild(stolik);
  }
  sortByInit();
}

function addSlots(crDiv) {

  //get array of slot quantities from statblock
  let slotsArr = getStatblock('mon', crDiv.dataset.name).slots;

  //if cr has slots:
  if (slotsArr.length > 1) {

    //construct slot row w/ cells
    let slotRow = document.createElement('div');
    slotRow.classList.add('crRow','slotRow');
    //for each cell (10): header cell and 9 spell levels
    for (let i = 0; i < 10; i++) {
      let cell = document.createElement('div');
      cell.classList.add('crCell', 'slotCell');
      //for 2: each level cell gets 2 sub-cells
      for (let j = 0; j < 2; j++) {
        //header cell is different:
        if (i == 0 && j == 0) {
          cell.classList.add('slotHeader');
          cell.appendChild(document.createElement('div'));
          cell.textContent = 'Spell Slots';
        }
        //non-header cells:
        else if (i != 0) {
          cell.appendChild(document.createElement('div')); //runs both times in for loop
          if (j == 0) { //runs only first time: first sub-cell
            let subcell = cell.children[0];
            subcell.classList.add('slotSubCell', 'slotLvl');
            subcell.textContent = i; //level label
          }
          else if (j == 1) { //runs only second time: second sub-cell
            let subcell = cell.children[1];
            subcell.classList.add('slotSubCell', 'slotBoxes');
            let quant = slotsArr[i]; //quantity of slots for this level
            for (let k = 0; k < quant; k++) {
              let box = document.createElement('input');
              setAttributes(box, [['type', 'checkbox'], ['checked', 'true']]);
              subcell.appendChild(box);
            }
          }
        }
      }
      slotRow.appendChild(cell);
      crDiv.appendChild(slotRow);
    }
  }

  //add slot toggle
  let butt = document.createElement('button');
  butt.classList.add('slotToggle');
  crDiv.appendChild(butt);
  if (slotsArr.length == 1) {
    butt.textContent = 'No Spell Slots';
  }
  else {
    butt.textContent = "Show Spell Slots";
    butt.addEventListener('click',function(e) {
      if (crDiv.classList.contains('slotsHidden')) {
        crDiv.classList.remove('slotsHidden');
        this.textContent = 'Hide Spell Slots';
      }
      else {
        crDiv.classList.add('slotsHidden');
        this.textContent = 'Show Spell Slots';
      }
    });
  }

  
}

//generate a unique element id
//for a monster div
//based on statblock name
function generateMonId(name) {
  let mon, num, highest=0, /*iterators:*/ itty, 
  nameCamelized = camelize(name);
  newId = nameCamelized + '000';
  for (itty = 0; itty < crs.children.length; itty++) {
    mon = crs.children[itty];
    if (mon.classList.contains('creature')) {
      if (name == mon.dataset.name) {
        num = parseInt(mon.id.substring(mon.id.length-3));
        if (num>highest) {highest=num;}
      }
    }
  }
  let newHigh = highest+1;
  let highStr = newHigh.toString();
  switch (highStr.length) {
    case 2:
      highStr = '0'+highStr;
    case 1: 
      highStr = '00'+highStr;
  }
  return (nameCamelized+highStr);
}

//get key-value statblock object
//from 'monOptions' or 'pcOptions'
//based on creature name
function getStatblock(which,crName) {
  let arr, obj;
  switch (which) {
    case 'mon': {arr = monOptions; break;}
    case 'pc': {arr = pcOptions; break;}
  }
  for (let itty=0;itty<arr.length;itty++) {
    obj = arr[itty];
    if (obj.name.toUpperCase() == crName.toUpperCase()) {return obj;}
  }
  return null; 
}

//populate the cells of a new '.creature' div.
//@param {Element} crDiv - the div element to modify.
function populateCrCells(which,crDiv) {
  switch (which) {
    case 'mon': {
      
      //Populate Simple Values and Make Editable
      
      let cell = crDiv.getElementsByClassName('coreNug')[initIndex];  //init
      cell.textContent = crDiv.dataset.init;
      cell.classList.add('initNug');               
      makeEditable('init',cell);
      cell = crDiv.getElementsByClassName('coreNug')[nameIndex];      //name
      cell.textContent = crDiv.dataset.name;       
      cell.classList.add('nameNug');         
      makeEditable('name',cell);
      cell = crDiv.getElementsByClassName('coreNug')[hpIndex];        //HP
      cell.textContent = `HP: ${crDiv.dataset.currentHp}`;  
      cell.classList.add('hpNug'); 
      //don't make HP editable, use damage input cell.
      cell = crDiv.getElementsByClassName('coreNug')[acIndex];        //AC
      cell.textContent = `AC: ${crDiv.dataset.ac}`;     
      cell.classList.add('acNug');     
      makeEditable('ac',cell);
      if (crDiv.dataset.regen == 'true') {
        cell = crDiv.getElementsByClassName('crCell')[regenIndex];     //regen
        let box = createCheckbox('checked');
        box.classList.add('coreNug','regenNug');
        cell.appendChild(box);
        cell.classList.add('centerAlign');
      }

      //Damage Input
      
      let dmgInp = document.createElement('input');
      dmgInp.classList.add('coreNug','dmgNug');
      setAttributes(dmgInp, [['type', 'text'], ['class', 'damageInput'], ['placeholder', 'dmg']]);
      dmgInp.style.width = `40px`;
      dmgInp.addEventListener('keydown', function (e) {
        if (e.key == "Enter") {
          e.preventDefault();
          let dmg = parseInt(this.value);
          let cr = this.closest('.creature');
          cr.dataset.currentHp -= dmg;
          cr.getElementsByClassName('coreNug')[hpIndex].textContent = `HP: ${cr.dataset.currentHp}`;
          this.value = '';
          if (cr.dataset.currentHp <= 0) {
            cr.classList.remove('alive');
            cr.classList.add('dead');
          }
          else {
            cr.classList.remove('dead');
            cr.classList.add('alive');
          }
        }
      });
      cell = crDiv.getElementsByClassName('coreCell')[dmgIndex];
      cell.classList.remove('coreNug');
      cell.appendChild(dmgInp);
      cell.classList.add('centerAlign');

      //Legendary Resistances
      if (parseInt(crDiv.dataset.legRes) > 0) {
        let legResButton = document.createElement('button');
        legResButton.textContent = parseInt(crDiv.dataset.legRes);
        legResButton.classList.add('coreNug','legResNug');
        legResButton.addEventListener('click', function (e) {
          this.textContent = (parseInt(this.textContent) - 1).toString();
          if (parseInt(this.textContent) < 0) {
            this.textContent = this.closest('.monster').dataset.legRes;
          }
        });
        cell = crDiv.getElementsByClassName('coreCell')[legResIndex];
        cell.classList.remove('coreNug');
        cell.appendChild(legResButton);
        cell.classList.add('centerAlign');
      }

      //notes
      let inp = document.createElement('input');
      setAttributes(inp,[['type','text'],['placeholder','...']]);
      inp.style.width = 'minMax(70,auto)';
      cell = crDiv.getElementsByClassName('coreCell')[notesIndex];
      cell.appendChild(inp);
      

      break;
    }


    case 'pc': {
      let cell;
      //init
      cell = crDiv.getElementsByClassName('coreNug')[initIndex];
      cell.textContent = crDiv.dataset.init;
      cell.classList.add('initNug');
      makeEditable('init',cell);
      
      //name
      cell = crDiv.getElementsByClassName('coreNug')[nameIndex];
      cell.textContent = crDiv.dataset.name;
      cell.classList.add('nameNug');
      makeEditable('name',cell);

      //ac
      cell = crDiv.getElementsByClassName('coreNug')[acIndex];
      cell.textContent = `AC: ${crDiv.dataset.ac}`;
      cell.classList.add('acNug');
      makeEditable('ac',cell);
      cell.classList.add('combined');

      //skull button
      let butt = document.createElement('button');
      butt.textContent = '💀';
      butt.addEventListener('click', function(e) {
        let stolik = this.closest('.pc');
        if (stolik.classList.contains('dead')) { 
          stolik.classList.remove('dead');
        }
        else {
          stolik.classList.add('dead');
        }
      });
      cell = crDiv.getElementsByClassName('coreCell')[dmgIndex];
      cell.appendChild(butt);
      cell.classList.add('centerAlign','skullCell');
    }
  }
}

//add column headers to the encounter
function populateCrHeader() {

  header.classList.add('coreRow');
  
  //add six cells
  for (i=0;i<indices.length;i++) {
    let cell = document.createElement('div');
    cell.classList.add('crCell');
    header.appendChild(cell);
  }

  //populate
  let cells = header.getElementsByTagName('div');
  cells[initIndex].textContent = 'In.';
  cells[initIndex].classList.add('initCell');
  cells[nameIndex].textContent = 'Name';
  cells[nameIndex].classList.add('nameCell');
  cells[hpIndex].textContent = "HP";
  cells[hpIndex].classList.add('hpCell');
  cells[dmgIndex].textContent = "Damage";
  cells[dmgIndex].classList.add('dmgCell');
  cells[acIndex].textContent = "AC";
  cells[acIndex].classList.add('acCell');
  cells[legResIndex].textContent = "LRs";
  cells[legResIndex].classList.add('legResCell');
  cells[regenIndex].textContent = "♻️";
  cells[regenIndex].classList.add('regenCell');
  cells[notesIndex].textContent = 'Notes';
  cells[notesIndex].classList.add('notesCell');
}

//set properties for a '.creature' element
function setCreatureProps(elem,which,obj) {
  const arr = [];
  if (which == 'mon') {
    let id = generateMonId(obj.name);
    arr.push(
      ['id', id],
      ['data-init', `${roll(`1d20+${obj.dex}`)}`],     //init
      ['data-name', obj.name],                         //name
      ['data-maxHp', obj.maxHp],                       //rolled HP
      ['data-current-Hp', roll(obj.maxHp).toString()], //current HP
      ['data-ac', `${obj.ac}`],                        //ac
      ['data-nick', id],                               //nick
      ['data-leg-Acts', obj.legActs.toString()],       //legActs
      ['data-leg-Res',obj.legRes.toString()],          //legRes
      ['data-regen',obj.regen.toString()],             //regen
      ['data-slots',obj.slots.length.toString()],      //slots
      ['data-myturn','false']                          //turn tracker
    );
    elem.classList.add('hasInit','creature','monster','slotsHidden');
  }
  else if (which == 'pc') {
    arr.push(
      ['data-init','30'],                               //init
      ['data-name',obj.name],                           //name
      ['data-nick',obj.name],                           //nick
      ['data-ac',obj.ac.toString()],                    //ac
      ['data-myturn','false']                           //turn tracker
    );
    elem.classList.add('hasInit','creature','pc');
  }
  setAttributes(elem,arr);
}

//sort creatures in encounter by initiative
function sortByInit() {
  const crsArray = [];
  for (i=0;i<crs.children.length;i++) {
    crsArray.push(crs.children[i]);
  }
  crsArray.sort(function(a,b) {
    return (parseInt(b.dataset.init)-parseInt(a.dataset.init));
  });
  for (i=0;i<crsArray.length;i++) {
    crs.appendChild(crsArray[i]);
  }
}

//update a creature's nickname
//in its own element and in legendary action divs
function updateNick(stolik,newNick) {
  stolik.dataset.nick = newNick;
  let legs = crs.getElementsByClassName('leg');
  for (let i=0;i<legs.length;i++) {
    if (legs[i].dataset.source == stolik.id) {
      legs[i].getElementsByClassName('legNickNug')[0].textContent = `${newNick} Legendary Action`;
    }
  }
}

//////////////////////////// UTILITY FUNCTIONS ////////////////////////////

//make a name camel case
function camelize(name) {
  const arr = name.split('');
  const caml = []; let space = false;
  for (let itty = 0; itty < arr.length; itty++) {
    if (space == true) {
      if (arr[itty] == ' ') {
        space = true;
      }
      else {
        caml.push(arr[itty].toUpperCase());
        space = false;
      }
    }
    else {
      if (arr[itty] == ' ') {
        space = true;
      }
      else {
        caml.push(arr[itty].toLowerCase());
        space = false;
      }
    }
  }
  return caml.join('');
}

/*<<SET>>*/

//change an input element to a div element
function changeFromInput(inp) {
  let nug = inp.parentNode;
  nug.textContent = inp.value;
  inp.remove();
}

//@param {Element} nug - the element to change
//@param {String} which - either 'default','init','name','ac'...
function changeToInput(which,nug) {
  let newInp = document.createElement('input');
  newInp.setAttribute('type', 'text');
  newInp.value = nug.textContent;
  nug.textContent = '';
  newInp.style.width = '100%';
  nug.appendChild(newInp);
  newInp.select();
  
  switch (which) {
  
    //default
    case 'default': {
      newInp.addEventListener('keydown',function(e){
        if (e.key == 'Enter') {
          changeFromInput(this);
        }
      });
      newInp.addEventListener('focusout', function (e) {
        changeFromInput(this);
      }); break;
    }
    //init
    case 'init': {
      newInp.addEventListener('keydown', function (e) {
        if (e.key == "Enter") {
          this.closest('.hasInit').dataset.init = this.value;
          changeFromInput(this);
          sortByInit();
        }
      });
      newInp.addEventListener('focusout', function (e) {
        this.closest('.hasInit').dataset.init = this.value;
        changeFromInput(this);
        sortByInit();
      }); break;
    }
    //name
    case 'name': {
        newInp.addEventListener('keydown', function (e) {
          if (e.key == "Enter") {
            updateNick(this.closest('.creature'), this.value);
            changeFromInput(this);
          }
        });
        newInp.addEventListener('focusout', function (e) {
          this.closest('.creature').dataset.nick = this.value;
          changeFromInput(this);
        }); break;
    }
    //AC
    case 'ac': {
      newInp.value = newInp.value.substring(4);
      newInp.addEventListener('keydown', function (e) {
        if (e.key == "Enter") {
          this.closest('.creature').dataset.ac = this.value;
          this.value = `AC: ${this.value}`;
          changeFromInput(this);
        }
      });
      newInp.addEventListener('focusout', function (e) {
        this.closest('.creature').dataset.ac = this.value;
        this.value = `AC: ${this.value}`;
        changeFromInput(this);
      }); break;
    }
  }
  return newInp;
}

//@param {String} which - which version to run...
//one from: 'default','init','name','ac','pcName'
function makeEditable(which,elem) {
  elem.addEventListener('dblclick', function(e) {changeToInput(which,elem)});
}

/*<<END SET>>*/

//create a new checkbox element
function createCheckbox(checked) {
  let box = document.createElement('input');
  box.setAttribute('type','checkbox');
  if (checked) {
    box.setAttribute('checked','true');
  }
  return box;
}

//roll dice based on a formula like '4d6+12'
function roll(dice) {
  const operators = ['+','-','*','/'];
  const digits = ['0','1','2','3','4','5','6','7','8','9'];
  const chars = dice.split('');
  const unit = []; const units = [];

  //separate string into "units" of "-3d6" 
  //(optional operator, coefficient, optional dice denomination)
  //each unit is stored as an array of characters "unit"
  for (i=0;i<chars.length;i++) {
    if (operators.includes(chars[i]) == false) {
      unit.push(chars[i]);
    }
    //when for-loop reaches operator (+/-),
    //adds current "unit" array, which contains chars since beginning or last operator,
    //to "units" array, then wipes "unit" array for new one;
    //new unit starts with triggering operator.
    else if (operators.includes(chars[i])) {
      units.push(new Array());
      for (j=0;j<unit.length;j++) {
        units[units.length-1].push(unit[j]);
      }
      unit.length = 0;
      unit.push(chars[i]);
    }
  }
  units.push(new Array());
  for (j=0;j<unit.length;j++) {
    units[units.length-1].push(unit[j]);
  }
  if (units[units.length-1].length == 1 &&
  operators.includes(units[units.length-1][0])) {
    units[units.length-1].push('0');  
  }

  //intsToAdd: array to store all numbers that needed to be added together for final result
  //(individual rolls, bonuses)
  const intsToAdd = [];
  var c; const cArray = []; //coefficient: final int and array of digits
  var denom; //die denomination
  var dIndex; //location of letter 'd' within unit array

  //loop through "units" to parse each unit
  for (i=0;i<units.length;i++) {
    
    //beginning of unit, wipe these two:
    dIndex = null; cArray.length = 0;
    
    //loop through characters in unit
    //to find 'd', from which all other knowledge is derived
    for (j=0;j<units[i].length;j++) {
      if (units[i][j] == 'd') {
        dIndex = j;
        
        //the dice denomination is the number after 'd'
        if (units[i].length > j+2 && 
          digits.includes(units[i][j+2])) {
          
          if (units[i].length > j+3 &&
          digits.includes(units[i][j+3])) {
            //denom = parseInt(units[i][j+1].concat(units[i][j+2],units[i][j+3]));
            denom = units[i][j+1].concat(units[i][j+2],units[i][j+3]);
          }
          else {
            denom = parseInt(units[i][j+1].concat(units[i][j+2]));
          }
        }
        else {
          denom = parseInt(units[i][j+1]);
        }

        //add all chars in unit to the coefficient array, then convert to int
        for (k=0;k<dIndex;k++) {
          if (digits.includes(units[i][k])) {
            cArray.push(units[i][k]);
          }
        }
        c = parseInt(cArray.join());
        
        //roll die of denomination 'denom', 
        //number of times 'c'
        for (k=0;k<c;k++) {
          intsToAdd.push(Math.ceil(Math.random()*denom));
        }
      }
    }

    //if no char in unit is 'd',
    //unit is int not dice, so add whole unit to intsToAdd
    if (dIndex == null) {
      intsToAdd.push(parseInt(units[i].join('')));
    }
  }

  var result = 0;
  for (i=0;i<intsToAdd.length;i++) {
    result += intsToAdd[i];
  }
  return result;
}

//set the values for multiple attributes at once.
//@param {Element} el - the element you want to set attributes for.
//@param {Array} arr - a 2D array of [attribute,value] pairs.
function setAttributes(el,arr) {
  for (var itty=0;itty<arr.length;itty++) {
    let item1 = arr[itty][0];
    let item2 = arr[itty][1];
    el.setAttribute(item1,item2);
  }
}