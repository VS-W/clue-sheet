const translations = {
	"page-title": {
		"en": "Clue Sheet",
		"fr": "Feuille Cluedo"
	},
	"instructions-title": {
		"en": "Instructions",
		"fr": "Instructions"
	},
	"instructions-main": {
		"en": "Select the number of players in the game and enter their initials in the appropriate boxes.<br>If you enter 2 players only, the sheet assumes that you are playing with the standard two player rules of having 4 of the cards distributed on the board and automatically generates another column for these \"board\" cards.",
		"fr": "Sélectionnez le nombre de joueurs et entrez leurs initiales dans les champs appropriés.<br>Si vous entrez seulement 2 joueurs, la feuille appliquera la règle standard à deux joueurs avec 4 cartes placées sur le plateau et générera automatiquement une colonne pour ces cartes \"plateau\"."
	},
	"instructions-buttons": {
		"en": "Click a cell once to mark an \"X\".<br>Click it again to mark a \"?\".<br>Third click marks it as \"-\".<br>Another click will clear the cell.",
		"fr": "Cliquez une fois sur une case pour marquer un \"X\".<br>Cliquez à nouveau pour marquer un \"?\".<br>Le troisième clic marque un \"-\".<br>Un autre clic effacera la case."
	},
	"instructions-click-headings": {
		"en": "You can click on a suspect/weapon/location to highlight it, e.g. to indicate it's a card you've already shown.",
		"fr": "Vous pouvez cliquer sur un suspect/arme/lieu pour le surligner, par exemple pour indiquer une carte que vous avez déjà montrée."
	},
	"instructions-undo-redo": {
		"en": "Undo and redo buttons across the top of the page.<br>Reset button at the bottom of the page.",
		"fr": "Boutons Annuler et Rétablir en haut de la page.<br>Bouton Réinitialiser en bas de la page."
	},
	"number-of-players-text": {
		"en": "# of Players:",
		"fr": "Nombre de joueurs:"
	},
	"generate-text": {
		"en": "Generate",
		"fr": "Générer"
	},
	"reset-text": {
		"en": "RESET",
		"fr": "RÉINITIALISER"
	},
	"initials-of-player": {
		"en": "Initials of Player",
		"fr": "Initiales du joueur"
	},
	"sheetData": {
		"sheetHeadings": {
			"suspects": {
				"en": "suspects"
			},
			"weapons": {
				"en": "weapons"
			},
			"locations": {
				"en": "locations"
			},
		},
		"suspects": {
			"Green": {
				"en": "Green",
				"fr": "Olive"
			},
			"Mustard": {
				"en": "Mustard",
				"fr": "Moutarde"
			},
			"Peacock": {
				"en": "Peacock",
				"fr": "Pervenche"
			},
			"Plum": {
				"en": "Plum",
				"fr": "Violet"
			},
			"Scarlet": {
				"en": "Scarlet",
				"fr": "Rose"
			},
			"White": {
				"en": "White",
				"fr": "Leblanc" }
		},
		"weapons": {
			"Candle Stick": {
				"en": "Candle Stick",
				"fr": "Chandelier"
			},
			"Dagger": {
				"en": "Dagger",
				"fr": "Poignard"
			},
			"Lead Pipe": {
				"en": "Lead Pipe",
				"fr": "Tuyau"
			},
			"Revolver": {
				"en": "Revolver",
				"fr": "Revolver"
			},
			"Rope": {
				"en": "Rope",
				"fr": "Corde"
			},
			"Wrench": {
				"en": "Wrench",
				"fr": "Clé" }
		},
		"locations": {
			"Ballroom": {
				"en": "Ballroom",
				"fr": "Salle de reception"
			},
			"Billiard Room": {
				"en": "Billiard Room",
				"fr": "Salle de billard"
			},
			"Conservatory": {
				"en": "Conservatory",
				"fr": "Jardin d'hiver"
			},
			"Dining Room": {
				"en": "Dining Room",
				"fr": "Salle à manger"
			},
			"Hall": {
				"en": "Hall",
				"fr": "Entrée"
			},
			"Kitchen": {
				"en": "Kitchen",
				"fr": "Cuisine"
			},
			"Library": {
				"en": "Library",
				"fr": "Bibliothèque"
			},
			"Lounge": {
				"en": "Lounge",
				"fr": "Sallon"
			},
			"Study": {
				"en": "Study",
				"fr": "Bureau"
			}
		}
	}
};

function translate() {
	document.title = translations["page-title"][currentLanguage] || translations["page-title"]["en"];
	const translateElements = ["page-title", "instructions-title", "instructions-main", "instructions-buttons", "instructions-click-headings", "instructions-undo-redo", "number-of-players-text", "generate-text", "reset-text"];
	translateElements.forEach(id => {
		document.querySelector("#" + id).innerHTML = translations[id][currentLanguage] || translations[id]["en"];
	})
}

function getTemplate(numberOfPlayers) {
	let template = {};
	for (heading in translations["sheetData"]["sheetHeadings"]) {
		let category = translations["sheetData"]["sheetHeadings"][heading][currentLanguage] || translations["sheetData"]["sheetHeadings"][heading]["en"];
		template[category] = {};
		for (item in translations["sheetData"][heading]) {
			template[category][translations["sheetData"][heading][item][currentLanguage] || translations["sheetData"][heading][item]["en"]] = {
				"cells": Array(numberOfPlayers).fill(0),
				"shown": false
			}
		}
	}
	return template;
}

function toggleCell(block, text, column) {
	writeDataToIndexedDB(data);

	switch (data[block][text].cells[column]) {
		case 0:
			data[block][text].cells[column] = 1;
			break;
		case 1:
			data[block][text].cells[column] = 2;
			break;
		case 2:
			data[block][text].cells[column] = 3;
			break;
		case 3:
			data[block][text].cells[column] = 0;
			break;
	}

	refreshCells(block);
}

function refreshCells(block) {
	if (readValueFromLocalStorage("sheetActive")) {
		if (block) {
			const targets = Object.keys(data[block]);
			let marked = 0;
			targets.forEach(target => {
				if (data[block][target].shown) {
					document.getElementById(toID(target)).classList.add("shown");
				} else {
					document.getElementById(toID(target)).classList.remove("shown");
				}
	
				if (data[block][target].cells.includes(1)) {
					document.getElementById(toID(target)).classList.add("invalid");
					marked++;
				} else {
					document.getElementById(toID(target)).classList.remove("invalid");
				}
	
				if (data[block][target].cells.includes(3)) {
					document.getElementById(toID(target)).classList.add("possiblyValid");
				} else {
					document.getElementById(toID(target)).classList.remove("possiblyValid");
				}
	
				for (let i = 0; i < data[block][target].cells.length; i++) {
					const element = document.getElementById(toID(target + i));
					switch (data[block][target].cells[i]) {
						case 0:
							element.textContent = " ";
							break;
						case 1:
							element.textContent = "❌";
							break;
						case 2:
							element.textContent = "❓";
							break;
						case 3:
							element.textContent = "➖";
							break;
					}
				}
	
				document.getElementById(toID(target)).classList.remove("valid");
			});
	
			if (marked == targets.length - 1) {
				targets.forEach(target => {
					if (!document.getElementById(toID(target)).classList.contains("invalid")) {
						document.getElementById(toID(target)).classList.add("valid");
					}
				});
			}
		} else {
			Object.keys(data).forEach(block => {
				refreshCells(block);
			});
		}
	}
}

function toID(str) {
	// remove all whitespace and make lowercase for stable IDs
	return str.toLowerCase().replace(/\s+/g, "");
}

function generateRows(block, columns) {
	return Object.keys(data[block]).map(text => {
		const row = document.createElement("tr");
		const cell = document.createElement("td");
		cell.textContent = text;
		cell.addEventListener("click", () => {
			writeDataToIndexedDB(data);

			data[block][text].shown = !data[block][text].shown;
			refreshCells(block);
		});
		cell.id = toID(text);
		row.appendChild(cell);
		for (let i = 0; i < columns; i++) {
			const clickableCell = document.createElement("td");
			clickableCell.classList.add("clickableCell");
			clickableCell.addEventListener("click", () => {
				toggleCell(block, text, i);
			});
			clickableCell.id = toID(text + i);
			row.appendChild(clickableCell);
		}

		return row;
	});
}

function generateSheet() {
	const numberOfPlayers = parseInt(document.getElementById("numUsers").value);
	const playerInitialsInput = Array.from(document.querySelectorAll("#userFormContainer .userEntry")).map(entry => {
		return entry.querySelector("input").value;
	});
	const sheet = document.querySelector("#sheet");
	document.querySelector("#sheet").classList.remove("hidden");
	document.getElementById("undoButton").classList.remove("hidden");
	document.getElementById("redoButton").classList.remove("hidden");
	document.getElementById("resetButton").classList.remove("hidden");
	document.getElementById("instructions").classList.add("hidden");

	writeValueToLocalStorage("numberOfPlayers", numberOfPlayers);
	writeValueToLocalStorage("playerInitialsInput", playerInitialsInput);

	let colCount = numberOfPlayers;
	let boardRule = false;
	if (numberOfPlayers == 2) {
		colCount = 3;
		boardRule = true;
	}

	// create data structure with the correct number of columns
	data = getTemplate(colCount);

	document.querySelector(".userEntryContainer").classList.add("hidden");
	sheet.innerHTML = "";

	Object.keys(data).forEach(block => {
		const headerRow = document.createElement("tr");
		const headerCell = document.createElement("td");
		headerCell.textContent = block;
		headerRow.appendChild(headerCell);
		sheet.appendChild(headerRow);
		headerRow.classList.add("headerRow");
		
		generateRows(block, colCount).forEach(child => sheet.appendChild(child));
	});
	
	// Append player initials to every header row so columns align
	const headerRows = Array.from(document.querySelectorAll(".headerRow"));
	for (let i = 0; i < colCount; i++) {
		headerRows.forEach(headerRow => {
			const playerInitial = document.createElement("td");
			playerInitial.classList.add("playerInitial");
			playerInitial.textContent = playerInitialsInput[i] || "";
			headerRow.appendChild(playerInitial);
		});
	}

	if (boardRule) {
		headerRows.forEach(headerRow => {
			const lastPlayerInitialBox = Array.from(headerRow.querySelectorAll(".playerInitial"))[colCount - 1];
			lastPlayerInitialBox.textContent = "B";
			lastPlayerInitialBox.classList.add("playerInitialBoard");
		});
	}

	writeValueToLocalStorage("sheetActive", true);
}

function generateInitialsForm() {
	let numUsers = parseInt(document.getElementById("numUsers").value);

	if (numUsers < 2) {
		numUsers = 2;
		document.getElementById("numUsers").value = 2;
	}
	const userFormContainer = document.getElementById("userFormContainer");

	userFormContainer.innerHTML = "";

	for (let i = 0; i < numUsers; i++) {
		const userEntry = document.createElement("div");
		userEntry.className = "userEntry";
		userEntry.innerHTML = `
			<label for="user${i}">${translations["initials-of-player"][currentLanguage] || translations["initials-of-player"]["en"]} ${i + 1}:</label>
			<input type="text" id="user${i}" name="user${i}">
		`;
		userFormContainer.appendChild(userEntry);
	}
}

function prefill() {
	if (readValueFromLocalStorage("numberOfPlayers")) {
		document.querySelector("#numUsers").value = readValueFromLocalStorage("numberOfPlayers");
		generateInitialsForm();
	}

	if (readValueFromLocalStorage("sheetActive")) {
		const initialFields = Array.from(document.querySelectorAll("#userFormContainer .userEntry")).map(entry => {
			return entry.querySelector("input");
		});

		const initials = readValueFromLocalStorage("playerInitialsInput");
		for (let i = 0; i < initials.length; i++) {
			initialFields[i].value = initials[i];
		}

		generateSheet();
		currentPosition = parseInt(readValueFromLocalStorage("currentPosition"));
		
		indexedDB.open(dbName, 1).onsuccess = function (event) {
			const db = event.target.result;
			const transaction = db.transaction(storeName, "readonly");
			const store = transaction.objectStore(storeName);
			store.count().onsuccess = function (event) {
				const count = event.target.result;
				if (currentPosition == count) {
					getDBEntry(currentPosition - 1);
				} else {
					getDBEntry(currentPosition - 1);
				}
			};
		};
	}
}

function writeDataToIndexedDB(newData) {
	const request = indexedDB.open(dbName, 1);

	request.onsuccess = function (event) {
		const db = event.target.result;
		const store = db.transaction(storeName, "readwrite").objectStore(storeName, { autoIncrement: true });
		store.put(newData, currentPosition).onsuccess = function (event) {
			currentPosition++;
			writeValueToLocalStorage("currentPosition", currentPosition);
			refreshCells();
			
			store.count().onsuccess = function (event) {
				const count = event.target.result;
				if (currentPosition != count) {
					for (let i = currentPosition; i < count; i++) {
						store.delete(i);
					}
				}
			};
		};
	};

	request.onupgradeneeded = function (event) {
		const db = event.target.result;
		db.createObjectStore(storeName, { autoIncrement: true });
	};
}

function undo() {
	indexedDB.open(dbName, 1).onsuccess = function (event) {
		const db = event.target.result;
		const transaction = db.transaction(storeName, "readonly");
		const store = transaction.objectStore(storeName);
		store.count().onsuccess = function (event) {
			const count = event.target.result;
			if (count > 1 && currentPosition == count) {
				currentPosition--;
				writeValueToLocalStorage("currentPosition", currentPosition);
				getDBEntry(currentPosition - 1);
			} else if (currentPosition - 2 >= 0) {
				currentPosition--;
				writeValueToLocalStorage("currentPosition", currentPosition);
				getDBEntry(currentPosition - 1);
			}
		};
	};
}

function redo() {
	indexedDB.open(dbName, 1).onsuccess = function (event) {
		const db = event.target.result;
		const transaction = db.transaction(storeName, "readonly");
		const store = transaction.objectStore(storeName);
		store.count().onsuccess = function (event) {
			const count = event.target.result;
			if (currentPosition < count) {
				getDBEntry(currentPosition);
				currentPosition++;
				writeValueToLocalStorage("currentPosition", currentPosition);
			} 
		};
	};
}

function resetSheet() {
	writeValueToLocalStorage("sheetActive", false);
	document.querySelector(".userEntryContainer").classList.remove("hidden");
	document.querySelector("#sheet").classList.add("hidden");
	document.getElementById("undoButton").classList.add("hidden");
	document.getElementById("redoButton").classList.add("hidden");
	document.getElementById("resetButton").classList.add("hidden");
	document.getElementById("instructions").classList.remove("hidden");
}

function clearIndexedDB() {
	indexedDB.open(dbName, 1).onsuccess = function (event) {
		const db = event.target.result;

		const transaction = db.transaction(storeName, "readwrite");
		transaction.onerror = (event) => {
			const error = event.target.error;
			if (error.name === 'NotFoundError') {
				event.preventDefault();
				currentPosition = 1;
				writeValueToLocalStorage("currentPosition", currentPosition);
				resetSheet();
			}
		};

		const store = transaction.objectStore(storeName);

		const clearRequest = store.clear();
		clearRequest.onsuccess = function (event) {
			data = getTemplate(readValueFromLocalStorage("numberOfPlayers"));
			const putRequest = store.put(data, 0);
			putRequest.onsuccess = function (event) {
				currentPosition = 1;
				writeValueToLocalStorage("currentPosition", currentPosition);
				resetSheet();
			};
		};
	};
}

function getDBEntry(id) {
	indexedDB.open(dbName, 1).onsuccess = function (event) {
		const db = event.target.result;
		db.transaction(storeName, "readonly").objectStore(storeName).get(id).onsuccess = function (event) {
			data = event.target.result;
			refreshCells();
		};
	};
}

function getLastDBEntry() {
	indexedDB.open(dbName, 1).onsuccess = function (event) {
		const db = event.target.result;
		const store = db.transaction(storeName, "readonly").objectStore(storeName);
		store.count().onsuccess = function (event) {
			const count = event.target.result - 1;
			store.get(count).onsuccess = function (event) {
				const lastElement = event.target.result;
				if (count > 0) {
					currentPosition = count + 1;
					writeValueToLocalStorage("currentPosition", currentPosition);
					data = lastElement;
					refreshCells();
				} else {
					writeDataToIndexedDB(data);
				}
			};
		};
	};
}

function writeValueToLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function readValueFromLocalStorage(key) {
	const stored = localStorage.getItem(key);
	if (stored) {
		return JSON.parse(stored);
	} else {
		return null;
	}
}

function setLanguage(lang) {
	clearIndexedDB();
	currentLanguage = lang;
	writeValueToLocalStorage("language", currentLanguage)
	translate();
	generateInitialsForm();
}

let currentLanguage = readValueFromLocalStorage("language") || "en";
let data = getTemplate(3);
let currentPosition = 0;
const dbName = "database";
const storeName = "dataStore";

document.addEventListener("DOMContentLoaded", () => {
	translate();
	generateInitialsForm();

	document.getElementById("numUsers").addEventListener("change", generateInitialsForm);
	document.getElementById("generateButton").addEventListener("click", generateSheet);
	document.getElementById("undoButton").addEventListener("click", undo);
	document.getElementById("redoButton").addEventListener("click", redo);
	document.getElementById("resetButton").addEventListener("click", clearIndexedDB);
	document.getElementById("translate-en").addEventListener("click", () => {
		setLanguage("en");
	});
	document.getElementById("translate-fr").addEventListener("click", () => {
		setLanguage("fr");
	});
	
	prefill();
});
