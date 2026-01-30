import FloatingChatBox from "./components/FloatingChatBox";
import Image from "next/image";
import AppleAndPlayStoreButton from "./components/AppleAndPlayStoreButton";

export default function Home() {
  return (
    <>
      {/* Hero Section with Header Image */}
      <section
        style={{
          marginTop: "72px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <Image
          src="/sakay_header.png"
          alt="Sakay PH"
          width={1920}
          height={500}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          quality={100}
          unoptimized
          priority
        />
      </section>
      <AppleAndPlayStoreButton />
      {/* Content Section */}

      <div
        style={{
          minHeight: "calc(100vh - 572px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px 80px 20px", // Changed from "80px 20px"
          background: "#ffffff",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "900px" }}>
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: "bold",
              color: "#4e2780",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
            }}
          >
            SAKAY na sa bagong ride hailing app SAKAY-PH para satin to!
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              lineHeight: "1.8",
              marginBottom: "2rem",
            }}
          >
            Experience safe, reliable, and affordable transportation with Sakay
            PH. Book your ride today and get to your destination with ease.
          </p>
        </div>
      </div>

      <FloatingChatBox />
    </>
  );
}
