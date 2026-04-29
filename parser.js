const Parser = {
    parse: function(text) {
        const lowerText = text.toLowerCase();
        
        const result = {
            items: [],
            imei: null,
            flags: {
                firmware: false,
                tested: false
            }
        };

        // 1. IMEI
        const imeiRegex = /imei[:\s]*(\d{15})/i;
        const imeiMatch = text.match(imeiRegex);
        if (imeiMatch) result.imei = imeiMatch[1];

        // 2. Флаги
        if (lowerText.includes('прошивк') || lowerText.includes('fw update')) {
            result.flags.firmware = true;
        }
        if (lowerText.includes('тест') || lowerText.includes('проверен') || lowerText.includes('работоспособен')) {
            result.flags.tested = true;
        }

        // 3. Поиск компонентов
        const foundItemsMap = new Map();

        COMPONENT_DB.forEach(comp => {
            let isFound = false;
            comp.patterns.forEach(pattern => {
                if (lowerText.includes(pattern.toLowerCase())) {
                    isFound = true;
                }
            });

            if (isFound && !foundItemsMap.has(comp.id)) {
                foundItemsMap.set(comp.id, {
                    ...comp,
                    originalCategory: comp.category
                });
            }
        });

        // Преобразуем Map в массив и сортируем
        result.items = Array.from(foundItemsMap.values()).sort((a, b) => a.priority - b.priority);

        return result;
    }
};