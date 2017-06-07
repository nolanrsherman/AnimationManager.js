input = new Object();

input.x = null;
input.y = null;
input.keysDown = new Set();

input.init = function()
{
	input.x = hero.x;
	input.y = hero.y;

	renderer.canvas.addEventListener("click", input.canvasClick);
	
	document.addEventListener("keydown", function (e) { input.keysDown.add(e.keyCode); });
	document.addEventListener("keyup", function (e) { input.keysDown.delete(e.keyCode); });
	
}


input.canvasClick = function(event)
{
	input.x = event.clientX - renderer.canvas.offsetLeft + document.body.scrollLeft - viewport.x - 16; 
	input.y = event.clientY - renderer.canvas.offsetTop  + document.body.scrollTop - viewport.y - 16;  
}

