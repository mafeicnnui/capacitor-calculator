class Calculator {
    constructor() {
        this.display = document.getElementById('result');
        this.currentInput = '0';
        this.operator = null;
        this.previousInput = null;
        this.waitingForOperand = false;
        
        // 添加触摸反馈
        this.addTouchFeedback();
    }

    addTouchFeedback() {
        // 为所有按钮添加触摸反馈
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                button.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 100);
            });
            
            button.addEventListener('touchcancel', (e) => {
                e.preventDefault();
                button.style.transform = 'scale(1)';
            });
        });
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
    }

    inputNumber(num) {
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
        this.currentInput = '0';
        this.previousInput = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.updateDisplay();
        this.vibrate();
    }

    clearEntry() {
        this.currentInput = '0';
        this.updateDisplay();
        this.vibrate();
    }

    deleteLast() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
        this.vibrate();
    }

    showError(message) {
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

// 创建计算器实例
const calc = new Calculator();

// 全局函数，供 HTML 调用
function inputNumber(num) {
    calc.inputNumber(num);
}

function inputOperator(op) {
    calc.inputOperator(op);
}

function calculate() {
    calc.calculate();
}

function clearAll() {
    calc.clearAll();
}

function clearEntry() {
    calc.clearEntry();
}

function deleteLast() {
    calc.deleteLast();
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