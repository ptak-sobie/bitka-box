//Creature Select Dropdown
var cCr = document.getElementById('chosenCr');
document.getElementById('creatures-dropdown').addEventListener('click', function(e) {
    if (cCr.textContent == 'selected') {
      cCr.textContent = 'selecting';
    }
    else if (cCr.textContent == 'selecting') {
      addCreature(this.options[this.selectedIndex].text);
      cCr.textContent = 'selected';
    }
});

/////// FUNCTIONS ///////

function addCreature(crName) {

  //initialize
  var cr;
  const tableContents = [];
  const crOptions = [
    {
      dex: 1,
      name: 'Red Dragon',
      hp: '12d10+20',
      ac: 15
    },{
      dex: 2,
      name: 'Green Dragon',
      hp: '13d10+30',
      ac: 17
    },{
      dex: 4,
      name: 'Blue Dragon',
      hp: '14d12+40',
      ac: 18
    },{
      dex: 6,
      name: 'Gold Dragon',
      hp: '16d12+60',
      ac: 20
    },{
      name: 'No Match'
    }
  ];
  
  for (i=0;i<crOptions.length;i++) {
    cr = crOptions[i];
    if (crOptions[i].name == crName) {
      break;
    }
  }

  //add newly-rolled instance to array
  tableContents[0] = roll(`1d20+${cr.dex}`);
  tableContents[1] = cr.name;
  tableContents[2] = roll(cr.hp);
  tableContents[3] = cr.ac;
  
  //assemble
  const crTable = document.createElement('table');
  for (i=0;i<tableContents.length;i++) {
    var cell = document.createElement('th');
    cell.textContent = tableContents[i];
  }
  document.getElementById('creatures').appendChild(crTable);
}

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
          intsToAdd.push(specDie(denom));
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
