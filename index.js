  let jsonData = [];

        function createTableHead(data) {
            const tableHead = document.getElementById('jsonTable');
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');

            for (const key in data) {
                const th = document.createElement('th');
                th.textContent = key;
                tr.appendChild(th);
            }

            thead.appendChild(tr);
            tableHead.appendChild(thead);
        }

        function populateTable(data) {
            const table = document.getElementById('jsonTable');
            const tbody = document.createElement('tbody');

            data.forEach((item) => {
                const row = document.createElement('tr');

                for (const key in item) {
                    const cell = document.createElement('td');
                    cell.textContent = item[key];
                    row.appendChild(cell);
                }

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
        }

        function sortData(data, field) {
            if (field === 'age') {
                return data.slice().sort((a, b) => a[field] - b[field]);
            } else {
                return data.slice().sort((a, b) => a[field].localeCompare(b[field]));
            }
        }

        document.getElementById('fileInput').addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 5000000) {
                    alert('File size should be under 5MB.');
                    return;
                }

                const reader = new FileReader();

                reader.onload = function (e) {
                    try {
                        jsonData = JSON.parse(e.target.result);
                        document.getElementById('jsonTable').innerHTML = '';
                        createTableHead(jsonData[0]);
                        populateTable(jsonData);
                    } catch (error) {
                        alert('Invalid JSON file');
                    }
                };

                reader.readAsText(file);
            }
        });

        document.getElementById('searchInput').addEventListener('input', function () {
            const searchValue = this.value.trim().toLowerCase();
            const searchField = document.getElementById('searchField').value;

            const filteredData = jsonData.filter((item) => {
                return item[searchField].toLowerCase().includes(searchValue);
            });

            document.getElementById('jsonTable').innerHTML = '';
            createTableHead(jsonData[0]);
            populateTable(filteredData);
        });

        document.getElementById('sortField').addEventListener('change', function () {
            const sortField = this.value;
            const sortedData = sortData(jsonData, sortField);

            document.getElementById('jsonTable').innerHTML = '';
            createTableHead(sortedData[0]);
            populateTable(sortedData);
        });
    