const root = document.getElementById("root");

function TodoForm(add) {
    const container = document.createElement("form");
    container.innerHTML = `
       <input type="text">
       <button>Add</button>
    `;
    container.addEventListener("submit", e => {
      e.preventDefault();
      const value = container.querySelector("input").value;
      add(value);
    })
    
    return container;
}

function ListItem(todo, onChange) {
    const container = document.createElement("div");
    container.innerHTML = `
       <label>
          <input type="checkbox" ${todo.completed ? "checked": ""}/>
          ${todo.label}
       </label>
    `;
     const input = container.querySelector("input");
     input.addEventListener("change", e => {
         onChange(e.target.checked);
     })
    return container;
}

function List(todos, onChange) {
    const container = document.createElement("div");

    todos.map(todo => {
        return ListItem(todo, function(boo) {
            todo.completed = boo;
            onChange();
        })
    }).forEach(element => {
        container.appendChild(element);
    });

    return container;
}

function TodoFooter(list, onChange) {
    const container = document.createElement("div")
   let done = list.filter(todo => todo.completed).length;
    container.innerHTML = `
        <span>${done}/${list.length} completed</span>
        <button>Clear Completed</button>
    `;
    const btn = container.querySelector("button");
    btn.addEventListener("click", () => {
        onChange(list.filter(listitem => listitem.completed === false));
    })
    return container;
}

function App() {
   let todos = [
       {label: "learn JS", completed: false},
       {label: "learn CSS", completed: false},
       {label: "learn React", completed: false}
   ];

   const container = document.createElement("div");

   function render() {
    container.innerHTML = "";
    container.appendChild(TodoForm(function(text) {
        
        todos.push({
            label: text,
            completed: false
        });
        render();
     }))
    container.appendChild(List(todos, () => {
        render();
    }));
    container.appendChild(TodoFooter(todos, (newtodos) => {
        todos = newtodos;
        render();
    }));
   }
   render();
   return container;
};

root.appendChild(App());