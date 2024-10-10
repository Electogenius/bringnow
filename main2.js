// To some extent, a rewrite

let brings = {}
let bringbox = document.getElementById("bring")

LOG = x => console.debug(x)

/* Storage stuff */
let data = {
	brings: {},
	defaultCmd: false,
	startScripts: [],
}
if ("bn-data" in localStorage) {
	data = JSON.parse(localStorage.getItem("bn-data"))
} else {
	save()
}
function process(obj) {
	let res = {};
	for (key in obj) {
		res[key] = new Function("arg", obj[key])
	}
	return res
}

// merge builtins and customs
brings = { ...brings, ...process(data.brings) }
function save() {
	localStorage.setItem("bn-data", JSON.stringify(data))
}


// url stuff
if (window.location.href.includes('?')) {
	bringbox.value = decodeURIComponent(location.search.slice(1))
}
if (window.location.href.includes('?run=')) {
	bringbox.value = decodeURIComponent(location.search.slice(5).replace(/\+/g, "%20"))
	setTimeout(e => run(decodeURIComponent(location.search.slice(5).replace(/\+/g, "%20"))), 200)
}

// log
function output(text) {
	var m = document.createElement("message")
	m.innerHTML = text
	m.onclick = (event) => {
		event.target.remove()
	}
	document.getElementById('messages').appendChild(m)
}

// keygrabbing
window.onkeydown = (ev) => {
	if (ev.key == "Enter") {
		document.getElementById("enter").click()
	} else if (ev.key != "Tab") bringbox.focus()
}

// the big command
function run(c) {
	if (!c) return // blank
	if (c.startsWith('https://') || c.startsWith('//')) {
		brings.go(c) // url
		return
	}
	let [cm, ...arg] = c.split(' ')

	arg = arg.join(" "); cm = cm.toLowerCase()

	if (cm in brings) {
		brings[cm](arg)
	} else if (data.defaultCmd) {
		brings[data.defaultCmd](c)
	} else {
		output(`No command '${cm}' found.`)
	}
}

// theme color changing
function setTheme(color) {
	themecolorstyle.innerHTML = `:root{--theme-color:${color}}`
}
function manageColor() {
	let c = bringbox.value
	const col = { normal: '#00ff69', notpresent: '#00ff6988' }
	if (!c) setTheme(col.normal)
	else if (c.split(' ')[0].toLowerCase() in brings) {
		setTheme(col.normal)
	} else {
		setTheme(col.notpresent)
	}
}
bringbox.addEventListener('input', manageColor)
bringbox.addEventListener('change', manageColor)

// for copypastability/backwards compatibility only
function add(name, fn) {
	if (name in brings) return
	brings[name] = fn
}
function addSE() {
	let cmdname = document.getElementById('cmdname').value
	let cmdurl = document.getElementById('cmdurl').value

	data.brings[cmdname] = `location.replace(atob('${btoa(cmdurl)}').replace(/%s/g,arg))`
	brings = { ...brings, ...process(data.brings) }

	save()
}


////		begin commands		////

add("add-se", () => {
	let popup = document.getElementById('new-popup')
	popup.showModal();
	setTimeout(() => {
		if (!popup.open) {
			output("Please use the '>' button for this command")
		}
	}, 100)
})

add('manage', () => {
	location.href = './manage'
})

add('set-default', arg => {
	data.defaultCmd = arg.split` `[0]
	save()
	output("Done")
})

function se(url, query) {//Search engine
	window.location = url.replace(/%s/g, encodeURIComponent(query))
}

// horrible disgusting function
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
	se("https://duckduckgo.com/?q=%s", term)
})
add("g", (term) => {
	se("https://google.com/search?q=%s", term)
})
add("go", (url) => {
	window.location.replace(/^https?:\/\/.+$/.test(url) ? url : "https://" + url)
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

add("help", () => {
	location = "/brings"
})
add("date", () => {
	output(new Date().toDateString())
})
add("time", () => {
	output(new Date().toTimeString())
})
add("new", (a) => {
	location = `http://${a}.new`
})
add("weather", (a) => {
	output(`<img src='https://wttr.in/${a}_pq0.png' />`)
})
add("forecast", (a) => {
	popup("Weather forecast", `<img src='https://wttr.in/${a}_q.png' />`)
})

add("mdn", term => se("https://developer.mozilla.org/en-US/search?q=%s", term))