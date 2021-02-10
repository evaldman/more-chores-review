const url = 'http://localhost:3000/chores'
const choresContainer = document.getElementById('chore-list')
const choreForm = document.getElementById('new-chore-form')

function renderAllChores(){
fetch(url)
  .then(response => response.json())
//   .then(choresArray => console.log(choresArray))
  .then(choresArray => choresArray.forEach(chore => renderOneChore(chore)))
}
function renderOneChore(chore) {

    const card = document.createElement('div')
    card.className = 'chore-card'
    card.dataset.id = chore.id
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'X'
    deleteButton.className = 'delete-button'
    deleteButton.dataset.id = chore.id
    const choreTitle = document.createElement('h3')
    choreTitle.textContent = chore.title
    const choreDuration = document.createElement('p')
    choreDuration.textContent = chore.duration
    const chorePriority = document.createElement('input')
    chorePriority.value = chore.priority
   
    card.append(deleteButton, choreTitle, choreDuration, chorePriority)
    choresContainer.append(card)
  }

choreForm.addEventListener('submit', createChore)

function createChore(event){
    event.preventDefault()
    // console.log(event)
    const title = event.target.title.value
    const priority = event.target.priority.value
    const duration = event.target.duration.value
    const newChore = {title, priority, duration}
    renderOneChore(newChore)

    fetch (url, {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(newChore)
    })
    // .then(response => response.json())
    event.target.reset()
}
choresContainer.addEventListener('click', clickAction)

function clickAction(event){
    // console.log(event)
const oneChore = event.target.closest('.chore-card')

    if (event.target.className === 'delete-button') {
    // console.log('delete button clicked')
    oneChore.remove() // optimistic rendering

    fetch(`${url}/${oneChore.dataset.id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        // .then(data => console.log(data))
    }
}
  renderAllChores()

