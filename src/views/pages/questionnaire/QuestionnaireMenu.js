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
    slug: "medical-history",
    buttonText: "Start",
    peopleCheckedIn: 73200,
  },
  {
    category: "Emotional Health",
    slug: "emotional-health",
    buttonText: "Start",
    peopleCheckedIn: 73200,
  },
  {
    category: "Testing Questions",
    slug: "testing-questions",
    buttonText: "Start",
    peopleCheckedIn: 73200,
  },
  {
    category: "Personal Choices",
    slug: "personal-choices",
    buttonText: "Start",
    peopleCheckedIn: 69105,
  },
  {
    category: "Work Conditions",
    slug: "work-conditions",
    buttonText: "Start",
    peopleCheckedIn: 68478,
  },
  {
    category: "Your City/State",
    slug: "your-city-state",
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
      {menu.map((item) => (
        <Card className="col-12 col-md-5 col-lg-5">
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
