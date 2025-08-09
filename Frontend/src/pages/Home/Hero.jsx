import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import { Container, Row, Col, Button, Card, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Headers from '../../components/Headers/Headers';
import Footer from '../../components/Footers/Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Headers />
      <div className="hero-wrapper">
        <div className="hero-overlay">
          <Container className="text-center text-white py-5">
            <motion.h1
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="display-4 fw-bold"
            >
              Welcome to CodeRush
            </motion.h1>
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="lead"
            >
              Master coding with AI-powered insights and challenges.
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <Button variant="light" size="lg" onClick={() => navigate('/problems')}>
                Browse Problems
              </Button>
            </motion.div>
          </Container>
        </div>

        {/* What We Offer */}
        <Container className="my-5">
          <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#000' }}>
            What We Offer
          </h2>
          <Row className="g-4">
            {[
              'Instant AI Review Of Your Code',
              'Custom Input / Output Support',
    
            ].map((item, idx) => (
              <Col md={6} key={idx}>
                <Card className="h-100 offer-card">
                  <Card.Body>
                    <Card.Title>{item}</Card.Title>
                    <Card.Text>
                      {item.includes('AI')
                        ? 'Get instant feedback and suggestions from AI.'
                        : item.includes('Custom')
                        ? 'Run your code with custom input/output directly.'
                        : item.includes('Submissions')
                        // ? 'Track your attempts and view past submissions.'
                        // : 'Compete globally with real-time rankings.'}
                      }
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {/* FAQs */}
        <Container className="faq-section">
          <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#000' }}>
            FAQs
          </h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is the difference between a compiler and an interpreter?</Accordion.Header>
              <Accordion.Body>
                A compiler translates the whole code at once before execution, while an interpreter translates line-by-line during execution.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What is a variable in programming?</Accordion.Header>
              <Accordion.Body>
                A variable is a container that stores data values, such as numbers or text.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What is a loop?</Accordion.Header>
              <Accordion.Body>
                A loop is used to execute a block of code repeatedly until a specified condition is met.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What is a function?</Accordion.Header>
              <Accordion.Body>
                A function is a reusable block of code that performs a specific task and can return a result.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
