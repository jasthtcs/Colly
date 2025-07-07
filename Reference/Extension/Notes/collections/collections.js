document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const initialsInput = document.getElementById('initialsInput');
    const timestampSpan = document.getElementById('timestamp');
    const collectionsForm = document.getElementById('collectionsForm');
    const noAnswerCheckbox = document.getElementById('noAnswerCheckbox');
    const paymentTakenCheckbox = document.getElementById('paymentTakenCheckbox');
    const actionsWrapper = document.getElementById('actionsWrapper');
    const actionsDropdown = document.getElementById('actionsDropdown');
    const answeredCallDetails = document.getElementById('answeredCallDetails');
    const emailChanged = document.getElementById('emailChanged');
    const newEmailGroup = document.getElementById('newEmailGroup');
    const newEmail = document.getElementById('newEmail');
    const atpChanged = document.getElementById('atpChanged');
    const atpOptionsWrapper = document.getElementById('atpOptionsWrapper');
    const newAtpOption = document.getElementById('newAtpOption');
    const currentAtpOption = document.getElementById('currentAtpOption');
    const newAtpFields = document.getElementById('newAtpFields');
    const currentAtpFields = document.getElementById('currentAtpFields');
    const newAtpInputs = [document.getElementById('newAtpName'), document.getElementById('newAtpEmail'), document.getElementById('newAtpPhone'), document.getElementById('newAtpRelationship')];
    const currentAtpInputs = [document.getElementById('currentAtpName'), document.getElementById('currentAtpEmail'), document.getElementById('currentAtpPhone')];
    const reasonForCall = document.getElementById('reasonForCall');
    const addBankCheckbox = document.getElementById('addBankCheckbox');
    const addCardCheckbox = document.getElementById('addCardCheckbox');
    const lastFourWrapper = document.getElementById('lastFourWrapper');
    const lastFourInput = document.getElementById('lastFourInput');
    const discussionNotes = document.getElementById('discussionNotes');
    const hardshipCheckbox = document.getElementById('hardshipCheckbox');
    const arrangementCheckbox = document.getElementById('arrangementCheckbox');
    const moveNpdWrapper = document.getElementById('moveNpdWrapper');
    const moveNpdDisplay = document.getElementById('moveNpdDisplay');
    const arrangementDetails = document.getElementById('arrangementDetails');
    const arrangementAmount = document.getElementById('arrangementAmount');
    const arrangementDate = document.getElementById('arrangementDate');
    const advisedNpdCheckbox = document.getElementById('advisedNpdCheckbox');
    const advisedNpdInput = document.getElementById('advisedNpdInput');
    const selfHelpCheckbox = document.getElementById('selfHelpCheckbox');
    const paymentDetails = document.getElementById('paymentDetails');
    const amountInputsContainer = document.getElementById('amountInputsContainer');
    const copyToClipboardButton = document.getElementById('copyToClipboardButton');
    const newNoteButton = document.getElementById('newNoteButton');
    const notification = document.getElementById('notification');
    const activeSectionButton = document.getElementById('activeSectionButton');
    const hardshipTabButton = document.getElementById('hardshipTabButton');
    const collectionsTabContent = document.getElementById('collectionsTabContent');
    const hardshipContentPanel = document.getElementById('hardshipContentPanel');
    const hardshipCategory = document.getElementById('hardshipCategory');
    const hardshipQuestionsContainer = document.getElementById('hardshipQuestionsContainer');
    const sectionDropdownMenu = document.getElementById('sectionDropdownMenu');
    let hardshipNpdDate = null;

    // --- Function Definitions ---
    function initializeForm() {
        const initials = initialsInput.value;
        const selectedAction = actionsDropdown.value;

        if(collectionsForm) collectionsForm.reset();
        
        if (selectedAction) {
            actionsDropdown.value = selectedAction;
        }

        initialsInput.value = initials;
        initialsInput.classList.remove('highlight-error');
        noAnswerCheckbox.checked = true;
        
        actionsWrapper.style.display = 'grid';
        answeredCallDetails.classList.add('hidden');
        paymentDetails.classList.add('hidden');
        newEmailGroup.style.display = 'none';
        atpOptionsWrapper.style.display = 'none';
        lastFourWrapper.style.display = 'none';
        arrangementDetails.classList.add('hidden');
        moveNpdWrapper.classList.add('hidden');
        hardshipTabButton.classList.add('hidden');
        advisedNpdInput.disabled = true;
        advisedNpdCheckbox.disabled = false;
        
        hardshipNpdDate = null;
        amountInputsContainer.innerHTML = '';
        renderHardshipQuestions();
        showPanel('collectionsTabContent');
    }

    function showPanel(panelId) {
        collectionsTabContent.classList.remove('active-content');
        hardshipContentPanel.classList.remove('active-content');
        activeSectionButton.classList.remove('active-tab');
        hardshipTabButton.classList.remove('active-tab');
        const panelToShow = document.getElementById(panelId);
        if (panelId === 'collectionsTabContent') { activeSectionButton.classList.add('active-tab'); } 
        else if (panelId === 'hardshipContentPanel') { hardshipTabButton.classList.add('active-tab'); }
        if(panelToShow) panelToShow.classList.add('active-content');
    }

    function updateClock() {
        if (!timestampSpan) return;
        const now = new Date();
        const localTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
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
    
    function setInputFilter(inputElement, isNumeric) {
        if (!inputElement) return;
        inputElement.addEventListener('input', function() {
            if(isNumeric) { this.value = this.value.replace(/\D/g, ''); } 
            else { this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); }
            this.classList.remove('highlight-error');
        });
    }

    function showNotification(message) {
        if (!notification) return;
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => { notification.classList.remove('show'); }, 2500);
    }
    
    function createAmountRow() {
        const row = document.createElement('div');
        row.className = 'form-group amount-row';
        row.innerHTML = `<label>Amount ($):</label><div class="amount-input-wrapper"><input type="text" class="amount-input" placeholder="0.00"></div>`;
        const input = row.querySelector('.amount-input');
        setInputFilter(input, false);
        amountInputsContainer.appendChild(row);
        updateActionButtons();
    }

    function updateActionButtons() {
        const allRows = amountInputsContainer.querySelectorAll('.amount-row');
        allRows.forEach((row, index) => {
            let wrapper = row.querySelector('.amount-input-wrapper');
            let existingButton = wrapper.querySelector('.action-button');
            if (existingButton) existingButton.remove();
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'action-button';
            if (index === allRows.length - 1) { button.textContent = '+'; button.classList.add('add-button'); } 
            else { button.textContent = '-'; button.classList.add('remove-button'); }
            wrapper.appendChild(button);
        });
    }
    
    function clearAndDisableAtpFields() {
        [newAtpOption, currentAtpOption].forEach(el => el.checked = false);
        [...newAtpInputs, ...currentAtpInputs].forEach(input => { if(input) {input.value = ''; input.disabled = true;} });
    }
    
    function updateAtpFieldsVisibility() {
        if (!atpChanged) return;
        atpOptionsWrapper.style.display = atpChanged.checked ? 'grid' : 'none';
        if (!atpChanged.checked) {
            clearAndDisableAtpFields();
            return;
        }
        newAtpFields.style.display = newAtpOption.checked ? 'flex' : 'none';
        currentAtpFields.style.display = currentAtpOption.checked ? 'flex' : 'none';
        newAtpInputs.forEach(input => {if(input) input.disabled = !newAtpOption.checked;});
        currentAtpInputs.forEach(input => {if(input) input.disabled = !currentAtpOption.checked;});
    }

    function getHardshipAnswers() {
        let answers = ['[Cust. Hardship Answers]'];
        const questions = hardshipQuestionsContainer.querySelectorAll('.hardship-question-group');
        questions.forEach((group) => {
            const label = group.querySelector('label').textContent;
            const textInput = group.querySelector('input[type="text"], textarea');
            const radioInput = group.querySelector('input[type="radio"]:checked');
            let answer = 'N/A';
            if(textInput && textInput.value.trim() !== '') { answer = textInput.value.trim(); } 
            else if (radioInput) { answer = radioInput.value; }
            answers.push(capitalizeFirstLetter(label));
            answers.push(`- ${capitalizeFirstLetter(answer)}`);
        });
        return answers.join('\n');
    }

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // --- Event Listener Setup ---
    newNoteButton.addEventListener('click', initializeForm);
    hardshipCategory.addEventListener('change', renderHardshipQuestions);
    hardshipTabButton.addEventListener('click', () => showPanel('hardshipContentPanel'));
    activeSectionButton.addEventListener('click', (event) => {
        event.stopPropagation();
        if (hardshipTabButton.classList.contains('hidden')) {
            sectionDropdownMenu.classList.toggle('show-dropdown');
        } else {
            showPanel('collectionsTabContent');
        }
    });
    document.addEventListener('click', (event) => {
        if (sectionDropdownMenu.classList.contains('show-dropdown')) {
            if (activeSectionButton && !activeSectionButton.contains(event.target) && !sectionDropdownMenu.contains(event.target)) {
                sectionDropdownMenu.classList.remove('show-dropdown');
            }
        }
    });
    noAnswerCheckbox.addEventListener('change', function() {
        if (this.checked) {
            initializeForm();
            initialsInput.focus();
        } else {
            answeredCallDetails.classList.remove('hidden');
            actionsWrapper.style.display = 'none';
            document.getElementById('callerTypeAH').checked = true;
        }
    });
    addCardCheckbox.addEventListener('change', function() {
        lastFourWrapper.style.display = this.checked ? 'flex' : 'none';
        if(!this.checked) { lastFourInput.value = ''; }
    });
    arrangementCheckbox.addEventListener('change', function(){
        arrangementDetails.classList.toggle('hidden', !this.checked);
        if(!this.checked){ arrangementAmount.value = ''; arrangementDate.value = '';}
    });
    hardshipCheckbox.addEventListener('change', function(){
        if(this.checked) {
            hardshipTabButton.classList.remove('hidden');
            moveNpdWrapper.classList.remove('hidden');
            let d = new Date();
            d.setDate(d.getDate() + 30);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = String(d.getFullYear()).slice(-2);
            hardshipNpdDate = d.toISOString().slice(0,10);
            moveNpdDisplay.textContent = `${day}/${month}/${year}`;
            advisedNpdCheckbox.checked = true;
            advisedNpdCheckbox.disabled = true;
            advisedNpdInput.value = hardshipNpdDate;
            advisedNpdInput.disabled = true;
        } else {
            hardshipTabButton.classList.add('hidden');
            moveNpdWrapper.classList.add('hidden');
            moveNpdDisplay.textContent = '';
            hardshipNpdDate = null;
            advisedNpdCheckbox.checked = false;
            advisedNpdCheckbox.disabled = false;
            advisedNpdInput.disabled = true;
            advisedNpdInput.value = '';
            showPanel('collectionsTabContent');
        }
    });
    advisedNpdCheckbox.addEventListener('change', function(){
        if (this.checked && !this.disabled) {
            advisedNpdInput.disabled = false;
            try { advisedNpdInput.showPicker(); } catch(e) { console.error(e); }
        } else if (!this.checked && !this.disabled) {
            advisedNpdInput.disabled = true;
            advisedNpdInput.value = '';
        }
    });
    paymentTakenCheckbox.addEventListener('change', function() {
        if (this.checked) {
            paymentDetails.classList.remove('hidden');
            if(amountInputsContainer.children.length === 0) { createAmountRow(); }
            document.getElementById('statusArrears').checked = true;
        } else {
            paymentDetails.classList.add('hidden');
            amountInputsContainer.innerHTML = '';
        }
    });
    emailChanged.addEventListener('change', function() { newEmailGroup.style.display = this.checked ? 'grid' : 'none'; if (!this.checked) { newEmail.value = ''; } });
    atpChanged.addEventListener('change', updateAtpFieldsVisibility);
    [newAtpOption, currentAtpOption].forEach(radio => radio.addEventListener('change', updateAtpFieldsVisibility));
    amountInputsContainer.addEventListener('click', function(event) { const target = event.target; if (target.matches('.add-button')) { createAmountRow(); } else if (target.matches('.remove-button')) { target.closest('.amount-row').remove(); updateActionButtons(); } });
    initialsInput.addEventListener('input', function() { this.value = this.value.toUpperCase(); this.classList.remove('highlight-error'); });
    setInputFilter(lastFourInput, true);
    [...newAtpInputs, ...currentAtpInputs].forEach(el => {if(el && el.id.includes('Phone')) setInputFilter(el, true)});
    setInputFilter(arrangementAmount, false);

    copyToClipboardButton.addEventListener('click', () => {
        document.querySelectorAll('.highlight-error').forEach(el => el.classList.remove('highlight-error'));
        let isValid = true;
        let finalNote = [];
        let hardshipNote = "";
        
        if (initialsInput.value.trim() === '') {
            showNotification('Please enter your Initials.');
            initialsInput.classList.add('highlight-error');
            return;
        }
        
        finalNote.push(`${initialsInput.value.trim()} ${timestampSpan.textContent}`);

        if (noAnswerCheckbox.checked) {
            finalNote.push('- No answer');
            const selectedAction = actionsDropdown.value;
            if (selectedAction) {
                finalNote.push(`- ${selectedAction}`);
            }
        } else {
            // This block now ONLY handles details for an ANSWERED call
            let callDetails = [], recap = [], housekeeping = [];
            const selectedCallerType = document.querySelector('input[name="callerType"]:checked');
            if (!selectedCallerType) {
                showNotification('Please select a Caller Type.');
                isValid = false;
            } else {
                if (selectedCallerType.value === 'AH') {
                    finalNote.push('- Account holder | Verified');
                } else {
                    finalNote.push(`- ${selectedCallerType.value}`);
                }
            }

            callDetails.push(`- Reason for call: ${reasonForCall.value}`);
            if (discussionNotes.value.trim() !== '') {
                callDetails.push(`- ${discussionNotes.value.trim()}`);
            }
            if (addBankCheckbox.checked) {
                callDetails.push(`- Cust add bsb. sent direct debit form`);
            }
            if (addCardCheckbox.checked) {
                if (lastFourInput.value.length === 4) {
                    callDetails.push(`- Added new card on the account ending in ${lastFourInput.value}`);
                } else {
                    showNotification('Please enter the last 4 digits of the card.');
                    lastFourInput.classList.add('highlight-error');
                    isValid = false;
                }
            }
            if (arrangementCheckbox.checked) {
                if (arrangementAmount.value && arrangementDate.value) {
                    const [year, month, day] = arrangementDate.value.split('-');
                    callDetails.push(`- Arrangement for $${arrangementAmount.value} set for ${day}/${month}/${String(year).substring(2)}`);
                } else {
                    showNotification('Please provide amount and date for the arrangement.');
                    isValid = false;
                }
            }
            if (hardshipCheckbox.checked) {
                callDetails.push(`- Hardship discussed`);
                if (hardshipNpdDate) {
                    const d = new Date(hardshipNpdDate);
                    const day = String(d.getDate()).padStart(2, '0');
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const year = String(d.getFullYear()).slice(-2);
                    callDetails.push(`- Npd moved to ${day}/${month}/${year}.`);
                }
            }
            finalNote.push(...callDetails);
        
            let housekeepingUpdated = false;
            if (emailChanged.checked && newEmail.value) {
                housekeeping.push(`- Email updated to ${newEmail.value}`);
                housekeepingUpdated = true;
            }
            if (atpChanged.checked) {
                housekeeping.push(`- Atp details updated`);
                housekeepingUpdated = true;
            }
            if (!housekeepingUpdated) {
                housekeeping.push(`- Housekeeping details are current`);
            }
            finalNote.push(...housekeeping);
            
            if (advisedNpdCheckbox.checked && advisedNpdInput.value) {
                const [year, month, day] = advisedNpdInput.value.split('-');
                recap.push(`- Advised npd will be ${day}/${month}/${String(year).substring(2)}`);
            }
            if (hardshipCheckbox.checked) {
                recap.push(`- Informed the customer we'll get back to them after 5 business days and might require some supporting documents.`);
                hardshipNote = getHardshipAnswers();
            }
            if (selfHelpCheckbox.checked) {
                recap.push(`- Offered self-help`);
            }
            finalNote.push(...recap);
            finalNote.push('- Eoc');
        }

        // --- PAYMENT LOGIC IS NOW HERE (INDEPENDENT) ---
        if (paymentTakenCheckbox.checked) {
            const amountInputs = amountInputsContainer.querySelectorAll('.amount-input');
            let paymentCount = 0, totalAmount = 0;
            amountInputs.forEach(input => {
                const amount = parseFloat(input.value);
                if (!isNaN(amount) && amount > 0) {
                    paymentCount++;
                    totalAmount += amount;
                }
            });
            if (paymentCount === 0) {
                showNotification('Please enter at least one valid payment amount.');
                amountInputsContainer.querySelector('.amount-input').classList.add('highlight-error');
                isValid = false;
            }
            const selectedStatus = document.querySelector('input[name="accountStatus"]:checked');
            if (!selectedStatus) {
                showNotification('Please select an account status.');
                isValid = false;
            }
            if (isValid) {
                const paymentStrings = ["Zero", "One", "Two", "Three", "Four", "Five"];
                const countString = paymentCount < paymentStrings.length ? paymentStrings[paymentCount] : paymentCount;
                let statusString = selectedStatus.value === 'Current' ? 'Acc back to current' : 'Acc still in arrears';
                finalNote.push(`- ${countString} payment${paymentCount > 1 ? 's' : ''} taken [$${totalAmount.toFixed(2)} in total]. ${statusString}`);
                if (selectedStatus.value === 'Current') {
                    const eocIndex = finalNote.indexOf('- Eoc');
                    if (eocIndex !== -1) {
                        finalNote.splice(eocIndex, 0, '- Collections closed');
                    } else {
                        finalNote.push('- Collections closed');
                    }
                }
            }
        }
        
        if (!isValid) return;

        let fullNote = finalNote.map(line => line.startsWith('-') ? `- ${capitalizeFirstLetter(line.substring(2))}` : line).join('\n');
        if(hardshipNote) {
            fullNote += `\n\n\n${hardshipNote}`;
        }

        navigator.clipboard.writeText(fullNote)
            .then(() => showNotification('Note copied to clipboard!'))
            .catch(() => showNotification('Failed to copy note.'));
    });
    
    // --- Initial Setup ---
    initializeForm();
    setInterval(updateClock, 1000);
});