const searchForm = document.querySelector('#searchForm');
    const searchInput = document.querySelector('#searchInput');
    const searchMessage = document.querySelector('#searchMessage');
    const signin = document.querySelector('#signin');
    const signup = document.querySelector('#signup');

    function showPage() {
      const view = location.hash;
      const accountView = view === '#signin' ? signin : view === '#signup' ? signup : null;
      document.querySelector('main').classList.toggle('page-hidden', Boolean(accountView));
      document.querySelector('footer').classList.toggle('page-hidden', Boolean(accountView));
      signin.classList.toggle('active', accountView === signin);
      signup.classList.toggle('active', accountView === signup);
    }
    if (signin && signup) {
      window.addEventListener('hashchange', showPage);
      showPage();
    }

    if (searchForm && searchInput && searchMessage) searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      searchMessage.textContent = query ? `Searching the collection for "${query}"...` : 'Choose a level or enter a topic to begin your search.';
    });
    document.querySelectorAll('.level-pill').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.level-pill').forEach((item) => item.classList.toggle('active', item === button));
        if (searchMessage) searchMessage.textContent = button.dataset.level === 'all'
          ? 'Showing resources for every CEFR level.'
          : `Showing resources for ${button.textContent}.`;
      });
    });
    document.querySelectorAll('.role-badge').forEach((button) => {
      button.addEventListener('click', () => {
        const role = button.dataset.role;
        document.querySelectorAll('.role-badge').forEach((item) => item.classList.toggle('active', item === button));
        document.querySelectorAll('.code-callout').forEach((example) => {
          example.classList.toggle('is-muted', example.dataset.exampleRole !== role);
        });
      });
    });
    const quizQuestions = [
      { prompt: 'Choose the sentence where the gerund functions as the subject:', options: ['She is planning on visiting Paris.', 'Swimming every morning boosts your energy.', 'His favorite hobby is cooking.', 'I caught him listening to music.'], correct: 1, explanation: '“Swimming” is the subject of the sentence.' },
      { prompt: 'They avoided _____ about the difficult topic during dinner.', options: ['talk', 'to talk', 'talking', 'talked'], correct: 2, explanation: 'Avoid is followed by a gerund: “avoided talking.”' },
      { prompt: 'Identify the function of the gerund: “Thank you for helping me with my homework.”', options: ['Subject', 'Direct Object', 'Subject Complement', 'Object of a Preposition'], correct: 3, explanation: '“Helping” follows the preposition “for,” so it is its object.' },
      { prompt: 'Which sentence contains a gerund functioning as a subject complement?', options: ['Practicing every day makes perfect.', 'Her main goal is learning Khmer fluently.', 'They finished reading early.', 'We are interested in taking a course.'], correct: 1, explanation: '“Learning Khmer fluently” completes the meaning of “goal.”' },
      { prompt: 'Would you mind _____ the window? It\'s getting cold in here.', options: ['close', 'to close', 'closing', 'closed'], correct: 2, explanation: 'Would you mind is followed by a gerund: “mind closing.”' },
      { prompt: 'Choose the sentence that correctly uses a gerund:', options: ['He suggested to go for a walk.', 'He suggested going for a walk.', 'He suggested go for a walk.', 'He suggested to going for a walk.'], correct: 1, explanation: 'Suggest is followed by a gerund: “suggested going.”' },
      { prompt: 'In “Reading books broadens your perspective”, what is “Reading”?', options: ['Continuous verb', 'Infinitive verb', 'Gerund (Noun)', 'Adjective'], correct: 2, explanation: '“Reading” acts as a noun and is the subject of the sentence.' },
      { prompt: 'After _____ the exam, the students celebrated.', options: ['complete', 'completed', 'to complete', 'completing'], correct: 3, explanation: 'After is followed by a gerund when the subject performs the action.' },
      { prompt: 'I really enjoy _____ interactive audiobooks.', options: ['listen to', 'listening to', 'to listen to', 'listened to'], correct: 1, explanation: 'Enjoy is followed by a gerund: “enjoy listening to.”' },
      { prompt: 'Identify the sentence that uses a gerund as a direct object:', options: ['Traveling is a wonderful experience.', 'My grandfather keeps complaining about the noise.', 'She succeeded in passing the test.', 'His passion is painting.'], correct: 1, explanation: '“Complaining” is the direct object of the verb “keeps.”' }
    ];
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.querySelector('#quizFeedback');
    const quizNext = document.querySelector('#quizNext');
    const quizProgress = document.querySelector('.quiz-progress b');
    const quizPrompt = document.querySelector('.question-prompt');
    const quizSummary = document.querySelector('#quizSummary');
    const quizScore = document.querySelector('#quizScore');
    const quizAccuracy = document.querySelector('#quizAccuracy');
    const quizRetry = document.querySelector('#quizRetry');
    let quizIndex = 0;
    let quizCorrect = 0;

    function renderQuizQuestion() {
      const question = quizQuestions[quizIndex];
      if (quizProgress) quizProgress.textContent = String(quizIndex + 1);
      if (quizPrompt) quizPrompt.textContent = question.prompt;
      quizOptions.forEach((button, index) => {
        button.className = 'quiz-option';
        button.disabled = false;
        button.dataset.answer = question.options[index];
        button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span> ${question.options[index]}`;
      });
      if (quizFeedback) quizFeedback.hidden = true;
      if (quizNext) quizNext.hidden = true;
      if (quizSummary) quizSummary.hidden = true;
    }

    quizOptions.forEach((button, index) => {
      button.addEventListener('click', () => {
        const question = quizQuestions[quizIndex];
        const isCorrect = index === question.correct;
        if (isCorrect) quizCorrect += 1;
        quizOptions.forEach((option, optionIndex) => {
          option.disabled = true;
          option.classList.toggle('is-correct', optionIndex === question.correct);
          option.classList.toggle('is-wrong', optionIndex === index && !isCorrect);
        });
        if (quizFeedback) {
          quizFeedback.hidden = false;
          quizFeedback.querySelector('strong').textContent = isCorrect ? 'Correct answer' : 'Not quite';
          quizFeedback.querySelector('small').textContent = isCorrect
            ? question.explanation
            : `The answer is “${question.options[question.correct]}”. ${question.explanation}`;
        }
        if (quizNext) {
          quizNext.hidden = false;
          quizNext.textContent = 'Next question  →';
        }
        if (quizIndex === quizQuestions.length - 1 && quizNext) quizNext.textContent = 'See results  →';
      });
    });

    if (quizNext) quizNext.addEventListener('click', () => {
      if (quizIndex < quizQuestions.length - 1) {
        quizIndex += 1;
        renderQuizQuestion();
        return;
      }
      if (quizScore) quizScore.textContent = `${quizCorrect} / ${quizQuestions.length}`;
      if (quizAccuracy) quizAccuracy.textContent = `${Math.round((quizCorrect / quizQuestions.length) * 100)}%`;
      if (quizSummary) quizSummary.hidden = false;
      quizNext.hidden = true;
      document.querySelector('.quiz-question')?.setAttribute('hidden', '');
      document.querySelector('.quiz-options')?.setAttribute('hidden', '');
      quizFeedback?.setAttribute('hidden', '');
    });
    if (quizRetry) quizRetry.addEventListener('click', () => {
      quizIndex = 0;
      quizCorrect = 0;
      document.querySelector('.quiz-question')?.removeAttribute('hidden');
      document.querySelector('.quiz-options')?.removeAttribute('hidden');
      renderQuizQuestion();
    });
    const infinitiveQuestions = [
      { prompt: 'Choose the sentence where the infinitive functions as the subject:', options: ['She hopes to visit London.', 'To learn a new language takes patience.', 'His ambition is to become an engineer.', 'They went to the library to study.'], correct: 1, explanation: '“To learn a new language” is the subject of the sentence.' },
      { prompt: 'We decided _____ a break after working for three hours.', options: ['taking', 'to take', 'take', 'taken'], correct: 1, explanation: 'Decide is followed by a to-infinitive: “decided to take.”' },
      { prompt: 'Identify the function: “She bought a dictionary to improve her vocabulary.”', options: ['Subject', 'Direct Object', 'Adverb of Purpose', 'Subject Complement'], correct: 2, explanation: '“To improve her vocabulary” explains the purpose of buying the dictionary.' },
      { prompt: 'Which sentence contains an infinitive functioning as a subject complement?', options: ['To travel the world is my dream.', 'My main goal is to pass the IELTS exam.', 'He refused to answer.', 'I have homework to finish.'], correct: 1, explanation: '“To pass the IELTS exam” completes the meaning of “goal.”' },
      { prompt: 'The manager promised _____ back to us before Friday.', options: ['calling', 'to call', 'call', 'called'], correct: 1, explanation: 'Promise is followed by a to-infinitive: “promised to call.”' },
      { prompt: 'Choose the sentence that correctly uses an infinitive:', options: ['She agreed helping me.', 'She agreed to help me.', 'She agreed help me.', 'She agreed for helping me.'], correct: 1, explanation: 'Agree is followed by a to-infinitive: “agreed to help.”' },
      { prompt: 'In “I need something to drink”, how does “to drink” function?', options: ['As an adjective', 'As a main verb', 'As a subject', 'As a preposition'], correct: 0, explanation: '“To drink” describes the noun “something,” so it acts as an adjective.' },
      { prompt: 'Select the sentence that uses a bare infinitive (infinitive without “to”):', options: ['She allowed him to enter.', 'Please let me know if you need help.', 'He failed to complete it.', 'They plan to travel.'], correct: 1, explanation: 'Let is followed by a bare infinitive: “let me know.”' },
      { prompt: 'He refused _____ the contract without reading it first.', options: ['sign', 'signing', 'to sign', 'to signing'], correct: 2, explanation: 'Refuse is followed by a to-infinitive: “refused to sign.”' },
      { prompt: 'Identify the sentence that uses an infinitive as a direct object:', options: ['To forgive is divine.', 'They expect to arrive around noon.', 'Her plan is to study abroad.', 'He brought a notebook to take notes.'], correct: 1, explanation: '“To arrive around noon” is the direct object of “expect.”' }
    ];
    const infinitiveOptions = document.querySelectorAll('.infinitive-option');
    const infinitiveFeedback = document.querySelector('.infinitive-quiz-feedback');
    const infinitiveNext = document.querySelector('.infinitive-quiz-next');
    const infinitiveProgress = document.querySelector('.infinitive-quiz-progress b');
    const infinitivePrompt = document.querySelector('.infinitive-question-prompt');
    const infinitiveQuestion = document.querySelector('.infinitive-quiz-question');
    const infinitiveOptionsGroup = document.querySelector('.infinitive-quiz-options');
    const infinitiveSummary = document.querySelector('.infinitive-quiz-summary');
    const infinitiveScore = document.querySelector('.infinitive-score');
    const infinitiveAccuracy = document.querySelector('.infinitive-accuracy');
    const infinitiveRetry = document.querySelector('.infinitive-quiz-retry');
    let infinitiveIndex = 0;
    let infinitiveCorrect = 0;

    function renderInfinitiveQuestion() {
      const question = infinitiveQuestions[infinitiveIndex];
      if (infinitiveProgress) infinitiveProgress.textContent = String(infinitiveIndex + 1);
      if (infinitivePrompt) infinitivePrompt.textContent = question.prompt;
      infinitiveOptions.forEach((button, index) => {
        button.className = 'quiz-option infinitive-option';
        button.disabled = false;
        button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span> ${question.options[index]}`;
      });
      if (infinitiveFeedback) infinitiveFeedback.hidden = true;
      if (infinitiveNext) infinitiveNext.hidden = true;
      if (infinitiveSummary) infinitiveSummary.hidden = true;
    }

    infinitiveOptions.forEach((button, index) => {
      button.addEventListener('click', () => {
        const question = infinitiveQuestions[infinitiveIndex];
        const isCorrect = index === question.correct;
        if (isCorrect) infinitiveCorrect += 1;
        infinitiveOptions.forEach((option, optionIndex) => {
          option.disabled = true;
          option.classList.toggle('is-correct', optionIndex === question.correct);
          option.classList.toggle('is-wrong', optionIndex === index && !isCorrect);
        });
        if (infinitiveFeedback) {
          infinitiveFeedback.hidden = false;
          infinitiveFeedback.querySelector('strong').textContent = isCorrect ? 'Correct answer' : 'Not quite';
          infinitiveFeedback.querySelector('small').textContent = isCorrect
            ? question.explanation
            : `The answer is “${question.options[question.correct]}”. ${question.explanation}`;
        }
        if (infinitiveNext) {
          infinitiveNext.hidden = false;
          infinitiveNext.textContent = infinitiveIndex === infinitiveQuestions.length - 1 ? 'See results  →' : 'Next question  →';
        }
      });
    });

    if (infinitiveNext) infinitiveNext.addEventListener('click', () => {
      if (infinitiveIndex < infinitiveQuestions.length - 1) {
        infinitiveIndex += 1;
        renderInfinitiveQuestion();
        return;
      }
      if (infinitiveScore) infinitiveScore.textContent = `${infinitiveCorrect} / ${infinitiveQuestions.length}`;
      if (infinitiveAccuracy) infinitiveAccuracy.textContent = `${Math.round((infinitiveCorrect / infinitiveQuestions.length) * 100)}%`;
      if (infinitiveSummary) infinitiveSummary.hidden = false;
      infinitiveNext.hidden = true;
      infinitiveQuestion?.setAttribute('hidden', '');
      infinitiveOptionsGroup?.setAttribute('hidden', '');
      infinitiveFeedback?.setAttribute('hidden', '');
    });

    if (infinitiveRetry) infinitiveRetry.addEventListener('click', () => {
      infinitiveIndex = 0;
      infinitiveCorrect = 0;
      infinitiveQuestion?.removeAttribute('hidden');
      infinitiveOptionsGroup?.removeAttribute('hidden');
      renderInfinitiveQuestion();
    });
    renderInfinitiveQuestion();
    const vocabularyData = {
      life: [
        ['Baby', 'A very young child who cannot yet walk or talk.'],
        ['Toddler', 'A young child who is just learning to walk (ages 1–3).'],
        ['Child', 'A young human who is not yet an adult.'],
        ['Teenager', 'A person aged between 13 and 19 years old.'],
        ['Adolescent', 'A young person developing into an adult (puberty stage).'],
        ['(Young) Adult', 'A fully grown person in early adulthood (18–30s).'],
        ['Middle-aged person', 'A person roughly between the ages of 45 and 65.'],
        ['Old / Elderly person', 'A person who is advanced in age.'],
        ['Retired person', 'Someone who has stopped working permanently, usually due to age.']
      ],
      activities: [
        ['Learn to drive a car', 'To acquire the skills to operate a motor vehicle.'],
        ['Have your first kiss', 'The first romantic experience of kissing someone.'],
        ['Start wearing make-up', 'To begin applying cosmetics to your face.'],
        ['Graduate from university', 'To successfully complete a degree program.'],
        ['Get a job', 'To secure paid employment.'],
        ['Earn a good salary', 'To receive high pay for your work.'],
        ['Get a place of your own', 'To move into your own independent apartment or house.'],
        ['Get engaged', 'To formally agree to marry someone.'],
        ['Get married', 'To become legally united with someone in marriage.'],
        ['Have children', 'To become a parent.'],
        ['Look after your grandchildren', 'To care for the children of your own sons or daughters.'],
        ['Retire', 'To leave your job and cease working, typically upon reaching a certain age.']
      ],
      friendship: [
        ['Catch up', 'To talk with someone to learn what has happened in their life since you last met.'],
        ['Get on', 'To have a friendly and harmonious relationship with someone.'],
        ['Go out', 'To spend social time outside the home or go on romantic dates.'],
        ['Get in touch', 'To contact someone by phone, email, or message.'],
        ['Keep in touch', 'To maintain regular contact with someone over time.'],
        ['Lose touch', 'To gradually stop communicating with a friend.'],
        ['Fall out', 'To have a disagreement or argument that damages a friendship.'],
        ['Split up', 'To end a romantic relationship or marriage.']
      ],
      habits: [
        ['Be mentally active', 'Keeping your brain engaged with reading, learning, or puzzles.'],
        ['Do physical exercise', 'Engaging in movement like running or sports to stay fit.'],
        ['Eat healthily', 'Consuming nutritious foods like fruits and vegetables.'],
        ['Think positively', 'Maintaining an optimistic and hopeful mindset.'],
        ['Eat junk food', 'Frequently eating unhealthy, highly processed fast food.'],
        ['Worry about things', 'Spending time feeling anxious or troubled about problems.']
      ]
    };
    const vocabularyGrid = document.querySelector('#vocabularyGrid');
    const vocabularySection = document.querySelector('#vocabulary');
    const definitionToggle = document.querySelector('#definitionToggle');
    const vocabularyLabels = {
      life: 'Times of Life',
      activities: 'Life Activities',
      friendship: 'Friendship',
      habits: 'Good & Bad Habits'
    };

    function renderVocabulary(category) {
      if (!vocabularyGrid) return;
      vocabularyGrid.innerHTML = vocabularyData[category].map(([term, definition], index) => `
        <article class="vocabulary-card" tabindex="0">
          <span class="vocabulary-term">${term}</span>
          <p class="vocabulary-definition">${definition}</p>
          <button class="vocabulary-audio" type="button" aria-label="Listen to pronunciation of ${term}" data-pronounce="${term}">
            <svg class="vocab-audio-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5ZM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>
          </button>
        </article>`).join('');
      vocabularyGrid.setAttribute('aria-label', `${vocabularyLabels[category]} vocabulary`);
      vocabularyGrid.querySelectorAll('.vocabulary-audio').forEach((button) => {
        button.addEventListener('click', () => {
          if (!('speechSynthesis' in window)) return;
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(button.dataset.pronounce);
          utterance.lang = 'en-US';
          utterance.rate = .86;
          window.speechSynthesis.speak(utterance);
        });
      });
    }

    document.querySelectorAll('.vocabulary-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.vocabulary-tab').forEach((item) => {
          const active = item === tab;
          item.classList.toggle('active', active);
          item.setAttribute('aria-selected', String(active));
        });
        renderVocabulary(tab.dataset.vocabularyCategory);
      });
    });
    if (definitionToggle && vocabularySection) definitionToggle.addEventListener('click', () => {
      const visible = vocabularySection.classList.toggle('definitions-visible');
      definitionToggle.setAttribute('aria-pressed', String(visible));
      definitionToggle.textContent = visible ? 'Definitions: On' : 'Definitions: Hover';
    });
    renderVocabulary('life');
    const signinForm = document.querySelector('#signinForm');
    const signinEmail = document.querySelector('#signinEmail');
    const signinPassword = document.querySelector('#signinPassword');
    const signinEmailError = document.querySelector('#signinEmailError');
    const signinPasswordError = document.querySelector('#signinPasswordError');
    const signinMessage = document.querySelector('#signinMessage');
    const rememberMe = document.querySelector('#rememberMe');
    const rememberedEmailKey = 'leafLanternEmail';

    function setFieldError(input, errorEl, message) {
      if (!input || !errorEl) return;
      const field = input.closest('.field');
      if (message) {
        field?.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = message;
      } else {
        field?.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        errorEl.textContent = '';
      }
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateSigninEmail() {
      const value = signinEmail?.value.trim() || '';
      if (!value) {
        setFieldError(signinEmail, signinEmailError, 'Please enter your email address.');
        return false;
      }
      if (!isValidEmail(value)) {
        setFieldError(signinEmail, signinEmailError, 'Please enter a valid email address.');
        return false;
      }
      setFieldError(signinEmail, signinEmailError, '');
      return true;
    }

    function validateSigninPassword() {
      const value = signinPassword?.value || '';
      if (!value) {
        setFieldError(signinPassword, signinPasswordError, 'Please enter your password.');
        return false;
      }
      if (value.length < 8) {
        setFieldError(signinPassword, signinPasswordError, 'Password must be at least 8 characters.');
        return false;
      }
      setFieldError(signinPassword, signinPasswordError, '');
      return true;
    }

    if (signinEmail && localStorage.getItem(rememberedEmailKey)) {
      signinEmail.value = localStorage.getItem(rememberedEmailKey);
      if (rememberMe) rememberMe.checked = true;
    }

    if (signinEmail) {
      signinEmail.addEventListener('blur', validateSigninEmail);
      signinEmail.addEventListener('input', () => {
        if (signinEmailError?.textContent) validateSigninEmail();
        if (signinMessage) {
          signinMessage.textContent = '';
          signinMessage.classList.remove('is-error');
        }
      });
    }
    if (signinPassword) {
      signinPassword.addEventListener('blur', validateSigninPassword);
      signinPassword.addEventListener('input', () => {
        if (signinPasswordError?.textContent) validateSigninPassword();
      });
    }

    const passwordToggle = document.querySelector('#toggleSigninPassword');
    if (passwordToggle && signinPassword) {
      passwordToggle.addEventListener('click', () => {
        const show = signinPassword.type === 'password';
        signinPassword.type = show ? 'text' : 'password';
        passwordToggle.setAttribute('aria-pressed', String(show));
        passwordToggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
        const eye = passwordToggle.querySelector('.icon-eye');
        const eyeOff = passwordToggle.querySelector('.icon-eye-off');
        if (eye) eye.hidden = show;
        if (eyeOff) eyeOff.hidden = !show;
      });
    }

    document.querySelectorAll('#signin [data-sso]').forEach((button) => {
      button.addEventListener('click', () => {
        if (!signinMessage) return;
        const provider = button.dataset.sso === 'apple' ? 'Apple' : 'Google';
        signinMessage.classList.remove('is-error');
        signinMessage.textContent = `${provider} sign-in is not connected in this demo. Use email to continue.`;
      });
    });

    const forgotPassword = document.querySelector('#forgotPassword');
    if (forgotPassword && signinMessage) {
      forgotPassword.addEventListener('click', (event) => {
        event.preventDefault();
        const email = signinEmail?.value.trim() || '';
        signinMessage.classList.remove('is-error');
        signinMessage.textContent = isValidEmail(email)
          ? `If an account exists for ${email}, a reset link will be sent.`
          : 'Enter your email address above to receive a password reset link.';
      });
    }

    if (signinForm) signinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailOk = validateSigninEmail();
      const passwordOk = validateSigninPassword();
      if (!emailOk || !passwordOk) {
        if (signinMessage) {
          signinMessage.classList.add('is-error');
          signinMessage.textContent = 'Please fix the highlighted fields to continue.';
        }
        (!emailOk ? signinEmail : signinPassword)?.focus();
        return;
      }
      const email = signinEmail.value.trim();
      const keepEmail = Boolean(rememberMe?.checked);
      if (keepEmail) localStorage.setItem(rememberedEmailKey, email);
      else localStorage.removeItem(rememberedEmailKey);
      if (signinMessage) {
        signinMessage.classList.remove('is-error');
        signinMessage.textContent = 'You are signed in. Welcome back to the library!';
      }
      signinForm.reset();
      setFieldError(signinEmail, signinEmailError, '');
      setFieldError(signinPassword, signinPasswordError, '');
      if (keepEmail && signinEmail && rememberMe) {
        signinEmail.value = email;
        rememberMe.checked = true;
      }
      if (passwordToggle && signinPassword) {
        signinPassword.type = 'password';
        passwordToggle.setAttribute('aria-pressed', 'false');
        passwordToggle.setAttribute('aria-label', 'Show password');
        const eye = passwordToggle.querySelector('.icon-eye');
        const eyeOff = passwordToggle.querySelector('.icon-eye-off');
        if (eye) eye.hidden = false;
        if (eyeOff) eyeOff.hidden = true;
      }
    });
    const signupForm = document.querySelector('#signupForm');
    if (signupForm) signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (event.currentTarget.checkValidity()) { const name = document.querySelector('#firstName').value.trim(); document.querySelector('#signupMessage').textContent = `Welcome, ${name}! Your library account is ready.`; event.currentTarget.reset(); }
    });
    const year = document.querySelector('#year');
    if (year) year.textContent = new Date().getFullYear();

    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');
    if (menuButton && navLinks) {
      menuButton.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      });
      navLinks.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          navLinks.classList.remove('open');
          menuButton.setAttribute('aria-expanded', 'false');
          menuButton.setAttribute('aria-label', 'Open navigation');
        }
      });
    }

    document.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
        document.querySelectorAll('.book-card').forEach((book) => {
          book.hidden = filter !== 'all' && book.dataset.genre !== filter;
        });
      });
    });

    const readingText = document.querySelector('.reading-text');
    document.querySelectorAll('[data-font-size]').forEach((button) => {
      button.addEventListener('click', () => {
        readingText.style.fontSize = `${button.dataset.fontSize}px`;
      });
    });
    const themeButton = document.querySelector('#themeButton');
    if (themeButton && readingText) themeButton.addEventListener('click', () => {
      readingText.classList.toggle('night-reading');
      themeButton.textContent = readingText.classList.contains('night-reading') ? 'Light mode' : 'Night mode';
    });

    const orderForm = document.querySelector('#orderForm');
    const orderMessage = document.querySelector('#orderMessage');
    if (orderForm && orderMessage) orderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!orderForm.checkValidity()) return;
      const title = document.querySelector('#bookTitle').value;
      orderMessage.textContent = `Your request for “${title}” is confirmed. We will email you when it is ready.`;
      orderForm.reset();
    });
