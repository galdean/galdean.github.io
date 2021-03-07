			var clients = [
			      "Shake Shack",
			      "Toast",
			      "Computer Science Department",
			      "Teacher's College",
			      "Starbucks",
			      "Subsconsious",
			      "Flat Top",
			      "Joe's Coffee",
			      "Max Caffe",
			      "Nussbaum & Wu",
			      "Taco Bell",
			];
			var sales = [
				{
					"salesperson": "James D. Halpert",
					"client": "Shake Shack",
					"reams": 100
				},
				{
					"salesperson": "Stanley Hudson",
					"client": "Toast",
					"reams": 400
				},
				{
					"salesperson": "Michael G. Scott",
					"client": "Computer Science Department",
					"reams": 1000
				},
			];
			
			var button_id = 0;
			function existingList(){
				i =0;
				while(i<sales.length){
					$("#updates").prepend("<div class='col-md-3'>"+ sales[i].salesperson +"</div><div class='col-md-6'>" + sales[i].client + "</div><div class='col-md-2'>" + sales[i].reams + "</div><div class='col-md-1'><button class='"+button_id+" remove'>X</button></div>");
					i++;
					button_id++;
				}
			}
			function autocomplete(){
				$("#client").autocomplete({source: clients});
			}	
			function create_post(){
				$("#updates").prepend("<div class='col-md-3'>Bruce Wayne</div><div class='col-md-6'>" + $("#client").val() + "</div><div class='col-md-2'>" + $("#num_of_reams").val() + "</div><div class='col-md-1'><button class='"+button_id+" remove'>X</button></div>");
				button_id++;
				sales.push({
					"salesperson": "Bruce Wayne",
					"client": $("#client").val(),
					"reams": $("#num_of_reams").val()
				});
			}
			function add_name(){
				var n = clients.includes(document.getElementById("client").value);
				if ( n == false){
					clients.push($("#client").val());
				}
			}
			function deleteOneReset(){
           		button_id = 0;
           		$("#updates").empty();
           		existingList();

			}
			function list_delete(x){
				//splice found online but can't find the site url at the moment
				button_id--;
				for(var j=0;j<sales.length;j++){
    				if(j == x){
        					sales.splice(j,1);
    				}
				}
			}
			function warnUser(){
				var first = 1;
				$("p").remove();
				var isCool = true;
				$("#updates").prepend("<div class='col-md-12'>");
				if($("#client").val() == ""){
					$("#updates").prepend("<p>...Client is empty...</p>");
					isCool = false;
					if(first == 1)
					{
						$("input[name=client]").focus();
					}
					first++;
				}

				if($("#num_of_reams").val()==""){
					$("#updates").prepend("<p>...Number of Reams is empty...</p>");

					if(first == 1)
					{
						$("input[name=reams]").focus();
					}
					isCool = false;
					first ++;
				}
				if( $.isNumeric($("#num_of_reams").val()) == false){
					$("#updates").prepend("<p>...Reams needs to be a number...</p>");
					isCool = false;

					if(first == 1)
					{
						$("input[name=reams]").focus();
					}
					first++;
				}
				$("#updates").prepend("</div>");
				return isCool;
				first++;

			}

			$(document).ready(function(){
				$("input[name=client]").focus();
				$("#client").keypress(function(){
					autocomplete();
				});
				existingList();
				$("#submit").click(function(){
					if(warnUser()){
						add_name();
						create_post();
						$("#client").val("");
						$("#num_of_reams").val("");
						$("p").remove();
						$("input[name=client]").focus();
						}
				});
				/*$(document).on("click", ".remove" ,function(){
					//removes an element on the page but doesn't update the json object
						 $(this).closest("button").remove(); // https://stackoverflow.com/questions/41440446/dynamically-create-delete-buttons //
				});*/
				$(document).on("click", ".remove" ,function(){
						 var n = ($(this).closest("button").attr("class").charAt(0)); // https://stackoverflow.com/questions/41440446/dynamically-create-delete-buttons //
						 list_delete(n);
						 deleteOneReset();
				});
				
				$("#num_of_reams").keyup(function(){
				/* https://howtodoinjava.com/jquery/jquery-detect-if-enter-key-is-pressed/.  Is where the following two lines are from */	
				var keycode = (event.keyCode ? event.keyCode : event.which);
    			if(keycode == '13'){
    				if (warnUser()) {
    				add_name();
					create_post();
					$("#client").val("");
					$("#num_of_reams").val("");
					$("p").remove();
					$("input[name=client]").focus();
				}
    			}
			});
			});