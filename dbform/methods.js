var db_count = 0;
var user_count = 0;
var database = new Array();

function addDB()
{
  if(db_count > 0){user_count++}

  if(database.length == db_count){database[db_count] = 0;}

  userDiv = db_count + "user" + database[db_count];
  dbDiv = "db" + db_count;
  newDbDiv = "db" + (db_count + 1);
  databaseDiv = "database" + db_count + "[]";

  document.getElementById(dbDiv).innerHTML +=
  '<div id="' + db_count + '">' +
    '<div class="spacer2"></div>' +
    '<h1> Database ' + (db_count + 1)  + ' </h1>' +

    '<h2> Database specification </h2>' +
      '<p> Please provide the requested database informations </p>' +

    '<label> Name' +
      '<span class="small">  ex: stg_testdb1 </span>' +
    '</label>' +
    '<input type="text" name="' + databaseDiv + '" />' + 

    '<label> Layer  </label>' +
    '<select name="' + databaseDiv  +'" />' +
      '<option value="Development">Development</option>' +
      '<option value="QA">Quality Assurance</option>' +
      '<option value="Staging">Staging</option>' +
      '<option value="Production">Production</option>' +
    '</select>' +

    '<label> Server' +
      '<span class="small">  ex: swcostgsql99.wco.int </span>' +
    '</label>' +
    '<input type="text" name="' + databaseDiv  + '" />' +

    '<h2> Database user information </h2>' +
      '<p> Please fill in the database\'s user informations </p>' +

    '<div id="' + userDiv  + '">';

    addUser(db_count);

    document.getElementById(dbDiv).innerHTML +=
    '</div>' + 

    '<input type="button" id="' + db_count + '" value="Add another user" onClick="addUser(this.id);">' +
    '<div class="spacer"></div>' +

    '<h2> Additional information </h2>' +
      '<p> If you have any additional information or requests, let us know </p>' +

    '<label> Informations </label>' +
      '<textarea type="text" class="infobox" name="' + databaseDiv + '" ></textarea>' +

    '</div>' +

    '<div id="' + newDbDiv + '">';

  db_count++; 
}

function addUser(count)
{
  databaseDiv = "database" + count + "[]";  
  userDiv = count + "user" + database[count];
  newUserDiv = count + "user" + (database[count] + 1);
  database[count] += 1;

  document.getElementById(userDiv).innerHTML +=
  '<label> Username ' +
    '<span class="small">  16 characters maximum </span>' +
  '</label>' +
    '<input type="text" name="' + databaseDiv  + '"  maxlength="16"/>' +

  '<label> Rights ' +
    '<span class="small"> ex: select, create,... </span>' +   
  '</label>' +
    '<input type="text" name="' + databaseDiv  + '" />' +

  '</div>' +
  '<div id="' + newUserDiv + '">';
}

function addClient()
{
  document.getElementById('client').innerHTML +=
  '<h2> Client information </h2>' +
      '<p> Please fill in your personnal information </p>' +

  '<label> Client\'s name' +
    '<span class="small"> Your full name </span>' +
  '</label>' +
  '<input type="text" name="client[]" />' +

  '<label> Client\'s e-mail' +
    '<span class="small"> Your e-mail address </span>' +
  '</label>' +
  '<input type="text" name="client[]" id/>';
}

function removeDB()
{ 
  db_count -= 1;
  if(db_count < 0){db_count = 0;}

  var form = document.getElementById('sauce');
  var removable = document.getElementById(db_count);
  form.removeChild(removable);

  database.splice(db_count,1);
}

function verify()
{
  k = 0;
  for (var i = 0; i < db_count; i++)
  {
    dbArray = "database" + i + "[]";
    var fields = document.getElementsByName(dbArray);
    userFields = (2 * database[i]);
    totalFields = (4 + userFields);
    infoField = (3 + userFields);
    for (var j = 0; j < totalFields; j++) 
    { 
      if(fields[j].value == '' && j != infoField)
      {
        k++;
      }
    }
  }
  clientArray = "client[]";
  var fields = document.getElementsByName(clientArray);
  for (var l = 0; l < 2; l++)
  {
    if(fields[l].value == '')
    {
      k++;
    }
  }


  if(k > 0)
  {
    alert("Please fill all the required fields. Additionnal informations field is optional.");
    return false;
  }
  else
  {
    var dbForm = document.forms['dbForm'];
    dbForm.submit();
  }
}
