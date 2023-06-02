import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Home.css";



function Home() {
  const [longUrl, setLongUrl] = useState("");

  const [shortenUrl, setShortenUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const validateUrl = (text) => {
    let longUrl;
    try {
      longUrl = new URL(text);
    } catch (_) {
      return false;
    }
    return longUrl.protocol === "http:" || longUrl.protocol === "https:";
  };

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl.trim() && validateUrl(longUrl)) {
      setError("");
      setShortenUrl("");
      setLoading(true);
      axios.post(`https://shorten-il52.onrender.com/url/shorten`, { longUrl })
        .then((response) => {
          setShortenUrl(response.data.data.shortUrl);
          setDisableButton(true);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data.message);
        });

    } else {
      setError("Please enter a valid URL!");
    }
  };

  const handleChangeInput = (e) => {
    setLongUrl(e.target.value);
    setShortenUrl("");
    setDisableButton(false);
    setCopiedText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenUrl);
    Swal.fire({
      title: "Copied to clipboard!",
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "white",
      iconColor: "#222",
      padding: "0.5rem",
    });
  };

  return (
    <div>
      <div className="content-wrapper">
        <h1 className="page-title">URL Shorten</h1>
        <p className="page-description">
          Simple open-source URL shortener application and allows to create a shortened link making it easy to share.
        </p>
        <div className="form-wrapper">
          <div className="input-wrapper">
            <input
              onChange={handleChangeInput}
              value={longUrl}
              placeholder="https://..."
            />
            {error && <p className="error">{error}</p>}
          </div>
          <button disabled={loading || disableButton} onClick={handleShorten}>
            {loading ? "Load..." : "Shorten"}
          </button>
        </div>
        {shortenUrl && (
          <>
            <h3 className="result-title">Shorten URL:</h3>
            <div className="result-link-wrapper">
              <a
                target="_blank"
                rel="noreferrer"
                className="shorten-url"
                href={shortenUrl}
              >
                {shortenUrl}
              </a>
              <button onClick={handleCopy} className="copy-button">
                {copiedText === shortenUrl ? "Copied!" : "Copy"}
              </button>
            </div>
          </>
        )}
        <h3 style={{textDecoration: 'underline'}}> A fast and simple URL shortener</h3>
        <p>Free URL Shortener for transforming long, ugly links into nice, memorable and trackable short URLs. Use it to shorten links for any social media platforms, blogs, SMS, emails, ads, or pretty much anywhere else you want to share them. Twitter, Facebook, YouTube, Instagram, WhatsApp, emails, SMS, videos.URL Sorten is the best free alternative to generic URL shorteners like bitly and tinyurl</p>
      </div>
      <a
        className="github"
        href="https://github.com/amankr1635/project-urlShortner"
        target="_blank"
        rel="noreferrer"
      >
        Drop ⭐ on Github
      </a>
    </div>
  );
}

export default Home;
