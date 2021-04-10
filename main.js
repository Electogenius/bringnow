
var brings = {}
var bringbox = document.getElementById("bring")
if (window.location.href.includes('?')) {
  bringbox.value = decodeURI(window.location.href.slice(window.location.href.indexOf("?") + 1, window.location.href.length))
}
function run(code){
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
add("clog", function(l){
	console.log(l)
})
add("d", function(term){
	window.location = "https://duckduckgo.com/?q="+encodeURI(term)
})
add("g", function(term){
	window.location = "https://google.com/search?q="+encodeURI(term)
})
add("go", (url)=>window.location=url)
add("show", function(text){
	output(text.replace(/</g, "&lt;"))
})
add("save", function(text){
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