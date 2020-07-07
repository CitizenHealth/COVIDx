import demographics from "./demographics.json";

export const forms = {
  demographics,
};

export const parsingRules = {
  demographics: (fields) => {
    if (fields[0].value === "yes") {
      const multiple_choice_fields = ["current_symptoms", "race", "ethnicity"];
      let result = extractAnswers(
        fields.slice(1, fields.length),
        multiple_choice_fields
      );

      if (result.have_thermometer) {
        delete result.fever_best_guess;
      } else {
        delete result.temperature;
        delete result.temperature_scale;
      }
      delete result.have_thermometer;

      return result;
    }
    return {};
  },
};

const extractAnswers = (fields, multiple_choice_fields) => {
  let multiple_choice_ranges = [];
  let lowerEnd = -1;
  let finalResult = {};
  // process questions with single answer
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
      if (
        field.name === "how_are_you_feeling" ||
        field.name === "fever_best_guess"
      ) {
        finalResult[field.name] = parseInt(field.value);
      } else if (field.type === "tripetto-block-yes-no")
        finalResult[field.name] = field.value === "yes" ? true : false;
      else finalResult[field.name] = field.value;
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
        .split(/;\s+|;/g)
        .map((str) => {
          return str.toLowerCase().replaceAll(/[\s|-]+|-/g, "_");
        });
      choices.push(...other_groups);
    }
    if (finalResult.hasOwnProperty(other_label)) {
      delete finalResult[other_label];
    }
    finalResult[multiple_choice_fields[i]] = choices;
  });
  return finalResult;
};
