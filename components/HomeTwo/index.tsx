"use client";

import bannerBg from "@/public/static/images/Home/banner.webp";
import floatfish from "@/public/static/images/Home/FloatFishesGroup.webp";
import floatfish1 from "@/public/static/images/Home/FloatFishesGroup1.webp";
import floatfishOpposite from "@/public/static/images/Home/FloatFishesGroupOpposite.webp";
import alonefish from "@/public/static/images/Home/LoneFish.webp";
import alonefish1 from "@/public/static/images/Home/LoneFish1.webp";
import alonefish2 from "@/public/static/images/Home/LoneFish2.webp";
import bannerBgMobile from "@/public/static/images/Home/mobile/bannerMobile.webp";
import floatfishMob from "@/public/static/images/Home/mobile/FloatFishesGroupMob.webp";
import MrChing from "@/public/static/images/Home/MrChing.webp";
import TankGlass from "@/public/static/images/Home/TankGlass.webp";
import tentacle from "@/public/static/images/Home/Tentacle.webp";
import { Howl } from "howler";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoUnmute } from "react-icons/go";
import { VscMute } from "react-icons/vsc";
import { Parallax } from "react-parallax";
import BackgroundSection from "./BackgroundSection";
import JoinUsSections from "./JoinUsSections";
import LandingSection from "./LandingSection";

const HomePageContent = () => {
  const [isMdOrLarger, setIsMdOrLarger] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    // Function to check screen size
    const handleResize = () => {
      setIsMdOrLarger(window.innerWidth >= 480); // Adjust this value according to your `md` breakpoint
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Initialize Howl with the audio file
    const backgroundSound = new Howl({
      src: ["/static/audio/fish.mp3"],
      loop: true,
      autoplay: true,
      volume: 1.0,
    });

    // Store the Howl instance in state
    setSound(backgroundSound);

    // Play the sound
    backgroundSound.play();

    return () => {
      // Clean up Howl instance on unmount
      backgroundSound.unload();
    };
  }, []);

  const toggleMute = () => {
    if (sound) {
      if (isMuted) {
        sound.mute(false);
        console.log("Sound unmuted");
      } else {
        sound.mute(true);
        console.log("Sound muted");
      }
      setIsMuted(!isMuted);
    } else {
      console.log("Sound instance not available");
    }
  };

  return (
    <main id="home-page-main" style={{ position: "relative", zIndex: 5 }}>
      {/* Mute/Unmute Button */}
      {isMdOrLarger ? (
        <button
          onClick={toggleMute}
          style={{
            position: "fixed",
            bottom: "2vw",
            right: "2vw",
            padding: "1vw",
            zIndex: 9999,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "3vw",
            color: "#888888",
          }}
        >
          {isMuted ? <VscMute /> : <GoUnmute style={{ color: "#FFA500" }} />}
        </button>
      ) : (
        <button
          onClick={toggleMute}
          style={{
            position: "fixed",
            bottom: "2vw",
            right: "2vw",
            padding: "1vw",
            zIndex: 9999,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "8vw",
            color: "#888888",
          }}
        >
          {isMuted ? <VscMute /> : <GoUnmute style={{ color: "#FFA500" }} />}
        </button>
      )}
      {/* First Background Layer */}
      <div id="first-background"></div>

      {/* Image Between Background Layers */}
      {isMdOrLarger ? (
        <div>
          <div id="middle-image">
            <Image
              src={floatfish}
              alt="Middle Image"
              style={{ width: "80vw", height: "auto", marginTop: "78vw" }}
            />
          </div>
          <div id="middle-image-opposite">
            <Image
              src={floatfishOpposite}
              alt="Middle Image"
              style={{ width: "26vw", height: "auto", marginTop: "30vw" }}
            />
          </div>
          <div id="middle-image-opposite">
            <Image
              src={alonefish}
              alt="Middle Image"
              style={{ width: "8vw", height: "auto", marginTop: "90vw" }}
            />
          </div>
          <div id="middle-image">
            <Image
              src={alonefish1}
              alt="Middle Image"
              style={{ width: "12vw", height: "auto", marginTop: "120vw" }}
            />
          </div>
          <div id="middle-image-opposite">
            <Image
              src={floatfish1}
              alt="Middle Image"
              style={{ width: "25vw", height: "auto", marginTop: "175vw" }}
            />
          </div>
          <div id="middle-image">
            <Image
              src={alonefish2}
              alt="Middle Image"
              style={{ width: "20vw", height: "auto", marginTop: "206vw" }}
            />
          </div>
          <div id="middle-image-static">
            <Image
              src={TankGlass}
              alt="Middle Image"
              style={{ marginTop: "20.5vw" }}
            />
          </div>
        </div>
      ) : (
        <div>
          <div id="middle-image">
            <Image
              src={floatfish}
              alt="Middle Image"
              style={{ width: "100vw", height: "auto", marginTop: "88vw" }}
            />
          </div>
          <div id="middle-image">
            <Image
              src={floatfishMob}
              alt="Middle Image"
              style={{
                width: "70vw",
                height: "auto",
                marginTop: "158vw",
                transform: "translateX(60%)",
              }}
            />
          </div>

          <div id="middle-image-opposite">
            <Image
              src={floatfishOpposite}
              alt="Middle Image"
              style={{
                width: "80vw",
                height: "auto",
                marginTop: "600vw",
              }}
            />
          </div>
          <div id="middle-image-opposite">
            <Image
              src={alonefish}
              alt="Middle Image"
              style={{
                width: "10vw",
                height: "auto",
                marginTop: "700vw",
              }}
            />
          </div>
          <div id="middle-image">
            <Image
              src={alonefish1}
              alt="Middle Image"
              style={{ width: "35vw", height: "auto", marginTop: "750vw" }}
            />
          </div>
          <div id="middle-image-opposite">
            <Image
              src={floatfish1}
              alt="Middle Image"
              style={{ width: "100vw", height: "auto", marginTop: "655vw" }}
            />
          </div>
          <div id="middle-image">
            <Image
              src={alonefish2}
              alt="Middle Image"
              style={{ width: "55vw", height: "auto", marginTop: "1026vw" }}
            />
          </div>
          <div id="middle-image-static">
            <Image
              src={TankGlass}
              alt="Middle Image"
              style={{ marginTop: "20.5vw" }}
            />
          </div>
        </div>
      )}

      {/* Upper Background Layer */}
      <div id="upper-background"></div>
      <div id="content-layer">
        {isMdOrLarger ? (
          <div style={{ position: "relative", zIndex: 10 }}>
            <Parallax
              bgImage={bannerBg.src}
              strength={500}
              bgImageStyle={{
                width: "100vw",
                height: "100%",
                objectFit: "fill",
              }}
            >
              <div style={{ height: "50vw" }}></div>
            </Parallax>
          </div>
        ) : (
          <div style={{ position: "relative", zIndex: 10 }}>
            <Parallax
              bgImage={bannerBgMobile.src} // Replace with the image for small screens
              strength={500}
              bgImageStyle={{
                width: "100vw",
                height: "95vw",
                objectFit: "fill",
              }}
            >
              <div style={{ height: "90vw" }}></div>
            </Parallax>
          </div>
        )}

        {isMdOrLarger ? (
          <div
            style={{
              position: "absolute",
              top: "16vw",
              left: "34.3vw",
              transform: "translateX(-50%)",
              zIndex: 15,
            }}
          >
            <Image
              src={MrChing}
              alt="Top Image"
              style={{ maxWidth: "17vw", height: "auto" }}
            />
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "30vw",
              left: "32vw",
              transform: "translateX(-50%)",
              zIndex: 15,
            }}
          >
            <Image
              src={MrChing}
              alt="Top Image"
              style={{ maxWidth: "30vw", height: "auto" }}
            />
          </div>
        )}

        {isMdOrLarger ? (
          <div>
            {/* <div>
            <LandingSection
              // background='rgba(255, 0, 0, 0.5)'

              height={["0vw", "0vw"]}
            />
          </div> */}
            {/* <CurrentAuctionSection
            // background='rgba(255, 83, 13, 0.5)'
            height={['235vw', '86vw', '86vw', '86vw', '58vw']}
          /> */}

            <div
              style={{ display: "flex", flexDirection: "row", width: "100vw" }}
            >
              <div>
                <div
                  style={{
                    position: "relative",
                    top: "149.35vw",
                    left: "61.5%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    width: "47.3vw",
                  }}
                >
                  <Parallax
                    strength={300}
                    bgImage={tentacle.src}
                    bgImageStyle={{
                      width: "32.2vw", // Adjust size as needed
                      height: "40vw",
                      objectFit: "contain",
                    }}
                  >
                    <div style={{ height: "38vw" }}></div>
                  </Parallax>
                </div>
              </div>
              <div style={{ width: "50vw" }}>
                <BackgroundSection
                  // background="rgba(255, 255, 0, 0.5)"
                  height={["1375vw", "181vw"]}
                />
              </div>
            </div>

            {/* <MobileModalSections
              // background='rgba(110, 255, 255, 0.5)'
              height={["587.5vw", "0"]}
            /> */}
            <JoinUsSections
              // background='rgba(0, 0, 0, 0.5)'
              height={["390vw", "70.5vw"]}
            />
          </div>
        ) : (
          <div>
            <div>
              <LandingSection
                // background='rgba(255, 0, 0, 0.5)'

                height={["0vw", "0vw"]}
              />
            </div>
            {/* <CurrentAuctionSection
          // background='rgba(255, 83, 13, 0.5)'
          height={['235vw', '86vw', '86vw', '86vw', '58vw']}
          /> */}

            <div style={{ width: "100vw" }}>
              <BackgroundSection
                // background="rgba(255, 255, 0, 0.5)"
                height={["1530vw", "181vw"]}
              />
            </div>

            {/* <MobileModalSections
          // background='rgba(110, 255, 255, 0.5)'
          height={["587.5vw", "0"]}
          />  */}
            <JoinUsSections
              // background='rgba(0, 0, 0, 0.5)'
              height={["358vw", "70.5vw"]}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePageContent;
