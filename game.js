
BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {
preload: function () {
          this.load.image('sea', 'assets/sea.png');
          this.load.image('bullet', 'assets/bullet.png');
          this.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32);
        },

  create: function () {

    this.sea = this.add.tileSprite(0, 0, 1024, 768, 'sea');
    
    this.enemy = this.add.sprite(512,300,'greenEnemy');
    this.enemy.animations.add('fly', [0,1,2], 20, true);
    this.enemy.play('fly');
    this.enemy.anchor.setTo(0.5,0.5);

    this.bullet = this.add.sprite(512, 400, 'bullet');
    this.bullet.anchor.setTo(0.5,0.5);

  },

  update: function () {
   this.sea.tilePosition.y += 0.2;
   this.bullet.y -= 1;
  },

  quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
