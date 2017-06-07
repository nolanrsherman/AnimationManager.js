game = new Object();

game.score = 0;

game.init = function()
{
	input.init();
	renderer.init();
	game.main();
};


game.main = function()
{
	// Request animation frames
    window.requestAnimationFrame(game.main);

	//if (hero.health > 0)
	//{
    	game.update();
    	renderer.draw();
    //}
}


// #Update game objects
game.update = function() 
{
	hero.update();
	map.monsters.map( (monster) => monster.update() );
};
