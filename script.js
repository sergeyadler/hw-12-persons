const persons = [];
const addButton = document.getElementById('addPerson');
const personsList = document.getElementById('personsList');
const totalPersons = document.getElementById('totalPersons');

addButton.onclick = addPerson;
age.onkeydown = (e) => {
    if(e.key === 'Enter'){
        addPerson();
    }
}


function findPersonById(arr,id){
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].id === id)
            return i;

    }
    return -1;
}



function Person(id,firstName,lastName,age){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = +age;
    // this.toString = function(){
    //     return `ID: ${this.id}, NAME: ${this.firstName}, LAST NAME: ${this.lastName}, AGE: ${this.age}`;
    // }
}
function updateTotal (){
    totalPersons.textContent = `Total Persons: ${persons.length}`;
}
function addPerson (){
    //TODO Person must be unique. Add Person with delete button
    // IF Person added Total will be increment if removed decrement
    //functionality with remove is optional
    const id = document.getElementById('id').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const age = document.getElementById('age').value.trim();
    const person = new Person(id,firstName,lastName,age);

    if(id === '' || firstName === '' || lastName === '' || age === ''){
        alert('Please fill all fields');
        return;
    }

    if(findPersonById(persons,id) !== -1){
        alert('Person already exists');
        return;

    }
    persons.push(person);


    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    //li.append(person.toString());

    const info = document.createElement('div');
    info.innerHTML = `
            <i class="bi bi-person-bounding-box me-2 text-primary"></i>
            <strong>${person.firstName} ${person.lastName}</strong> <br>
            <small>ID: ${person.id} Age: ${person.age}</small>
        `;

    const buttons = document.createElement('div');
    buttons.className = 'btn-group';

    const delBtn = createDeleteButton(() => {
        // ищем именно того person по его id из объекта
        const index = findPersonById(persons, person.id);
        if (index !== -1) {
            persons.splice(index, 1);    // удаляем из массива
            console.log('✅ Удалили из массива:', person.id);
        }
        li.remove(); // убираем из DOM
        updateTotal(); // обновляем счётчик
        console.log('Текущий массив:', persons);
    });
    buttons.appendChild(delBtn);
    li.appendChild(info);
    li.appendChild(buttons);

   // li.append(' ',delBtn);
    personsList.append(li);



    document.getElementById('id').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('age').value = '';
    updateTotal()
    console.log(persons)
};

