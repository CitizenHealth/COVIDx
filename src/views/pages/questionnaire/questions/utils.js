import demographics from "./demographics.json";
import medical_history from "./medical_history.json";
import emotional_health from "./emotional_health.json";
import testing_questions from "./testing_questions.json";
import personal_decisions from "./personal_decisions";
import home_conditions from "./home_conditions";
import work_conditions from "./work_conditions";
import city_state_decisions from "./city_state_decisions";

export const forms = {
  demographics,
  medical_history,
  emotional_health,
  testing_questions,
  personal_decisions,
  home_conditions,
  work_conditions,
  city_state_decisions,
};

export const parsingRules = {
  demographics: (fields) => {
    if (fields[0].value === "yes") {
      const multiple_choice_fields = ["current_symptoms", "race", "ethnicity"];
      let result = extractAnswers(
        fields.slice(1, fields.length),
        multiple_choice_fields
      );
      return result;
    }
    return {};
  },
  medical_history: (fields) => {
    const multiple_choice_fields = ["current_symptoms", "medical_conditions"];
    const multi_items_string_fields = ["medications"];
    let result = extractAnswers(
      fields,
      multiple_choice_fields,
      multi_items_string_fields
    );
    return result;
  },
  testing_questions: (fields) => {
    const multiple_choice_fields = ["current_symptoms"];
    const date_fields = ["self_date_tested", "household_date_tested"];
    let result = extractAnswers(
      fields,
      multiple_choice_fields,
      [],
      date_fields
    );
    return result;
  },
  emotional_health: (fields) => {
    const multiple_choice_fields = [
      "current_symptoms",
      "mental_illnesses",
      "events_worries",
      "stress_reducing_methods",
    ];
    const numeric_fields = ["anxiety_level", "depression_level"];
    let result = extractAnswers(
      fields,
      multiple_choice_fields,
      [],
      [],
      numeric_fields
    );
    return result;
  },
  personal_decisions: (fields) => {
    const multiple_choice_fields = [
      "current_symptoms",
      "protective_measures_left_home",
      "protective_measures_enter_home",
      "exercises",
      "diets",
      "food_avoiding",
    ];
    const numeric_fields = ["how_do_you_feel_leaving_house"];
    let result = extractAnswers(
      fields,
      multiple_choice_fields,
      [],
      [],
      numeric_fields
    );
    return result;
  },
  home_conditions: (fields) => {
    const multiple_choice_fields = ["current_symptoms"];
    let result = extractAnswers(fields, multiple_choice_fields);
    return result;
  },
  work_conditions: (fields) => {
    const multiple_choice_fields = ["current_symptoms", "industry"];
    let result = extractAnswers(fields, multiple_choice_fields);
    return result;
  },
  city_state_decisions: (fields) => {
    const multiple_choice_fields = ["current_symptoms"];
    const numeric_fields = ["governor_orders_rating"];
    let result = extractAnswers(
      fields,
      multiple_choice_fields,
      [],
      [],
      numeric_fields
    );
    return result;
  },
};

const extractAnswers = (
  fields,
  multiple_choice_fields = [],
  multi_items_string_fields = [],
  date_fields = [],
  numeric_fields = []
) => {
  /**
   * A reusable function to extract essential data form survey response.
   * @param  {Array} fields                     The raw data got from the survey response.
   * @param  {Array} multiple_choice_fields     Labels for fields that allow multiple selections other the 'other' fields
   * @param  {Array} multi_items_string_fields  Labels for string fields that describe multiple items
   * @param  {Array} date_fields                Text fields with date values.
   * @param  {Array} numeric_fields             Text fields encoded in numeric values.
   * @return {Object}                           Reduced object that only contains the necessary data.
   */

  let multiple_choice_ranges = [];
  let lowerEnd = -1;
  let finalResult = {};
  // process questions with single answers
  fields.forEach((field, i) => {
    if (
      (field.type === "tripetto-block-multiple-choice" ||
        field.type === "tripetto-block-checkboxes") &&
      typeof field.value === "boolean"
    ) {
      // creating the range for multiple choice fields
      if (lowerEnd === -1) {
        lowerEnd = i;
      }
      if (i === fields.length - 1 || field.node !== fields[i + 1].node) {
        multiple_choice_ranges.push([lowerEnd, i]);
        lowerEnd = -1;
      }
    } else if (field.type === "tripetto-block-yes-no") {
      finalResult[field.name] = field.value === "yes" ? true : false;
    } else {
      if (field.name === "how_are_you_feeling") {
        finalResult[field.name] = parseInt(field.value);
      } else if (field.name === "fever_best_guess") {
        if (field.value) {
          finalResult[field.name] = parseInt(field.value);
        }
      } else if (date_fields.includes(field.name)) {
        if (field.value !== undefined) {
          const date = new Date(field.string);
          if (date !== "Invalid Date") {
            finalResult[field.name] = date;
          } else {
            throw new Error("invalid date value at ", field.name);
          }
        }
      } else finalResult[field.name] = field.value;
    }
  });

  // process questions with multiple choices
  multiple_choice_ranges.forEach((range, i) => {
    let choices = fields
      .slice(range[0], range[1] + 1)
      .filter((field) => field.value)
      .map((field) => field.name);
    const other_label = multiple_choice_fields[i] + "_other";
    if (
      choices.length > 0 &&
      choices[choices.length - 1].toLowerCase() === "other"
    ) {
      choices.pop();
      const other_groups = finalResult[other_label]
        ? finalResult[other_label]
            .split(/;\s*/g)
            .map((str) => str.toLowerCase().replace(/[\s|-]+|-/g, "_"))
        : [];
      choices.push(...other_groups);
    }
    if (finalResult.hasOwnProperty(other_label)) {
      delete finalResult[other_label];
    }
    finalResult[multiple_choice_fields[i]] = choices;
  });

  delete finalResult.have_thermometer;

  // process strings with multiple items
  multi_items_string_fields.forEach((field) => {
    const items = finalResult[field]
      ? finalResult[field]
          .split(/;\s*/g)
          .map((str) => str.toLowerCase().replace(/[\s|-]+|-/g, "_"))
      : [];
    finalResult[field] = items;
  });

  // process numeric fields
  numeric_fields.forEach((field) => {
    let n = finalResult[field];
    if (!isNaN(parseFloat(n)) && isFinite(n)) {
      finalResult[field] = parseFloat(n);
    }
  });
  Object.keys(finalResult).forEach(
    (key) => finalResult[key] == null && delete finalResult[key]
  );
  return finalResult;
};
