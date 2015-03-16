/************************************************************************************************************

************************************************************************************************************/

var flyingSpeed = 25;
var url_addProductToBasket = 'addProduct.php/';
var url_removeProductFromBasket = 'removeProduct.php/';
var txt_totalPrice = 'Total: ';


var shopping_cart_div = false;
var flyingDiv = false;
var currentProductDiv = false;

var shopping_cart_x = false;
var shopping_cart_y = false;

var slide_xFactor = false;
var slide_yFactor = false;

var diffX = false;
var diffY = false;

var currentXPos = false;
var currentYPos = false;

var ajaxObjects = new Array();


function shoppingCart_getTopPos(inputObj)
{		
  var returnValue = inputObj.offsetTop;
  while((inputObj = inputObj.offsetParent) != null){
  	if(inputObj.tagName!='HTML')returnValue += inputObj.offsetTop;
  }
  return returnValue;
}

function shoppingCart_getLeftPos(inputObj)
{
  var returnValue = inputObj.offsetLeft;
  while((inputObj = inputObj.offsetParent) != null){
  	if(inputObj.tagName!='HTML')returnValue += inputObj.offsetLeft;
  }
  return returnValue;
}
	

function addToBasket(productId)
{
	if(!shopping_cart_div)shopping_cart_div = document.getElementById('shopping_cart');
	if(!flyingDiv){
		flyingDiv = document.createElement('DIV');
		flyingDiv.style.position = 'absolute';
		document.body.appendChild(flyingDiv);
	}
	
	shopping_cart_x = shoppingCart_getLeftPos(shopping_cart_div);
	shopping_cart_y = shoppingCart_getTopPos(shopping_cart_div);
	currentProductDiv = document.getElementById('slidingProduct' + productId);
	
	currentXPos = shoppingCart_getLeftPos(currentProductDiv);
	currentYPos = shoppingCart_getTopPos(currentProductDiv);
	
	diffX = shopping_cart_x - currentXPos;
	diffY = shopping_cart_y - currentYPos;
	
	var shoppingContentCopy = currentProductDiv.cloneNode(true);
	shoppingContentCopy.id='';
	flyingDiv.innerHTML = '';
	flyingDiv.style.left = currentXPos + 'px';
	flyingDiv.style.top = currentYPos + 'px';
	flyingDiv.appendChild(shoppingContentCopy);
	flyingDiv.style.display='block';
	flyingDiv.style.width = currentProductDiv.offsetWidth + 'px';
	flyToBasket(productId);
}

function flyToBasket(productId)
{
	
	var maxDiff = Math.max(Math.abs(diffX),Math.abs(diffY));
	var moveX = (diffX / maxDiff) * flyingSpeed;;
	var moveY = (diffY / maxDiff) * flyingSpeed;	
	
	currentXPos = currentXPos + moveX;
	currentYPos = currentYPos + moveY;
	
	flyingDiv.style.left = Math.round(currentXPos) + 'px';
	flyingDiv.style.top = Math.round(currentYPos) + 'px';	
	
	
	if(moveX>0 && currentXPos > shopping_cart_x){
		flyingDiv.style.display='none';		
	}
	if(moveX<0 && currentXPos < shopping_cart_x){
		flyingDiv.style.display='none';		
	}
		
	if(flyingDiv.style.display=='block')setTimeout('flyToBasket("' + productId + '")',10); else ajaxAddProduct(productId);	
}

function showAjaxBasketContent(ajaxIndex)
{
	// Getting a reference to the shopping cart items table
	var itemBox = document.getElementById('shopping_cart_items');
	
	var productItems = ajaxObjects[ajaxIndex].response.split('|||');	// Breaking response from Ajax into tokens
	//alert(productItems[0]);
	//alert(productItems[1]);
	
	
	if(document.getElementById('shopping_cart_items_product' + productItems[0])){	// A product with this id is allready in the basket - just add number items
	alert("true");
		var row = document.getElementById('shopping_cart_items_product' + productItems[0]);
		var items = row.cells[0].innerHTML /1;
		items = items + 1;
		row.cells[0].innerHTML = items;
	}else{	// Product isn't allready in the basket - add a new row
	alert("false");
		var tr = itemBox.insertRow(-1);
		tr.id = 'shopping_cart_items_product' + productItems[0]
		
		var td = tr.insertCell(-1);
		td.innerHTML = '1'; 	// Number of items
		
		var td = tr.insertCell(-1);
		td.innerHTML = productItems[1]; 	// Description
		
		var td = tr.insertCell(-1);
		td.style.textAlign = 'right';
		td.innerHTML = productItems[2]; 	// Price	
		
		var td = tr.insertCell(-1);
		var a = document.createElement('A');
		td.appendChild(a);
		a.href = '#';
		a.onclick = function(){ removeProductFromBasket(productItems[0]); };
		var img = document.createElement('IMG');
		img.src = 'site_media/images/remove.gif';
		a.appendChild(img);
		//td.innerHTML = '<a href="#" onclick="removeProductFromBasket("' + productItems[0] + '");return false;"><img src="images/remove.gif"></a>';	
	} 


	updateTotalPrice();
	
	ajaxObjects[ajaxIndex] = false;		
	
}

function updateTotalPrice()
{
	var itemBox = document.getElementById('shopping_cart_items');
	
	// Calculating total price and showing it below the table with basket items
	var totalPrice = 0;
	if(document.getElementById('shopping_cart_totalprice')){
		for(var no = 1; no<itemBox.rows.length; no++){
			/*alert(itemBox.rows[no].cells[0].innerHTML);
			alert(itemBox.rows[no].cells[1].innerHTML);
			alert(itemBox.rows[no].cells[2].innerHTML);
			*/
			totalPrice = totalPrice + (itemBox.rows[no].cells[0].innerHTML.replace(/[^0-9]/g) * itemBox.rows[no].cells[2].innerHTML);
			
		}		
		document.getElementById('shopping_cart_totalprice').innerHTML = txt_totalPrice + totalPrice.toFixed(2);
	}		
}

function removeProductFromBasket(productId)
{
	var productRow = document.getElementById('shopping_cart_items_product' + productId);
	
	var numberOfItemCell = productRow.cells[0];
	if(numberOfItemCell.innerHTML == '1'){
		productRow.parentNode.removeChild(productRow);	
	}else{
		numberOfItemCell.innerHTML = numberOfItemCell.innerHTML/1 - 1;
	}
	updateTotalPrice();
	ajaxRemoveProduct(productId);	
}

function ajaxValidateRemovedProduct(ajaxIndex)
{
	//if(ajaxObjects[ajaxIndex].response!='OK')
		//alert('Error while removing product from the database');
}


function ajaxAddProduct(productId)
{
	var ajaxIndex = ajaxObjects.length;
	
	ajaxObjects[ajaxIndex] = new sack();
	ajaxObjects[ajaxIndex].requestFile = url_addProductToBasket;	// Saving product in this file
	ajaxObjects[ajaxIndex].setVar('productId',productId);
	ajaxObjects[ajaxIndex].onCompletion = function(){ showAjaxBasketContent(ajaxIndex); };	// Specify function that will be executed after file has been found
	ajaxObjects[ajaxIndex].runAJAX();		// Execute AJAX function		
}

function ajaxRemoveProduct(productId)
{
	var ajaxIndex = ajaxObjects.length;
	ajaxObjects[ajaxIndex] = new sack();
	ajaxObjects[ajaxIndex].requestFile = url_removeProductFromBasket;	// Saving product in this file
	ajaxObjects[ajaxIndex].setVar('productIdToRemove',productId);
	ajaxObjects[ajaxIndex].onCompletion = function(){ ajaxValidateRemovedProduct(ajaxIndex); };	// Specify function that will be executed after file has been found
	ajaxObjects[ajaxIndex].runAJAX();		// Execute AJAX function		
}