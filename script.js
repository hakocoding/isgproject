let globalData = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchDataKinds();
});

function fetchDataKinds() {
    fetch('http://localhost:3000/api/data')
        .then(response => response.json())
        .then(data => {
            globalData = data;
            displayKinds(data);      
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayKinds(data) {
    const section = document.getElementById('Factors');

    const uniqueFactors = new Set();
    const uniqueKinds = new Set();
    
    
    data.forEach(item => {

        if (!uniqueKinds.has(item.kind)) {

            uniqueKinds.add(item.kind);
            const kindDiv = document.createElement('div');
            kindDiv.id = item.kind;

            const kindLabel = document.createElement('h3');
            kindLabel.textContent = item.kind;
            
            kindDiv.appendChild(kindLabel);
            section.appendChild(kindDiv);
        }

        if (!uniqueFactors.has(item.factor)) {

            uniqueFactors.add(item.factor);
        
         const thisDiv = document.getElementById(item.kind);
         const div = document.createElement('div');
         div.className = 'factor';

         const checkbox = document.createElement('input');
         checkbox.type = 'checkbox';
         checkbox.id = item.kind;
         checkbox.value = item.factor;
        
         const label = document.createElement('label');
         label.setAttribute('for', checkbox.id);
         label.textContent = item.factor;

         div.appendChild(checkbox);
         div.appendChild(label);

         thisDiv.appendChild(div);}
    });
}

document.getElementById("nextStep").addEventListener("click", function () {
    const selectedFactors = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    displayCurrentStates(selectedFactors);
});

function displayCurrentStates(factors) {
    const currentStatesDiv = document.getElementById("currentStates");
    currentStatesDiv.innerHTML = '';

    factors.forEach(factor => {
        const factorDiv = document.createElement("div");
        factorDiv.classList.add("factor");
        factorDiv.innerHTML = `<h3>${factor}</h3>
            <label for="${factor}-durum">Mevcut durum:</label>
            <select id="${factor}-durum">
                ${generateOptions(factor)}
            </select>`;
        currentStatesDiv.appendChild(factorDiv);
    });

    document.getElementById("factorSelection").style.display = "none";
    document.getElementById("riskCalculation").style.display = "block";
}

document.getElementById("backToFactors").addEventListener("click", function () {

    document.getElementById("factorSelection").style.display = "block";
  
    document.getElementById("riskCalculation").style.display = "none";
});



function generateOptions(factor){
    const filteredData = globalData.filter(item => item.factor === factor);
    let optionsHTML = '';
    filteredData.forEach(item => {
        optionsHTML += `<option value="${item.current}">${item.current}</option>`;
    });

    return optionsHTML;
}

document.getElementById("calculateRisk").addEventListener("click", function () {
    const selectedOptions = Array.from(document.querySelectorAll('#currentStates select')).map(select => {
        const factor = select.id.split('-durum')[0]; 
        const current = select.value; 
        return { factor, current };
    });

    
    const results = selectedOptions.map(({ factor, current }) => {
        return globalData.find(item => item.factor === factor && item.current === current);
    });

    displayRiskResults(results);
    displayDownloadButton(results);
});

function displayRiskResults(results) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ''; 

    results.forEach(item => {
        if (item) { 
            const resultHTML = `
                <div class="risk-item">
                    <h3>${item.factor}</h3>
                    <p>Mevcut durum: ${item.current}</p>
                    <p>Risk Şiddeti: ${item.severity}</p>
                    <p>Risk Olasılığı: ${item.possibility}</p>
                    <p>Risk Skoru: ${item.riskscore}</p>
                    <p>Risk Sınıfı: ${item.riskClass}</p>
                    <p>Risk Kaynağı: ${item.risk}</p>
                    <p>Öneri: ${item.suggestion}</p>
                </div>
            `;
            resultDiv.innerHTML += resultHTML;
        } else {
            resultDiv.innerHTML += `<p>No data found for selected option.</p>`;
        }
    });
}

function displayDownloadButton(results) {
    const downloadButton = document.getElementById("downloadExcel");
    if (results.length > 0) {
        downloadButton.style.display = 'block';
    }
}

document.getElementById("downloadExcel").addEventListener("click", function () {
    const results = Array.from(document.querySelectorAll('.risk-item')).map(item => {
        return {
            Faktör: item.querySelector('h3').textContent,
            "Mevcut durum": item.querySelector('p').textContent.split(":")[1].trim(),
            "Risk Şiddeti": item.querySelector('p:nth-child(3)').textContent.split(":")[1].trim(),
            "Risk Olasılığı": item.querySelector('p:nth-child(4)').textContent.split(":")[1].trim(),
            "Risk Skoru": item.querySelector('p:nth-child(5)').textContent.split(":")[1].trim(),
            "Risk Sınıfı": item.querySelector('p:nth-child(6)').textContent.split(":")[1].trim(),
            "Risk": item.querySelector('p:nth-child(7)').textContent.split(":")[1].trim(),
            "Öneri": item.querySelector('p:nth-child(8)').textContent.split(":")[1].trim()
        };
    });

    const ws = XLSX.utils.json_to_sheet(results); 
    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, "Risk Data"); 

    
    XLSX.writeFile(wb, "RiskData.xlsx");
});