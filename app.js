document.addEventListener('DOMContentLoaded', () => {
    // Элементы ввода
    const rawInput = document.getElementById('rawInput');
    const btnGenerate = document.getElementById('btnGenerate');
    const btnClear = document.getElementById('btnClear');
    
    // Элементы вывода
    const resultDone = document.getElementById('resultDone');
    const resultTodo = document.getElementById('resultTodo');

    // Элементы управления базой
    const dbContainer = document.getElementById('dbContainer');
    const btnSaveDb = document.getElementById('btnSaveDb');
    const btnResetDb = document.getElementById('btnResetDb');
    
    // Элементы добавления нового компонента
    const btnAddComponent = document.getElementById('btnAddComponent');

    // Загрузка базы из LocalStorage при старте
    loadDatabase();

    // Обработчики событий
    btnGenerate.addEventListener('click', processInput);
    
    btnClear.addEventListener('click', () => {
        rawInput.value = '';
        resultDone.textContent = '...';
        resultTodo.textContent = '...';
    });

    btnSaveDb.addEventListener('click', () => {
        saveDatabaseFromTable();
        alert('База знаний сохранена!');
        processInput(); // Перегенерировать отчет с новыми данными
    });

    btnResetDb.addEventListener('click', () => {
        if(confirm('Сбросить все изменения в базе знаний к стандартным?')) {
            localStorage.removeItem('repairAppDB');
            location.reload();
        }
    });

    btnAddComponent.addEventListener('click', addNewComponent);

    // Функция обработки ввода
    function processInput() {
        const text = rawInput.value;
        if (!text.trim()) return;

        const parsed = Parser.parse(text);
        resultDone.textContent = Generator.generateDoneReport(parsed);
        resultTodo.textContent = Generator.generateTodoReport(parsed);
    }

    // --- Функции управления базой данных ---

    function loadDatabase() {
        const saved = localStorage.getItem('repairAppDB');
        if (saved) {
            const savedData = JSON.parse(saved);
            savedData.forEach(savedItem => {
                const existing = COMPONENT_DB.find(c => c.id === savedItem.id);
                if (existing) {
                    existing.phraseDone = savedItem.phraseDone;
                    existing.phraseTodo = savedItem.phraseTodo;
                }
            });
        }
        renderDatabaseTable();
    }

    function renderDatabaseTable() {
        dbContainer.innerHTML = '';
        const table = document.createElement('table');
        table.className = 'db-table';
        
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Компонент</th>
                <th>Фраза: Выполнено</th>
                <th>Фраза: Требуется</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        
        COMPONENT_DB.forEach((comp, index) => {
            const tr = document.createElement('tr');
            
            const tdName = document.createElement('td');
            tdName.textContent = `${comp.id} (${comp.patterns[0]}...)`;
            tdName.className = 'db-name';
            
            const tdDone = document.createElement('td');
            const inputDone = document.createElement('input');
            inputDone.type = 'text';
            inputDone.value = comp.phraseDone;
            inputDone.dataset.index = index;
            inputDone.dataset.field = 'phraseDone';
            inputDone.addEventListener('change', updateDbModel);
            tdDone.appendChild(inputDone);

            const tdTodo = document.createElement('td');
            const inputTodo = document.createElement('input');
            inputTodo.type = 'text';
            inputTodo.value = comp.phraseTodo;
            inputTodo.dataset.index = index;
            inputTodo.dataset.field = 'phraseTodo';
            inputTodo.addEventListener('change', updateDbModel);
            tdTodo.appendChild(inputTodo);

            tr.appendChild(tdName);
            tr.appendChild(tdDone);
            tr.appendChild(tdTodo);
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        dbContainer.appendChild(table);
    }

    function updateDbModel(e) {
        const index = e.target.dataset.index;
        const field = e.target.dataset.field;
        COMPONENT_DB[index][field] = e.target.value;
    }

    function saveDatabaseFromTable() {
        const dataToSave = COMPONENT_DB.map(c => ({
            id: c.id,
            phraseDone: c.phraseDone,
            phraseTodo: c.phraseTodo
        }));
        localStorage.setItem('repairAppDB', JSON.stringify(dataToSave));
    }

    function addNewComponent() {
        const pattern = document.getElementById('newPartNumber').value.trim();
        const category = document.getElementById('newCategory').value;
        const phraseDone = document.getElementById('newPhraseDone').value.trim();
        const phraseTodo = document.getElementById('newPhraseTodo').value.trim();

        if (!pattern || !phraseDone) {
            alert('Заполните Part Number и Фразу "Выполнено"');
            return;
        }

        const newId = 'custom_' + Date.now();
        const newComp = {
            id: newId,
            category: category,
            patterns: [pattern],
            phraseDone: phraseDone,
            phraseTodo: phraseTodo || phraseDone.toLowerCase(),
            priority: CATEGORY_PRIORITY[category] || 9
        };

        COMPONENT_DB.push(newComp);
        renderDatabaseTable(); // Обновить таблицу
        
        // Очистка полей
        document.getElementById('newPartNumber').value = '';
        document.getElementById('newPhraseDone').value = '';
        document.getElementById('newPhraseTodo').value = '';
        
        alert('Компонент добавлен! Не забудьте нажать "Сохранить изменения".');
    }
});

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Скопировано!';
        setTimeout(() => btn.textContent = originalText, 1500);
    });
}