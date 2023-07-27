import React, { useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    areas: "",
    star: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, star: newValue });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2020/feedback/addf", formData)
      .then((response) => {
        console.log("Feedback submitted successfully!");
        setOpenDialog(true); // Open the dialog on successful submission
        // Reset the form after successful submission
        setFormData({
          name: "",
          email: "",
          experience: "",
          areas: "",
          star: 0,
        });
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        marginTop: "100px",
      }}
    >
      <h5
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Feedback Form
      </h5>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name" style={{ display: "block", fontWeight: "bold" }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="email" style={{ display: "block", fontWeight: "bold" }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="experience" style={{ display: "block", fontWeight: "bold" }}>
            Experience:
          </label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows="4"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="areas" style={{ display: "block", fontWeight: "bold" }}>
            Areas of Improvement:
          </label>
          <textarea
            id="areas"
            name="areas"
            value={formData.areas}
            onChange={handleChange}
            rows="4"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold" }}>Rating:</label>
          <input
            type="number"
            name="star"
            value={formData.star}
            onChange={handleRatingChange}
            min="0"
            max="5"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <br />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit Feedback
        </button>
      </form>
      {openDialog && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Feedback Sent Successfully!</h3>
          <p style={{ fontSize: "16px" }}>
            Thank you for your feedback. We appreciate your time and insights.
          </p>
          <button
            onClick={() => {
              // Navigate back to info.js page (replace '/info' with the correct path)
              window.location.href = "/";
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Feedback;
