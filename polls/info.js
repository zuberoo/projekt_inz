{
	"name": "polls",
	"type": "module",
	"description": "polls module",
	"author": "WB",
	"version": "1",
	"files":[
		{"name":"polls.ctrl","label":"pollsControler","path":"controllers/polls.js","type":"controller"}
	],
	"routes":[		
		{"name":"polls/list","label":"polls list","view":"views/list.html","controller":"pollsControler", "css":"base"},
		{"name":"polls/myCreatedList","label":"polls myCreatedList","view":"views/myCreatedList.html","controller":"pollsControler", "css":"base"},
		{"name":"polls/myPollsList","label":"polls myPollsList","view":"views/myPollsList.html","controller":"pollsControler", "css":"base"},
		{"name":"polls/myFilledList","label":"polls myFilledList","view":"views/myFilledList.html","controller":"pollsControler", "css":"base"},
		{"name":"polls/stat/:idpoll","label":"polls stat","view":"views/stat.html","controller":"pollsControler", "css":"base"},
		{"name":"polls/fill/:idpoll","label":"polls fill","view":"views/fill.html","controller":"pollsControler", "css":"base"},
		{"name":"polls/check/:idpoll","label":"polls check","view":"views/check.html","controller":"pollsControler", "css":"base"},
		{"name":"polls/add","label":"polls add","view":"views/add.html","controller":"pollsControler", "css":"base"},
		{"name":"polls/edit/:idpoll","label":"polls edit","view":"views/edit.html","controller":"pollsControler", "css":"base"}
	],
	"acl":[
		{"name":"polls_view","label":"Ankieta"},
		{"name":"polls_list","label":"Ankieta"},
		{"name":"polls_add","label":"Ankieta"},
		{"name":"polls_edit","label":"Ankieta"},
		{"name":"polls_delete","label":"Ankieta"}
	]
}