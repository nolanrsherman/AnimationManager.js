function Obstacle()
{
	this.x = 32 + (Math.random() * (map.currentMap.width - 64-32)); 
	this.y = 32 + (Math.random() * (map.currentMap.height - 64-32)) 
	this.width = 64;
	this.height = 64;

	this.image = new Image();
	this.image.src = "images/tree.png";

	this.setImage = function (img)
	{
	   image.src = img;
	};

	this.draw = function()
	{
		renderer.ctx.drawImage( this.image, this.x+viewport.x, this.y+viewport.y,64,64); 
	};

	this.destroy = function()
	{
		delete this;
	};

};