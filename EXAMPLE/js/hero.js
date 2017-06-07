hero = new Object();

hero.x = viewport.width / 2;
hero.y = viewport.height / 2;
hero.speed = 3;
hero.image = null;
hero.health = 10;
hero.isHiding = false;	//#NEW
hero.poses = { up:         "images/link-up.png",
			   down:       "images/link-down.png",
			   right:      "images/link-right.png",
			   left:       "images/link-left.png",
			   swordup:    "images/link-attack-up.png", 
			   sworddown:  "images/link-attack-down.png",
			   swordright: "images/link-attack-right.png",
			   swordleft:  "images/link-attack-left.png"
			 };
hero.currentPose = hero.poses.down;
hero.strength = 1;
hero.stamina = 5;


hero.setImage = function(img)
{
   hero.image = new Image();
   hero.image.src = img;
};


hero.draw = function()
{
	hero.setImage(hero.currentPose);
	renderer.ctx.drawImage( hero.image, hero.x-16, hero.y-16, 32,32 ); 
};


//#NEW cleanup this logic, first correct logic to not depend on a speed of 1.
hero.update = function()
{

	//UP  
	if (input.keysDown.has(38)) //if (input.y < this.y - viewport.y ) 
	{
		
		hero.currentPose = hero.poses.up;
		viewport.y+=this.speed;
		//viewport.y += (viewport.y < 0 && this.y == viewport.height/2 ) ? this.speed : 0;
		//hero.y = (viewport.y == 0 || hero.y > viewport.height/2 ) ? hero.y - hero.speed : viewport.height/2; 
	}	
	//DOWN  
	if (input.keysDown.has(40)) // if (input.y > this.y - viewport.y ) 
	{
		viewport.y-=this.speed;
		hero.currentPose = hero.poses.down;
		//viewport.y -= (viewport.y > -(map.currentMap.height-viewport.height) && this.y == viewport.height/2) ? this.speed : 0 ;
		//hero.y = (viewport.y <= -(map.currentMap.height-viewport.height) || hero.y < viewport.height/2) ? hero.y + hero.speed : viewport.height/2; 
	}	
	//LEFT  
	if (input.keysDown.has(37)) //if (input.x < this.x - viewport.x ) 
	{
		viewport.x += this.speed;
		hero.currentPose = hero.poses.left;
		//viewport.x += (viewport.x < 0 && this.x == viewport.width/2 ) ? this.speed : 0;
		//hero.x = (viewport.x == 0 || hero.x > viewport.width/2 ) ? hero.x - hero.speed : viewport.width/2; 
	}	
	//RIGHT  
	if (input.keysDown.has(39)) //if (input.x > this.x - viewport.x ) 
	{
		viewport.x -= this.speed;
		hero.currentPose = hero.poses.right;
		//viewport.x -= (viewport.x > -(map.currentMap.width-viewport.width) && this.x == viewport.width/2) ? this.speed : 0 ;
		//hero.x = (viewport.x <= -(map.currentMap.width-viewport.width) || hero.x < viewport.width/2) ? hero.x + hero.speed : viewport.width/2; 
	}
	if (input.keysDown.has(32))
	{
		hero.isAttacking = true;
	}
	hero.hide(); //#NEW
	this.attack();

};


hero.isTouching = function( gameObject )
{ 
	// #Are they touching? 
	return ( hero.x <= (gameObject.x + gameObject.width + viewport.x +16)
		&& gameObject.x + viewport.x +16 <= (hero.x + 32)
		&& hero.y <= (gameObject.y + gameObject.height + viewport.y + 16)
		&& gameObject.y + viewport.y + 16 <= (hero.y + 32) ); 
}



hero.attackPose = function()
{
	switch(hero.currentPose)
	{
		case hero.poses.up: 		return hero.poses.swordup;
		case hero.poses.down: 		return hero.poses.sworddown;
		case hero.poses.right: 		return hero.poses.swordright;  
		case hero.poses.left: 		return hero.poses.swordleft; 
		default: 					return hero.currentPose;
	}
}

hero.idlePose = function()
{
	switch(hero.currentPose)
	{ 
		case hero.poses.swordup: 	return hero.poses.up;
		case hero.poses.sworddown: 	return hero.poses.down;
		case hero.poses.swordright: return hero.poses.right;
		case hero.poses.swordleft:  return hero.poses.left;
		default: 					return hero.currentPose;
	}
}


hero.timer = Date.now();
hero.attack = function()
{
	//#NEW
	var now = Date.now()
	if (hero.isAttacking && !hero.currentPose.includes("attack") )
	{
		hero.currentPose = hero.attackPose(); 

		var herox = hero.x - viewport.x -16;
		var heroy = hero.y - viewport.y -16;

		//console.log("attack");
		for (i in map.monsters)
		{
			var monster = map.monsters[i];

			if ( hero.isTouching(monster) )
			{	
				var damage = ~~(1+ Math.random() * (hero.strength-1)/10);
				if (hero.currentPose == hero.poses.swordup && heroy > monster.y)
				{
					console.log("up");
					//hero.setImage(hero.poses.swordup);
					//delete map.monsters[i];
					monster.takeDamage(damage);
					monster.y += 32;
				}
				else if (hero.currentPose == hero.poses.sworddown && heroy < monster.y)
				{
					console.log("down");
					//hero.setImage(hero.poses.sworddown);
					//delete map.monsters[i];
					monster.takeDamage(damage);
					monster.y -= 32;
				}
				else if (hero.currentPose == hero.poses.swordright && herox < monster.x)
				{
					console.log("right");
					//hero.setImage(hero.poses.swordright);
					//delete map.monsters[i];
					monster.takeDamage(damage);
					monster.x += 32;
				}
				else if (hero.currentPose == hero.poses.swordleft && herox > monster.x)
				{
					console.log("left");
					//hero.setImage(hero.poses.swordleft);
					//delete map.monsters[i];
					monster.takeDamage(damage);
					monster.x -= 32;
				}
				//delete map.monsters[i];
				/*if (input.keysDown.has(38) && map.monsters[i].y < heroy)
				{
					delete map.monsters[i];
				}*/
				//monster.perish();
				//console.log("die" + map.monsters[i]);
			}
		}
		//hero.image.src = idlePose;
		hero.timer = Date.now();
	}
	else if (now - hero.timer > 300)
	{
		hero.currentPose = hero.idlePose();
	}
	hero.isAttacking = false;

}

//#NEW
hero.hide = function()
{
	for (i in map.obstacles)
	{
		var tree = map.obstacles[i];
		var herox = hero.x - viewport.x -16;
		var heroy = hero.y - viewport.y -16;

		if ( herox > tree.x 
			 && herox+32 < tree.x+tree.width 
			 && heroy > tree.y
			 && heroy+32 < tree.y+tree.height )
		{
			hero.isHiding = true;
			return;
		}
	}
	hero.isHiding = false;
}

