import { Tube } from "../prefabs/tube";

export class Game extends Phaser.State {

    private bird;
    private spaceKey: Phaser.Key;
    private speedY = 0;
    private gravity = 0.1;
    private floorTubesArray = [];
    private ceilingTubesArray = [];
    private backgrounds = [];
    private scoreValue = 0;
    private score;
    private colision;
    private colisionValue = 0;
    public create(): void {
        for (let i = 0; i < 2; i++) {
            const background = this.game.add.sprite(0, 0, "background");
            background.height = 480;
            background.x = (background.width) * i;
            this.backgrounds.push(background);
        }
        this.bird = this.game.add.sprite(75, 100, "bird");
        this.bird.anchor.setTo(0.5);
        this.bird.scale.setTo(0.65);
        for ( let i = 0; i < 10; i++ ) {
            const heightVariation = (Math.random() * (100 + 100) - 100);

            const floorTube = new Tube(this.game, 600 + i * 600, 615 + heightVariation + 50 );
            this.floorTubesArray.push ( floorTube );

            const ceilingTube = new Tube(this.game, 600 + i * 600, 615 + heightVariation);
            ceilingTube.angle = 180;
            ceilingTube.y -= 750;
            this.ceilingTubesArray.push ( ceilingTube );
        }
        this.score = this.game.add.bitmapText(200, 30, "font", "Score: ", 35);
        this.colision = this.game.add.bitmapText(200, 70, "font", "Colisions: ", 35);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(() => {
            this.speedY = -5;
        }, this);
    }

    public update() {
        this.speedY += this.gravity;
        this.bird.y += this.speedY;
        this.bird.angle = this.speedY * 5;

        for ( let i = 0; i < this.floorTubesArray.length; i++ ) {
            this.floorTubesArray[i].x -= 5;
            this.ceilingTubesArray[i].x -= 5;
        }

        this.backgrounds.forEach(element => {
            element.x -= 1;
            if ( element.x + element.width < 0 ) {
                element.x += element.width * 2;
            }
        });
        if (this.floorTubesArray[this.scoreValue]) {
            if (this.floorTubesArray[this.scoreValue].x === this.bird.x) {
                this.scoreValue++;
                this.score.text = "Score: " + (this.scoreValue);

            }
            if (this.floorTubesArray[this.scoreValue]) {
            let floorTubeStart = ((this.floorTubesArray[this.scoreValue].x - 135 ) < this.bird.x);
            let floorTubeEnd = (this.bird.x < (this.floorTubesArray[this.scoreValue].x  + 135 ));
            let floorTubePeak = ((this.floorTubesArray[this.scoreValue].y - 331) < this.bird.y);
            let floorTubeBottom = (this.bird.y < (this.floorTubesArray[this.scoreValue].y + 331));

            let ceilingTubeStart = ((this.ceilingTubesArray[this.scoreValue].x - 135 ) < this.bird.x);
            let ceilingTubeEnd = (this.bird.x < (this.ceilingTubesArray[this.scoreValue].x  + 135 ));
            let ceilingTubePeak = ((this.ceilingTubesArray[this.scoreValue].y - 331) < this.bird.y);
            let ceilingTubeBottom = (this.bird.y < (this.ceilingTubesArray[this.scoreValue].y + 331));
            if (floorTubeStart && floorTubeEnd && floorTubePeak && floorTubeBottom) {
                this.colisionValue++;
                this.colision.text = "Colision: " + (this.colisionValue);
            }
            if (ceilingTubeStart && ceilingTubeEnd && ceilingTubePeak && ceilingTubeBottom) {
                this.colisionValue++;
                this.colision.text = "Colision: " + (this.colisionValue);
            }
            }
        }
    }


}