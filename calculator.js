// 简化的计算器实现，使用事件委托避免 onclick 问题
class Calculator {
    constructor() {
        this.display = document.getElementById('result');
        this.currentInput = '0';
        this.operator = null;
        this.previousInput = null;
        this.waitingForOperand = false;
        
        console.log('Calculator initialized');
        this.updateDisplay();
        this.bindEvents();
    }

    bindEvents() {
        // 使用事件委托，避免 onclick 属性问题
        const buttonsContainer = document.querySelector('.buttons');
        if (buttonsContainer) {
            buttonsContainer.addEventListener('click', (e) => {
                const button = e.target.closest('button');
                if (!button) return;
                
                e.preventDefault();
                this.handleButtonClick(button);
            });
            
            // 添加触摸事件
            buttonsContainer.addEventListener('touchend', (e) => {
                const button = e.target.closest('button');
                if (!button) return;
                
                e.preventDefault();
                this.handleButtonClick(button);
            });
            
            console.log('Events bound successfully');
        } else {
            console.error('Buttons container not found');
        }
    }

    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;
        
        console.log('Button clicked:', action, value);
        
        // 触摸反馈
        this.vibrate();
        
        // 视觉反馈
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
        
        switch (action) {
            case 'number':
                this.inputNumber(value);
                break;
            case 'operator':
                this.inputOperator(value);
                break;
            case 'calculate':
                this.calculate();
                break;
            case 'clear':
                this.clearAll();
                break;
            case 'clear-entry':
                this.clearEntry();
                break;
            case 'delete':
                this.deleteLast();
                break;
            case 'function':
                this.executeFunction(value);
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    updateDisplay() {
        let displayValue = this.currentInput;
        if (displayValue.length > 12) {
            if (displayValue.includes('.')) {
                displayValue = parseFloat(displayValue).toExponential(6);
            } else {
                displayValue = displayValue.substring(0, 12);
            }
        }
        this.display.value = displayValue;
        console.log('Display updated:', displayValue);
    }

    inputNumber(num) {
        console.log('Input number:', num);
        
        if (this.waitingForOperand) {
            this.currentInput = num;
            this.waitingForOperand = false;
        } else {
            if (this.currentInput === '0') {
                this.currentInput = num;
            } else {
                if (this.currentInput.length < 12) {
                    this.currentInput += num;
                }
            }
        }
        
        // 防止多个小数点
        if (num === '.' && this.currentInput.split('.').length > 2) {
            this.currentInput = this.currentInput.slice(0, -1);
            return;
        }
        
        this.updateDisplay();
    }

    inputOperator(nextOperator) {
        console.log('Input operator:', nextOperator);
        
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === null) {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation(currentValue, inputValue, this.operator);

            this.currentInput = String(newValue);
            this.previousInput = newValue;
            this.updateDisplay();
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
    }

    performCalculation(firstOperand, secondOperand, operator) {
        console.log('Calculating:', firstOperand, operator, secondOperand);
        
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                if (secondOperand === 0) {
                    this.showError('不能除以零');
                    return firstOperand;
                }
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    calculate() {
        console.log('Calculate pressed');
        
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput !== null && this.operator) {
            const newValue = this.performCalculation(this.previousInput, inputValue, this.operator);
            
            this.currentInput = String(newValue);
            this.previousInput = null;
            this.operator = null;
            this.waitingForOperand = true;
            this.updateDisplay();
        }
    }

    clearAll() {
        console.log('Clear all');
        
        this.currentInput = '0';
        this.previousInput = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    clearEntry() {
        console.log('Clear entry');
        
        this.currentInput = '0';
        this.updateDisplay();
    }

    deleteLast() {
        console.log('Delete last');
        
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    executeFunction(func) {
        console.log('Execute function:', func);
        
        const currentValue = parseFloat(this.currentInput);
        let result;
        
        switch (func) {
            case 'sqrt':
                if (currentValue < 0) {
                    this.showError('负数无法开方');
                    return;
                }
                result = Math.sqrt(currentValue);
                break;
            case 'square':
                result = currentValue * currentValue;
                break;
            case 'percent':
                // 如果有前一个操作数，计算百分比
                if (this.previousInput !== null) {
                    result = (this.previousInput * currentValue) / 100;
                } else {
                    result = currentValue / 100;
                }
                break;
            case 'negate':
                result = currentValue * -1;
                break;
            default:
                return;
        }
        
        this.currentInput = String(result);
        this.waitingForOperand = true;
        this.updateDisplay();
    }

    showError(message) {
        console.log('Error:', message);
        
        const originalValue = this.display.value;
        this.display.value = message;
        setTimeout(() => {
            this.display.value = originalValue;
        }, 1500);
    }

    vibrate() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
}

// 等待 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing calculator...');
    
    // 添加一些调试信息
    console.log('User Agent:', navigator.userAgent);
    console.log('Screen size:', screen.width + 'x' + screen.height);
    
    const calc = new Calculator();
    
    // 全局暴露用于调试
    window.calc = calc;
    
    // 尝试隐藏状态栏（如果在 Capacitor 环境中）
    if (window.Capacitor) {
        import('@capacitor/status-bar').then(({ StatusBar }) => {
            StatusBar.hide().catch(err => console.log('StatusBar hide failed:', err));
        }).catch(err => console.log('StatusBar plugin not available:', err));
    }
    
    console.log('Calculator setup complete');
});

// 防止页面滚动和缩放
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });

// 防止双击缩放
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// 防止右键菜单
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

console.log('Calculator script loaded');