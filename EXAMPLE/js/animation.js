function Animation(imageArray)
{
	this.startTime = Date.now()
	this.frameindex = 0;
	//this.sequence = new Array();
	this.sequence = imageArray

	this.getImage = function()
	{
		var index = this.frameindex;

		var now = Date.now()
		if (now - this.startTime > 150)
		{
			this.frameindex = ( index + 1) % this.sequence.length
			this.startTime = now
		}
		return this.sequence[index];
	}

	/*
	this.addImage = function(img, width, height)
	{
		var image = new Image();
		image.src = img;
		var frame = {'image':image, 'width':width, 'height':height};
		this.sequence.push(frame);
	}*/

	/*
	this.addImage = function(img)
	{
		var image = new Image();
		image.src = img;
		this.sequence.push(image);
	}*/

/*
	this.addSequence = function(imageArray)
	{
		for (image in imageArray)
		{
			this.addImage( imageArray[image] );
		}
	}*/

};
