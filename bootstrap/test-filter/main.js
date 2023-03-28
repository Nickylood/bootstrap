fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => data(json));

      let gData = undefined;

function data(json) {
    gData = json = json.map(x => {
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
        const th = document.createElement('th');
        th.innerText = x;
        th.scope = "col";
        th.id = x;
        fragment.appendChild(th);
    });
    tr.appendChild(fragment);
    thead.appendChild(tr);
    table.appendChild(thead);
    clickFilterEvents(fields);
};

function getTableData(data) {
    const table = document.querySelector('.table');
    const tbody = document.createElement('tbody');
    data.forEach(x => {
        const tr = document.createElement('tr');
        const fragment = document.createDocumentFragment();
        const keys = Object.keys(data[0]);
        keys.forEach(y => {
            let td = undefined;
            if (y === "id") {
                td = document.createElement('th');
                td.scope ="row";
            } else {
                td = document.createElement('td');
            }
            td.innerText = x[y];
            fragment.appendChild(td);
        });
        tr.appendChild(fragment);
        tbody.appendChild(tr);
        table.appendChild(tbody);
    });
};

function deleteTableData() {
    const tbody = document.querySelector('.table tbody');
    tbody.remove();
};

function clickFilterEvents (fields) {
    fields.forEach(x => {
        const thisTh = document.querySelector(`#${x}`);
        const trigsort = sort();
        thisTh.addEventListener('click', e => {
            deleteTableData();
            trigsort(e);
        });
    });
};

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