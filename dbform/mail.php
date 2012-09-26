<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <?php
      $static_fields = 4;
      $users_fields = 2; 

      function count_requests()
      {
	return count($_POST,0);
      }

      function build_message($requests_count)
      {
	$message .= "<html><body>";

        for($i = 0; $i < ($requests_count - 1); $i++)
        {
          $array = $_POST["database$i"];
	  $array_length = get_array_length($array);
          $users_count = get_users_count($array_length);
          $database_request = $i + 1;
           
	  $message .= '<table border="5" width="500"><tr><td>';
          $message .= "<h2>Database request $database_request</h3>";
          $message .= "</td></tr><tr><td>";
          $message .= "<br /><b>Database information</b>";
          $message .= "<br />DB's name : ";
          $message .= $array[0];
          $message .= "<br />Layer : ";
          $message .= $array[1];
          $message .= "<br />Server : ";
          $message .= $array[2];
          $message .= "<br /><br /></td></tr><tr><td>";
	  $message .= "<br /><b>User list</b> ";
          
          for($j = 0; $j < ($users_count * 2); $j++)
	  {
            $message .= "<br />Username : ";
            $message .= $array[$j+3];
              $j++;
            $message .= "<br />Grants : ";
            $message .= $array[$j+3];
	    $message .= "<br />";
	  }
         
          $message .= "<br /></td></tr><tr><td>";
	  $message .= "<b>Additional information</b><br />";
          $message .= $array[$array_length - 1];
          $message .= "</td></tr></table><br />";

	}

	$message .= '<table border="5" width="500"><tr><td>';
	$message .= "<h2>Client information</h3>";
	$message .= "</td></tr><tr><td>";
	$message .= "Name : ";
        $message .= get_requester_name();
	$message .= "<br />E-mail : ";
	$message .= get_requester_mail(); 
	$message .= "</td></tr></table>";

	return $message;
      }

      function build_subject()
      {
	return "New database request.";
      }

      function get_array_length($array)
      {
	return count($array);
      }

      function get_users_count($array_length)
      {
	return ($array_length - $GLOBALS['static_fields'])/$GLOBALS['users_fields'];
      }

      function get_requester_name()
      {
        $username = $_POST['client'];
	return $username[0];
      }

      function get_requester_mail()
      {
        $usermail = $_POST['client'];
        return $usermail[1];
      }

      function set_addressee()
      {
	return "julien.parent-trudeau@tc.tc;taughttoxique@hotmail.com;julien.parent.trudeau@gmail.com";
      }

      function send_mail($from, $to, $subject, $message)
      {
	$headers = "From: ".$from."\r\n";
        $headers .= "Return-To:  ".$from."\r\n";
        $headers .= "Return-Path: ".$from."\r\n";
        $headers .= "Content-type: text/html\r\n";

        if(!mail($to,$subject,$message,$headers) )
        {
          header("Location: fail.php");
        }
      }

      send_mail(get_requester_mail(),set_addressee(),build_subject(),build_message(count_requests()));
    ?>
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <style type="text/css">
      #stylized
      {
        border:solid 2px #ffe080;
        background:#ffffc0;
      }
      #stylized p
      {
        border-bottom:solid 1px #ffe080;
      }
      #stylized input
      {
        border:solid 1px #ffe010;
      }
      #stylized select
      {
        border:solid 1px #ffe010;
      }
    </style>
  </head>
  <body>
    <div id="stylized" class="myform">
      <form id="form" name="form" method="post" action="/">
        <h1>Database Request Form Sent</h1>
          <p>The form has been sent to the databases administrators. Hit the return button to come back to the previous screen.</p>
        <button class="button1" type="submit">Return</button>
        <div class="spacer"></div>
      </form>
    </div>
  </body>
</html>
