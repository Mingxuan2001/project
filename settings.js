// 保存设置函数
function saveSettings() {
    const accessControl = {
        dataServer: {
            high: document.getElementById("dataServerHigh").checked,
            medium: document.getElementById("dataServerMedium").checked,
            low: document.getElementById("dataServerLow").checked,
        },
        officeZone: {
            high: document.getElementById("officeZoneHigh").checked,
            medium: document.getElementById("officeZoneMedium").checked,
            low: document.getElementById("officeZoneLow").checked,
        },
    };

    localStorage.setItem("accessControl", JSON.stringify(accessControl));
    showToast("Settings saved successfully!");
}

// 显示提示信息
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// 显示加载指示器
function showLoader(button) {
    const loader = document.createElement("div");
    loader.className = "loader";
    button.appendChild(loader);

    // 模拟加载 2 秒后移除指示器
    setTimeout(() => {
        loader.remove();
    }, 2000);
}

// 鼠标拖尾效果
const mouseTail = document.createElement("div");
mouseTail.classList.add("mouse-tail");
document.body.appendChild(mouseTail);

document.addEventListener("mousemove", (e) => {
    mouseTail.style.top = `${e.clientY}px`;
    mouseTail.style.left = `${e.clientX}px`;
});

document.addEventListener("mouseout", () => {
    mouseTail.style.opacity = "0";
});

document.addEventListener("mouseover", () => {
    mouseTail.style.opacity = "1";
});

// 粒子爆炸效果
function particleExplosion(x, y) {
    tsParticles.load("tsparticles", {
        emitters: {
            position: { x, y },
            rate: { quantity: 10, delay: 0.1 }
        },
        particles: {
            number: { value: 0 },
            color: { value: "#ff0000" },
            shape: { type: "circle" },
            opacity: { value: 1 },
            size: { value: 10, random: true },
            move: { speed: 10, direction: "none", outMode: "destroy" }
        }
    });
}

// 绑定保存按钮的点击事件
document.querySelector(".btn-save").addEventListener("click", (e) => {
    saveSettings();
    showLoader(e.target);
    showToast("Settings are being saved...");

    // 粒子爆炸效果
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    particleExplosion(x, y);
});

// 页面加载完成后，添加加载动画的隐藏逻辑
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);

    // 加载已保存的设置
    loadSettings();
});

// 初始化时加载已保存的设置
function loadSettings() {
    const accessControl = JSON.parse(localStorage.getItem("accessControl"));
    if (accessControl) {
        document.getElementById("dataServerHigh").checked = accessControl.dataServer.high;
        document.getElementById("dataServerMedium").checked = accessControl.dataServer.medium;
        document.getElementById("dataServerLow").checked = accessControl.dataServer.low;

        document.getElementById("officeZoneHigh").checked = accessControl.officeZone.high;
        document.getElementById("officeZoneMedium").checked = accessControl.officeZone.medium;
        document.getElementById("officeZoneLow").checked = accessControl.officeZone.low;
    }
}
