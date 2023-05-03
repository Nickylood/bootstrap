

const TestProject = {
  json: {},
  init: function() {
    console.log('start init');
    this.events();
    this.load();
    this.replacement();
  },

  load: function() {
    console.log('start load');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        json.map(x => {
          delete x["address"];
          delete x["company"];
          return x;
        });
        TestProject.json = TestProject.sort(json, 'id')
        this.render(TestProject.json)
      });
  },

  test() {
    console.log('hello world')
  },

  events: function() {
    console.log('start events');
    document.addEventListener('DOMContentLoaded', function() {
      const saveBtn = document.getElementById('saveBtn');
      saveBtn.addEventListener('click', function () {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://jsonplaceholder.typicode.com/users');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        const jsonData = JSON.stringify(TestProject.json);
        xhr.send(jsonData);
      },
    );
  });

  },

  render: function(json) {
    console.log('start render');
    this.createTable(json);
    $("#example").DataTable();
  },

  reset: function() {
    console.log('reset');
    const table = document.querySelector('.table');
    table.replaceChildren();
  },

  createTable: function(json) {
    console.log('start createTable');
    const restHeader = this.getTableHeader(Object.keys(json[0]));
    this.getWrap(restHeader, 'thead');
    const restBody = this.getTableData(json);
    this.getWrap(restBody,'tbody');
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
    
  sort: function(data, key) {
    console.log('start sort', key);
    return data.sort((a, b) => {
      if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    } else {
      return 0;
    }
    });
  },

  replacement: function() {
    console.log('start replacement')
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
            TestProject.json[rowIndex - 1][th.id] = td.innerHTML;
          }
        } 
        td.removeAttribute('contenteditable');
      });
    });
  },

};

TestProject.init();


