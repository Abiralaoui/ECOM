import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import Pagecollaborateur from "./components/Pagecollaborateur";
import Home from "./screens/Home";
import CollaborateurProfile from "./screens/CollaborateurProfile";
import ProductsDashboard from "./screens/ProductsDashboard";
import NewProduct from "./screens/NewProduct";
import Drafts from "./screens/Drafts";
import Released from "./screens/Released";
import Comments from "./screens/Comments";
import Scheduled from "./screens/Scheduled";
import Customers from "./screens/Customers";
import CustomerList from "./screens/CustomerList";
import Promote from "./screens/Promote";
import Notification from "./screens/Notification";
import Settings from "./screens/Settings";
import Profilecollaborateur from "./screens/Profilecollaborateur";
import UpgradeToPro from "./screens/UpgradeToPro";
import MessageCenter from "./screens/MessageCenter";
import ExploreCreators from "./screens/ExploreCreators";
import AffiliateCenter from "./screens/AffiliateCenter";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Earning from "./screens/Earning";
import Refunds from "./screens/Refunds";
import Payouts from "./screens/Payouts";
import Statements from "./screens/Statements";
import Shop from "./screens/Shop";
import supabase from "./utils/supabase";
import Enregistrement from "./screens/Enregistrement";
import Candidat from "./screens/SignUp/SignUpOptions/Candidat";
import Entreprise from "./screens/SignUp/SignUpOptions/Entreprise";
import Collaborateur from "./screens/SignUp/SignUpOptions/Collaborateur";
import PageEntreprise from "./components/PageEntreprise";
import EntrepriseProfile from "./screens/EntrepriseProfile";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Page title="Dashboard">
                <Home />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/Candidat"
          element={!user ? <Candidat /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/Collaborateur"
          element={!user ? <Collaborateur /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/Entreprise"
          element={!user ? <Entreprise /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/CollaborateurProfile"
          element={
            user ? (
              <Page title="CollaborateurProfile">
                <CollaborateurProfile/>
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        <Route
          path="/products/dashboard"
          element={
            user ? (
              <Page title="Products dashboard">
                <ProductsDashboard />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        <Route
          path="/promote"
          element={
            user ? (
              <PageEntreprise title="Products dashboard">
                <EntrepriseProfile />
              </PageEntreprise>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/products/add"
          element={
            user ? (
              <Page title="New product">
                <NewProduct />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/products/drafts"
          element={
            user ? (
              <Page title="Drafts">
                <Drafts />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/products/released"
          element={
            user ? (
              <Page title="Released">
                <Released />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/products/comments"
          element={
            user ? (
              <Page title="Comments">
                <Comments />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/products/scheduled"
          element={
            user ? (
              <Page title="Scheduled">
                <Scheduled />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/customers/overview"
          element={
            user ? (
              <Page title="Customers">
                <Customers />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/customers/customer-list"
          element={
            user ? (
              <Page title="Customer list">
                <CustomerList />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/shop"
          element={
            user ? (
              <Pagecollaborateur wide>
               <CollaborateurProfile/>
              </Pagecollaborateur>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/income/earning"
          element={
            user ? (
              <Page title="Earning">
                <Earning />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/income/refunds"
          element={
            user ? (
              <Page title="Refunds">
                <Refunds />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/income/payouts"
          element={
            user ? (
              <Page title="Payouts">
                <Payouts />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/income/statements"
          element={
            user ? (
              <Page title="Statements">
                <Statements />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/promote"
          element={
            user ? (
              <Page title="Promote">
                <Promote />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/notification"
          element={
            user ? (
              <Page title="Notification">
                <Notification />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            user ? (
              <Page title="Settings">
                <Settings />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
         <Route
          path="/settings/collaborateur"
          element={
            user ? (
              <Pagecollaborateur title="Information profile">
                 <Profilecollaborateur/>
              </Pagecollaborateur>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/upgrade-to-pro"
          element={
            user ? (
              <Page title="Upgrade to Pro">
                <UpgradeToPro />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/message-center"
          element={
            user ? (
              <Page title="Message center">
                <MessageCenter />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/explore-creators"
          element={
            user ? (
              <Page title="Explore creators">
                <ExploreCreators />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/affiliate-center"
          element={
            user ? (
              <Page title="Affiliate center">
                <AffiliateCenter />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route path="/sign-up" exact element={<SignUp />} />

        {/* <Route  path="/sign-up" element={() => <SignUp />} /> */}
        <Route
          path="/sign-in"
          element={!user ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/enregistrement"
          element={
            user ? (
              <Page title="Enregistrement">
                <Enregistrement />
              </Page>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        {/* <Route  path="/pagelist" component={PageList} /> */}
      </Routes>
    </Router>
  );
}

export default App;
