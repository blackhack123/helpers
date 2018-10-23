//need instance the position col, for this count include the hidden cols(hidden:true)
var colPos = 3;
//id from your Grid
var myGrid = $('#example');
//this line hidden the complete col
myGrid.jqGrid('hideCol', myGrid.getGridParam("colModel")[colPos].name);
