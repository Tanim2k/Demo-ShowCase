import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance
        .get('http://localhost:8080/api/v2/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Profile</h1>
      <Card>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <strong>First Name:</strong>
            </Col>
            <Col md={8}>{user.firstName}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <strong>Last Name:</strong>
            </Col>
            <Col md={8}>{user.lastName}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <strong>Email:</strong>
            </Col>
            <Col md={8}>{user.email}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <strong>User Name:</strong>
            </Col>
            <Col md={8}>{user.username}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <strong>Address:</strong>
            </Col>
            <Col md={8}>{user.address}</Col>
          </Row>
          {/* Password is intentionally omitted for security reasons */}
          <Row className="mb-3">
            <Col md={4}>
              <strong>Role:</strong>
            </Col>
            <Col md={8}>{user.role}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
