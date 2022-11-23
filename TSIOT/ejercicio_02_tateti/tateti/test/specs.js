let chai = require("chai");
let chaihttp = require("chai-http");
let should = chai.should();
let server = require("../app");
chai.use(chaihttp)



describe('Iniciar Juego', function () {
   

    describe("Iniciar juego con datos incorrectos", function() {

        it("Iniciar sin jugadores", async () => {
            res = await chai.request(server).post("/game/begin").send();
            res.should.have.status(400);


        });

        it("Iniciar con un jugador", async() => {
            let players = ["player1"];
            res = await chai.request(server).post("/game/begin").send(players);
            res.should.have.status(400);
        });

        it("Iniciar con mas de dos jugadores", async() => {
            let players =  ["player1", "player2", "player3"];
            res = await chai.request(server).post("/game/begin").send(players);
            res.should.have.status(400);
        });

    });

    describe("Iniciar juego correctamente", function() {

        it("n un juego nuevo el tablero esta vacio y le toca mover al primer jugador", async () => {
            let players = ["player1", "player2"]
            res = await chai.request(server).post("/game/begin").send(players);
            res.should.have.status(200);
            res.should.to.be.json;       
            res.should.to.be.a('object');  
            res.body.should.have.property('nextPlayer').eql('player1');
            res.body.should.have.property('gameBoard').eql([
                    [' ',' ',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                    ]);


        });

       
    });




});    

describe('Movimientos', function () {
   

    describe("Movimientos correctos", function() {

        it("El primer jugador el tablero tiene una casilla ocupada y le toca mover al segundo jugador", (done) => {
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 0 })
            .end((err,res) =>{
                res.should.have.status(200);            
                res.should.to.be.json;     
                res.should.to.be.a('object');    
                res.body.should.have.property('nextPlayer').eql('player2');
                res.body.should.have.property('gameBoard').eql([
                    ['O',' ',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                ]);
                done();
            });

            

        });

        it("Mueve el segundo jugador, resultado: el tablero tiene dos casilla ocupada y le toca mover al primer jugador", (done) => {
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 0 }).end();

            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 1, row: 0 })
            .end((err, res) => {    
            res.should.have.status(200);            
            res.should.to.be.json;     
            res.should.to.be.a('object');    
            res.body.should.have.property('nextPlayer').eql('player1');
            res.body.should.have.property('isFinished').eql(false);
            res.body.should.have.property('gameBoard').eql([
                ['O','X',' '],
                [' ',' ',' '],
                [' ',' ',' '],
            ]);
            done();
            });    
        });


        

       

    });

    describe("Movimientos incorrectos", function() {

        it("No debería aceptar un movimiento de un jugador al que no le toca",  (done) => {
            let players = ["player1", "player2"]
            chai.request(server).post("/game/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 1, row: 0 })
            .end((err, res) => {    
            res.should.have.status(400);            
            
            done();
            });    

        });

        it("Si un jugador quiere marcar una casilla ocupada entonces tiene un error y sigue siendo su turno de mover",  (done) => {
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 0 }).end();

            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 0, row: 0 })
            .end((err, res) => {    
            res.should.have.status(400);            
            res.should.to.be.json;     
            res.should.to.be.a('object');    
            res.body.should.have.property('nextPlayer').eql('player2');
           
            done();
            });    

        });

        it("Un jugador que no existe intenta mover",  (done) => {
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player3', column: 0, row: 1 })
            .end((err, res) => {    
            res.should.have.status(400);            
           
           
            done();
            });    

        });

        it("Mover columna invalida",  (done) => {
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 100, row: 1 })
            .end((err, res) => {    
            res.should.have.status(400);            
           
           
            done();
            });    

        });

        it("Mover fila invalida",  (done) => {
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 1, row: 10 })
            .end((err, res) => {    
            res.should.have.status(400);            
           
           
            done();
            });    

        });

    });

    describe("Fin del juego", function() {
        it("Empate", (done) =>{
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 1, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 2, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 0, row: 1 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 1, row: 1 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 2, row: 2 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 2, row: 1 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 0, row: 2 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 1, row: 2 })
            .end((err, res) => {    
            res.should.have.status(200);            
            res.should.to.be.json;     
            res.should.to.be.a('object');    
            res.body.should.have.property('nextPlayer').eql('player2');
            res.body.should.have.property('tiedGame').eql(true);
            done();
            });    

        });

        it("Player 1 gana al completar columna", (done) =>{
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 1, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 1 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 2, row: 0 }).end();
           
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 2 })
            .end((err, res) => {    
            res.should.have.status(200);            
            res.should.to.be.json;     
            res.should.to.be.a('object');    
            res.body.should.have.property('nextPlayer').eql('player2');
            res.body.should.have.property('winner').eql(true);
            done();
            });    

        });

        it("Player 1 gana al completar fila", (done) =>{
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 1 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 1, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 1, row: 1 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 2, row: 0 }).end();
           
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 2, row: 1 })
            .end((err, res) => {    
            res.should.have.status(200);            
            res.should.to.be.json;     
            res.should.to.be.a('object');    
            res.body.should.have.property('nextPlayer').eql('player2');
            res.body.should.have.property('winner').eql(true);
            done();
            });    

        });

        it("Player 1 gana al completar diagonal 1", (done) =>{
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 1, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 1, row: 1 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 2, row: 0 }).end();
           
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 2, row: 2 })
            .end((err, res) => {    
            res.should.have.status(200);            
            res.should.to.be.json;     
            res.should.to.be.a('object');    
            res.body.should.have.property('nextPlayer').eql('player2');
            res.body.should.have.property('winner').eql(true);
            done();
            });  
            
          
        });

        it("Player 1 gana al completar diagonal 2", (done) =>{
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 2 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 1, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 1, row: 1 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 2, row: 1 }).end();
           
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 2, row: 0 })
            .end((err, res) => {    
            res.should.have.status(200);            
            res.should.to.be.json;     
            res.should.to.be.a('object');    
            res.body.should.have.property('nextPlayer').eql('player2');
            res.body.should.have.property('winner').eql(true);
            done();
            });    


        });

        it("Player 1 gana, player 2 no puede mover, juego finalizado", (done) =>{
            let players = ["player1", "player2"]
            chai.request(server).post("/begin").send(players).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 0, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 1, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 1, row: 1 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 2, row: 0 }).end();
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player1', column: 2, row: 2 }).end();
           
            chai.request(server)
            .put("/game/move")
            .send( { player: 'player2', column: 1, row: 2 })
            .end((err, res) => {    
            res.should.have.status(400);            
            res.should.to.be.json;     
            res.should.to.be.a('object');    
            res.body.should.have.property('isFinished').eql(true);
            done();
            });  
            
          
        });


    });
});    



