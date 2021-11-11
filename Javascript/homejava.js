/* Name: Jamie Farrant
   File Type: Javascript
   Last Update: 8/10/21 @ 22:01
   Is this amazingly efficient? No. Does it work? Almost.
*/

document.addEventListener('DOMContentLoaded', function() {
 
    //On page load, sets up listeners
        "use strict"
        setUpListeners();
        ready();
    })

//Function that sets listeners up to execute functions when requirements are met. Used to keep Js out of HTML document.
function setUpListeners(){
document.getElementById("add_destination_button").addEventListener('click', function() {addDestination_onClick(); destDistCalc();});
document.getElementById("remove_destination_button").addEventListener('click', function() {removeDestination_onClick(); destDistCalc();});
document.getElementById("fuel_calculate_button").addEventListener('click', function(){calculateFuel_onClick();});
document.getElementById("save_trip_button").addEventListener('click', function(){store();});
document.getElementById("get_trip_button").addEventListener('click', function(){getTrip();});
document.getElementById("destination_calculation_button").addEventListener('click', function(){returnToStart(); destDistCalc();});
document.getElementById("theme_select").addEventListener('change', function(){changeTheme();});
document.getElementById("close_window_button").addEventListener('click', function (){closeWindow();});
document.getElementById("refresh_button").addEventListener('click', function(){refreshWindow();});
}

//Function that closes the window/exits the program
function closeWindow(){
    window.open('', '_self', ''); window.close();
}

//Function that refreshes/resets the page on click
function refreshWindow(){
    window.location.href=window.location.href
}

//Allows the array to become the select options found in the dropdown menu.
function ready() {
       

    var sel = document.getElementById("place_list");
    for(var i = 0; i < places.length; i++) {
     var opt = document.createElement('option');
     opt.innerHTML = places[i];
     opt.value = places[i];
     sel.appendChild(opt);
   }
 }

//the new Array formed from the destination list
const destinationArray = []

//Function that adds a user chosen destination from the select menu to the list.
function addDestination_onClick() {
    var destinationList = document.getElementById("destination_list");
    var destination = document.getElementById("place_list");
    var li = document.createElement("li");
    li.setAttribute('id', destination.value);
    li.appendChild(document.createTextNode(destination.value));
    destinationList.appendChild(li);

    destinationArray.splice(destinationArray.length, 0, destination.value);
    console.log(destinationArray);
}

// Function that removes the user defined item from the destination list
function removeDestination_onClick() {

    // Declares variable to retrieve set element
    var destinationList = document.getElementById("destination_list");
    var destination = document.getElementById("place_list");
    var selectedDestination = document.getElementById(destination.value);
    destinationList.removeChild(selectedDestination);

     //Removes the item from the destination array to produce correct result
    

    const index = destinationArray.indexOf(destination.value);
    if (index > -1) {
    destinationArray.splice(index, 1);
    console.log(destinationArray);
    }

}

//Function to calculate fuel cost of trip, currently requires all user input.
function calculateFuel_onClick(){
    let D = traveled;
    let FE = document.getElementById("fuel_efficiency_input").value;
    let FC = document.getElementById("fuel_cost_input").value;
    
    document.getElementById("fuel_cost_output").innerHTML = (D/100) * (FE) * (FC);
}

// Put the destination array into local storage
function store() {
    var destinationList = document.getElementById("destination_list");
    localStorage.setItem('Array', JSON.stringify(destinationArray));
}
    
// Retrieve the destination array from local storage
function getTrip(){
    var retrievedObject = localStorage.getItem('Array');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    document.getElementById('destination_list').innerHTML = 'Your destinations are:  ' + retrievedObject 
}

//Array which contains all town names required
const places = ["Alexandra", "Blenheim", "Christchurch","Collingwood", "Cromwell", "Dunedin", "Franz-Josef","Geraldine","Gore", "Greymouth", "Haast", "Invercargill", "Kaikoura","Lake Tekapo", "Milford Sound", "Mount Cook", "Murchison", "Nelson", "Oamaru", "Picton", "Queenstown", "Te Anau", "Timaru","Twizel", "Wanaka", "Westport"];

//Array which has all town distances, courtesy of Alistair
const distances= [
        [0,786,755,964,31,190,373,315,136,661,231,202,657,227,370,242,734,865,223,791,93,249,307,169,86,761],
        [786,0,308,251,733,670,486,446,821,324,643,887,129,534,1081,639,153,116,555,28,794,960,471,592,745,254],
        [755,308,0,509,410,362,395,138,513,258,535,579,183,226,773,331,292,424,247,336,486,652,163,284,424,333],
        [964,251,509,0,939,871,582,697,1022,384,720,1088,380,785,1232,840,219,135,756,245,961,1117,672,843,839,320],
        [31,733,410,939,0,221,342,273,167,526,200,233,607,196,336,201,693,845,228,761,62,217,268,138,55,639],
        [190,670,362,871,221,0,563,232,151,551,421,217,545,3030,411,331,654,786,115,698,283,290,199,261,276,695],
        [373,486,395,582,342,563,0,481,509,176,142,575,550,485,678,498,340,469,506,531,404,560,493,427,287,277],
        [315,446,138,697,273,232,481,0,387,329,431,449,321,88,635,187,430,562,123,474,346,516,35,146,286,432],
        [136,821,513,1022,167,151,509,387,0,704,367,66,696,363,260,378,842,937,266,849,169,139,350,316,222,804],
        [661,324,258,384,526,551,176,329,704,0,316,769,338,417,860,510,167,292,443,352,583,739,352,475,469,101],
        [231,643,535,720,200,421,142,431,367,316,0,433,710,343,539,356,503,609,376,671,262,418,418,285,145,437],
        [202,887,579,1088,233,217,575,449,66,769,433,0,762,429,278,444,871,1003,332,915,187,152,416,371,285,869],
        [657,129,183,380,607,545,550,321,696,338,710,762,0,409,956,514,299,245,430,157,669,835,346,467,607,340],
        [227,534,226,785,196,3030,485,88,363,417,343,429,409,0,532,99,518,650,188,562,258,428,104,58,198,559],
        [370,1081,773,1232,336,411,678,635,260,860,539,278,956,532,0,550,1029,1146,526,1108,291,121,610,474,394,951],
        [242,639,331,840,201,331,498,187,378,510,356,444,514,99,550,0,623,755,216,667,263,429,211,63,211,664],
        [734,153,292,219,693,654,340,430,842,167,503,871,299,518,1029,623,0,129,539,191,775,944,455,576,715,101],
        [865,116,424,135,845,786,469,562,937,292,609,1003,245,650,1146,755,129,0,671,110,693,1025,587,708,587,226],
        [223,555,247,756,228,115,506,123,266,443,376,332,430,188,526,216,539,671,0,583,319,404,84,146,231,580],
        [791,28,336,245,761,698,531,474,849,352,671,915,157,562,1108,667,191,110,583,0,822,988,499,620,733,288],
        [93,794,486,961,62,283,404,346,169,583,262,187,669,258,291,263,775,693,319,822,0,170,335,200,117,664],
        [249,960,652,1117,217,290,560,516,139,739,418,152,835,428,121,429,944,1025,404,988,170,0,489,370,273,830],
        [307,471,163,672,268,199,493,35,350,352,418,416,346,104,610,211,455,587,84,499,335,489,0,162,273,497],
        [169,592,284,843,138,261,427,146,316,475,285,371,467,58,474,63,576,708,146,620,200,370,162,0,140,617],
        [86,745,424,839,55,276,287,286,222,469,145,285,607,198,394,211,715,587,231,733,117,273,273,140,0,558],
        [761,254,333,320,639,695,277,432,804,101,437,869,340,559,951,664,101,226,580,288,664,830,497,617,558,0],
]

/* Calculates the distance between destinations found in the destination array, while also ensuring that the trip is roundabout automatically, 
regardless of whether the user specified it in their destination list
Error checking is also present within this function as well */
function destDistCalc() {

    const destList = destinationArray;
    const townList = places;
    const townDistance = distances;

        i = 0;
        traveled = 0;
        while((destList.length-1) > i) {
            destination1 = townList.indexOf(destList[i]);
            destination2 = townList.indexOf(destList[(i+1)]);
            distance = townDistance[Number(destination1)];
            traveled += distance[Number(destination2)];
            i+=1;
            console.log(traveled, destination1, destination2, distance);
            document.getElementById('output').innerHTML = 'The length of your trip is: ' + traveled + ' km';
            document.getElementById("distance_input").innerHTML = traveled;
        }
}

//Adds the first location of the itinerary to the end of the array to calculate a 'full round trip'
function returnToStart(){
    destinationArray.push(destinationArray[0]);
    console.log(destinationArray);
}