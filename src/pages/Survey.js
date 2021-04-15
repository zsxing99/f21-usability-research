import React from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)'
  }
};

class SurveyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isCompleted: false };
    Survey
      .StylesManager
      .applyTheme("stone");
  }

  onComplete() {
    this.setState({ isCompleted: true });
    // TODO: send data to server
  }

  render() {
    var json = {
      questions: [
        {
          type: "matrix",
          name: "Quality",
          title: "Please indicate if you agree or disagree with the following statements",
          columns: [
            {
              value: 1,
              text: "Strongly Disagree"
            }, {
              value: 2,
              text: "Disagree"
            }, {
              value: 3,
              text: "Indifferent"
            }, {
              value: 4,
              text: "Agree"
            }, {
              value: 5,
              text: "Strongly Agree"
            }
          ],
          rows: [
            {
              value: "It is useful",
              text: "It does everything I would expect it to do"
            }, {
              value: "I am satisfied with it",
              text: "I would recommend it to a friend."
            }, {
              value: "It is easy to use",
              text: "I can use it without written instructions"
            }
          ]
        }
      ]
    };
    var onComplete = () => {
      this.setState({ isCompleted: true });
    }
    var surveyRender = !this.state.isCompleted ? (
				<Modal
						isOpen={!this.state.isCompleted}
            style={customStyles}
        >
          <Survey.Survey
            json={json}
            showCompletedPage={false}
            onComplete={onComplete}
          />
        </Modal>
    ) : null;

    return (
      <div>
        {surveyRender}
      </div>
    );
  }
}

export default SurveyComponent;