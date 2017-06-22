hero = new Object();

hero.x = viewport.width / 2;
hero.y = viewport.height / 2;
hero.speed = 3;
hero.image = null;
hero.health = 10;
hero.isHiding = false;	//#NEWnew Animation
hero.strength = 1;
hero.stamina = 5;
hero.timeSpaceBarHeld = 0;

var direction = { up:1, right:2, down:3, left:4};
hero.direction = direction.down;

hero.setImage = function(img)
{
   hero.image = new Image();
   hero.image.src = img;
};

/**
* Animation Manager Test
*/

hero.poses = {
				'up':        new Animation(4, [new Sprite("images/link-up.png")]),
				'down':       new Animation(4, [new Sprite("images/link-down.png")]),
				'right':      new Animation(4, [new Sprite("images/link-right2.png")]),
				'left':       new Animation(4, [new Sprite("images/link-left2.png")]),
				'upWalk':     new Animation(4, [new Sprite("images/link-up.png"), new Sprite("images/link-up2.png")]),
				'downWalk':    new Animation(4, [new Sprite("images/link-down.png"), new Sprite("images/link-down2.png")]),
				'rightWalk':   new Animation(4, [new Sprite("images/link-right.png"), new Sprite("images/link-right2.png")]),
				'leftWalk':    new Animation(4, [new Sprite("images/link-left.png"), new Sprite("images/link-left2.png")]),
				'swordup':    new Animation(1, [new Sprite("images/link-attack-up.png")]),
				'sworddown':  new Animation(1, [new Sprite("images/link-attack-down.png")]),
				'swordright': new Animation(1, [new Sprite("images/link-attack-right.png")]),
				'swordleft':  new Animation(1, [new Sprite("images/link-attack-left.png")])
			 };

hero.animation = new AnimationPlayer(hero.poses.down);

hero.draw = function()
{

	renderer.ctx.drawImage( hero.animation.getCurrentAnimationImage(), hero.x-16, hero.y-16, 32,32 );
};


//#NEW cleanup this logic, first correct logic to not depend on a speed of 1.
hero.update = function()
{

	//UP -------------------------------------------
	if (input.keysDown.has(38)) //if (input.y < this.y - viewport.y )
	{
    hero.animation.play(hero.poses.upWalk);
		viewport.y+=this.speed;
    hero.direction = direction.up;

	} else { // if the key is not up, but the last animation that played was walkUp
      if( hero.animation.getCurrentAnimation() == hero.poses.upWalk)
      {
        hero.animation.play(hero.poses.up);//play the idle up animation.
      }
  }

	//DOWN -------------------------------------------
	if (input.keysDown.has(40)) // if (input.y > this.y - viewport.y )
	{
    hero.animation.play(hero.poses.downWalk);
		viewport.y-=this.speed;
    hero.direction = direction.down;

  } else { // if the key is not up, but the last animation that played was walkUp
      if( hero.animation.getCurrentAnimation() == hero.poses.downWalk)
      {
        hero.animation.play(hero.poses.down);//play the idle up animation.
      }
  }
	//--LEFT -------------------------------------------
	if (input.keysDown.has(37)) //if (input.x < this.x - viewport.x )
	{
    hero.animation.play(hero.poses.leftWalk);
		viewport.x += this.speed;
    hero.direction = direction.left;

	} else { // if the key is not up, but the last animation that played was walkUp
      if( hero.animation.getCurrentAnimation() == hero.poses.leftWalk)
      {
        hero.animation.play(hero.poses.left);//play the idle up animation.
      }
  }
	//RIGHT -------------------------------------------
	if (input.keysDown.has(39)) //if (input.x > this.x - viewport.x )
	{
    hero.animation.play(hero.poses.rightWalk);
		viewport.x -= this.speed;
    hero.direction = direction.right;

	} else { // if the key is not up, but the last animation that played was walkUp
      if( hero.animation.getCurrentAnimation() == hero.poses.rightWalk)
      {
        hero.animation.play(hero.poses.right);//play the idle up animation.
      }
  }

  //ATTACK -------------------------------------------

	if (input.keysDown.has(32))
	{

		if(hero.timeSpaceBarHeld < 1){
			hero.isAttacking = true;
		} else {
			hero.isAttacking = false;
		}
		hero.timeSpaceBarHeld ++;

	    switch(hero.direction){
	      case direction.up 	: hero.animation.play(hero.poses.swordup); break;
	      case direction.right	: hero.animation.play(hero.poses.swordright); break;
	      case direction.down 	: hero.animation.play(hero.poses.sworddown); break;
	      case direction.left 	: hero.animation.play(hero.poses.swordleft); break;
	    }

	} else {
		hero.isAttacking = false;
		hero.timeSpaceBarHeld = 0;
		
		switch(hero.animation.getCurrentAnimation())
		{
			case hero.poses.swordup 	: hero.animation.play(hero.poses.up); break;
			case hero.poses.sworddown 	: hero.animation.play(hero.poses.down); break;
			case hero.poses.swordright	: hero.animation.play(hero.poses.right); break;
			case hero.poses.swordleft 	: hero.animation.play(hero.poses.left); break;
		}
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
		case 'up': 		return 'swordup';
		case 'down': 	return 'sworddown';
		case 'right': 	return 'swordright';
		case 'left': 	return 'swordleft';
		default: 		return hero.currentPose;
	}
}

hero.idlePose = function()
{
	switch(hero.currentPose)
	{
		case 'swordup': 	return 'up';
		case 'sworddown': 	return 'down';
		case 'swordright':  return 'right';
		case 'swordleft':   return 'left';
		default: 			return hero.currentPose;
	}
}


hero.timer = Date.now();

hero.attack = function()
{
	//#NEW
	var now = Date.now()
	if (hero.isAttacking )//&& !hero.currentPose.includes("sword") )
	{
		hero.currentPose = hero.attackPose();

		var herox = hero.x - viewport.x -16;
		var heroy = hero.y - viewport.y -16;

		//console.log("attack");
		for (i in map.monsters)
		{
			var monster = map.monsters[i];

			if ( hero.isTouching(monster) )
			{//ATTACKIGN WITH SWORD UP
				var damage = ~~(1+ Math.random() * (hero.strength-1)/10);
				if (hero.animation.getCurrentAnimation() == hero.poses.swordup && heroy > monster.y)
				{
					monster.takeDamage(damage);
					monster.y -= 32;
				}//ATTACKING WITH SWORD DOWN
				else if (hero.animation.getCurrentAnimation()  == hero.poses.sworddown && heroy < monster.y)
				{
					monster.takeDamage(damage);
					monster.y += 32;
				}//ATTACKING WITH SWORD RIGHT
				else if (hero.animation.getCurrentAnimation()  == hero.poses.swordright && herox < monster.x)
				{
					monster.takeDamage(damage);
					monster.x += 32;
				}//ATTACKING WITH SWORD LEFT
				else if (hero.animation.getCurrentAnimation()  == hero.poses.swordleft && herox > monster.x)
				{
					monster.takeDamage(damage);
					monster.x -= 32;
				}
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
