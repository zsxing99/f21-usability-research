import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { Container } from "react-bootstrap";
import ItemList from "./pages/ItemList.js";
import ItemListSub from "./pages/ItemListSub.js";

import VolunteerSignup from "./pages/VolunteerSignup";
import AvailabilityHealthStatus from "./pages/Availablity-HealthStatus";
import LockedVolunteer from "./pages/Locked-Volunteer";
import InfoPage from "./pages/Info";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import EditItems from "./pages/EditItems";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditItem from "./pages/EditItem";

import ViewRequests from "./pages/ViewRequests";
import ViewRequests2 from "./pages/ViewRequests2";
import DeliveryRequest2 from "./pages/DeliveryRequest2";
import DeliveryRequest from "./pages/DeliveryRequest";
import Chat from "./pages/Chat";
import Tabs from "./components/Tabs";

import Subscription from "./pages/Subscription";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useState } from "react";

function App() {
  const [requests, setRequests] = useState([]);
  const [volunteerLock, setVolunteerLock] = useState(false);

  return (
    <Container
      style={{
        maxWidth: "576px",
        height: "100vh",
        margin: "auto",
        marginTop: "6vh",
      }}
    >
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <VolunteerDashboard lock={volunteerLock} />}
          ></Route>
          <Route
            exact
            path="/locked"
            render={() => <LockedVolunteer lock={volunteerLock} />}
          ></Route>
          <Route exact path="/info" render={() => <InfoPage />}></Route>
          <Route
            exact
            path="/item-list"
            render={(props) => (
              <ItemList
                {...props}
                requests={requests}
                setRequests={setRequests}
              />
            )}
          ></Route>
          <Route exact component={EditItem} path="/edit-item-list/item"></Route>
          <Route
            exact
            path="/subscription-item-list"
            render={(props) => (
              <ItemListSub
                {...props}
                requests={requests}
                setRequests={setRequests}
              />
            )}
          ></Route>
          <Route
            exact
            path="/delivery-request"
            render={() => <DeliveryRequest />}
          ></Route>
          <Route
            exact
            path="/subscribe"
            render={() => <Subscription />}
          ></Route>
          <Route exact path="/login" render={() => <Login />}></Route>
          <Route exact path="/signup" render={() => <Signup />}></Route>
          <Route
            exact
            path="/view-volunteer-requests"
            render={() => <ViewRequests />}
          ></Route>
          <Route
            exact
            path="/view-complete-volunteer-requests"
            render={() => <ViewRequests2 />}
          ></Route>
          <Route
            exact
            path="/delivery-request-active"
            render={() => <DeliveryRequest2 />}
          ></Route>

          <Route
            exact
            path="/volunteer-signup"
            render={() => <VolunteerSignup />}
          ></Route>
          <Route
            exact
            path="/edit-volunteer-data"
            render={() => (
              <AvailabilityHealthStatus setVolunteerLock={setVolunteerLock} />
            )}
          ></Route>
          <Route
            exact
            path="/volunteer-dashboard"
            render={() => <VolunteerDashboard />}
          ></Route>
          <Route
            exact
            path="/edit-item-list"
            render={() => <EditItems />}
          ></Route>
          <Route exact path="/chat" render={() => <Chat />}></Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
