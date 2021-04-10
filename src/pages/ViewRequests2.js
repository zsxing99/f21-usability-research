import Calendar from "../calendar/calendar2";

export default function ViewRequests2() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <div className="library-fontello">
        <i
          className="icon-left-open back"
          // onClick={() => {
          //     history.push('/item-list');
          // }}
        ></i>
      </div>
      <div className="title">
        <h2>Your Service Requests</h2>
      </div>

      <div className="body">
        <div class="table">
          <div>
            <h2>Delivery Requests Today</h2>

            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>By</th>
                  <th>Type</th>

                  <th>
                    {" "}
                    <div className="library-fontello">
                      <i class="icon-basket"></i>{" "}
                    </div>
                  </th>
                </tr>
              </thead>

              <tr>
                <td>6 PM</td>
                <td>Mary</td>
                <td>Subscription</td>
                <div>
                  {" "}
                  <a href="#">
                    {" "}
                    <td>Received</td>
                  </a>{" "}
                </div>
              </tr>
            </table>
          </div>
          <br />
          <h2>Upcoming requests this Week </h2>
          <br />
        </div>

        <div align="center"></div>
        <div class="ex1">
          <div className="calendar">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}
