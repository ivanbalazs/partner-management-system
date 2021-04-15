import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PartnerList from './components/PartnerList';

function App() {
    return (
        <>
        <Navbar bg="dark" variant="dark" style={{ marginBottom: '24px' }}>
            <Navbar.Brand>Partner Management System</Navbar.Brand>
        </Navbar>
        <Container fluid>
            <Row>
                <Col>
                    <PartnerList />
                </Col>
            </Row>
        </Container>
        </>
  );
}

export default App;
