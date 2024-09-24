document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const downloadButton = document.getElementById('downloadCsv');
    const fileInput = document.getElementById('fileInput');
    let dictionary = {};

    console.log("Document loaded and script running.");

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("Form submitted.");

        const formData = new FormData(form);
        formData.forEach((value, key) => {
            if (!dictionary[key]) {
                dictionary[key] = [];
            }
            dictionary[key].push(value);
            console.log(`Form data - ${key}: ${value}`);
        });

        // Clear the form inputs after submission
        form.reset();
        console.log("Form inputs cleared.");
        console.log("Current dictionary state:", dictionary);
    });

    downloadButton.addEventListener('click', () => {
        console.log("Download button clicked.");
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const localCsvData = event.target.result.trim(); // Remove leading/trailing whitespace
            console.log("Local CSV loaded:", localCsvData);

            // Convert dictionary to CSV
            const newCsvData = convertDictionaryToCSV(dictionary);
            console.log("New CSV created:", newCsvData);

            // Append the new CSV data starting from the second row
            const localCsvLines = localCsvData.split('\n');
            const newCsvLines = newCsvData.split('\n').slice(1); // Exclude the header row
            const combinedCsvData = localCsvLines.concat(newCsvLines).join('\n');

            // Download the combined CSV file, replacing the existing file if it exists
            downloadCsv(combinedCsvData, file.name);
            console.log("Combined CSV downloaded.");
        };

        reader.readAsText(file);
    });

    function convertDictionaryToCSV(obj) {
        const keys = Object.keys(obj);
        let csv = keys.join(",") + "\n";
        
        // Determine the maximum length of the arrays
        const maxLength = Math.max(...keys.map(key => obj[key].length));

        for (let i = 0; i < maxLength; i++) {
            csv += keys.map(key => obj[key][i] || "").join(",") + "\n";
        }

        return csv;
    }

    function downloadCsv(csvData) {
        const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvData);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "form.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

});

