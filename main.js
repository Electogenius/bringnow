
var brings = {}
var bringbox = document.getElementById("bring")
if (window.location.href.includes('?')) {
  bringbox.value = decodeURI(window.location.href.slice(window.location.href.indexOf("?") + 1, window.location.href.length))
}
function run(code){
	if (!code) {
		return "";
	}
	var c = firstSpaceSplit(code)[0].toLowerCase()
	var text = firstSpaceSplit(code)[1]
	if(brings[c]!=undefined){
	brings[c](text)
	}else{
		output("It seems the bring (command) ‘"+c.replace(/</g, "&lt;")+"’ hasn't been added yet.")
	}
}
function firstSpaceSplit(string) {
	if(string.includes(" ")){
		return [string.slice(0, string.indexOf(" ")), string.slice(string.indexOf(" ") + 1, string.length)]
	}
	return [string, ""]
}
function add(name, funct) {
	brings[name] = funct
}
function output(text){
	var m = document.createElement("message")
	m.innerHTML = text
	m.onclick = ()=>{
		event.target.remove()
	}
	document.getElementById('messages').appendChild(m)
}
function popup(text) {
	var win = document.createElement("window")
	var cl = document.createElement("i")
	cl.classList.add("fa")
	cl.classList.add("fa-times")
	cl.style.float = "right"
	cl.style.display = "block"
	cl.innerHTML = "x"
	cl.onclick = ()=>{
		event.target.parentNode.remove()
		console.log(event.target.parentNode)
	}
	win.appendChild(cl)
	win.innerHTML += text
	document.body.appendChild(win)
}
add("clog", (l)=>{
	console.log(l)
})
add("d", (term)=>{
	window.location = "https://duckduckgo.com/?q="+encodeURI(term)
})
add("g", (term)=>{
	window.location = "https://google.com/search?q="+encodeURI(term)
})
add("go", (url)=>window.location=url)
add("show", (text)=>{
	output(text.replace(/</g, "&lt;"))
})
add("save", (text)=>{
	if (text == "") {
		output(localStorage.getItem("save")?.replace(/</g, "&lt;"))
	}else{
		localStorage.setItem("save", text)
		output("saved")
	}
})
add("yt", (term)=>{
	open("https://youtube.com/results?search_query=" + encodeURI(term))
})
add("ama", (term)=>{
	open("https://www.amazon.com/s?k="+encodeURI(term))
})
add("w", (term)=>{
	window.location="https://en.wikipedia.org/w/index.php?search="+encodeURI(term)+"&title=Special%3ASearch&go=Go&ns0=1"
})
add("how", (term)=>{
	window.location="https://www.wikihow.com/wikiHowTo?search="+encodeURI(term)
})
add("gh",(term)=>{
	window.location="https://github.com/search?q="+encodeURI(term)
})
add("popup",(text)=>{
	popup(text)
})