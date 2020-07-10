import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { IntlProvider, FormattedNumber } from "react-intl";
import { Link } from "react-router-dom";
import "./questionnaire.scss";

// dummy data
const dataFromServer = [
  {
    category: "Demographics",
    slug: "demographics",
    buttonText: "Check-in Today",
    peopleCheckedIn: 73200,
  },
  {
    category: "Medical History",
    slug: "medical_history",
    buttonText: "Start",
    peopleCheckedIn: 73200,
  },
  {
    category: "Emotional Health",
    slug: "emotional_health",
    buttonText: "Start",
    peopleCheckedIn: 73200,
  },
  {
    category: "Testing Questions",
    slug: "testing_questions",
    buttonText: "Start",
    peopleCheckedIn: 73200,
  },
  {
    category: "Personal Choices",
    slug: "personal_choices",
    buttonText: "Start",
    peopleCheckedIn: 69105,
  },
  {
    category: "Home Conditions",
    slug: "home_conditions",
    buttonText: "Start",
    peopleCheckedIn: 68478,
  },
  {
    category: "Work Conditions",
    slug: "work_conditions",
    buttonText: "Start",
    peopleCheckedIn: 68478,
  },
  {
    category: "Your City/State",
    slug: "your_city_state",
    buttonText: "Start",
    peopleCheckedIn: 73200,
  },
];

const QuestionnaireMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    setMenu(dataFromServer);
  }, []);
  return (
    <div id="questionnaire-menu" className="col-12 mx-auto">
      {menu.map((item, idx) => (
        <Card className="col-12 col-md-5 col-lg-5" key={idx}>
          <CardBody>
            <h3>{item.category}</h3>
            <Link to={`/health-report/${item.slug}`}>
              <Button className="button" color="primary" outline>
                {item.buttonText}
              </Button>
            </Link>
            <p>
              <span>
                <IntlProvider>
                  <FormattedNumber value={item.peopleCheckedIn} />
                </IntlProvider>
              </span>{" "}
              people have checked in today
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default QuestionnaireMenu;
