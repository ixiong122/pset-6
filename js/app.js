var list = [];

function addTodo(item) {
	var todo = item.toDoInput;
	if (todo.value != "") {
		list.push({
			"title": todo.value,
			"status": 1,
			"priority": 1
		});
		todo.value = "";
	} else {
		alert("Please enter a task.");
		return false;
	}
	todo.focus();

	displayItems();
	return false;

}

function todoAction(number, action) {
	if (number != null) {
		list[number].status = action;
	}
	displayItems();
}

function remove(number) {
	list.splice(number, 1);
	displayItems();
}

function whichPrioritize(number) {

	var priorityClass = list[number].priority == 0 ? "highPriority" : "lowPriority";

	if (priorityClass == "highPriority") {
		unPrioritize(number);
		list[list.length - 1].priority = 1;

	} else if (priorityClass == "lowPriority") {
		prioritize(number);
		list[0].priority = 0;
	}

}

function prioritize(number) {
	var x = list[number].title;
	var vrt = list[number].status;


	list.splice(number, 1)

	list.unshift({
		"title": x,
		"status": vrt,
		"priority": 0
	});

	displayItems();
	// list.push(number);
}

function unPrioritize(number) {
	var x = list[number].title;
	var vrt = list[number].status;


	list.splice(number, 1)

	list.push({
		"title": x,
		"status": vrt,
		"priority": 1
	});

	displayItems();
}

function displayItems() {
	var start = "<ul>";
	var listItems = "";
	var end = "</ul>";

	if (list.length > 0) {
		for (var i = 0; i < list.length; i++) {
			var actionClass = list[i].status == 0 ? "done" : "pending";
			var priorityClass = list[i].priority == 0 ? "highPriority" : "lowPriority";
			var s;

			if (list[i].priority == 0) {
				s = "href='javascript:void(0);' onClick='whichPrioritize(" + i + ");' style=\"background-color: red\";> !";

			} else {
				s = "href='javascript:void(0);' onClick='whichPrioritize(" + i + ");' style=\"background-color: #333333\";> !";
			}

			var setStatus = list[i].status == 0 ? 1 : 0;
			listItems += "<li class='" + actionClass + "'><span class='title'>" + list[i].title + "</span>"
			listItems += "<span class='action'><a href='javascript:void(0);' onClick='todoAction(" + i + "," + setStatus + ");'>";
			listItems += list[i].status == 0 ? "Completed" : "Not Done";
			listItems += "</a> <a href='javascript:void(0);' onClick='remove(" + i + ");'> X </a>";


			listItems += "</a><a " + s + "</a>";
			listItems += "</span></li>";

		}
	} else {
		listItems += "<li><span class='title'>All tasks are finished!</span></li>";
	}

	document.getElementById("list").innerHTML = start + listItems + end;
}
