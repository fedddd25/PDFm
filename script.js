// Select DOM elements
const pdfInput = document.getElementById('pdfInput');
const uploadBtn = document.getElementById('uploadBtn');
const pdfList = document.getElementById('pdfList');

// Array to store PDF metadata
let pdfFiles = [];

// Handle Upload
uploadBtn.addEventListener('click', () => {
    const file = pdfInput.files[0];

    if (file && file.type === 'application/pdf') {
        // Create a unique ID for the file
        const id = Date.now();
        const pdfData = {
            id,
            name: file.name,
            url: URL.createObjectURL(file) // Create a local URL to access the file
        };

        // Add to the list
        pdfFiles.push(pdfData);
        renderPDFList();
        pdfInput.value = ''; // Clear the input
    } else {
        alert('Please upload a valid PDF file.');
    }
});

// Render PDF List
function renderPDFList() {
    pdfList.innerHTML = ''; // Clear existing list

    pdfFiles.forEach((pdf) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${pdf.url}" target="_blank">${pdf.name}</a>
            <button onclick="deletePDF(${pdf.id})">Delete</button>
        `;
        pdfList.appendChild(li);
    });
}

// Delete PDF from the list
function deletePDF(id) {
    pdfFiles = pdfFiles.filter((pdf) => pdf.id !== id);
    renderPDFList();
}
