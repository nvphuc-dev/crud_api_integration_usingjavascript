let usersApi = "http://localhost:3000/users";
let editFormData;

function getUsers(){
	fetch(usersApi).then(
		(res) => res.json()
	).then((response) => {
		let tmpData = "";
		// console.log(response);
		response.forEach((user) => {
			tmpData += `
				<tr>
				<th scope="row">${user.id}</th>
				<td>${user.name}</td>
				<td>${user.email}</td>
				<td>
					<button type="button" class="btn btn-sm btn-primary" onclick="editDataCall(${user.id})">Edit</button>
					<button type="button" class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
				</td>
			</tr>
			`;
		});
		document.getElementById("renderApiData").innerHTML = tmpData;
	});
}
getUsers();

function getFormData(){
	return {
		name: document.getElementById("name").value,
		email: document.getElementById("email").value
	};
}

function clearFormData(){
	document.getElementById("name").value = "";
	document.getElementById("email").value = "";
}

function setFormData(name, email){
	document.getElementById("name").value = name;
	document.getElementById("email").value = email;
}

// Set message for form status
function setSuccessMessage(message){
	document.getElementById("message").innerHTML = message;
	setTimeout(() => {
		document.getElementById("message").innerHTML = "";
	}, 3000);
}

function editDataCall(id){
	//Call user details by id
	fetch(usersApi + '/' + id, {
		method: "GET",
	}).then((res) => res.json()).then((response) => {
		// console.log('edit infon', response);
		editFormData = response;
		setFormData(editFormData.name, editFormData.email);
	});
}

function submitForm(){
	if(!editFormData) addUser(); // if the editFormData is undefined then call addUser()
	else editUser();
}

function addUser(){
	let payload = getFormData();
	fetch(usersApi, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	}).then((res) => res.json()).then((response) => {
		setSuccessMessage('Data inserted Successfully.');
		// Clear input
		clearFormData();
		getUsers(); // Reload table
	})
}

function editUser(){
	let formData = getFormData();
	formData['id'] = editFormData.id; // get id from select user
	fetch(usersApi + '/' + editFormData.id, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(formData)
	}).then((res) => res.json()).then((response) => {
		setSuccessMessage('Data updated Successfully.');
		clearFormData();
		getUsers(); // Reload table
	})
}

function deleteUser(id){
	fetch(usersApi + '/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json()).then((response) => {
		setSuccessMessage('Data Deleted Successfully.');
		getUsers();
	});
}