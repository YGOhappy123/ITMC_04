const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const numbersForm = $('.form-numbers')
const totalCasesIp = $('.quantity-input')
const firstNumIp = $('.first-number')
const secondNumIp = $('.second-number')
const thirdNumIp = $('.third-number')
const errorMsg = $('.show-error-msg')
const inputRemain = $('.count-remain-input')
const resultEl = $('.remainder')
const resetBtn = $('.reset-btn')
let totalTestCases
let x = y = z = checkedCases = 0
const firstErrEl = getSuitableErr(firstNumIp)
const secondErrEl = getSuitableErr(secondNumIp)
const thirdErrEl = getSuitableErr(thirdNumIp)

totalCasesIp.onkeyup = function(e) {
    errorMsg.innerText = ''

    if (e.keyCode === 13) {
        const caseCount = parseInt(e.target.value)
        if (caseCount >= 1 && caseCount <= 100) {
            totalTestCases = caseCount
            openNumbersForm()
        } else {
            e.target.value = ''
            errorMsg.innerText = 'Vui lòng nhập giá trị từ 1 đến 100'
        }
    }
}

firstNumIp.onkeyup = function(e) {
    const errorEl =  firstErrEl
    errorEl.innerText = ''

    const data = e.target.value
    if (e.keyCode === 13) {
        if (data >= 1) {
            firstNumIp.disabled = true
            secondNumIp.disabled = false
            secondNumIp.focus()
            x = data
        } else {
            errorEl.innerText = 'Vui lòng nhập giá trị lớn hơn hoặc bằng 1'
            firstNumIp.value = ''
        }
    }
}

secondNumIp.onkeyup = function(e) {
    const errorEl =  secondErrEl
    errorEl.innerText = ''

    const data = e.target.value
    if (e.keyCode === 13) {
        if (data <= 10**6) {
            secondNumIp.disabled = true
            thirdNumIp.disabled = false
            thirdNumIp.focus()
            y = data
        } else {
            errorEl.innerText = 'Vui lòng nhập giá trị bé hơn hoặc bằng 1.000.000'
            secondNumIp.value = ''
        }
    }
}

thirdNumIp.onkeyup = function(e) {
    const errorEl =  thirdErrEl
    errorEl.innerText = '' 

    const data = e.target.value
    if (e.keyCode === 13) {
        if (data >= 1 && data <= 10**9+7) {
            thirdNumIp.disabled = true
            z = data
            checkedCases++
            calculateRemainCases()
            calculateRemainder()
        } else {
            errorEl.innerText = 'Vui lòng nhập giá trị trong khoảng từ 1 đến 1.000.000.007'
            thirdNumIp.value = ''
        }
    }
}

function openNumbersForm() {
    inputRemain.innerText = `Số phép tính còn lại: ${totalTestCases}`
    totalCasesIp.disabled = true
    numbersForm.classList.remove('invisible')
    firstNumIp.focus()
}

function getSuitableErr (inputEl) {
    const parentEl = inputEl.parentElement
    const errorEl = parentEl.querySelector('.form-msg')
    return errorEl
}

function calculateRemainCases () {
    if(checkedCases !== totalTestCases) {
        const remainCases = totalTestCases - checkedCases
        inputRemain.innerText = `Số phép tính còn lại: ${remainCases}`
        firstNumIp.value = ''
        secondNumIp.value = ''
        thirdNumIp.value = ''
        firstNumIp.disabled = false
        firstNumIp.focus()
    } else {
        inputRemain.innerText = ''
    }
}

function calculateRemainder () {
    const result = (x**y)%z
    resultEl.classList.remove('invisible')
    resultEl.innerText = `Kết quả số dư của phép tính là: ${result}`
}

resetBtn.onclick = function() {
    // reset variables
    totalTestCases = undefined
    x = y = z = checkedCases = 0

    // restart total cases input field
    totalCasesIp.disabled = false
    totalCasesIp.value = ''
    totalCasesIp.focus()
    errorMsg.innerText = ''

    // close numbers input form and hide result element
    numbersForm.classList.add('invisible')
    firstNumIp.disabled = false
    secondNumIp.disabled = true
    thirdNumIp.disabled = true
    firstNumIp.value = ''
    secondNumIp.value = ''
    thirdNumIp.value = ''
    firstErrEl.innerText = ''
    secondErrEl.innerText = ''
    thirdErrEl.innerText = ''
    resultEl.classList.add('invisible')
}