class Calculator {
    constructor() {
        this.display = document.getElementById('result');
        this.currentInput = '0';
        this.operator = null;
        this.previousInput = null;
        this.waitingForOperand = false;
        
        console.log('Calculator initialized');
        this.updateDisplay();
    }

    updateDisplay() {
        // 限制显示长度，防止溢出
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
                // 防止输入过长
                if (this.currentInput.length < 12) {
                    this.currentInput += num;
                }
            }
        }
        
        // 防止多个小数点
        if (num === '.' && this.currentInput.includes('.')) {
            return;
        }
        
        this.updateDisplay();
        this.vibrate();
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
        this.vibrate();
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
        this.vibrate();
    }

    clearAll() {
        console.log('Clear all');
        
        this.currentInput = '0';
        this.previousInput = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.updateDisplay();
        this.vibrate();
    }

    clearEntry() {
        console.log('Clear entry');
        
        this.currentInput = '0';
        this.updateDisplay();
        this.vibrate();
    }

    deleteLast() {
        console.log('Delete last');
        
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
        this.vibrate();
    }

    showError(message) {
        console.log('Error:', message);
        
        // 在移动端显示错误提示
        const originalValue = this.display.value;
        this.display.value = message;
        setTimeout(() => {
            this.display.value = originalValue;
        }, 1500);
    }

    vibrate() {
        // 添加触觉反馈（如果设备支持）
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
}

// 等待 DOM 加载完成后初始化
let calc;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing calculator...');
    calc = new Calculator();
    
    // 添加触摸事件监听器
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
        
        button.addEventListener('touchcancel', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log('Calculator setup complete');
});

// 全局函数，供 HTML 调用
function inputNumber(num) {
    if (calc) {
        calc.inputNumber(num);
    } else {
        console.error('Calculator not initialized');
    }
}

function inputOperator(op) {
    if (calc) {
        calc.inputOperator(op);
    } else {
        console.error('Calculator not initialized');
    }
}

function calculate() {
    if (calc) {
        calc.calculate();
    } else {
        console.error('Calculator not initialized');
    }
}

function clearAll() {
    if (calc) {
        calc.clearAll();
    } else {
        console.error('Calculator not initialized');
    }
}

function clearEntry() {
    if (calc) {
        calc.clearEntry();
    } else {
        console.error('Calculator not initialized');
    }
}

function deleteLast() {
    if (calc) {
        calc.deleteLast();
    } else {
        console.error('Calculator not initialized');
    }
}

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