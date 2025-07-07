document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection (Unified Form) ---
    const initialsInput = document.getElementById('initialsInput');
    const timestampSpan = document.getElementById('timestamp');
    const unifiedNotesForm = document.getElementById('unifiedNotesForm');
    const noteTypeButton = document.getElementById('noteTypeButton'); // For future use if dropdown has actual types
    const noteTypeDropdownMenu = document.getElementById('noteTypeDropdownMenu'); // For future use

    // Section 1: Category & Caller Type
    const interactionCategorySelect = document.getElementById('interactionCategory');
    // callerTypeRadio (callerTypeAH, callerTypeATP, callerTypeUTP) are selected by name attribute

    // Section 2: Call Handling
    const callHandlingSection = document.getElementById('callHandlingSection');
    const noAnswerCheckbox = document.getElementById('noAnswerCheckbox');
    const outboundActionsWrapper = document.getElementById('outboundActionsWrapper');
    const outboundActionsDropdown = document.getElementById('outboundActionsDropdown');

    // Section 3: Main Details (Answered Call)
    const answeredCallDetailsSection = document.getElementById('answeredCallDetailsSection');
    const customerConcernTextarea = document.getElementById('customerConcern');
    const discussionNotesTextarea = document.getElementById('discussionNotes');
    const reasonForCallCollectionsSelect = document.getElementById('reasonForCallCollections');
    const addBankCheckbox = document.getElementById('addBankCheckbox');
    const addCardCheckbox = document.getElementById('addCardCheckbox');
    const lastFourWrapper = document.getElementById('lastFourWrapper');
    const lastFourInput = document.getElementById('lastFourInput');

    // Section 4: Payment Processing
    const processPaymentCheckbox = document.getElementById('processPaymentCheckbox');
    const paymentDetailsUnifiedDiv = document.getElementById('paymentDetailsUnified');
    // paymentTypeUnified (paymentTypeOnceOff, paymentTypeScheduled, paymentTypePDADV) are selected by name

    const onceOffPaymentFieldsDiv = document.getElementById('onceOffPaymentFields');
    const onceOffPaymentAmountInput = document.getElementById('onceOffPaymentAmount');

    const scheduledPaymentFieldsDiv = document.getElementById('scheduledPaymentFields');
    const amountInputsContainer = document.getElementById('amountInputsContainer');
    // accountStatus (statusArrears, statusCurrent) are selected by name

    const pdAdvPaymentFieldsDiv = document.getElementById('pdAdvPaymentFields');
    // pdAdvSubType (pdAdvTypeAdvance, pdAdvTypePastDue) are selected by name
    const advancePaymentFieldsDiv = document.getElementById('advancePaymentFields');
    const advancePaymentAmountInput = document.getElementById('advancePaymentAmount');
    const pastDuePaymentFieldsDiv = document.getElementById('pastDuePaymentFields');
    const pastDuePaymentAmountInput = document.getElementById('pastDuePaymentAmount');
    const daysPastDueInput = document.getElementById('daysPastDue');

    // Section 5: Arrangements & Hardship
    const arrangementCheckbox = document.getElementById('arrangementCheckbox');
    const hardshipCheckbox = document.getElementById('hardshipCheckbox');
    const arrangementDetailsDiv = document.getElementById('arrangementDetails');
    const arrangementAmountInput = document.getElementById('arrangementAmount');
    const arrangementDateInput = document.getElementById('arrangementDate');
    const moveNpdWrapperDiv = document.getElementById('moveNpdWrapper');
    const moveNpdDisplaySpan = document.getElementById('moveNpdDisplay');

    // Section 6: Housekeeping
    const emailChangedCheckbox = document.getElementById('emailChanged');
    const newEmailGroupDiv = document.getElementById('newEmailGroup');
    const newEmailInput = document.getElementById('newEmail');
    const atpChangedCheckbox = document.getElementById('atpChanged');
    const atpOptionsWrapperDiv = document.getElementById('atpOptionsWrapper');
    const newAtpOptionRadio = document.getElementById('newAtpOption');
    const currentAtpOptionRadio = document.getElementById('currentAtpOption');
    const newAtpFieldsDiv = document.getElementById('newAtpFields');
    const currentAtpFieldsDiv = document.getElementById('currentAtpFields');
    const newAtpNameInput = document.getElementById('newAtpName');
    const newAtpEmailInput = document.getElementById('newAtpEmail');
    const newAtpPhoneInput = document.getElementById('newAtpPhone');
    const newAtpRelationshipInput = document.getElementById('newAtpRelationship');
    const currentAtpNameInput = document.getElementById('currentAtpName');
    const currentAtpEmailInput = document.getElementById('currentAtpEmail');
    const currentAtpPhoneInput = document.getElementById('currentAtpPhone');
    const newAtpInputs = [newAtpNameInput, newAtpEmailInput, newAtpPhoneInput, newAtpRelationshipInput];
    const currentAtpInputs = [currentAtpNameInput, currentAtpEmailInput, currentAtpPhoneInput];


    // Section 7: Recap & Resolution
    const agentResolutionTextarea = document.getElementById('agentResolution');
    const advisedNpdCheckbox = document.getElementById('advisedNpdCheckbox');
    const advisedNpdInput = document.getElementById('advisedNpdInput');
    const selfHelpCheckbox = document.getElementById('selfHelpCheckbox');
    const surveyCheckbox = document.getElementById('surveyCheckbox');

    // Buttons & Notification
    const copyToClipboardButton = document.getElementById('copyToClipboardButton');
    const newNoteButton = document.getElementById('newNoteButton');
    const notification = document.getElementById('notification');

    // Hardship Panel
    const hardshipTabButton = document.getElementById('hardshipTabButton');
    const unifiedNoteContentDiv = document.getElementById('unifiedNoteContent');
    const hardshipContentPanelDiv = document.getElementById('hardshipContentPanel');
    const hardshipCategorySelect = document.getElementById('hardshipCategory');
    const hardshipQuestionsContainer = document.getElementById('hardshipQuestionsContainer');

    let hardshipNpdDate = null; // Used by hardship logic

    // --- Utility Functions ---
    function updateClock() {
        if (!timestampSpan) return;
        const now = new Date();
        // Using Asia/Manila timezone as in original collections.js
        // For broader compatibility, consider Moment Timezone or Intl.DateTimeFormat if specific timezones are critical
        // For now, using a simplified approach that might rely on server/browser config if not specifically Manila
        let localTime;
        try {
            localTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
        } catch (e) {
            localTime = now; // Fallback to local time if timezone conversion fails
        }

        let hours = localTime.getHours();
        const minutes = String(localTime.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strTime = `${hours}:${minutes} ${ampm}`;
        const day = String(localTime.getDate()).padStart(2, '0');
        const month = String(localTime.getMonth() + 1).padStart(2, '0');
        const year = String(localTime.getFullYear()).slice(-2);
        timestampSpan.textContent = `${strTime} ${day}/${month}/${year}`;
    }

    function showNotification(message) {
        if (!notification) return;
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => { notification.classList.remove('show'); }, 2800);
    }

    function setInputFilter(inputElement, filterFnOrType) {
        if (!inputElement) return;
        inputElement.addEventListener('input', function() {
            let originalValue = this.value;
            if (typeof filterFnOrType === 'function') {
                this.value = filterFnOrType(originalValue);
            } else if (filterFnOrType === 'numeric') { // Only digits
                this.value = originalValue.replace(/\D/g, '');
            } else if (filterFnOrType === 'decimal') { // Digits and one decimal point
                this.value = originalValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
            } else if (filterFnOrType === 'alphaUpper') { // Uppercase letters
                this.value = originalValue.toUpperCase().replace(/[^A-Z]/g, '');
            }
            // Common: remove error highlight on input
            this.classList.remove('highlight-error');
        });
    }

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); // Ensure rest is lowercase for consistency
    }

    function highlightError(element, message) {
        if (element) {
            element.classList.add('highlight-error');
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                 // Check if it's the first error to focus
                const firstError = document.querySelector('.highlight-error');
                if (firstError === element) {
                    element.focus();
                }
            }
        }
        if (message) showNotification(message);
    }

    function clearAllErrors() {
        document.querySelectorAll('.highlight-error').forEach(el => el.classList.remove('highlight-error'));
    }

    // --- Form Initialization and Reset ---
    function initializeForm() {
        const currentInitials = initialsInput ? initialsInput.value : '';
        const currentCategory = interactionCategorySelect ? interactionCategorySelect.value : 'Inbound Call';
        const currentOutboundAction = outboundActionsDropdown ? outboundActionsDropdown.value : '';


        if (unifiedNotesForm) unifiedNotesForm.reset(); // Resets all form fields to default

        // Restore values that should persist or have specific defaults after reset
        if (initialsInput) initialsInput.value = currentInitials;
        if (interactionCategorySelect) interactionCategorySelect.value = currentCategory;
        if (outboundActionsDropdown) outboundActionsDropdown.value = currentOutboundAction;

        // Default radio button states (if any specific default is needed beyond form.reset())
        const defaultCallerType = document.getElementById('callerTypeAH');
        if (defaultCallerType) defaultCallerType.checked = true;


        // Visual state updates
        if (noAnswerCheckbox) noAnswerCheckbox.checked = false; // Default to answered call
        toggleAnsweredCallDetails(true); // Show answered call details by default
        toggleOutboundActions(false);    // Hide outbound actions by default

        if (processPaymentCheckbox) processPaymentCheckbox.checked = false;
        if (paymentDetailsUnifiedDiv) paymentDetailsUnifiedDiv.classList.add('hidden');
        resetPaymentFields();

        if (arrangementCheckbox) arrangementCheckbox.checked = false;
        if (arrangementDetailsDiv) arrangementDetailsDiv.classList.add('hidden');
        if (arrangementAmountInput) arrangementAmountInput.value = '';
        if (arrangementDateInput) arrangementDateInput.value = '';

        if (hardshipCheckbox) hardshipCheckbox.checked = false;
        if (hardshipTabButton) hardshipTabButton.classList.add('hidden');
        if (moveNpdWrapperDiv) moveNpdWrapperDiv.classList.add('hidden');
        if (moveNpdDisplaySpan) moveNpdDisplaySpan.textContent = '';
        hardshipNpdDate = null;
        if (hardshipContentPanelDiv) hardshipContentPanelDiv.classList.add('hidden'); // Ensure hardship panel is hidden
        if (unifiedNoteContentDiv) unifiedNoteContentDiv.classList.add('active-content'); // Ensure main panel is active
        if (noteTypeButton) noteTypeButton.classList.add('active-tab'); // Main tab active
        if (hardshipTabButton) hardshipTabButton.classList.remove('active-tab');

        if (emailChangedCheckbox) emailChangedCheckbox.checked = false;
        if (newEmailGroupDiv) newEmailGroupDiv.classList.add('hidden');
        if (newEmailInput) newEmailInput.value = '';

        if (atpChangedCheckbox) atpChangedCheckbox.checked = false;
        updateAtpFieldsVisibility(); // This will hide and disable ATP fields

        if (advisedNpdCheckbox) {
            advisedNpdCheckbox.checked = false;
            advisedNpdCheckbox.disabled = false; // Re-enable if it was disabled by hardship
        }
        if (advisedNpdInput) {
            advisedNpdInput.value = '';
            advisedNpdInput.disabled = true;
        }

        if (amountInputsContainer) amountInputsContainer.innerHTML = ''; // Clear dynamic payment amounts

        clearAllErrors();
        if (initialsInput) initialsInput.focus();
        renderHardshipQuestions(); // Reset hardship questions to default category
        updateClock(); // Update time immediately
    }

    // --- UI Toggling Functions ---
    function toggleAnsweredCallDetails(isAnswered) {
        if (answeredCallDetailsSection) answeredCallDetailsSection.classList.toggle('hidden', !isAnswered);
        if (callHandlingSection) callHandlingSection.classList.toggle('hidden', isAnswered); // Hide "No Answer" section if answered
        if (isAnswered) {
            if (outboundActionsWrapper) outboundActionsWrapper.classList.add('hidden');
            if (noAnswerCheckbox) noAnswerCheckbox.checked = false; // Ensure noAnswer is unchecked
        } else {
             if (outboundActionsWrapper) outboundActionsWrapper.classList.remove('hidden');
        }
    }

    function toggleOutboundActions(show) {
        if(outboundActionsWrapper) outboundActionsWrapper.classList.toggle('hidden', !show);
    }

    function resetPaymentFields() {
        // Uncheck all payment type radios
        const paymentTypeRadios = document.querySelectorAll('input[name="paymentTypeUnified"]');
        paymentTypeRadios.forEach(radio => radio.checked = false);

        // Hide all conditional payment sections
        if (onceOffPaymentFieldsDiv) onceOffPaymentFieldsDiv.classList.add('hidden');
        if (scheduledPaymentFieldsDiv) scheduledPaymentFieldsDiv.classList.add('hidden');
        if (pdAdvPaymentFieldsDiv) pdAdvPaymentFieldsDiv.classList.add('hidden');
        if (advancePaymentFieldsDiv) advancePaymentFieldsDiv.classList.add('hidden');
        if (pastDuePaymentFieldsDiv) pastDuePaymentFieldsDiv.classList.add('hidden');

        // Clear input values in these sections
        if (onceOffPaymentAmountInput) onceOffPaymentAmountInput.value = '';
        if (amountInputsContainer) amountInputsContainer.innerHTML = ''; // Clear dynamic amount rows
        const accountStatusRadios = document.querySelectorAll('input[name="accountStatus"]');
        accountStatusRadios.forEach(radio => radio.checked = false);

        const pdAdvSubTypeRadios = document.querySelectorAll('input[name="pdAdvSubType"]');
        pdAdvSubTypeRadios.forEach(radio => radio.checked = false);
        if (advancePaymentAmountInput) advancePaymentAmountInput.value = '';
        if (pastDuePaymentAmountInput) pastDuePaymentAmountInput.value = '';
        if (daysPastDueInput) daysPastDueInput.value = '';
    }

    function updateAtpFieldsVisibility() {
        if (!atpChangedCheckbox || !atpOptionsWrapperDiv || !newAtpOptionRadio || !currentAtpOptionRadio || !newAtpFieldsDiv || !currentAtpFieldsDiv) return;

        const isAtpChanged = atpChangedCheckbox.checked;
        atpOptionsWrapperDiv.classList.toggle('hidden', !isAtpChanged);

        if (!isAtpChanged) {
            newAtpOptionRadio.checked = false;
            currentAtpOptionRadio.checked = false;
        }

        newAtpFieldsDiv.classList.toggle('hidden', !newAtpOptionRadio.checked);
        newAtpInputs.forEach(input => { if(input) input.disabled = !newAtpOptionRadio.checked; });
        if (!newAtpOptionRadio.checked) newAtpInputs.forEach(input => {if(input) input.value = '';});


        currentAtpFieldsDiv.classList.toggle('hidden', !currentAtpOptionRadio.checked);
        currentAtpInputs.forEach(input => { if(input) input.disabled = !currentAtpOptionRadio.checked; });
        if (!currentAtpOptionRadio.checked) currentAtpInputs.forEach(input => {if(input) input.value = '';});

        if (!isAtpChanged) { // Clear all if ATP changed is unchecked
             newAtpInputs.forEach(input => {if(input) input.value = '';});
             currentAtpInputs.forEach(input => {if(input) input.value = '';});
        }
    }

    // --- Hardship Functionality ---
    function renderHardshipQuestions() {
        if (!hardshipCategorySelect || !hardshipQuestionsContainer || typeof hardshipQuestions === 'undefined') return;

        const category = hardshipCategorySelect.value;
        const questions = hardshipQuestions[category];
        hardshipQuestionsContainer.innerHTML = ''; // Clear previous questions

        if (questions) {
            questions.forEach((item) => {
                const group = document.createElement('div');
                group.className = 'hardship-question-group';

                const label = document.createElement('label');
                label.textContent = item.q;
                label.htmlFor = item.id; // Use the ID from hardshipData.js
                group.appendChild(label);

                if (item.type === 'text' || item.type === 'textarea') {
                    const inputElement = (item.type === 'textarea') ? document.createElement('textarea') : document.createElement('input');
                    if(item.type === 'text') inputElement.type = 'text';
                    inputElement.id = item.id;
                    inputElement.placeholder = item.placeholder || '';
                    group.appendChild(inputElement);
                } else if (item.type === 'yesno') {
                    const radioContainer = document.createElement('div');
                    radioContainer.className = 'radio-group';
                    ['Yes', 'No'].forEach(val => {
                        const radioInput = document.createElement('input');
                        radioInput.type = 'radio';
                        radioInput.id = `${item.id}_${val.toLowerCase()}`;
                        radioInput.name = item.id; // Group radios by question ID
                        radioInput.value = val;

                        const radioLabel = document.createElement('label');
                        radioLabel.textContent = val;
                        radioLabel.htmlFor = radioInput.id;

                        radioContainer.appendChild(radioInput);
                        radioContainer.appendChild(radioLabel);
                    });
                    group.appendChild(radioContainer);
                }
                hardshipQuestionsContainer.appendChild(group);
            });
        }
    }

    function getHardshipAnswers() {
        let answers = ['[Cust. Hardship Answers]'];
        if (!hardshipQuestionsContainer) return answers.join('\n');

        const questionsElements = hardshipQuestionsContainer.querySelectorAll('.hardship-question-group');
        questionsElements.forEach((group) => {
            const labelElement = group.querySelector('label'); // The first label is the question
            const textInput = group.querySelector('input[type="text"], textarea');
            const radioInput = group.querySelector('input[type="radio"]:checked');

            if (labelElement) {
                const questionText = labelElement.textContent;
                let answer = 'N/A'; // Default if no answer provided

                if (textInput && textInput.value.trim() !== '') {
                    answer = textInput.value.trim();
                } else if (radioInput) {
                    answer = radioInput.value;
                }
                answers.push(capitalizeFirstLetter(questionText));
                answers.push(`- ${capitalizeFirstLetter(answer)}`);
            }
        });
        return answers.join('\n');
    }

    function showPanel(panelIdToShow) {
        // Hide all main content panels
        if (unifiedNoteContentDiv) unifiedNoteContentDiv.classList.remove('active-content');
        if (hardshipContentPanelDiv) hardshipContentPanelDiv.classList.remove('active-content');

        // Deactivate all tabs
        if (noteTypeButton) noteTypeButton.classList.remove('active-tab'); // Assuming this is the main tab
        if (hardshipTabButton) hardshipTabButton.classList.remove('active-tab');

        // Show the selected panel and activate its tab
        if (panelIdToShow === 'unifiedNoteContent' && unifiedNoteContentDiv) {
            unifiedNoteContentDiv.classList.add('active-content');
            if (noteTypeButton) noteTypeButton.classList.add('active-tab');
        } else if (panelIdToShow === 'hardshipContentPanel' && hardshipContentPanelDiv) {
            hardshipContentPanelDiv.classList.add('active-content');
            if (hardshipTabButton) hardshipTabButton.classList.add('active-tab');
        }
    }

    // --- Collections Specific UI (Dynamic Amount Rows) ---
    function createAmountRow() {
        if (!amountInputsContainer) return;
        const row = document.createElement('div');
        row.className = 'form-group amount-row'; // Re-use 'form-group' for consistent styling if possible
        row.innerHTML = `<label>Amount ($):</label>
                         <div class="amount-input-wrapper">
                             <input type="text" class="amount-input" placeholder="0.00">
                         </div>`;
        const input = row.querySelector('.amount-input');
        setInputFilter(input, 'decimal');
        amountInputsContainer.appendChild(row);
        updateAmountActionButtons();
    }

    function updateAmountActionButtons() {
        if (!amountInputsContainer) return;
        const allRows = amountInputsContainer.querySelectorAll('.amount-row');
        allRows.forEach((row, index) => {
            let wrapper = row.querySelector('.amount-input-wrapper');
            if (!wrapper) return;
            let existingButton = wrapper.querySelector('.action-button');
            if (existingButton) existingButton.remove();

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'action-button'; // Style these appropriately
            if (index === allRows.length - 1) { // Last row gets a '+'
                button.textContent = '+';
                button.classList.add('add-amount-button');
            } else { // Other rows get a '-'
                button.textContent = '-';
                button.classList.add('remove-amount-button');
            }
            wrapper.appendChild(button);
        });
    }

    // --- Event Listeners ---
    if (newNoteButton) newNoteButton.addEventListener('click', initializeForm);
    if (initialsInput) setInputFilter(initialsInput, 'alphaUpper');
    if (lastFourInput) setInputFilter(lastFourInput, 'numeric');
    [arrangementAmountInput, onceOffPaymentAmountInput, advancePaymentAmountInput, pastDuePaymentAmountInput].forEach(el => {
        if(el) setInputFilter(el, 'decimal');
    });
    if(daysPastDueInput) setInputFilter(daysPastDueInput, 'numeric');
    [newAtpPhoneInput, currentAtpPhoneInput].forEach(el => {
        if(el) setInputFilter(el, 'numeric');
    });


    // Call Handling & Main Details Toggle
    if (noAnswerCheckbox) {
        noAnswerCheckbox.addEventListener('change', function() {
            toggleAnsweredCallDetails(!this.checked);
            toggleOutboundActions(this.checked);
             if (this.checked) { // If "No Answer" is checked
                if(outboundActionsDropdown) outboundActionsDropdown.value = ''; // Clear outbound action
                // Potentially clear/hide other fields from the "answered call" section
                if(customerConcernTextarea) customerConcernTextarea.value = '';
                if(discussionNotesTextarea) discussionNotesTextarea.value = '';
                // etc. for other fields in answeredCallDetailsSection
            }
        });
    }

    // Interaction Category changes (e.g. to show/hide Collections-specific fields)
    if (interactionCategorySelect) {
        interactionCategorySelect.addEventListener('change', function() {
            const isCollectionsCall = this.value === 'Collections Call';
            if (reasonForCallCollectionsSelect) reasonForCallCollectionsSelect.classList.toggle('hidden', !isCollectionsCall);
            if (isCollectionsCall && reasonForCallCollectionsSelect && !reasonForCallCollectionsSelect.classList.contains('hidden')) {
                 reasonForCallCollectionsSelect.previousElementSibling.classList.remove('hidden'); // Show its label
            } else if (reasonForCallCollectionsSelect) {
                 reasonForCallCollectionsSelect.previousElementSibling.classList.add('hidden'); // Hide its label
            }
            // Add more logic here if other fields depend on category
        });
    }


    // Payment Processing Toggles
    if (processPaymentCheckbox) {
        processPaymentCheckbox.addEventListener('change', function() {
            if (paymentDetailsUnifiedDiv) paymentDetailsUnifiedDiv.classList.toggle('hidden', !this.checked);
            if (!this.checked) {
                resetPaymentFields(); // Clear and hide all sub-payment fields
            }
        });
    }

    document.querySelectorAll('input[name="paymentTypeUnified"]').forEach(radio => {
        radio.addEventListener('change', function() {
            onceOffPaymentFieldsDiv.classList.toggle('hidden', this.value !== 'OnceOff' || !this.checked);
            scheduledPaymentFieldsDiv.classList.toggle('hidden', this.value !== 'Scheduled' || !this.checked);
            pdAdvPaymentFieldsDiv.classList.toggle('hidden', this.value !== 'PDADV' || !this.checked);

            if (this.value === 'Scheduled' && this.checked && amountInputsContainer.children.length === 0) {
                createAmountRow(); // Add first amount row for scheduled payments
                const defaultStatus = document.getElementById('statusArrears');
                if(defaultStatus) defaultStatus.checked = true;
            }
             // Reset sub-options if a main payment type is changed
            if (this.value !== 'PDADV') {
                if(advancePaymentFieldsDiv) advancePaymentFieldsDiv.classList.add('hidden');
                if(pastDuePaymentFieldsDiv) pastDuePaymentFieldsDiv.classList.add('hidden');
                document.querySelectorAll('input[name="pdAdvSubType"]').forEach(r => r.checked = false);
            }
        });
    });

    document.querySelectorAll('input[name="pdAdvSubType"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if(advancePaymentFieldsDiv) advancePaymentFieldsDiv.classList.toggle('hidden', this.value !== 'Advance' || !this.checked);
            if(pastDuePaymentFieldsDiv) pastDuePaymentFieldsDiv.classList.toggle('hidden', this.value !== 'PastDue' || !this.checked);
        });
    });

    // Arrangement & Hardship Toggles
    if (arrangementCheckbox) {
        arrangementCheckbox.addEventListener('change', function() {
            if (arrangementDetailsDiv) arrangementDetailsDiv.classList.toggle('hidden', !this.checked);
            if (!this.checked) {
                if(arrangementAmountInput) arrangementAmountInput.value = '';
                if(arrangementDateInput) arrangementDateInput.value = '';
            }
        });
    }

    if (hardshipCheckbox) {
        hardshipCheckbox.addEventListener('change', function() {
            const isHardship = this.checked;
            if (hardshipTabButton) hardshipTabButton.classList.toggle('hidden', !isHardship);
            if (moveNpdWrapperDiv) moveNpdWrapperDiv.classList.toggle('hidden', !isHardship);

            if (isHardship) {
                let d = new Date();
                d.setDate(d.getDate() + 30); // Default NPD move: 30 days
                hardshipNpdDate = d.toISOString().slice(0,10);
                if (moveNpdDisplaySpan) moveNpdDisplaySpan.textContent = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getFullYear()).slice(-2)}`;

                if (advisedNpdCheckbox) {
                    advisedNpdCheckbox.checked = true;
                    advisedNpdCheckbox.disabled = true; // Disable manual change when hardship sets it
                }
                if (advisedNpdInput) {
                    advisedNpdInput.value = hardshipNpdDate;
                    advisedNpdInput.disabled = true;
                }
                showPanel('hardshipContentPanel'); // Switch to hardship panel
            } else {
                hardshipNpdDate = null;
                if (moveNpdDisplaySpan) moveNpdDisplaySpan.textContent = '';
                if (advisedNpdCheckbox) advisedNpdCheckbox.disabled = false; // Re-enable
                // Don't automatically uncheck/clear advisedNpdInput if user manually set it before hardship
                showPanel('unifiedNoteContent'); // Switch back to main notes
            }
        });
    }

    if (hardshipTabButton) hardshipTabButton.addEventListener('click', () => showPanel('hardshipContentPanel'));
    // Need a way to go back from hardship to main notes, e.g., clicking the "Note Type" tab
    if (noteTypeButton) noteTypeButton.addEventListener('click', () => showPanel('unifiedNoteContent'));


    if (hardshipCategorySelect) hardshipCategorySelect.addEventListener('change', renderHardshipQuestions);

    // Housekeeping Toggles
    if (emailChangedCheckbox) {
        emailChangedCheckbox.addEventListener('change', function() {
            if (newEmailGroupDiv) newEmailGroupDiv.classList.toggle('hidden', !this.checked);
            if (!this.checked && newEmailInput) newEmailInput.value = '';
        });
    }
    if (atpChangedCheckbox) atpChangedCheckbox.addEventListener('change', updateAtpFieldsVisibility);
    if (newAtpOptionRadio) newAtpOptionRadio.addEventListener('change', updateAtpFieldsVisibility);
    if (currentAtpOptionRadio) currentAtpOptionRadio.addEventListener('change', updateAtpFieldsVisibility);

    // Recap Toggles
    if (advisedNpdCheckbox) {
        advisedNpdCheckbox.addEventListener('change', function() {
            if (advisedNpdInput) {
                advisedNpdInput.disabled = !this.checked || this.disabled; // Keep disabled if hardship disabled it
                if (!this.checked && !this.disabled) {
                    advisedNpdInput.value = '';
                } else if (this.checked && !this.disabled) {
                    try { advisedNpdInput.showPicker(); } catch(e) { /* ignore if not supported */ }
                }
            }
        });
    }

    if(addCardCheckbox) {
        addCardCheckbox.addEventListener('change', function() {
            if(lastFourWrapper) lastFourWrapper.classList.toggle('hidden', !this.checked);
            if(!this.checked && lastFourInput) lastFourInput.value = '';
        });
    }

    // Dynamic Amount Rows Event Delegation
    if (amountInputsContainer) {
        amountInputsContainer.addEventListener('click', function(event) {
            const target = event.target;
            if (target.matches('.add-amount-button')) {
                createAmountRow();
            } else if (target.matches('.remove-amount-button')) {
                target.closest('.amount-row').remove();
                updateAmountActionButtons();
                if (amountInputsContainer.children.length === 0) { // If all removed, maybe add one back or handle state
                   // createAmountRow(); // Optionally always keep one row if payments are being made
                }
            }
        });
    }


    // --- Copy to Clipboard Logic ---
    if (copyToClipboardButton) {
        copyToClipboardButton.addEventListener('click', () => {
            clearAllErrors();
            let isValid = true;
            let noteLines = [];

            // 1. Initials and Timestamp (Always required)
            if (!initialsInput.value.trim()) {
                highlightError(initialsInput, 'Initials are required.');
                isValid = false;
            }
            noteLines.push(`${initialsInput.value.trim()} ${timestampSpan.textContent} - ${interactionCategorySelect.value}`);

            // 2. Caller Type (Always selected as one is default)
            const selectedCallerTypeRadio = document.querySelector('input[name="callerType"]:checked');
            let callerTypeString = selectedCallerTypeRadio ? selectedCallerTypeRadio.value : 'N/A';
            if (callerTypeString === 'AH') callerTypeString = 'Account Holder'; // Make it more readable
             // Verification status can be assumed or made a separate field if needed
            let baseCallerLine = `- ${callerTypeString} | Verified`;


            // 3. Housekeeping (Email & ATP)
            let housekeepingDetails = [];
            if (emailChangedCheckbox.checked) {
                if (!newEmailInput.value.trim() || !newEmailInput.value.includes('@')) { // Basic email validation
                    highlightError(newEmailInput, 'Valid new email is required.');
                    isValid = false;
                } else {
                    housekeepingDetails.push(`Email updated to ${newEmailInput.value.trim()}`);
                }
            }
            if (atpChangedCheckbox.checked) {
                if (!newAtpOptionRadio.checked && !currentAtpOptionRadio.checked) {
                    highlightError(atpOptionsWrapperDiv, 'Select New or Current ATP option.'); // Highlight the wrapper or radio labels
                    isValid = false;
                } else if (newAtpOptionRadio.checked) {
                    if (!newAtpNameInput.value.trim() || !newAtpRelationshipInput.value.trim()) {
                        highlightError(newAtpRelationshipInput, 'ATP Name and Relationship are required for New ATP.');
                        if(!newAtpNameInput.value.trim()) highlightError(newAtpNameInput);
                        isValid = false;
                    } else {
                        let atpInfo = `New ATP Added: ${newAtpNameInput.value.trim()} (${newAtpRelationshipInput.value.trim()})`;
                        if(newAtpEmailInput.value.trim()) atpInfo += `, Email: ${newAtpEmailInput.value.trim()}`;
                        if(newAtpPhoneInput.value.trim()) atpInfo += `, Phone: ${newAtpPhoneInput.value.trim()}`;
                        housekeepingDetails.push(atpInfo);
                    }
                } else if (currentAtpOptionRadio.checked) {
                     // For current ATP, check if at least one field is filled for an update
                    if (!currentAtpNameInput.value.trim() && !currentAtpEmailInput.value.trim() && !currentAtpPhoneInput.value.trim()) {
                        highlightError(currentAtpNameInput, 'Enter at least one detail to update for Current ATP.');
                        isValid = false;
                    } else {
                        let atpUpdates = [];
                        if(currentAtpNameInput.value.trim()) atpUpdates.push(`Name to ${currentAtpNameInput.value.trim()}`);
                        if(currentAtpEmailInput.value.trim()) atpUpdates.push(`Email to ${currentAtpEmailInput.value.trim()}`);
                        if(currentAtpPhoneInput.value.trim()) atpUpdates.push(`Phone to ${currentAtpPhoneInput.value.trim()}`);
                        housekeepingDetails.push(`Current ATP Updated: ${atpUpdates.join(', ')}`);
                    }
                }
            }

            if (housekeepingDetails.length > 0) {
                noteLines.push(baseCallerLine); // Add base caller line first
                housekeepingDetails.forEach(detail => noteLines.push(`- ${detail}`));
            } else {
                 noteLines.push(`${baseCallerLine} | Housekeeping NCM`); // NCM = No Changes Made
            }


            // 4. Handle "No Answer" vs "Answered Call"
            if (noAnswerCheckbox.checked) {
                noteLines.push(`- No answer`);
                if (outboundActionsDropdown.value) {
                    noteLines.push(`- ${outboundActionsDropdown.value}`);
                }
            } else { // Answered Call Details
                if (!customerConcernTextarea.value.trim() && !processPaymentCheckbox.checked) { // Require concern if not processing payment
                    highlightError(customerConcernTextarea, 'Customer concern is required if not processing a payment.');
                    isValid = false;
                }
                if (customerConcernTextarea.value.trim()) {
                     noteLines.push(`- Concern: ${customerConcernTextarea.value.trim()}`);
                }
                if (interactionCategorySelect.value === 'Collections Call' && reasonForCallCollectionsSelect.value) {
                    noteLines.push(`- Reason (Collections): ${reasonForCallCollectionsSelect.value}`);
                }
                if (discussionNotesTextarea.value.trim()) {
                    noteLines.push(`- Discussion: ${discussionNotesTextarea.value.trim()}`);
                }
                if (addBankCheckbox.checked) noteLines.push('- Cust add bsb. sent direct debit form');
                if (addCardCheckbox.checked) {
                    if (lastFourInput.value.length !== 4) {
                        highlightError(lastFourInput, 'Last 4 digits of card required.');
                        isValid = false;
                    } else {
                        noteLines.push(`- Added new card ending in ${lastFourInput.value}`);
                    }
                }

                // Payment Processing (if answered and payment checkbox checked)
                if (processPaymentCheckbox.checked) {
                    const selectedPaymentType = document.querySelector('input[name="paymentTypeUnified"]:checked');
                    if (!selectedPaymentType) {
                        highlightError(paymentDetailsUnifiedDiv, 'Select a payment type.'); // Highlight a parent div or the radio group
                        isValid = false;
                    } else {
                        switch (selectedPaymentType.value) {
                            case 'OnceOff':
                                if (!onceOffPaymentAmountInput.value.trim() || parseFloat(onceOffPaymentAmountInput.value) <= 0) {
                                    highlightError(onceOffPaymentAmountInput, 'Valid amount for once-off payment required.');
                                    isValid = false;
                                } else {
                                    noteLines.push(`- Processed once-off payment of $${parseFloat(onceOffPaymentAmountInput.value).toFixed(2)} | Advised $2.95 fee`);
                                }
                                break;
                            case 'Scheduled':
                                let paymentCount = 0, totalAmount = 0;
                                const amountInputs = amountInputsContainer.querySelectorAll('.amount-input');
                                amountInputs.forEach(input => {
                                    const amount = parseFloat(input.value);
                                    if (!isNaN(amount) && amount > 0) {
                                        paymentCount++;
                                        totalAmount += amount;
                                    }
                                });
                                if (paymentCount === 0) {
                                    highlightError(amountInputsContainer.querySelector('.amount-input') || amountInputsContainer, 'Enter at least one valid scheduled payment amount.');
                                    isValid = false;
                                }
                                const selectedStatus = document.querySelector('input[name="accountStatus"]:checked');
                                if (!selectedStatus) {
                                    highlightError(scheduledPaymentFieldsDiv.querySelector('.radio-group') || scheduledPaymentFieldsDiv, 'Select account status for scheduled payment.');
                                    isValid = false;
                                }
                                if (isValid) { // only push if valid so far for this block
                                    const paymentStrings = ["Zero", "One", "Two", "Three", "Four", "Five"]; // from collections
                                    const countString = paymentCount < paymentStrings.length ? paymentStrings[paymentCount] : paymentCount;
                                    let statusString = selectedStatus.value === 'Current' ? 'Acc back to current' : 'Acc still in arrears';
                                    noteLines.push(`- ${countString} payment${paymentCount > 1 ? 's' : ''} taken [$${totalAmount.toFixed(2)} in total]. ${statusString}`);
                                    if (selectedStatus.value === 'Current') {
                                         // Add "Collections closed" before EOC if applicable
                                    }
                                }
                                break;
                            case 'PDADV':
                                const selectedPdAdvSubType = document.querySelector('input[name="pdAdvSubType"]:checked');
                                if (!selectedPdAdvSubType) {
                                    highlightError(pdAdvPaymentFieldsDiv.querySelector('.radio-group') || pdAdvPaymentFieldsDiv, 'Select PD/ADV sub-type (Advance or Past Due).');
                                    isValid = false;
                                } else if (selectedPdAdvSubType.value === 'Advance') {
                                    if (!advancePaymentAmountInput.value.trim() || parseFloat(advancePaymentAmountInput.value) <= 0) {
                                        highlightError(advancePaymentAmountInput, 'Valid amount for advance payment required.');
                                        isValid = false;
                                    } else {
                                        noteLines.push(`- Processed advance payment of $${parseFloat(advancePaymentAmountInput.value).toFixed(2)}`);
                                    }
                                } else if (selectedPdAdvSubType.value === 'PastDue') {
                                    if (!pastDuePaymentAmountInput.value.trim() || parseFloat(pastDuePaymentAmountInput.value) <= 0) {
                                        highlightError(pastDuePaymentAmountInput, 'Valid amount for past due payment required.');
                                        isValid = false;
                                    }
                                    if (!daysPastDueInput.value.trim() || parseInt(daysPastDueInput.value) < 0) {
                                        highlightError(daysPastDueInput, 'Valid days past due required.');
                                        isValid = false;
                                    }
                                    if (isValid) { // only push if valid for this sub-block
                                        noteLines.push(`- Processed ${daysPastDueInput.value} days past due payment of $${parseFloat(pastDuePaymentAmountInput.value).toFixed(2)}`);
                                    }
                                }
                                break;
                        }
                    }
                }

                // Arrangement
                if (arrangementCheckbox.checked) {
                    if (!arrangementAmountInput.value.trim() || !arrangementDateInput.value) {
                        highlightError(arrangementAmountInput, 'Arrangement amount and date required.');
                        if(!arrangementDateInput.value) highlightError(arrangementDateInput);
                        isValid = false;
                    } else {
                        const [year, month, day] = arrangementDateInput.value.split('-');
                        noteLines.push(`- Arrangement for $${arrangementAmountInput.value} set for ${day}/${month}/${String(year).substring(2)}`);
                    }
                }

                // Hardship (already implies NPD move, so just note discussion)
                if (hardshipCheckbox.checked) {
                    noteLines.push(`- Hardship discussed`);
                    if (hardshipNpdDate) { // This is set when hardship checkbox is checked
                        const d = new Date(hardshipNpdDate); // Ensure it's a date object for formatting
                        const day = String(d.getDate()).padStart(2, '0');
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const year = String(d.getFullYear()).slice(-2);
                        noteLines.push(`- NPD moved to ${day}/${month}/${year} due to hardship.`);
                    }
                }

                // Agent Resolution
                if (agentResolutionTextarea.value.trim()) {
                     noteLines.push(`- Resolution: ${agentResolutionTextarea.value.trim()}`);
                } else if (!processPaymentCheckbox.checked && !arrangementCheckbox.checked && !hardshipCheckbox.checked) {
                    // If no specific action taken, resolution might be more important
                    highlightError(agentResolutionTextarea, "Agent resolution is required if no other action (payment, arrangement, hardship) is noted.");
                    isValid = false;
                }


                // Recap
                let recapItems = [];
                if (advisedNpdCheckbox.checked && advisedNpdInput.value && !hardshipCheckbox.checked) { // Don't double-log NPD if hardship already did
                    const [year, month, day] = advisedNpdInput.value.split('-');
                    recapItems.push(`Advised NPD will be ${day}/${month}/${String(year).substring(2)}`);
                } else if (advisedNpdCheckbox.checked && !advisedNpdInput.value && !advisedNpdInput.disabled) {
                    highlightError(advisedNpdInput, 'Advised NPD date required.');
                    isValid = false;
                }

                if (hardshipCheckbox.checked) { // Specific hardship recap line
                    recapItems.push(`Informed cust re: hardship process (5 business days, potential docs).`);
                }
                if (selfHelpCheckbox.checked) recapItems.push('Offered Self-Help');
                if (surveyCheckbox.checked) recapItems.push('Offered Survey');

                if (recapItems.length > 0) {
                    noteLines.push(`- Recap: ${recapItems.join(', ')}.`);
                }

                // Add "Collections closed" if account became current from scheduled payment
                const currentStatusRadio = document.getElementById('statusCurrent');
                if (currentStatusRadio && currentStatusRadio.checked && document.querySelector('input[name="paymentTypeUnified"]:checked')?.value === 'Scheduled') {
                    noteLines.push('- Collections closed');
                }
                noteLines.push('- EOC'); // End of Call for answered calls
            }

            if (!isValid) {
                showNotification("Please correct the highlighted errors.");
                return;
            }

            // Construct the final note string
            let finalNoteString = noteLines.map(line => {
                // Ensure lines starting with '-' have a space after it and are capitalized
                if (line.startsWith('- ')) return `- ${capitalizeFirstLetter(line.substring(2))}`;
                if (line.startsWith('-') && line.length > 1 && line[1] !== ' ') return `- ${capitalizeFirstLetter(line.substring(1))}`;
                return line; // For the main header line
            }).join('\n');

            // Append hardship answers if hardship was discussed
            if (hardshipCheckbox.checked) {
                const hardshipAnswers = getHardshipAnswers();
                if (hardshipAnswers) { // Ensure there are answers to append
                    finalNoteString += `\n\n\n${hardshipAnswers}`;
                }
            }

            navigator.clipboard.writeText(finalNoteString)
                .then(() => showNotification('Note copied to clipboard!'))
                .catch(err => {
                    console.error('Failed to copy note: ', err);
                    showNotification('Failed to copy. See console for details.');
                });
        });
    }

    // --- Initial Setup ---
    initializeForm(); // Set up the form on page load
    setInterval(updateClock, 1000); // Keep the clock live
});
