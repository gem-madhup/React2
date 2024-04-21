import React, { useState } from 'react';
import { Form, Button, Alert, Modal, ListGroup } from 'react-bootstrap';
import { saveUserRecordToService } from '../services/UserService';

const CreateUserComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    mobile: '',
    category: '',
    technologies: [],
    profilePicture: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'technologies') {
      const updatedTechnologies = checked
        ? [...formData.technologies, value]
        : formData.technologies.filter(tech => tech !== value);

      setFormData({ ...formData, [name]: updatedTechnologies });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await saveUserRecordToService(formData);
        setSubmitStatus('success');
        setFormData({
          name: '',
          gender: '',
          email: '',
          mobile: '',
          category: '',
          technologies: [],
          profilePicture: ''
        });
        setErrors({});
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      }
    }
  };

  const handlePreview = () => {
    if (validateForm()) {
      setShowPreviewModal(true);
    } else {
      setSubmitStatus('error');
    }
  };

  const handleModalSubmit = async (data) => {
    try {
      await saveUserRecordToService(data);
      setSubmitStatus('success');
      setFormData({
        name: '',
        gender: '',
        email: '',
        mobile: '',
        category: '',
        technologies: [],
        profilePicture: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      errors.name = 'Only letters and spaces are allowed';
    } else if (formData.name.trim().length < 2 || formData.name.trim().length > 30) {
      errors.name = 'Name must be between 2 and 30 characters';
    }
    if (!formData.gender) {
        errors.gender = 'Gender is required';
      }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = 'Invalid email address';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      errors.mobile = 'Invalid mobile number';
    }

    // Category validation
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }

    // Technologies validation
    if (formData.technologies.length === 0) {
      errors.technologies = 'At least one technology must be selected';
    }
    if (formData.profilePicture.length === 0) {
        errors.profilePicture = 'Select a Profile Picture';
      }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="container mt-4">
      <h2>Create User</h2>
      {submitStatus === 'success' && (
        <Alert variant="success">
          User created successfully!
        </Alert>
      )}
      {submitStatus === 'error' && (
        <Alert variant="danger">
          Please fix the errors before submitting.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        {/* Name field */}
        <Form.Group controlId="name">
          <Form.Label><strong>Name</strong></Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Gender field */}
        <Form.Group>
          <Form.Label><strong>Gender</strong></Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
          </div>
          {errors.gender && (
            <Form.Text className="text-danger">
              {errors.gender}
            </Form.Text>
          )}
        </Form.Group>

        {/* Email field */}
        <Form.Group controlId="email">
          <Form.Label><strong>Email</strong></Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Mobile field */}
        <Form.Group controlId="mobile">
          <Form.Label><strong>Mobile</strong></Form.Label>
          <Form.Control
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            isInvalid={!!errors.mobile}
          />
          <Form.Control.Feedback type="invalid">
            {errors.mobile}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Category field */}
        <Form.Group controlId="category">
          <Form.Label><strong>Category</strong></Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            isInvalid={!!errors.category}
          >
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="SC/ST">SC/ST</option>
            <option value="OBC">OBC</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Technologies field */}
        <Form.Group>
          <Form.Label><strong>Technologies</strong></Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              label="C"
              name="technologies"
              value="C"
              checked={formData.technologies.includes('C')}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="C++"
              name="technologies"
              value="C++"
              checked={formData.technologies.includes('C++')}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Java"
              name="technologies"
              value="Java"
              checked={formData.technologies.includes('Java')}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Python"
              name="technologies"
              value="Python"
              checked={formData.technologies.includes('Python')}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Javascript"
              name="technologies"
              value="Javascript"
              checked={formData.technologies.includes('Javascript')}
              onChange={handleChange}
            />
            {/* Add more checkboxes for other technologies */}
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.technologies}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Profile Picture field */}
        <Form.Group controlId="profilePicture">
          <Form.Label><strong>Profile Picture</strong></Form.Label>
          <Form.Control
            type="file"
            name="profilePicture"
            onChange={handleChange}
            accept="image/jpeg, image/png"
            isInvalid={!!errors.profilePicture}
          />
          <Form.Control.Feedback type="invalid">
            {errors.profilePicture}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Only JPEG, JPG, and PNG file types are allowed.
          </Form.Text>
        </Form.Group>

 
        <Button variant="primary" type="button" onClick={handlePreview}>
          Preview
        </Button>
      </Form>
      <PreviewModal
        show={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        formData={formData}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

// PreviewModal component
const PreviewModal = ({ show, onHide, formData, onSubmit }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>User Details Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Name: {formData.name}</ListGroup.Item>
          <ListGroup.Item>Gender: {formData.gender}</ListGroup.Item>
          <ListGroup.Item>Email: {formData.email}</ListGroup.Item>
          <ListGroup.Item>Mobile: {formData.mobile}</ListGroup.Item>
          <ListGroup.Item>Category: {formData.category}</ListGroup.Item>
          <ListGroup.Item>
            Technologies: {formData.technologies instanceof Array ? formData.technologies.join(', ') : ''}
          </ListGroup.Item>
          <ListGroup.Item>ProfilePicture: {formData.profilePicture}</ListGroup.Item>

        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSubmit(formData)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserComponent;
