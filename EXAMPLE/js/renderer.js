renderer = new Object();

renderer.canvas = document.getElementById("viewport");
renderer.ctx = renderer.canvas.getContext('2d');

renderer.draw = function()
{
	//Clear screen
	renderer.ctx.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height); 
	//Draw game
	map.draw(); 
	//map.obstacles.map( (terrain) => terrain.draw() );

	hero.draw();
	map.monsters.map( (monster) => monster.draw() );
	map.obstacles.map( (terrain) => terrain.draw() );

	// #Score
	renderer.drawHUD();
};

renderer.drawHUD = function()
{
	//renderer.ctx.fillStyle = "rgb(250, 250, 250)"; 	//set to white
	//renderer.ctx.font = "24px Helvetica";  			//set the font
	//renderer.ctx.textAlign = "left";			    //set to left
	//renderer.ctx.textBaseline = "top";              //set to top
	//renderer.ctx.fillText("Parts: " + game.score +"/10", 8, 8); //set the contents
	//#NEW
	for (var i=0; i< hero.health; i++)
	{
		renderer.ctx.drawImage(heartImage, 32+i*24, 32, 16,16);
	}
	for (i in renderer.damageText)
	{
		var data = renderer.damageText[i];
		if (Date.now() - data.age > 500)
			renderer.damageText.shift();
			//delete renderer.damageText[i]
		else
		{
			renderer.ctx.fillStyle = "rgb(250, 250, 250)"; 	//set to white
			renderer.ctx.font = "16px Helvetica";  			//set the font
			renderer.ctx.textAlign = "center";			    //set to left
			renderer.ctx.textBaseline = "top";              //set to top
			renderer.ctx.fillText(data.damage, data.x+viewport.x+16, data.y+viewport.y-i*8); //set the contents
		}
	}
};

renderer.init = function()
{
	map.setMap("images/gameworld.png");
	hero.setImage("images/link-down.png");
	//monsters.setImage("images/monster.png");
}

//Heart Image //#NEW
var heartImage = new Image();
heartImage.src = "images/heart.png";

renderer.damageText = new Array();