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
    const yes_no_skip = ["consent", "have_symptoms", "have_thermometer"];
    const numeric_fields = ["how_are_you_feeling", "fever_best_guess"];
    let result = extractAnswers(fields, yes_no_skip, numeric_fields);
    return result;
  },
  medical_history: (fields) => {
    const yes_no_skip = ["have_symptoms", "have_thermometer"];
    const numeric_fields = ["how_are_you_feeling", "fever_best_guess"];
    const multi_items_string_fields = ["medications"];
    let result = extractAnswers(
      fields,
      yes_no_skip,
      numeric_fields,
      multi_items_string_fields
    );
    return result;
  },
  testing_questions: (fields) => {
    const yes_no_skip = ["have_symptoms", "have_thermometer"];
    const numeric_fields = ["how_are_you_feeling", "fever_best_guess"];
    const date_fields = ["self_date_tested", "household_date_tested"];
    let result = extractAnswers(
      fields,
      yes_no_skip,
      numeric_fields,
      [],
      date_fields
    );
    return result;
  },
  emotional_health: (fields) => {
    const yes_no_skip = ["have_symptoms", "have_thermometer"];
    const numeric_fields = [
      "how_are_you_feeling",
      "fever_best_guess",
      "anxiety_level",
      "depression_level",
    ];
    let result = extractAnswers(fields, yes_no_skip, numeric_fields);
    return result;
  },
  personal_decisions: (fields) => {
    const yes_no_skip = ["have_symptoms", "have_thermometer"];
    const numeric_fields = [
      "how_are_you_feeling",
      "fever_best_guess",
      "how_do_you_feel_leaving_house",
    ];
    let result = extractAnswers(fields, yes_no_skip, numeric_fields);
    return result;
  },
  home_conditions: (fields) => {
    const yes_no_skip = ["have_symptoms", "have_thermometer"];
    const numeric_fields = ["how_are_you_feeling", "fever_best_guess"];
    let result = extractAnswers(fields, yes_no_skip, numeric_fields);
    return result;
  },
  work_conditions: (fields) => {
    const yes_no_skip = ["have_symptoms", "have_thermometer"];
    const numeric_fields = ["how_are_you_feeling", "fever_best_guess"];
    let result = extractAnswers(fields, yes_no_skip, numeric_fields);
    return result;
  },
  city_state_decisions: (fields) => {
    const yes_no_skip = ["have_symptoms", "have_thermometer"];
    const numeric_fields = [
      "how_are_you_feeling",
      "fever_best_guess",
      "governor_orders_rating",
    ];
    let result = extractAnswers(fields, yes_no_skip, numeric_fields);
    return result;
  },
};

const extractAnswers = (
  fields,
  yes_no_skip = [],
  numeric_fields = [],
  multi_items_string_fields = [],
  date_fields = []
) => {
  /**
   * A reusable function to extract essential data form survey response.
   * @param  {Array} fields                     The raw data got from the survey response.
   * @param  {Array} yes_no_skip                Labels for yes/no questions whose answers can be skipped
   * @param  {Array} numeric_fields             Text fields encoded in numeric values.
   * @param  {Array} multi_items_string_fields  Labels for string fields that describe multiple items
   * @param  {Array} date_fields                Text fields with date values.
   * @return {Object}                           Reduced object that only contains the necessary data.
   */

  let finalResult = {};
  let multiple_choice_fields = [];
  // process questions with single answers
  fields.forEach((field, i) => {
    if (
      (field.type === "tripetto-block-multiple-choice" ||
        field.type === "tripetto-block-checkboxes") &&
      typeof field.value === "boolean"
    ) {
      const fieldname = field.node.block.alias;
      if (field.value) {
        if (finalResult.hasOwnProperty(fieldname)) {
          finalResult[fieldname].push(field.name);
        } else {
          finalResult[fieldname] = [field.name];
          multiple_choice_fields.push(fieldname);
        }
      }
    } else if (field.type === "tripetto-block-yes-no") {
      if (field.value)
        finalResult[field.name] = field.value === "yes" ? true : false;
    } else {
      if (date_fields.includes(field.name)) {
        if (field.value !== undefined) {
          const date = new Date(field.string);
          if (date == "Invalid Date") {
            finalResult[field.name] = undefined;
            throw new Error("invalid date value at ", field.name);
          } else {
            finalResult[field.name] = field.string;
          }
        }
      } else finalResult[field.name] = field.value;
    }
  });

  // process questions with multiple choices
  multiple_choice_fields.forEach((fieldname) => {
    const choices = finalResult[fieldname];
    const other_label = fieldname + "_other";
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
    finalResult[fieldname] = choices;
  });

  yes_no_skip.forEach((item) => {
    delete finalResult[item];
  });

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
  // clean up invalid fields
  Object.keys(finalResult).forEach(
    (key) => finalResult[key] == null && delete finalResult[key]
  );
  return finalResult;
};
