import demographics from "./demographics.json";

export const forms = {
  demographics: demographics,
};

export const parsingRules = {
  demographics: (fields) => {
    if (fields[0].value === "yes") {
      let racial_groups = fields
        .slice(28, 35)
        .filter((x) => x.value)
        .map((x) => x.name);
      if (fields[36].value !== undefined) {
        // if selected "other" for racial_groups
        const other_groups = fields[36].value.split(/;\s+|;/g).map((str) => {
          return str.toLowerCase().replaceAll(/\s+/g, "_");
        });
        racial_groups.push(...other_groups); // add the name of that other racial_group
      }

      let ethnic_groups = fields
        .slice(37, 58)
        .filter((x) => x.value)
        .map((x) => x.name);
      if (fields[59].value !== undefined) {
        // if selected "other" for ethnic_groups
        const other_groups = fields[59].value.split(/;\s+|;/g);
        ethnic_groups.push(...other_groups); // add the name of that other ethnic_groups
      }
      ethnic_groups = ethnic_groups.map((str) => {
        return str.toLowerCase().replaceAll(/\s+/g, "_");
      });

      return {
        how_are_you_feeling: parseInt(fields[1].value),
        current_symptoms: fields
          .slice(2, 20)
          .filter((x) => x.value)
          .map((x) => x.name),
        temperature: fields[21].value,
        temperature_scale: fields[22].value,
        fever_best_guess: fields[23].value,
        year_of_birth: fields[24].value,
        sex: fields[25].value,
        country: fields[26].value,
        zip_code: fields[27].value,
        racial_groups,
        ethnic_groups,
        email: fields[57].value,
      };
    }
    return {};
  },
};
