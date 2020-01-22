function splitAllLines(allLines) {
  return allLines.split("\n")
}

function removeNonCharLines(charLines, charList) {
  let clearedCharLines = charLines.filter(line => {
    let isCharLine = false;
    for (let charName in charList) {
      let regxName = charList[charName].regxName;
      if (regxName.test(line)) {
        isCharLine = true;
      }
    }
    return isCharLine
  });
  return clearedCharLines
}

function createCharList(charArray) {
  let charList = charArray.reduce((allChars, charName) => {
    allChars[charName] = {};
    allChars[charName].regxName = new RegExp("^" + charName + "\\.");
    allChars[charName].lines = {};
    return allChars
  }, {});
  return charList
}

function assignDataToChars(charList, charLines) {
  let charListWithLines = {...charList};
  for (let i = 0; i < charLines.length; i++) {
    for (let charName in charListWithLines) {
      let char = charListWithLines[charName];
      if (char.regxName.test(charLines[i])) char.lines[i+1] = charLines[i];
    }
  }
  return charListWithLines
}

function createDOMforChar(charName, charListWithLines, parent) {
  clearParent(parent);

  let charHeader = document.createElement("h2");
  charHeader.innerText = `${charName}:`;
  parent.append(charHeader);

  let charLines = charListWithLines[charName].lines;
  for (let numLine in charLines) {
    let line = createDOMline(charLines[numLine], numLine);
    parent.append(line);
  }
}

function clearParent(parent) {
  parent.innerHTML = "";
}

function createDOMline(lineText, number) {
  let line = document.createElement("p");
  line.innerHTML = `${number}). ${lineText}`;
  return line
}

const charLines = splitAllLines(allLines);
const charList = createCharList(characters);

const clearedLines = removeNonCharLines(charLines, charList);
const charListWithLines = assignDataToChars(charList, clearedLines);

const charText = document.getElementById("char-text");
const selectedChar = document.getElementById("character");

createDOMforChar(selectedChar.value, charListWithLines, charText);

selectedChar.addEventListener("change", () => {
  let charName = selectedChar.value;
  createDOMforChar(charName, charListWithLines, charText);
});