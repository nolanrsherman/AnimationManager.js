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


    /*PRIVATE METHODS*/

    /*CONSTRUCTOR INSTRUCTIONS*/

  }

  /* PUBLIC METHODS */

/*---END ANIMATION CLASS
---------------------*/
