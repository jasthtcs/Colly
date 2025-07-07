const hardshipQuestions = {
    unemployed: [
        { q: "How long have you been out of work?", type: "text", id: "hs_unemployed_duration" },
        { q: "Did you resign or were you made redundant?", type: "text", id: "hs_unemployed_reason" },
        { q: "If redundant, did you receive any redundancy pay?", type: "yesno", id: "hs_unemployed_redundancypay" },
        { q: "Are you currently looking for work?", type: "yesno", id: "hs_unemployed_lookingforwork" },
        { q: "Have you applied for Jobseeker benefits?", type: "yesno", id: "hs_unemployed_jobseeker" },
        { q: "If not eligible for Centrelink, why?", type: "text", placeholder: "e.g., Household income too high", id: "hs_unemployed_centrelink_ineligible" },
        { q: "When do you expect to be back at work?", type: "text", id: "hs_unemployed_expectedreturn" },
        { q: "Do you have any dependents?", type: "yesno", id: "hs_unemployed_dependents" },
        { q: "Do you have other loans or financial commitments?", type: "yesno", id: "hs_unemployed_otherloans" },
        { q: "How much can you afford to pay towards your loan?", type: "text", id: "hs_unemployed_affordability" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea", id: "hs_unemployed_resolution" }
    ],
    reducedIncome: [
        { q: "When did the income reduction happen?", type: "text", id: "hs_reducedincome_date" },
        { q: "Is this temporary or permanent?", type: "text", id: "hs_reducedincome_durationtype" },
        { q: "How much are you getting paid now?", type: "text", id: "hs_reducedincome_currentpay" },
        { q: "Are you looking for additional work?", type: "yesno", id: "hs_reducedincome_additionalwork" },
        { q: "Do you have any dependents?", type: "yesno", id: "hs_reducedincome_dependents" },
        { q: "Do you have other loans or financial commitments?", type: "yesno", id: "hs_reducedincome_otherloans" },
        { q: "How much can you afford to pay towards your loan?", type: "text", id: "hs_reducedincome_affordability" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea", id: "hs_reducedincome_resolution" }
    ],
    overcommitted: [
        { q: "What new purchases/loans caused this?", type: "text", id: "hs_overcommitted_cause" },
        { q: "Have your spending habits changed?", type: "yesno", id: "hs_overcommitted_spendinghabits" },
        { q: "Is this temporary or ongoing?", type: "text", id: "hs_overcommitted_durationtype" },
        { q: "If on Pension, what type?", type: "text", id: "hs_overcommitted_pensiontype" },
        { q: "Is this the same Pension as before?", type: "yesno", id: "hs_overcommitted_samepension" },
        { q: "How much do you receive per fortnight?", type: "text", id: "hs_overcommitted_pensionamount" },
        { q: "How much can you afford to pay towards your loan?", type: "text", id: "hs_overcommitted_affordability" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea", id: "hs_overcommitted_resolution" }
    ],
    unexpectedBills: [
        { q: "What sort of bills have come up?", type: "text", id: "hs_unexpected_billtype" },
        { q: "Is this a once-off or ongoing situation?", type: "text", id: "hs_unexpected_situationtype" },
        { q: "How much can you afford to pay now?", type: "text", id: "hs_unexpected_affordability" },
        { q: "Could you increase payments later to catch up?", type: "yesno", id: "hs_unexpected_catchup" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea", id: "hs_unexpected_resolution" }
    ],
    injuryIllness: [
         { q: "When did the injury/illness occur?", type: "text", id: "hs_injury_date" },
         { q: "What sort of injury/illness is it?", type: "text", id: "hs_injury_type" },
         { q: "Are you currently able to work?", type: "yesno", id: "hs_injury_abletowork" },
         { q: "Is this a permanent or temporary situation?", type: "text", id: "hs_injury_situationtype" },
         { q: "How long do you expect to be out of action?", type: "text", id: "hs_injury_duration" },
         { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea", id: "hs_injury_resolution" }
    ],
    familyBreakdown: [
        { q: "When did this occur?", type: "text", id: "hs_family_date" },
        { q: "How is this impacting your ability to make payments?", type: "textarea", id: "hs_family_impact" },
        { q: "Are you currently working?", type: "yesno", id: "hs_family_working" },
        { q: "How long do you need to get back on your feet?", type: "text", id: "hs_family_recoverytime" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea", id: "hs_family_resolution" }
    ],
    financialAbuse: [
        { q: "How long has this been happening?", type: "text", id: "hs_abuse_duration" },
        { q: "Are you taking steps to change the situation?", type: "yesno", id: "hs_abuse_steps" },
        { q: "Are you currently working?", type: "yesno", id: "hs_abuse_working" },
        { q: "How long do you need to get back on your feet?", type: "text", id: "hs_abuse_recoverytime" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea", id: "hs_abuse_resolution" }
    ],
    naturalDisaster: [
        { q: "What disaster has occurred?", type: "text", id: "hs_disaster_type" },
        { q: "How has this impacted your ability to make repayments?", type: "textarea", id: "hs_disaster_impact" },
        { q: "How much can you afford to pay?", type: "text", id: "hs_disaster_affordability" },
        { q: "How long do you need to get back on your feet?", type: "text", id: "hs_disaster_recoverytime" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea", id: "hs_disaster_resolution" }
    ],
    other: [
        { q: "What circumstances are impacting your repayments?", type: "textarea", id: "hs_other_circumstances" },
        { q: "Are you on the same pension as before?", type: "yesno", id: "hs_other_samepension" },
        { q: "How much do you receive per fortnight?", type: "text", id: "hs_other_pensionamount" },
        { q: "How are you planning to catch up on arrears later?", type: "textarea", id: "hs_other_catchup" },
        { q: "What resolution do you need? (Pause length, Reduced amount, etc.)", type: "textarea", id: "hs_other_resolution" }
    ]
};
// This file, hardshipData.js, solely exports the hardshipQuestions object.
// The main notes.js file will include this and use the object.
// No other JavaScript logic should be in this file.
