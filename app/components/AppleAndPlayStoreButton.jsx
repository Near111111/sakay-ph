import Image from "next/image";
import "../styles/AppleAndPlayStoreButton.css";

export default function AppleAndPlayStoreButton() {
  return (
    <div className="store-buttons-container">
      {/* Google Play Button */}
      <a
        href="https://play.google.com/store"
        target="_blank"
        rel="noopener noreferrer"
        className="app-store-button"
      >
        <Image
          src="/sakay_playstore2.png"
          alt="Get it on Google Play"
          width={160}
          height={48}
          className="store-button-image"
          style={{ width: "auto", height: "48px" }}
        />
      </a>

      {/* App Store Button */}
      <a
        href="https://apps.apple.com"
        target="_blank"
        rel="noopener noreferrer"
        className="app-store-button"
      >
        <Image
          src="/sakay_appstore.png"
          alt="Download on the App Store"
          width={160}
          height={48}
          className="store-button-image"
          style={{ width: "auto", height: "48px" }}
        />
      </a>
    </div>
  );
}
