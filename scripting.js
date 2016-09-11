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
	
   // start angle, it should be defined more angles like 30, 45 and 60.... 
	     
   var ax = 0; //angle corection x-axis
   var ay = 0; //angle corection y-axis

   var reflection_angle = function (r_angle){
	     if(r_angle === 30) { 
             ax=1.5;
             ay=1;
         }
         else if(r_angle === 45) {
             ax=1;
             ay=1;     
         }
         else if(r_angle === 60) {
             ax=1;
             ay=1.5;
         }
    };

	
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
                   
                    else if(this.x_position === table.left_margin && (this.y_position < player.y_position || this.y_position > player.y_position + player.paddle_length)) {
                          start_counter--;     
                    }
                   
             
                    else if(this.x_position === table.left_margin && (this.y_position < com.y_position || this.y_position > com.y_position + com.paddle_length)) {
                          start_counter--;     
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
               reflection_angle(60);
               this.x_position=600;
               this.y_position=500;
               render();
               this.y_direction = -Math.abs(this.y_direction);
               this.x_direction = -Math.abs(this.y_direction);
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
 	
 	var player = new Paddle(30, 300, 5, 60);
 	var com = new Paddle(1005, 300, 5, 60);
 	var ball = new Ball(700, 500, 5);
 	var table = new Table(20, 20, 1000, 600);
  


 
 	//"Master" render function
 	
 	var render = function() {
 		table.render();
    	player.render();
    	com.render();
    	ball.render();
        renderResult();
 	};

// com movement
// put safery margins !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! top and down edge on the table...
var com_delay = 250; 

Paddle.prototype.comMove = function() {
         
             if(ball.x_position > this.x_position - com_delay && ball.x_direction > 0 && ball.y_position < this.y_position + this.paddle_length/2){
                        movement_step_paddle_com = -6;
                        this.y_position = this.y_position + movement_step_paddle_com; 
              }  
    
              
              else if( ball.x_position > this.x_position - com_delay && ball.x_direction > 0 && ball.y_position > this.y_position - this.paddle_length/2){
                        movement_step_paddle_com = 6;
                        this.y_position = this.y_position + movement_step_paddle_com;    
              }   
    
};


//show or render result

var player_score = 0; 
var com_score = 0; 

var renderResult = function(){
    
    if(ball.x_position === player.x_position+player.paddle_width && (ball.y_position < player.y_position || ball.y_position > player.y_position + player.paddle_length)) {
                          com_score++; 
                          document.getElementById("2").innerHTML = com_score;
    }   
      
    else if(ball.x_position === com.x_position && (ball.y_position < com.y_position || ball.y_position > com.y_position + com.paddle_length)) {
                          player_score++; 
                          document.getElementById("1").innerHTML = player_score;
    }    
}

 	
 
 // event listener for Paddle...
 
 window.addEventListener("keydown", function(event){
 	  			if(event.keyCode==87 || event.which ==87) {
 	  	  			 movement_step_paddle_player= -15;
                     player.move();
 	  			} 
 	  			else if(event.keyCode==83 || event.which==83) {
 	  				 movement_step_paddle_player= 15;
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


 var start_counter = 0;
 
 var step = function() {	   
         if(start_counter===0){
             ball.serve_the_ball();
             start_counter++;  
         }
         else{
            com.comMove();
            ball.move();
            render(); 
            alert(ball.x_position + ' ' +  ball.y_position + ' ' + ball.y_direction);
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
	

	
	
	
	