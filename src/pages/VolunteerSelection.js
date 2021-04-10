import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function VolunteerSelection(props) {
  const [volunteers, setVolunteers] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setVolunteers([
      { name: "Caleb Jones", img: "picture caleb" },
      { name: "Bertram Gilfoyle", img: "picture bertram" },
      { name: "Walter White", img: "picture walter" },
      { name: "John Watson", img: "picture john" },
    ]);
  }, []);

  function onClick(e) {
    const target = e.target;
    // console.log(e.target.textContent);
    setSelected(target.textContent);
  }

  function setVolunteer(e) {
    e.preventDefault();
    //console.log(startDate + streetAddress + city + state + zipCode + frequency);
    props.setRequests(
      props.requests.map((request, ind) => {
        if (ind === props.requests.length - 1) {
          return { ...request, volunteer: selected };
        } else {
          return request;
        }
      })
    );

    alert("Your on-demand request has been submitted");
    props.history.push("/user-home");
  }

  return (
    <>
      <div className="title">Volunteer Selection</div>
      <div className="body">
        <h2>Select a Nearby Volunteer</h2>
        {volunteers &&
          volunteers.map((volunteer) => {
            return (
              <div
                class="request-1-head"
                onClick={onClick}
                key={volunteer.name}
                style={{
                  backgroundColor:
                    selected === volunteer.name ? "white" : "#d6d5d8",
                }}
              >
                <div class={volunteer.img}></div>
                <div class="req-item">
                  <div class="request-name">{volunteer.name}</div>
                </div>
              </div>
            );
          })}
        <Button
          type="submit"
          onClick={setVolunteer}
          style={{ float: "right", marginTop: "20px" }}
        >
          Request
        </Button>
      </div>
    </>
  );
}
