let trustData = [];

// 获取元素的引用
const csvFileInput = document.getElementById('csvFile');
const fileInfo = document.getElementById('fileInfo');
const generateButton = document.getElementById('generateButton');
const userInfo = document.getElementById('userInfo');

// 文件选择后显示文件名
csvFileInput.addEventListener('change', event => {
    const file = event.target.files[0];
    if (file) {
        fileInfo.textContent = `Selected: ${file.name}`;
        parseCSV(file);
    } else {
        fileInfo.textContent = 'No file chosen';
    }
});

// 解析 CSV 文件
function parseCSV(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n');
        trustData = rows.slice(1).map(row => {
            const [ClientMacAddr, Trust, Standardized_Trust, Access_Level] = row.split(',');
            return {
                mac: ClientMacAddr?.trim(),
                trust: Trust?.trim(),
                standardizedTrust: Standardized_Trust?.trim(),
                accessLevel: Access_Level?.trim()
            };
        }).filter(row => row.mac && row.accessLevel); // 过滤无效行
        console.log('Parsed Trust Data:', trustData);
    };
    reader.readAsText(file);
}

// 生成随机用户
function generateRandomUser() {
    if (!trustData.length) {
        alert('No data available! Please upload a valid CSV file.');
        return;
    }

    const accessControl = JSON.parse(localStorage.getItem('accessControl'));
    if (!accessControl) {
        alert('No access control settings found! Please set them on the first page.');
        return;
    }

    const randomIndex = Math.floor(Math.random() * trustData.length);
    const randomUser = trustData[randomIndex];

    const accessLevelMap = {
        'High Access': 'high',
        'Medium Access': 'medium',
        'Low Access': 'low'
    };

    const accessLevel = accessLevelMap[randomUser.accessLevel];
    if (!accessLevel) {
        alert('Invalid Access Level found in user data!');
        return;
    }

    const accessibleZones = Object.keys(accessControl).filter(zone => {
        const zonePermissions = accessControl[zone];
        return zonePermissions[accessLevel];
    });

    userInfo.innerHTML = `
        <p><strong>MAC Address:</strong> ${randomUser.mac}</p>
        <p><strong>Access Level:</strong> ${randomUser.accessLevel}</p>
        <p><strong>Accessible Zones:</strong> ${accessibleZones.join(', ') || 'None'}</p>
    `;
}

// 按钮点击事件监听器
generateButton.addEventListener("click", () => {
    generateRandomUser();
});
