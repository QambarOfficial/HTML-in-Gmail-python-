let generatedFiles = []; // Array to hold all generated HTML files

// Generate HTML content based on CSV file and selected template
async function generateHTML() {
    const fileInput = document.getElementById('csv-file');
    const templateChoice = document.getElementById('template-choice').value;
    const generatedFilesDiv = document.getElementById('generated-files');
    
    if (!fileInput.files[0]) {
        alert('Please upload a CSV file');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = async function(event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n').map(row => row.split(','));
        
        // Skip the first row (header)
        const data = rows.slice(1);

        // Reset the generated files container
        generatedFilesDiv.innerHTML = ''; // Clear previous content
        generatedFiles = []; // Reset the global array for filtering

        // Show the search field after generation starts
        document.getElementById('search-container').style.display = 'block';

        // Generate the HTML for each row in CSV
        for (const row of data) {
            const name = row[0];  // Assuming the first column is the name
            if (name) {
                if (templateChoice == '1' || templateChoice == '3') {
                    let htmlContent = await generateInvoiceHTML(name);  // Await the promise
                    displayGeneratedContent(`${name}'s Invoice`, htmlContent, generatedFilesDiv, name);
                }
                
                if (templateChoice == '2' || templateChoice == '3') {
                    let htmlContent = await generatePayrollHTML(name);  // Await the promise
                    displayGeneratedContent(`${name}'s Payroll`, htmlContent, generatedFilesDiv, name);
                }
            }
        }
    };
    
    reader.readAsText(file);
}

// Display the generated HTML in a copyable box with a "Copy Code" button
function displayGeneratedContent(title, content, parentDiv, name) {
    // Create a container for each generated content
    const container = document.createElement('div');
    container.classList.add('generated-content-box');
    container.setAttribute('data-name', name.toLowerCase()); // Store the name for filtering

    const titleElem = document.createElement('h3');
    titleElem.innerText = title;

    const copyBox = document.createElement('textarea'); // Use textarea for easy copying
    copyBox.readOnly = true;
    copyBox.style.width = '100%';
    copyBox.style.height = '150px';
    copyBox.value = content;

    // Create the "Copy Code" button
    const copyButton = document.createElement('button');
    copyButton.innerText = 'Copy Code';
    copyButton.classList.add('copy-button');
    
    // Add click event to copy content to clipboard
    copyButton.onclick = function() {
        copyBox.select();
        document.execCommand('copy'); // Copies the selected text to clipboard
        alert('Code copied to clipboard!');
    };

    // Append title, copyable box, and "Copy Code" button to container
    container.appendChild(titleElem);
    container.appendChild(copyBox);
    container.appendChild(copyButton);

    // Append container to parent div
    parentDiv.appendChild(container);

    // Store this container in the global array for searching
    generatedFiles.push(container);
}

// Fetch and generate invoice HTML using the external template
async function generateInvoiceHTML(name) {
    const response = await fetch('inputs/invoice_template.html');
    let template = await response.text();

    // Replace placeholders with actual data
    const today = new Date();
    const invoiceDate = today.toLocaleDateString(); // Current date (Invoice Date)
    const dueDate = new Date(today.setDate(today.getDate() + 15)).toLocaleDateString(); // Due date

    const month = new Date().toLocaleString('default', { month: 'long' });

    // Replace placeholders
    template = template
        .replace('{{name}}', name)
        .replace('{{invoiceDate}}', invoiceDate)
        .replace('{{dueDate}}', dueDate)
        .replace('{{month}}', month);

    return template;
}

// Fetch and generate payroll HTML using the external template
async function generatePayrollHTML(name) {
    const response = await fetch('inputs/payroll_template.html');
    let template = await response.text();

    // Replace placeholders with actual data
    const month = new Date().toLocaleString('default', { month: 'long' });

    // Replace placeholders
    template = template
        .replace('{{name}}', name)
        .replace('{{month}}', month);

    return template;
}

// Function to filter names in generated content
function filterNames() {
    const searchInput = document.getElementById('search-name').value.toLowerCase();

    // Loop through the generated files and hide or show based on search input
    generatedFiles.forEach(file => {
        const name = file.getAttribute('data-name');
        if (name.includes(searchInput)) {
            file.style.display = 'block';
        } else {
            file.style.display = 'none';
        }
    });
}
