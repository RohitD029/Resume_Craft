window.showToast = function(message, type = 'info') {
    // Inject CSS if not exists
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.innerHTML = `
            .toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                z-index: 99999;
            }
            .toast-notification {
                min-width: 250px;
                max-width: 350px;
                background: #ffffff;
                color: #333333;
                border-left: 5px solid #3b82f6;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                border-radius: 8px;
                padding: 16px 20px;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                animation: toastSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards, toastFadeOut 0.4s ease 3s forwards;
                opacity: 0;
            }
            body.dark-mode .toast-notification {
                background: #1f2937;
                color: #f9fafb;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
            }
            .toast-notification.success { border-left-color: #10b981; }
            .toast-notification.error { border-left-color: #ef4444; }
            .toast-notification.warning { border-left-color: #f59e0b; }
            
            .toast-icon {
                margin-right: 12px;
                font-size: 18px;
            }
            
            @keyframes toastSlideIn {
                from { transform: translateX(120%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes toastFadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(120%); }
            }
        `;
        document.head.appendChild(style);
    }

    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    
    // Icon based on type
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';
    
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    // Remove toast element after animation completes (3.4 seconds total)
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3500);
};
