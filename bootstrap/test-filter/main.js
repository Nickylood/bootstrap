fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => data(json));

function data(json) {
    json = json.map(x => {
        delete x["address"];
        delete x["company"];
        return x;
    });
    getTableHeader(Object.keys(json[0]));
    getTableData(json);
};

function getTableHeader(fields) {
    
    const table = document.querySelector('.table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const fragment = document.createDocumentFragment();
    fields.forEach(x => {
        const th = document.createComment('th');
        th.innerText = x;
        th.scope = "col";
        th.id = x;
        fragment.appendChild(th);
    });
    tr.appendChild(fragment);
    thead.appendChild(tr);
    table.appendChild(thead);
};

function getTableData(data) {
    console.log(data)
    const table = document.querySelector('.table');
    const tbody = document.createElement('tbody');
data.forEach(x => {
    const tr = document.createElement('tr');
    const fragment = document.createDocumentFragment();
    const keys = Object.keys(data[0]);
    keys.forEach(y => {
        let td = undefined;
        if (y === "id") {
            td = document.createComment('th');
            td.scope ="row";
        } else {
            td = document.createComment('td');
        }
        td.innerText = x[y];
        fragment.appendChild(td);
    });
    tr.appendChild(fragment);
    tbody.appendChild(tr);
    table.appendChild(tbody);
});
};


