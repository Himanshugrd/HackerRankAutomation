const puppeteer = require("puppeteer")

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'kaxihoy730@ketchet.com'
const password = 'Hellboyy'
const codesObj = require('./codes')
let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
})
let page

browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 })
    return emailIsEntered
}).then(function () {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 })
    return passwordIsEntered
}).then(function () {
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]', { delay: 50 })
    return loginButtonClicked
}).then(function () {
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return clickOnAlgoPromise
}).then(function () {
    let getToWarmup = waitAndClick('input[value="warmup"]', page)
    return getToWarmup
}).then(function () {
    let waitFor3Seconds = page.waitFor(3000)
    return waitFor3Seconds

}).then(function () {
    let allChallengesPromis = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 50 })
    return allChallengesPromis;
}).then(function (questionsArr) {
    console.log('number of questions', questionsArr.length)
    let questionWillBesolved = questionSolver(page, questionsArr[0], codesObj.answers[0])
    return questionWillBesolved
})




function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function () {
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function () {
            resolve()
        }).catch(function () {
            reject()
        })


    })
}


function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionwillBeClicked = question.click()
        questionwillBeClicked.then(function () {
            let editorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return editorInFocusPromise

        }).then(function () {
            return waitAndClick('.checkbox-input', page)

        }).then(function () {
            return page.waitForSelector('textarea.custominput', page)
        }).then(function () {
            return page.type('textarea.custominput', answer, { delay: 10 })

        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function () {
            let AIsPressed = page.keyboard.press('A')
            return AIsPressed
        }).then(function () {
            let xIsPressed = page.keyboard.press('X')
            return xIsPressed
        }).then(function () {
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function () {
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return mainEditorInFocus
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function () {
            let AIsPressed = page.keyboard.press('A', { delay: 100 })
            return AIsPressed
        }).then(function () {
            let vIsPressed = page.keyboard.press('V', { delay: 100 })
            return vIsPressed
        }).then(function () {
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function () {
            return page.click('.hr-monaco__run-code', { delay: 100 })
        }).then(function () {
            resolve()

        }).catch(function (err) {
            reject();
        })
    })
}