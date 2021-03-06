<?php 

// this file will be get be returning questions and filtered questuions

include_once 'dbh.php';

$ucid = $data['UCID'];
$eid = $data['EID'];

$sql = "SELECT Q.QID, Q.Title, Q.Problem, Answer, A.Points, EQ.Points AS MP, Comments, Feedback
FROM EAnswer A, Question_Bank Q, EQuestion EQ 
WHERE UCID = '$ucid' AND A.EID = '$eid' AND Q.QID = A.QID AND A.EID = EQ.EID AND EQ.QID = Q.QID";

$result = $conn->query($sql);

//after you ge the result this makes the JSON string
$JSON_result = array("Answer_List"=>array());
if ($result->num_rows > 0) {
        // output data of each row
	while($row = $result->fetch_assoc()) {
		//makes the JSON string
    $qid = $row["QID"];
    $title = $row["Title"];
		$answer = $row["Answer"];
		$points = $row["Points"];
    $mp = $row["MP"];
    $problem = $row["Problem"];
    $comments = $row["Comments"];
    $fb = $row["Feedback"];
    $rowdata = array(
     "QID"=>$qid,
     "Title"=>$title,
     "Answer"=>$answer,
     "Problem"=>$problem,
     "Comments"=>$comments,
     "Feedback"=>$fb,
     "Points"=>$points,
     "Max_Points"=>$mp
    );
		/*$JSON_result = $JSON_result."{\"QID\" : $qid ,
    \"Title\" : \"$title\" ,
    \"Answer\" : \"$answer\" ,
    \"Problem\" : \"$problem\" ,
    \"Comments\" : \"$comments\" ,
    \"Feedback\" : \"$fb\" ,
		\"Points\" : $points ,
    \"Max_Points\" : $mp}" ;
*/
    array_push($JSON_result['Answer_List'], $rowdata);

		
	}

  echo json_encode($JSON_result);

}
//if you get no matches, you get this
else {
	 echo "0 results";
}

//close your mysql connection
$conn->close();
