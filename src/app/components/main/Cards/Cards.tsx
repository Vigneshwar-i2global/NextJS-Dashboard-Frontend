import { Card, Row, Col, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
export default function Cards() {
  const categories = [
    {
      id: 1,
      Name: "Vegetables",
      Description:
        "Fresh vegetables sourced directly from local farms. Rich in nutrients and essential vitamins. Perfect for healthy meals every day.",
    },
    {
      id: 2,
      Name: "Fruits",
      Description:
        "Juicy and seasonal fruits full of natural sweetness. Provides energy, fiber, and hydration. Ideal for snacks, juices, and desserts.",
    },
    {
      id: 3,
      Name: "Dairy",
      Description:
        "Pure milk and dairy products from trusted farms. Includes cheese, butter, yogurt, and more. Delivers calcium and protein for strong bones.",
    },
    {
      id: 4,
      Name: "Bakery",
      Description:
        "Freshly baked breads, cakes, and pastries daily. Soft texture with delicious flavors. Perfect for breakfast, tea time, or celebrations.",
    },
    {
      id: 5,
      Name: "Meat & Poultry",
      Description:
        "High-quality chicken, mutton, and fresh cuts. Sourced hygienically and stored under safe conditions. Great for protein-packed meals.",
    },
    {
      id: 6,
      Name: "Seafood",
      Description:
        "Fresh fish, prawns, and crabs from the coast. Rich in omega-3 fatty acids and minerals. Ideal for curries, fries, and grills.",
    },
    {
      id: 7,
      Name: "Snacks",
      Description:
        "Tasty chips, namkeen, and crunchy bites. Perfect for tea-time or party moments. Available in a wide range of flavors.",
    },
    {
      id: 8,
      Name: "Beverages",
      Description:
        "Refreshing soft drinks, juices, and health drinks. Energy boosters to keep you active. Includes both hot and cold beverages.",
    },
  ];

  return (
    <>
      <Row gutter={[24, 24]} style={{ marginTop: "30px" }}>
        {categories.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={item.Name}
              className="card-container"
              style={{
                width: "100%",
                minHeight: "240px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderLeft: "6px solid #6A1B9A",
                borderRadius: "8px",
                padding: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ flex: 1 }}>{item.Description}</p>
              <div style={{ textAlign: "right"}}>
                <Button
                  type="link"
                  style={{ padding: 0, fontWeight: 500, color: "#6A1B9A" }}
                  icon={<ArrowRightOutlined />}
                >
                  View More
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
