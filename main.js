var brings = {}
var bringbox = document.getElementById("bring")
if (window.location.href.includes('?')) {
	bringbox.value = decodeURI(window.location.href.slice(window.location.href.indexOf("?") + 1, window.location.href.length))
}

function run(code) {
	if (!code) {
		return "";
	}
	var c = firstSpaceSplit(code)[0].toLowerCase()
	var text = firstSpaceSplit(code)[1]
	if (brings[c] != undefined) {
		brings[c](text)
	} else {
		output("It seems the bring (command) ‘" + c.replace(/</g, "&lt;") + "’ hasn't been added yet.")
	}
}

function firstSpaceSplit(string) {
	if (string.includes(" ")) {
		return [string.slice(0, string.indexOf(" ")), string.slice(string.indexOf(" ") + 1, string.length)]
	}
	return [string, ""]
}

function add(name, funct) {
	brings[name] = funct
}

function output(text) {
	var m = document.createElement("message")
	m.innerHTML = text
	m.onclick = () => {
		event.target.remove()
	}
	document.getElementById('messages').appendChild(m)
}

function popup(title, text) {
	var win = document.createElement("window")
	win.innerHTML = title.replace(/</g, "&lt;")
	var cl = document.createElement("i")
	cl.classList.add("fa")
	cl.classList.add("fa-times")
	cl.classList.add("win-close")
	cl.style.float = "right"
	cl.style.display = "block"
	cl.onclick = (event) => {
		event.target.parentNode.remove()
		//console.log(event.target.parentNode)
	}
	var code = document.createElement("div")
	code.innerHTML = text
	document.getElementById("windows").appendChild(win)
	win.appendChild(cl)
	win.appendChild(code)
}
add("clog", (l) => {
	console.log(l)
})
add("d", (term) => {
	window.location = "https://duckduckgo.com/?q=" + encodeURI(term)
})
add("g", (term) => {
	window.location = "https://google.com/search?q=" + encodeURI(term)
})
add("go", (url) => {window.location = /^https?:\/\/.+$/.test(url)?url:"https://"+url
		   })
add("show", (text) => {
	output(text.replace(/</g, "&lt;"))
})
add("save", (text) => {
	if (text == "") {
		output(localStorage.getItem("save")?.replace(/</g, "&lt;"))
	} else {
		localStorage.setItem("save", text)
		output("saved")
	}
})
add("yt", (term) => {
	open("https://youtube.com/results?search_query=" + encodeURI(term))
})
add("ama", (term) => {
	open("https://www.amazon.com/s?k=" + encodeURI(term))
})
add("ww", (term) => {
	window.location = "https://en.wikipedia.org/w/index.php?search=" + encodeURI(term) + "&title=Special%3ASearch&go=Go&ns0=1"
})
add("how", (term) => {
	window.location = "https://www.wikihow.com/wikiHowTo?search=" + encodeURI(term)
})
add("gh", (term) => {
	window.location = "https://github.com/search?q=" + encodeURI(term)
})
add("popup", (text) => {
	popup("custom window", text.replace(/</g, "&lt;"))
})
add("x", (term) => {
	window.fetch(encodeURI("https://api.allorigins.win/get?url=https://google.com/search?q=" + term)).then(response => {
		return response.json()
	}).then(r => {
		var script = `
setTimeout(()=>{
document.body.style.display = "none"
document.body.style.backgroundColor = "black"
document.querySelector(".ZINbbc.xpd.O9g5cc.uUPGi").forEach(e=>e.style.backgroundColor = "black")
},200)
`
		//console.log(r.contents)
		popup("results", "<iframe class='results' srcdoc='" + r.contents.replace(/'/, "\\'") + "<script>" + script + "</script>'></iframe>")
	})
})
