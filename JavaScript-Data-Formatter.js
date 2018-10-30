<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>JavaScript Data Formatter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body{
                font-size: 12pt;
                font-family: monospace;
                background-color: #252525;
                color: #ffa770;               
            }
            #output {
                font-size: 12pt;
                font-family: monospace;
                color: #ffa770;
            }
            .dataBoxes {
                border: 1px solid #898888;
                font-size: 12pt;
                font-family: monospace;
                min-width: 130px;
                height: 20px;
            }
            input {
                font-size: 12pt;
                font-family: monospace;
                background-color: #1b2937;
                color: #ff9e01c7;
            }
            input#prepend {
                width: 105px;
            }
            input#splitLeft {
                width: 88px;
            }
            input#splitRight {
                width: 98px;
            }
            input#append {
                width: 58px;
            }
            button {
                font-size: 12pt;
                border-radius: 7px;
                background-color: #649ade;
                cursor: pointer;
            }
          img {
            width: 100%;
            heigth: auto;
          }
        </style>
    </head>
    <body onkeydown="addRowKey(event)">
        <h1>JavaScript Data Formatter</h1>
        <p>
            The Generate Items button defines the number of data fields(wide) you wish your table to be.<br>
            Tab moves from left to right. Shift+Tab moves from right to left.<br>
            New rows the same width are added by the Add Row button or by pressing the alt key.<br>
            New rows of a different width can be added at any time by pressing the Generate Items button.<br>
            <br>
            When creating a .csv that has a comma in the data, follow this pattern: 
            <span style="color:#ffd901a5">,one value,"single,value",another value,</span><br>
            Copy pasting .csv files to html editors like Visual-Studio-Code or Atom may transfer unwanted line ending types.<br>
            Use a truly plain text editor for that like Sublime-Text, NotePad or NotePad++.<br>
        </p>
        <input id="prepend" type="text" value="<br>prepend">
        <input id="splitLeft" type="text" value="splitLeft">
        data
        <input id="splitRight" type="text" value="splitRight">
        <input id="append" type="text" value="append">
        <br>
        <button onclick="showPrint('custom')">Print Custom</button>
        <br><br><br>
        <button onclick="showPrint('jsArray')">Print js Array </button>
        <button onclick="showPrint('sql')">Print SQL</button>
        <button onclick="showPrint('csv')">Print CSV</button>
        Start Here &gt
        <button onclick="genNewRow()">Generate Items</button>
        <button onclick="addRow()">Add Row</button>
        <table id="mainTable"></table>
        <div id="output" contenteditable="true">
          <br><br><br><br><br><br><br><br><br><br><br>
        </div>
        <br><br><br><br><br><br>
        <h2>Examples...</h2>
        <img src="https://raw.githubusercontent.com/JasonMayberry/JavaScript-Data-Formatter/master/images/DataFormatter-jsArray.png" alt="DataFormatter-jsArray">
        <img src="https://raw.githubusercontent.com/JasonMayberry/JavaScript-Data-Formatter/master/images/Data-Formatter-SQL.png" alt="Data-Formatter-SQL">
        <img src="https://raw.githubusercontent.com/JasonMayberry/JavaScript-Data-Formatter/master/images/Data-Formatter-CSV.png" alt="Data-Formatter-CSV">
        <img src="https://raw.githubusercontent.com/JasonMayberry/JavaScript-Data-Formatter/master/images/Data-Formatter-Custom.png" alt="Data-Formatter-Custom">

        <script>
            const keyCode = {
                13: 'enter',
                18: 'alt',
            };
            var id = 0;
            var numOfCols;

            function genNewRow() {
                numOfCols = prompt("Please enter the number of columns / items in your data.", "0");
                addRow();
            }

            function addRow() {
                if(numOfCols > '0') {
                    var mainTable = document.getElementById("mainTable"), 
                    tableRow = `<tr>`, 
                    newCols = `<td contenteditable="true" class="dataBoxes"></td>`;
                    for (var i = 0; i < numOfCols; i++) {
                        tableRow += newCols;
                    }
                    tableRow += `</tr>`;
                    mainTable.innerHTML += tableRow;
                }
            }

            function addRowKey(event) {
                var x = event.which || event.keyCode;
                if (x === 18) {
                    addRow();
                }
            }

            function showPrint(dataType) {
                var table = document.getElementById("mainTable");
                var output = document.getElementById("output");
                output.innerHTML = ''; // Clears any old output

                if(dataType == 'sql') {
                    tableNameSQL = prompt("Please supply a table name.", "`Example Customers`");
                    var prepend = `INSERT INTO ${tableNameSQL} VALUES (`,
                        splitLeft = "\'";
                        splitRight = "\', ";
                        append = ");<br>";
                        buildJsAll(table, output);
                }
                if(dataType == 'csv') {
                    var prepend = '',
                        splitLeft = ",",
                        splitRight = "",
                        append = "";
                        buildJsAll(table, output);
                }
                if(dataType == 'custom') {
                    var prepend = document.getElementById("prepend").value,
                        splitLeft = document.getElementById("splitLeft").value,
                        splitRight = document.getElementById("splitRight").value,
                        append = document.getElementById("append").value;
                        buildJsAll(table, output);
                }
                if(dataType == 'jsArray') {
                    var prepend = '<br>var row_',
                        optional = ' = ['
                        splitLeft = '\"',
                        splitRight = '\", ',
                        append = "];<br>";
                        buildJsArray(table, output);
                }

                function buildJsArray(table, output) {
                    var i;
                    for (var i = 0, row; row = table.rows[i]; i++) {
                        //iterate through rows
                        output.innerHTML += prepend + [i + 1] + optional;
                        for (var j = 0, col; col = row.cells[j]; j++) {
                            //iterate through columns
                            eachCell = splitLeft + col.textContent + splitRight;
                            output.innerHTML += eachCell;
                        }
                    }
                    lineEndingPrint(append, dataType)
                }

                function buildJsAll(table, output) {
                    var i;
                    for (var i = 0, row; row = table.rows[i]; i++) {
                        //iterate through rows
                        output.innerHTML += '<br>'+prepend;
                        for (var j = 0, col; col = row.cells[j]; j++) {
                            //iterate through columns
                            eachCell = splitLeft + col.textContent + splitRight;
                            output.innerHTML += eachCell;
                        }
                    }
                    lineEndingPrint(append, dataType)
                }
            }

            function lineEndingPrint(append, dataType) {
                var output = document.getElementById("output");
                var changeText = output.innerHTML;
                if(dataType == 'csv') {
                    var newText = changeText.replace(/<br>,/g, "<br>");
                    var newTextPrint = newText.replace(/, (?:\r\n|\r|\n|<br>)/g, append);
                }
                if(dataType != 'csv') {
                    var newText = changeText.replace(/,.$/, append);
                    var newTextPrint = newText.replace(/, (?:\r\n|\r|\n|<br>)/g, append);
                }
                output.innerHTML = newTextPrint;
            }
        </script>
    </body>
</html>
