   	 var canvas = document.createElement('canvas');
     document.body.appendChild(canvas);
     canvas.height = '700';
     canvas.width = '1400';
     var table_context = canvas.getContext('2d');

  	 
  	 var movement_step_paddle_player = 0;
     var movement_step_paddle_com = 0;
  	 
  	 // Paddle object
  	 function Paddle(xpos, ypos, pwidth, plength) {

	     this.x_position = xpos;
	     this.y_position = ypos;
	     this.paddle_width = pwidth;
	     this.paddle_length = plength;
	     
	     this.move = function(){
	     	  if((this.y_position > 20 && movement_step_paddle_player < 0) || (this.y_position + 1 + this.paddle_length + 1 < 622  && movement_step_paddle_player >0)){
	     	  	       this.y_position += movement_step_paddle_player; 
	     	  }  	         
	     };
	     
	     this.render = function() {
	       table_context.beginPath();
           table_context.rect(this.x_position, this.y_position, this.paddle_width, this.paddle_length);
           table_context.fillStyle = 'red';
           table_context.fill();
           table_context.lineWidth = 1;
           table_context.strokeStyle = 'red';
           table_context.stroke();
	     };
	};
	  
	// movement and the speed of the ball at te same time
   var movement_step_ball = 6; 
	
   // start angle
	     
   var ax = 0; //angle corection x-axis
   var ay = 0; //angle corection y-axis

   var reflection_angle = function (r_angle){
	     if(r_angle === 30) { 
             ax=1.20;
             ay=1;
         }
         else if(r_angle === 45) {
             ax=1;
             ay=1;     
         }
         else if(r_angle === 60) {
             ax=1;
             ay=1.4;
         }
    };

    //result
    var player_score = 0; 
    var com_score = 0; 
 
    var show_player_score = document.getElementById("player");
    show_player_score.style.color = "red";
    show_player_score.style.fontSize = "900%";
    show_player_score.style.fontWeight = "900"
    show_player_score.style.opacity = "0.2";
    show_player_score.style.position = "absolute";
    show_player_score.style.left = '431px';
    show_player_score.style.top = '50px';



    var show_com_score = document.getElementById("com");
    show_com_score.style.color = "red";
    show_com_score.style.fontSize = "900%";
    show_com_score.style.fontWeight = "900";
    show_com_score.style.opacity = "0.2";
    show_com_score.style.position = "absolute";
    show_com_score.style.left = '571px';
    show_com_score.style.top = '50px';
 

    //d.style.left = x_pos+'px';
    //d.style.top = y_pos+'px';
    
   
 

	
	 // Ball object
	function Ball(xpos, ypos, bradius) {

	     this.x_position = xpos;
	     this.y_position = ypos;
	     this.ball_radius = bradius;
	     this.counterClockwise = false;
         this.direction_correction = -1;
         this.y_direction = 1;
         this.x_direction = 1;
         this.line_width = 1;
         var current_y_position = 0;
         
	     this.render = function() {
	       table_context.beginPath();
           table_context.arc(this.x_position, this.y_position, this.ball_radius = bradius, 0, 2 * Math.PI, this.counterClockwise);
           table_context.lineWidth = this.line_width;
           table_context.fillStyle = 'white';
           table_context.fill();
           table_context.strokeStyle = 'white';
           table_context.stroke();
	     };
	     
	     
	     this.move = function(){	
             
	     	 		//COLLISION WITH THE TABLE TOP
	     	 		//left to right
	     			 if(this.y_position - this.ball_radius - 1 === 20 && this.x_direction > 0 && this.y_direction < 0) {
                          this.x_position += movement_step_ball * ax;
                          this.y_position += movement_step_ball * ay;
                          this.y_direction = this.y_direction * this.direction_correction;
                     }
             
                    // adjustment to prevent tunneling
                    // left to right
                    else if(this.y_position - this.ball_radius - 1 - movement_step_ball * ay < 20 && this.x_direction > 0 && this.y_direction < 0) {
                          this.y_position = 20 + this.ball_radius + 1;
                          this.x_position += (current_y_position - this.y_position) * (ax/ay);
                          this.y_direction = this.y_direction * this.direction_correction;
                    }
                     
                     
	     	 		//right to left
                     else if(this.y_position - this.ball_radius - 1 === 20 && this.x_direction < 0 && this.y_direction < 0) {
                         this.x_position -= movement_step_ball * ax;
                         this.y_position += movement_step_ball * ay;
                         this.y_direction = this.y_direction * this.direction_correction;
                     }
             
                     // adjustment to prevent tunneling
                    // right to left
                    else if(this.y_position - this.ball_radius - 1 - movement_step_ball * ay < 20 && this.x_direction < 0 && this.y_direction < 0) {
                          this.y_position = 20 + this.ball_radius + 1;
                          this.x_position -= (current_y_position - this.y_position) * (ax/ay);
                          this.y_direction = this.y_direction * this.direction_correction;
                    }
                 
                 
                
                 
                    //COLLISION WITH THE TABLE BOTTOM
	     	 		//left to right
                    else if(this.y_position+this.ball_radius+1 === 622 && this.x_direction > 0 && this.y_direction > 0) {
                        this.x_position += movement_step_ball * ax;
                        this.y_position -= movement_step_ball * ay;
                        this.y_direction = this.y_direction * this.direction_correction;
                    }
                   
                    // adjustment to prevent tunneling
                    //left to right
                    else if(this.y_position + this.ball_radius + 1 + movement_step_ball * ay > 622 && this.x_direction > 0 && this.y_direction > 0) {
                          this.y_position = 622 - this.ball_radius-1;
                          this.x_position += (current_y_position + this.ball_radius + 1 + movement_step_ball * ay - this.y_position) * (ax/ay);
                          this.y_direction = this.y_direction * this.direction_correction;
                    }
                 
                       
	     	 		//right to left
                     else if(this.y_position+this.ball_radius+1 === 622 && this.x_direction < 0 && this.y_direction > 0) {
                         this.x_position -= movement_step_ball * ax;
                         this.y_position -= movement_step_ball * ay;
                         this.y_direction = this.y_direction * this.direction_correction;
                     }
                 
                    // adjustment to prevent tunneling
                    //right to left
                    else if(this.y_position + this.ball_radius + 1 + movement_step_ball * ay > 622 && this.x_direction < 0 && this.y_direction > 0) {
                          this.y_position = 622 - this.ball_radius -1;
                          this.x_position -= (current_y_position + this.ball_radius + 1 + movement_step_ball * ay - this.y_position) * (ax/ay);
                          this.y_direction = this.y_direction * this.direction_correction;
                    }
                 
                 
                 
                 
                    //COLLISION WITH PEDDALS
             
                    //collision with left(player) paddle
                    //top to down
                    else if(this.x_position - this.ball_radius - 1 === 35 && this.y_position >= player.y_position && this.y_position <= player.y_position + 1 + player.paddle_length + 1 && this.x_direction < 0 && this.y_direction > 0) {
                       this.x_position += movement_step_ball * ax;
                       this.y_position += movement_step_ball * ay;
                       this.x_direction = this.x_direction * this.direction_correction;
                    }
                    
                    //collision with left(player) paddle
                    // top to down
                    // adjustment to prevent tunneling
                   else if(this.x_position - this.ball_radius - 1 - movement_step_ball < 35 && this.y_position >= player.y_position && this.y_position <= player.y_position + 1 + player.paddle_length + 1 && this.x_direction < 0 && this.y_direction > 0) {
                          this.x_position = 35 + this.ball_radius + 1;
                          this.y_position += (35 - (current_x_position - this.ball_radius - 1 - movement_step_ball)) * (ax/ay);
                          this.x_direction = this.x_direction * this.direction_correction;
                    }
             
                    //collision with left(player) paddle
                    //down to top
                    else if(this.x_position - this.ball_radius - 1 === 35 && this.y_position >= player.y_position && this.y_position <= player.y_position + 1 + player.paddle_length + 1 && this.x_direction < 0 && this.y_direction < 0) {
                       this.x_position += movement_step_ball * ax;
                       this.y_position -= movement_step_ball * ay;
                       this.x_direction = this.x_direction * this.direction_correction;
                    }
             
                    //collision with left(player) paddle
                    //down to top
                    // adjustment to prevent tunneling
                    else if(this.x_position - this.ball_radius - 1 - movement_step_ball < 35 && this.y_position >= player.y_position && this.y_position <= player.y_position + 1 + player.paddle_length + 1 && this.x_direction < 0 && this.y_direction < 0) {
                          this.x_position = 35 + this.ball_radius + 1;
                          this.y_position -= (35 - (current_x_position - this.ball_radius - 1 - movement_step_ball)) * (ax/ay);
                          this.x_direction = this.x_direction * this.direction_correction;
                    }
             
             
             
             
             
                      //collision with right(com) paddle
                    //top to down
                    else if(this.x_position + this.ball_radius + 1 === 1005 && this.y_position >= com.y_position && this.y_position <= com.y_position + 1 + com.paddle_length + 1 && this.x_direction > 0 && this.y_direction > 0) {
                       this.x_position -= movement_step_ball * ax;
                       this.y_position += movement_step_ball * ay;
                       this.x_direction = this.x_direction * this.direction_correction;
                    }
                    
                    //collision with right(com) paddle
                    // top to down
                    // adjustment to prevent tunneling
                   else if(this.x_position + this.ball_radius + 1 + movement_step_ball * ax > 1005 && this.y_position >= com.y_position && this.y_position <= com.y_position + 1 + com.paddle_length + 1 && this.x_direction > 0 && this.y_direction > 0) {
                          this.x_position = 1005 - this.ball_radius - 1;
                          this.y_position += (current_x_position + movement_step_ball * ax - this.x_position) * (ax/ay);
                          this.x_direction = this.x_direction * this.direction_correction;
                    }
             
                       //collision with right(com) paddle
                    //down to top
                    else if(this.x_position + this.ball_radius + 1 === 1005 && this.y_position >= com.y_position && this.y_position <= com.y_position + 1 + com.paddle_length + 1 && this.x_direction > 0 && this.y_direction < 0) {
                       this.x_position -= movement_step_ball * ax;
                       this.y_position -= movement_step_ball * ay;
                       this.x_direction = this.x_direction * this.direction_correction;
                    }
                    
                    //collision with right(com) paddle
                    // down to top
                    // adjustment to prevent tunneling
                   else if(this.x_position + this.ball_radius + 1 + movement_step_ball * ax > 1005 && this.y_position >= com.y_position && this.y_position <= com.y_position + 1 + com.paddle_length + 1 && this.x_direction > 0 && this.y_direction < 0) {
                          this.x_position = 1005 - this.ball_radius - 1;
                          this.y_position -= (current_x_position + movement_step_ball * ax - this.x_position) * (ax/ay);
                          this.x_direction = this.x_direction * this.direction_correction;
                    }
                    
                          
             
             
                    // serve again
                   
                    else if(this.x_position - 1 - this.ball_radius  <= 36 && (this.y_position < player.y_position || this.y_position > player.y_position + 1 + player.paddle_length + 1)) {
                          com_score++;
                          show_com_score.innerHTML = com_score;
                          serve_counter--;  
                          
                    }
                   
             
                    else if(this.x_position >= 1000 - this.ball_radius - 1  && (this.y_position < com.y_position || this.y_position > com.y_position + 1 + com.paddle_length + 1)) {
                          player_score++;
                          show_player_score.innerHTML = player_score;
                          serve_counter--; 
                          
                    }
                 
                    else {
                    //FREE MOVEMENTS
                    // free movement from left to right and up
                        if(this.y_position - this.ball_radius - 1 - movement_step_ball * ay >= 20 && this.x_position + this.ball_radius + 1 + movement_step_ball * ax <= 1005 && this.x_direction > 0 && this.y_direction < 0){
                            this.x_position += movement_step_ball * ax;
                            this.y_position -= movement_step_ball * ay;
                            current_y_position = this.y_position;
                            current_x_position = this.x_position;
                        }
                    // free movement from left to right and down
                        else if(this.y_position + this.ball_radius + 1 + movement_step_ball * ay <= 622 && this.x_position + this.ball_radius + 1 + movement_step_ball * ax <= 1005 && this.x_direction > 0 && this.y_direction > 0){
                            this.x_position += movement_step_ball * ax;
                            this.y_position += movement_step_ball * ay; 
                            current_y_position = this.y_position;
                            current_x_position = this.x_position;
                        }
                        
                        // free movement from right to left and up
                        else if(this.y_position - this.ball_radius - 1 - movement_step_ball * ay >= 20 && this.x_position-this.ball_radius -1 >= 35 &&   this.x_direction < 0 && this.y_direction < 0){
                            this.x_position -= movement_step_ball * ax;
                            this.y_position -= movement_step_ball * ay;
                            current_y_position = this.y_position;
                            current_x_position = this.x_position;
                        }
                        
                        // free movement from right to left and down
                        else if(this.y_position + this.ball_radius + 1 + movement_step_ball * ay <= 622 && this.x_position-this.ball_radius -1 >= 35 && this.x_direction < 0 && this.y_direction > 0){
                            this.x_position -= movement_step_ball * ax;
                            this.y_position += movement_step_ball * ay; 
                            current_y_position = this.y_position;
                            current_x_position = this.x_position;
                        }
                        
                    }
                        
	     };
	     
	     this.serve_the_ball = function() {
               reflection_angle(45);
               this.x_position=500;
               this.y_position=500;
               render();
               this.y_direction = Math.abs(this.y_direction);
               this.x_direction = Math.abs(this.x_direction);
	     };
	     
	};


   //Table constructor, making table
   
 	function Table(lmargin, tmargin, t_width, t_length) {
 		this.left_margin = lmargin;
 		this.top_margin = tmargin;
        this.table_width = t_width;
 		this.table_length = t_length;	
 				
  		this.render = function(){
  		   table_context.beginPath();
           table_context.rect(this.left_margin, this.top_margin, this.table_width, this.table_length);
           table_context.fillStyle = 'black';
           table_context.fill();
           table_context.lineWidth = 1;
           table_context.strokeStyle = 'black';
           table_context.stroke();
 		};
           
 	};
 	
 	
 	
 	// start positions of all objects
 	
 	var player = new Paddle(30, 300, 5, 100);
 	var com = new Paddle(1005, 300, 5, 100);
 	var ball = new Ball(700, 500, 5);
 	var table = new Table(20, 20, 1000, 600);
  


 
 	//"Master" render function
 	
 	var render = function() {
 		table.render();
    	player.render();
    	com.render();
    	ball.render();
 	};

// com movement
var com_delay = 300; 
var com_stop_react = 5;

Paddle.prototype.comMove = function() {
         
             if(ball.x_position > this.x_position - com_delay && ball.x_position < this.x_position - com_stop_react && (ball.x_direction > 0 || (ball.x_direction < 0 && ball.x_position > this.x_position - 350)) && this.y_position  >= 20 && this.y_position > ball.y_position ){
                        movement_step_paddle_com = -8;
                        if  (this.y_position + movement_step_paddle_com < 20) {
                            this.y_position = 20;
                        } else {
                            this.y_position = this.y_position + movement_step_paddle_com; 
                        }         
              }  
    
              
              else if( ball.x_position > this.x_position - com_delay && ball.x_position < this.x_position - com_stop_react && (ball.x_direction > 0 || (ball.x_direction < 0 && ball.x_position > this.x_position - 350)) && this.y_position + 1 + this.paddle_length + 1 <= 622 && this.y_position + 1+ this.paddle_length + 1 < ball.y_position ){
                        movement_step_paddle_com = 8;
                        if  (this.y_position + this.paddle_length + movement_step_paddle_com > 622) {
                            this.y_position = 622 - 1 - this.paddle_length - 1;
                        } else {
                            this.y_position = this.y_position + movement_step_paddle_com; 
                        }  
                         
              }   
    
};





 	
 
 // event listener for Paddle...
 
 window.addEventListener("keydown", function(event){
 	  			if(event.keyCode==87 || event.which ==87) {
 	  	  			 movement_step_paddle_player= -10;
                     player.move();
 	  			} 
 	  			else if(event.keyCode==83 || event.which==83) {
 	  				 movement_step_paddle_player= 10;
 	  				 player.move();
 	  			}
 });
 	

//window.addEventListener("keydown", function(event){
 	  			//if(event.keyCode==80 || event.which ==80) {
 	  	  			 //movement_step_paddle= -50;
 	  	   		     //com.move();
 	  			//} 
 	  			//else if(event.keyCode==76 || event.which==76) {
 	  				//movement_step_paddle= 50;
 	  				//com.move();
 	  			//}
 //});


 var serve_counter = 0;

 
 var step = function() {	   
         if(serve_counter===0){
             //window.addEventListener("keydown", function(event) { 
                 //if(event.keycode == 32 || event.which == 32) { 
                    ball.serve_the_ball();
                    serve_counter++;  
                 //} 
             //});
         }
         else{
            com.comMove();
            ball.move();
            render(); 
         };
          	   	
  	   	requestAnimationFrame(step);   
  };

 //refreshing window akka animation
 	
 	var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        requestAnimationFrame(animate);
 	
 	    
 window.onload = animate(step);
	

	
	
	
	