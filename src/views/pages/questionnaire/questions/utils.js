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
  emotional_health: (fields) => {},
  testing_questions: (fields) => {},
  personal_decisions: (fields) => {},
  home_conditions: (fields) => {},
  work_conditions: (fields) => {},
  city_state_decisions: (fields) => {},
};

const extractAnswers = (
  fields,
  multiple_choice_fields = [],
  multi_items_string_fields = []
) => {
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
      if (lowerEnd === -1) {
        lowerEnd = i;
      }
      if (i === fields.length - 1 || field.node !== fields[i + 1].node) {
        multiple_choice_ranges.push([lowerEnd, i]);
        lowerEnd = -1;
      }
    } else {
      if (field.name === "how_are_you_feeling") {
        finalResult[field.name] = parseInt(field.value);
      } else if (field.name === "fever_best_guess") {
        if (field.value) {
          finalResult[field.name] = parseInt(field.value);
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
      const other_groups = finalResult[other_label].split(/;\s*/g);
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
    if (finalResult[field] === undefined) {
      finalResult[field] = [];
    } else {
      const items = finalResult[field]
        .split(/;\s*/g)
        .map((str) => str.toLowerCase().replace(/[\s|-]+|-/g, "_"));
      finalResult[field] = items;
    }
  });

  return finalResult;
};
