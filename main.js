var brings = {}
var bringbox = document.getElementById("bring")
function run(code){
	var c = firstSpaceSplit(code)[0]
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