var brings = {}
var bringbox = document.getElementById("bring")
if (window.location.href.includes('?')) {
	bringbox.value = decodeURIComponent(location.search.slice(1))
}
if (window.location.href.includes('?run=')) {
	bringbox.value = decodeURIComponent(location.search.slice(5).replace(/\+/g, "%20"))
	setTimeout(e => run(decodeURIComponent(location.search.slice(5).replace(/\+/g, "%20"))), 200)
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
function se(url, query) {//Search engine
	window.location = url.replace(/%s/g, encodeURIComponent(query))
}
add("clog", (l) => {
	console.log(l)
})
add("d", (term) => {
	se("https://duckduckgo.com/?q=%s", term)
})
add("g", (term) => {
	se("https://google.com/search?q=%s", term)
})
add("go", (url) => {
	window.location = /^https?:\/\/.+$/.test(url) ? url : "https://" + url
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
	se("https://youtube.com/results?search_query=%s", term)
})
add("ama", (term) => {
	se("https://www.amazon.com/s?k=%s", term)
})
add("w", (term) => {
	se("https://en.wikipedia.org/w/index.php?search=%s&title=Special%3ASearch&go=Go&ns0=1", term)
})
add("how", (term) => {
	se("https://www.wikihow.com/wikiHowTo?search=%s", term)
})
add("gh", (term) => {
	se("https://github.com/search?q=%s", term)
})
add("popup", (text) => {
	popup("custom window", text.replace(/</g, "&lt;"))
})
add("x", (term) => {
	window.fetch(encodeURIComponent("https://api.allorigins.win/get?url=https://google.com/search?q=" + term)).then(response => {
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
add("help", () => {
	location = "/brings"
})
add("date", () => {
	output(new Date().toDateString())
})
add("time", () => {
	output(new Date().toTimeString())
})
add("new", (a)=>{
    location=`http://${a}.new`
})
add("weather",(a)=>{
    output(`<img src='https://wttr.in/${a}_pq0.png' />`)
})
add("forecast",(a)=>{
    popup("Weather forecast",`<img src='https://wttr.in/${a}_q.png' />`)
})
add("u", (term)=>se("https://you.com/search?q=%s", term))
add("mdn", term => se("https://developer.mozilla.org/en-US/search?q=%s", term))
window.onkeydown=()=>bringbox.focus()