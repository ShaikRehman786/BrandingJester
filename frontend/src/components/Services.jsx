import "../styles/Services.css";

const services = [
  {
    title: "Brand & Product Identity Setup",
    description: "Launch your premium e-commerce brand right.",
    items: [
      "Logo Design & Brand Guidelines",
      "Product Label & Packaging Design",
      "Product Photography & Ad Shoots",
    ],
  },
  {
    title: "High-Converting Website Design",
    description: "Websites that not only look good — but sell.",
    items: [
      "Shopify / WooCommerce Website Development",
      "CRO-Focused UI/UX Design",
      "SEO-Ready Setup & Speed Optimization",
    ],
  },
  {
    title: "Performance Marketing & Brand Growth",
    description: "Profitable growth from launch to scale.",
    items: [
      "Meta & Google Ad Campaigns",
      "UGC & Ad Creative Production",
      "Retargeting, Analytics & Funnel Optimization",
    ],
  },
];

function Services() {
  return (
    <section className="service" id="service">

      <div className="headblock">
        <h2 className="head">OUR SERVICES</h2>
      </div>

      <div className="services-container">
        <div className="service-list">

          {services.map((service, index) => (
            <div key={index} className="service-box">

              <div className="service-content">

                <h3 className="service-title">{service.title}</h3>

                <p className="service-description">
                  {service.description}
                </p>

                <div className="includes">
                  <h4>What's Included</h4>

                  <ul className="features-list">
                    {service.items.map((item, i) => (
                      <li key={i}> {item}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>

    </section>
  );
}

export default Services;
