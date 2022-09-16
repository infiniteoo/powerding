import React, { useLayoutEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import amfmfxLogo from "../../assets/amfmfx.com text logo.png";
import analytics from "../../imgs/eyeball.svg";
import brandedlinks from "../../imgs/videographer.svg";
import campaigns from "../../imgs/videogames.svg";
import linkmanagement from "../../imgs/savings.svg";
import mobilelinks from "../../imgs/streamer.svg";
import qrcodes from "../../imgs/programmer.svg";

import "./pages.css";

export default function Why() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Container style={{ marginTop: "100px" }}>
      {/* <img src={amfmfxLogo} alt="" /> */}

      <section className="card">
        <img src={linkmanagement} alt="" />
        <div>
          <h3>
            <strong>What We Do</strong>
          </h3>
          <p>
            PowerDing is a a livestream text-to-speech (TTS) platform that accepts donations for your favorite content creators.  When submitted, your message is read aloud along with playing accompanying YouTube links.  The streamer can respond to your message.
          </p>
        </div>
      </section>
      <section className="card">
        <img src={brandedlinks} alt="" />
        <div>
          <h3>
            <strong>Secure Platform</strong>
          </h3>
          <p>
            PowerDing is a secure platform developed with the latest technologies.  We use the latest encryption and security protocols to ensure your data is safe and your anonymity remains intact.  No federal agencies have access to your data and we remain a proud, neutral platform.
          </p>
        </div>
      </section>
      <section className="card">
        <img src={mobilelinks} alt="" />
        <div>
          <h3>
            <strong>Content Creators</strong>
          </h3>
          <p>
            PowerDing is pro content creator, and a champion of free speech and expression for all sides of the isle.  We take no sides and claim no allegiance to any group.  We are a platform for content creators to earn a living and for their fans to support them.  
          </p>
        </div>
      </section>
      <section className="card">
        <img src={campaigns} alt="" />
        <div>
          <h3>
            <strong>Campaigns</strong>
          </h3>
          <p>
            I'm baby venmo cloud bread copper mug.
          </p>
        </div>
      </section>   
      <section className="card">
        <img src={analytics} alt="" />
        <div>
          <h3>
            <strong>Management & Analytics</strong>
          </h3>
          <p>
            I'm baby dSA hammock you probably haven't heard of them godard. Man
            braid vape ascot iPhone. Kinfolk VHS gatekeep, slow-carb vice
            distillery tacos lomo authentic XOXO ramps hexagon. Mustache
            adaptogen selvage chambray gastropub affogato microdosing, +1 squid
            food truck deep v. Keffiyeh ennui Brooklyn umami literally.
            Farm-to-table microdosing gatekeep plaid migas, offal retro fam you
            probably haven't heard of them cliche yes plz lumbersexual ethical
            flannel raclette.
          </p>
        </div>
      </section>
      <section className="card">
        <img src={qrcodes} alt="" />
        <div>
          <h3>
            <strong>About Us</strong>
          </h3>
          <p>
            PowerDing is the creation of Troy Dorman, an indepedent, dissident developer and entreprenur.  This website was primarly created as a way to learn and experiment with new technologies.  It is a work in progress and will be updated frequently.  If you have any questions or comments, please feel free to contact us.  <a href="mailto:troydorman@gmail.com">troydorman@gmail.com</a>
          </p>
        </div>
      </section>
      {/*     </div> */}
    </Container>
  );
}
