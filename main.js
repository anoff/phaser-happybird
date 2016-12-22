
// Create our 'main' state that will contain the game
const mainState = {
    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 

        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        this.pipes = game.add.group(); 
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.

        game.stage.backgroundColor = '#a470ff';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        // create action for space key press
        const spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        // timer to spawn new pipes
        this.timer = game.time.events.loop(1500, this.addPipeRow, this);

        // score
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic

        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0) {
            this.restartGame();
        } else if (this.bird.y > 490 && this.bird.body.velocity.y > 0) {
            this.bird.body.velocity.y = -1 * this.bird.body.velocity.y;
        }

        // restart when bird hits pipe
        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
    },
    // Make the bird jump 
    jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },

    addPipeRow: function() {
        const hole = Math.floor(Math.random() * 5) + 1;
        for (let n = 0; n < 8; n++) {
            if (n < hole || n > hole + 1) {
                this.addPipe(400, n * 60 + 10);
            }
        }

        this.score += 1;
        this.labelScore.text = this.score;
    },
    addPipe: function(x,y) {
        const pipe = game.add.sprite(x, y, 'pipe');
        this.pipes.add(pipe);

        game.physics.arcade.enable(pipe);
        pipe.body.velocity.x = -200;

        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }
};

// Initialize Phaser, and create a 400px by 490px game
const game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');