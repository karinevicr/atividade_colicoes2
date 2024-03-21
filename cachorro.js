        var larguraJogo = 750;
        var alturaJogo = 600;

        // o que essa parte faz?
        const config = {
            type: Phaser.AUTO,
            width: larguraJogo,
            height: alturaJogo,



            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 30 },
                    debug:false // mostra as linhas
                }

            },

            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        // o que acontece aqui?
        const game = new Phaser.Game(config);
        var text;

        var petiscos = 0;
        var placar;

        function preload() {
            this.load.image('fundo', 'assets/fundoRosa.jpg');
            this.load.image('logo', 'assets/logo-inteli_branco.png');
            this.load.image('cachorro', 'assets/Rebeca.png');
            this.load.image('pizza', 'assets/pizza.png');

        }

        function create() {
            this.add.image(275, 200, 'fundo');
            this.add.image(275, 350, 'logo').setScale(0.3);
        
            cachorro = this.physics.add.sprite(400, 300, 'cachorro').setScale(0.5);
            cachorro.body.allowGravity = false;
        
            pizza = this.physics.add.sprite(larguraJogo /  2, 0, 'pizza').setScale(0.5);
            pizza.setCollideWorldBounds(true);
            pizza.setBounce(0.5);
            // setscale serve para diminuir ou aumentar o tamanho de uma figura
            // Armazena uma referência ao contexto externo (this)
           var self = this;
        
            this.physics.add.overlap(cachorro, pizza, function() {
                pizza.setVisible(false);
                var posicaoPizza = Phaser.Math.RND.between(50, 650);
                pizza.setPosition(posicaoPizza, 100);
        
                petiscos += 1;
                
                // Usa a referência ao contexto externo para acessar this.add.text
                if (!placar) {
                    placar = self.add.text(16, 16, 'Petiscos: 0', { fontSize: '32px', fill: '#000' });
                }
                placar.setText("Petiscos:" + petiscos);
        
                pizza.setVisible(true);
            });
        }
        

        function update() {
            cachorro.x = this.input.x; // seguir o mouse no eixo x//
            cachorro.y = this.input.y; // seguir o mouse no eixo y//

            if (cachorro.x < 50){
                cachorro.setFlipX(true);
            } else if (cachorro.x > 700) {
                cachorro.setFlipX(false);
            }
        }
