const hardshipQuestions = {
    unemployed: [
        { q: "How long have you been out of work?", type: "text" },
        { q: "Did you resign or were you made redundant?", type: "text" },
        { q: "If redundant, did you receive any redundancy pay?", type: "yesno" },
        { q: "Are you currently looking for work?", type: "yesno" },
        { q: "Have you applied for Jobseeker benefits?", type: "yesno" },
        { q: "If not eligible for Centrelink, why?", type: "text", placeholder: "e.g., Household income too high" },
        { q: "When do you expect to be back at work?", type: "text" },
        { q: "Do you have any dependents?", type: "yesno" },
        { q: "Do you have other loans or financial commitments?", type: "yesno" },
        { q: "How much can you afford to pay towards your loan?", type: "text" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea" }
    ],
    reducedIncome: [
        { q: "When did the income reduction happen?", type: "text" },
        { q: "Is this temporary or permanent?", type: "text" },
        { q: "How much are you getting paid now?", type: "text" },
        { q: "Are you looking for additional work?", type: "yesno" },
        { q: "Do you have any dependents?", type: "yesno" },
        { q: "Do you have other loans or financial commitments?", type: "yesno" },
        { q: "How much can you afford to pay towards your loan?", type: "text" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea" }
    ],
    overcommitted: [
        { q: "What new purchases/loans caused this?", type: "text" },
        { q: "Have your spending habits changed?", type: "yesno" },
        { q: "Is this temporary or ongoing?", type: "text" },
        { q: "If on Pension, what type?", type: "text" },
        { q: "Is this the same Pension as before?", type: "yesno" },
        { q: "How much do you receive per fortnight?", type: "text" },
        { q: "How much can you afford to pay towards your loan?", type: "text" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea" }
    ],
    unexpectedBills: [
        { q: "What sort of bills have come up?", type: "text" },
        { q: "Is this a once-off or ongoing situation?", type: "text" },
        { q: "How much can you afford to pay now?", type: "text" },
        { q: "Could you increase payments later to catch up?", type: "yesno" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea" }
    ],
    injuryIllness: [
         { q: "When did the injury/illness occur?", type: "text" },
         { q: "What sort of injury/illness is it?", type: "text" },
         { q: "Are you currently able to work?", type: "yesno" },
         { q: "Is this a permanent or temporary situation?", type: "text" },
         { q: "How long do you expect to be out of action?", type: "text" },
         { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea" }
    ],
    familyBreakdown: [
        { q: "When did this occur?", type: "text" },
        { q: "How is this impacting your ability to make payments?", type: "textarea" },
        { q: "Are you currently working?", type: "yesno" },
        { q: "How long do you need to get back on your feet?", type: "text" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea" }
    ],
    financialAbuse: [
        { q: "How long has this been happening?", type: "text" },
        { q: "Are you taking steps to change the situation?", type: "yesno" },
        { q: "Are you currently working?", type: "yesno" },
        { q: "How long do you need to get back on your feet?", type: "text" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea" }
    ],
    naturalDisaster: [
        { q: "What disaster has occurred?", type: "text" },
        { q: "How has this impacted your ability to make repayments?", type: "textarea" },
        { q: "How much can you afford to pay?", type: "text" },
        { q: "How long do you need to get back on your feet?", type: "text" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea" }
    ],
    other: [
        { q: "What circumstances are impacting your repayments?", type: "textarea" },
        { q: "Are you on the same pension as before?", type: "yesno" },
        { q: "How much do you receive per fortnight?", type: "text" },
        { q: "How are you planning to catch up on arrears later?", type: "textarea" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea" }
    ]
};

function renderHardshipQuestions() {
    const hardshipCategory = document.getElementById('hardshipCategory');
    const hardshipQuestionsContainer = document.getElementById('hardshipQuestionsContainer');
    if (!hardshipCategory || !hardshipQuestionsContainer) return;

    const category = hardshipCategory.value;
    const questions = hardshipQuestions[category];
    hardshipQuestionsContainer.innerHTML = '';
    questions.forEach((item, index) => {
        const group = document.createElement('div');
        group.className = 'hardship-question-group';
        const label = document.createElement('label');
        label.textContent = item.q;
        label.htmlFor = `hardship-q-${index}`;
        group.appendChild(label);
        if (item.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text'; input.id = `hardship-q-${index}`; input.placeholder = item.placeholder || '';
            group.appendChild(input);
        } else if (item.type === 'textarea') {
            const textarea = document.createElement('textarea');
            textarea.id = `hardship-q-${index}`; textarea.placeholder = item.placeholder || '';
            group.appendChild(textarea);
        } else if (item.type === 'yesno') {
            const radioContainer = document.createElement('div');
            radioContainer.className = 'radio-group';
            const yesRadio = document.createElement('input');
            yesRadio.type = 'radio'; yesRadio.id = `hardship-q-${index}-yes`; yesRadio.name = `hardship-q-${index}`; yesRadio.value = 'Yes';
            const yesLabel = document.createElement('label');
            yesLabel.textContent = 'Yes'; yesLabel.htmlFor = `hardship-q-${index}-yes`;
            const noRadio = document.createElement('input');
            noRadio.type = 'radio'; noRadio.id = `hardship-q-${index}-no`; noRadio.name = `hardship-q-${index}`; noRadio.value = 'No';
            const noLabel = document.createElement('label');
            noLabel.textContent = 'No'; noLabel.htmlFor = `hardship-q-${index}-no`;
            radioContainer.appendChild(yesRadio); radioContainer.appendChild(yesLabel); radioContainer.appendChild(noRadio); radioContainer.appendChild(noLabel);
            group.appendChild(radioContainer);
        }
        hardshipQuestionsContainer.appendChild(group);
    });
}