map = new Object();
map.currentMap = null;
map.monsters = new Array();
map.obstacles = new Array();

map.setMap = function(mapData)
{

   map.currentMap = new Image();
   map.currentMap.src = mapData;
   map.currentMap.onload = () => { map.generateTerrain(); map.spawnMonsters(); }

};

map.draw = function()
{
	//renderer.ctx.drawImage( map.currentMap, 0, 0 ); 
	renderer.ctx.drawImage( map.currentMap, viewport.x, viewport.y ); 
};



map.spawnMonsters = function()
{
	map.monsters = new Array();
	map.monsters.push( new Boss() );
	for (var i=0; i<35; i++)
	{
		map.monsters.push( new Monster() );
	} 
}

map.generateTerrain = function()
{
	for (var i=0; i< 70; i++)
	{
		map.obstacles.push( new Obstacle() );
	}
}

