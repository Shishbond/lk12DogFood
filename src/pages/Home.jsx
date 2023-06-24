import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { List } from "react-bootstrap-icons";
import Slider from "../components/Slider";
import Banner from "../components/Banner";
import Advertising from "../components/Advertising";
import ProductAdvertising from "../components/ProductAdvertising";

const giftAdvertising = {
  name: "Лакомство для ваших любимчиков!",
  pictures:
    "https://main-cdn.sbermegamarket.ru/big2/hlr-system/153/455/094/711/222/113/100025629550b0.png",
  caption: "Подарок за первый заказ!",
  background: "#FFE7CC",
  link: "/product/6495e9ace0bf2c519bf733b7"
};

const advertising1 = {
  name: "Cухой корм для собак мелких и средних пород",
  pictures: "https://www.dogeat.ru/storage/products2/32311/clear_0.jpg",
  caption: "-50% на сухой корм для собак",
  background: "#EAF6FF",
  link: "/product/6495ea37e0bf2c519bf733e8"
};

const advertising2 = {
  name: "Лечебный корм для собак",
  pictures:
    "https://4lapy.ru/resize/480x480/upload/iblock/3fc/3fc4c37979cdc3efe83ef034ed341f0d.jpg",
  caption: "Для взрослых собак всех пород с чувствительным пищеварением!",
  background: "#EAF6FF",
  link: "/product/6495eae0e0bf2c519bf73444"
};

const Home = ({ user, setActive }) => {
  return (
    <>
      <Container fluid style={{ backgroundColor: "#FFE44D" }}>
        <Container className="d-block">
          {!user && (
            <Row>
              <Col>
                <span
                  className="info-link"
                  onClick={() => {
                    setActive(true);
                  }}
                >
                  Чтобы получить доступ к сайту необходимо АВТОРИЗОВАТЬСЯ!
                </span>
              </Col>
            </Row>
          )}
          <Row>
            <Col xs={12} lg={6}>
              <Banner />
            </Col>
          </Row>
          {user && (
            <Row>
              <Col xs={12} lg={6}>
                <Link to="/catalog">
                  <Button
                    className="
                      d-flex
                      rounded-pill
                      border-0
                      text-black
                      justify-content-center
                      align-items-center
                      text-center
                      button-catalog
                    "
                  >
                    <List className="me-2" />
                    Каталог товаров
                  </Button>
                </Link>
              </Col>
            </Row>
          )}
        </Container>
      </Container>
      <Container className="d-block">
        <Row className="g-4">
          <Col xs={12}>
            <div
              style={{
                backgroundColor: giftAdvertising.background,
                borderRadius: "34px"
              }}
            >
              {user ? (
                <Link to={giftAdvertising.link}>
                  <Advertising proGiftAdv={giftAdvertising} />
                </Link>
              ) : (
                <Advertising proGiftAdv={giftAdvertising} />
              )}
            </div>
          </Col>
          <Col xs={12}>
            <Slider desktop={3} mobile={2} />
          </Col>
          <Col xs={12} lg={6}>
            <div
              style={{
                backgroundColor: advertising1.background,
                borderRadius: "34px"
              }}
            >
              {user ? (
                <Link to={advertising1.link}>
                  <ProductAdvertising proAdv={advertising1} />
                </Link>
              ) : (
                <ProductAdvertising proAdv={advertising1} />
              )}
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div
              style={{
                backgroundColor: advertising2.background,
                borderRadius: "34px"
              }}
            >
              {user ? (
                <Link to={advertising2.link}>
                  <ProductAdvertising proAdv={advertising2} />
                </Link>
              ) : (
                <ProductAdvertising proAdv={advertising2} />
              )}
            </div>
          </Col>
          <Col xs={12}>
            <Slider desktop={3} mobile={2} />
          </Col>
        </Row>
      </Container>
      <Container className="d-block">
        <Row className="g-4">
          <Col xs={12}>
            <div
              style={{
                backgroundColor: giftAdvertising.background,
                borderRadius: "34px"
              }}
            >
              {user ? (
                <Link to={giftAdvertising.link}>
                  <Advertising proGiftAdv={giftAdvertising} />
                </Link>
              ) : (
                <Advertising proGiftAdv={giftAdvertising} />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
