window.onload=function(){
	teachLogged();
	examRequest();
};

var createQu = document.getElementById("btnQ");
createQu.addEventListener("click", function(){
  var page = "createQuestion.html";
  goTo(page);
});

var createEx = document.getElementById("btnE");
createEx.addEventListener("click", function(){
  var page2 = "createExam.html";
  goTo(page2);
});

var examDB = [];

function examRequest(){
  var data = '{"mode":"GetExam"}';
  var ajax = new XMLHttpRequest();
//alert(data);
  ajax.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);							//change path after testing examRequest.php//DONE
  ajax.setRequestHeader("Content-type", "application/json");
	ajax.send(data);

  ajax.onload = function(){
    if (ajax.status >= 200 && ajax.status < 400) {
      var response = ajax.responseText;

									console.log(response);
      examDisplay(response);

    } else {
			console.log("NO PHP response")
		}
  };
}


function examDisplay(response){
  var examDB = JSON.parse(response);
  var examT = document.getElementById("examTable");

  for (var i in examDB) {
		var tr = document.createElement("tr");

		var exam_name_td = document.createElement("td");
		var exam_name = document.createTextNode(examDB[i].etitle);
		exam_name_td.appendChild(exam_name);
		exam_name_td.id = "test_id_"+examDB[i].etitle

		var exam_status_td = document.createElement("td");
		var exam_status = document.createTextNode(examDB[i].status);  //exam
		exam_status_td.appendChild(exam_status);


		var review_td = document.createElement("td");
		review_td.innerHTML = '<div"><input type="button" value="Review" onClick="reviewExams('+i+')"></div>'

		var release_td = document.createElement("td");
		if (examDB[i].status == 'released'){
			release_td.innerHTML = '<div><input type="button" value="Release" onClick="releaseScore('+i+')" disabled></div>'
		} else {
			release_td.innerHTML = '<div><input type="button" value="Release" onClick="releaseScore('+i+')"></div>'
		}

		tr.appendChild(exam_name_td);
		tr.appendChild(exam_status_td);
		tr.appendChild(review_td);
		tr.appendChild(release_td);

		examT.appendChild(tr);
  }
}



function releaseScore(examID){
	releaseScoreRequest(examDB[examID].etitle);
	location.reload();
}


function releaseScoreRequest(examName){
	var data = 'jData={"mode":"", "etitle":"'+examName+'"}';

	//alert(data);
	var request = new XMLHttpRequest();

	request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);		//change path after testing
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			console.log(response);

		} else {
			console.log("No PHP response");
		}
	};
}


function reviewExams(examID){
	window.localStorage.setItem('etitle', examDB[examID].etitle);
	goTo("reviewList.html");
}
