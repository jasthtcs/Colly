document.addEventListener('DOMContentLoaded', () => {
    const initialsInput = document.getElementById('initialsInput');
    const timestampSpan = document.getElementById('timestamp');
    
    const categorySelect = document.getElementById('category');
    const accountHolderRadio = document.getElementById('accountHolder');
    const atpRadio = document.getElementById('atp');

    const emailChangedCheckbox = document.getElementById('emailChanged');
    const newEmailGroup = document.getElementById('newEmailGroup');
    const newEmailInput = document.getElementById('newEmail');
    
    const atpChangedCheckbox = document.getElementById('atpChanged');
    const atpOptionsWrapper = document.getElementById('atpOptionsWrapper');
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
    
    const customerWantsToPayCheckbox = document.getElementById('customerWantsToPay');
    const paymentOptionsDiv = document.getElementById('paymentOptionsDiv');
    const paymentTypeOnceOffRadio = document.getElementById('paymentTypeOnceOff');
    const paymentTypePdAdvRadio = document.getElementById('paymentTypePdAdv');
    const onceOffPaymentDetailsDiv = document.getElementById('onceOffPaymentDetailsDiv');
    const onceOffPaymentAmountInput = document.getElementById('onceOffPaymentAmountInput');
    const pdAdvDetailsDiv = document.getElementById('pdAdvDetailsDiv');
    const pdAdvTypeAdvanceRadio = document.getElementById('pdAdvTypeAdvance');
    const pdAdvTypePastDueRadio = document.getElementById('pdAdvTypePastDue');
    const advancePaymentDetailsDiv = document.getElementById('advancePaymentDetailsDiv');
    const advancePaymentAmountInput = document.getElementById('advancePaymentAmount');
    const pastDuePaymentDetailsDiv = document.getElementById('pastDuePaymentDetailsDiv');
    const pastDuePaymentAmountInput = document.getElementById('pastDuePaymentAmount');
    const daysPastDueInput = document.getElementById('daysPastDue');

    const customerConcernTextarea = document.getElementById('customerConcern');
    const agentResolutionTextarea = document.getElementById('agentResolution');
    
    const advisedNPDCheckbox = document.getElementById('advisedNPD');
    const nextNPDDateInput = document.getElementById('nextNPDDate');
    const selfHelpCheckbox = document.getElementById('selfHelp');
    const surveyCheckbox = document.getElementById('survey');
        
    const newNoteButton = document.getElementById('newNoteButton');
    const copyToClipboardButton = document.getElementById('copyToClipboardButton');
    const notification = document.getElementById('notification');

    const activeSectionButton = document.getElementById('activeSectionButton');
    const sectionDropdownMenu = document.getElementById('sectionDropdownMenu');

    if (activeSectionButton) {
        activeSectionButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            if (sectionDropdownMenu) {
                sectionDropdownMenu.classList.toggle('show-dropdown');
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (sectionDropdownMenu && sectionDropdownMenu.classList.contains('show-dropdown')) {
            if (activeSectionButton && !activeSectionButton.contains(event.target) && !sectionDropdownMenu.contains(event.target)) {
                sectionDropdownMenu.classList.remove('show-dropdown');
            }
        }
    });

    function updateClock() {
        if (!timestampSpan) return;
        const now = new Date();
        
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strTime = `${hours}:${minutes} ${ampm}`;
        
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        
        timestampSpan.textContent = `${strTime} ${day}/${month}/${year}`;
    }
    setInterval(updateClock, 1000);

    if(initialsInput) {
        initialsInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            this.classList.remove('highlight-error');
        });
    }
    
    if(emailChangedCheckbox) {
        emailChangedCheckbox.addEventListener('change', function() {
            if (!newEmailGroup || !newEmailInput) return;
            newEmailGroup.style.display = this.checked ? 'block' : 'none';
            newEmailInput.disabled = !this.checked;
            if (!this.checked) {
                newEmailInput.value = '';
                newEmailInput.classList.remove('highlight-error');
            }
        });
    }

    [newAtpPhoneInput, currentAtpPhoneInput, onceOffPaymentAmountInput, advancePaymentAmountInput, pastDuePaymentAmountInput, daysPastDueInput].forEach(input => {
        if(input) input.addEventListener('input', function() {
            if (this.id === 'daysPastDue') { 
                 this.value = this.value.replace(/\D/g, '');
            } else if (this.type === 'text' && (this.id.includes('Amount') || this.id.includes('Phone'))) { 
                 this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                 if(this.id.includes('Phone')) this.value = this.value.replace(/\./g, '').substring(0,10); 
            }
            this.classList.remove('highlight-error');
        });
    });


    function updateAtpFieldsVisibility() {
        if (!atpChangedCheckbox || !atpOptionsWrapper || !newAtpOptionRadio || !currentAtpOptionRadio || !newAtpFieldsDiv || !currentAtpFieldsDiv) return;
        
        const isAtpChanged = atpChangedCheckbox.checked;
        atpOptionsWrapper.style.display = isAtpChanged ? 'block' : 'none';

        if (!isAtpChanged) {
            newAtpOptionRadio.checked = false;
            currentAtpOptionRadio.checked = false;
            newAtpFieldsDiv.style.display = 'none';
            currentAtpFieldsDiv.style.display = 'none';
            clearAndDisableAtpFields();
            return;
        }

        if (newAtpOptionRadio.checked) {
            newAtpFieldsDiv.style.display = 'flex';
            currentAtpFieldsDiv.style.display = 'none';
            enableNewAtpFields();
            disableCurrentAtpFields();
        } else if (currentAtpOptionRadio.checked) {
            newAtpFieldsDiv.style.display = 'none';
            currentAtpFieldsDiv.style.display = 'flex';
            disableNewAtpFields();
            enableCurrentAtpFields();
        } else {
            newAtpFieldsDiv.style.display = 'none';
            currentAtpFieldsDiv.style.display = 'none';
            clearAndDisableAtpFields();
        }
    }
    
    function clearAndDisableAtpFields() {
        const inputsToClear = [newAtpNameInput, newAtpEmailInput, newAtpPhoneInput, newAtpRelationshipInput, currentAtpNameInput, currentAtpEmailInput, currentAtpPhoneInput];
        inputsToClear.forEach(input => {
            if(input) {
                input.value = '';
                input.disabled = true;
                input.classList.remove('highlight-error');
            }
        });
        if(newAtpOptionRadio) newAtpOptionRadio.classList.remove('highlight-error');
        if(currentAtpOptionRadio) currentAtpOptionRadio.classList.remove('highlight-error');
    }

    function enableNewAtpFields() {
        [newAtpNameInput, newAtpEmailInput, newAtpPhoneInput, newAtpRelationshipInput].forEach(input => { if(input) input.disabled = false; });
        [currentAtpNameInput, currentAtpEmailInput, currentAtpPhoneInput].forEach(input => { if(input) { input.value = ''; input.disabled = true; }});
    }

    function enableCurrentAtpFields() {
        [currentAtpNameInput, currentAtpEmailInput, currentAtpPhoneInput].forEach(input => { if(input) input.disabled = false; });
        [newAtpNameInput, newAtpEmailInput, newAtpPhoneInput, newAtpRelationshipInput].forEach(input => { if(input) { input.value = ''; input.disabled = true; }});
    }
    function disableNewAtpFields() {
        [newAtpNameInput, newAtpEmailInput, newAtpPhoneInput, newAtpRelationshipInput].forEach(input => { if(input) input.disabled = true; });
    }
    function disableCurrentAtpFields() {
        [currentAtpNameInput, currentAtpEmailInput, currentAtpPhoneInput].forEach(input => { if(input) input.disabled = true; });
    }

    function resetAllPaymentFields() {
        if (paymentOptionsDiv) paymentOptionsDiv.style.display = 'none';
        if (onceOffPaymentDetailsDiv) onceOffPaymentDetailsDiv.style.display = 'none';
        if (pdAdvDetailsDiv) pdAdvDetailsDiv.style.display = 'none';
        if (advancePaymentDetailsDiv) advancePaymentDetailsDiv.style.display = 'none';
        if (pastDuePaymentDetailsDiv) pastDuePaymentDetailsDiv.style.display = 'none';

        if (paymentTypeOnceOffRadio) paymentTypeOnceOffRadio.checked = false;
        if (paymentTypePdAdvRadio) paymentTypePdAdvRadio.checked = false;
        if (pdAdvTypeAdvanceRadio) pdAdvTypeAdvanceRadio.checked = false;
        if (pdAdvTypePastDueRadio) pdAdvTypePastDueRadio.checked = false;

        [onceOffPaymentAmountInput, advancePaymentAmountInput, pastDuePaymentAmountInput, daysPastDueInput].forEach(input => {
            if (input) {
                input.value = '';
                input.classList.remove('highlight-error');
            }
        });
    }

    if (customerWantsToPayCheckbox) {
        customerWantsToPayCheckbox.addEventListener('change', function() {
            if (this.checked) {
                if (paymentOptionsDiv) paymentOptionsDiv.style.display = 'block';
            } else {
                resetAllPaymentFields();
            }
        });
    }

    if (paymentTypeOnceOffRadio) {
        paymentTypeOnceOffRadio.addEventListener('change', function() {
            if (this.checked) {
                if (onceOffPaymentDetailsDiv) onceOffPaymentDetailsDiv.style.display = 'block';
                if (pdAdvDetailsDiv) pdAdvDetailsDiv.style.display = 'none';
                if (advancePaymentDetailsDiv) advancePaymentDetailsDiv.style.display = 'none';
                if (pastDuePaymentDetailsDiv) pastDuePaymentDetailsDiv.style.display = 'none';
                if (pdAdvTypeAdvanceRadio) pdAdvTypeAdvanceRadio.checked = false;
                if (pdAdvTypePastDueRadio) pdAdvTypePastDueRadio.checked = false;
                [advancePaymentAmountInput, pastDuePaymentAmountInput, daysPastDueInput].forEach(input => {
                    if (input) input.value = '';
                });
            }
        });
    }
    
    if (paymentTypePdAdvRadio) {
        paymentTypePdAdvRadio.addEventListener('change', function() {
            if (this.checked) {
                if (pdAdvDetailsDiv) pdAdvDetailsDiv.style.display = 'block';
                if (onceOffPaymentDetailsDiv) onceOffPaymentDetailsDiv.style.display = 'none';
                if (onceOffPaymentAmountInput) onceOffPaymentAmountInput.value = '';
            }
        });
    }

    if (pdAdvTypeAdvanceRadio) {
        pdAdvTypeAdvanceRadio.addEventListener('change', function() {
            if (this.checked) {
                if (advancePaymentDetailsDiv) advancePaymentDetailsDiv.style.display = 'block';
                if (pastDuePaymentDetailsDiv) pastDuePaymentDetailsDiv.style.display = 'none';
                if (pastDuePaymentAmountInput) pastDuePaymentAmountInput.value = '';
                if (daysPastDueInput) daysPastDueInput.value = '';
            }
        });
    }

    if (pdAdvTypePastDueRadio) {
        pdAdvTypePastDueRadio.addEventListener('change', function() {
            if (this.checked) {
                if (pastDuePaymentDetailsDiv) pastDuePaymentDetailsDiv.style.display = 'block';
                if (advancePaymentDetailsDiv) advancePaymentDetailsDiv.style.display = 'none';
                if (advancePaymentAmountInput) advancePaymentAmountInput.value = '';
            }
        });
    }

    if(atpChangedCheckbox) {
        atpChangedCheckbox.addEventListener('change', () => {
            updateAtpFieldsVisibility();
            if (!atpChangedCheckbox.checked && newAtpOptionRadio && currentAtpOptionRadio) {
                newAtpOptionRadio.classList.remove('highlight-error');
                currentAtpOptionRadio.classList.remove('highlight-error');
            }
        });
    }
    [newAtpOptionRadio, currentAtpOptionRadio].forEach(radio => {
        if(radio) radio.addEventListener('change', () => {
            updateAtpFieldsVisibility();
            if (radio.checked && newAtpOptionRadio && currentAtpOptionRadio) {
                newAtpOptionRadio.classList.remove('highlight-error');
                currentAtpOptionRadio.classList.remove('highlight-error');
            }
        });
    });
    
    [newAtpNameInput, newAtpEmailInput, newAtpRelationshipInput, currentAtpNameInput, currentAtpEmailInput, customerConcernTextarea, agentResolutionTextarea].forEach(input => {
        if(input) input.addEventListener('input', function() { this.classList.remove('highlight-error'); });
    });
    if(nextNPDDateInput) nextNPDDateInput.addEventListener('change', function() { this.classList.remove('highlight-error'); });


    if(advisedNPDCheckbox) {
        advisedNPDCheckbox.addEventListener('change', function() {
            if(!nextNPDDateInput) return;
            nextNPDDateInput.disabled = !this.checked;
            if (this.checked) {
                if (nextNPDDateInput.showPicker) {
                    try { nextNPDDateInput.showPicker(); } catch (e) {}
                }
            } else {
                nextNPDDateInput.value = '';
                nextNPDDateInput.classList.remove('highlight-error');
            }
        });
    }

    function showNotification(message) {
        if(!notification) return;
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2500);
    }

    function initializeFormVisualState() {
        if(emailChangedCheckbox && newEmailGroup && newEmailInput) {
            newEmailGroup.style.display = emailChangedCheckbox.checked ? 'block' : 'none';
            newEmailInput.disabled = !emailChangedCheckbox.checked;
        }
        if(atpChangedCheckbox) {
           updateAtpFieldsVisibility();
        }
        if(advisedNPDCheckbox && nextNPDDateInput) {
            nextNPDDateInput.disabled = !advisedNPDCheckbox.checked;
        }
        if(customerWantsToPayCheckbox) { 
            paymentOptionsDiv.style.display = customerWantsToPayCheckbox.checked ? 'block' : 'none';
            if(customerWantsToPayCheckbox.checked) {
                onceOffPaymentDetailsDiv.style.display = paymentTypeOnceOffRadio.checked ? 'block' : 'none';
                pdAdvDetailsDiv.style.display = paymentTypePdAdvRadio.checked ? 'block' : 'none';
                if(paymentTypePdAdvRadio.checked) {
                    advancePaymentDetailsDiv.style.display = pdAdvTypeAdvanceRadio.checked ? 'block' : 'none';
                    pastDuePaymentDetailsDiv.style.display = pdAdvTypePastDueRadio.checked ? 'block' : 'none';
                } else {
                    advancePaymentDetailsDiv.style.display = 'none';
                    pastDuePaymentDetailsDiv.style.display = 'none';
                }
            } else {
                 resetAllPaymentFields();
            }
        } else {
            resetAllPaymentFields(); 
        }
    }
    
    if (newNoteButton) {
        newNoteButton.addEventListener('click', () => {
            if(accountHolderRadio) accountHolderRadio.checked = true;
            if(categorySelect) categorySelect.value = 'Inbound Call';
            
            if(emailChangedCheckbox) emailChangedCheckbox.checked = false;
            if(newEmailInput) newEmailInput.value = '';
            
            if(atpChangedCheckbox) atpChangedCheckbox.checked = false;
            if(newAtpOptionRadio) newAtpOptionRadio.checked = false;
            if(currentAtpOptionRadio) currentAtpOptionRadio.checked = false;

            if(customerWantsToPayCheckbox) customerWantsToPayCheckbox.checked = false; 
            resetAllPaymentFields(); 
            
            if(customerConcernTextarea) customerConcernTextarea.value = '';
            if(agentResolutionTextarea) agentResolutionTextarea.value = '';
            if(surveyCheckbox) surveyCheckbox.checked = false;
            
            if(advisedNPDCheckbox) advisedNPDCheckbox.checked = false;
            if(nextNPDDateInput) nextNPDDateInput.value = '';
            
            if(selfHelpCheckbox) selfHelpCheckbox.checked = false;

            const errorFields = [
                initialsInput, newEmailInput, newAtpNameInput, newAtpEmailInput, newAtpPhoneInput,
                newAtpRelationshipInput, currentAtpNameInput, currentAtpEmailInput, currentAtpPhoneInput,
                onceOffPaymentAmountInput, advancePaymentAmountInput, pastDuePaymentAmountInput, daysPastDueInput,
                customerConcernTextarea, agentResolutionTextarea, nextNPDDateInput, newAtpOptionRadio,
                currentAtpOptionRadio, advisedNPDCheckbox, selfHelpCheckbox, surveyCheckbox,
                paymentTypeOnceOffRadio, paymentTypePdAdvRadio, pdAdvTypeAdvanceRadio, pdAdvTypePastDueRadio
            ].filter(el => el);
            errorFields.forEach(el => el.classList.remove('highlight-error'));
            
            updateClock();
            initializeFormVisualState();
            if (initialsInput) initialsInput.focus();
        });
    }

    if(copyToClipboardButton) {
        copyToClipboardButton.addEventListener('click', () => {
            document.querySelectorAll('.highlight-error').forEach(el => el.classList.remove('highlight-error'));
            let isValid = true;
            
            const requiredElements = [
                initialsInput, timestampSpan, categorySelect, emailChangedCheckbox, newEmailInput,
                atpChangedCheckbox, newAtpOptionRadio, currentAtpOptionRadio, 
                newAtpRelationshipInput, currentAtpNameInput,
                currentAtpEmailInput, currentAtpPhoneInput, customerWantsToPayCheckbox,
                paymentTypeOnceOffRadio, paymentTypePdAdvRadio, onceOffPaymentAmountInput,
                pdAdvTypeAdvanceRadio, pdAdvTypePastDueRadio, advancePaymentAmountInput,
                pastDuePaymentAmountInput, daysPastDueInput, customerConcernTextarea,
                agentResolutionTextarea, advisedNPDCheckbox, nextNPDDateInput,
                selfHelpCheckbox, surveyCheckbox
            ];
            for (const el of requiredElements) {
                if (!el) {
                    console.error("A required DOM element is missing. Check element IDs.");
                    showNotification('Error: A required form element is missing.');
                    return; 
                }
            }
            
            const chosenInitials = initialsInput.value.trim();
            if (chosenInitials === '') {
                showNotification('Please enter your Initials.');
                initialsInput.classList.add('highlight-error');
                if(isValid) initialsInput.focus();
                isValid = false;
            }

            const callerTypeRadio = document.querySelector('input[name="callerType"]:checked');
            if (!callerTypeRadio) {
                showNotification('Please select a Caller Type.');
                [accountHolderRadio, atpRadio].filter(el => el).forEach(el => el.classList.add('highlight-error'));
                isValid = false;
            }
            
            if (emailChangedCheckbox.checked) {
                if (newEmailInput.value.trim() === '') {
                    showNotification('Please enter the new email address.');
                    newEmailInput.classList.add('highlight-error');
                    if(isValid) newEmailInput.focus();
                    isValid = false;
                }
            }

            if (atpChangedCheckbox.checked) {
                if (!newAtpOptionRadio.checked && !currentAtpOptionRadio.checked) {
                    showNotification('Please select either "New ATP" or "Current ATP".');
                    [newAtpOptionRadio, currentAtpOptionRadio].filter(el => el).forEach(el => el.classList.add('highlight-error'));
                    isValid = false;
                } else if (newAtpOptionRadio.checked) {
                    if (newAtpRelationshipInput.value.trim() === '') {
                        showNotification('Please enter Relationship for New ATP.');
                        newAtpRelationshipInput.classList.add('highlight-error');
                        if(isValid) newAtpRelationshipInput.focus();
                        isValid = false;
                    }
                }
            }

            let paymentIntentLineRaw = ""; 
            let paymentDetailLineRaw = "";  

            if (customerWantsToPayCheckbox.checked) {
                if (!paymentTypeOnceOffRadio.checked && !paymentTypePdAdvRadio.checked) {
                    showNotification('Please select a Payment Type.');
                    [paymentTypeOnceOffRadio, paymentTypePdAdvRadio].forEach(el => el.classList.add('highlight-error'));
                    isValid = false;
                } else if (paymentTypeOnceOffRadio.checked) {
                    paymentIntentLineRaw = "Customer wants to make a once-off payment";
                    if (onceOffPaymentAmountInput.value.trim() === '' || parseFloat(onceOffPaymentAmountInput.value.trim()) <= 0) {
                        showNotification('Please enter a valid amount for the payment.');
                        onceOffPaymentAmountInput.classList.add('highlight-error');
                        if(isValid) onceOffPaymentAmountInput.focus();
                        isValid = false;
                    } else {
                        paymentDetailLineRaw = `Processed once-off payment of $${parseFloat(onceOffPaymentAmountInput.value.trim()).toFixed(2)} | advised $2.95 processing fee`;
                    }
                } else if (paymentTypePdAdvRadio.checked) {
                    if (!pdAdvTypeAdvanceRadio.checked && !pdAdvTypePastDueRadio.checked) {
                        showNotification('Please select a Payment Option (Advance or Past Due).');
                        [pdAdvTypeAdvanceRadio, pdAdvTypePastDueRadio].forEach(el => el.classList.add('highlight-error'));
                        isValid = false;
                    } else if (pdAdvTypeAdvanceRadio.checked) {
                        paymentIntentLineRaw = "Customer wants to make an advance payment";
                        if (advancePaymentAmountInput.value.trim() === '' || parseFloat(advancePaymentAmountInput.value.trim()) <= 0) {
                            showNotification('Please enter a valid amount for Advance Payment.');
                            advancePaymentAmountInput.classList.add('highlight-error');
                            if(isValid) advancePaymentAmountInput.focus();
                            isValid = false;
                        } else {
                            paymentDetailLineRaw = `Process advance payment of $${parseFloat(advancePaymentAmountInput.value.trim()).toFixed(2)}`;
                        }
                    } else if (pdAdvTypePastDueRadio.checked) {
                        paymentIntentLineRaw = "Customer wants to make a past due payment"; 
                        const pastDueAmount = pastDuePaymentAmountInput.value.trim();
                        const daysDue = daysPastDueInput.value.trim();
                        if (pastDueAmount === '' || parseFloat(pastDueAmount) <= 0) {
                            showNotification('Please enter a valid amount for Past Due Payment.');
                            pastDuePaymentAmountInput.classList.add('highlight-error');
                            if(isValid) pastDuePaymentAmountInput.focus();
                            isValid = false;
                        }
                        if (daysDue === '' || parseInt(daysDue) < 0) { 
                            showNotification('Please enter valid Days Past Due.');
                            daysPastDueInput.classList.add('highlight-error');
                            if(isValid && !pastDuePaymentAmountInput.classList.contains('highlight-error')) daysPastDueInput.focus();
                            isValid = false;
                        }
                        if (isValid) { 
                             paymentDetailLineRaw = `Process ${daysDue} days past due payment of $${parseFloat(pastDueAmount).toFixed(2)}`;
                        }
                    }
                }
            }

            const mainConcernFromTextarea = customerConcernTextarea.value.trim();
            if (mainConcernFromTextarea === '' && !customerWantsToPayCheckbox.checked) { 
                showNotification('Please enter the Customer Concern or select a payment option.');
                customerConcernTextarea.classList.add('highlight-error');
                if(isValid) customerConcernTextarea.focus();
                isValid = false;
            }
            
            if (advisedNPDCheckbox.checked && nextNPDDateInput.value === '') {
                showNotification('Please select a date for Next NPD.');
                nextNPDDateInput.classList.add('highlight-error');
                if(isValid && !document.querySelector('.highlight-error')) nextNPDDateInput.focus();
                isValid = false;
            }

            if (!isValid) return;

            const currentTimestampVal = timestampSpan.textContent;
            const categoryVal = categorySelect.value;
            const callerTypeVal = callerTypeRadio ? callerTypeRadio.value : 'N/A';

            let fullNoteString = `${chosenInitials} ${currentTimestampVal} - ${categoryVal}\n`;
            let callerDesignation = callerTypeVal === 'Account Holder' ? 'Account Holder' : 'ATP';
            const verificationStatus = "Verified"; 
            
            let baseCallerLine = `  - ${callerDesignation} | ${verificationStatus}`;
            let specificHousekeepingLines = "";
            let hasSpecificHousekeeping = false;

            if (emailChangedCheckbox.checked && newEmailInput.value.trim()) {
                specificHousekeepingLines += `- Email updated to ${newEmailInput.value.trim()}\n`;
                hasSpecificHousekeeping = true;
            }

            if (atpChangedCheckbox.checked) {
                if (newAtpOptionRadio.checked && newAtpRelationshipInput.value.trim()) {
                    specificHousekeepingLines += `  -  New ATP Added | ${newAtpRelationshipInput.value.trim()}\n`;
                    hasSpecificHousekeeping = true;
                } else if (currentAtpOptionRadio.checked) {
                    let currentAtpDetailsArray = [];
                    if (currentAtpPhoneInput.value.trim()) currentAtpDetailsArray.push(currentAtpPhoneInput.value.trim());
                    if (currentAtpEmailInput.value.trim()) currentAtpDetailsArray.push(currentAtpEmailInput.value.trim());
                    if (currentAtpNameInput.value.trim()) currentAtpDetailsArray.push(currentAtpNameInput.value.trim()); 
                    
                    if (currentAtpDetailsArray.length > 0) {
                        specificHousekeepingLines += `  - ATP Details Updated | ${currentAtpDetailsArray.join(' | ')}\n`;
                        hasSpecificHousekeeping = true;
                    }
                }
            }

            if (hasSpecificHousekeeping) {
                fullNoteString += `${baseCallerLine}\n`;
                fullNoteString += specificHousekeepingLines;
            } else {
                fullNoteString += `${baseCallerLine} | Housekeeping - NCM\n`;
            }
            
            if (mainConcernFromTextarea) {
                 fullNoteString += `  - ${mainConcernFromTextarea}\n`;
            }
            if (paymentIntentLineRaw) {
                fullNoteString += `  - ${paymentIntentLineRaw}\n`;
            }
            if (paymentDetailLineRaw) {
                fullNoteString += `  - ${paymentDetailLineRaw}\n`;
            }

            const agentResolutionValue = agentResolutionTextarea.value.trim();
            if (agentResolutionValue) { 
                fullNoteString += ` - ${agentResolutionValue}\n`;
            }


            if (advisedNPDCheckbox.checked && nextNPDDateInput.value !== '') {
                const [year, month, day] = nextNPDDateInput.value.split('-');
                const formattedNPDDate = `${day}/${month}/${String(year).substring(2)}`;
                fullNoteString += `  - Advised NPD will be ${formattedNPDDate}.\n`;
            }
            if (selfHelpCheckbox.checked) {
                fullNoteString += `  - Self-Help option provided.\n`;
            }
            fullNoteString += `  - Survey ${surveyCheckbox.checked ? "offered" : "not offered"}\n`;
            fullNoteString += `  - EOC`;

            navigator.clipboard.writeText(fullNoteString)
                .then(() => showNotification('Note copied to clipboard!'))
                .catch(() => showNotification('Failed to copy note.'));
        });
    }
    
    updateClock();
    initializeFormVisualState();

});