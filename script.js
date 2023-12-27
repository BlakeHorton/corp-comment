// -- GLOBAL --
const textareaEl = document.querySelector('.form__textarea')
const counterEl = document.querySelector('.counter')
const formEl = document.querySelector('.form')
const feedbackListEl = document.querySelector('.feedbacks')
const submitBtnEl = document.querySelector('.submit-btn')
const spinnerEl = document.querySelector('.spinner')

const renderFeedbackItem = (feedbackItem) => {
  // new feedback item HTML
  const feedbackItemHTML = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${feedbackItem.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedbackItem.company}</p>
            <p class="feedback__text">${feedbackItem.text}</p>
        </div>
        <p class="feedback__date">${
          feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`
        }</p>
    </li>
`

  feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML)
}

// -- COUNTER COMPONENT --
const inputHandler = () => {
  // determine maximum number of characters
  const maxNrChars = 150

  // determine number of characters currently typed
  const nrCharsTyped = textareaEl.value.length

  // calculate number of characters left (maximum minus currently typed)
  const charsLeft = maxNrChars - nrCharsTyped

  // show number of characters left
  counterEl.textContent = charsLeft
}

textareaEl.addEventListener('input', inputHandler)

// -- SUBMIT COMPONENT --
const submitHandler = (event) => {
  // prevent default browser action (submitting form data to 'action'-address and refreshing page)
  event.preventDefault()

  // get text from textarea
  const text = textareaEl.value

  // validate text (e.g. check if #hashtag is present and text is long enough)
  if (text.includes('#') && text.length >= 5) {
    // show valid indicator
    formEl.classList.add('form--valid')

    // remove visual indicator
    setTimeout(() => {
      formEl.classList.remove('form--valid')
    }, 2000)
  } else {
    // show invalid indicator
    formEl.classList.add('form--invalid')

    // remove visual indicator
    setTimeout(() => {
      formEl.classList.remove('form--invalid')
    }, 2000)

    // focus textarea
    textareaEl.focus()

    // stop this function execution
    return
  }

  // we have text, now extract other info from text
  const hashtag = text.split(' ').find((word) => word.includes('#'))
  const company = hashtag.substring(1)
  const badgeLetter = company.substring(0, 1).toUpperCase()
  const upvoteCount = 0
  const daysAgo = 0

  //create feedback item object
  const feedbackItem = {
    upvoteCount: upvoteCount,
    company: company,
    badgeLetter: badgeLetter,
    daysAgo: daysAgo,
    text: text,
  }

  //render feedback item
  renderFeedbackItem(feedbackItem)

  textareaEl.value = ''
  submitBtnEl.blur()
  counterEl.textContent = '150'
}

formEl.addEventListener('submit', submitHandler)

fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
  .then((response) => response.json())
  .then((data) => {
    //Remove Spinner
    spinnerEl.remove()
    data.feedbacks.forEach((feedbackItem) => {
      renderFeedbackItem(feedbackItem)
    })
  })
  .catch((error) => {
    feedbackListEl.textContent = `Failed to fetch fedback items. Error message: ${error.message}`
  })
