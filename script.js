'use strict'
const textareaEl = document.querySelector('.form__textarea')
const counterEl = document.querySelector('.counter')
const formEl = document.querySelector('.form')
const feedbackListEl = document.querySelector('.feedbacks')
const submiteBtnEl = document.querySelector('.submit-btn')
const MAX_CHARS = 150

textareaEl.addEventListener('input', () => {
  const maxNrChars = MAX_CHARS
  const nrCharsTyped = textareaEl.value.length
  const charsLeft = maxNrChars - nrCharsTyped
  counterEl.textContent = charsLeft
})

const showVisualIndicator = (textCheck) => {
  const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid'
  formEl.classList.add(className)

  setTimeout(() => {
    formEl.classList.remove(className)
  }, 2000)
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault()
  const text = textareaEl.value
  if (text.includes('#') && text.length >= 5) {
    showVisualIndicator('valid')
  } else {
    showVisualIndicator('invalid')
    textareaEl.focus()

    return
  }
  const hashtag = text.split(' ').find((word) => word.includes('#'))
  const company = hashtag.substring(1)
  const badgeLetter = company.substring(0, 1).toUpperCase()
  const upVoteCount = 0
  const daysAgo = 0

  const feedbackItemHtml = `
  <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${upVoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${company}</p>
        <p class="feedback__text">${text}</p>
    </div>
    <p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
</li>
  `
  feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHtml)
  textareaEl.value = ''
  submiteBtnEl.blur()
  counterEl.textContent = MAX_CHARS
})
