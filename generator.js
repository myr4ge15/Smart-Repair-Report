const Generator = {
    generateDoneReport: function(parsedData) {
        if (parsedData.items.length === 0 && !parsedData.flags.firmware && !parsedData.flags.tested) {
            return "Нет данных для формирования отчета.";
        }

        let parts = [];
        parsedData.items.forEach(item => {
            parts.push(item.phraseDone);
        });

        if (parsedData.flags.firmware) parts.push("обновлена прошивка");
        if (parsedData.flags.tested) parts.push("устройство протестировано");

        let reportText = parts.join(', ') + '.';
        reportText = reportText.charAt(0).toUpperCase() + reportText.slice(1);

        if (parsedData.imei) {
            reportText += `\n\nНовый IMEI: ${parsedData.imei}`;
        }

        return reportText;
    },
};