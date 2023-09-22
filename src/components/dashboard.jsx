import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';

function CondicionAtmosferica() {
  const API_URL = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";
  
  const [datos, setDatos] = useState([]);
  const [estadoActual, setEstadoActual] = useState("");
  const [ciudadesDelEstado, setCiudadesDelEstado] = useState([]);
  const [cargando, setCargando] = useState(true);

  const estadosCompletos = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Estado de México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (Array.isArray(data.results)) {
          setDatos(data.results);
          setCargando(false);
        } else {
          console.error("Error: La API no devolvió un array 'results' válido.");
          setCargando(false);
        }
      } catch (error) {
        console.error("Error al consultar datos:", error);
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  const handleEstadoChange = (estadoSeleccionado) => {
    setEstadoActual(estadoSeleccionado);

    const ciudades = datos.filter((item) => item.state === estadoSeleccionado);

    setCiudadesDelEstado(ciudades);
  };

  return (
    <Container fluid>
      <Row>
      <Col md={3} className="bg-light sidebar" style={{ backgroundColor: "#FF5733" }}>
          <Nav className="flex-column">
            {estadosCompletos.map((estado, index) => (
              <Nav.Item key={index}>
                <Nav.Link onClick={() => handleEstadoChange(estado)} style={{ color: "black" }}>{estado}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col md={9}>
          <h2 style={{ fontSize: "5 rem", color: "#ff5733" }}>Estado del tiempo</h2>
          {cargando ? (
            <p>Cargando datos...</p>
          ) : estadoActual ? (
            <>
              <h3 style={{ fontSize: "5 rem", color: "#009688" }}>Estado seleccionado: {estadoActual}</h3>
              <div>
                {ciudadesDelEstado.length > 0 ? (
                  ciudadesDelEstado.map((ciudad, index) => (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        <Card.Title>Ciudad: {ciudad.name}</Card.Title>
                        <Card.Text>Condición climática: {ciudad.skydescriptionlong}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p>No hay datos disponibles para este estado.</p>
                )}
              </div>
            </>
          ) : (
            <p>Selecciona un estado para ver el estado del tiempo.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CondicionAtmosferica;
