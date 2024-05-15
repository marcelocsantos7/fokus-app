const btnAddNewTask = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const listItens = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSelecionada = null

function updateTasks() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function addTasks(tarefa) {
    const li = document.createElement('li')
    const svg = document.createElement('svg')
    const paragrafo = document.createElement('p')
    const button = document.createElement('button')
    const img = document.createElement('img')

    li.classList.add('app__section-task-list-item')
    svg.innerHTML = `
        <svg class="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')
    button.classList.add('app_button-edit')
    img.setAttribute('src', '/imagens/edit.png')

    button.append(img)
    button.onclick = () => {
        const newTask = prompt("Qual a nova tarefa ?")
        if (newTask) {
            paragrafo.textContent = newTask
            tarefa.descricao = newTask
            updateTasks()
        }
    }

    li.append(svg)
    li.append(paragrafo)
    li.append(button)

    li.onclick = () => {
        document.querySelectorAll('app__section-task-list-item-active')
            .forEach(element => {
                element.classList.remove('app__section-task-list-item-active')
            })
        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            liTarefaSelecionada = null
            return
        }
        tarefaSelecionada = tarefa
        liTarefaSelecionada = li
        paragrafoDescricaoTarefa.textContent = tarefa.descricao

        li.classList.add('app__section-task-list-item-active')
    }

    return li
}

btnAddNewTask.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (e) => {
    e.preventDefault()
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const task = addTasks(tarefa)
    listItens.append(task)
    updateTasks()
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = addTasks(tarefa)
    listItens.append(elementoTarefa)
})

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
    }
})