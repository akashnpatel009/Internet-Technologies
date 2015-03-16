<?

/* 	Input to this file $_POST['productId'] 

This file outputs a string in this format

productId|||productDescription|||price,

i.e. ID of product followed by 3 pipes followed by a description of the product followed by 3 pipes followed by the price

*/

/* This is code only for the demo - You would most likely use a database for this */


if(!isset($_POST['productId']))exit;	/* No product id sent as input to this file */

switch($_POST['productId']){
	
	case "1";
		echo "1|||Calendar|||50";
		break;
	case "2";
		echo "2|||Shopping module|||250";
		break;
	case "3";
		echo "3|||Menu package|||35";
		break;	
	case "4";
		echo "4|||Ajax component|||50";
		break;
	case "5";
		echo "5|||Week planner|||60";
		break;
	case "6";
		echo "6|||Forum package|||150";
		break;
	case "7";
		echo "7|||HTML editor|||150";
		break;
	case "8";
		echo "8|||CSS creator|||125";
		break;
	
	
	
}


?>