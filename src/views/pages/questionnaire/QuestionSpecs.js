

const symptom_names_and_labels = [
    { label: "Dry cough", name: 'dry_cough' },
    { label: "Loss of taste and/or smell", name: 'no_smell_taste' },
    { label: "Extreme fatigue", name: 'extreme_fatigue' },
    { label: "Wet cough", name: 'wet_cough' },
    { label: "Shortness of breath", name: 'dry_cough' },
    { label: "Abdominal pain", name: 'abdominal_pain' },
    { label: "Diarrhea", name: 'diarrhea' },
    { label: "Sore throat", name: 'sore_throat' },
    { label: "Chills", name: 'chills' },
    { label: "Nausea and/or vomiting", name: 'nausea_vomiting' },
    { label: "Pressure feeling in chest", name: 'pressure_chest' },
    { label: "Pink eye", name: 'pink_eye' },
    { label: "Other", name: 'other' },
]

const temp_guess_names_and_labels = [
    { label: "No fever", name: "no_fever" },
    { label: "Maybe feverish", name: "maybe_feverish" },
    { label: "Definitely feverish", name: "definitely_feverish" },
    { label: "Worst fever ever", name: "worst_fever" },
]

const self_tested_names_and_labels = [
    { label: "No", name: "self_not_tested" },
    { label: "Yes, tested positive", name: "self_tested_positive" },
    { label: "Yes, tested negative", name: "self_tested_negative" },
    { label: "Yes, awaiting results", name: "self_tested_waiting" },
]

const household_tested_names_and_labels = [
    { label: "No", name: "household_not_tested" },
    { label: "Yes, tested positive", name: "household_tested_positive" },
    { label: "Yes, tested negative", name: "household_tested_negative" },
    { label: "Yes, awaiting results", name: "household_tested_waiting" },
]

const age_names_and_labels = [
    { label: "Under 18", name: "under_18" },
    { label: "18-24", name: "18_24" },
    { label: "25-34", name: "25_34" },
    { label: "35-44", name: "35_44" },
    { label: "45-54", name: "45_54" },
    { label: "55-64", name: "55_64" },
    { label: "65-74", name: "65_74" },
    { label: "75 or older", name: "over_75" },
]

const sex_names_and_labels = [
    { label: "Male", name: "m" },
    { label: "Female", name: "f" },
    { label: "Prefer not to say", name: "na" },
]

const underlying_condition_names_and_labels = [
    { label: "High blood pressure", name: "high_blood_pressure" },
    { label: "Asthma", name: "asthma" },
    { label: "COPD/Emphysema", name: "copd_emphysema" },
    { label: "Chronic kidney disease", name: "chronic_kidney_disease" },
    { label: "Liver disease", name: "liver_disease" },
    { label: "Cancer", name: "cancer" },
    { label: "Diabetes", name: "diabetes" },
    { label: "Cardiovascular disease", name: "cardiovascular_disease" },
    { label: "HIV/AIDS", name: "hiv_aids" },
    { label: "BMI over 40", name: "bmi_over_40" },
]

export {
    symptom_names_and_labels,
    temp_guess_names_and_labels,
    self_tested_names_and_labels,
    household_tested_names_and_labels,
    age_names_and_labels,
    sex_names_and_labels,
    underlying_condition_names_and_labels,
}