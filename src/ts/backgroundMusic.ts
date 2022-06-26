import * as PIXI from 'pixi.js';

import backgroundSound from 'url:../music/backgroundMusic.mp3';
import background from '../images/shrek.png';

export class Sound {
    public pixiWidth = 650;
    public pixiHeight = 650;

    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    private backgroundNoise: HTMLAudioElement = new Audio(backgroundSound);

    constructor() {
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader.add('background', background);
        this.loader.load(()=>this.loadCompleted());
    }

    private loadCompleted() {
        let background = new PIXI.Sprite(this.loader.resources["background"].texture!);
        this.pixi.stage.addChild(background);

        this.backgroundNoise.play();
        this.backgroundNoise.volume = 0.5;
        this.backgroundNoise.addEventListener('ended', function(){
            this.currentTime = 0;
            this.play();
        }, false);
    }
}

new Sound();
