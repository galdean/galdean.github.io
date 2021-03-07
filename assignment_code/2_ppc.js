
		employees = [
			"Phyllis",
			"Angela",
			"Dwight",
			"Oscar",
			"Creed",
			"Pam",
			"Jim",
			"Stanley",
			"Michael",
			"Kevin",
			"Kelly"
		];
		var list1 = [];
		var id = 0;
			function deleteOneReset(){
           		id = 0;
           		$(".drag").remove();
           		$(".drag2").remove();
           		existingList();

			}
			function list_delete(x){
				//splice found online but can't find the site url at the moment
				id--;
				list1.push(employees[x]);
				for(var j=0;j<employees.length;j++){
    				if(j == x){
        					employees.splice(x,1);
    				}
				}
			}
			function list_delete2(x){
				//splice found online but can't find the site url at the moment
				id--;
				employees.push(list1[x]);
				for(var j=0;j<list1.length;j++){
    				if(j == x){
        					list1.splice(x,1);
    				}
				}
			}
			function existingList(){
				i =0;
				while(i<employees.length){
					$(".non-ppc").append("<div class='col-md-12 drag'>"+ id + " " +employees[i]+ "</div>");
					i++;
					id++;
				}
				i= 0;
				id = 0;
				while(i<list1.length){
					$(".ppc").append("<div class='col-md-12 drag2'>"+ id + " " +list1[i]+ "</div>");
					i++;
					id++;
				}
			}
		$(document).ready(function(){

				existingList();

		$(document).on({
			click: function(){
				$(".drag2").draggable();
				$("#non-ppc-label").droppable(
					{

						accept:".drag2",
						drop :function(event, ui)
						{
							var n = ui.draggable.html().charAt(0);
							list_delete2(n);
							deleteOneReset();
						}
					});
			},
			mouseenter: function(){
					$(this).css({"background": "rgb(255,255,153)", "cursor": "move"});
			},
			mouseleave: function(){
					$(this).css({"background": "white", "cursor": "defautl"});
			}

	}, ".drag2");


		$(document).on({
			click: function(){
				$(".drag").draggable();
				$("#ppc-label").droppable(
					{
						accept:".drag",
						drop :function(event, ui)
						{
							var n = ui.draggable.html().charAt(0);
							list_delete(n);
							deleteOneReset();
						}
					});
			},
			mouseenter: function(){
					$(this).css({"background": "rgb(255,255,153)", "cursor": "move"});

			},
			mouseleave: function(){
					$(this).css({"background": "white", "cursor": "default"});
			}

			}, ".drag");	
		});			
