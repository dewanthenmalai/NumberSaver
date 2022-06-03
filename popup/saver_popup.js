function SaveTabs(textbox) {
	console.log("Saving");
	
	const urlRegex = /nhentai\.net\/g\/([0-9]{1,})/;
	var tablist = browser.tabs.query({currentWindow: true});
	var numberlist = [];
	
	for(let tab of tablist) {
		let match = urlRegex.exec(tab.url);
		if(match) {
			numberlist.push(match[1]);
		}
	}
	
	numberstring = numberlist.join("\n");
	textbox.value = numberstring;
}

function LoadTabs(textbox) {
	console.log("Loading");
	
	const check = /[0-9]{1,}/
	var urlSkeleton = "https://nhentai.net/g/";
	var rawtext = textbox.value;
	var numberlist = rawtext.split("\n");
	
	for(let number of numberlist) {
		if(check.test(number)) {
			let urlString = urlSkeleton + number + "/";
			browser.tabs.create({url:urlString});
		}
	}
}

function init(){
	console.log("loaded");
	
	const saveButton = document.getElementById("savebutton");
	const loadButton = document.getElementById("loadbutton");
	const textBox = document.getElementById("numberbox");
	
	saveButton.addEventListener("click", (e) => SaveTabs(textBox));
	loadButton.addEventListener("click", (e) => LoadTabs(textBox));
}

window.onload = init;