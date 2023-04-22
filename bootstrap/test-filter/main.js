

let gData = undefined;











function sort () {
  let trigger = 1;
  return e => {
    trigger = -trigger;
    gData.sort((a, b) => {
      if(a[e.target.id] > b[e.target.id]) {
        return trigger;
      } else {
        return -trigger;
      }
    });
    getTableData(gData);
  };
};

function replacement() {
  const tds = document.querySelectorAll('td[contenteditable="true"]');
  tds.forEach(td => {
    td.addEventListener('focus', function() {
      td.setAttribute('data-before', td.innerHTML);
    });
    td.addEventListener('blur', function() {
      if (td.getAttribute('data-before') !== td.innerHTML) {
        const rowIndex = td.parentNode.rowIndex;
        const cellIndex = td.cellIndex;
        const th = td.parentNode.parentNode.querySelector('thead th:nth-child(' + (cellIndex + 1) + ')');
        if (th) {
          gData[rowIndex - 1][th.id] = td.innerHTML;
        }
      } 
      td.removeAttribute('contenteditable');
    });
  });
}

const saveBtn = document.getElementById('saveBtn');

function saveData() {
  console.log(saveBtn);
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/users');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    const jsonData = JSON.stringify(gData);
    xhr.send(jsonData);
};



const TestProject = {
  init: function() {
    console.log('start init');
    this.events();
    this.load();
  },
  load: function() {
    console.log('start load');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => this.render(json));
  },
  test() {
    console.log('hello world')
  },
  events: function() {
    console.log('start events');
    document.addEventListener('DOMContentLoaded', function() {
      const saveBtn = document.getElementById('saveBtn');
      saveBtn.addEventListener('click', saveData);
    });
  },
  render: function(json) {
    console.log('start render');
    const gData = json.map(x => {
      delete x["address"];
      delete x["company"];
      return x;
    });
    this.createTable(gData);
  },
  createTable: function(json) {
    console.log('start createTable');
    const table = document.querySelector('.table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
     
    const restHeader = this.getTableHeader(Object.keys(json[0]));
    thead.appendChild(restHeader);
     
    const restBody = this.getTableData(json);
    tbody.appendChild(restBody);

    table.appendChild(thead);
    table.appendChild(tbody);
  },

  getTableHeader: function(fields) {
    console.log('start getTableHeader')
    const fragment = document.createDocumentFragment();
    const tr = document.createElement('tr');
    fields.forEach(x => {
      const th = document.createElement('th');
      th.innerText = x;
      th.scope = "col";
      th.id = x;
      tr.appendChild(th);
      fragment.appendChild(tr);
    });
    return fragment;
  },
  getTableData: function(data) {
    console.log('start getTableData')
    const fragment = document.createDocumentFragment();
    data.forEach(x => {
      const keys = Object.keys(data[0]);
      const tr = document.createElement('tr');
      keys.forEach(y => {
        let td = undefined;
        if (y === "id") {
          td = document.createElement('th');
          td.scope ="row";
        } else {
          td = document.createElement('td');
          td.setAttribute('contenteditable', true);
        }
        td.innerText = x[y];
        tr.appendChild(td);
      });
      fragment.appendChild(tr);
    });
    return fragment;
  },
  getWrap: function(fragment, target) {
    console.log('start getWrap')
    const table = document.querySelector('.table');
    const tag = document.createElement(target);
    tag.appendChild(fragment);
    table.appendChild(tag);
  },
};


TestProject.init();
