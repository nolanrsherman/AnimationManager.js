function Monster()
{
	this.health = 10;

	this.x = 32 + (Math.random() * (map.currentMap.width - 64));
	this.y = 32 + (Math.random() * (map.currentMap.height - 64))
	//this.x = 32 + (Math.random() * (screen.width - 64));
	//this.y = 32 + (Math.random() * (screen.height - 64));
	this.image = new Image();
	this.image.src = "images/monster.png";

	this.originx = this.x;
	this.originy = this.y;



	//this.health = 2; //#NEW
	//#NEW
	var idleImage = "images/monster.png";
	var attackImage = "images/monster-attack.png";

	this.width = 32; //#NEW
	this.height = 32 //#NEW

//ANIMATION definitions
var standAnimationArray = [new Sprite(this.image)];
this.standAnimation = new Animation(0, standAnimationArray);
this.aniManager = new AnimationManager(renderer.ctx, this.standAnimation);
this.aniManager.setDefaultAnimation(this.standAnimation);

//End animation definitoins

	this.setImage = function (img)
	{
	   image.src = img;
	};

	this.draw = function()
	{
		var image = this.aniManager.getCurrentImage();//get the current sprites image from the animiation manager.
		renderer.ctx.drawImage( image, this.x+viewport.x, this.y+viewport.y, image.width, image.height);

	};

	this.perish = function()
	{
		//delete this;
		for (i in map.monsters)
		{
			var monster = map.monsters[i];
			if (this == monster)
			{
				delete map.monsters[i];
				hero.strength++;
			}
		}
	}

	this.move = function()
	{
		var herox = hero.x - viewport.x -16;
		var heroy = hero.y - viewport.y -16;
		var distance = Math.sqrt((herox-this.x)**2 + (heroy-this.y)**2)
		//console.log("hero:" + herox + ", " + heroy);
		//console.log("distance: " + distance);

		if (distance < 200 && hero.isHiding==false)
		{
			var speed = 2;
			if (herox - this.x > 0 )
				this.x += speed;
			if (herox - this.x < 0 )
				this.x -= speed;
			if (heroy - this.y > 0 )
				this.y += speed;
			if (heroy - this.y < 0 )
				this.y -= speed;
			this.image.src = attackImage;

		}
		else if (this.originx != this.x || this.originy != this.y)
		{
			var speed = 1;
			if (this.originx - this.x > 0 )
				this.x += speed;
			if (this.originx - this.x < 0 )
				this.x -= speed;
			if (this.originy - this.y > 0 )
				this.y += speed;
			if (this.originy - this.y < 0 )
				this.y -= speed;
			this.image.src = idleImage;
			this.aniManager.play(this.standAnimation);
		}
	}

	this.update = function()
	{
		//var now = Date.now();
		if (hero.isTouching(this)) //#NEW
		{
			this.attack();	//#NEW
			//console.log("attack");
		}
		else
		{
			this.move();
			this.then=Date.now();
			//console.log("move");
		}
		if (this.health <= 0)
			this.perish();
	}

	this.isTouching = function( gameObject )
	{
	// #Are they touching?
	return ( this.x <= (gameObject.x + 32)
		&& gameObject.x <= (this.x + 32)
		&& this.y <= (gameObject.y + 32)
		&& gameObject.y <= (this.y + 32) );
	}

	this.then = Date.now();
	this.attack = function( )
	{
		var now = Date.now();
		if (now - this.then > 1000)
		{
			hero.health--;
			this.then = now;
		}
	}

	this.takeDamage = function(damage)
	{
		this.health -= damage;
		renderer.damageText.push({'damage':damage, 'x':this.x, 'y':this.y-16, 'age':Date.now()}); //set the contents
	}

};
