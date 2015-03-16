<?

/* 	Input to this file $_POST['productIdToRemove'] 

This file only updates the database, i.e. remove a product from the shopping basket. It outputs the string "OK" if everything is correct.
*/

/* This is code only for the demo - You would most likely use a database for this */


if(!isset($_POST['productIdToRemove']))die("Not OK");	/* No product id sent as input to this file */

// Add your db queries here

echo "OK";


?>