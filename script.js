const persons = [];
const addButton = document.getElementById('addPerson');
const personsList = document.getElementById('personsList');
const totalPersons = document.getElementById('totalPersons');

const avatars = [
    'images/avatar1.png',
    'images/avatar2.png',
    'images/avatar3.png',
    'images/avatar4.png',
];

addButton.onclick = addPerson;
age.onkeydown = (e) => {
    if (e.key === 'Enter') {
        addPerson();
    }
}


function findPersonById(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id)
            return i;

    }
    return -1;
}


function Person(id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = +age;
    // this.toString = function(){
    //     return `ID: ${this.id}, NAME: ${this.firstName}, LAST NAME: ${this.lastName}, AGE: ${this.age}`;
    // }
}

function updateTotal() {
    totalPersons.textContent = `Total Persons: ${persons.length}`;
}

function addPerson() {
    const id = document.getElementById('id').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const age = document.getElementById('age').value.trim();
    const person = new Person(id, firstName, lastName, age);

    if (id === '' || firstName === '' || lastName === '' || age === '') {
        alert('Please fill all fields');
        return;
    }

    if (findPersonById(persons, id) !== -1) {
        alert('Person already exists');
        return;
    }

    persons.push(person);

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center shadow-sm rounded mb-2 p-3';

    // === Аватар с инициалами ===
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const avatar = document.createElement('div');
    avatar.className = 'me-3';
    avatar.innerHTML = `<img src="${randomAvatar}" class="rounded-circle shadow" style="width: 50px; height: 50px; object-fit: cover;" alt="avatar">`;


    // === Блок с информацией о человеке ===
    const info = document.createElement('div');
    info.innerHTML = `
        <h5 class="mb-1">${person.firstName} ${person.lastName}</h5>
        <small class="text-muted">ID: ${person.id} | Age: ${person.age}</small>
    `;

    // === Кнопки справа ===
    const buttons = document.createElement('div');
    buttons.className = 'ms-auto';
    const delBtn = createDeleteButton(() => {
        const index = findPersonById(persons, person.id);
        if (index !== -1) {
            persons.splice(index, 1); // удаляем из массива
        }
        li.remove(); // удаляем из DOM
        showStats(); // обновляем статистику
    });
    buttons.appendChild(delBtn);

    // === Собираем карточку ===
    li.appendChild(avatar);
    li.appendChild(info);
    li.appendChild(buttons);

    personsList.append(li);

    // === Очищаем поля ===
    document.getElementById('id').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('age').value = '';

    showStats(); // обновляем статистику
    console.log(persons);
}


//TODO
function showStats() {
    const stats = document.getElementById('stats');
    //TODO
    // Total Person ,max age, min age,  average age
    // delete updateTotal replace with show stats show in <div id="stats"> after H2

    stats.querySelectorAll('p').forEach(el => el.remove());
    //totalPersons.textContent = `Total Persons: ${persons.length}`;
    const total= document.createElement('p');
    total.innerHTML = `<strong>Total Persons: </strong>${persons.length}`;

    const paragraphMaxAge = document.createElement('p');
    let maxAge = persons.reduce((maxAge, person) => person.age > maxAge ? person.age : maxAge, 0);
    paragraphMaxAge.innerHTML = `<strong>Oldest person:</strong> ${maxAge}`;
    const paragraphMinAge = document.createElement('p');
    let minAge = persons.reduce((minAge, person) => person.age < minAge ? person.age : minAge , persons[0].age);
    paragraphMinAge.innerHTML = `<strong>Youngest age :</strong> ${minAge}`;

    const paragraphAverageAge =  document.createElement('p');
    let averageAge = persons.reduce((acc, person) => acc + person.age, 0) / persons.length;
    paragraphAverageAge.innerHTML = `<strong>Average Age :</strong> ${averageAge}`;

    stats.appendChild(total)
    stats.appendChild(paragraphMaxAge);
    stats.appendChild(paragraphMinAge);
    stats.appendChild(paragraphAverageAge);


}
