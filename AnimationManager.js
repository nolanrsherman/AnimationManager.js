/**
*
* AnimationManager
*
* a simple library for handling 2d animations in javascript.
* Author: Nolan Sherman
* Organization: University of New Orleans Department of Computer Science
*
* Instructions:
*
*/


/*
---------------------
  CLASS: Sprite
---------------------
Defines the image that represents a single
frame of an animation.
*/
  function Sprite(srcImg, xOrigin = 0, yOrigin = 0, width = null, height = null){
    /*PUBLIC INSTANCE VARIABLES*/
      this.description = ''; //a simple description

    /*PRIVATE VARS*/
      var sourceImage = srcImg;
      var spriteImage = new Image();
      var originX = xOrigin;
      var originY = yOrigin;
      var image;
      var scale = 1;
      var spriteWidth = width;
      var spriteHeight = height;

      let sourceReadyPromise = new Promise((resolve, reject) => {
        // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
        // In this example, we use setTimeout(...) to simulate async code.
        // In reality, you will probably be using something like XHR or an HTML5 API.
        setTimeout(function(){
          if(sourceImage.complete){
            console.log("its ready");
            resolve("Image is ready."); // Yay! Everything went well!
          }else{
            console.log("not ready");
          }
        }, 50 );

      });

    /*PRIVILAGED METHODS*/

      //gets the image source
      this.getImageSource = function(){
        return imageSource;
      }
      //gets the x origin
      this.getOriginX = function(){
        return originX;
      }
      //gets the y origin
      this.getOriginY = function(){
        return originY;
      }
      //gets the width of sprite from origin
      this.getSpriteWidth = function(){
        return spriteImage.width;
      }
      //gets the height of sprite from origin
      this.getSpriteHeight = function(){
        return spriteImage.height;
      }

      //returns the image of this Sprite
      this.getSpriteImage = function(){
        return spriteImage;
      }

      this.getHeight = function(){
        return spriteImage.height * scale;
      }

      this.getWidth = function(){
        return spriteImage.width * scale;
      }

    /*PRIVATE METHODS*/
    function createSprite(){
      var newSpriteImage = new Image();//image for storing sprite
        sourceImage.crossOrigin="anonymous";
      //create new canvas the width and height of the sprite.
      var canvas = document.createElement("canvas");
      canvas.height = spriteHeight;
      canvas.width = spriteWidth;
      console.log(canvas);
      var ctx = canvas.getContext('2d');
      //draw imageSource to canvas at negative origin values (origin x,y should be at canvas 0,0)
      ctx.drawImage(sourceImage, xOrigin, yOrigin);
      //convert canvas drawing to data uri
      var canvasImageURL = canvas.toDataURL('image/jpeg', 1.0);
      //set img src to data uri
      newSpriteImage.src = canvasImageURL;
      newSpriteImage.crossOrigin="anonymous";
      //remove canvas.
      console.log(newSpriteImage);

      return sourceImage;// newSpriteImage;//return the sprite image
    }
    /*CONSTRUCTOR INSTRUCTIONS*/

      //set the source of the sprite image
      sourceReadyPromise.then((successMessage) => {
        // successMessage is whatever we passed in the resolve(...) function above.
        // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
        console.log("Yay! " + successMessage);
        //check null height/width props.
          if(spriteHeight == null){ spriteHeight = sourceImage.height;}
          if(spriteWidth == null){ spriteWidth = sourceImage.width;}
        spriteImage = createSprite();
      });



  }
  /* PUBLIC VARS */

  /* PUBLIC METHODS */

////// END SPRITE CLASS //////

/*
---------------------
  CLASS: Animation
---------------------
Defines a group of sprites that play in sequential order at a given rate (FPS)
*/
  function Animation(fpsRate, spriteArray){
    /*PUBLIC INSTANCE VARIABLES*/
      this.description = ''; //a simple description

    /*PRIVATE VARS*/
      var fps = fpsRate;
      var sprites = spriteArray;
      var currentSprite = sprites[0];
      var scale = 1;
    /*PRIVILAGED METHODS*/

      //gets the current fps
      this.getFps = function(){
        return fps;
      }

      //sets the fps of this ANIMATION
      this.setFps = function(newFps){
        fps = newFps;
      }

      //gets an array of all the sprites in this animation
      this.getSprites = function(){
        return sprites;
      }

      //gets the currently displayed sprite
      this.getCurrentSprite = function(){
        return currentSprite;
      }

      //gets the image of the current sprite.
      this.getImage = function(){
        return currentSprite.getImage();
      }

      this.getHeight = function(){
        return currentSprite.getHeight() * scale;
      }

      this.getWidth = function(){
        return currentSprite.getWidth() * scale;
      }

    /*PRIVATE METHODS*/

    /*CONSTRUCTOR INSTRUCTIONS*/

  }

  /* PUBLIC METHODS */

/*---END ANIMATION CLASS
---------------------*/

/*
---------------------
  CLASS: AnimationManager
---------------------
controls animations, one instance should be attached per object.
*/
  function AnimationManager(canvasContext, defaultAnimation){
    /*PUBLIC INSTANCE VARIABLES*/
      this.description = ''; //a simple description

    /*PRIVATE VARS*/
      var defaultAnimation = defaultAnimation
      var ctx = canvasContext
      var Animations = [];
      var currentAnimation = defaultAnimation;

    /*PRIVILAGED METHODS*/

      //gets the current fps
      this.getFps = function(){
        return fps;
      }

      //@deprecated
      /*
      this.draw = function(posX, posY){

          var image = currentAnimation.getCurrentSprite().getImage(); //image
          var sx = currentAnimation.getCurrentSprite().getOriginX();// x origin of sprite
          var sy = currentAnimation.getCurrentSprite().getOriginY();//y origin of sprite
          var sw = currentAnimation.getCurrentSprite().getWidth();//width of sprite
          var sh = currentAnimation.getCurrentSprite().getHeight();//height of sprite
          var dx = posX; //the x position to draw at
          var dy = posY;// the y position to draw at
          var dw = currentAnimation.getCurrentSprite().getWidth();//how wide to draw it on canvas
          var dh = currentAnimation.getCurrentSprite().getHeight();//how tall to draw it on canvas

          //console.log(dw + ", " + dh);
          ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);


        //ctx.drawImage( image, dx, dy, 32, 32)
      }*/

      this.play = function(animation){
        currentAnimation = animation;
      }

      this.setDefaultAnimation = function(animation){
        defaultAnimation = animation;
      }

      this.getCurrentImage = function(){
        return currentAnimation.getCurrentSprite().getSpriteImage();
      }

    /*PRIVATE METHODS*/

    /*CONSTRUCTOR INSTRUCTIONS*/

  }

  /* PUBLIC METHODS */

/*---END AnimationManager CLASS
---------------------*/
