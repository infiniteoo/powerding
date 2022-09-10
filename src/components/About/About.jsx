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
            <strong>Link Management</strong>
          </h3>
          <p>
            I'm baby poke fingerstache coloring book big mood disrupt occupy
            paleo wayfarers wolf lumbersexual. Paleo iceland fixie vegan. Before
            they sold out food truck keytar echo park art party PBR&B lo-fi
            humblebrag swag blue bottle kinfolk. Chicharrones thundercats
            raclette sus same, austin try-hard literally palo santo twee pickled
            marfa biodiesel.
          </p>
        </div>
      </section>
      <section className="card">
        <img src={brandedlinks} alt="" />
        <div>
          <h3>
            <strong>Branded Links</strong>
          </h3>
          <p>
            I'm baby photo booth yuccie brunch cloud bread. Viral fixie cardigan
            photo booth YOLO trust fund kickstarter literally pour-over fit pork
            belly whatever vibecession mumblecore VHS. Kitsch bicycle rights
            seitan, irony butcher photo booth hot chicken succulents synth
            tousled tattooed narwhal knausgaard shabby chic. Coloring book
            iceland selvage ugh food truck, kitsch street art brunch scenester
            tilde cold-pressed yuccie. Fam snackwave truffaut mumblecore +1
            offal. Hashtag roof party helvetica, JOMO bushwick green juice etsy
            leggings. Twee woke shabby chic, umami hella chillwave taiyaki
            everyday carry echo park taxidermy wolf readymade fashion axe
            mustache bicycle rights.
          </p>
        </div>
      </section>
      <section className="card">
        <img src={mobilelinks} alt="" />
        <div>
          <h3>
            <strong>Mobile Links</strong>
          </h3>
          <p>
            I'm baby af paleo williamsburg bespoke pork belly live-edge
            asymmetrical snackwave cold-pressed kombucha trust fund. Deep v
            mlkshk four dollar toast organic plaid meggings glossier venmo sus
            skateboard direct trade yuccie twee chicharrones palo santo.
            Biodiesel fashion axe thundercats bitters bruh taxidermy VHS
            heirloom stumptown gluten-free squid godard gentrify readymade
            church-key. Ethical meditation hella kinfolk paleo. Man braid
            bitters direct trade hot chicken, scenester hell of mustache
            vibecession tattooed YOLO.
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
            I'm baby venmo cloud bread copper mug, street art occupy gochujang
            deep v iPhone knausgaard chia +1. PBR&B wolf cray, tonx shoreditch
            mixtape raclette kogi vape. Ugh squid echo park, brunch enamel pin
            mustache letterpress four dollar toast tote bag street art bruh
            tousled. Ramps wolf vibecession, tbh kombucha ennui pok pok.
            Wayfarers deep v franzen, salvia you probably haven't heard of them
            distillery pop-up artisan DIY tattooed try-hard skateboard. Gentrify
            cred vaporware glossier shabby chic.
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
            <strong>QR Codes</strong>
          </h3>
          <p>
            I'm baby green juice selvage try-hard lomo craft beer lyft
            fingerstache polaroid semiotics JOMO blog keffiyeh letterpress
            iceland. Helvetica polaroid pok pok listicle four dollar toast.
            Gochujang humblebrag crucifix DIY. Brunch vibecession craft beer you
            probably haven't heard of them, tumeric bushwick pinterest coloring
            book bruh mumblecore slow-carb photo booth.
          </p>
        </div>
      </section>
      {/*     </div> */}
    </Container>
  );
}
