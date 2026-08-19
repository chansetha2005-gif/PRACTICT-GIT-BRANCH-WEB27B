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

    const researchResults = document.querySelector('#researchResults');
    const advancedFilterTrigger = document.querySelector('#advancedFilterTrigger');
    const advancedFilters = document.querySelector('#advancedFilters');
    const researchLessons = [
      { title: 'Mastering Gerunds', description: 'Grammar rules, examples, and a practice quiz.', level: 'A2–B1', time: '5 min read', tags: 'grammar vocabulary', href: '#gerunds' },
      { title: 'The First Conditional', description: 'Explore real future possibilities with if-clauses.', level: 'B1', time: '6 min read', tags: 'grammar', href: '#firstConditional' },
      { title: 'IELTS Speaking Warm-Up', description: 'Build confidence with guided speaking drills.', level: 'B1–B2', time: '8 min read', tags: 'ielts conversation', href: '#practice-paragraphs' },
      { title: 'Business English Essentials', description: 'Learn practical language for meetings and interviews.', level: 'B2–C1', time: '10 min read', tags: 'business vocabulary', href: '#speaking-clubs' },
      { title: 'Essential Life Vocabulary', description: 'Build vocabulary for habits, relationships, and daily life.', level: 'A1–B1', time: '5 min read', tags: 'vocabulary everyday', href: '#vocabulary' },
      { title: 'Graded Reader: The Last Light', description: 'Read a reflective story with grammar in context.', level: 'B1–B2', time: '18 min read', tags: 'graded readers reading', href: 'read.html' }
    ];
    let activeResearchFilter = 'all';
    function renderResearchResults() {
      if (!researchResults) return;
      const query = (searchInput?.value || '').trim().toLowerCase();
      const matches = researchLessons.filter((lesson) => {
        const queryMatch = !query || `${lesson.title} ${lesson.description} ${lesson.level} ${lesson.tags}`.toLowerCase().includes(query);
        const filterMatch = activeResearchFilter === 'all' || lesson.tags.includes(activeResearchFilter);
        return queryMatch && filterMatch;
      });
      researchResults.hidden = false;
      researchResults.innerHTML = matches.length ? matches.map((lesson) => `<article class="research-result-card"><h3>${lesson.title}</h3><div class="research-result-meta"><span>${lesson.level}</span><span>${lesson.time}</span></div><p>${lesson.description}</p><a href="${lesson.href}">Start Lesson →</a></article>`).join('') : '<p class="research-empty">No exact matches found. Try searching for broader terms like \'Grammar\', \'IELTS\', or \'Vocab\'.</p>';
    }
    if (searchForm && searchInput && searchMessage) searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      searchMessage.textContent = 'Research results updated.';
      renderResearchResults();
    });
    searchInput?.addEventListener('input', renderResearchResults);
    advancedFilterTrigger?.addEventListener('click', () => {
      const open = advancedFilters.hidden;
      advancedFilters.hidden = !open;
      advancedFilterTrigger.classList.toggle('is-open', open);
      advancedFilterTrigger.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.filter-chip').forEach((chip) => chip.addEventListener('click', () => {
      activeResearchFilter = chip.dataset.researchFilter;
      document.querySelectorAll('.filter-chip').forEach((item) => item.classList.toggle('active', item === chip));
      renderResearchResults();
    }));
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
    const quantifierQuestions = [
      { prompt: 'There is _____ water in the glass.', options: ['many', 'some', 'a few', 'any'], correct: 1 },
      { prompt: 'Do you have _____ milk?', options: ['any', 'much', 'a few', 'many'], correct: 0 },
      { prompt: 'There are _____ cars on this street.', options: ['much', 'a little', 'many', 'any'], correct: 2 },
      { prompt: 'We do not have _____ time before class.', options: ['many', 'much', 'a few', 'some'], correct: 1 },
      { prompt: 'I made _____ friends at the new school.', options: ['a little', 'much', 'a few', 'any'], correct: 2 },
      { prompt: 'Could I have _____ money for the bus?', options: ['a little', 'many', 'a few', 'any'], correct: 0 },
      { prompt: 'She bought _____ apples for the picnic.', options: ['much', 'some', 'a little', 'any'], correct: 1 },
      { prompt: 'There are not _____ books on the shelf.', options: ['much', 'a little', 'any', 'some'], correct: 2 },
      { prompt: 'How _____ people joined the club?', options: ['much', 'many', 'a little', 'any'], correct: 1 },
      { prompt: 'He has _____ patience left today.', options: ['many', 'a few', 'a little', 'any'], correct: 2 }
    ];
    const conditionalQuestions = [
      { prompt: 'If it rains tomorrow, we _____ at home.', options: ['stay', 'will stay', 'stayed', 'would stay'], correct: 1 },
      { prompt: 'If you study hard, you _____ the exam.', options: ['pass', 'passed', 'will pass', 'would pass'], correct: 2 },
      { prompt: 'If she _____ early, she will catch the bus.', options: ['leaves', 'will leave', 'left', 'leaving'], correct: 0 },
      { prompt: 'We will call you if we _____ any news.', options: ['will have', 'had', 'have', 'having'], correct: 2 },
      { prompt: 'If I finish my work, I _____ you.', options: ['help', 'will help', 'helped', 'would help'], correct: 1 },
      { prompt: 'If they practice, they _____ more confident.', options: ['feel', 'felt', 'will feel', 'would feel'], correct: 2 },
      { prompt: 'He will be late if he _____ now.', options: ['does not leave', 'will not leave', 'did not leave', 'not leave'], correct: 0 },
      { prompt: 'If we save money, we _____ a new computer.', options: ['buy', 'bought', 'will buy', 'would buy'], correct: 2 },
      { prompt: 'If you need help, I _____ you.', options: ['will support', 'supported', 'supporting', 'would supported'], correct: 0 },
      { prompt: 'The plants will grow if you _____ them regularly.', options: ['will water', 'water', 'watered', 'watering'], correct: 1 }
    ];

    function setupMiniQuiz(config) {
      const options = document.querySelector(`#${config.optionsId}`);
      const prompt = document.querySelector(`#${config.promptId}`);
      const feedback = document.querySelector(`#${config.feedbackId}`);
      const progress = document.querySelector(`#${config.progressId} b`);
      if (!options || !prompt || !feedback || !progress) return;
      let index = 0;
      let locked = false;
      function render() {
        const item = config.questions[index];
        progress.textContent = String(index + 1);
        prompt.textContent = item.prompt;
        options.innerHTML = item.options.map((option, optionIndex) => `<button class="mini-quiz-option" type="button" data-option-index="${optionIndex}">${String.fromCharCode(65 + optionIndex)}. ${option}</button>`).join('');
        feedback.textContent = '';
        locked = false;
        options.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => {
          if (locked) return;
          locked = true;
          const selected = Number(button.dataset.optionIndex);
          options.querySelectorAll('button').forEach((itemButton, itemIndex) => {
            itemButton.disabled = true;
            if (itemIndex === item.correct) itemButton.classList.add('correct');
            if (itemIndex === selected && selected !== item.correct) itemButton.classList.add('wrong');
          });
          feedback.textContent = selected === item.correct ? 'Correct! Great grammar choice.' : `Not quite. The answer is “${item.options[item.correct]}”.`;
          window.setTimeout(() => {
            index = (index + 1) % config.questions.length;
            render();
          }, 700);
        }));
      }
        const geographyQuizQuestions = [
          { prompt: 'What is a piece of land surrounded entirely by water?', options: ['Peninsula', 'Island', 'Cliff', 'Bay'], correct: 1, explanation: 'An island is surrounded entirely by water.' },
          { prompt: 'Which word best describes a quiet, charming, and peaceful place?', options: ['Crowded', 'Idyllic', 'Noisy', 'Industrial'], correct: 1, explanation: 'Idyllic means peaceful, picturesque, or charming.' },
          { prompt: 'A steep high face of rock and soil near the ocean is called a _____.', options: ['Cliff', 'Lake', 'River', 'Forest'], correct: 0, explanation: 'A cliff is a steep high face of rock and soil.' },
          { prompt: 'What is the antonym of “Crowded”?', options: ['Peaceful / Empty', 'Busy', 'Noisy', 'Commercial'], correct: 0, explanation: 'Peaceful or empty describes a place with plenty of space.' },
          { prompt: 'A piece of land that is almost completely surrounded by water is a _____.', options: ['Peninsula', 'Island', 'Sea', 'Mountain'], correct: 0, explanation: 'A peninsula is almost surrounded by water.' },
          { prompt: 'Which term describes nature or scenery that has not been ruined by human development?', options: ['Unspoilt', 'Commercial', 'Polluted', 'Urban'], correct: 0, explanation: 'Unspoilt means not altered or ruined by human activity.' },
          { prompt: 'Where would you go to see a large natural elevation of earth rising abruptly?', options: ['Mountain', 'Bay', 'River', 'Beach'], correct: 0, explanation: 'A mountain is a large natural elevation of the earth.' },
          { prompt: 'The beach was so _____ that we could not find a spot to sit.', options: ['Crowded', 'Unspoilt', 'Idyllic', 'Relaxing'], correct: 0, explanation: 'Crowded means full of people with little room.' },
          { prompt: 'What is a broad inlet of the sea where the land curves inward?', options: ['Bay', 'Island', 'Cliff', 'Forest'], correct: 0, explanation: 'A bay is a broad inlet where land curves inward.' },
          { prompt: 'Which word best describes a place that makes you feel calm and free from stress?', options: ['Relaxing', 'Noisy', 'Wild', 'Industrial'], correct: 0, explanation: 'Relaxing describes something that frees you from anxiety.' }
        ];
        const urbanQuizQuestions = [
          { prompt: 'Where do you go to board an underground city train?', options: ['Tube station', 'Bus stop', "Doctor's surgery", 'Art gallery'], correct: 0, explanation: 'A tube station is a boarding stop for an underground train.' },
          { prompt: 'A city zone dominated by shopping centers, banks, and office buildings is a _____.', options: ['Commercial area', 'Residential area', 'Forest', 'Bay'], correct: 0, explanation: 'A commercial area is dominated by businesses and offices.' },
          { prompt: 'Where would you go to view art exhibits and paintings?', options: ['Art gallery', 'Sports stadium', 'Bus station', 'Industrial area'], correct: 0, explanation: 'An art gallery displays works of art.' },
          { prompt: 'An area set aside primarily for housing and private homes is called a _____.', options: ['Residential area', 'Commercial area', 'Industrial area', 'Leisure centre'], correct: 0, explanation: 'A residential area is primarily used for homes.' },
          { prompt: 'Where do you go for physical workouts, swimming, or indoor sports?', options: ['Leisure centre', 'Library', 'Nightclub', 'Bookshop'], correct: 0, explanation: 'A leisure centre provides exercise and indoor sports facilities.' },
          { prompt: 'Factories and manufacturing warehouses are located in an _____.', options: ['Industrial area', 'Idyllic cliff', 'Residential area', 'Art gallery'], correct: 0, explanation: 'An industrial area is set aside for factories and warehouses.' },
          { prompt: 'Where would you go to borrow books or study quietly?', options: ['Library', 'Nightclub', 'College', "Doctor's surgery"], correct: 0, explanation: 'A library is a place to borrow books or study.' },
          { prompt: 'A place where medical doctors treat patients is called a _____.', options: ["Doctor's surgery / Clinic", 'Commercial area', 'Theatre', 'Bus station'], correct: 0, explanation: "A doctor's surgery or clinic provides medical care." },
          { prompt: 'Where do you go to watch live drama performances and plays?', options: ['Theatre', 'Cinema', 'Stadium', 'Bar'], correct: 0, explanation: 'A theatre hosts live drama performances.' },
          { prompt: 'Which venue is best for attending large sports games and concerts?', options: ['Sports stadium', 'Bookshop', 'Bus stop', 'Café'], correct: 0, explanation: 'A sports stadium hosts large games and events.' }
        ];

        function setupGeographyQuiz(config) {
          const options = document.querySelector(`#${config.optionsId}`);
          const prompt = document.querySelector(`#${config.promptId}`);
          const feedback = document.querySelector(`#${config.feedbackId}`);
          const progress = document.querySelector(`#${config.progressId}`);
          const summary = document.querySelector(`#${config.summaryId}`);
          if (!options || !prompt || !feedback || !progress || !summary) return;
          let index = 0;
          let score = 0;
          let locked = false;
          function render() {
            const item = config.questions[index];
            progress.textContent = `Question ${index + 1} of ${config.questions.length}`;
            prompt.textContent = item.prompt;
            feedback.textContent = '';
            summary.hidden = true;
            locked = false;
            options.innerHTML = item.options.map((option, optionIndex) => `<button class="geography-quiz-option" type="button" data-option-index="${optionIndex}">${String.fromCharCode(65 + optionIndex)}) ${option}</button>`).join('');
            options.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => {
              if (locked) return;
              locked = true;
              const selected = Number(button.dataset.optionIndex);
              options.querySelectorAll('button').forEach((option, optionIndex) => {
                option.disabled = true;
                if (optionIndex === item.correct) option.classList.add('correct');
                if (optionIndex === selected && selected !== item.correct) option.classList.add('wrong');
              });
              if (selected === item.correct) score += 1;
              feedback.textContent = selected === item.correct ? `Correct! ${item.explanation}` : `Not quite. ${item.explanation}`;
              window.setTimeout(() => {
                if (index === config.questions.length - 1) {
                  summary.hidden = false;
                  summary.innerHTML = `${config.title} complete: ${score} / ${config.questions.length} correct. <button class="geography-quiz-retry" type="button">Retry Quiz</button>`;
                  summary.querySelector('.geography-quiz-retry')?.addEventListener('click', () => {
                    index = 0;
                    score = 0;
                    render();
                  });
                  return;
                }
                index += 1;
                render();
              }, 700);
            }));
          }
          render();
        }
        setupGeographyQuiz({ title: 'Geography & Places Quiz', questions: geographyQuizQuestions, optionsId: 'geographyQuizOptions', promptId: 'geographyQuizPrompt', feedbackId: 'geographyQuizFeedback', progressId: 'geographyQuizProgress', summaryId: 'geographyQuizSummary' });
        setupGeographyQuiz({ title: 'Urban Environment Quiz', questions: urbanQuizQuestions, optionsId: 'urbanQuizOptions', promptId: 'urbanQuizPrompt', feedbackId: 'urbanQuizFeedback', progressId: 'urbanQuizProgress', summaryId: 'urbanQuizSummary' });
      render();
    }
    setupMiniQuiz({ questions: quantifierQuestions, optionsId: 'quantifierOptions', promptId: 'quantifierPrompt', feedbackId: 'quantifierFeedback', progressId: 'quantifierProgress' });
    setupMiniQuiz({ questions: conditionalQuestions, optionsId: 'conditionalOptions', promptId: 'conditionalPrompt', feedbackId: 'conditionalFeedback', progressId: 'conditionalProgress' });
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
    const geographyData = {
      features: [
        ['Bay', 'A broad inlet of the sea where the land curves inward.', 'ឈូងសមុទ្រ'],
        ['Beach', 'A pebbly or sandy shore at the edge of the sea or a lake.', 'ឆ្នេរ'],
        ['Cliff', 'A steep high face of rock and soil, often by the coast.', 'ច្រាំងថ្មចោទ'],
        ['Coast', 'The land along or near a sea or ocean.', 'ឆ្នេរសមុទ្រ'],
        ['Forest', 'A large area covered chiefly with trees and undergrowth.', 'ព្រៃឈើ'],
        ['Island', 'A piece of land surrounded entirely by water.', 'កោះ'],
        ['Lake', 'A large body of water surrounded by land.', 'បឹង'],
        ['Mountain', "A large natural elevation of the earth's surface rising abruptly.", 'ភ្នំ'],
        ['Peninsula', 'A piece of land almost surrounded by water or projecting into a body of water.', 'ឧបទ្វីប'],
        ['River', 'A large natural stream of water flowing in a channel to the sea or a lake.', 'ទន្លេ'],
        ['Sea', "The expanse of salt water that covers most of the earth's surface.", 'សមុទ្រ']
      ],
      descriptions: [
        ['Beautiful', 'Pleasing to the senses or mind aesthetically.', 'ស្រស់ស្អាត'],
        ['Crowded', 'Full of people, leaving little or no room for movement.', 'កកកុញ'],
        ['Exciting', 'Causing great enthusiasm and eagerness.', 'គួរឱ្យរំភើប'],
        ['Idyllic', 'Extremely peaceful, picturesque, or charming.', 'ស្ងប់ស្ងាត់ និងស្រស់ស្អាត'],
        ['Impressive', 'Evoking admiration through size, quality, or skill.', 'គួរឱ្យចាប់អារម្មណ៍'],
        ['Noisy', 'Making or given to making a lot of loud or unpleasant noise.', 'មានសំឡេងរំខាន'],
        ['Peaceful', 'Free from disturbance; calm and quiet.', 'ស្ងប់ស្ងាត់'],
        ['Pleasant', 'Giving a sense of happy satisfaction or enjoyment.', 'រីករាយ'],
        ['Relaxing', 'Helping you to rest and feel free from anxiety.', 'ជួយសម្រាក'],
        ['Romantic', 'Conducive to or characterized by expressions of love.', 'រ៉ូមែនទិក'],
        ['Unspoilt', 'Building or scenery that has not been altered or ruined by human activity.', 'មិនទាន់ខូចខាត'],
        ['Wild', 'Living or growing in the natural environment; untamed.', 'ព្រៃផ្សៃ']
      ],
      urban: [
        ['Art gallery', 'A room or building for the display or sale of works of art.', 'វិចិត្រសាល'],
        ['Bar / Bookshop / Café', 'Public social venues for drinks, books, or light meals.', 'បារ / ហាងសៀវភៅ / ហាងកាហ្វេ'],
        ['Bus station / Bus stop / Train station / Tube station', 'Key public transportation hubs and boarding stops.', 'ស្ថានីយឡានក្រុង / ចំណតឡានក្រុង / ស្ថានីយរថភ្លើង / ស្ថានីយរថភ្លើងក្រោមដី'],
        ['Cinema / Theatre / Museum', 'Places for entertainment, performing arts, and historical exhibits.', 'រោងកុន / រោងមហោស្រព / សារមន្ទីរ'],
        ['College / School', 'Educational institutions for secondary and higher learning.', 'មហាវិទ្យាល័យ / សាលារៀន'],
        ['Commercial area', 'A city region dominated by shops, corporate offices, and businesses.', 'តំបន់ពាណិជ្ជកម្ម'],
        ['Residential area', 'An area predominantly used for housing and private homes.', 'តំបន់លំនៅដ្ឋាន'],
        ['Industrial area', 'A zone set aside for factories, manufacturing, and warehouses.', 'តំបន់ឧស្សាហកម្ម'],
        ["Doctor's surgery / Hospital", 'Facilities providing medical care and health treatments.', 'គ្លីនិកវេជ្ជបណ្ឌិត / មន្ទីរពេទ្យ'],
        ['Leisure centre / Sports stadium', 'Buildings for physical exercise, sports events, and fitness.', 'មជ្ឈមណ្ឌលកម្សាន្ត / កីឡដ្ឋាន'],
        ['Library / Nightclub', 'Venues for quiet study or late-night social entertainment.', 'បណ្ណាល័យ / ក្លឹបរាត្រី']
      ]
    };
    const geographyGrid = document.querySelector('#geographyGrid');
    const geographySection = document.querySelector('#geography');
    const geographyTranslationToggle = document.querySelector('#geographyTranslationToggle');
    const geographyLabels = { features: 'Geographical Features', descriptions: 'Describing Places', urban: 'Urban Environment' };

    function renderGeography(category) {
      if (!geographyGrid) return;
      geographyGrid.innerHTML = geographyData[category].map(([term, definition, khmer]) => `
        <article class="geography-card" tabindex="0">
          <span class="geography-term">${term}</span>
          <p class="geography-definition">${definition}</p>
          <p class="geography-khmer">Khmer: ${khmer}</p>
          <button class="geography-audio" type="button" aria-label="Listen to pronunciation of ${term}" data-pronounce="${term}"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5ZM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg></button>
        </article>`).join('');
      geographyGrid.setAttribute('aria-label', `${geographyLabels[category]} vocabulary`);
      geographyGrid.querySelectorAll('.geography-audio').forEach((button) => {
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

    document.querySelectorAll('.geography-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.geography-tab').forEach((item) => {
          const active = item === tab;
          item.classList.toggle('active', active);
          item.setAttribute('aria-selected', String(active));
        });
        const category = tab.dataset.geographyCategory;
        renderGeography(category);
        document.querySelector('#geographyQuizPanel')?.classList.toggle('is-inactive', category === 'urban');
        document.querySelector('#urbanQuizPanel')?.classList.toggle('is-inactive', category !== 'urban');
      });
    });
    document.querySelector('.geography-tab.active')?.click();
    geographyTranslationToggle?.addEventListener('click', () => {
      const visible = geographySection.classList.toggle('khmer-visible');
      geographyTranslationToggle.classList.toggle('is-on', visible);
      geographyTranslationToggle.setAttribute('aria-pressed', String(visible));
      geographyTranslationToggle.textContent = visible ? 'Khmer: On' : 'Khmer: Off';
    });
    renderGeography('features');
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
    const flashcards = [
      { word: 'Adolescent', definition: 'A young person developing into an adult, usually during puberty.', example: '“The adolescent years are a time of rapid change.”', khmer: 'វ័យជំទង់' },
      { word: 'Itinerary', definition: 'A planned route or schedule for a journey.', example: '“Our itinerary includes three days in Siem Reap.”', khmer: 'កាលវិភាគដំណើរ' },
      { word: 'Hospitality', definition: 'Friendly and generous treatment of guests or visitors.', example: '“The family showed wonderful hospitality.”', khmer: 'បដិសណ្ឋារកិច្ច' }
    ];
    const flashcardScene = document.querySelector('#flashcardScene');
    const flashcardWord = document.querySelector('#flashcardWord');
    const flashcardBackWord = document.querySelector('#flashcardBackWord');
    const flashcardDefinition = document.querySelector('#flashcardDefinition');
    const flashcardExample = document.querySelector('#flashcardExample');
    const flashcardKhmer = document.querySelector('#flashcardKhmer');
    const flashcardAudio = document.querySelector('#flashcardAudio');
    const cardsReviewed = document.querySelector('#cardsReviewed');
    const flashcardStatus = document.querySelector('#flashcardStatus');
    let flashcardIndex = 0;
    let reviewedCount = 12;

    function renderFlashcard() {
      const card = flashcards[flashcardIndex];
      if (flashcardWord) flashcardWord.textContent = card.word;
      if (flashcardBackWord) flashcardBackWord.textContent = card.word;
      if (flashcardDefinition) flashcardDefinition.textContent = card.definition;
      if (flashcardExample) flashcardExample.textContent = card.example;
      if (flashcardKhmer) flashcardKhmer.textContent = `Khmer: ${card.khmer}`;
      if (flashcardAudio) flashcardAudio.setAttribute('aria-label', `Listen to ${card.word}`);
      flashcardScene?.classList.remove('is-flipped');
      flashcardScene?.setAttribute('aria-pressed', 'false');
    }

    function flipFlashcard() {
      if (!flashcardScene) return;
      const flipped = flashcardScene.classList.toggle('is-flipped');
      flashcardScene.setAttribute('aria-pressed', String(flipped));
    }

    flashcardScene?.addEventListener('click', (event) => {
      if (!event.target.closest('button')) flipFlashcard();
    });
    flashcardScene?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        flipFlashcard();
      }
    });
    flashcardAudio?.addEventListener('click', (event) => {
      event.stopPropagation();
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(flashcards[flashcardIndex].word);
      utterance.lang = 'en-US';
      utterance.rate = .86;
      window.speechSynthesis.speak(utterance);
    });
    document.querySelectorAll('.confidence-button').forEach((button) => {
      button.addEventListener('click', () => {
        reviewedCount = Math.min(30, reviewedCount + 1);
        if (cardsReviewed) cardsReviewed.textContent = `${reviewedCount}/30`;
        document.querySelectorAll('.confidence-button').forEach((item) => item.classList.toggle('is-selected', item === button));
        if (flashcardStatus) flashcardStatus.textContent = `${flashcards[flashcardIndex].word} marked ${button.dataset.confidence}. Next review scheduled ${button.querySelector('small')?.textContent || ''}.`;
        flashcardIndex = (flashcardIndex + 1) % flashcards.length;
        window.setTimeout(() => {
          document.querySelectorAll('.confidence-button').forEach((item) => item.classList.remove('is-selected'));
          renderFlashcard();
        }, 500);
      });
    });
    renderFlashcard();
    const clubCards = document.querySelectorAll('.club-card');
    document.querySelectorAll('.club-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.clubFilter;
        document.querySelectorAll('.club-tab').forEach((item) => {
          const active = item === tab;
          item.classList.toggle('active', active);
          item.setAttribute('aria-selected', String(active));
        });
        clubCards.forEach((card) => {
          card.hidden = filter !== 'all' && card.dataset.clubLevel !== filter;
        });
      });
    });
    document.querySelectorAll('.reserve-seat').forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.add('is-reserved');
        button.textContent = `Seat reserved · ${button.dataset.clubName}`;
        button.disabled = true;
      });
    });
    const micButton = document.querySelector('#micButton');
    const warmupStatus = document.querySelector('#warmupStatus');
    if (micButton) micButton.addEventListener('click', async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        if (warmupStatus) warmupStatus.textContent = 'Mic testing needs a secure browser connection.';
        return;
      }
      micButton.classList.add('is-recording');
      micButton.disabled = true;
      if (warmupStatus) warmupStatus.textContent = 'Requesting microphone...';
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
        if (warmupStatus) warmupStatus.textContent = 'Mic ready. Introduce yourself!';
      } catch {
        if (warmupStatus) warmupStatus.textContent = 'Microphone access was not granted.';
      } finally {
        micButton.classList.remove('is-recording');
        micButton.disabled = false;
      }
    });
    const drillData = {
      beginner: {
        label: 'A1–A2',
        title: 'My Daily Routine',
        text: 'Every morning, I like to start my day with a warm cup of coffee and a short walk outside. Taking time for myself in the morning helps me feel energized and ready for work. In the evening, I enjoy cooking simple meals and reading stories to improve my English vocabulary. I believe that building small, healthy habits every day is the secret to staying happy and balanced.'
      },
      intermediate: {
        label: 'B1–B2',
        title: 'Travel & Culture Shock',
        text: 'Traveling to a foreign country is one of the most rewarding ways to step out of your comfort zone. While experiencing a new culture can sometimes cause initial culture shock, it ultimately broadens your perspective on life. Communicating with locals, tasting traditional dishes, and navigating unfamiliar streets helps you build confidence and adaptability that stay with you forever.'
      },
      advanced: {
        label: 'B2–C1',
        title: 'The Future of Career & AI',
        text: 'As technology rapidly evolves, professionals must continuously refine their skills to remain competitive in the global job market. Cultivating strong communication abilities, critical thinking, and emotional intelligence is far more valuable than simply possessing technical expertise. Embracing lifelong learning allows individuals to navigate workplace shifts smoothly and leverage emerging opportunities effectively.'
      }
    };
    const homeBody = document.body;
    const grammarQuizMap = { gerunds: '#quiz', infinitives: '#infinitiveQuiz', quantifiers: '#quantifiersQuiz', firstConditional: '#conditionalQuiz' };
    document.querySelector('#firstConditional')?.classList.add('module-panel', 'grammar-panel');
    document.querySelectorAll('.module-tab[data-module-group="grammar"]').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.moduleTarget;
        document.querySelectorAll('.module-tab[data-module-group="grammar"]').forEach((item) => { const active = item === tab; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); });
        document.querySelectorAll('.grammar-panel').forEach((panel) => panel.classList.toggle('is-inactive', panel.id !== target));
        Object.entries(grammarQuizMap).forEach(([module, selector]) => document.querySelector(selector)?.classList.toggle('is-inactive', module !== target));
      });
    });
    document.querySelectorAll('.module-tab[data-module-group="vocabulary"]').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.moduleTarget;
        document.querySelectorAll('.module-tab[data-module-group="vocabulary"]').forEach((item) => { const active = item === tab; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); });
        document.querySelector('#vocabulary')?.classList.toggle('is-inactive', target !== 'vocabulary');
        document.querySelector('#places-vocab')?.classList.toggle('is-inactive', target === 'vocabulary');
        if (target === 'urban') document.querySelector('.geography-tab[data-geography-category="urban"]')?.click();
        if (target === 'geography') document.querySelector('.geography-tab[data-geography-category="features"]')?.click();
      });
    });
    document.querySelectorAll('[data-learning-mode]').forEach((button) => button.addEventListener('click', () => {
      const mode = button.dataset.learningMode;
      document.querySelectorAll('[data-learning-mode]').forEach((item) => item.classList.toggle('active', item === button));
      homeBody.classList.toggle('reading-mode', mode === 'reading');
      homeBody.classList.toggle('practice-mode', mode === 'practice');
    }));
    const siteKhmerToggle = document.querySelector('#siteKhmerToggle');
    siteKhmerToggle?.addEventListener('click', () => {
      const hidden = homeBody.classList.toggle('khmer-hidden');
      siteKhmerToggle.setAttribute('aria-pressed', String(!hidden));
      siteKhmerToggle.classList.toggle('active', !hidden);
      const geographyToggle = document.querySelector('#geographyTranslationToggle');
      if (geographyToggle && hidden && geographySection?.classList.contains('khmer-visible')) geographyToggle.click();
      if (geographyToggle && !hidden && !geographySection?.classList.contains('khmer-visible')) geographyToggle.click();
    });
    ['quiz', 'infinitiveQuiz', 'quantifiersQuiz', 'conditionalQuiz', 'geographyQuizPanel', 'urbanQuizPanel'].forEach((id) => {
      const quiz = document.querySelector(`#${id}`);
      if (!quiz) return;
      quiz.classList.add('collapsible-quiz', 'is-collapsed');
      const trigger = document.createElement('button');
      trigger.className = 'quiz-trigger'; trigger.type = 'button'; trigger.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>Take Module Quiz (10 Questions)'; trigger.setAttribute('aria-expanded', 'false');
      quiz.parentNode.insertBefore(trigger, quiz);
      const close = document.createElement('button'); close.className = 'quiz-close'; close.type = 'button'; close.textContent = 'Close Quiz'; quiz.appendChild(close);
      trigger.addEventListener('click', () => { quiz.classList.add('is-open'); quiz.classList.remove('is-collapsed'); trigger.setAttribute('aria-expanded', 'true'); quiz.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      close.addEventListener('click', () => { quiz.classList.remove('is-open'); quiz.classList.add('is-collapsed'); trigger.setAttribute('aria-expanded', 'false'); });
    });
    document.querySelector('.module-tab[data-module-group="grammar"]')?.click();
    document.querySelector('.module-tab[data-module-group="vocabulary"]')?.click();
    const drillTitle = document.querySelector('#drillTitle');
    const drillLevelLabel = document.querySelector('.drill-level-label');
    const drillParagraph = document.querySelector('#drillParagraph');
    const drillStatus = document.querySelector('#drillStatus');
    const listenDrill = document.querySelector('#listenDrill');
    const slowDrill = document.querySelector('#slowDrill');
    const recordDrill = document.querySelector('#recordDrill');
    let drillLevel = 'beginner';
    let drillRate = 1;
    let drillRecorder;
    let drillStream;

    function renderDrill(level) {
      const drill = drillData[level];
      drillLevel = level;
      if (drillTitle) drillTitle.textContent = drill.title;
      if (drillLevelLabel) drillLevelLabel.textContent = drill.label;
      if (drillParagraph) drillParagraph.textContent = drill.text;
      if (drillStatus) drillStatus.textContent = '';
    }

    document.querySelectorAll('.drill-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.drill-tab').forEach((item) => {
          const active = item === tab;
          item.classList.toggle('active', active);
          item.setAttribute('aria-selected', String(active));
        });
        renderDrill(tab.dataset.drillLevel);
      });
    });
    if (listenDrill) listenDrill.addEventListener('click', () => {
      if (!('speechSynthesis' in window) || !drillParagraph) {
        if (drillStatus) drillStatus.textContent = 'Native audio is not supported in this browser.';
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(drillParagraph.textContent);
      utterance.lang = 'en-US';
      utterance.rate = drillRate;
      window.speechSynthesis.speak(utterance);
      if (drillStatus) drillStatus.textContent = drillRate === .8 ? 'Playing slowly at 0.8x speed.' : 'Playing native audio.';
    });
    if (slowDrill) slowDrill.addEventListener('click', () => {
      drillRate = drillRate === 1 ? .8 : 1;
      slowDrill.classList.toggle('is-active', drillRate === .8);
      slowDrill.setAttribute('aria-pressed', String(drillRate === .8));
      slowDrill.innerHTML = drillRate === .8 ? '<span aria-hidden="true">🐢</span> Normal Speed (1x)' : '<span aria-hidden="true">🐢</span> Slow Speed (0.8x)';
    });
    if (recordDrill) recordDrill.addEventListener('click', async () => {
      if (drillRecorder?.state === 'recording') {
        drillRecorder.stop();
        drillStream?.getTracks().forEach((track) => track.stop());
        recordDrill.classList.remove('is-active');
        recordDrill.innerHTML = '<span aria-hidden="true">🎙</span> Record Your Reading';
        if (drillStatus) drillStatus.textContent = 'Reading saved for this practice session.';
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        if (drillStatus) drillStatus.textContent = 'Recording needs microphone access in a supported browser.';
        return;
      }
      try {
        drillStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        drillRecorder = new MediaRecorder(drillStream);
        drillRecorder.start();
        recordDrill.classList.add('is-active');
        recordDrill.innerHTML = '<span aria-hidden="true">■</span> Stop Recording';
        if (drillStatus) drillStatus.textContent = 'Recording... read the paragraph aloud.';
      } catch {
        if (drillStatus) drillStatus.textContent = 'Microphone access was not granted.';
      }
    });
    const pronunciationRecord = document.querySelector('#pronunciationRecord');
    const pronunciationFeedback = document.querySelector('#pronunciationFeedback');
    const pronunciationStatus = document.querySelector('#pronunciationStatus');
    const pitchButton = document.querySelector('#pitchButton');
    let pronunciationStream;
    if (pronunciationRecord) pronunciationRecord.addEventListener('click', async () => {
      if (pronunciationRecord.classList.contains('is-recording')) return;
      pronunciationRecord.classList.add('is-recording');
      pronunciationRecord.querySelector('span:last-child').textContent = 'Listening...';
      if (pronunciationFeedback) pronunciationFeedback.hidden = true;
      if (pronunciationStatus) pronunciationStatus.textContent = 'Analyzing your pronunciation...';
      try {
        if (navigator.mediaDevices?.getUserMedia) {
          pronunciationStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
      } catch {
        if (pronunciationStatus) pronunciationStatus.textContent = 'Using practice mode for this demo...';
      }
      window.setTimeout(() => {
        pronunciationStream?.getTracks().forEach((track) => track.stop());
        pronunciationStream = null;
        pronunciationRecord.classList.remove('is-recording');
        pronunciationRecord.querySelector('span:last-child').textContent = 'Tap to Record Again';
        if (pronunciationFeedback) pronunciationFeedback.hidden = false;
        if (pronunciationStatus) pronunciationStatus.textContent = 'Analysis complete. Keep practicing “perspective.”';
      }, 1200);
    });
    if (pitchButton) pitchButton.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('perspective');
      utterance.lang = 'en-US';
      utterance.rate = .78;
      window.speechSynthesis.speak(utterance);
      if (pronunciationStatus) pronunciationStatus.textContent = 'Playing the correct pronunciation of “perspective.”';
    });
    const challengeQuestions = [
      { question: 'Choose the sentence with a gerund as the subject.', options: ['A. I enjoy reading.', 'B. Reading builds confidence.', 'C. She is reading now.'], correct: 1 },
      { question: 'They avoided _____ about the difficult topic.', options: ['A. talk', 'B. to talk', 'C. talking'], correct: 2 },
      { question: 'She decided _____ English before the club.', options: ['A. to practice', 'B. practicing', 'C. practice'], correct: 0 }
    ];
    const challengeQuestion = document.querySelector('#challengeQuestion');
    const challengeOptions = document.querySelectorAll('.challenge-option');
    const challengeStart = document.querySelector('#challengeStart');
    const challengeTime = document.querySelector('#challengeTime');
    const challengeProgress = document.querySelector('#challengeProgress');
    const challengeQuestionCount = document.querySelector('#challengeQuestionCount');
    const challengeScore = document.querySelector('#challengeScore');
    const challengeStatus = document.querySelector('#challengeStatus');
    let challengeIndex = 0;
    let challengePoints = 0;
    let challengeSeconds = 60;
    let challengeTimer;
    let challengeStarted = false;

    function renderChallengeQuestion() {
      const current = challengeQuestions[challengeIndex];
      if (challengeQuestion) challengeQuestion.textContent = current.question;
      if (challengeQuestionCount) challengeQuestionCount.textContent = `${challengeIndex + 1} / ${challengeQuestions.length}`;
      challengeOptions.forEach((button, index) => {
        button.className = 'challenge-option';
        button.disabled = false;
        button.textContent = current.options[index];
      });
    }

    function endChallenge(message) {
      window.clearInterval(challengeTimer);
      challengeOptions.forEach((button) => { button.disabled = true; });
      if (challengeStart) {
        challengeStart.disabled = false;
        challengeStart.textContent = 'Try Again';
      }
      if (challengeStatus) challengeStatus.textContent = `${message} Final score: ${challengePoints} pts.`;
      challengeStarted = false;
    }

    function startChallenge() {
      window.clearInterval(challengeTimer);
      challengeStarted = true;
      challengeSeconds = 60;
      challengeIndex = 0;
      challengePoints = 0;
      if (challengeTime) challengeTime.textContent = '60';
      if (challengeProgress) {
        challengeProgress.style.width = '100%';
        challengeProgress.classList.remove('is-low');
      }
      if (challengeScore) challengeScore.textContent = '0 pts';
      if (challengeStart) {
        challengeStart.textContent = 'Sprint Active';
        challengeStart.disabled = true;
      }
      if (challengeStatus) challengeStatus.textContent = 'Go! Choose the best answer.';
      renderChallengeQuestion();
      challengeTimer = window.setInterval(() => {
        challengeSeconds -= 1;
        if (challengeTime) challengeTime.textContent = String(challengeSeconds);
        if (challengeProgress) {
          challengeProgress.style.width = `${(challengeSeconds / 60) * 100}%`;
          challengeProgress.classList.toggle('is-low', challengeSeconds <= 15);
        }
        if (challengeSeconds <= 0) endChallenge('Time is up.');
      }, 1000);
    }

    challengeStart?.addEventListener('click', startChallenge);
    challengeOptions.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (!challengeStarted) startChallenge();
        const current = challengeQuestions[challengeIndex];
        challengeOptions.forEach((option) => { option.disabled = true; });
        const correct = index === current.correct;
        button.classList.add(correct ? 'is-correct' : 'is-wrong');
        if (correct) {
          challengePoints += 100;
          if (challengeScore) challengeScore.textContent = `${challengePoints} pts`;
        }
        if (challengeStatus) challengeStatus.textContent = correct ? '+100 points. Nice work!' : 'Keep going. The next question is ready.';
        window.setTimeout(() => {
          challengeIndex += 1;
          if (challengeIndex >= challengeQuestions.length) {
            endChallenge('Sprint complete!');
          } else {
            renderChallengeQuestion();
          }
        }, 450);
      });
    });
    renderChallengeQuestion();
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const wizardNext = document.querySelector('#wizardNext');
    const wizardStepLabel = document.querySelector('#wizardStepLabel');
    const wizardResults = document.querySelector('#wizardResults');
    const wizardReset = document.querySelector('#wizardReset');
    let wizardStep = 1;
    const wizardSelections = {};

    function updateWizardStep() {
      wizardSteps.forEach((step) => step.classList.toggle('active', Number(step.dataset.wizardStep) === wizardStep));
      if (wizardStepLabel) wizardStepLabel.textContent = `Step ${wizardStep} of 3`;
      if (wizardNext) {
        wizardNext.disabled = !wizardSelections[wizardStep];
        wizardNext.textContent = wizardStep === 3 ? 'Find my readers →' : 'Continue →';
      }
    }

    document.querySelectorAll('.wizard-step').forEach((step) => {
      step.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
          step.querySelectorAll('button').forEach((option) => option.classList.toggle('selected', option === button));
          wizardSelections[Number(step.dataset.wizardStep)] = button.dataset.wizardValue;
          updateWizardStep();
        });
      });
    });
    wizardNext?.addEventListener('click', () => {
      if (!wizardSelections[wizardStep]) return;
      if (wizardStep < 3) {
        wizardStep += 1;
        updateWizardStep();
        return;
      }
      wizardSteps.forEach((step) => { step.hidden = true; });
      wizardNext.hidden = true;
      if (wizardStepLabel) wizardStepLabel.textContent = 'Your reading path';
      if (wizardResults) wizardResults.hidden = false;
    });
    wizardReset?.addEventListener('click', () => {
      wizardStep = 1;
      Object.keys(wizardSelections).forEach((key) => delete wizardSelections[key]);
      document.querySelectorAll('.wizard-options button').forEach((button) => button.classList.remove('selected'));
      wizardSteps.forEach((step) => { step.hidden = false; });
      wizardNext.hidden = false;
      if (wizardResults) wizardResults.hidden = true;
      updateWizardStep();
    });
    updateWizardStep();
    renderDrill('beginner');
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
    document.querySelectorAll('.learning-paths-menu').forEach((menu) => {
      const trigger = menu.querySelector('.learning-paths-trigger');
      const closeMenu = () => {
        menu.classList.remove('open');
        trigger?.setAttribute('aria-expanded', 'false');
      };
      trigger?.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
      });
      menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
      menu.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeMenu();
          trigger?.focus();
        }
      });
    });

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
    const highlightGrammar = document.querySelector('#highlightGrammar');
    const grammarHighlights = document.querySelectorAll('.grammar-highlight');
    highlightGrammar?.addEventListener('click', () => {
      const active = readingText?.classList.toggle('grammar-key-active');
      grammarHighlights.forEach((item) => item.classList.toggle('is-open', Boolean(active)));
      highlightGrammar.classList.toggle('is-active', Boolean(active));
    });
    grammarHighlights.forEach((highlight) => highlight.addEventListener('click', (event) => {
      event.stopPropagation();
      highlight.classList.toggle('is-open');
    }));
    const listenLesson = document.querySelector('#listenLesson');
    if (listenLesson && readingText) listenLesson.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(readingText.innerText);
      utterance.lang = 'en-US';
      utterance.rate = .86;
      window.speechSynthesis.speak(utterance);
      listenLesson.classList.add('is-active');
      listenLesson.textContent = '🔊 Playing Lesson Audio';
      utterance.onend = () => {
        listenLesson.classList.remove('is-active');
        listenLesson.textContent = '🔊 Listen to Audio';
      };
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
