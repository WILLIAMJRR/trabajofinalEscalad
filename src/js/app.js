class Tarea {
    constructor(id, descripcion, prioridad, marcada) {
      this.id = id;
      this.descripcion = descripcion;
      this.prioridad = prioridad;
      this.marcada = marcada;
    }

    marcar() {
      this.marcada = true;
    }

    desmarcar() {
      this.marcada = false;
    }

    editar(descripcion, prioridad) {
      this.descripcion = descripcion;
      this.prioridad = prioridad;
    }
  }

  class ListaTareas {
    constructor() {
      this.tareas = [];
    }

    agregarTarea(tarea) {
      this.tareas.push(tarea);
      this.ordenarTareas();
    }

    eliminarTarea(id) {
      const indice = this.tareas.findIndex(tarea => tarea.id === id);
      if (indice !== -1) {
        this.tareas.splice(indice, 1);
      }
    }

    buscarTareas(palabraClave) {
      return this.tareas.filter(tarea =>
        tarea.descripcion.includes(palabraClave)
      );
    }

    asignarPrioridad(id, prioridad) {
      const tarea = this.tareas.find(tarea => tarea.id === id);
      if (tarea) {
        tarea.prioridad = prioridad;
        this.ordenarTareas();
      }
    }

    filtrarTareas(prioridad) {
      return this.tareas.filter(tarea => tarea.prioridad === prioridad);
    }

    ordenarTareas() {
      this.tareas.sort((a, b) => b.prioridad - a.prioridad);
    }
  }

  function agregarTareaFormulario(event) {
    event.preventDefault();

    const descripcionInput = document.getElementById('descripcion');
    const prioridadInput = document.getElementById('prioridad');

    const descripcion = descripcionInput.value.trim();
    const prioridad = parseInt(prioridadInput.value);

    if (descripcion === '' || isNaN(prioridad) || descripcion.length === 0 || !isNaN(descripcion)) {
      alert('Ingresa una descripción y una prioridad válida.');
      return;
    }

    const nuevaTarea = new Tarea(Date.now(), descripcion, prioridad, false);
    listaTareas.agregarTarea(nuevaTarea);

    descripcionInput.value = '';
    prioridadInput.value = '';

    mostrarTareas();
  }

  function eliminarTarea(event) {
    const tareaElement = event.target.parentElement.parentElement;
    const tareaId = tareaElement.dataset.id;

    listaTareas.eliminarTarea(parseInt(tareaId));
    tareaElement.remove();
  }

  function editarTarea(event) {
    const tareaElement = event.target.parentElement.parentElement;
    const tareaId = tareaElement.dataset.id;
    const descripcionInput = tareaElement.querySelector('.tarea-descripcion');
    const prioridadInput = tareaElement.querySelector('.tarea-prioridad');

    const nuevaDescripcion = prompt('Ingresa la nueva descripción:', descripcionInput.textContent);
    const nuevaPrioridad = prompt('Ingresa la nueva prioridad:', prioridadInput.textContent);

    if (nuevaDescripcion !== null && nuevaPrioridad !== null) {
      listaTareas.asignarPrioridad(parseInt(tareaId), parseInt(nuevaPrioridad));
      listaTareas.tareas.find(tarea => tarea.id === parseInt(tareaId)).editar(nuevaDescripcion, parseInt(nuevaPrioridad));

      descripcionInput.textContent = nuevaDescripcion;
      prioridadInput.textContent = nuevaPrioridad;
      mostrarTareas();
    }
  }

  function mostrarTareas() {
    const listaTareasElement = document.getElementById('lista-tareas');
    listaTareasElement.innerHTML = '';

    listaTareas.tareas.forEach(tarea => {
      const tareaElement = document.createElement('tr');
      tareaElement.dataset.id = tarea.id;

      const descripcionElement = document.createElement('td');
      descripcionElement.className = 'tarea-descripcion';
      descripcionElement.textContent = tarea.descripcion;

      const prioridadElement = document.createElement('td');
      prioridadElement.className = 'tarea-prioridad';
      prioridadElement.textContent = tarea.prioridad;

      const eliminarButton = document.createElement('button');
      eliminarButton.textContent = 'Eliminar';
      eliminarButton.addEventListener('click', eliminarTarea);

      const editarButton = document.createElement('button');
      editarButton.textContent = 'Editar';
      editarButton.addEventListener('click', editarTarea);

      const buttonsElement = document.createElement('td');
      buttonsElement.appendChild(eliminarButton);
      buttonsElement.appendChild(editarButton);

      tareaElement.appendChild(descripcionElement);
      tareaElement.appendChild(prioridadElement);
      tareaElement.appendChild(buttonsElement);

      listaTareasElement.appendChild(tareaElement);
    });
  }

  const listaTareas = new ListaTareas();

  const formularioTarea = document.getElementById('formulario-tarea');
  formularioTarea.addEventListener('submit', agregarTareaFormulario);

  mostrarTareas();
