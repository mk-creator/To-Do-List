
$(function(){
    for(var i=1; i<localStorage.length+1; i++){
        var ListArray = JSON.parse(localStorage.getItem(i.toString()));
        addListFunc(ListArray[0],i);
        
        for(var j=1; j<ListArray.length; j++){
            plusFuncInitial( ListArray[j] , i.toString())    
        }
        
    }
});

function plusFuncInitial(InputValue,code){
    // var code = source.id.split("_")[1];
    // $( "#pressed_"+code ).toggle();
    // $( "#original_"+code ).toggle();
    // var InputValue = document.getElementById("plusInput_"+code).value;
    // var itemsArray = JSON.parse(localStorage.getItem(code));   
    // itemsArray.push(InputValue);
    // localStorage.setItem(code,JSON.stringify(itemsArray));
    var ul = document.getElementById("ul_"+code);
    var li = document.createElement("li");
    li.className = "listItem";
    li.setAttribute("ontouchstart","TouchStart(this)");
    li.appendChild(document.createTextNode(InputValue));
    ul.appendChild(li);
    // document.getElementById("plusInput_"+code).value = "";
}



function addListButton(){
    $( "div.addListButton" ).toggle();
    $( "div.addListInput" ).toggle();
}

function deleteListButton(){
    $( ".delete" ).toggle();
    $(".addButton").toggle();
}

function deleteFunc(source){
    var code = source.id.split("_")[1];
    $("#List_"+code).remove();
    localStorage.removeItem(code);
    $( ".delete" ).toggle();
    $(".addButton").toggle();
    remakeFunc();
}

function remakeFunc(){
    var tempArray = [];
    for(var i=0; i<localStorage.length; i++){
        var key = localStorage.key(i);
        tempArray.push(localStorage.getItem(key));
    }
    localStorage.clear();
    for(var j=0; j<tempArray.length; j++){
        var use = (j+1).toString();
        // console.log(use);
        localStorage.setItem(use , tempArray[j]);
    }
}

function addListInput(){
    var InputValue = document.getElementById("addListInput").value;
    document.getElementById("addListInput").value = "";
    $( "div.addListButton" ).toggle();
    $( "div.addListInput" ).toggle();
    var currentnum = localStorage.length + 1;
    var itemsArray = [InputValue];
    localStorage.setItem(currentnum.toString(),JSON.stringify(itemsArray));
    addListFunc(InputValue , currentnum);
}

function showPlus(source){
    var code = source.id.split("_")[1];
    $( "#pressed_"+code ).toggle();
    $( "#original_"+code ).toggle();
}

function plusFunc(source){
    var code = source.id.split("_")[1];
    $( "#pressed_"+code ).toggle();
    $( "#original_"+code ).toggle();
    var InputValue = document.getElementById("plusInput_"+code).value;
    var itemsArray = JSON.parse(localStorage.getItem(code));   
    itemsArray.push(InputValue);
    localStorage.setItem(code,JSON.stringify(itemsArray));
    var ul = document.getElementById("ul_"+code);
    var li = document.createElement("li");
    li.className = "listItem";
    li.setAttribute("ontouchstart","TouchStart(this)");
    li.appendChild(document.createTextNode(InputValue));
    ul.appendChild(li);
    document.getElementById("plusInput_"+code).value = "";
}


function addListFunc(input,num){

    var tempbody = document.getElementById("body");
    var tempsection = document.createElement("section");
    tempsection.id = "List_"+num;
    tempbody.appendChild(tempsection);
    
    // first outer div
    var tempdiv1 = document.createElement("div");
    tempdiv1.className = "heading";
    tempsection.appendChild(tempdiv1);

    // first inner div
    var tempdiv2 = document.createElement("div");
    tempdiv2.className = "dropdown";
    tempdiv1.appendChild(tempdiv2);
    
    var tempbut1 = document.createElement("button");
    tempbut1.id="drop_"+num; tempbut1.className="dropdown";
    var temphead = document.createElement("h1");
    temphead.innerHTML = input;
    temphead.id = "heading_"+num;
    tempdiv2.appendChild(tempbut1);
    tempdiv2.appendChild(temphead);

    var tempdivnew1 = document.createElement("div");
    tempdivnew1.className = "original"; tempdivnew1.id = "original_"+num;
    tempdiv1.appendChild(tempdivnew1);

    var tempbut2 = document.createElement("button");
    tempbut2.id="add_"+num; tempbut2.className="addButton" ; tempbut2.innerText="Add";
    tempdivnew1.appendChild(tempbut2);

    var tempbut21 = document.createElement("button");
    tempbut21.id="delete_"+num; tempbut21.className="delete" ; tempbut21.innerText="x";
    tempdivnew1.appendChild(tempbut21);

    var tempdivnew2 = document.createElement("div");
    tempdivnew2.className = "pressed"; tempdivnew2.id = "pressed_"+num;
    tempdiv1.appendChild(tempdivnew2);
    
    var tempinput = document.createElement("input");
    tempinput.type="text";
    tempinput.id="plusInput_"+num;
    tempinput.className="plusInput";
    tempinput.placeholder="Name of Task";
    tempdivnew2.appendChild(tempinput);
        
    var tempbut3 = document.createElement("button");
    tempbut3.id="plus_"+num; tempbut3.className="plus" ; tempbut3.innerText="+";
    tempdivnew2.appendChild(tempbut3);
    
    var tempdiv3 = document.createElement("div");
    tempdiv3.className = "close";
    tempdiv3.id = "div_"+num;
    tempsection.appendChild(tempdiv3);
    
    var tempul = document.createElement("ul");
    tempul.id = "ul_"+num; tempul.style = "list-style: none";
    tempdiv3.appendChild(tempul);

    $("#drop_"+num).attr("onclick","dropdownFunc(this)");
    $("#heading_"+num).attr("onclick","dropdownFunc(this)");
    $("#add_"+num).attr("onclick","showPlus(this)");
    $("#plus_"+num).attr("onclick","plusFunc(this)");
    $("#delete_"+num).attr("onclick","deleteFunc(this)");


}


function TouchStart(source){
    // Reset values to use in handleMouseMove()
    
    cursorXPosition = 0;
    cursorXPositionDiff = 0;
    source.addEventListener("touchend", function(){HandleTouchEnd(source);});
    source.addEventListener("touchmove", function(){HandleTouchMove(source);});
	    
}

function HandleTouchMove(source) {
    event.stopPropagation();
    if ( cursorXPosition === 0 ) { cursorXPosition = event.touches[0].clientX; }
        
    // Set the margin-left of the list item to move with the mouse
	cursorXPositionDiff = event.touches[0].clientX - cursorXPosition;
    event.target.style.marginLeft = cursorXPositionDiff + 'px';
    event.target.style.marginRight = -cursorXPositionDiff + 'px';
    
	var taskIsNotCompleted = !(event.target.className.indexOf("completed") > -1);

	// Add class if the cursorXPositionDiff gets to a certain amount (40px)
	if ( cursorXPositionDiff > 40 && taskIsNotCompleted ) {
        source.classList.add('completing');
        
	} else if ( cursorXPositionDiff < -40 ) {
		source.classList.add('del');

	} else {
		source.classList.remove('completing');
		source.classList.remove('del');
	} 
}


function HandleTouchEnd(source) {
    
	var className = source.className;
    var old_element = source;
    var new_element = old_element.cloneNode(true);
    // console.log(old_element);
    // console.log(old_element.parentNode);
    old_element.parentNode.replaceChild(new_element, old_element);

    if ( className.indexOf('completing') > -1 ) {
		// SWIPE AWAY CURRENT LIST ITEM (RIGHT)
        t = setInterval(function(){
            var ml = parseInt(new_element.style.marginLeft.split("px")[0]);
            var mr = parseInt(new_element.style.marginRight.split("px")[0]);
            new_element.style.marginLeft = (ml + 20)+'px';
            new_element.style.marginRight = (mr - 20)+'px';
            
            if(mr<-500){
                clearInterval(t);
                new_element.classList.remove('completing');
                new_element.classList.add('completed');
                var ulid = $(new_element).parent().attr('id'); 
                $("#"+ulid+" li:last").after($(new_element));
                tt = setInterval(function(){
                    var ml = parseInt(new_element.style.marginLeft.split("px")[0]);
                    var mr = parseInt(new_element.style.marginRight.split("px")[0]);
                    new_element.style.marginLeft = (ml - 20)+'px';
                    new_element.style.marginRight = (mr + 20)+'px';
                    
                    if(mr>15){
                        clearInterval(tt);
                        new_element.classList.remove('completing');
                        new_element.classList.add('completed');
                        new_element.style.marginLeft = "-15px";
                        new_element.style.marginRight = "15px";
                        new_element.setAttribute("ontouchstart","TouchStart(this)");
                    }       
                },20);
            } 

        },20);
        


	} else if ( className.indexOf('del') > -1 ) {
		// SWIPE AWAY CURRENT LIST ITEM (LEFT)
        t = setInterval(function(){
            var ml = parseInt(new_element.style.marginLeft.split("px")[0]);
            var mr = parseInt(new_element.style.marginRight.split("px")[0]);
            new_element.style.marginLeft = (ml - 20)+'px';
            new_element.style.marginRight = (mr + 20)+'px';
            
            if(ml<-500){
                clearInterval(t);
                
                var code = new_element.parentNode.id.split("_")[1];
                var tempArray = JSON.parse(localStorage.getItem(code));   
                tempArray.splice(tempArray.indexOf(new_element.innerHTML) , 1);
                localStorage.setItem(code,JSON.stringify(tempArray));

                new_element.remove();
            }       
        },20);
        
        // swipeElement(source, false);

	} else {
		// REPOSITION LIST ITEM BACK TO NORMAL POSITION
        new_element.style.marginLeft = "-15px";
        new_element.style.marginRight = "15px";
        new_element.setAttribute("ontouchstart","TouchStart(this)");
	}

    // Remove mousemove listener, and re-add mousedown listeners to all list items
    
	// addMouseDownEventListener();
}





function dropdownFunc(source){
    var code = source.id.split("_")[1];
    $('#div_'+code).toggleClass('close');
    $('#drop_'+code).toggleClass('open');
}


