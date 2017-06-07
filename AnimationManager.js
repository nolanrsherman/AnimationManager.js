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
  function Sprite(imgSrc, xOrigin = null, yOrigin = null, w = null, h = null){
    /*PUBLIC INSTANCE VARIABLES*/
      this.description = ''; //a simple description

    /*PRIVATE VARS*/
      var imageSource = imgSrc;
      var originX = xOrigin;
      var originY = 0;
      var image = new Image();
      var scale = 1;

      var canvas = document.createElement("canvas");
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
        return image.width;
      }
      //gets the height of sprite from origin
      this.getSpriteHeight = function(){
        return image.height;
      }

      //returns the image of this Sprite
      this.getImage = function(){
        return image;
      }

      this.getHeight = function(){
        return image.height * scale;
      }

      this.getWidth = function(){
        return image.width * scale;
      }

    /*PRIVATE METHODS*/

    /*CONSTRUCTOR INSTRUCTIONS*/
      //set the source of the image to imgsrc
      image.src = imageSource;

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
      }

      this.play = function(animation){
        currentAnimation = animation;
      }

    /*PRIVATE METHODS*/

    /*CONSTRUCTOR INSTRUCTIONS*/

  }

  /* PUBLIC METHODS */

/*---END AnimationManager CLASS
---------------------*/
