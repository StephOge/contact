


import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Header() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = validate(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }); // Replace with your API endpoint
        console.log(response); // Handle success response as desired
        setSuccessMessage('Form submitted successfully');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } catch (error) {
        console.log(error); // Handle error response as desired
        alert('Error submitting form. Please try again later.');
      }
    }
    setIsLoading(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email';
    }
    if (!values.message.trim()) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  return (
   <>
   <Card style={{ border: 'none', alignItems: 'center', marginTop: '20px', fontSize: '20' }}>
   <Card.Title>CONTACT FORM</Card.Title>
   </Card>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="name" placeholder="Enter your fullname" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="subject">
        <Form.Label>Subject:</Form.Label>
        <Form.Control
          type="text"
          name="subject"
          value={formData.subject}
            onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="message">
        <Form.Label>Message:</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="message"
          value={formData.message}
            onChange={handleInputChange}
          isInvalid={!!errors.message}
        />
        <Form.Control.Feedback type="invalid">
          {errors.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit"  disabled={isLoading}>
      {isLoading ? 'Submitting...' : 'Submit'}

      </Button>
    </Form>
   </>
  );
}

export default Header;
